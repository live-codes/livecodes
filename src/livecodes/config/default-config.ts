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
  readonly: false,
  console: '',
  compiled: '',
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
  processors: {
    postcss: {
      autoprefixer: false,
      postcssPresetEnv: false,
      tailwindcss: false,
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
