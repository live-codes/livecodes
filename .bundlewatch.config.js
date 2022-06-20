module.exports = {
  files: [
    {
      path: './build/assets/*.js',
      maxSize: '10kB',
      compression: 'brotli',
    },
    {
      path: './build/livecodes/app*.js',
      maxSize: '100kB',
      compression: 'brotli',
    },
    {
      path: './build/livecodes/embed*.js',
      maxSize: '100kB',
      compression: 'brotli',
    },
    {
      path: './build/livecodes/lite*.js',
      maxSize: '100kB',
      compression: 'brotli',
    },
    {
      path: './build/livecodes/codemirror-*.js',
      maxSize: '300kB',
      compression: 'brotli',
    },
    {
      path: './build/livecodes/!(app|embed|lite|codemirror-*|lang-)*.js',
      maxSize: '30kB',
      compression: 'brotli',
    },
  ],
  normalizeFilenames: /^.+?(\.[^.]+?)\.\w+$/,
  ci: {
    trackBranches: ['main', 'develop'],
  },
};
