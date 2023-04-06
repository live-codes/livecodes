import type { LanguageSpecs } from '../../models';
import { stylisUrl } from '../../vendors';

export const stylis: LanguageSpecs = {
  name: 'stylis',
  title: 'Stylis',
  compiler: {
    url: stylisUrl,
    factory: () => async (code) => {
      const { compile, serialize, stringify, middleware, prefixer } = (window as any).stylis;
      return serialize(compile(code), middleware([prefixer, stringify]));
    },
  },
  extensions: ['stylis'],
  editor: 'style',
  editorLanguage: 'scss',
};
