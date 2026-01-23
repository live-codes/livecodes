import type { LanguageSpecs } from '../../models';
import { json5Url } from '../../vendors';

export const json: LanguageSpecs = {
  name: 'json',
  title: 'JSON',
  info: false,
  compiler: {
    factory: () => {
      let JSON5: { parse: (code: string) => any; stringify: (code: any) => string } | undefined;
      return async (code, { options: { filename } }) => {
        if (filename.endsWith('.json5') || filename.endsWith('.jsonc')) {
          if (!JSON5) {
            (self as any).importScripts(json5Url);
            JSON5 = (self as any).JSON5;
          }
          try {
            return JSON.stringify(JSON5?.parse(code) || JSON.parse(code), null, 2);
          } catch {
            return code;
          }
        }
        return code;
      };
    },
  },
  extensions: ['json', 'json5', 'jsonc'],
  editor: '',
  multiFileSupport: true,
};
