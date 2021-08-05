import { Pen } from '../models';

export const defaultConfig: Pen = {
  title: 'Untitled Project',
  autoupdate: true,
  autosave: false,
  delay: 1500,
  emmet: true,
  mode: 'full',
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
