import { FormatFn, Language } from '../models';
import { Formatter, FormatterMessage, FormatterMessageEvent } from './models';

export const createFormatter = (baseUrl: string): Formatter => {
  const worker = new Worker(baseUrl + 'format.worker.js');
  const configMessage: FormatterMessage = { type: 'init', baseUrl };
  worker.postMessage(configMessage);

  const load = async (languages: Language[]): Promise<string> =>
    new Promise((resolve, reject) => {
      const handler = (event: FormatterMessageEvent) => {
        const message = event.data;

        if (
          (message.type === 'loaded' || message.type === 'load-failed') &&
          message.payload === languages
        ) {
          worker.removeEventListener('message', handler);

          if (message.type === 'loaded') {
            resolve('loaded formatter for: ' + languages.join(', '));
          } else if (message.type === 'load-failed') {
            reject('failed loading formatter for: ' + languages.join(', '));
          }
        }
      };
      worker.addEventListener('message', handler);

      const loadMessage: FormatterMessage = {
        type: 'load',
        payload: languages,
      };
      worker.postMessage(loadMessage);
    });

  const getFormatFn = async (language: Language) => {
    const formatFn: FormatFn = (value: string, cursorOffset: number) =>
      new Promise((resolve, reject) => {
        const handler = (event: FormatterMessageEvent) => {
          const message = event.data;

          if (
            (message.type === 'formatted' || message.type === 'format-failed') &&
            message.payload.language === language &&
            message.payload.value === value &&
            message.payload.cursorOffset === cursorOffset
          ) {
            worker.removeEventListener('message', handler);

            if (message.type === 'formatted') {
              resolve({
                formatted: message.payload.formatted,
                cursorOffset: message.payload.formattedCursorOffset,
              });
            } else if (message.type === 'format-failed') {
              reject({
                language,
                formatted: value,
                cursorOffset,
              });
            }
          }
        };
        worker.addEventListener('message', handler);

        const formatMessage: FormatterMessage = {
          type: 'format',
          payload: {
            language,
            value,
            cursorOffset,
          },
        };
        worker.postMessage(formatMessage);
      });

    return formatFn;
  };

  return {
    load,
    getFormatFn,
  };
};
