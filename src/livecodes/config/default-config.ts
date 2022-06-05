import { Config } from '../models';

export const defaultConfig: Config = {
  title: 'Untitled Project',
  description: '',
  tags: [],
  autoupdate: true,
  autosave: false,
  delay: 1500,
  formatOnsave: false,
  emmet: true,
  mode: 'full',
  theme: 'dark',
  enableRestore: true,
  showSpacing: false,
  readonly: false,
  allowLangChange: true,
  activeEditor: undefined,
  languages: undefined,
  markup: {
    language: 'html',
    content: '',
    contentUrl: '',
    selector: '',
  },
  style: {
    language: 'css',
    content: '',
    contentUrl: '',
    selector: '',
  },
  script: {
    language: 'javascript',
    content: '',
    contentUrl: '',
    selector: '',
  },
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
    status: 'closed',
    active: 'console',
  },
  processors: {
    postcss: {
      tailwindcss: false,
      windicss: false,
      autoprefixer: false,
      postcssPresetEnv: false,
    },
  },
  customSettings: {
    template: {
      data: {},
      prerender: true,
    },
  },
  editor: '',
  version: process.env.VERSION as string,
  showVersion: false,
};
