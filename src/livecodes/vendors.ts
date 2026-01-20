import { modulesService } from './services/modules';

const { getUrl, getModuleUrl } = modulesService;

export const vendorsBaseUrl = // 'http://127.0.0.1:8081/';
  /* @__PURE__ */ getUrl('@live-codes/browser-compilers@0.22.6/dist/');

export const acornUrl = /* @__PURE__ */ getUrl('acorn@8.12.1/dist/acorn.js');

export const artTemplateUrl = /* @__PURE__ */ getUrl('art-template@4.13.2/lib/template-web.js');

export const asciidocUrl = /* @__PURE__ */ getUrl(
  '@asciidoctor/core@2.2.8/dist/browser/asciidoctor.js',
);

export const assemblyscriptLoaderUrl = /* @__PURE__ */ getUrl(
  '@assemblyscript/loader@0.27.29/umd/index.js',
);

export const astringUrl = /* @__PURE__ */ getUrl('astring@1.8.6/dist/astring.min.js');

export const astroBaseUrl = /* @__PURE__ */ getUrl('@hatemhosny/astro-internal@0.0.4/');

export const astroWasmURL = /* @__PURE__ */ getUrl('@astrojs/compiler@0.9.2/astro.wasm');

export const autoCompleteUrl = /* @__PURE__ */ getUrl(
  '@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js',
);

export const babelUrl = /* @__PURE__ */ getUrl('@babel/standalone@7.26.4/babel.js');

export const bbobHtmlUrl = /* @__PURE__ */ getUrl('@bbob/html@4.3.1/dist/index.min.js');
export const bbobPresetHtmlUrl = /* @__PURE__ */ getUrl(
  '@bbob/preset-html5@4.3.1/dist/index.min.js',
);

export const biwaschemeUrl = /* @__PURE__ */ getUrl('biwascheme@0.8.0/release/biwascheme.js');

export const blocklyCdnBaseUrl = /* @__PURE__ */ getUrl('blockly@11.1.1/');

export const browserfsUrl = /* @__PURE__ */ getUrl('browserfs@1.4.3/dist/browserfs.min.js');

export const browserJestUrl = /* @__PURE__ */ getUrl(
  '@live-codes/browser-jest@0.0.3/dist/browser-jest.umd.js',
);

export const brythonBaseUrl = /* @__PURE__ */ getUrl('brython@3.12.4/');

export const chaiUrl = /* @__PURE__ */ getModuleUrl('chai@5.1.2');

export const cherryCljsBaseUrl = /* @__PURE__ */ getUrl('cherry-cljs@0.2.19/');

export const cjs2esUrl = /* @__PURE__ */ getUrl('cjs2es@1.1.1/dist/cjs2es.browser.js');

export const clioBaseUrl = /* @__PURE__ */ getUrl(
  '@live-codes/clio-browser-compiler@0.0.3/public/build/',
);

export const cm6ThemeBasicLightUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-basic-light@0.2.0/dist/index.js',
);

export const cm6ThemeBasicDarkUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-basic-dark@0.2.0/dist/index.js',
);

export const cm6ThemeGruvboxLightUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-gruvbox-light@0.2.0/dist/index.js',
);

export const cm6ThemeGruvboxDarkUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-gruvbox-dark@0.2.0/dist/index.js',
);

export const cm6ThemeMaterialDarkUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-material-dark@0.2.0/dist/index.js',
);

export const cm6ThemeNordUrl = /* @__PURE__ */ getUrl('cm6-theme-nord@0.2.0/dist/index.js');

export const cm6ThemeSolarizedLightUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-solarized-light@0.2.0/dist/index.js',
);

export const cm6ThemeSolarizedDarkUrl = /* @__PURE__ */ getUrl(
  'cm6-theme-solarized-dark@0.2.0/dist/index.js',
);

export const codeiumProviderUrl = /* @__PURE__ */ getUrl(
  '@live-codes/monaco-codeium-provider@0.2.2/dist/index.js',
);

