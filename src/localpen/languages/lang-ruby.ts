import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;

const cdnBaselUrl = 'https://cdn.opalrb.com/opal/1.0.0/';
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
  info: `
  <h3>Ruby</h3>
  <div>Ruby running in the browser using Opal.</div>
  <ul>
    <li><a href="https://www.ruby-lang.org/en/" target="_blank" rel="noopener">Ruby official website</a></li>
    <li><a href="https://www.ruby-lang.org/en/documentation/" target="_blank" rel="noopener">Ruby documentation</a></li>
    <li><a href="https://opalrb.com/" target="_blank" rel="noopener">Opal official website</a></li>
    <li><a href="https://cdn.opalrb.com/opal/1.0.0/index.html" target="_blank" rel="noopener">Opal standard library CDN</a></li>
    <!-- <li><a href="#">Ruby usage in LocalPen</a></li> -->
    <li><a href="?template=ruby" target="_parent" data-template="ruby">Load starter template</a></li>
  </ul>
  `,
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
