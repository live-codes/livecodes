import type { StoryDef } from '../../common';

const storyDef: StoryDef = {
  SelectLanguage: {
    props: { params: { js: '' } },
  },

  LanguageAndContent: {
    props: { params: { js: 'console.log("hi");' } },
  },

  LanguagesAndContent: {
    props: {
      params: {
        js: 'console.log("hi");',
        html: 'hello world!',
      },
    },
  },

  NonDefaultLanguage: {
    props: {
      params: {
        ts: '',
      },
    },
  },

  Lang: {
    props: {
      params: {
        lang: 'scss',
      },
    },
  },

  Language: {
    props: {
      params: {
        language: 'md',
      },
    },
  },

  MultipleLanguages: {
    props: {
      params: {
        stylus: '',
        jsx: '',
        mdx: '',
      },
    },
  },

  MultipleLanguagesAndContent: {
    props: {
      params: {
        html: 'hi',
        scss: '',
        ls: '',
      },
    },
  },

  MultipleWithSelectedLanguage: {
    props: {
      params: {
        html: 'hi',
        scss: 'body{color:blue;}',
        ts: '//hi',
        lang: 'scss',
      },
    },
  },

  LanguagesInSameEditor: {
    props: {
      params: {
        html: 'hi',
        md: '# hello',
      },
    },
  },

  LanguagesInSameEditorOrder: {
    props: {
      params: {
        md: '# hello',
        html: 'hi',
      },
    },
  },
  // TODO: fix
  Languages: {
    props: {
      params: {
        languages: 'html,md,css,ts',
      },
    },
  },
  ActiveEditor: {
    props: {
      params: {
        activeEditor: 'style',
      },
    },
  },
  ActiveEditorIndex: {
    props: {
      params: {
        activeEditor: 1,
      },
    },
  },
  Active: {
    props: {
      params: {
        active: 'style',
      },
    },
  },
  ActiveIndex: {
    props: {
      params: {
        active: 1,
      },
    },
  },
  Tags: {
    props: {
      params: {
        tags: 'js,advanced,proof-of-concept',
      },
    },
  },
  Stylesheets: {
    props: {
      params: {
        stylesheets:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css,https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
      },
    },
  },
  Scripts: {
    props: {
      params: {
        scripts:
          'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js,https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
      },
    },
  },
  ToolsNone: {
    props: {
      params: {
        tools: 'none',
      },
    },
  },
  ToolsOpen: {
    props: {
      params: {
        tools: 'open',
      },
    },
  },
  Console: {
    props: {
      params: {
        console: '',
      },
    },
  },
  ConsoleTrue: {
    props: {
      params: {
        console: 'true',
      },
    },
  },
  ConsoleOpen: {
    props: {
      params: {
        console: 'open',
      },
    },
  },
  CompiledFull: {
    props: {
      params: {
        compiled: 'full',
      },
    },
  },
  CompiledOpenConsoleOpen: {
    props: {
      params: {
        compiled: 'open',
        console: 'open',
      },
    },
  },
  CompiledOpenConsoleNone: {
    props: {
      params: {
        compiled: 'open',
        console: 'none',
      },
    },
  },
  ConsoleNone: {
    props: {
      params: {
        console: 'none',
      },
    },
  },
  ToolsConsoleCompiled: {
    props: {
      params: {
        tools: 'open',
        console: 'none',
        compiled: 'none',
      },
    },
  },
  TestsConsoleCompiled: {
    props: {
      template: 'jest',
      params: {
        tests: 'open',
        console: 'none',
        compiled: 'none',
      },
    },
  },
  ModeResult: {
    props: {
      template: 'javascript',
      params: {
        mode: 'result',
      },
    },
  },
  ModeEditor: {
    props: {
      template: 'javascript',
      params: {
        mode: 'editor',
      },
    },
  },
  ModeCodeblock: {
    props: {
      template: 'javascript',
      params: {
        mode: 'codeblock',
      },
    },
  },
  ModeFull: {
    props: {
      template: 'javascript',
      params: {
        mode: 'full',
      },
    },
  },
  ModeResultConsoleClosed: {
    props: {
      template: 'javascript',
      params: {
        mode: 'result',
        console: 'closed',
      },
    },
  },
  ModeResultConsoleOpen: {
    props: {
      template: 'javascript',
      params: {
        mode: 'result',
        console: 'open',
      },
    },
  },
  ModeResultCompiledOpen: {
    props: {
      template: 'javascript',
      params: {
        mode: 'result',
        compiled: 'open',
      },
    },
  },
  ModeResultToolsOpen: {
    props: {
      template: 'javascript',
      params: {
        mode: 'result',
        tools: 'open',
      },
    },
  },
};

export default storyDef;
