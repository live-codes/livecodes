import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const less: LanguageSpecs = {
  name: 'less',
  title: 'Less',
  formatter: {
    prettier: {
      name: 'less',
      pluginUrls: [parserPlugins.postcss],
    },
  },
  compiler: {
    url: vendorsBaseUrl + 'less/less.js',
    factory:
      () =>
      async (code, { config }) =>
        (
          await (window as any).less.render(code, {
            ...getLanguageCustomSettings('less', config),
          })
        ).css,
  },
  extensions: ['less'],
  editor: 'style',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-less.js')).less),
    },
  },
};
