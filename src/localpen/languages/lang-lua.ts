import { LanguageSpecs } from '../models';

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  info: `
  <h3>Lua</h3>
  <div>Lua running in the browser using fengari-web.</div>
  <ul>
    <li><a href="https://www.lua.org/" target="_blank" rel="noopener">Lua official website</a></li>
    <li><a href="https://www.lua.org/manual/5.4/manual.html" target="_blank" rel="noopener">Lua documentation</a></li>
    <li><a href="https://fengari.io/" target="_blank" rel="noopener">Fengari official website</a></li>
    <li><a href="https://github.com/fengari-lua/fengari-web" target="_blank" rel="noopener">fengari-web GitHub repo</a></li>
    <!-- <li><a href="#">Lua usage in LocalPen</a></li> -->
    <li><a href="?template=lua" target="_parent" data-template="lua">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    factory: () => async (code) => code,
    scripts: ['vendor/fengari-web/fengari-web.js'],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['lua'],
  editor: 'script',
};
