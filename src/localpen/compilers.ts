import { getLanguageEditorId, postProcessors } from './languages';
import { Language, LanguageSpecs, Pen, Compiler, Compilers, Processors, EditorId } from './models';

export const importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const replaceImports = (code: string, config: Pen) =>
  code.replace(importsPattern, (statement) => {
    const libName = statement.replace(importsPattern, '$2').replace(/"/g, '').replace(/'/g, '');
    if (libName.startsWith('http') || libName.startsWith('.') || libName.startsWith('/')) {
      return statement;
    }
    const localModule = config.modules.find((module) => module.name === libName);
    const libPath = localModule?.url || 'https://cdn.skypack.dev/' + libName;
    return statement.replace(importsPattern, `$1'${libPath}'$3`);
  });

export const getCompilersData = (languages: Array<LanguageSpecs | Processors>, config: Pen) =>
  languages.reduce((compilers, language) => {
    if (language.compiler && !compilers[language.name]) {
      const baseUrl = config.baseUrl;
      if (typeof language.compiler === 'string') {
        const compiler = languages.find((lang) => lang.name === (language.compiler as Language))
          ?.compiler as Compiler;
        compilers[language.name] = {
          ...compiler,
          url: baseUrl + compiler?.url,
        } as Compiler;
      } else {
        compilers[language.name] = {
          ...language.compiler,
          url: baseUrl + language.compiler?.url,
        } as Compiler;
      }
    }
    return compilers;
  }, {} as Compilers);

export const compile = async (
  language: Language,
  content: string,
  compilers: Compilers,
  config: Pen,
  eventsManager: any,
): Promise<string> => {
  if (language === 'jsx') {
    language = 'typescript';
  }
  if (compilers[language] && !compilers[language].fn) {
    await loadCompilers([language], compilers, config, eventsManager);
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

  await Promise.all(
    postProcessors.map(async (processor) => {
      if (
        (config as any)[processor.name] === true &&
        processor.editors?.includes(getLanguageEditorId(language) as EditorId)
      ) {
        if (compilers[processor.name] && !compilers[processor.name].fn) {
          await loadCompilers([processor.name], compilers, config, eventsManager);
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
    }),
  );

  return Promise.resolve(value || '');
};

export const loadCompilers = (
  languages: string[],
  compilers: Compilers,
  config: Pen,
  eventsManager: any,
) =>
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
