import type { Language, Config } from '../models';
import { createFormatter } from './formatter';
import type { Formatter } from './models';

export const getFormatter = (config: Config, baseUrl: string, lazy: boolean): Formatter => {
  const { readonly, mode } = config;

  if (readonly || mode === 'codeblock' || mode === 'result') {
    return createFakeFormatter();
  } else if (lazy) {
    return createLazyFormatter(baseUrl);
  } else {
    return createFormatter(baseUrl);
  }
};

const createLazyFormatter = (baseUrl: string) => {
  const fakeFormatter = createFakeFormatter();
  let formatter = fakeFormatter;

  const lazyFormatter = {
    load: (languages: Language[]) => {
      loadFormatter();
      return formatter.load(languages);
    },
    getFormatFn: (language: Language) => {
      loadFormatter();
      return formatter.getFormatFn(language);
    },
    destroy: () => {
      lazyFormatter.load = fakeFormatter.load;
      lazyFormatter.getFormatFn = fakeFormatter.getFormatFn;
    },
  };

  const loadFormatter = function () {
    formatter = createFormatter(baseUrl);
    lazyFormatter.load = formatter.load;
    lazyFormatter.getFormatFn = formatter.getFormatFn;
    lazyFormatter.destroy = formatter.destroy;
  };

  return lazyFormatter;
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
