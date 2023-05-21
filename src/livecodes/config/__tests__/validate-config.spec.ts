import type { Config } from '../../models';
import { validateConfig } from '../validate-config';

describe('validateConfig', () => {
  test('validateConfig', () => {
    const testConfig: any = {
      baseUrl: '/livecodes',
      autoupdate: 'true',
      autosave: false,
      delay: '500',
      emmet: true,
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
      modules: [],
      imports: {},
      types: {},
      zoom: '0.5',
    };

    const correctConfig: any = {
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
      cssPreset: '',
      imports: {},
      types: {},
      zoom: 0.5,
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('invalidConfig', () => {
    const invalidConfig = {
      all: 'properties',
      here: 'are',
      invalid: '!',
    } as Partial<Config>;
    expect(validateConfig(invalidConfig)).toEqual({});
  });

  test('editor: content - missing language', () => {
    const testConfig = {
      markup: { content: 'hi' },
    } as Partial<Config>;

    const correctConfig = {
      markup: { language: 'html', content: 'hi' },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('editor: contentUrl - missing language', () => {
    const testConfig = {
      style: { contentUrl: 'https://some-url.com' },
    } as Partial<Config>;

    const correctConfig = {
      style: { language: 'css', contentUrl: 'https://some-url.com' },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('editor: wrong language', () => {
    const testConfig = {
      markup: { language: 'javascript' },
    } as Partial<Config>;

    const correctConfig = {
      markup: { language: 'html' },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('editor: language alias', () => {
    const testConfig = {
      script: { language: 'js' },
    } as Partial<Config>;

    const correctConfig = {
      script: { language: 'javascript' },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('editor: invalid - string', () => {
    const testConfig = {
      script: 'hi',
    } as any;

    const correctConfig = {};
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('editor: invalid - obj', () => {
    const testConfig = {
      script: { invalid: 'hi' },
    } as any;

    const correctConfig = {};
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });
});
