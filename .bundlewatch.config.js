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
      path: './build/livecodes/*(app|embed|headless).*.js',
      maxSize: '120kB',
    },
    {
      path: './build/livecodes/lang-*.js',
      maxSize: '10kB',
    },
    {
      path: './build/livecodes/*.css',
      maxSize: '25kB',
    },
    {
      path: './build/livecodes/i18n-*.json',
      maxSize: '15kB',
    },
  ],
  defaultCompression: 'brotli',
  normalizeFilenames: /^.+?((\.[^.]{8,}}?)|())\.\w+$/,
  ci: {
    repoBranchBase: 'develop',
    trackBranches: ['main', 'develop'],
  },
};
