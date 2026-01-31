import { compileAllBlocks, exportDefaultImports } from '../../compiler/compile-blocks';
import { compileInCompiler } from '../../compiler/compile-in-compiler';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import type { LanguageOrProcessor } from '../../compiler/models';
import type { CompilerFunction, Config } from '../../models';
import { getErrorMessage, getRandomString, replaceAsync } from '../../utils/utils';
import { getFileExtension, getLanguageByAlias } from '../utils';

// based on:
// https://github.com/vuejs/repl/blob/main/src/transform.ts
// https://github.com/wheatjs/vueuse-playground/blob/main/src/compiler/sfcCompiler.ts

(self as any).createVueCompiler = (): CompilerFunction => {
  const MAIN_FILE = 'App.vue';
  const SECONDARY_FILE = 'Component.vue';
  const COMP_IDENTIFIER = '__sfc__';
  let errors: any[] = [];
  let css = '';
  const ids: Record<string, string> = {};
  let importedContent = '';

  interface Compiled {
    css: string;
    js: string;
    ssr: string;
  }

  const SFCCompiler = (self as any).VueCompilerSFC.VueCompilerSFC;

  async function compileVueSFC(
    code: string,
    { filename = MAIN_FILE, config }: { filename?: string; config: Config },
  ): Promise<Compiled | void> {
    if (filename === MAIN_FILE) {
      errors = [];
      css = '';
      importedContent = '';
    }
    if (!code.trim()) return;

    const isSfc = (mod: string) =>
      mod.toLowerCase().endsWith('.vue') || mod.toLowerCase().startsWith('data:text/vue');
    const testTs = (filename: string) =>
      !!(filename && /(\.|\b)(tsx?|typescript)$/.test(filename.toLowerCase()));
    const testJsx = (filename: string) =>
      !!(filename && /(\.|\b)[jt]sx$/.test(filename.toLowerCase()));

    code = await replaceSFCImports(code, {
      filename,
      config,
      getLanguageByAlias,
      getFileExtension,
      isSfc,
      compileSFC: async (code, { filename, config }) => {
        const compiled = (await compileVueSFC(code, { filename, config }))?.js || '';
        importedContent += `\n${filename}\n\n${compiled}\n`;
        return compiled;
      },
    });

    const compiledBlocks = await compileBlocks(code, {
      config,
      skipCompilers: ['typescript', 'jsx', 'tsx', 'babel', 'sucrase'],
    });
    const cssModules = compiledBlocks.cssModules;
    code = compiledBlocks.content;

    const compiled: Compiled = { css: '', js: '', ssr: '' };
    if (!ids[filename]) {
      ids[filename] = await hashId(filename);
    }
    const id = ids[filename];

    const { errors: err, descriptor } = SFCCompiler.parse(code, {
      filename,
      sourceMap: false,
      // templateParseOptions: store.sfcOptions?.template?.compilerOptions,
    });

    if (err.length) {
      errors.push(...err);
      return;
    }

    const scriptLang = descriptor.script?.lang || descriptor.scriptSetup?.lang;
    const isTS = testTs(scriptLang);
    const isJSX = testJsx(scriptLang);

    const hasScoped = descriptor.styles.some((s: any) => s.scoped);
    let clientCode = '';

    for (const style of descriptor.styles) {
      const styleResult = await SFCCompiler.compileStyleAsync({
        // ...store.sfcOptions?.style,
        source: style.content,
        filename,
        id,
        scoped: style.scoped,
        modules: false,
      });
      if (styleResult.errors.length) {
        // postcss uses pathToFileURL which isn't polyfilled in the browser
        // ignore these errors for now
        // if (!styleResult.errors[0].message.includes('pathToFileURL')) {
        //   errors.push(...styleResult.errors);
        // }
        errors.push(...styleResult.errors);
        // proceed even if css compile errors
      } else {
        css += `${styleResult.code}\n`;
      }
    }

    if (css) {
      compiled.css = css.trim();
    }

    const appendSharedCode = (code: string) => {
      clientCode += code;
    };

    const [compiledScript, bindings] = await doCompileScript(descriptor, id, false, isTS, isJSX);

    const clientScript =
      isTS || isJSX ? await compileTypescript(compiledScript, { config }) : compiledScript;

    appendSharedCode(clientScript);

    // template
    // only need dedicated compilation if not using <script setup>
    if (descriptor.template && !descriptor.scriptSetup) {
      const clientTemplateResult = await doCompileTemplate(
        descriptor,
        id,
        bindings,
        false,
        isTS,
        isJSX,
      );
      if (!clientTemplateResult) return;
      const templateCode =
        isTS || isJSX
          ? await compileTypescript(clientTemplateResult, { config })
          : clientTemplateResult;
      appendSharedCode(templateCode);
    }

    if (hasScoped) {
      appendSharedCode(`\n${COMP_IDENTIFIER}.__scopeId = ${JSON.stringify(`data-v-${id}`)};`);
    }

    const createAppCode =
      filename === MAIN_FILE
        ? `\nimport { createApp } from 'vue';` +
          `\ncreateApp(${COMP_IDENTIFIER})` +
          `\n  .mount(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')));\n`
        : '\n';

    if (cssModules) {
      appendSharedCode(
        `\n${COMP_IDENTIFIER}.computed = {...${COMP_IDENTIFIER}.computed, $style() { return ${JSON.stringify(
          cssModules,
        )} }};`,
      );
    }

    if (clientCode) {
      appendSharedCode(
        `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(filename)};` +
          `\nexport default ${COMP_IDENTIFIER};` +
          createAppCode,
      );
      compiled.js = clientCode.trimStart();
    }

    return compiled;
  }

  async function doCompileScript(
    descriptor: /* SFCDescriptor */ any,
    id: string,
    ssr: boolean,
    isTS: boolean,
    isJSX: boolean,
  ): Promise<[string, /* BindingMetadata | undefined */ any]> {
    if (descriptor.script || descriptor.scriptSetup) {
      const expressionPlugins = [];
      if (isTS) {
        expressionPlugins.push('typescript');
      }
      if (isJSX) {
        expressionPlugins.push('jsx');
      }

      const compiledScript = SFCCompiler.compileScript(descriptor, {
        inlineTemplate: true,
        // ...store.sfcOptions?.script,
        id,
        genDefaultAs: COMP_IDENTIFIER,
        templateOptions: {
          // ...store.sfcOptions?.template,
          ssr,
          ssrCssVars: descriptor.cssVars,
          compilerOptions: {
            // ...store.sfcOptions?.template?.compilerOptions,
            expressionPlugins,
          },
        },
      });
      let code = compiledScript.content;
      if (compiledScript.bindings) {
        code =
          `/* Analyzed bindings: ${JSON.stringify(compiledScript.bindings, null, 2)} */\n` + code;
      }
      return [code, compiledScript.bindings];
    } else {
      const vaporFlag = descriptor.vapor ? '__vapor: true' : '';
      return [`\nconst ${COMP_IDENTIFIER} = { ${vaporFlag} }`, undefined];
    }
  }

  async function doCompileTemplate(
    descriptor: /* SFCDescriptor */ any,
    id: string,
    bindingMetadata: /* BindingMetadata | undefined */ any,
    ssr: boolean,
    isTS: boolean,
    isJSX: boolean,
  ) {
    const expressionPlugins = [];
    if (isTS) {
      expressionPlugins.push('typescript');
    }
    if (isJSX) {
      expressionPlugins.push('jsx');
    }

    const templateResult = SFCCompiler.compileTemplate({
      isProd: false,
      // ...store.sfcOptions?.template,
      vapor: descriptor.vapor,
      ast: descriptor.template!.ast,
      source: descriptor.template!.content,
      filename: descriptor.filename,
      id,
      scoped: descriptor.styles.some((s: any) => s.scoped),
      slotted: descriptor.slotted,
      ssr,
      ssrCssVars: descriptor.cssVars,
      compilerOptions: {
        // ...store.sfcOptions?.template?.compilerOptions,
        bindingMetadata,
        expressionPlugins,
      },
    });
    if (templateResult.errors.length) {
      errors.push(...templateResult.errors);
      return;
    }

    const fnName = ssr ? 'ssrRender' : 'render';

    return (
      `\n${templateResult.code.replace(
        /\nexport (function|const) (render|ssrRender)/,
        `$1 ${fnName}`,
      )}` + `\n${COMP_IDENTIFIER}.${fnName} = ${fnName};`
    );
  }

  async function hashId(filename: string) {
    try {
      const msgUint8 = new TextEncoder().encode(filename); // encode as (utf-8) Uint8Array
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
      return hashHex.slice(0, 8);
    } catch {
      return getRandomString()
        .slice(2, 10)
        .split('')
        .map((x) => String.fromCharCode(65 + Number(x)))
        .join('')
        .replace(/`/g, '-')
        .toLowerCase();
    }
  }

  async function compileBlocks(
    code: string,
    { config, skipCompilers }: { config: Config; skipCompilers?: LanguageOrProcessor[] },
  ) {
    let content = code;
    const scriptPattern = /<script([\s\S]*?)>([\s\S]*?)<\/script>/g;
    const stylePattern = /<style([\s\S]*?)>([\s\S]*?)<\/style>/g;

    // JSX
    const prepareFn = async (code: string) =>
      code.replace(scriptPattern, (match, attrs: string, scriptContent: string) => {
        if (!scriptContent.includes('<')) {
          return match;
        }
        if (!attrs.toLowerCase().includes(' lang')) {
          // allow jsx by default
          attrs += ' lang="jsx"';
        }
        const jsxImports = 'import { h, Fragment } from "vue";\n';
        if (
          !scriptContent.includes(jsxImports) &&
          (attrs.toLowerCase().includes('"ts"') ||
            attrs.toLowerCase().includes('"typescript"') ||
            attrs.toLowerCase().includes('"jsx"') ||
            attrs.toLowerCase().includes('"tsx"') ||
            attrs.toLowerCase().includes("'ts'") ||
            attrs.toLowerCase().includes("'typescript'") ||
            attrs.toLowerCase().includes("'jsx'") ||
            attrs.toLowerCase().includes("'tsx'"))
        ) {
          scriptContent = jsxImports + scriptContent;
        }
        return `<script ${attrs}>${scriptContent}</script>`;
      });

    config.customSettings.typescript = {
      ...config.customSettings.typescript,
      jsxFactory: 'h',
      jsxFragmentFactory: 'Fragment',
    };

    content = await compileAllBlocks(content, config, { prepareFn, skipCompilers });

    // CSS Modules
    let cssModules: Record<string, Record<string, string>> | undefined;
    content = await replaceAsync(
      content,
      stylePattern,
      async (match, attrs: string, styleContent: string) => {
        if (!attrs.includes(' module')) {
          return match;
        }

        const cssModulesCompileResult = await compileInCompiler(styleContent, 'postcss', {
          ...config,
          processors: ['cssmodules'],
        } as Config);
        cssModules = {
          ...cssModules,
          ...cssModulesCompileResult.info.cssModules,
        };

        return `<style ${attrs.replace(' module', '')}>${cssModulesCompileResult.code}</style>`;
      },
    );
    return { content, cssModules };
  }

  async function compileTypescript(content: string, { config }: { config: Config }) {
    const exports = exportDefaultImports(content);
    let compiled = (await compileInCompiler(content + exports, 'tsx', config)).code || content;
    if (exports) {
      compiled = compiled.replace(exports, '');
    }
    return compiled;
  }

  return async (code, { config, language, options }) => {
    try {
      const isMultiFileProject = Boolean(config.files.length);
      const isMainFile = isMultiFileProject
        ? false
        : config.markup.language !== 'vue-app' || language === 'vue-app';
      const filename = isMultiFileProject
        ? options.filename
        : isMainFile
          ? MAIN_FILE
          : SECONDARY_FILE;
      const result = await compileVueSFC(code, { config, filename });

      if (result) {
        const { css, js } = result;

        const injectCSS = !css.trim()
          ? ''
          : `
document.head.insertBefore(
  Object.assign(document.createElement('style'), { textContent: ${JSON.stringify(css)} }),
  document.head.getElementsByTagName('style')[0]
);
`;
        const compiledCode = js + injectCSS;

        return {
          code:
            language === 'vue-app'
              ? `<script type="module">${compiledCode}</script>`
              : compiledCode,
          info: { importedContent, imports: createImportMap(importedContent, config), errors },
        };
      }

      if (errors.length) {
        // eslint-disable-next-line no-console
        console.error(...errors);
      }

      const empty = `export default () => {}`;
      return {
        code: language === 'vue-app' ? `<script type="module">${empty}</script>` : empty,
        info: { errors },
      };
    } catch (err) {
      return {
        code: '',
        info: { errors: [...errors, getErrorMessage(err)] },
      };
    }
  };
};
