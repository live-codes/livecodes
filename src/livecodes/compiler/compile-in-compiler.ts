import { Config, Language } from '../models';
import { CompileOptions } from './models';

export const compileInCompiler = async (
  content: string,
  language: Language,
  config: Config,
  options: CompileOptions = {},
) =>
  new Promise((resolve) => {
    const handler = async function (ev: MessageEvent) {
      const message = ev.data.payload;
      if (
        ev.data.trigger === 'compileInCompiler' &&
        message?.content === content &&
        message?.language === language
      ) {
        self.removeEventListener('message', handler);
        resolve(message.compiled);
      }
    };
    self.addEventListener('message', handler);
    self.postMessage({
      type: 'compileInCompiler',
      payload: { content, language, config, options },
    });
  });
