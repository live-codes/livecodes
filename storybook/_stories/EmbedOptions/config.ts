import type { StoryDef } from '../../common';

const storyDef: StoryDef = {
  LanguagesAndContent: {
    props: {
      config: {
        markup: { language: 'html', content: 'hello world!' },
        style: { language: 'css', content: 'body{color:blue;}' },
        script: { language: 'javascript', content: 'console.log("hi")' },
      },
    },
  },

  NonDefaultLanguage: {
    props: {
      config: { markup: { language: 'markdown', content: '# Hello World!' } },
    },
  },

  MultipleLanguages: {
    props: {
      config: {
        markup: { language: 'mdx' },
        style: { language: 'stylus' },
        script: { language: 'jsx' },
      },
    },
  },

  MultipleLanguagesAndContent: {
    props: {
      config: {
        markup: { language: 'html', content: 'hello world!' },
        style: { language: 'scss' },
        script: { language: 'livescript' },
      },
    },
  },

  MultipleWithSelectedLanguage: {
    props: {
      config: {
        markup: { language: 'html', content: 'hello world!' },
        style: { language: 'scss', content: 'body {color:blue;}' },
        script: { language: 'typescript' },
        activeEditor: 'style',
      },
    },
  },

  // TODO: fix
  Languages: {
    props: {
      config: {
        languages: ['html', 'md', 'css', 'ts'],
      },
    },
  },

  ActiveEditor: {
    props: {
      config: {
        activeEditor: 'style',
      },
    },
  },

  Tags: {
    props: {
      config: {
        tags: ['js', 'advanced', 'proof-of-concept'],
      },
    },
  },

  Stylesheets: {
    props: {
      config: {
        markup: { language: 'html', content: 'hello world!' },
        stylesheets: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
        ],
      },
    },
  },

  Scripts: {
    props: {
      config: {
        markup: { language: 'html', content: '<div id="container"></div>' },
        script: { language: 'javascript', content: '$("#container").html("hi");' },
        scripts: ['https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js'],
      },
    },
  },

  ToolsNone: {
    props: {
      config: {
        tools: {
          enabled: [],
          active: '',
          status: 'none',
        },
      },
    },
  },

  ToolsOpen: {
    props: {
      config: {
        tools: {
          enabled: 'all',
          active: '',
          status: 'open',
        },
      },
    },
  },

  ConsoleOpen: {
    props: {
      config: {
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'open',
        },
      },
    },
  },

  CompiledFull: {
    props: {
      config: {
        tools: {
          enabled: 'all',
          active: 'compiled',
          status: 'full',
        },
      },
    },
  },

  ConsoleEnabled: {
    props: {
      config: {
        tools: {
          enabled: ['console'],
          active: '',
          status: 'open',
        },
      },
    },
  },

  Tests: {
    props: {
      template: 'jest',
      config: {
        tools: {
          enabled: 'all',
          active: 'tests',
          status: 'open',
        },
      },
    },
  },

  TestsEnabled: {
    props: {
      template: 'jest',
      config: {
        tools: {
          enabled: ['tests'],
          active: 'tests',
          status: 'open',
        },
      },
    },
  },

  ModeResult: {
    props: {
      template: 'javascript',
      config: {
        mode: 'result',
      },
    },
  },

  ModeEditor: {
    props: {
      template: 'javascript',
      config: {
        mode: 'editor',
      },
    },
  },

  ModeCodeblock: {
    props: {
      template: 'javascript',
      config: {
        mode: 'codeblock',
      },
    },
  },

  ModeFull: {
    props: {
      template: 'javascript',
      config: {
        mode: 'full',
      },
    },
  },

  ModeResultConsoleClosed: {
    props: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'closed',
        },
      },
    },
  },

  ModeResultConsoleOpen: {
    props: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'open',
        },
      },
    },
  },

  ModeResultCompiledOpen: {
    props: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'compiled',
          status: 'open',
        },
      },
    },
  },

  ConfigJsonURL: {
    props: {
      config:
        'https://raw.githubusercontent.com/hatemhosny/typescript-demo-for-testing-import-/gh-pages/src/livecodes.json',
    },
    storyName: 'Config JSON URL',
  },
};

export default storyDef;
