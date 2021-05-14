import { getLanguageEditorId, languages, processors } from '../languages';
import { Language, Pen, Compilers, EditorId } from '../models';
import { getAllCompilers } from './get-all-compilers';
import { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent, Compiler } from './models';

export const createCompiler = (config: Pen): Compiler => {
  const compilers = getAllCompilers([...languages, ...processors], config);

  const worker = new Worker(config.baseUrl + 'compile.worker.js');
  const configMessage: CompilerMessage = { type: 'init', payload: config };
  worker.postMessage(configMessage);

  const createLanguageCompiler = (language: LanguageOrProcessor) => (
    content: string,
    config: Pen,
  ) =>
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
        payload: { content, language, config },
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

  const cache: { [key in Language]?: { content: string; compiled: string } } = {};

  const compile = async (
    content: string,
    language: Language,
    config: Pen,
    purgeCache = false, // TODO implement (changing processors should purge cache)
  ): Promise<string> => {
    if (['jsx', 'tsx'].includes(language)) {
      language = 'typescript';
    }

    if (!purgeCache && cache[language]?.content === content) {
      return cache[language]?.compiled || '';
    }

    if (compilers[language] && !compilers[language].fn) {
      await load([language], config);
    }

    const compiler = compilers[language]?.fn || ((...args: any[]) => args[0]);
    if (typeof compiler !== 'function') {
      throw new Error('Failed to load transpiler for: ' + language);
    }

    const compiled = (await compiler(content, config)) || '';
    const processed = (await postProcess(compiled, language, config)) || '';

    cache[language] = {
      content,
      compiled: processed,
    };

    return Promise.resolve(processed);
  };

  const postProcess = async (content: string, language: Language, config: Pen) => {
    for (const processor of processors) {
      if (processor.editors?.includes(getLanguageEditorId(language) as EditorId)) {
        if (compilers[processor.name] && !compilers[processor.name].fn) {
          await load([processor.name], config);
        }
        const process = compilers[processor.name].fn;
        if (typeof process !== 'function') {
          throw new Error('Failed to load processor: ' + processor.name);
        }
        switch (processor.name) {
          case 'postcss':
            return process(content, config);
        }
      }
    }
    return content;
  };

  return {
    load,
    compile,
  };
};
