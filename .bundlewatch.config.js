module.exports = {
  files: [
    {
      path: './build/assets/*.js',
      maxSize: '10kB',
    },
    {
      path: './build/livecodes/!(lang-)*.js',
      maxSize: '30kB',
    },
    {
      path: './build/livecodes/*(app|embed|lite).*.js',
      maxSize: '100kB',
    },
    {
      path: './build/livecodes/codemirror-*.js',
      maxSize: '300kB',
    },
    // {
    //   path: './build/livecodes/lang-*.js',
    //   maxSize: '10kB',
    // },
    {
      path: './build/livecodes/*.css',
      maxSize: '10kB',
    },
  ],
  defaultCompression: 'brotli',
  normalizeFilenames: /^.+?(\.[^.]+?)\.\w+$/,
  ci: {
    trackBranches: ['main', 'develop'],
  },
};
