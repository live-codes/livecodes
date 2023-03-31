import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/params',
};

export const SelectLanguage = livecodesStory({
  params: { js: '' },
});

export const LanguageAndContent = livecodesStory({
  params: { js: 'console.log("hi");' },
});

export const LanguagesAndContent = livecodesStory({
  params: {
    js: 'console.log("hi");',
    html: 'hello world!',
  },
});

export const NonDefaultLanguage = livecodesStory({
  params: {
    ts: '',
  },
});

export const Lang = livecodesStory({
  params: {
    lang: 'scss',
  },
});

export const Language = livecodesStory({
  params: {
    language: 'md',
  },
});

export const MultipleLanguages = livecodesStory({
  params: {
    stylus: '',
    jsx: '',
    mdx: '',
  },
});

export const MultipleLanguagesAndContent = livecodesStory({
  params: {
    html: 'hi',
    scss: '',
    ls: '',
  },
});

export const MultipleWithSelectedLanguage = livecodesStory({
  params: {
    html: 'hi',
    scss: 'body{color:blue;}',
    ts: '//hi',
    lang: 'scss',
  },
});

export const LanguagesInSameEditor = livecodesStory({
  params: {
    html: 'hi',
    md: '# hello',
  },
});

export const LanguagesInSameEditorOrder = livecodesStory({
  params: {
    md: '# hello',
    html: 'hi',
  },
});

// TODO: fix
export const Languages = livecodesStory({
  params: {
    languages: 'html,md,css,ts',
  },
});

export const ActiveEditor = livecodesStory({
  params: {
    activeEditor: 'style',
  },
});

export const ActiveEditorIndex = livecodesStory({
  params: {
    activeEditor: 1,
  },
});

export const Active = livecodesStory({
  params: {
    active: 'style',
  },
});

export const ActiveIndex = livecodesStory({
  params: {
    active: 1,
  },
});

export const Tags = livecodesStory({
  params: {
    tags: 'js,advanced,proof-of-concept',
  },
});

export const Stylesheets = livecodesStory({
  params: {
    stylesheets:
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css,https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
  },
});

export const Scripts = livecodesStory({
  params: {
    scripts:
      'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js,https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
  },
});

export const ToolsNone = livecodesStory({
  params: {
    tools: 'none',
  },
});

export const ToolsOpen = livecodesStory({
  params: {
    tools: 'open',
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

export const TestsConsoleCompiled = livecodesStory({
  template: 'jest',
  params: {
    tests: 'open',
    console: 'none',
    compiled: 'none',
  },
});

export const ModeResult = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'result',
  },
});

export const ModeEditor = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'editor',
  },
});

export const ModeCodeblock = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'codeblock',
  },
});

export const ModeFull = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'full',
  },
});

export const ModeResultConsoleClosed = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'result',
    console: 'closed',
  },
});

export const ModeResultConsoleOpen = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'result',
    console: 'open',
  },
});

export const ModeResultCompiledOpen = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'result',
    compiled: 'open',
  },
});

export const ModeResultToolsOpen = livecodesStory({
  template: 'javascript',
  params: {
    mode: 'result',
    tools: 'open',
  },
});
