import type { StoryDef } from '../../common';

const storyDef: StoryDef = {
  GithubGist: {
    props: {
      import: 'https://gist.github.com/hatemhosny/406b6775436e136cb913ad3376f411b2',
    },
  },

  GithubGistNoUsername: {
    props: {
      import: 'https://gist.github.com/406b6775436e136cb913ad3376f411b2',
    },
  },

  GithubRepo: {
    props: {
      import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-',
    },
  },

  GithubDir: {
    props: {
      import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/gh-pages/src',
    },
  },

  GithubDirParmalink: {
    props: {
      import:
        'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/29b328154267b36d77bfac284bc285784757c473/src',
    },
  },

  GithubFile: {
    props: {
      import:
        'https://github.com/hatemhosny/typescript-demo-for-testing-import-/blob/gh-pages/index.html',
    },
  },

  GitlabSnippet: { props: { import: 'https://gitlab.com/-/snippets/2199319' } },

  GitlabRepo: {
    props: {
      import: 'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-',
    },
  },

  GitlabDir: {
    props: {
      import:
        'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/tree/gh-pages/src',
    },
  },

  GitlabFile: {
    props: {
      import:
        'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/blob/gh-pages/index.html',
    },
  },

  Jsbin: {
    props: {
      import: 'https://jsbin.com/mikunebofa/edit?html,css,js,output',
    },
  },

  RawCode: {
    props: {
      import: 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/',
    },
  },

  DOM: {
    props: {
      import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
    },
  },

  DOMCustomSelector: {
    props: {
      import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
      params: {
        'html-selector': 'h1',
      },
    },
  },
};

export default storyDef;
