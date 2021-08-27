import { LanguageSpecs } from '../models';
import { toBase64 } from './lang-wat';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;
declare const requirejs: any;
declare const require: any;

const watHeader = `;; //
;; // WebAssembly Text Format (module.wat)
;; //

`;
const wasmHeader = `

;; //
;; // Base64-encoded WebAssembly Binary (module.wasm)
;; //

; `;

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  info: `
  <h3>AssemblyScript</h3>
  <div>A language made for WebAssembly.</div>
  <ul>
    <li><a href="https://www.assemblyscript.org/" target="_blank" rel="noopener">AssemblyScript official website</a></li>
    <li><a href="https://www.assemblyscript.org/introduction.html" target="_blank" rel="noopener">AssemblyScript documentation</a></li>
    <!-- <li><a href="#">AssemblyScript usage in LocalPen</a></li> -->
    <li><a href="?template=assemblyscript" target="_parent" data-template="assemblyscript">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => {
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js');
      if ((self as any).assemblyscriptSDK === undefined) {
        (self as any).assemblyscriptSDK = new Promise<void>(async (resolve) => {
          requirejs.config({ waitSeconds: 0 });
          require(['https://cdn.jsdelivr.net/npm/assemblyscript@0.19.7/dist/sdk.js'], (
            sdk: any,
          ) => {
            resolve(sdk);
          });
        });
      }
      async function assemblyscriptToBase64(code: string, options: any) {
        const asc = (await (self as any).assemblyscriptSDK).asc;
        await asc.ready;
        try {
          const { text, binary } = await asc.compileString(code, options);
          const blob = new Blob([binary.buffer]);
          const base64 = await toBase64(blob);
          return watHeader + text + wasmHeader + base64;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return '';
        }
      }
      return (code, { config }) =>
        assemblyscriptToBase64(code, {
          optimizeLevel: 3,
          ...getLanguageCustomSettings('assemblyscript', config),
        });
    },
    scripts: ['https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'],
    inlineScript: `
    (() => {
      globalThis.wasm = new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
          const script = document.querySelector('script[type="application/wasm-base64"]');
          const base64 = (script?.innerHTML || '').split(\`${wasmHeader}\`)[1];
          if (!base64) {
            resolve({exports:{}});
          } else {
            require([
              'https://cdn.jsdelivr.net/npm/@assemblyscript/loader@0.19.7/umd/index.js',
            ], (loader) => {
              fetch(base64).then(async (res) => {
                const blob = await res.blob();
                const binaryBuffer = await blob.arrayBuffer();
                if (binaryBuffer === null) return reject();
                const module = await loader.instantiate(binaryBuffer);
                resolve(module);
              });
            });
          }
        });
      });
    })();
`,
    scriptType: 'application/wasm-base64',
  },
  extensions: ['as', 'ts'],
  editor: 'script',
  editorLanguage: 'typescript',
};
