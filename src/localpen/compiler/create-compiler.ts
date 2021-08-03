import {
  getEnabledProcessors,
  getLanguageEditorId,
  getCustomSettings,
  languages,
  processorIsActivated,
  processorIsEnabled,
  processors,
} from '../languages';
import { Language, Pen, Compilers, EditorId, CompilerFunction } from '../models';
import { stringify } from '../utils';
import { getAllCompilers } from './get-all-compilers';
import { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent, Compiler } from './models';

export const createCompiler = (config: Pen, baseUrl: string): Compiler => {
  const compilers = getAllCompilers([...languages, ...processors], config, baseUrl);

  const worker = new Worker(baseUrl + 'compile.worker.js');
  const configMessage: CompilerMessage = { type: 'init', payload: config, baseUrl };
  worker.postMessage(configMessage);

  const createLanguageCompiler = (language: LanguageOrProcessor): CompilerFunction => (
    content,
    { config, options },
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const handler = (event: CompilerMessageEvent) => {
        const message = event.data;

        if (
          (message.type === 'compiled' || message.type === 'compile-failed') &&
          message.payload.language === language &&
          message.payload.content === content
        ) {
          worker.removeEventListener('message', handler);

          if (message.type === 'compiled') {
            resolve(message.payload.compiled);
          } else if (message.type === 'compile-failed') {
            reject(language + ' compile failed.\n' + message.payload.error);
          }
        }
      };
      worker.addEventListener('message', handler);

      const compileMessage: CompilerMessage = {
        type: 'compile',
        payload: { content, language, config, options },
      };
      worker.postMessage(compileMessage);
    });

  const load = (languages: LanguageOrProcessor[], config: Pen) =>
    Promise.all(
      languages.map(
        (language) =>
          new Promise(async (resolve) => {
            if (['jsx', 'tsx'].includes(language)) {
              language = 'typescript';
            }
            const languageCompiler = compilers[language as keyof Compilers];
            if (languageCompiler && !languageCompiler.fn) {
              worker.addEventListener('message', (event: CompilerMessageEvent) => {
                if (event.data.type === 'loaded' && event.data.payload === language) {
                  languageCompiler.fn = createLanguageCompiler(language);
                  resolve('done');
                }
              });
              const loadMessage: CompilerMessage = { type: 'load', payload: { language, config } };
              worker.postMessage(loadMessage);
            } else {
              resolve('done');
            }
          }),
      ),
    );

  const cache: {
    [key in Language]?: {
      content: string;
      compiled: string;
      processors: string;
      languageSettings: string;
    };
  } = {};

  const compile = async (
    content: string,
    language: Language,
    config: Pen,
    options?: any,
  ): Promise<string> => {
    if (['jsx', 'tsx'].includes(language)) {
      language = 'typescript';
    }

    const enabledProcessors = getEnabledProcessors(language, config);
    const languageSettings = stringify(getCustomSettings(language, config));

    if (
      cache[language]?.content === content &&
      cache[language]?.processors === enabledProcessors &&
      cache[language]?.languageSettings === languageSettings
    ) {
      return cache[language]?.compiled || '';
    }
    if (compilers[language] && !compilers[language].fn) {
      await load([language], config);
    }

    const compiler = compilers[language]?.fn || ((code: string) => code);
    if (typeof compiler !== 'function') {
      throw new Error('Failed to load compiler for: ' + language);
    }

    const compiled = (await compiler(content, { config, language, baseUrl, options })) || '';
    const processed = (await postProcess(compiled, { config, language, baseUrl, options })) || '';

    cache[language] = {
      content,
      compiled: processed,
      processors: enabledProcessors,
      languageSettings: stringify(getCustomSettings(language, config)),
    };

    return Promise.resolve(processed);
  };

  const postProcess: CompilerFunction = async (content, { config, language, baseUrl, options }) => {
    for (const processor of processors) {
      if (
        processorIsEnabled(processor.name, config) &&
        processorIsActivated(processor.name, config) &&
        processor.editors?.includes(getLanguageEditorId(language || '') as EditorId)
      ) {
        if (compilers[processor.name] && !compilers[processor.name].fn) {
          await load([processor.name], config);
        }
        const process = compilers[processor.name].fn || ((code: string) => code);
        if (typeof process !== 'function') {
          throw new Error('Failed to load processor: ' + processor.name);
        }
        return process(content, { config, language, baseUrl, options });
      }
    }
    return content;
  };

  return {
    load,
    compile,
  };
};
