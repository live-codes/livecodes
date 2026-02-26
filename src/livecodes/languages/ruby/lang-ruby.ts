import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, opalBaseUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

const getImports = (code: string, requireMap: { [mod: string]: string } = {}) =>
  Array.from(
    new Set(
      [...code.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))]
        .map((arr) => arr[1])
        .map((mod) => mod.split('/')[0])
        .filter((mod) => requireMap.hasOwnProperty(mod) || mod !== 'opal') // already loaded
        .map((mod) => requireMap[mod] || `${opalBaseUrl + mod}.min.js`),
    ),
  );

export const ruby: LanguageSpecs = {
  name: 'ruby',
  title: 'Ruby',
  compiler: {
    url: opalBaseUrl + 'opal.min.js',
    factory: () => {
      importScripts(opalBaseUrl + 'opal-parser.min.js');

      (self as any).Opal.config.unsupported_features_severity = 'ignore';
      (self as any).Opal.load('opal-parser');
      return async (code, { config }) => {
        const { autoloadStdlib, requireMap, ...options } = getLanguageCustomSettings(
          'ruby',
          config,
        );
        const patch = code.includes('$0') ? '$0 = __FILE__\n' : '';
        return (self as any).Opal.compile(patch + code, options);
      };
    },
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, requireMap } = getLanguageCustomSettings('ruby', config);
      const imports = getImports(compiled, requireMap);
      const stdlib = autoloadStdlib !== false ? imports : [];
      return [opalBaseUrl + 'opal.min.js', ...stdlib];
    },
  },
  extensions: ['rb'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'ruby.js' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-ruby.js')).ruby),
    },
  },
};
