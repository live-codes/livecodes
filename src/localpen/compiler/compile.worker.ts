import { languages, postProcessors } from '../languages';
import { Compilers, Pen } from '../models';
import { getAllCompilers } from './get-all-compilers';
import { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent } from './models';
import { replaceImports } from './replace-imports';
declare const importScripts: (...args: string[]) => void;

let compilers: Compilers;

const worker: Worker = self as any;
(self as any).window = self;

const loadLanguageCompiler = async (language: LanguageOrProcessor, config: Pen) => {
  if (!compilers) {
    compilers = getAllCompilers([...languages, ...postProcessors], config);
  }

  const languageCompiler = compilers[language];
  try {
    importScripts(languageCompiler.url);
    languageCompiler.fn = languageCompiler.factory(null, config);
  } catch (error) {
    throw new Error('Failed to load transpiler for: ' + language);
  }

  const loadedMessage: CompilerMessage = { type: 'loaded', payload: language };
  worker.postMessage(loadedMessage);
};

const compile = async (content: string, language: LanguageOrProcessor, config: Pen) => {
  const compiler = compilers[language]?.fn || ((...args: any[]) => args[0]);
  if (typeof compiler !== 'function') {
    throw new Error('Failed to load transpiler for: ' + language);
  }

  let value = '';
  switch (language) {
    case 'markdown':
      value = compiler(content);
      break;
    case 'pug':
      value = compiler(content);
      break;
    case 'asciidoc':
      value = compiler(content);
      break;
    case 'scss':
      value = (await compiler(content)).text;
      break;
    case 'sass':
      value = (await compiler(content, { indentedSyntax: true })).text;
      break;
    case 'less':
      value = (await compiler(content)).css;
      break;
    case 'stylus':
      value = await compiler(content);
      break;
    case 'javascript':
      value = replaceImports(content, config);
      break;
    case 'typescript':
      value = compiler(replaceImports(content, config), {
        target: 'es2015',
        jsx: 'react',
      });
      break;
    case 'coffeescript':
      value = compiler(replaceImports(content, config), { bare: true });
      break;
    case 'python':
      value = compiler(content);
      break;

    // Post-processors
    case 'autoprefixer':
      try {
        value = (await compiler(content, { from: undefined })).css;
      } catch {
        value = content;
      }
      break;

    default:
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
      compilers = getAllCompilers([...languages, ...postProcessors], config);
    }

    if (message.type === 'load') {
      const { language, config } = message.payload;
      await loadLanguageCompiler(language, config);
    }

    if (message.type === 'compile') {
      const { content, language, config } = message.payload;
      try {
        const compiled = await compile(content, language, config);
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
