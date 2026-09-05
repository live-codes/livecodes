import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

const FABLE_STANDALONE = 'https://cdn.jsdelivr.net/npm/fable-standalone@3.8.0/dist';
const FABLE_METADATA = 'https://cdn.jsdelivr.net/npm/fable-metadata@2.2.0/lib';

const compileFSharp = async (code: string, compileOptions: any) => {
  // Extra browser-binding assemblies on top of the Fable core set the worker adds
  // itself (all shipped by fable-metadata). The worker fetches each as
  // <FABLE_METADATA>/<name>.dll — CDN serves them gzip-compressed.
  const EXTRA_REFS = [
    'Browser.Blob',
    'Browser.Dom',
    'Browser.Event',
    'Browser.Gamepad',
    'Browser.WebGL',
    'Browser.WebStorage',
  ];

  // fable-standalone 3.8.0 wire protocol (from the package's src/Worker/Shared.fs)
  const options = ['--define:FABLE_COMPILER', '--langversion:preview'];
  const noSuffix = null; // no refsExtraSuffix: CDN serves *.dll directly

  // worker.min.js loads bundle.min.js via a RELATIVE importScripts
  // it is patched to use absolute URL
  const toDataUrl = (content: string, type = 'text/javascript') =>
    `data:${type};charset=UTF-8;base64,` + btoa(content);

  const workerContent = await fetch(FABLE_STANDALONE + '/worker.min.js').then((r) => r.text());
  const patchedContent = workerContent.replace(
    'importScripts("bundle.min.js")',
    `importScripts('${FABLE_STANDALONE + '/bundle.min.js'}');`,
  );
  const worker = new Worker(toDataUrl(patchedContent));

  function post(message: unknown) {
    worker.postMessage(JSON.stringify(message));
  }

  // The worker answers in request order; keep a queue.
  const pending: Array<{ resolve: (x?: any) => void; reject: (x?: any) => void }> = [];
  let resolveReady: (x?: any) => void;
  let rejectReady: (x?: any) => void;
  worker.addEventListener('message', (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    const [kind] = msg;
    if (kind === 'Loaded') {
      if (resolveReady) resolveReady();
    } else if (kind === 'LoadFailed') {
      if (rejectReady) rejectReady(new Error('LoadFailed'));
    } else if (kind === 'CompilationFinished' || kind === 'CompilerCrashed') {
      pending.shift()?.resolve(msg);
    }
  });
  worker.addEventListener('error', (event) => {
    if (rejectReady) rejectReady(new Error(event.message || 'worker error'));
    pending.shift()?.reject(new Error(event.message || 'worker error'));
  });

  function initChecker() {
    return new Promise((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
      post(['CreateChecker', FABLE_METADATA, EXTRA_REFS, noSuffix, options]);
    });
  }
  const ready = initChecker();

  function request(message: unknown) {
    return new Promise((resolve, reject) => {
      pending.push({ resolve, reject });
      post(message);
    });
  }

  // rewrite the compiled JS's bare runtime imports to absolute CDN URLs
  const rewriteRuntimeImports = (code: string) =>
    code.replace(
      /(["'])fable-library\/([^"']+)\1/g,
      (_m, _q, mod) => `"${FABLE_STANDALONE}/fable-library/${mod}"`,
    );

  async function compile(code: string) {
    const answer: any = await request(['CompileCode', code, 'javascript', options]);
    if (answer[0] === 'CompilerCrashed') {
      throw new Error(answer[1]);
    }
    const [, js, , errors] = answer;
    const hard = (errors ?? []).filter((e: any) => !e.IsWarning);
    if (hard.length || !js) {
      throw new Error(hard.map((e: any) => e.Message).join('\n'));
    }
    return rewriteRuntimeImports(js);
  }

  await ready;
  let compiled = await compile(code);

  if (compiled.includes('export function main() {')) {
    compiled = compiled.trimEnd() + '\n\n' + 'main();';
  }

  return compiled;
};

(self as any).createFSharpCompiler =
  (): CompilerFunction =>
  (code, { config }) =>
    compileFSharp(code, {
      ...getLanguageCustomSettings('fsharp', config),
    });
