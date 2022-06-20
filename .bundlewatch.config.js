module.exports = {
  files: [
    {
      path: './build/assets/*.js',
      maxSize: '10kB',
    },
    {
      path: './build/livecodes/app*.js',
      maxSize: '100kB',
    },
    {
      path: './build/livecodes/embed*.js',
      maxSize: '100kB',
    },
    {
      path: './build/livecodes/lite*.js',
      maxSize: '100kB',
    },
    {
      path: './build/livecodes/codemirror-*.js',
      maxSize: '350kB',
    },
    {
      path: './build/livecodes/codejar-*.js',
      maxSize: '35kB',
    },
    {
      path: './build/livecodes/!(app|embed|lite|codemirror-*|codejar-*)*.js',
      maxSize: '30kB',
    },
  ],
  normalizeFilenames: /^.+?(\.[^.]+?)\.\w+$/,
  ci: {
    trackBranches: ['main', 'develop'],
  },
};
