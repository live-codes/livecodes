import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;

const cdnBaselUrl = 'https://cdn.opalrb.com/opal/1.0.0/';
const requireUrl = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js';

const requirePattern = /^(?!#)(require\s+?)((?:".*?")|(?:'.*?')|(?:\(".*?"\))|(?:\('.*?'\)))([\s]*?(?:;|$|))/gm;
const getImports = (code: string, requireMap: { [mod: string]: string } = {}) =>
  Array.from(
    new Set(
      [...code.matchAll(new RegExp(requirePattern))]
        .map((arr) =>
          arr[2].replace(/"/g, '').replace(/'/g, '').replace(/\(/g, '').replace(/\)/g, ''),
        )
        .map((mod) => mod.split('/')[0])
        .filter((mod) => requireMap.hasOwnProperty(mod) || mod !== 'opal') // already loaded
        .map((mod) => requireMap[mod] || `${cdnBaselUrl + mod}.min.js`)
        .map((mod) => `"optional!${mod}"`),
    ),
  ).join(', ');

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
        const { autoLoadRequired, requireMap, ...options } = getLanguageCustomSettings(
          'ruby',
          config,
        );
        const compiled = (self as any).Opal.compile(code, options);
        const imports = getImports(code, requireMap);
        return autoLoadRequired === false || !imports
          ? compiled
          : `require(getPackages(), function() {
${compiled}});
function getPackages() {
  return [${imports}];
}`;
      };
    },
    scripts: [cdnBaselUrl + 'opal.min.js', requireUrl],
    inlineScript: `
define("optional", [], {
  load : function (moduleName, parentRequire, onload, config){
      var onLoadSuccess = function(moduleInstance){
          onload(moduleInstance);
      }
      var onLoadFailure = function(err){
          var failedId = err.requireModules && err.requireModules[0];
          console.warn("Could not load optional module: " + failedId);
          requirejs.undef(failedId);
          define(failedId, [], function(){return {};});
          parentRequire([failedId], onLoadSuccess);
      }
      parentRequire([moduleName], onLoadSuccess, onLoadFailure);
  }
});`,
  },
  extensions: ['rb'],
  editor: 'script',
};
