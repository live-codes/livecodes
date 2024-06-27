/* eslint-disable import/no-internal-modules */
import type TS from 'typescript';
import type { Compilers, Config, CompileOptions, EditorLibrary } from '../models';
import { languages, processors } from '../languages';
import { comlinkBaseUrl, vendorsBaseUrl } from '../vendors';
import { doOnce, objectFilter } from '../utils/utils';
import { getCompilerOptions } from '../editor/ts-compiler-options';
import type { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent } from './models';
import { getAllCompilers } from './get-all-compilers';
declare const importScripts: (...args: string[]) => void;

const typescriptAtaUrl = vendorsBaseUrl + 'typescript-ata/typescript-ata.js';
const typescriptVfsUrl = vendorsBaseUrl + 'typescript-vfs/typescript-vfs.js';

let compilers: Compilers;
let baseUrl: string | undefined;
let tsvfsMap: Map<string, string> | undefined;

const worker: Worker & {
  ts?: typeof TS;
  typescriptATA?: any;
  typescriptVFS?: any;
  Comlink?: any;
  CodemirrorTsWorker?: any;
} = self as any;
(self as any).window = self;

const loadLanguageCompiler = async (
  language: LanguageOrProcessor,
  config: Config,
  baseUrl: string | undefined,
) => {
  if (!baseUrl) {
    throw new Error('baseUrl is not set');
  }

  if (!compilers) {
    compilers = getAllCompilers([...languages, ...processors], config, baseUrl);
  }
  const languageCompiler = compilers[language];

  if (!languageCompiler) {
    throw new Error('No compiler found for: ' + language);
  }

  if (languageCompiler.dependencies && languageCompiler.dependencies.length > 0) {
    for (const dependency of languageCompiler.dependencies) {
      await loadLanguageCompiler(dependency, config, baseUrl);
    }
  }

  if (typeof languageCompiler.fn !== 'function') {
    if (languageCompiler.aliasTo && typeof compilers[languageCompiler.aliasTo]?.fn === 'function') {
      languageCompiler.fn = compilers[languageCompiler.aliasTo].fn;
    } else {
      let tries = 3;
      const load = async () => {
        try {
          if (languageCompiler.url) {
            importScripts(languageCompiler.url);
          }
          languageCompiler.fn = await languageCompiler.factory(config, baseUrl);
          if (languageCompiler.aliasTo) {
            compilers[languageCompiler.aliasTo].fn = languageCompiler.fn;
          }
        } catch {
          tries -= 1;
          if (tries > 0) {
            // eslint-disable-next-line no-console
            console.warn(`Failed to load compiler for: ${language}. Retrying...`);
            load();
          } else {
            // eslint-disable-next-line no-console
            console.warn(`Failed to load compiler for: ${language}. Reloading...`);
            worker.postMessage({ type: 'load-failed', payload: language });
          }
        }
      };

      await load();
    }
  }

  const loadedMessage: CompilerMessage = { type: 'loaded', payload: language };
  worker.postMessage(loadedMessage);
};

const compile = async (
  content: string,
  language: LanguageOrProcessor,
  config: Config,
  options: CompileOptions,
) => {
  const compiler = compilers[language]?.fn;
  if (!baseUrl || typeof compiler !== 'function') {
    throw new Error('Failed to load compiler for: ' + language);
  }

  let value;
  try {
    value = await compiler(content, { config, language, baseUrl, options });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed compiling: ' + language, err);
    value = content;
  }
  return value || '';
};

const loadTypeScript = async () => {
  if (worker.ts) return;
  await loadLanguageCompiler('typescript', {} as Config, baseUrl);
};

// see https://twitter.com/hatem_hosny_/status/1790644616175235323
let resolveFn: ((value: EditorLibrary[]) => void) | undefined;
let ata: any;

