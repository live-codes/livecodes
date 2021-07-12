import { languages, processors } from '../languages';
import { CompileOptions, Compilers, Pen } from '../models';
import { getAllCompilers } from './get-all-compilers';
import { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent } from './models';
declare const importScripts: (...args: string[]) => void;

let compilers: Compilers;

const worker: Worker = self as any;
(self as any).window = self;

const loadLanguageCompiler = (language: LanguageOrProcessor, config: Pen, baseUrl: string) => {
  if (!compilers) {
    compilers = getAllCompilers([...languages, ...processors], config, baseUrl);
  }
  const languageCompiler = compilers[language];
  if (languageCompiler.dependencies && languageCompiler.dependencies.length > 0) {
    languageCompiler.dependencies.forEach((dependency) => {
      loadLanguageCompiler(dependency, config, baseUrl);
    });
  }
  if (typeof languageCompiler.fn !== 'function') {
    if (languageCompiler.aliasTo && typeof compilers[languageCompiler.aliasTo]?.fn === 'function') {
      languageCompiler.fn = compilers[languageCompiler.aliasTo].fn;
    } else {
      try {
        importScripts(languageCompiler.url);
        languageCompiler.fn = languageCompiler.factory(null, config);
        if (languageCompiler.aliasTo) {
          compilers[languageCompiler.aliasTo].fn = languageCompiler.fn;
        }
      } catch (error) {
        throw new Error('Failed to load compiler for: ' + language);
      }
    }
  }

  const loadedMessage: CompilerMessage = { type: 'loaded', payload: language };
  worker.postMessage(loadedMessage);
};

const compile = async (
  content: string,
  language: LanguageOrProcessor,
  config: Partial<Pen | CompileOptions>,
  baseUrl: string,
) => {
  const compiler = compilers[language]?.fn || ((...args: any[]) => args[0]);
  if (typeof compiler !== 'function') {
    throw new Error('Failed to load compiler for: ' + language);
  }

  const typescriptOptions = {
    target: 'es2015',
    jsx: 'react',
    allowUmdGlobalAccess: true,
    esModuleInterop: true,
  };

  let value;
  try {
    value = await compiler(content, { language, config, typescriptOptions, baseUrl });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed compiling: ' + language, err);
    value = content;
  }
  return value || '';
};

worker.addEventListener(
  'message',
  async (event: CompilerMessageEvent) => {
    const message = event.data;
    let baseUrl = self.location.href.split('/').slice(0, -1).join('/') + '/';
    if (message.type === 'init') {
      const config = message.payload;
      baseUrl = message.baseUrl;
      compilers = getAllCompilers([...languages, ...processors], config, baseUrl);
    }

    if (message.type === 'load') {
      const { language, config } = message.payload;
      loadLanguageCompiler(language, config, baseUrl);
    }

    if (message.type === 'compile') {
      const { content, language, config } = message.payload;
      try {
        const compiled = await compile(content, language, config, baseUrl);
        const compiledMessage: CompilerMessage = {
          type: 'compiled',
          payload: { language, content, compiled },
        };
        worker.postMessage(compiledMessage);
      } catch (error) {
        const compileFailedMessage: CompilerMessage = {
          type: 'compile-failed',
          payload: { language, content, error: error.message },
        };
        worker.postMessage(compileFailedMessage);
      }
    }
  },
  false,
);
