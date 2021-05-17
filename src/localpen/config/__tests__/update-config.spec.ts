import { upgradeConfig } from '../upgrade-config';

describe('upgradeConfig', () => {
  test('upgrade from 0.2.0', () => {
    const oldConfig: any = {
      baseUrl: '/localpen/',
      title: 'Untitled Project',
      autoupdate: true,
      autosave: false,
      delay: 500,
      emmet: true,
      autoprefixer: true,
      mode: 'full',
      console: '',
      compiled: '',
      editor: {
        fontSize: 14,
        theme: 'vs-dark',
        formatOnType: false,
        tabSize: 2,
        lineNumbersMinChars: 3,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          useShadows: false,
        },
        mouseWheelZoom: true,
        automaticLayout: true,
      },
      allowLangChange: true,
      language: 'html',
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
      modules: [],
    };

    const newConfig: any = {
      baseUrl: '/localpen/',
      title: 'Untitled Project',
      autoupdate: true,
      autosave: false,
      delay: 500,
      emmet: true,
      mode: 'full',
      console: '',
      compiled: '',
      editor: '',
      allowLangChange: true,
      language: 'html',
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
      modules: [],
      processors: {
        postcss: {
          autoprefixer: true,
          postcssPresetEnv: false,
        },
      },
      version: process.env.VERSION,
    };
    expect(upgradeConfig(oldConfig)).toEqual(newConfig);
  });
});