export const codeMirrorBaseUrl = /* @__PURE__ */ getUrl('@live-codes/codemirror@0.3.4/build/');

export const coffeeScriptUrl = /* @__PURE__ */ getUrl(
  'coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js',
);

export const colorisBaseUrl = /* @__PURE__ */ getUrl('@melloware/coloris@0.22.0/dist/');

export const comlinkBaseUrl = /* @__PURE__ */ getUrl('comlink@4.4.1/dist/');

export const cppWasmBaseUrl = /* @__PURE__ */ getUrl('@chriskoch/cpp-wasm@1.0.2/');

export const csharpWasmBaseUrl = /* @__PURE__ */ getUrl('@seth0x41/csharp-wasm@1.0.3/');

export const yaegiWasmBaseUrl = /* @__PURE__ */ getUrl('yaegi-wasm@1.0.2/src/');

export const csstreeUrl = /* @__PURE__ */ getUrl('css-tree@2.3.1/dist/csstree.js');

export const cytoscapeSvgUrl = /* @__PURE__ */ getUrl('cytoscape-svg@0.4.0/cytoscape-svg.js');

export const cytoscapeUrl = /* @__PURE__ */ getUrl('cytoscape@3.25.0/dist/cytoscape.min.js');

export const ddietrCmThemesBaseUrl = /* @__PURE__ */ getUrl(
  '@ddietr/codemirror-themes@1.4.2/dist/theme/',
);

export const doppioJvmBaseUrl = 'https://unpkg.com/@seth0x41/doppio@1.0.0/';

export const dotUrl = /* @__PURE__ */ getUrl('dot@1.1.3/doT.js');

export const ejsUrl = /* @__PURE__ */ getUrl('ejs@3.1.10/ejs.js');

export const elkjsBaseUrl = /* @__PURE__ */ getUrl('elkjs@0.8.2/lib/');

export const emmetMonacoUrl = /* @__PURE__ */ getUrl('emmet-monaco-es@5.5.0/dist/emmet-monaco.js');

export const esModuleShimsPath = 'es-module-shims@1.10.0/dist/es-module-shims.js';

export const etaUrl = /* @__PURE__ */ getUrl('eta@3.4.0/dist/eta.umd.js');

export const fflateUrl = /* @__PURE__ */ getUrl('fflate@0.8.1/esm/browser.js');

export const flexSearchUrl = /* @__PURE__ */ getUrl('flexsearch@0.7.21/dist/flexsearch.bundle.js');

export const fontAnonymousProUrl = /* @__PURE__ */ getUrl(
  '@fontsource/anonymous-pro@4.5.9/index.css',
);

export const fontAstigmataUrl = /* @__PURE__ */ getUrl(
  'gh:hatemhosny/astigmata-font@6d0ee00a07fb1932902f0b81a504d075d47bd52f/index.css',
);

export const fontAwesomeUrl = /* @__PURE__ */ getUrl('font-awesome@4.7.0/css/font-awesome.min.css');

export const fontCascadiaCodeUrl = /* @__PURE__ */ getUrl(
  '@fontsource/cascadia-code@4.2.1/index.css',
);

export const fontCodeNewRomanUrl = /* @__PURE__ */ getUrl(
  'https://fonts.cdnfonts.com/css/code-new-roman-2',
);

export const fontComicMonoUrl = /* @__PURE__ */ getUrl('comic-mono@0.0.1/index.css');

export const fontCourierPrimeUrl = /* @__PURE__ */ getUrl(
  '@fontsource/courier-prime@4.5.9/index.css',
);

export const fontDECTerminalModernUrl = /* @__PURE__ */ getUrl(
  'https://fonts.cdnfonts.com/css/dec-terminal-modern',
);

export const fontDejaVuMonoUrl = /* @__PURE__ */ getUrl('@fontsource/dejavu-mono@4.5.4/index.css');

export const fontFantasqueUrl = /* @__PURE__ */ getUrl(
  '@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css',
);

