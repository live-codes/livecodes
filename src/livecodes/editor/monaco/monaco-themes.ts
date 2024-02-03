import type * as Monaco from 'monaco-editor';
import type { MonacoTheme } from '../../models';
import { monacoThemesBaseUrl } from '../../vendors';

export const monacoThemes: Array<{ name: MonacoTheme; title: string; url?: string }> = [
  {
    name: 'active4d',
    title: 'Active4D',
    url: monacoThemesBaseUrl + 'Active4D.json',
  },
  {
    name: 'all-hallows-eve',
    title: 'All Hallows Eve',
    url: monacoThemesBaseUrl + 'All Hallows Eve.json',
  },
  {
    name: 'amy',
    title: 'Amy',
    url: monacoThemesBaseUrl + 'Amy.json',
  },
  {
    name: 'birds-of-paradise',
    title: 'Birds of Paradise',
    url: monacoThemesBaseUrl + 'Birds of Paradise.json',
  },
  {
    name: 'blackboard',
    title: 'Blackboard',
    url: monacoThemesBaseUrl + 'Blackboard.json',
  },
  {
    name: 'brilliance-black',
    title: 'Brilliance Black',
    url: monacoThemesBaseUrl + 'Brilliance Black.json',
  },
  {
    name: 'brilliance-dull',
    title: 'Brilliance Dull',
    url: monacoThemesBaseUrl + 'Brilliance Dull.json',
  },
  {
    name: 'chrome-devtools',
    title: 'Chrome DevTools',
    url: monacoThemesBaseUrl + 'Chrome DevTools.json',
  },
  {
    name: 'clouds-midnight',
    title: 'Clouds Midnight',
    url: monacoThemesBaseUrl + 'Clouds Midnight.json',
  },
  {
    name: 'clouds',
    title: 'Clouds',
    url: monacoThemesBaseUrl + 'Clouds.json',
  },
  {
    name: 'cobalt',
    title: 'Cobalt',
    url: monacoThemesBaseUrl + 'Cobalt.json',
  },
  {
    name: 'cobalt2',
    title: 'Cobalt2',
    url: monacoThemesBaseUrl + 'Cobalt2.json',
  },
  {
    name: 'dawn',
    title: 'Dawn',
    url: monacoThemesBaseUrl + 'Dawn.json',
  },
  {
    name: 'dracula',
    title: 'Dracula',
    url: monacoThemesBaseUrl + 'Dracula.json',
  },
  {
    name: 'dreamweaver',
    title: 'Dreamweaver',
    url: monacoThemesBaseUrl + 'Dreamweaver.json',
  },
  {
    name: 'eiffel',
    title: 'Eiffel',
    url: monacoThemesBaseUrl + 'Eiffel.json',
  },
  {
    name: 'espresso-libre',
    title: 'Espresso Libre',
    url: monacoThemesBaseUrl + 'Espresso Libre.json',
  },
  {
    name: 'github',
    title: 'GitHub',
    url: monacoThemesBaseUrl + 'GitHub.json',
  },
  {
    name: 'github-dark',
    title: 'GitHub Dark',
    url: monacoThemesBaseUrl + 'GitHub Dark.json',
  },
  {
    name: 'github-light',
    title: 'GitHub Light',
    url: monacoThemesBaseUrl + 'GitHub Light.json',
  },
  {
    name: 'hc-black',
    title: 'High Contrast (Black)',
  },
  {
    name: 'hc-light',
    title: 'High Contrast (Light)',
  },
  {
    name: 'idle',
    title: 'Idle',
    url: monacoThemesBaseUrl + 'IDLE.json',
  },
  {
    name: 'idlefingers',
    title: 'Idle Fingers',
    url: monacoThemesBaseUrl + 'idleFingers.json',
  },
  {
    name: 'iplastic',
    title: 'iPlastic',
    url: monacoThemesBaseUrl + 'iPlastic.json',
  },
  {
    name: 'katzenmilch',
    title: 'Katzenmilch',
    url: monacoThemesBaseUrl + 'Katzenmilch.json',
  },
  {
    name: 'krtheme',
    title: 'krTheme',
    url: monacoThemesBaseUrl + 'krTheme.json',
  },
  {
    name: 'kuroir',
    title: 'Kuroir Theme',
    url: monacoThemesBaseUrl + 'Kuroir Theme.json',
  },
  {
    name: 'lazy',
    title: 'Lazy',
    url: monacoThemesBaseUrl + 'LAZY.json',
  },
  {
    name: 'magicwb-amiga',
    title: 'MagicWB (Amiga)',
    url: monacoThemesBaseUrl + 'MagicWB (Amiga).json',
  },
  {
    name: 'merbivore-soft',
    title: 'Merbivore Soft',
    url: monacoThemesBaseUrl + 'Merbivore Soft.json',
  },
  {
    name: 'merbivore',
    title: 'Merbivore',
    url: monacoThemesBaseUrl + 'Merbivore.json',
  },
  {
    name: 'monochrome',
    title: 'Monochrome',
  },
  {
    name: 'monochrome-dark',
    title: 'Monochrome Dark',
  },
  {
    name: 'monoindustrial',
    title: 'monoindustrial',
    url: monacoThemesBaseUrl + 'monoindustrial.json',
  },
  {
    name: 'monokai',
    title: 'Monokai',
    url: monacoThemesBaseUrl + 'Monokai.json',
  },
  {
    name: 'monokai-bright',
    title: 'Monokai Bright',
    url: monacoThemesBaseUrl + 'Monokai Bright.json',
  },
  {
    name: 'night-owl',
    title: 'Night Owl',
    url: monacoThemesBaseUrl + 'Night Owl.json',
  },
  {
    name: 'nord',
    title: 'Nord',
    url: monacoThemesBaseUrl + 'Nord.json',
  },
  {
    name: 'oceanic-next',
    title: 'Oceanic Next',
    url: monacoThemesBaseUrl + 'Oceanic Next.json',
  },
  {
    name: 'pastels-on-dark',
    title: 'Pastels on Dark',
    url: monacoThemesBaseUrl + 'Pastels on Dark.json',
  },
  {
    name: 'slush-and-poppies',
    title: 'Slush and Poppies',
    url: monacoThemesBaseUrl + 'Slush and Poppies.json',
  },
  {
    name: 'solarized-dark',
    title: 'Solarized Dark',
    url: monacoThemesBaseUrl + 'Solarized-dark.json',
  },
  {
    name: 'solarized-light',
    title: 'Solarized Light',
    url: monacoThemesBaseUrl + 'Solarized-light.json',
  },
  {
    name: 'spacecadet',
    title: 'SpaceCadet',
    url: monacoThemesBaseUrl + 'SpaceCadet.json',
  },
  {
    name: 'sunburst',
    title: 'Sunburst',
    url: monacoThemesBaseUrl + 'Sunburst.json',
  },
  {
    name: 'textmate-mac-classic',
    title: 'Textmate (Mac Classic)',
    url: monacoThemesBaseUrl + 'Textmate (Mac Classic).json',
  },
  {
    name: 'tomorrow',
    title: 'Tomorrow',
    url: monacoThemesBaseUrl + 'Tomorrow.json',
  },
  {
    name: 'tomorrow-night',
    title: 'Tomorrow Night',
    url: monacoThemesBaseUrl + 'Tomorrow-Night.json',
  },
  {
    name: 'tomorrow-night-blue',
    title: 'Tomorrow Night Blue',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Blue.json',
  },
  {
    name: 'tomorrow-night-bright',
    title: 'Tomorrow Night Bright',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Bright.json',
  },
  {
    name: 'tomorrow-night-eighties',
    title: 'Tomorrow Night Eighties',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Eighties.json',
  },
  {
    name: 'twilight',
    title: 'Twilight',
    url: monacoThemesBaseUrl + 'Twilight.json',
  },
  {
    name: 'upstream-sunburst',
    title: 'Upstream Sunburst',
    url: monacoThemesBaseUrl + 'Upstream Sunburst.json',
  },
  {
    name: 'vibrant-ink',
    title: 'Vibrant Ink',
    url: monacoThemesBaseUrl + 'Vibrant Ink.json',
  },
  {
    name: 'vs',
    title: 'VS',
  },
  {
    name: 'vs-dark',
    title: 'VS Dark',
  },
  {
    name: 'xcode-default',
    title: 'Xcode Default',
    url: monacoThemesBaseUrl + 'Xcode_default.json',
  },
  {
    name: 'zenburnesque',
    title: 'Zenburnesque',
    url: monacoThemesBaseUrl + 'Zenburnesque.json',
  },
];

