// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Docs',
      link: {
        type: 'doc',
        id: 'index',
      },
      collapsible: false,
      items: [
        'why',
        'getting-started',
        'configuration',
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
            'features/import',
            'features/export',
            'features/share',
            'features/github-integration',
            'features/resources-assets',
            'features/css-presets',
            'features/css-processors',
            'features/npm-modules',
            'features/tools-pane',
            'features/console',
            'features/compiled-code',
            'features/tests',
            'features/display-modes',
            'features/embeds',
            'features/lite',
            'features/code-preload',
            'features/intellisense',
            'features/code-format',
            'features/keyboard-shortcuts',
            'features/emmet',
            'features/user-settings',
            'features/result',
            'features/deploy',
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
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'doc',
            id: 'advanced/api',
          },
          items: ['advanced/api', 'advanced/custom-settings'],
        },
        'credits',
        'license',
        'sponsor',
        'about',
      ],
    },
  ],

  examplesSidebar: [
    {
      type: 'category',
      label: 'Display Modes',
      link: {
        type: 'doc',
        id: 'examples/display-modes/index',
      },
      items: [
        'examples/display-modes/full',
        'examples/display-modes/editor',
        'examples/display-modes/codeblock',
        'examples/display-modes/result',
      ],
    },
  ],
};

module.exports = sidebars;
