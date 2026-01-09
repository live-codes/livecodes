import type { Config } from '../models';

export const defaultConfig: Config = {
  title: 'Untitled Project',
  description: '',
  head: `<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
  htmlAttrs: 'lang="en" class=""',
  tags: [],
  autoupdate: true,
  autosave: false,
  autotest: false,
  delay: 1500,
  formatOnsave: false,
  view: 'split',
  mode: 'full',
  theme: 'dark',
  themeColor: undefined,
  layout: 'responsive',
  editorTheme: undefined,
  appLanguage: undefined,
  recoverUnsaved: true,
  showSpacing: false,
  welcome: true,
  readonly: false,
  allowLangChange: true,
  activeEditor: undefined,
  languages: undefined,
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'javascript',
    content: '',
  },
  files: [
    {
      filename: 'index.html',
      content: `<h1>hello world</h1>
    <link href="styles.css" rel="stylesheet">
    <script type="module" src="script.ts"></script>
    `,
      language: 'html',
      hidden: false,
    },
    {
      filename: 'styles.css',
      content: `@import "./middle.css";

    h1 {
      color: blue;
    }
    `,
      language: 'css',
      hidden: false,
    },
    {
      filename: 'middle.css',
      content: `@import "./colors.css";

    h1 {
      color: green;
    }
    `,
      language: 'css',
      hidden: false,
    },
    {
      filename: 'colors.css',
      content: `h1 {
      font-family: Arial, Helvetica, sans-serif;
      color: red;
    }
    `,
      language: 'css',
      hidden: false,
    },
    {
      filename: 'script.ts',
      content: `import { v4 } from 'uuid';
          import { msg } from './middle.ts';
          console.log(v4());
          console.log(msg);`,
      language: 'typescript',
      hidden: false,
    },
    {
      filename: 'middle.ts',
      content: `export { msg } from './message.ts';`,
      language: 'typescript',
      hidden: false,
    },
    {
      filename: 'message.ts',
      content: `export const msg: string = 'Hello!';`,
      language: 'typescript',
      hidden: false,
    },
  ],
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
  tests: {
    language: 'typescript',
    content: '',
  },
  tools: {
    enabled: 'all',
    active: '',
    status: '',
  },
  zoom: 1,
  processors: [],
  customSettings: {},
  editor: undefined,
  fontFamily: undefined,
  fontSize: undefined,
  useTabs: false,
  tabSize: 2,
  lineNumbers: true,
  wordWrap: false,
  closeBrackets: true,
  foldRegions: false,
  semicolons: true,
  singleQuote: false,
  trailingComma: true,
  emmet: true,
  enableAI: false,
  editorMode: undefined,
  version: process.env.VERSION as string,
};
