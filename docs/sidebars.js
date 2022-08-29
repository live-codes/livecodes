// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Docs',
      link: {
        type: 'doc',
        id: 'overview',
      },
      collapsible: false,
      items: [
        'why',
        'getting-started',
        {
          type: 'category',
          label: 'Features',
          link: {
            type: 'doc',
            id: 'features/index',
          },
          items: [
            'features/editors',
            'features/result',
            'features/projects',
            'features/templates',
            'features/import',
            'features/export',
            'features/share',
            'features/github-integration',
            'features/css-presets',
            'features/css-processors',
            'features/external-css-js',
            'features/npm-modules',
            'features/tools-pane',
            'features/console',
            'features/compiled-code',
            'features/tests',
            'features/display-modes',
            'features/default-view',
            'features/embeds',
            'features/lite',
            'features/code-preload',
            'features/intellisense',
            'features/code-format',
            'features/keyboard-shortcuts',
            'features/emmet',
            'features/user-settings',
            'features/assets',
            'features/snippets',
            'features/deploy',
            'features/sync',
            'features/broadcast',
            'features/backup-restore',
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
          items: ['languages/diagrams', 'languages/html'],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {
            type: 'doc',
            id: 'configuration/index',
          },
          items: ['configuration/configuration-object', 'configuration/query-params'],
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
