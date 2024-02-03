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
  baseUrl: process.env.DOCS_BASE_URL || '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'LiveCodes',
  projectName: 'LiveCodes',
  customFields: {
    appVersion: appPkg.appVersion,
    sdkVersion: sdkPkg.version,
    docsBaseUrl: process.env.DOCS_BASE_URL,
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
            href: 'https://twitter.com/livecodes_io',
            label: '𝕏',
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
                to: '/why',
              },
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
              {
                label: 'Features',
                to: '/features',
              },
              {
                label: 'Languages',
                to: '/languages',
              },
              {
                label: 'SDK',
                to: '/sdk',
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
                label: 'Import...',
                href: 'pathname:///../?screen=import',
              },
              {
                label: 'AI Code Assistant 🪄',
                to: '/features/ai',
              },
              {
                label: 'Bookmarklet',
                to: '/bookmarklet',
              },
            ],
          },
          {
            title: 'Info',
            items: [
              {
                label: 'Credits',
                to: '/credits',
              },
              {
                label: 'License',
                to: '/license',
              },
              {
                label: 'Sponsor 💚',
                to: '/sponsor',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'About us',
                to: '/about',
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
                label: 'GitHub',
                href: 'https://github.com/live-codes/livecodes',
              },
              {
                label: '𝕏 / Twitter',
                href: 'https://twitter.com/livecodes_io',
              },
              {
                label: 'Dev',
                href: 'https://dev.to/livecodes_io',
              },
              {
                label: 'npm',
                href: 'https://www.npmjs.com/package/livecodes',
              },
              {
                html: '<a href="https://status.livecodes.io" target="_blank" rel="noopener noreferrer" class="footer__link-item status-link"><span>Status</span><svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>',
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
      src: 'https://unpkg.com/prettier@2.4.1/standalone.js',
      async: true,
    },
    {
      src: 'https://unpkg.com/prettier@2.4.1/parser-babel.js',
      async: true,
    },
    {
      src: 'https://unpkg.com/prettier@2.4.1/parser-html.js',
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
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/languages/pyodide',
            to: '/languages/python-wasm',
          },
        ],
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