const getTypesFromAta = async (code: string) =>
  new Promise<EditorLibrary[]>(async (resolve) => {
    if (!code?.trim()) {
      resolve([]);
      return;
    }

    // load dependencies
    await loadTypeScript();
    if (!worker.typescriptATA) {
      importScripts(typescriptAtaUrl);
    }
    const setupTypeAcquisition = worker.typescriptATA.setupTypeAcquisition;

    // setup
    const ataTypes: EditorLibrary[] = [];
    resolveFn = resolve;
    ata =
      ata ||
      setupTypeAcquisition({
        projectName: 'Playground',
        typescript: worker.ts,
        logger: {
          log: () => undefined,
          error: () => undefined,
          groupCollapsed: () => undefined,
          groupEnd: () => undefined,
        },
        delegate: {
          receivedFile: (code: string, path: string) => {
            ataTypes.push({ content: code, filename: path });
          },
          progress: (_downloaded: number, _total: number) => {
            // console.log({ _downloaded, _total })
          },
          started: () => {
            // console.log('ATA start');
          },
          finished: (_files: Map<string, string>) => {
            if (typeof resolveFn === 'function') {
              resolveFn(ataTypes);
            }
          },
        },
      });

    // run ATA
    ata(code);
  });

worker.addEventListener(
  'message',
  async (event: CompilerMessageEvent) => {
    const message = event.data;
    if (message.type === 'init') {
      const config = message.payload;
      baseUrl = message.baseUrl;
      compilers = getAllCompilers([...languages, ...processors], config, baseUrl);
      const initSuccessMessage: CompilerMessage = {
        type: 'init-success',
      };
      worker.postMessage(initSuccessMessage);
    }

    if (message.type === 'load' || message.type === 'compileInCompiler') {
      const { language, config } = message.payload;
      await loadLanguageCompiler(language, config, baseUrl);
    }

    if (message.type === 'compile' || message.type === 'compileInCompiler') {
      const { content, language, config, options } = message.payload;
      try {
        const compiled = await compile(content, language, config, options);
        const compiledMessage: CompilerMessage = {
          type: 'compiled',
          trigger: message.type,
          payload: { language, content, compiled, config, options },
        };
        worker.postMessage(compiledMessage);
      } catch (error: any) {
        const compileFailedMessage: CompilerMessage = {
          type: 'compile-failed',
          trigger: message.type,
          payload: { language, content, error: error.message },
        };
        worker.postMessage(compileFailedMessage);
      }
    }

    if (message.type === 'ts-features') {
      await loadTypeScript();
      const { feature, data, id } = message.payload;
      if (feature === 'getOptionDeclarations') {
        // @ts-ignore - ts.optionDeclarations is private
        const optionDeclarations = worker.ts?.optionDeclarations.map((x) =>
          objectFilter(x, (value: any) => {
            if (typeof value === 'function') return false;
            return true;
          }),
        );
        worker.postMessage({
          type: 'ts-features',
          payload: { id, data: optionDeclarations },
        });
      }
      if (feature === 'ata') {
        worker.postMessage({
          type: 'ts-features',
          payload: { id, data: await getTypesFromAta(data) },
        });
      }
      if (feature === 'initCodeMirrorTS') {
        await initCodemirrorTS();
        worker.postMessage({
          type: 'ts-features',
          payload: { id, data: 'done' },
        });
      }
      if (feature === 'addTypes') {
        await initCodemirrorTS();
        if (!tsvfsMap) return;
        tsvfsMap.set(data.filename, data.content);
      }
    }
  },
  false,
);

const initCodemirrorTS = doOnce(async () => {
  await loadTypeScript();
  importScripts(comlinkBaseUrl + 'umd/comlink.js');
  importScripts(typescriptVfsUrl);
  importScripts(
    `${baseUrl}vendor/codemirror/${process.env.codemirrorVersion}/codemirror-ts.worker.js`,
  );
  const { createWorker } = worker.CodemirrorTsWorker;
  const { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } =
    worker.typescriptVFS;
  tsvfsMap = await createDefaultMapFromCDN(
    { target: worker.ts?.ScriptTarget.ES2022 },
    worker.ts?.version,
    false,
    worker.ts,
  );
  const system = createSystem(tsvfsMap);
  const compilerOpts = getCompilerOptions('tsx');
  const env = createVirtualTypeScriptEnvironment(system, [], worker.ts, compilerOpts);
  worker.Comlink.expose(createWorker(() => env));
});
