/* eslint-disable import/no-internal-modules */
import { compileInCompiler } from '../../compiler/compile-in-compiler';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { findImportMapKey, getImports, replaceImports } from '../../compiler/import-map';
import { modulesService } from '../../services/modules';
import { getFileExtension, getRandomString, getValidUrl, replaceAsync } from '../../utils/utils';
import type { CompilerFunction, Config } from '../../models';
import { processors } from '../processors';
import { getLanguageByAlias } from '../utils';

// based on:
// https://github.com/vuejs/repl/blob/main/src/transform.ts
// https://github.com/wheatjs/vueuse-playground/blob/main/src/compiler/sfcCompiler.ts

(self as any).createVueCompiler = (): CompilerFunction => {
  const MAIN_FILE = 'App.vue';
  const COMP_IDENTIFIER = '__sfc__';
  let errors: string | any[] = [];
  let css = '';
  const ids: Record<string, string> = {};
  let fileContents: string = '';

  interface Compiled {
    css: string;
    js: string;
    ssr: string;
  }

  const SFCCompiler = (self as any).VueCompilerSFC.VueCompilerSFC;

  async function compileSFC(
    code: string,
    { filename = MAIN_FILE, config }: { filename?: string; config: Config },
  ): Promise<Compiled | void> {
    if (filename === MAIN_FILE) {
      errors = [];
      css = '';
      fileContents = '';
    }
    if (!code.trim()) return;

    code = await replaceSFCImports(code, { filename, config });
    const compiledBlocks = await compileBlocks(code, { config });
    const cssModules = compiledBlocks.cssModules;
    code = compiledBlocks.content;

    const compiled: Compiled = { css: '', js: '', ssr: '' };
    if (!ids[filename]) {
      ids[filename] = await hashId(filename);
    }
    const id = ids[filename];

    const { errors: err, descriptor } = SFCCompiler.parse(code, { filename, sourceMap: false });

    if (err.length) {
      errors = err;
      return;
    }

    const hasScoped = descriptor.styles.some((s: any) => s.scoped);
    let clientCode = '';

    for (const style of descriptor.styles) {
      const styleResult = await SFCCompiler.compileStyleAsync({
        source: style.content,
        filename,
        id,
        scoped: style.scoped,
        modules: false,
      });
      if (styleResult.errors.length) {
        // postcss uses pathToFileURL which isn't polyfilled in the browser
        // ignore these errors for now
        if (!styleResult.errors[0].message.includes('pathToFileURL')) {
          errors = styleResult.errors;
        }

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

    const clientScriptResult = doCompileScript(descriptor, id, false);
    if (!clientScriptResult) return;

    const [clientScript, bindings] = clientScriptResult;
    clientCode += clientScript;

    // template
    // only need dedicated compilation if not using <script setup>
    if (descriptor.template && !descriptor.scriptSetup) {
      const clientTemplateResult = doCompileTemplate(descriptor, id, bindings, false);
      if (!clientTemplateResult) return;

      clientCode += clientTemplateResult;
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

  function doCompileScript(
    descriptor: /* SFCDescriptor */ any,
    id: string,
    ssr: boolean,
  ): [string, /* BindingMetadata | undefined */ any] | undefined {
    if (descriptor.script || descriptor.scriptSetup) {
      try {
        const compiledScript = SFCCompiler.compileScript(descriptor, {
          id,
          refSugar: true,
          inlineTemplate: true,
          templateOptions: {
            ssr,
            ssrCssVars: descriptor.cssVars,
          },
        });
        const code = '\n' + SFCCompiler.rewriteDefault(compiledScript.content, COMP_IDENTIFIER);
        return [code, compiledScript.bindings];
      } catch (e) {
        errors = [e];
      }
    }
    return [`\nconst ${COMP_IDENTIFIER} = {}`, undefined];
  }

  function doCompileTemplate(
    descriptor: /* SFCDescriptor */ any,
    id: string,
    bindingMetadata: /* BindingMetadata | undefined */ any,
    ssr: boolean,
  ) {
    const templateResult = SFCCompiler.compileTemplate({
      source: descriptor.template!.content,
      filename: descriptor.filename,
      id,
      scoped: descriptor.styles.some((s: any) => s.scoped),
      slotted: descriptor.slotted,
      ssr,
      ssrCssVars: descriptor.cssVars,
      isProd: false,
      compilerOptions: {
        bindingMetadata,
      },
    });
    if (templateResult.errors.length) {
      errors = templateResult.errors;
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

  async function replaceSFCImports(
    code: string,
    { filename, config }: { filename: string; config: Config },
  ) {
    const isVueSfc = (mod: string) => mod.toLowerCase().endsWith('.vue');
    const isExtensionless = (mod: string) =>
      mod.startsWith('.') && !mod.split('/')[mod.split('/').length - 1].includes('.');
    const vueImports = getImports(code).filter(
      (mod) => isVueSfc(mod) || isExtensionless(mod) || mod.startsWith('.'),
    );
    const projectImportMap = {
      ...config.imports,
      ...config.customSettings.imports,
    };
    const importMap: Record<string, string> = {};
    await Promise.all(
      vueImports.map(async (mod) => {
        // convert extensionless, relative URL to absolute URL and find in import map
        const urlInMap =
          isExtensionless(mod) &&
          getValidUrl(filename) != null &&
          projectImportMap[findImportMapKey(new URL(mod, filename).href, projectImportMap) || 0];

        const url =
          projectImportMap[findImportMapKey(mod, projectImportMap) || 0] ||
          urlInMap ||
          (mod.startsWith('https://') || mod.startsWith('http://')
            ? mod
            : mod.startsWith('.') && getValidUrl(filename) != null
            ? new URL(mod, filename).href
            : modulesService.getUrl(mod));

        const res = await fetch(url);
        const content = await res.text();
        const compiled = isVueSfc(mod)
          ? (await compileSFC(content, { filename: url, config }))?.js
          : await replaceSFCImports(
              (
                await compileInCompiler(
                  content,
                  getLanguageByAlias(getFileExtension(url)) || 'javascript',
                  config,
                )
              ).code,
              { filename: url, config },
            );
        if (!compiled) return;
        const dataUrl = 'data:text/javascript;base64,' + btoa(compiled);
        importMap[mod] = dataUrl;
        fileContents += `\n${url}\n\n${content}\n`;
      }),
    );
    return replaceImports(code, {} as Config, importMap);
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

  async function compileBlocks(code: string, { config }: { config: Config }) {
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
        if (
          attrs.toLowerCase().includes('"ts"') ||
          attrs.toLowerCase().includes('"typescript"') ||
          attrs.toLowerCase().includes('"jsx"') ||
          attrs.toLowerCase().includes('"tsx"') ||
          attrs.toLowerCase().includes("'ts'") ||
          attrs.toLowerCase().includes("'typescript'") ||
          attrs.toLowerCase().includes("'jsx'") ||
          attrs.toLowerCase().includes("'tsx'")
        ) {
          scriptContent = 'import { h } from "vue";\n' + scriptContent;
        }
        return `<script ${attrs}>${scriptContent}</script>`;
      });

    config.customSettings.typescript = {
      ...config.customSettings.typescript,
      jsxFactory: 'h',
    };

    content = await compileAllBlocks(content, config, { prepareFn });

    // CSS Modules
    let cssModules: Record<string, string> | undefined;
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

  return async (code, { config }) => {
    const result = await compileSFC(code, { config });

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

      const importedContentSrc =
        fileContents &&
        config.processors.find((name) => processors.find((p) => name === p.name && p.needsHTML))
          ? `\n\n/*\n${fileContents.replace(/\*\//g, '* /')}*/`
          : '';

      return js + injectCSS + importedContentSrc;
    }

    if (errors.length) {
      // eslint-disable-next-line no-console
      console.error(...errors);
    }

    return '';
  };
};
