import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const bbcode: LanguageSpecs = {
  name: 'bbcode',
  title: 'BBCode',
  compiler: {
    url: vendorsBaseUrl + 'bbob/bbob.js',
    factory: () => async (code) =>
      (self as any).BBob.bbobHTML(code, (self as any).BBob.presetHTML5()),
  },
  extensions: ['bbcode', 'bb'],
  editor: 'markup',
};
