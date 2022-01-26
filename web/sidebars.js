// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'index',
    'getting-started',
    'goals',
    {
      type: 'category',
      label: 'Features',
      link: {
        type: 'doc',
        id: 'features/index',
      },
      items: [
        'features/editors',
        'features/projects',
        'features/templates',
        'features/import-export',
        'features/resources-assets',
        'features/npm-modules',
        'features/deploy',
        'features/console',
        'features/compiled-code',
        'features/display-modes',
        'features/embeds',
        'features/code-preload',
        'features/intellisense',
        'features/keyboard-shortcuts',
        'features/security',
      ],
    },
    {
      type: 'category',
      label: 'Languages',
      link: {
        type: 'doc',
        id: 'languages/index',
      },
      items: ['languages/html'],
    },
    'configuration',
    'credits',
    'license',
  ],
};

module.exports = sidebars;
