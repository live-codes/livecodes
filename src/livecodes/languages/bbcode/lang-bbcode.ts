import type { LanguageSpecs } from '../../models';
import { bbobHtmlUrl, bbobPresetHtmlUrl } from '../../vendors';

export const bbcode: LanguageSpecs = {
  name: 'bbcode',
  title: 'BBCode',
  compiler: {
    url: bbobHtmlUrl,
    factory: () => {
      (self as any).importScripts(bbobPresetHtmlUrl);
      return async (code) =>
        (self as any).BbobHtml.default(code, (self as any).BbobPresetHTML5.default());
    },
  },
  extensions: ['bbcode', 'bb'],
  editor: 'markup',
  multiFileSupport: true,
};
