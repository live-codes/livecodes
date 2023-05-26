// @ts-check
/* eslint-disable import/no-internal-modules */
/* eslint-disable @typescript-eslint/no-var-requires */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const appPkg = require('../package.json');
const sdkPkg = require('../src/sdk/package.sdk.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LiveCodes',
  tagline: 'Code Playground That Just Works!',
  url: 'https://livecodes.io/',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'LiveCodes',
  projectName: 'LiveCodes',
  customFields: {
    appVersion: appPkg.appVersion,
    sdkVersion: sdkPkg.version,
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/live-codes/livecodes/tree/develop/docs/',
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return excludeSidebarItems(sidebarItems);
          },
        },
        blog: false,
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
          { href: 'https://blog.livecodes.io', target: '_self', label: 'Blog', position: 'left' },
          {
            href: 'pathname:///../stories',
            position: 'left',
            label: 'Storybook',
          },
          {
            href: 'pathname:///../',
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
                href: 'pathname:///../',
              },
              {
                label: 'Starter Templates',
                href: 'pathname:///../?new',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/live-codes/livecodes',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.livecodes.io',
                target: '_self',
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
                label: 'About us',
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
      algolia: {
        appId: 'H9Z2PKYS80',
        apiKey: 'a97b58cd17c1aa51274222d1db75d839',
        indexName: 'livecodes',
        contextualSearch: true,
        replaceSearchResultPathname: {
          from: '/docs/',
          to: '/',
        },
        searchParameters: {},
        searchPagePath: 'search',
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
    {
      src: 'https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-html.js',
      async: true,
    },
    {
      src: 'https://media.ethicalads.io/media/client/ethicalads.min.js',
      async: true,
      defer: true,
    },
  ],
  headTags: [
    {
      // this adds a placeholder element to avoid "no ad placements found" error
      // when react is loaded, this element is removed and ad is loaded manually
      tagName: 'script',
      attributes: {
        type: 'ea-placeholder',
        id: 'ea-placeholder',
        'data-ea-publisher': 'livecodesio',
        'data-ea-manual': 'true',
      },
    },
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/sdk/index.ts'],
        tsconfig: '../tsconfig.json',
        plugin: ['typedoc-plugin-missing-exports'],
        excludeExternals: true,
        internalModule: '_internal',
      },
    ],
  ],
};

const excludeSidebarItems = (items) =>
  items
    .map((item) => {
      if (item.type === 'category') {
        return { ...item, items: excludeSidebarItems(item.items) };
      }
      return item;
    })
    .filter((item) => item.className !== 'exclude_from_sidebar');

module.exports = config;
