// @ts-check
/* eslint-disable import/no-internal-modules */
/* eslint-disable @typescript-eslint/no-var-requires */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LiveCodes',
  tagline: 'Code playground that runs in the browser!',
  url: 'https://livecodes.io/',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'LiveCodes',
  projectName: 'LiveCodes',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/live-codes/livecodes/tree/develop/docs/',
        },
        blog: false,
        // blog: {
        //   routeBasePath: '/blog',
        // },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('react-responsive-carousel/lib/styles/carousel.min.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'LiveCodes',
        logo: {
          alt: 'LiveCodes Logo',
          src: 'img/livecodes-logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'sdk',
            position: 'left',
            label: 'SDK',
          },
          {
            type: 'doc',
            docId: 'examples/display-modes/index',
            position: 'left',
            label: 'Examples',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://livecodes.io/',
            label: 'App',
            position: 'right',
          },
          {
            href: 'https://github.com/live-codes/livecodes',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/overview',
              },
              {
                label: 'Why Another Playground?',
                to: '/docs/why',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Features',
                to: '/docs/features',
              },
              {
                label: 'Languages',
                to: '/docs/languages',
              },
              {
                label: 'SDK',
                to: '/docs/sdk',
              },
            ],
          },
          {
            title: 'LiveCodes',
            items: [
              {
                label: 'App',
                href: 'https://livecodes.io',
              },
              {
                label: 'Starter Templates',
                href: 'https://livecodes.io/?screen=new',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/live-codes/livecodes',
              },
              {
                label: 'Credits',
                to: '/docs/credits',
              },
              {
                label: 'License',
                to: '/docs/license',
              },
              {
                label: 'Sponsor',
                to: '/docs/sponsor',
              },
              {
                label: 'Contact',
                to: '/docs/contact',
              },
              {
                label: 'About',
                to: '/docs/about',
              },
            ],
          },
        ],
        copyright: `<br /> Released under the MIT License <br />
        Copyright © ${new Date().getFullYear()}
        <a href="https://github.com/hatemhosny" target="_blank" rel="noopener noreferrer">Hatem Hosny</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/prettier@2.4.1/standalone.min.js',
      async: true,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-babel.js',
      async: true,
    },
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/lib/livecodes.ts'],
        tsconfig: '../tsconfig.json',
        plugin: ['typedoc-plugin-missing-exports'],
        excludeExternals: true,
        internalModule: '_internal',
      },
    ],
  ],
};

module.exports = config;
