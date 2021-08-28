import { LanguageSpecs } from '../models';
import { typedArrayToBuffer } from '../utils';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;
declare const requirejs: any;
declare const require: any;

const requireUrl = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js';
const sdkUrl = 'https://cdn.jsdelivr.net/npm/assemblyscript@0.19.7/dist/sdk.js';
const loaderUrl = 'https://cdn.jsdelivr.net/npm/@assemblyscript/loader@0.19.7/umd/index.js';

const scriptType = 'application/wasm-uint8';
const watHeader = `;; WebAssembly Text Format (module.wat)\n\n`;
const wasmHeader = `\n\n;; WebAssembly Binary (module.wasm)\n;; `;

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  info: `
  <h3>AssemblyScript</h3>
  <div>A TypeScript-like language for WebAssembly.</div>
  <ul>
    <li><a href="https://www.assemblyscript.org/" target="_blank" rel="noopener">AssemblyScript official website</a></li>
    <li><a href="https://www.assemblyscript.org/introduction.html" target="_blank" rel="noopener">AssemblyScript documentation</a></li>
    <!-- <li><a href="#">AssemblyScript usage in LocalPen</a></li> -->
    <li><a href="?template=assemblyscript" target="_parent" data-template="assemblyscript">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel],
  },
  compiler: {
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
          if (!binary) return '';
          const arrayString = binary.toString();
          return watHeader + text + wasmHeader + 'Uint8Array [' + arrayString + ']';
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
    scripts: [loaderUrl],
    inlineScript: `
    (() => {
      globalThis.loadWasm = () => new Promise((resolve, reject) => {
        const stringToWasm = (code = '') => {
          if (!code) {
            return {text: '', binary: null}
          }
          const text = code.split(\`${watHeader}\`)[1].split(\`${wasmHeader}\`)[0];
          const arrayString = code.split(\`${wasmHeader}\`)[1].split('[')[1].slice(0,-1);
          const binary = new Uint8Array(arrayString.split(',').map(Number));
          return {text, binary}
        }
        const typedArrayToBuffer = ${typedArrayToBuffer};
        window.addEventListener("load", () => {
          const script = document.querySelector('script[type="${scriptType}"]');
          const {text, binary} = stringToWasm(script?.innerHTML);
          if (!binary) {
            resolve({ wasmModule: { exports: {} }, text, binary });
          } else {
            const binaryBuffer = typedArrayToBuffer(binary);
            loader.instantiate(binaryBuffer).then(wasmModule => {
              resolve({wasmModule, text, binary});
            });
          }
        });
      });
    })();
`,
    scriptType,
    compiledCodeLanguage: 'wat',
  },
  extensions: ['as', 'ts'],
  editor: 'script',
  editorLanguage: 'typescript',
};
