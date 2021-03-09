import { Language, Pen } from '../models';
import { createFormatter } from './formatter';
import { Formatter } from './models';

export const getFormatter = (config: Pen): Formatter => {
  const { editor, readonly, mode } = config;

  if (readonly || editor === 'prism' || mode === 'codeblock' || mode === 'result') {
    return createFakeFormatter();
  } else {
    return createFormatter(config);
  }
};

/**
 * create a fake compiler with same API
 * to avoid loading the formatter if read only
 */
function createFakeFormatter(): Formatter {
  return {
    load: (_languages: Language[]) => Promise.resolve('do nothing'),
    getFormatFn: (_language: Language) =>
      Promise.resolve((value: string, cursorOffset: number) =>
        Promise.resolve({ formatted: value, cursorOffset }),
      ),
  };
}
