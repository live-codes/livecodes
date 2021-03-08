import { Language, Pen } from '../models';
import { createFormatter } from './formatter';
import { Formatter } from './models';

const createFakeFormatter = (_config: Pen): Formatter => ({
  load: (_languages: Language[]) => Promise.resolve('do nothing'),
  getFormatFn: (_language: Language) =>
    Promise.resolve((value: string, cursorOffset: number) =>
      Promise.resolve({ formatted: value, cursorOffset }),
    ),
});

export const getFormatter = (config: Pen): Formatter => {
  const { editor, readonly } = config;

  if (readonly || editor === 'prism') {
    return createFakeFormatter(config);
  } else {
    return createFormatter(config);
  }
};
