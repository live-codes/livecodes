import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

import appPkg from '../package.json';
import sdkPkg from '../src/sdk/package.sdk.json';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const baseUrl =
  process.env.DOCS_BASE_URL != null && process.env.DOCS_BASE_URL !== 'null'
    ? process.env.DOCS_BASE_URL
    : process.env.BASE_URL != null
      ? process.env.BASE_URL + 'docs/'
      : '/docs/';

const config: Config = {
  title: 'LiveCodes',
  tagline: 'A Code Playground That Just Works!',
  url: 'https://livecodes.io/',
  baseUrl,
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
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/live-codes/livecodes/tree/develop/docs/',
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return excludeSidebarItems(sidebarItems);
          },
          remarkPlugins: [
            [
              require('@docusaurus/remark-plugin-npm2yarn'),
              { sync: true, converters: ['yarn', 'pnpm', 'bun'] },
            ],
            require('remark-livecodes'),
          ],
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('react-responsive-carousel/lib/styles/carousel.min.css'),
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
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
            // {
            //   label: 'AI Code Assistant 🪄',
            //   to: '/features/ai',
            // },
            {
              label: 'Bookmarklet',
              to: '/bookmarklet',
            },
            {
              html: `<span style="display: flex; gap: 0.5em; align-items: baseline;"><a href="/docs/llms.txt" target="_blank" class="footer__link-item">llms.txt</a>-<a href="/docs/llms-full.txt" target="_blank" class="footer__link-item">llms-full.txt</a></span>`,
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
      additionalLanguages: ['bash', 'csharp', 'java', 'markdown'],
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
  } satisfies Preset.ThemeConfig,
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
        skipErrorChecking: true,
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
    [
      './src/plugins/generate-llms-txt.ts',
      {
        title: 'LiveCodes',
        description: `LiveCodes is a feature-rich, open-source, client-side code playground that supports React, Vue, Svelte, Solid, JavaScript, TypeScript, CSS, Sass, Tailwind CSS, Python, Go, Ruby, PHP, and 90+ languages/frameworks.

A large number of starter templates are available to help you get started quickly.
Projects can be saved, shared, exported (e.g. to GitHub Gists), deployed (e.g. to GitHub Pages), or embedded in web pages.
A powerful yet easy-to-use SDK enables the creation of and communication with embedded playgrounds.

With extensive language support and high configurability, LiveCodes can easily adapt to your needs.
It offers excellent mobile support, featuring a responsive layout and a touch-friendly code editor.

LiveCodes is an outstanding tool for learning, teaching, prototyping, sharing, and testing code.
It can be easily self-hosted, if needed, on any static file server.

LiveCodes is completely free for unlimited use, with no ads and no account required.
Its MIT License also permits commercial use.

- [Docs](https://livecodes.io/docs/llms.txt)
- [Full Docs](https://livecodes.io/docs/llms-full.txt)
- [README](https://raw.githubusercontent.com/live-codes/livecodes/refs/heads/develop/README.md)
`,
        exportIndividualFiles: true,
        ignoreFiles: [],
        prependFiles: ['../../README.md'],
      },
    ],
  ],
  future: {
    experimental_faster: true,
  },
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

export default config;
