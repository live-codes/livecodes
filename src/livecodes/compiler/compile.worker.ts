import { languages, processors } from '../languages';
import type { Compilers, Config, CompileOptions } from '../models';
import { getAllCompilers } from './get-all-compilers';
import type { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent } from './models';
declare const importScripts: (...args: string[]) => void;

let compilers: Compilers;
let baseUrl: string | undefined;

const worker: Worker = self as any;
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
  },
  false,
);
