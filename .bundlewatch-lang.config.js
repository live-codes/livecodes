module.exports = {
  files: [
    {
      path: './build/livecodes/lang-*.js',
      maxSize: '10kB',
      compression: 'brotli',
    },
  ],
  normalizeFilenames: /^.+?(\.[^.]+?)\.\w+$/,
  ci: {
    trackBranches: ['main', 'develop'],
  },
};
