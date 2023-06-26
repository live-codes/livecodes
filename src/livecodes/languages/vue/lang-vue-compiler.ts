// eslint-disable-next-line import/no-internal-modules
import { compileAllBlocks } from '../../compiler/compile-blocks';
import type { CompilerFunction } from '../../models';

// based on:
// https://github.com/vuejs/repl/blob/main/src/transform.ts
// https://github.com/wheatjs/vueuse-playground/blob/main/src/compiler/sfcCompiler.ts

(self as any).createVueCompiler = (): CompilerFunction => {
  const MAIN_FILE = 'App.vue';
  const COMP_IDENTIFIER = '__sfc__';
  let errors: string | any[] = [];
  let id: string;

  interface Compiled {
    css: string;
    js: string;
    ssr: string;
  }

  const SFCCompiler = (self as any).VueCompilerSFC.VueCompilerSFC;

  async function compileSFC(code: string): Promise<Compiled | void> {
    errors = [];
    if (!code.trim()) return;

    const filename = MAIN_FILE;
    const compiled: Compiled = { css: '', js: '', ssr: '' };
    id = id ?? (await hashId(filename));

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

    if (clientCode) {
      appendSharedCode(
        `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(filename)}` +
          `\nimport { createApp } from 'vue';` +
          `\nconst root = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));` +
          `\ncreateApp(${COMP_IDENTIFIER}).mount(root);\n`,
      );
      compiled.js = clientCode.trimStart();
    }

    // styles
    let css = '';

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

  async function hashId(filename: string) {
    const msgUint8 = new TextEncoder().encode(filename); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex.slice(0, 8);
  }

  return async (code, { config }) => {
    const content = await compileAllBlocks(code, config);
    const result = await compileSFC(content);

    if (result) {
      const { css, js } = result;

      const injectCSS = !css.trim()
        ? ''
        : `
const styles = document.createElement('style');
styles.innerHTML = ${JSON.stringify(css)};
document.head.appendChild(styles);
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
