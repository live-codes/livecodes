import { languages } from '../../src/livecodes/languages/languages';
import { processors } from '../../src/livecodes/languages/processors';

declare global {
  interface Window {
    deps: {
      translateString: (key: string, value: string) => string;
      languages: typeof languages;
      processors: typeof processors;
    };
  }
}

window.deps = {
  translateString: (_key: string, value: string) => value,
  languages,
  processors,
};

export {};
