import { LanguageSpecs } from '../models';
import { escapeCode } from './utils';

export const liquid: LanguageSpecs = {
  name: 'liquid',
  title: 'Liquid',
  info: `
  <h3>LiquidJS</h3>
  <div>A simple, expressive and safe template engine.</div>
  <ul>
    <li><a href="https://liquidjs.com" target="_blank" rel="noopener">LiquidJS official website</a></li>
    <li><a href="https://liquidjs.com/tutorials/intro-to-liquid.html" target="_blank" rel="noopener">LiquidJS documentation</a></li>
    <!-- <li><a href="#">LiquidJS usage in LocalPen</a></li> -->
    <li><a href="?template=liquid" target="_parent" data-template="liquid">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => async (code) => `<!-- ... compiling ... -->
<script>
window.addEventListener("load", () => {
  new liquidjs.Liquid()
    .parseAndRender(\`${escapeCode(code)}\`, window.templateData || {})
    .then((content) => {
      document.body.innerHTML += content
      parent.postMessage({type: 'compiled', payload: {language: 'liquid', content}}, '*');
    })
    .catch((error) => {
      console.log(error)
    });
});
</script>
`,
    scripts: ['https://cdn.jsdelivr.net/npm/liquidjs/dist/liquid.browser.min.js'],
  },
  extensions: ['liquid', 'liquidjs'],
  editor: 'markup',
  editorLanguage: 'html',
};
