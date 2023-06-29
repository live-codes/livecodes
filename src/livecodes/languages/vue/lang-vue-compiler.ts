/* eslint-disable import/no-internal-modules */
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { getImports, replaceImports } from '../../compiler/import-map';
import type { CompilerFunction, Config } from '../../models';
import { modulesService } from '../../services';

// based on:
// https://github.com/vuejs/repl/blob/main/src/transform.ts
// https://github.com/wheatjs/vueuse-playground/blob/main/src/compiler/sfcCompiler.ts

(self as any).createVueCompiler = (): CompilerFunction => {
  const MAIN_FILE = 'App.vue';
  const COMP_IDENTIFIER = '__sfc__';
  let errors: string | any[] = [];
  let css = '';
  const ids: Record<string, string> = {};

  interface Compiled {
    css: string;
    js: string;
    ssr: string;
  }

  const SFCCompiler = (self as any).VueCompilerSFC.VueCompilerSFC;

  async function compileSFC(code: string, filename = MAIN_FILE): Promise<Compiled | void> {
    if (filename === MAIN_FILE) {
      errors = [];
      css = '';
    }
    if (!code.trim()) return;

    code = await replaceSFCImports(code, filename);

    const compiled: Compiled = { css: '', js: '', ssr: '' };
    if (!ids[filename]) {
      ids[filename] = await hashId(filename);
    }
    const id = ids[filename];

    const { errors: err, descriptor } = SFCCompiler.parse(code, {
      filename,
      sourceMap: false,
    });

    if (err.length) {
      errors = err;
      return;
    }

    const hasScoped = descriptor.styles.some((s: any) => s.scoped);
    let clientCode = '';

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
      appendSharedCode(`\n${COMP_IDENTIFIER}.__scopeId = ${JSON.stringify(`data-v-${id}`)}`);
    }

    const createAppCode =
      filename === MAIN_FILE
        ? `\nimport { createApp } from 'vue';` +
          `\nconst root = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));` +
          `\ncreateApp(${COMP_IDENTIFIER}).mount(root);\n`
        : '\n';

    if (clientCode) {
      appendSharedCode(
        `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(filename)}` +
          `\nexport default ${COMP_IDENTIFIER};` +
          createAppCode,
      );
      compiled.js = clientCode.trimStart();
    }

    for (const style of descriptor.styles) {
      if (style.module) {
        // TODO: support css modules
        errors = ['<style module> is not currently supported.'];
        return;
      }

      const styleResult = await SFCCompiler.compileStyleAsync({
        source: style.content,
        filename,
        id,
        scoped: style.scoped,
        modules: !!style.module,
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
      )}` + `\n${COMP_IDENTIFIER}.${fnName} = ${fnName}`
    );
  }

  async function replaceSFCImports(code: string, filename: string) {
    const vueImports = getImports(code).filter((mod) => mod.toLowerCase().endsWith('.vue'));
    const importMap: Record<string, string> = {};
    await Promise.all(
      vueImports.map(async (mod) => {
        const url =
          mod.startsWith('https://') || mod.startsWith('http://')
            ? mod
            : mod.startsWith('.')
            ? new URL(mod, filename).href
            : modulesService.getUrl(mod);
        const res = await fetch(url);
        const content = await res.text();
        const compiled = await compileSFC(content, url);
        if (!compiled) return;
        const dataUrl = 'data:text/javascript;base64,' + btoa(compiled.js);
        importMap[mod] = dataUrl;
      }),
    );
    return replaceImports(code, {} as Config, importMap);
  }

  async function hashId(filename: string) {
    const msgUint8 = new TextEncoder().encode(filename); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex.slice(0, 8);
  }

  return async (code, { config }) => {
    // add JSX support
    config.customSettings.typescript = { ...config.customSettings.typescript, jsxFactory: 'h' };
    const scriptPattern = /<script([\s\S]*?)>([\s\S]*?)<\/script>/g;
    const modifiedCode = code.replace(
      scriptPattern,
      (match, attrs: string, scriptContent: string) => {
        if (!scriptContent.includes('<')) {
          return match;
        }
        if (!attrs.includes('lang')) {
          attrs += ' lang="jsx"';
        }
        if (
          attrs.toLowerCase().includes('ts') ||
          attrs.toLowerCase().includes('typescript') ||
          attrs.toLowerCase().includes('jsx') ||
          attrs.toLowerCase().includes('tsx')
        ) {
          scriptContent = 'import { h } from "vue";\n' + scriptContent;
        }
        return `<script ${attrs}>${scriptContent}</script>`;
      },
    );

    const content = await compileAllBlocks(modifiedCode, config);
    const result = await compileSFC(content);

    if (result) {
      const { css, js } = result;

      const injectCSS = !css.trim()
        ? ''
        : `
const style = Object.assign(document.createElement('style'), { textContent: ${JSON.stringify(
            css,
          )} });
const ref = document.head.getElementsByTagName('style')[0] || null;
document.head.insertBefore(style, ref);
    `;

      return js + injectCSS;
    }

    if (errors.length) {
      // eslint-disable-next-line no-console
      console.error(...errors);
    }

    return '';
  };
};
