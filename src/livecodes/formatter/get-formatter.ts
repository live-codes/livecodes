import type { Language, Config } from '../models';
import { createFormatter } from './formatter';
import type { Formatter } from './models';

export const getFormatter = (config: Config, baseUrl: string, isLite: boolean): Formatter => {
  const { readonly, mode } = config;

  if (readonly || mode === 'codeblock' || mode === 'result' || isLite) {
    return createFakeFormatter();
  } else {
    return createFormatter(baseUrl);
  }
};

/**
 * create a fake formatter with same API
 * to avoid loading the formatter if read only
 */
function createFakeFormatter(): Formatter {
  return {
    load: (_languages: Language[]) => Promise.resolve('do nothing'),
    getFormatFn: (_language: Language) =>
      Promise.resolve((value: string, cursorOffset: number) =>
        Promise.resolve({ formatted: value, cursorOffset }),
      ),
    destroy: () => undefined,
  };
}
