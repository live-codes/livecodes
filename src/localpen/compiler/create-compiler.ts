import { getLanguageEditorId, languages, postProcessors } from '../languages';
import { Language, Pen, Compilers, EditorId } from '../models';
import { getCompilers } from './get-compilers';
import { LanguageOrProcessor, CompilerMessage, CompilerMessageEvent } from './models';

export const createCompiler = (config: Pen) => {
  const compilers = getCompilers([...languages, ...postProcessors], config);

  const worker = new Worker(config.baseUrl + 'compile.worker.js');
  const configMessage: CompilerMessage = { type: 'init', payload: config };
  worker.postMessage(configMessage);

  const createLanguageCompiler = (language: LanguageOrProcessor) => (
    content: string,
    config: Pen,
  ) =>
    new Promise((resolve, reject) => {
      const compileMessage: CompilerMessage = {
        type: 'compile',
        payload: { content, language, config },
      };
      worker.postMessage(compileMessage);
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
            reject(language + ' compile failed');
          }
        }
      };
      worker.addEventListener('message', handler);
    });

  const load = (languages: LanguageOrProcessor[], config: Pen) =>
    Promise.all(
      languages.map(
        (language) =>
          new Promise(async (resolve) => {
            if (language === 'jsx') {
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

  const compile = async (content: string, language: Language, config: Pen): Promise<string> => {
    if (language === 'jsx') {
      language = 'typescript';
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

    return Promise.resolve(processed);
  };

  const postProcess = async (content: string, language: Language, config: Pen) => {
    for (const processor of postProcessors) {
      if (
        (config as any)[processor.name] === true &&
        processor.editors?.includes(getLanguageEditorId(language) as EditorId)
      ) {
        if (compilers[processor.name] && !compilers[processor.name].fn) {
          await load([processor.name], config);
        }
        const process = compilers[processor.name].fn;
        if (typeof process !== 'function') {
          throw new Error('Failed to load processor: ' + processor.name);
        }
        switch (processor.name) {
          case 'autoprefixer':
            return process(content);
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
