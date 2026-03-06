import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, coffeeScriptUrl } from '../../vendors';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  compiler: {
    url: coffeeScriptUrl,
    factory:
      () =>
      async (code, { config }) =>
        (window as any).CoffeeScript.compile(code, {
          bare: true,
          ...getLanguageCustomSettings('coffeescript', config),
        }),
  },
  extensions: ['coffee'],
  editor: 'script',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy(
          (await import(codeMirrorBaseUrl + 'codemirror-lang-coffeescript.js')).coffeescript,
        ),
    },
  },
  multiFileSupport: true,
};