export const fontFiraCodeUrl = /* @__PURE__ */ getUrl('firacode@6.2.0/distr/fira_code.css');

export const fontFixedsysUrl = /* @__PURE__ */ getUrl('https://fonts.cdnfonts.com/css/fixedsys-62');

export const fontHackUrl = /* @__PURE__ */ getUrl('hack-font@3.3.0/build/web/hack.css');

export const fontHermitUrl = /* @__PURE__ */ getUrl('typeface-hermit@0.0.44/index.css');

export const fontIBMPlexMonoUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap',
);

export const fontInconsolataUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css2?family=Inconsolata&display=swap',
);

export const fontInterUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css?family=Inter:300,400,500',
);

export const fontIosevkaUrl = /* @__PURE__ */ getUrl('@fontsource/iosevka@4.5.4/index.css');

export const fontJetbrainsMonoUrl = /* @__PURE__ */ getUrl(
  '@fontsource/jetbrains-mono@4.5.11/index.css',
);

export const fontMaterialIconsUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css?family=Material+Icons&display=swap',
);

export const fontMenloUrl = /* @__PURE__ */ getUrl('https://fonts.cdnfonts.com/css/menlo');

export const fontMonaspaceBaseUrl = /* @__PURE__ */ getUrl('monaspace-font@0.0.2/');

export const fontMonofurUrl = /* @__PURE__ */ getUrl('https://fonts.cdnfonts.com/css/monofur');

export const fontMonoidUrl = /* @__PURE__ */ getUrl('@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css');

export const fontNotoUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap',
);

export const fontNovaMonoUrl = /* @__PURE__ */ getUrl(
  'https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap',
);

export const fontOpenDyslexicUrl = /* @__PURE__ */ getUrl(
  '@fontsource/opendyslexic@4.5.4/index.css',
);

export const fontProFontWindowsUrl = /* @__PURE__ */ getUrl(
  'https://fonts.cdnfonts.com/css/profontwindows',
);

export const fontRobotoMonoUrl = /* @__PURE__ */ getUrl('@fontsource/roboto-mono@4.5.8/index.css');

export const fontSFMonoUrl = /* @__PURE__ */ getUrl('https://fonts.cdnfonts.com/css/sf-mono');

export const fontSourceCodeProUrl = /* @__PURE__ */ getUrl(
  '@fontsource/source-code-pro@4.5.12/index.css',
);

export const fontSpaceMonoUrl = /* @__PURE__ */ getUrl('@fontsource/space-mono@4.5.10/index.css');

export const fontSudoVarUrl = /* @__PURE__ */ getUrl('https://fonts.cdnfonts.com/css/sudo-var');

export const fontUbuntuMonoUrl = /* @__PURE__ */ getUrl('@fontsource/ubuntu-mono@4.5.11/index.css');

export const fontVictorMonoUrl = /* @__PURE__ */ getUrl('victormono@1.5.4/dist/index.css');

export const fscreenUrl = /* @__PURE__ */ getUrl('fscreen@1.2.0/dist/fscreen.esm.js');

export const githubMarkdownCss = /* @__PURE__ */ getUrl(
  'github-markdown-css@5.1.0/github-markdown.css',
);

export const gleamBaseUrl = /* @__PURE__ */ getUrl('gh:live-codes/gleam-precompiled@v0.5.0/');

export const go2jsBaseUrl = /* @__PURE__ */ getUrl('@live-codes/go2js@0.5.0/build/');

export const graphreCdnUrl = /* @__PURE__ */ getUrl('graphre@0.1.3/dist/graphre.js');

export const handlebarsBaseUrl = /* @__PURE__ */ getUrl('handlebars@4.7.8/dist/');

export const highlightjsUrl = /* @__PURE__ */ getModuleUrl('highlight.js@11.11.1');

export const hpccJsCdnUrl = /* @__PURE__ */ getUrl('@hpcc-js/wasm@2.13.0/dist/index.js');

