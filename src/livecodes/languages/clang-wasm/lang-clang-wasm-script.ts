/* eslint-disable no-console */
import { clangWasmBaseUrl } from '../../vendors';
import { runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// One runner serves all four Clang languages. The language is read from the script tags the
// compiler injected into the page, so only the script type differs between them.
const LANGUAGES = {
  'text/c-wasm': 'c',
  'text/cpp-wasm': 'cpp',
  'text/objc-wasm': 'objc',
  'text/objcpp-wasm': 'objcpp',
} as const;

type ScriptType = keyof typeof LANGUAGES;
type LanguageId = (typeof LANGUAGES)[ScriptType];

const SCRIPT_TYPES = Object.keys(LANGUAGES) as ScriptType[];

const SCRIPT_TYPE_BY_LANGUAGE = Object.fromEntries(
  SCRIPT_TYPES.map((scriptType) => [LANGUAGES[scriptType], scriptType]),
) as Record<LanguageId, ScriptType>;

/** The LiveCodes language names, which are the `config.customSettings` keys. */
const LANGUAGE_NAMES: Record<LanguageId, string> = {
  c: 'c-wasm',
  cpp: 'cpp-wasm',
  objc: 'objc-wasm',
  objcpp: 'objcpp-wasm',
};

/** Options forwarded to `@live-codes/clang-wasm`'s `run`, read from `config.customSettings`. */
interface ClangWasmSettings {
  std?: string;
  compileArgs?: string[];
  args?: string[];
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface ClangWasmApi {
  ready: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runners: Partial<Record<LanguageId, Runner>>;
  settings?: Record<string, ClangWasmSettings>;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, ClangWasmApi>;
};

const getWorkerSrc = (language: LanguageId) => `
importScripts(${JSON.stringify(clangWasmBaseUrl + 'dist/clang-wasm.global.js')});

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    self.clangWasm.createCompiler(${JSON.stringify(language)}, {
      baseUrl: ${JSON.stringify(clangWasmBaseUrl + 'assets/')},
    });
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input, options } = event.data;
  try {
    const result = await (await getCompiler()).run(code, input, options);
    postMessage({
      id,
      result: {
        output: result.output,
        errors: result.errors,
        exitCode: result.exitCode,
      },
    });
  } catch (error) {
    postMessage({ id, error: String((error && error.message) || error) });
  }
});

getCompiler().then(
  () => postMessage({ type: 'ready' }),
  (error) => postMessage({ type: 'error', message: String((error && error.message) || error) }),
);
`;

const getLanguage = (): LanguageId | null => {
  for (const scriptType of SCRIPT_TYPES) {
    if (document.querySelector(`script[type="${scriptType}"]`)) {
      return LANGUAGES[scriptType];
    }
  }
  return null;
};

const getCode = (language: LanguageId) => {
  let code = '';
  document
    .querySelectorAll(`script[type="${SCRIPT_TYPE_BY_LANGUAGE[language]}"]`)
    .forEach((script) => {
      code += `${script.innerHTML}\n`;
    });
  return code;
};

const setResult = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
): RunResult => {
  clangWasm.input = input;
  clangWasm.output = output;
  clangWasm.error = error;
  clangWasm.exitCode = exitCode;
  clangWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.clangWasm ??= {} as ClangWasmApi;

const clangWasm = window.livecodes.clangWasm;
clangWasm.ready = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm
// worker instead of spawning a new one.
clangWasm.runners ??= {};

/**
 * The custom settings of the running language, injected by the language's `inlineScript`.
 * They are read on every run, so edits apply to the warm worker without relaunching it.
 */
const getSettings = (language: LanguageId): ClangWasmSettings => {
  const settings = clangWasm.settings?.[LANGUAGE_NAMES[language]];
  return settings != null && typeof settings === 'object' ? settings : {};
};

/** Start (once) downloading the toolchain, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = clangWasm.init;
  if (!init) {
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await runner.ensureReady();
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      clangWasm.init = null;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    clangWasm.init = init;
  }
  return init;
};

clangWasm.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (clangWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

clangWasm.run = async (input?: string) => {
  const stdin = `${input ?? clangWasm.input ?? ''}`;
  const language = getLanguage();
  if (!language) return setResult(stdin, null, null, null);

  const code = getCode(language);
  if (!code.trim()) return setResult(stdin, null, null, null);

  const runner = (clangWasm.runners[language] =
    clangWasm.runners[language] ||
    createWorkerRunner({ getWorkerSrc: () => getWorkerSrc(language), label: 'Clang' }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult, getSettings(language));
};

// One alias per language, plus `cpp` for playgrounds written before the languages were split.
window.livecodes.c = clangWasm;
window.livecodes.cpp = clangWasm;
window.livecodes.objc = clangWasm;
window.livecodes.objcpp = clangWasm;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await clangWasm.run(clangWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
