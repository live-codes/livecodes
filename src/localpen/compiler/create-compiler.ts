import { getLanguageEditorId, languages, postProcessors } from '../languages';
import { Language, Pen, Compilers, EditorId } from '../models';
import { getCompilers } from './compilers';
import { replaceImports } from './replace-imports';

export const createCompiler = (config: Pen, eventsManager: any) => {
  const compilers = getCompilers([...languages, ...postProcessors], config);

  const load = (languages: string[], config: Pen) =>
    Promise.all(
      languages.map(
        (language) =>
          new Promise(async (resolve) => {
            if (language === 'jsx') {
              language = 'typescript';
            }
            const languageCompiler = compilers[language as keyof Compilers];
            if (languageCompiler && !languageCompiler.fn) {
              if (languageCompiler.umd) {
                const script = document.createElement('script');
                script.src = languageCompiler.url;
                eventsManager.addEventListener(
                  script,
                  'load',
                  () => {
                    languageCompiler.fn = languageCompiler.factory(null, config);
                    resolve('done');
                  },
                  false,
                );
                document.head.appendChild(script);
              } else {
                try {
                  const module = await import(languageCompiler.url);
                  languageCompiler.fn = languageCompiler.factory(module, config);
                  resolve('done');
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error('Could not load: ' + languageCompiler.url + '\n' + error);
                }
              }
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

    let value = '';
    switch (language) {
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
      default:
        value = content;
    }

    value = value || '';

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
            try {
              value = (await process(value, { from: undefined })).css;
            } catch (error) {
              // do nothing
            }
        }
      }
    }

    return Promise.resolve(value || '');
  };

  return {
    load,
    compile,
  };
};
