import { cdnUrl } from './lang-cpp';

declare const JSCPP: any;
declare const livecodes: any;

function getWorkerURL() {
  const content = `importScripts("${cdnUrl}");`;
  return URL.createObjectURL(new Blob([content], { type: 'text/javascript' }));
}
const workerUrl = getWorkerURL();
const worker = new JSCPP.AsyncWebWorkerHelper(workerUrl);
URL.revokeObjectURL(workerUrl);
let loaded = false;
livecodes.cpp = {
  source: '',
  input: '',
  output: '',
  exitCode: null,
  error: null,
  run: async (input: string) => {
    livecodes.cpp.input = input ?? '';
    livecodes.cpp.output = '';
    livecodes.cpp.exitCode = null;
    livecodes.cpp.error = null;
    try {
      livecodes.cpp.exitCode = await worker.run(livecodes.cpp.source, livecodes.cpp.input, {
        stdio: {
          write(s: string) {
            livecodes.cpp.output += s;
          },
        },
        // eslint-disable-next-line camelcase
        unsigned_overflow: 'warn',
      });
      // eslint-disable-next-line no-console
      console.log(livecodes.cpp.output);
    } catch (err: any) {
      livecodes.cpp.error = err.message || err;
      livecodes.cpp.exitCode = 1;
      // eslint-disable-next-line no-console
      console.error(livecodes.cpp.error);
    }
    loaded = true;
    return {
      input: livecodes.cpp.input,
      output: livecodes.cpp.output,
      exitCode: livecodes.cpp.exitCode,
      error: livecodes.cpp.error,
    };
  },
  loaded: new Promise<void>(async function (resolve) {
    const i = setInterval(() => {
      if (loaded) {
        clearInterval(i);
        return resolve();
      }
    }, 5);
  }),
};
window.addEventListener('load', async () => {
  const script = document.querySelector('script[type="text/cpp"]');
  const source = script?.innerHTML;
  livecodes.cpp.source = source;
  if (source?.trim()) {
    await livecodes.cpp.run(livecodes.cpp.input);
  }
});
