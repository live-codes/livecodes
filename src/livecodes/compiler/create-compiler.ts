import {
  getActivatedProcessors,
  getCustomSettings,
  getLanguageEditorId,
  processorIsActivated,
  processorIsEnabled,
} from '../languages';
import type {
  CompileInfo,
  CompileOptions,
  CompileResult,
  CompilerFunction,
  Compilers,
  Config,
  EditorLibrary,
  Language,
} from '../models';
import { getAppCDN, sandboxService } from '../services';
import { getRandomString, stringify } from '../utils';
import { createCompilerSandbox } from './compiler-sandbox';
import { getAllCompilers } from './get-all-compilers';
import { hasStyleImports } from './import-map';
import type {
  Compiler,
  CompilerMessage,
  CompilerMessageEvent,
  LanguageOrProcessor,
  TypescriptFeatures,
} from './models';
import { getCompileResult } from './utils';

export const createCompiler = async ({
  config,
  baseUrl,
  eventsManager,
  getTypes,
}: {
  config: Config;
  baseUrl: string;
  eventsManager: any;
  getTypes: (code: string) => Promise<EditorLibrary[]>;
}): Promise<Compiler> => {
  let compilers: Compilers;
  let compilerSandbox: Window;
  const compilerOrigin = sandboxService.getOrigin();

  // number of tries to reload the compilers if loading fails
  let reloads = 3;

  const initialize = async () =>
    new Promise(async (resolve) => {
      compilers = getAllCompilers(
        [...window.deps.languages, ...window.deps.processors],
        config,
        baseUrl,
      );
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

      sendTypesToCompiler();
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
            eventsManager.removeEventListener(window, 'message', handler);

            if (message.type === 'compiled') {
              resolve(message.payload.compiled);
            } else if (message.type === 'compile-failed') {
              reject(language + ' compile failed.\n' + message.payload.error);
            }
          }
        };
        eventsManager.addEventListener(window, 'message', handler);

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
    [key: string]: {
      language: Language;
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
    const filename = options.filename;

    if (
      !options?.forceCompile &&
      cache[filename]?.language === language &&
      cache[filename]?.content === content &&
      cache[filename]?.processors === enabledProcessors &&
      cache[filename]?.languageSettings === languageSettings &&
      cache[filename]?.compiled
    ) {
      return {
        code: cache[filename]?.compiled || '',
        info: JSON.parse(cache[filename]?.info || '{}'),
      } as CompileResult;
    }

    if (compilers[language] && !compilers[language].fn) {
      await load([language], config);
    }

    const compiler = compilers[language]?.fn;
    if (typeof compiler !== 'function') {
      return new Promise<CompileResult>((res) => {
        if (language && language !== 'html' && language !== 'css' && language !== 'javascript') {
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

    cache[filename] = {
      language,
      content,
      compiled: processed.code,
      info: JSON.stringify(info),
      processors: enabledProcessors,
      languageSettings: stringify(getCustomSettings(language, config)),
    };
    return { code: processed.code, info };
  };

  const postProcess: CompilerFunction = async (content, { config, language, baseUrl, options }) => {
    // also in compile-blocks
    let code = content;
    let info: CompileInfo = {};
    let postcssRequired = false;

    const editorId = getLanguageEditorId(language) || 'markup';
    // let tailwindcss handle style imports if activated, otherwise use postcss
    const tailwindcssIsActive =
      processorIsEnabled('tailwindcss', config) && processorIsActivated('tailwindcss', config);
    if (editorId === 'style' && hasStyleImports(code) && !tailwindcssIsActive) {
      postcssRequired = true;
    }

    for (const processor of window.deps.processors) {
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

  const typescriptFeatures = ({
    feature,
    payload,
  }: {
    feature: TypescriptFeatures;
    payload: any;
  }) =>
    new Promise((resolve) => {
      const id = getRandomString();
      const handler = (event: CompilerMessageEvent) => {
        const message = event.data;
        if (
          event.origin !== compilerOrigin ||
          event.source !== compilerSandbox ||
          message.from !== 'compiler' ||
          message.type !== 'ts-features' ||
          message.payload.id !== id
        ) {
          return;
        }
        eventsManager.removeEventListener(window, 'message', handler);
        resolve(message.payload.data);
      };
      eventsManager.addEventListener(window, 'message', handler);

      const compileMessage: CompilerMessage = {
        type: 'ts-features',
        payload: { id, feature, data: payload },
      };
      compilerSandbox.postMessage(compileMessage, compilerOrigin);
    });

  const sendTypesToCompiler = () => {
    const handler = async (event: CompilerMessageEvent) => {
      const message = event.data;
      if (
        event.origin !== compilerOrigin ||
        event.source !== compilerSandbox ||
        message.from !== 'compiler' ||
        message.type !== 'ts-features' ||
        message.payload.feature !== 'getTypes'
      ) {
        return;
      }
      const { id, feature, data } = message.payload;
      const compileMessage: CompilerMessage = {
        type: 'ts-features',
        payload: { id, feature, data: await getTypes(data) },
      };
      compilerSandbox.postMessage(compileMessage, compilerOrigin);
    };
    eventsManager.addEventListener(window, 'message', handler);
  };

  await initialize();

  return {
    load,
    compile,
    clearCache,
    typescriptFeatures,
    isFake: false,
  };
};