export const htmlToImageUrl = /* @__PURE__ */ getUrl('html-to-image@1.11.11/dist/html-to-image.js');

export const imbaBaseUrl = /* @__PURE__ */ getUrl('imba@2.0.0-alpha.229/dist/');

export const jestTypesUrl = /* @__PURE__ */ getUrl('@types/jest@27.4.1/index.d.ts');

export const jsclUrl = /* @__PURE__ */ getUrl(
  'gh:jscl-project/jscl-project.github.io@058adc599f0d012718ef3ad28e704a92c4dd741e/jscl.js',
);

export const jsZipUrl = /* @__PURE__ */ getUrl('jszip@3.10.1/dist/jszip.js');

export const juliaWasmBaseUrl = /* @__PURE__ */ getUrl('@chriskoch/julia-wasm@1.0.4');

export const liquidJsUrl = /* @__PURE__ */ getUrl('liquidjs@10.14.0/dist/liquid.browser.min.js');

export const localforageUrl = /* @__PURE__ */ getUrl('localforage@1.10.0/dist/localforage.min.js');

export const luaUrl = /* @__PURE__ */ getUrl('fengari-web@0.1.4/dist/fengari-web.js');

export const lunaConsoleStylesUrl = /* @__PURE__ */ getUrl('luna-console@1.3.3/luna-console.css');

export const lunaDataGridStylesUrl = /* @__PURE__ */ getUrl(
  'luna-data-grid@0.5.1/luna-data-grid.css',
);

export const lunaDomViewerStylesUrl = /* @__PURE__ */ getUrl(
  'luna-dom-viewer@1.2.4/luna-dom-viewer.css',
);

export const lunaObjViewerStylesUrl = /* @__PURE__ */ getUrl(
  'luna-object-viewer@0.2.4/luna-object-viewer.css',
);

export const malinaBaseUrl = /* @__PURE__ */ getUrl(`malinajs@0.7.19/`);

export const markedUrl = /* @__PURE__ */ getUrl('marked@13.0.2/marked.min.js');

export const mermaidCdnUrl = /* @__PURE__ */ getUrl('mermaid@10.2.2/dist/mermaid.esm.mjs');

export const metaPngUrl = /* @__PURE__ */ getUrl('meta-png@1.0.6/dist/meta-png.umd.js');

export const minizincUrl = /* @__PURE__ */ getUrl('minizinc@4.4.4/dist/minizinc.mjs');

export const mjmlUrl = /* @__PURE__ */ getUrl('mjml-browser@4.15.3/lib/index.js');

export const monacoBaseUrl = /* @__PURE__ */ getUrl('@live-codes/monaco-editor@0.3.1/');

export const monacoEmacsUrl = /* @__PURE__ */ getUrl('monaco-emacs@0.3.0/dist/monaco-emacs.js');

export const monacoThemesBaseUrl = /* @__PURE__ */ getUrl('monaco-themes@0.4.4/themes/');

export const monacoVimUrl = /* @__PURE__ */ getUrl('monaco-vim@0.4.1/dist/monaco-vim.js');

export const monacoVolarUrl = /* @__PURE__ */ getUrl(
  '@live-codes/monaco-volar@0.1.0/dist/index.js',
);

export const mustacheUrl = /* @__PURE__ */ getUrl('mustache@4.2.0/mustache.js');

export const ninjaKeysUrl = /* @__PURE__ */ getUrl('@hatemhosny/ninja-keys@1.14.0/bundle/index.js');

export const nomnomlCdnUrl = /* @__PURE__ */ getUrl('nomnoml@1.6.1/dist/nomnoml.js');

export const normalizeCssUrl = /* @__PURE__ */ getUrl('normalize.css@8.0.1/normalize.css');

export const nunjucksBaseUrl = /* @__PURE__ */ getUrl('nunjucks@3.2.4/browser/');

export const opalBaseUrl = /* @__PURE__ */ getUrl('https://cdn.opalrb.com/opal/1.8.2/');

