module.exports = {
  files: [
    {
      path: './build/sdk/*.js',
      maxSize: '5kB',
    },
    {
      path: './build/livecodes/!(*lang-)*.js',
      maxSize: '30kB',
    },
    {
      path: './build/livecodes/*(app|embed|lite|headless).*.js',
      maxSize: '100kB',
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
  normalizeFilenames: /^.+?((\.[^.]{8,}}?)|())\.\w+$/,
  ci: {
    repoBranchBase: 'develop',
    trackBranches: ['main', 'develop'],
  },
};
