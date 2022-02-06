import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;

const cdnBaselUrl = 'https://cdn.opalrb.com/opal/1.4.1/';
const getImports = (code: string, requireMap: { [mod: string]: string } = {}) =>
  Array.from(
    new Set(
      [...code.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))]
        .map((arr) => arr[1])
        .map((mod) => mod.split('/')[0])
        .filter((mod) => requireMap.hasOwnProperty(mod) || mod !== 'opal') // already loaded
        .map((mod) => requireMap[mod] || `${cdnBaselUrl + mod}.min.js`),
    ),
  );

export const ruby: LanguageSpecs = {
  name: 'ruby',
  title: 'Ruby',
  compiler: {
    url: cdnBaselUrl + 'opal.min.js',
    factory: () => {
      importScripts(cdnBaselUrl + 'opal-parser.min.js');
      // eslint-disable-next-line camelcase
      (self as any).Opal.config.unsupported_features_severity = 'ignore';
      (self as any).Opal.load('opal-parser');
      return async (code, { config }) => {
        const { autoloadStdlib, requireMap, ...options } = getLanguageCustomSettings(
          'ruby',
          config,
        );
        return (self as any).Opal.compile(code, options);
      };
    },
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, requireMap } = getLanguageCustomSettings('ruby', config);
      const imports = getImports(compiled, requireMap);
      const stdlib = autoloadStdlib !== false ? imports : [];
      return [cdnBaselUrl + 'opal.min.js', ...stdlib];
    },
  },
  extensions: ['rb'],
  editor: 'script',
};
