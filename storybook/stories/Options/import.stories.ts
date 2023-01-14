import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/import',
};

export const GithubGist = livecodesStory({
  import: 'https://gist.github.com/hatemhosny/406b6775436e136cb913ad3376f411b2',
});

export const GithubGistNoUsername = livecodesStory({
  import: 'https://gist.github.com/406b6775436e136cb913ad3376f411b2',
});

export const GithubRepo = livecodesStory({
  import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-',
});

export const GithubDir = livecodesStory({
  import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/gh-pages/src',
});

export const GithubDirParmalink = livecodesStory({
  import:
    'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/29b328154267b36d77bfac284bc285784757c473/src',
});

export const GithubFile = livecodesStory({
  import:
    'https://github.com/hatemhosny/typescript-demo-for-testing-import-/blob/gh-pages/index.html',
});

export const GitlabSnippet = livecodesStory({ import: 'https://gitlab.com/-/snippets/2199319' });

export const GitlabRepo = livecodesStory({
  import: 'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-',
});

export const GitlabDir = livecodesStory({
  import: 'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/tree/gh-pages/src',
});

export const GitlabFile = livecodesStory({
  import:
    'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/blob/gh-pages/index.html',
});

export const Jsbin = livecodesStory({
  import: 'https://jsbin.com/mikunebofa/edit?html,css,js,output',
});

export const RawCode = livecodesStory({
  import: 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/',
});

export const DOM = livecodesStory({
  import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
});

export const DOMCustomSelector = livecodesStory({
  import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
  params: {
    'html-selector': 'h1',
  },
});