export const customThemes: Array<{ name: MonacoTheme; theme: Monaco.editor.IStandaloneThemeData }> =
  [
    {
      name: 'custom-vs-light',
      theme: {
        base: 'vs',
        inherit: true,
        rules: [{ token: 'comment', fontStyle: 'italic' }],
        colors: {},
      },
    },
    {
      name: 'custom-vs-dark',
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [{ token: 'comment', fontStyle: 'italic' }],
        colors: {},
      },
    },
    {
      name: 'monochrome',
      theme: {
        base: 'vs',
        inherit: false,
        rules: [],
        colors: {
          'editor.foreground': '#24292e',
          'editorBracketHighlight.foreground1': '#24292e',
          'editorBracketHighlight.foreground2': '#24292e',
          'editorBracketHighlight.foreground3': '#24292e',
          'editorBracketHighlight.foreground4': '#24292e',
          'editorBracketHighlight.unexpectedBracket.foreground': '#24292e',
        },
      },
    },
    {
      name: 'monochrome-dark',
      theme: {
        base: 'vs-dark',
        inherit: false,
        rules: [],
        colors: {
          'editor.foreground': '#e2e2e3',
          'editor.background': '#24292e',
          'editorBracketHighlight.foreground1': '#e2e2e3',
          'editorBracketHighlight.foreground2': '#e2e2e3',
          'editorBracketHighlight.foreground3': '#e2e2e3',
          'editorBracketHighlight.foreground4': '#e2e2e3',
          'editorBracketHighlight.unexpectedBracket.foreground': '#e2e2e3',
        },
      },
    },
  ];
