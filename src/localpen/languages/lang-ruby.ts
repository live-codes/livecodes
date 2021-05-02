import { LanguageSpecs } from '../models';

export const ruby: LanguageSpecs = {
  name: 'ruby',
  title: 'Ruby',
  info: `
  <h3>Ruby</h3>
  <div>Ruby running in the browser using Opal.</div>
  <ul>
    <li><a href="https://www.ruby-lang.org/en/" target="_blank">Ruby official website</a></li>
    <li><a href="https://www.ruby-lang.org/en/documentation/" target="_blank">Ruby documentation</a></li>
    <li><a href="https://opalrb.com/" target="_blank">Opal official website</a></li>
    <!-- <li><a href="#">Ruby usage in LocalPen</a></li> -->
    <li><a href="?template=ruby" target="_parent" data-template="ruby">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
    umd: true,
    scripts: [
      'vendor/opal/opal.min.js',
      'vendor/opal/native.min.js',
      'vendor/opal/opal-parser.min.js',
    ],
    inlineScript: `
      Opal.config.unsupported_features_severity = 'ignore';
      Opal.load('opal-parser');
      Opal.load('native');
    `,
    scriptType: 'text/ruby',
  },
  extensions: ['rb'],
  editor: 'script',
};
