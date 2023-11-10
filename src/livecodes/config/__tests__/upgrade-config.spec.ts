import { upgradeConfig } from '../upgrade-config';

describe('upgradeConfig', () => {
  test('upgrade', () => {
    const oldConfig: any = {
      baseUrl: '/livecodes/',
      title: 'Untitled Project',
      autoupdate: true,
      autosave: false,
      delay: 500,
      emmet: true,
      mode: 'full',
      console: 'open',
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
      processors: {
        postcss: {
          autoprefixer: true,
          postcssPresetEnv: false,
          tailwindcss: false,
          windicss: false,
        },
      },
      modules: [
        {
          name: 'mylib',
          url: 'https://mycdn.com/mylib-url',
          typesUrl: 'https://mycdn.com/mylib-typesUrl',
        },
      ],
      customSettings: {
        head: '<meta charset="UTF-8" />',
        htmlClasses: 'my-class1 my-class2',
      },
    };

    const newConfig: any = {
      title: 'Untitled Project',
      autoupdate: true,
      autosave: false,
      delay: 500,
      emmet: true,
      mode: 'full',
      allowLangChange: true,
      activeEditor: 'markup',
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
      imports: {
        mylib: 'https://mycdn.com/mylib-url',
      },
      types: {
        mylib: 'https://mycdn.com/mylib-typesUrl',
      },
      processors: ['autoprefixer'],
      tools: {
        active: 'console',
        enabled: 'all',
        status: 'open',
      },
      head: '<meta charset="UTF-8" />',
      htmlAttrs: {
        class: 'my-class1 my-class2',
      },
      customSettings: {},
      version: process.env.VERSION,
    };
    expect(upgradeConfig(oldConfig)).toEqual(newConfig);
  });
});