export const parinferUrl = /* @__PURE__ */ getUrl('parinfer@3.13.1/parinfer.js');

export const pathBrowserifyUrl = /* @__PURE__ */ getModuleUrl('path-browserify@1.0.1');

export const pgliteUrl = /* @__PURE__ */ getUrl('@electric-sql/pglite@0.1.5/dist/index.js');

export const pintoraUrl = /* @__PURE__ */ getUrl(
  '@pintora/standalone@0.6.2/lib/pintora-standalone.umd.js',
);

export const plotlyCdnUrl = /* @__PURE__ */ getUrl('plotly.js@2.23.2/dist/plotly.js');

export const postcssImportUrlUrl = /* @__PURE__ */ getUrl(
  '@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js',
);

export const prettierBaseUrl = /* @__PURE__ */ getUrl('prettier@3.3.2/');

export const prettierMinizincUrl = /* @__PURE__ */ getUrl(
  '@live-codes/prettier-plugin-minizinc@0.2.0/dist/standalone.js',
);

export const prettierPhpUrl = /* @__PURE__ */ getUrl('@prettier/plugin-php@0.22.2/standalone.js');

export const prismBaseUrl = /* @__PURE__ */ getUrl('prismjs@1.29.0/components/');

export const prismOfficialThemesBaseUrl = /* @__PURE__ */ getUrl('prismjs@1.29.0/themes/');

export const prismThemesBaseUrl = /* @__PURE__ */ getUrl('prism-themes@1.9.0/themes/');

export const prismThemeNordUrl = /* @__PURE__ */ getUrl(
  'gh:GalenWong/nord-prism-js@9f085d2a64b37f72a516540ba3f87877d12d7e2d/prism-nord.css',
);

export const prismThemesLaserWaveUrl = /* @__PURE__ */ getUrl(
  'gh:PrismJS/prism-themes@447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-laserwave.css',
);

export const pyodideBaseUrl = /* @__PURE__ */ getUrl(
  'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/',
);

export const qrcodeUrl = /* @__PURE__ */ getUrl('easyqrcodejs@4.6.1/dist/easy.qrcode.min.js');

export const quillEditorCdnBaseUrl = /* @__PURE__ */ getUrl('quill@2.0.2/dist/');

export const quillHtmlEditUrl = /* @__PURE__ */ getUrl(
  'quill-html-edit-button@2.2.14/dist/quill.htmlEditButton.min.js',
);

export const quillBlotFormatterUrl = /* @__PURE__ */ getUrl(
  'quill-blot-formatter@1.0.5/dist/quill-blot-formatter.min.js',
);

export const quillBetterTableBaseUrl = /* @__PURE__ */ getUrl('quill-better-table@1.2.10/dist/');

export const requireUrl = /* @__PURE__ */ getUrl('requirejs@2.3.6/require.js');

export const reasonCompilerUrl = /* @__PURE__ */ getUrl(
  'https://cdn.rescript-lang.org/v9.1.2/compiler.js',
);

export const reasonReactUrl = /* @__PURE__ */ getUrl(
  'https://cdn.rescript-lang.org/v9.1.2/%40rescript/react/cmij.js',
);

export const reasonStdLibBaseUrl = /* @__PURE__ */ getUrl('@rescript/std@9.1.3/lib/es6/');

export const rescriptCdnBaseUrl = /* @__PURE__ */ getUrl('https://cdn.rescript-lang.org/v11.1.2/');

export const rescriptStdLibBaseUrl = /* @__PURE__ */ getUrl('@rescript/std@11.1.2/lib/es6/');

export const resetCssUrl = /* @__PURE__ */ getUrl('reset-css@5.0.1/reset.css');

export const riotBaseUrl = /* @__PURE__ */ getUrl('riot@9.2.2/');

export const rubyWasmBaseUrl = /* @__PURE__ */ getUrl('@ruby/3.4-wasm-wasi@2.7.2/dist/');

