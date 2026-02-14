import type { CompileOptions, CompileResult, Config } from '../models';
import type { LanguageOrProcessor } from './models';
import { getCompileResult } from './utils';

export const compileInCompiler = async (
  content: string,
  language: LanguageOrProcessor | undefined,
  config: Config,
  options: CompileOptions = { filename: 'script' },
  worker: Worker = self as unknown as Worker,
): Promise<CompileResult> =>
  new Promise((resolve) => {
    if (!content || !language || !config) {
      return resolve(getCompileResult(''));
    }
    const handler = async function (ev: MessageEvent) {
      const message = ev.data.payload;
      if (
        ev.data.trigger === 'compileInCompiler' &&
        message?.content === content &&
        message?.language === language
      ) {
        worker.removeEventListener('message', handler);
        resolve(getCompileResult(message.compiled));
      }
    };
    worker.addEventListener('message', handler);
    worker.postMessage({
      type: 'compileInCompiler',
      payload: { content, language, config, options },
    });
  });
