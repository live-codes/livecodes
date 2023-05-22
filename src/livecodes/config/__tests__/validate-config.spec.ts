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

  test('tools: invalid - obj', () => {
    const testConfig = {
      tools: { invalid: 'hi' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: empty', () => {
    const testConfig = {
      tools: {},
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: enabled all', () => {
    const testConfig = {
      tools: { enabled: 'all' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: enabled invalid', () => {
    const testConfig = {
      tools: { enabled: 'invalid' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: enabled console', () => {
    const testConfig = {
      tools: { enabled: ['console'] },
    } as any;

    const correctConfig = {
      tools: {
        enabled: ['console'],
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: enabled invalid array', () => {
    const testConfig = {
      tools: { enabled: ['myconsole'] },
    } as any;

    const correctConfig = {
      tools: {
        enabled: [],
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: enabled invalid item', () => {
    const testConfig = {
      tools: { enabled: ['console', 'compiled22'] },
    } as any;

    const correctConfig = {
      tools: {
        enabled: ['console'],
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: status none', () => {
    const testConfig = {
      tools: { status: 'none' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: [],
        status: 'none',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: active invalid', () => {
    const testConfig = {
      tools: { active: 'invalid' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: active not enabled', () => {
    const testConfig = {
      tools: {
        enabled: ['console'],
        status: '',
        active: 'compiled',
      },
    } as any;

    const correctConfig = {
      tools: {
        enabled: ['console'],
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: status valid', () => {
    const testConfig = {
      tools: { status: 'open' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: 'open',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });

  test('tools: status invalid', () => {
    const testConfig = {
      tools: { status: 'invalid' },
    } as any;

    const correctConfig = {
      tools: {
        enabled: 'all',
        status: '',
        active: '',
      },
    };
    expect(validateConfig(testConfig)).toEqual(correctConfig);
  });
});