export const rubyWasmScriptUrl = /* @__PURE__ */ getUrl(
  '@ruby/wasm-wasi@2.7.2/dist/browser.umd.js',
);

export const snackbarUrl = /* @__PURE__ */ getUrl('@snackbar/core@1.7.0/dist/snackbar.css');

export const spacingJsUrl = /* @__PURE__ */ getUrl('spacingjs@1.0.7/dist/bundle.js');

export const sqlFormatterUrl = /* @__PURE__ */ getUrl(
  'sql-formatter@12.2.1/dist/sql-formatter.min.js',
);

export const sqljsBaseUrl = /* @__PURE__ */ getUrl('sql.js@1.10.3/dist/');

export const squintCljsBaseUrl = /* @__PURE__ */ getUrl('squint-cljs@0.4.81/');

export const stencilUrl = /* @__PURE__ */ getUrl('@stencil/core@3.2.2/compiler/stencil.js');

export const stylisUrl = /* @__PURE__ */ getUrl('stylis@4.3.2/dist/umd/stylis.js');

export const svelteBaseUrl = /* @__PURE__ */ getUrl('svelte@5.39.12/');

export const svgbobWasmCdnUrl = /* @__PURE__ */ getUrl('svgbob-wasm@0.4.1-a0/svgbob_wasm_bg.wasm');

export const tagifyBaseUrl = /* @__PURE__ */ getUrl('@yaireo/tagify@4.25.1/dist/');

export const tailwindcssBaseUrl = /* @__PURE__ */ getUrl('tailwindcss@4.0.0/');

export const tailwindcss3Url = /* @__PURE__ */ getUrl(
  '@mhsdesign/jit-browser-tailwindcss@0.4.1/dist/cdn.min.js',
);

export const tauPrologBaseUrl = /* @__PURE__ */ getUrl('tau-prolog@0.3.4/modules/');

export const tealUrl = /* @__PURE__ */ getUrl(
  'gh:teal-language/tl@8479c933ef68034a0ea21a564c886374663f80f2/tl.lua',
);

export const thememirrorBaseUrl = /* @__PURE__ */ getUrl('thememirror@2.0.1/dist/themes/');

export const tesseractUrl = /* @__PURE__ */ getUrl('tesseract.js@6.0.1/dist/tesseract.esm.min.js');

export const twigUrl = /* @__PURE__ */ getUrl('twig@1.17.1/twig.min.js');

export const typescriptUrl = /* @__PURE__ */ getUrl(`typescript@5.9.3/lib/typescript.js`);

export const uniterUrl = /* @__PURE__ */ getUrl('uniter@2.18.0/dist/uniter.js');

export const vegaCdnUrl = /* @__PURE__ */ getUrl('vega@5.25.0/build/vega.js');

export const vegaLiteCdnUrl = /* @__PURE__ */ getUrl('vega-lite@5.9.3/build/vega-lite.js');

export const vue3CdnUrl = /* @__PURE__ */ getUrl('vue@3');

export const vue2CdnUrl = /* @__PURE__ */ getUrl('vue@2');

export const vueRuntimeUrl = /* @__PURE__ */ getUrl('vue@3/dist/vue.runtime.esm-browser.prod.js');

export const vueSDKUrl = /* @__PURE__ */ getUrl(`livecodes@${process.env.SDK_VERSION}/vue.js`);

export const vueSfcLoaderCdnBaseUrl = /* @__PURE__ */ getUrl('vue3-sfc-loader@0.9.5/dist/');

export const wabtjsUrl = /* @__PURE__ */ getUrl('wabt@1.0.35/index.js');

export const wasmoonUrl = /* @__PURE__ */ getUrl('wasmoon@1.16.0/dist/index.js');

export const waveDromBaseUrl = /* @__PURE__ */ getUrl('wavedrom@3.2.0/');

export const webRBaseUrl = /* @__PURE__ */ getUrl('webr@0.4.0/dist/');
