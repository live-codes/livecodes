// AUTO-GENERATED — do not edit

/* eslint-disable */
import { defaultMeta, livecodesStory, type LiveCodes, type Meta } from '#src';

export default {
  ...defaultMeta,
  title: 'EmbedOptions/config',
} satisfies Meta<typeof LiveCodes>;

export const LanguagesAndContent = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hello world!' },
    style: { language: 'css', content: 'body{color:blue;}' },
    script: { language: 'javascript', content: 'console.log("hi")' },
  },
});
export const NonDefaultLanguage = livecodesStory({
  config: { markup: { language: 'markdown', content: '# Hello World!' } },
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
    markup: { language: 'html', content: 'hello world!' },
    style: { language: 'scss' },
    script: { language: 'livescript' },
  },
});
export const MultipleWithSelectedLanguage = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hello world!' },
    style: { language: 'scss', content: 'body {color:blue;}' },
    script: { language: 'typescript' },
    activeEditor: 'style',
  },
});
export const Languages = livecodesStory({ config: { languages: ['html', 'md', 'css', 'ts'] } });
export const ActiveEditor = livecodesStory({ config: { activeEditor: 'style' } });
export const Tags = livecodesStory({ config: { tags: ['js', 'advanced', 'proof-of-concept'] } });
export const Stylesheets = livecodesStory({
  config: {
    markup: { language: 'html', content: 'hello world!' },
    stylesheets: [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    ],
  },
});
export const Scripts = livecodesStory({
  config: {
    markup: { language: 'html', content: '<div id="container"></div>' },
    script: { language: 'javascript', content: '$("#container").html("hi");' },
    scripts: ['https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js'],
  },
});
export const ToolsNone = livecodesStory({
  config: { tools: { enabled: [], active: '', status: 'none' } },
});
export const ToolsOpen = livecodesStory({
  config: { tools: { enabled: 'all', active: '', status: 'open' } },
});
export const ConsoleOpen = livecodesStory({
  config: { tools: { enabled: 'all', active: 'console', status: 'open' } },
});
export const CompiledFull = livecodesStory({
  config: { tools: { enabled: 'all', active: 'compiled', status: 'full' } },
});
export const ConsoleEnabled = livecodesStory({
  config: { tools: { enabled: ['console'], active: '', status: 'open' } },
});
export const Tests = livecodesStory({
  template: 'jest',
  config: { tools: { enabled: 'all', active: 'tests', status: 'open' } },
});
export const TestsEnabled = livecodesStory({
  template: 'jest',
  config: { tools: { enabled: ['tests'], active: 'tests', status: 'open' } },
});
export const ModeResult = livecodesStory({ template: 'javascript', config: { mode: 'result' } });
export const ModeEditor = livecodesStory({ template: 'javascript', config: { mode: 'editor' } });
export const ModeCodeblock = livecodesStory({
  template: 'javascript',
  config: { mode: 'codeblock' },
});
export const ModeFull = livecodesStory({ template: 'javascript', config: { mode: 'full' } });
export const ModeResultConsoleClosed = livecodesStory({
  template: 'javascript',
  config: { mode: 'result', tools: { enabled: 'all', active: 'console', status: 'closed' } },
});
export const ModeResultConsoleOpen = livecodesStory({
  template: 'javascript',
  config: { mode: 'result', tools: { enabled: 'all', active: 'console', status: 'open' } },
});
export const ModeResultCompiledOpen = livecodesStory({
  template: 'javascript',
  config: { mode: 'result', tools: { enabled: 'all', active: 'compiled', status: 'open' } },
});
export const ConfigJsonURL = livecodesStory({
  config:
    'https://raw.githubusercontent.com/hatemhosny/typescript-demo-for-testing-import-/gh-pages/src/livecodes.json',
});
ConfigJsonURL.storyName = 'Config JSON URL';
