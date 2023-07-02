// eslint-disable-next-line import/no-internal-modules
import { compileInCompiler } from '../../compiler/compile-in-compiler';
// eslint-disable-next-line import/no-internal-modules
import { replaceImports } from '../../compiler/import-map';
import type { CompilerFunction, Config } from '../../models';
import { astroBaseUrl, astroWasmURL } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

const internalURL = astroBaseUrl + 'index.min.js';

/**
 * replace imports and compile typescript
 */
const compileFrontmatter = async (code: string, config: Config) => {
  code = replaceImports(code, config);
  const pattern = /^---((?:.|\n|\r)*)---((?:.|\n|\r)*)/;
  const frontmatter = code.trim().match(new RegExp(pattern))?.[1];
  if (!frontmatter) return code;
  const compiled = (await compileInCompiler(frontmatter, 'typescript', config)).code;
  return code.trim().replace(new RegExp(pattern), `---\n${compiled}\n---\n$2`);
};

(self as any).createAstroCompiler = (): CompilerFunction => {
  const { transform, initialize, renderAstroToHTML } = (self as any).astroCompiler;
  const compilerReady = initialize({ wasmURL: astroWasmURL });

  return async (code, { config }) => {
    await compilerReady;

    // // nested astro component
    // const script = await transform(config.script.content, {
    //   ...getLanguageCustomSettings('astro', config),
    //   sourcefile: 'script.jsx',
    //   sourcemap: false,
    //   internalURL,
    //   // site: location.href,
    //   as: 'fragment',
    // });
    // const url = `data:application/javascript;base64,${btoa(script.code)}`;

    // // when renderers are enabled (react/preact/vue/svelte)
    // // https://github.com/snowpackjs/astro-repl/blob/741460dfcbe894473f8e66153926cc653d0fe8b9/src/%40astro/internal/index.ts#L196
    // const scriptCode = options.script || '';
    // const url = `data:application/javascript;base64,${btoa(scriptCode)}`;

    // code = code.replace('./script.jsx', url);

    const processedCode = await compileFrontmatter(code, config);

    const result = await transform(processedCode, {
      sourcefile: 'file.astro',
      sourcemap: false,
      internalURL,
      // site: location.href,
      ...getLanguageCustomSettings('astro', config),
    });
    const output = await renderAstroToHTML(result.code);
    if (output.errors) {
      for (const err of output.errors) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
      return '';
    }
    return output;
  };
};
