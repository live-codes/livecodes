import type { Config, Language, CompileOptions } from '../models';

export const compileInCompiler = async (
  content: string,
  language: Language | undefined,
  config: Config,
  options: CompileOptions = {},
  worker: Worker = self as unknown as Worker,
): Promise<string> =>
  new Promise((resolve) => {
    if (!content || !language || !config) {
      return resolve(content || '');
    }
    const handler = async function (ev: MessageEvent) {
      const message = ev.data.payload;
      if (
        ev.data.trigger === 'compileInCompiler' &&
        message?.content === content &&
        message?.language === language
      ) {
        worker.removeEventListener('message', handler);
        resolve(message.compiled);
      }
    };
    worker.addEventListener('message', handler);
    worker.postMessage({
      type: 'compileInCompiler',
      payload: { content, language, config, options },
    });
  });
