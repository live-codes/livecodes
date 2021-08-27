import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;
declare const requirejs: any;
declare const require: any;

const requireUrl = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js';
const sdkUrl = 'https://cdn.jsdelivr.net/npm/assemblyscript@0.19.7/dist/sdk.js';
const loaderUrl = 'https://cdn.jsdelivr.net/npm/@assemblyscript/loader@0.19.7/umd/index.js';

const watHeader = `;; //
;; // WebAssembly Text Format (module.wat)
;; //

`;
const wasmHeader = `

;; //
;; // WebAssembly Binary - Uint8Array (module.wasm)
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
      importScripts(requireUrl);
      if ((self as any).assemblyscriptSDK === undefined) {
        (self as any).assemblyscriptSDK = new Promise<void>(async (resolve) => {
          requirejs.config({ waitSeconds: 0 });
          require([sdkUrl], (sdk: any) => {
            resolve(sdk);
          });
        });
      }
      async function compile(code: string, options: any) {
        const asc = (await (self as any).assemblyscriptSDK).asc;
        await asc.ready;
        try {
          const { text, binary } = await asc.compileString(code, options);
          const arrayString = binary.toString('utf-8');
          return watHeader + text + wasmHeader + arrayString;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return '';
        }
      }
      return (code, { config }) =>
        compile(code, {
          optimizeLevel: 3,
          ...getLanguageCustomSettings('assemblyscript', config),
        });
    },
    scripts: [requireUrl],
    inlineScript: `
    (() => {
      globalThis.wasm = new Promise((resolve, reject) => {
        const getWat = (code = '') => {
          const arrayString = code.split(\`${wasmHeader}\`)[1];
          const text = code.split(\`${wasmHeader}\`)[0].split(\`${watHeader}\`)[1];
          return [arrayString, text]
        }
        window.addEventListener("load", async () => {
          const script = document.querySelector('script[type="application/wasm"]');
          const [arrayString, text] = getWat(script?.innerHTML);
          if (!arrayString) {
            resolve({exports:{}});
          } else {
            require(['${loaderUrl}'], (loader) => {
              function arrayToBuffer(array) {
                return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
              }
              const binary = new Uint8Array(arrayString.split(',').map(Number));
              const binaryBuffer = arrayToBuffer(binary);
              if (binaryBuffer === null) return reject();
              loader.instantiate(binaryBuffer).then(wasmModule => {
                resolve({wasmModule, text, binary});
              });
            });
          }
        });
      });
    })();
`,
    scriptType: 'application/wasm',
  },
  extensions: ['as', 'ts'],
  editor: 'script',
  editorLanguage: 'typescript',
};
