import {
  getActivatedProcessors,
  getLanguageEditorId,
  getCustomSettings,
  languages,
  processorIsActivated,
  processorIsEnabled,
  processors,
} from '../languages';
import type {
  Language,
  Config,
  Compilers,
  CompilerFunction,
  CompileOptions,
  CompileResult,
  CompileInfo,
} from '../models';
import { getAppCDN, sandboxService } from '../services';
import { stringify } from '../utils';
import { createCompilerSandbox } from './compiler-sandbox';
import { getAllCompilers } from './get-all-compilers';
import { hasStyleImports } from './import-map';
import type {
  LanguageOrProcessor,
  CompilerMessage,
  CompilerMessageEvent,
  Compiler,
} from './models';
import { getCompileResult } from './utils';

export const createCompiler = async ({
  config,
  baseUrl,
  eventsManager,
}: {
  config: Config;
  baseUrl: string;
  eventsManager: any;
}): Promise<Compiler> => {
  let compilers: Compilers;
  let compilerSandbox: Window;
  const compilerOrigin = sandboxService.getOrigin();

  // number of tries to reload the compilers if loading fails
  let reloads = 3;

  const initialize = async () =>
    new Promise(async (resolve) => {
      compilers = getAllCompilers([...languages, ...processors], config, baseUrl);
      const compilerUrl = sandboxService.getCompilerUrl() + '?appCDN=' + getAppCDN();
      compilerSandbox = await createCompilerSandbox(compilerUrl);

      eventsManager.addEventListener(window, 'message', async (event: CompilerMessageEvent) => {
        if (
          event.origin === compilerOrigin &&
          event.source === compilerSandbox &&
          event.data.type === 'init-success'
        ) {
          resolve('done');
        }
      });

      const configMessage: CompilerMessage = {
        type: 'init',
        payload: config,
        baseUrl,
        scriptUrl: baseUrl + '{{hash:compiler-utils.js}}',
      };
      compilerSandbox.postMessage(configMessage, compilerOrigin);
    });

  const createLanguageCompiler =
    (language: LanguageOrProcessor): CompilerFunction =>
    (content, { config, options }): Promise<string | CompileResult> =>
      new Promise((resolve, reject) => {
        const handler = (event: CompilerMessageEvent) => {
          const message = event.data;

          if (
            event.origin === compilerOrigin &&
            event.source === compilerSandbox &&
            message.from === 'compiler' &&
            (message.type === 'compiled' || message.type === 'compile-failed') &&
            message.payload.language === language &&
            message.payload.content === content
          ) {
            window.removeEventListener('message', handler);

            if (message.type === 'compiled') {
              resolve(message.payload.compiled);
            } else if (message.type === 'compile-failed') {
              reject(language + ' compile failed.\n' + message.payload.error);
            }
          }
        };
        window.addEventListener('message', handler);

        const compileMessage: CompilerMessage = {
          type: 'compile',
          payload: { content, language, config, options },
        };
        compilerSandbox.postMessage(compileMessage, compilerOrigin);
      });

  const load = (languages: LanguageOrProcessor[], config: Config) =>
    Promise.allSettled(
      languages.map(
        (language) =>
          new Promise(async (resolve, reject) => {
            if (['jsx', 'tsx'].includes(language)) {
              language = 'typescript';
            }
            const languageCompiler = compilers[language as keyof Compilers];
            if (languageCompiler && !languageCompiler.fn) {
              eventsManager.addEventListener(
                window,
                'message',
                async (event: CompilerMessageEvent) => {
                  if (
                    event.origin === compilerOrigin &&
                    event.source === compilerSandbox &&
                    event.data.from === 'compiler' &&
                    event.data.type === 'loaded' &&
                    event.data.payload === language
                  ) {
                    languageCompiler.fn = createLanguageCompiler(language);
                    resolve('done');
                  } else if (
                    event.origin === compilerOrigin &&
                    event.source === compilerSandbox &&
                    event.data.from === 'compiler' &&
                    event.data.type === 'load-failed' &&
                    event.data.payload === language
                  ) {
                    if (reloads === 0) {
                      reject(`Failed to load compiler for: ${language}.`);
                    } else {
                      reloads -= 1;
                      await initialize();
                      await load(
                        Array.from(
                          new Set([
                            ...languages,
                            config.markup.language,
                            config.style.language,
                            config.script.language,
                          ]),
                        ),
                        config,
                      );
                      resolve('done');
                    }
                  }
                },
              );
              const loadMessage: CompilerMessage = { type: 'load', payload: { language, config } };
              compilerSandbox.postMessage(loadMessage, compilerOrigin);
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
      info: string;
      processors: string;
      languageSettings: string;
    };
  } = {};

  const compile = async (
    content: string,
    language: Language,
    config: Config,
    options: CompileOptions,
  ): Promise<CompileResult> => {
    if (['jsx', 'tsx'].includes(language)) {
      language = 'typescript';
    }

    const enabledProcessors = getActivatedProcessors(language, config);
    const languageSettings = stringify(getCustomSettings(language, config));

    if (
      !options?.forceCompile &&
      cache[language]?.content === content &&
      cache[language]?.processors === enabledProcessors &&
      cache[language]?.languageSettings === languageSettings &&
      cache[language]?.compiled
    ) {
      return {
        code: cache[language]?.compiled || '',
        info: JSON.parse(cache[language]?.info || '{}'),
      } as CompileResult;
    }

    if (compilers[language] && !compilers[language].fn) {
      await load([language], config);
    }

    const compiler = compilers[language]?.fn;
    if (typeof compiler !== 'function') {
      return new Promise<CompileResult>((res) => {
        if (language !== 'html' && language !== 'css' && language !== 'javascript') {
          // eslint-disable-next-line no-console
          console.error('Failed to load compiler for: ' + language);
        }
        res({ code: '', info: {} });
      });
    }

    const compiled =
      getCompileResult(await compiler(content, { config, language, baseUrl, options })) || '';
    const processed =
      getCompileResult(await postProcess(compiled.code, { config, language, baseUrl, options })) ||
      '';
    const info: CompileInfo = {
      ...compiled.info,
      ...processed.info,
    };

    cache[language] = {
      content,
      compiled: processed.code,
      info: JSON.stringify(info),
      processors: enabledProcessors,
      languageSettings: stringify(getCustomSettings(language, config)),
    };

    return { code: processed.code, info };
  };

  const postProcess: CompilerFunction = async (content, { config, language, baseUrl, options }) => {
    let code = content;
    let info: CompileInfo = {};
    let postcssRequired = false;

    const editorId = getLanguageEditorId(language) || 'markup';
    if (editorId === 'style' && hasStyleImports(code)) {
      postcssRequired = true;
    }

    for (const processor of processors) {
      if (
        (processorIsEnabled(processor.name, config) &&
          processorIsActivated(processor.name, config) &&
          processor.editor === editorId) ||
        (editorId === 'style' && processor.name === 'postcss')
      ) {
        if (processor.isPostcssPlugin) {
          postcssRequired = true;
        } else {
          if (processor.name === 'postcss' && !postcssRequired) continue;
          if (compilers[processor.name] && !compilers[processor.name].fn) {
            await load([processor.name], config);
          }
          const process = compilers[processor.name].fn || (async (code: string) => code);
          if (typeof process !== 'function') {
            // eslint-disable-next-line no-console
            console.error('Failed to load processor: ' + processor.name);
            return { code, info };
          }
          const processResult = await process(code, { config, language, baseUrl, options });
          const result = getCompileResult(processResult);
          code = result.code;
          info = {
            ...info,
            ...result.info,
          };
        }
      }
    }

    return { code, info };
  };

  const clearCache = () => {
    (Object.keys(cache) as Array<keyof typeof cache>).forEach((key) => delete cache[key]);
  };

  await initialize();

  return {
    load,
    compile,
    clearCache,
  };
};
