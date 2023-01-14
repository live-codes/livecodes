import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/config',
};

// TODO: fix this
export const SelectLanguage = livecodesStory({
  config: { markup: { language: 'javascript' } },
});

export const LanguageAndContent = livecodesStory({
  config: { script: { language: 'javascript', content: 'console.log("hi");' } },
});

export const LanguagesAndContent = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hello world!' },
    script: { language: 'javascript', content: 'console.log("hi");' },
  },
});

export const NonDefaultLanguage = livecodesStory({
  config: { script: { language: 'typescript' } },
});

export const MultipleLanguages = livecodesStory({
  config: {
    markup: { language: 'mdx' },
    style: { language: 'stylus' },
    script: { language: 'jsx' },
  },
});

export const MultipleLanguagesAndContent = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hi' },
    style: { language: 'scss' },
    script: { language: 'livescript' },
  },
});

export const MultipleWithSelectedLanguage = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hi' },
    style: { language: 'scss', content: 'body {color:blue;}' },
    script: { language: 'typescript' },
    activeEditor: 'style',
  },
});

// TODO: fix
export const Languages = livecodesStory({
  config: {
    languages: ['html', 'md', 'css', 'ts'],
  },
});

export const ActiveEditor = livecodesStory({
  config: {
    activeEditor: 'style',
  },
});

export const Tags = livecodesStory({
  config: {
    tags: ['js', 'advanced', 'proof-of-concept'],
  },
});

export const Stylesheets = livecodesStory({
  config: {
    stylesheets: [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    ],
  },
});

export const Scripts = livecodesStory({
  config: {
    scripts: [
      'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js',
      'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
    ],
  },
});

// TODO: fix this
export const ToolsNone = livecodesStory({
  config: {
    tools: {
      enabled: [],
      active: '',
      status: 'none',
    },
  },
});

export const ToolsOpen = livecodesStory({
  config: {
    tools: {
      enabled: 'all',
      active: 'console',
      status: 'open',
    },
  },
});

export const Console = livecodesStory({
  params: {
    console: '',
  },
});

export const ConsoleTrue = livecodesStory({
  params: {
    console: 'true',
  },
});

export const ConsoleOpen = livecodesStory({
  params: {
    console: 'open',
  },
});

export const CompiledFull = livecodesStory({
  params: {
    compiled: 'full',
  },
});

export const CompiledOpenConsoleOpen = livecodesStory({
  params: {
    compiled: 'open',
    console: 'open',
  },
});

export const CompiledOpenConsoleNone = livecodesStory({
  params: {
    compiled: 'open',
    console: 'none',
  },
});

export const ConsoleNone = livecodesStory({
  params: {
    console: 'none',
  },
});

export const ToolsConsoleCompiled = livecodesStory({
  params: {
    tools: 'open',
    console: 'none',
    compiled: 'none',
  },
});

export const Tests = livecodesStory({
  template: 'jest',
  config: {
    tools: {
      enabled: 'all',
      active: 'tests',
      status: 'open',
    },
  },
});

export const TestsConsoleCompiled = livecodesStory({
  template: 'jest',
  config: {
    tools: {
      enabled: ['tests'],
      active: 'tests',
      status: 'open',
    },
  },
});

export const ModeResult = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'result',
  },
});

export const ModeEditor = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'editor',
  },
});

export const ModeCodeblock = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'codeblock',
  },
});

export const ModeFull = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'full',
  },
});

export const ModeResultConsoleClosed = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'result',
    tools: {
      enabled: 'all',
      active: 'console',
      status: 'closed',
    },
  },
});

export const ModeResultConsoleOpen = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'result',
    tools: {
      enabled: 'all',
      active: 'console',
      status: 'open',
    },
  },
});

export const ModeResultCompiledOpen = livecodesStory({
  template: 'javascript',
  config: {
    mode: 'result',
    tools: {
      enabled: 'all',
      active: 'compiled',
      status: 'open',
    },
  },
});

export const ConfigJsonURL = livecodesStory({
  config:
    'https://raw.githubusercontent.com/hatemhosny/typescript-demo-for-testing-import-/gh-pages/src/livecodes.json',
});
ConfigJsonURL.storyName = 'Config JSON URL';
