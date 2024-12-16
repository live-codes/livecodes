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
    name: 'catppuccin-latte',
    title: 'Catppuccin Latte',
  },
  {
    name: 'catppuccin-frappe',
    title: 'Catppuccin Frappe',
  },
  {
    name: 'catppuccin-macchiato',
    title: 'Catppuccin Macchiato',
  },
  {
    name: 'catppuccin-mocha',
    title: 'Catppuccin Mocha',
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
    // Color Themes from https://catppuccin.com/palette
    {
      name: 'catppuccin-latte',
      theme: {
        base: 'vs',
        inherit: true,
        rules: [
          { token: '', foreground: '#4c4f69' }, // Text
          { token: 'keyword', foreground: '#8839ef' }, // Mauve
          { token: 'string', foreground: '#40a02b' }, // Green
          { token: 'number', foreground: '#fe640b' }, // Peach
          { token: 'comment', foreground: '#9ca0b0' }, // Overlay 0
          { token: 'type', foreground: '#1e66f5' }, // Blue
          { token: 'function', foreground: '#04a5e5' }, // Sky
          { token: 'variable', foreground: '#4c4f69' }, // Text
          { token: 'constant', foreground: '#fe640b' }, // Peach
          { token: 'parameter', foreground: '#ea76cb' }, // Pink
          { token: 'class', foreground: '#df8e1d' }, // Yellow
          { token: 'operator', foreground: '#04a5e5' }, // Sky
        ],
        colors: {
          // Editor colors
          'editor.background': '#eff1f5', // Base
          'editor.foreground': '#4c4f69', // Text
          'editor.lineHighlightBackground': '#ccd0da', // Surface0
          'editor.selectionBackground': '#acb0be', // Surface2
          'editor.inactiveSelectionBackground': '#ccd0da', // Surface0

          // Editor widgets
          'editorWidget.background': '#dce0e8', // Crust
          'editorWidget.border': '#ccd0da', // Surface0

          // Sidebar
          'sideBar.background': '#dce0e8', // Crust
          'sideBar.foreground': '#4c4f69', // Text

          // Bracket pairs
          'editorBracketHighlight.foreground1': '#dc8a78', // Rosewater
          'editorBracketHighlight.foreground2': '#7287fd', // Lavender
          'editorBracketHighlight.foreground3': '#8839ef', // Mauve
          'editorBracketHighlight.foreground4': '#df8e1d', // Yellow
          'editorBracketHighlight.foreground5': '#ea76cb', // Pink
          'editorBracketHighlight.foreground6': '#179299', // Teal
          'editorBracketHighlight.unexpectedBracket.foreground': '#d20f39', // Red

          // Gutter
          'editorGutter.background': '#eff1f5', // Base
          'editorGutter.modifiedBackground': '#1e66f5', // Blue
          'editorGutter.addedBackground': '#40a02b', // Green
          'editorGutter.deletedBackground': '#d20f39', // Red

          // Line numbers
          'editorLineNumber.foreground': '#9ca0b0', // Overlay0
          'editorLineNumber.activeForeground': '#4c4f69', // Text

          // Cursor
          'editorCursor.foreground': '#dc8a78', // Rosewater

          // Diff editor
          'diffEditor.insertedTextBackground': '#40a02b33', // Darker Green
          'diffEditor.removedTextBackground': '#d20f3933', // Darker Red
        },
      },
    },
    {
      name: 'catppuccin-frappe',
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: '', foreground: '#c6d0f5' }, // Text
          { token: 'keyword', foreground: '#ca9ee6' }, // Mauve
          { token: 'string', foreground: '#a6d189' }, // Green
          { token: 'number', foreground: '#ef9f76' }, // Peach
          { token: 'comment', foreground: '#737994' }, // Overlay 0
          { token: 'type', foreground: '#8caaee' }, // Blue
          { token: 'function', foreground: '#99d1db' }, // Sky
          { token: 'variable', foreground: '#c6d0f5' }, // Text
          { token: 'constant', foreground: '#ef9f76' }, // Peach
          { token: 'parameter', foreground: '#f4b8e4' }, // Pink
          { token: 'class', foreground: '#e5c890' }, // Yellow
          { token: 'operator', foreground: '#99d1db' }, // Sky
        ],
        colors: {
          // Editor colors
          'editor.background': '#303446', // Base
          'editor.foreground': '#c6d0f5', // Text
          'editor.lineHighlightBackground': '#414559', // Surface0
          'editor.selectionBackground': '#51576d', // Surface2
          'editor.inactiveSelectionBackground': '#414559', // Surface0

          // Editor widgets
          'editorWidget.background': '#292c3c', // Crust
          'editorWidget.border': '#414559', // Surface0

          // Sidebar
          'sideBar.background': '#292c3c', // Crust
          'sideBar.foreground': '#c6d0f5', // Text

          // Bracket pairs
          'editorBracketHighlight.foreground1': '#f2d5cf', // Rosewater
          'editorBracketHighlight.foreground2': '#babbf1', // Lavender
          'editorBracketHighlight.foreground3': '#ca9ee6', // Mauve
          'editorBracketHighlight.foreground4': '#e5c890', // Yellow
          'editorBracketHighlight.foreground5': '#f4b8e4', // Pink
          'editorBracketHighlight.foreground6': '#81c8be', // Teal
          'editorBracketHighlight.unexpectedBracket.foreground': '#e78284', // Red

          // Gutter
          'editorGutter.background': '#303446', // Base
          'editorGutter.modifiedBackground': '#8caaee', // Blue
          'editorGutter.addedBackground': '#a6d189', // Green
          'editorGutter.deletedBackground': '#e78284', // Red

          // Line numbers
          'editorLineNumber.foreground': '#737994', // Overlay0
          'editorLineNumber.activeForeground': '#c6d0f5', // Text

          // Cursor
          'editorCursor.foreground': '#f2d5cf', // Rosewater

          // Diff editor
          'diffEditor.insertedTextBackground': '#a6d18933', // Darker Green
          'diffEditor.removedTextBackground': '#e7828433', // Darker Red
        },
      },
    },
    {
      name: 'catppuccin-macchiato',
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: '', foreground: '#cad3f5' }, // Text
          { token: 'keyword', foreground: '#c6a0f6' }, // Mauve
          { token: 'string', foreground: '#a6da95' }, // Green
          { token: 'number', foreground: '#f5a97f' }, // Peach
          { token: 'comment', foreground: '#6e738d' }, // Overlay 0
          { token: 'type', foreground: '#8aadf4' }, // Blue
          { token: 'function', foreground: '#91d7e3' }, // Sky
          { token: 'variable', foreground: '#cad3f5' }, // Text
          { token: 'constant', foreground: '#f5a97f' }, // Peach
          { token: 'parameter', foreground: '#f5bde6' }, // Pink
          { token: 'class', foreground: '#eed49f' }, // Yellow
          { token: 'operator', foreground: '#91d7e3' }, // Sky
        ],
        colors: {
          // Editor colors
          'editor.background': '#24273a', // Base
          'editor.foreground': '#cad3f5', // Text
          'editor.lineHighlightBackground': '#363a4f', // Surface0
          'editor.selectionBackground': '#494d64', // Surface2
          'editor.inactiveSelectionBackground': '#363a4f', // Surface0

          // Editor widgets
          'editorWidget.background': '#181926', // Crust
          'editorWidget.border': '#363a4f', // Surface0

          // Sidebar
          'sideBar.background': '#181926', // Crust
          'sideBar.foreground': '#cad3f5', // Text

          // Bracket pairs
          'editorBracketHighlight.foreground1': '#f4dbd6', // Rosewater
          'editorBracketHighlight.foreground2': '#b7bdf8', // Lavender
          'editorBracketHighlight.foreground3': '#c6a0f6', // Mauve
          'editorBracketHighlight.foreground4': '#eed49f', // Yellow
          'editorBracketHighlight.foreground5': '#f5bde6', // Pink
          'editorBracketHighlight.foreground6': '#8bd5ca', // Teal
          'editorBracketHighlight.unexpectedBracket.foreground': '#ed8796', // Red

          // Gutter
          'editorGutter.background': '#24273a', // Base
          'editorGutter.modifiedBackground': '#8aadf4', // Blue
          'editorGutter.addedBackground': '#a6da95', // Green
          'editorGutter.deletedBackground': '#ed8796', // Red

          // Line numbers
          'editorLineNumber.foreground': '#6e738d', // Overlay0
          'editorLineNumber.activeForeground': '#cad3f5', // Text

          // Cursor
          'editorCursor.foreground': '#f4dbd6', // Rosewater

          // Diff editor
          'diffEditor.insertedTextBackground': '#a6da9533', // Darker Green
          'diffEditor.removedTextBackground': '#ed879633', // Darker Red
        },
      },
    },
    {
      name: 'catppuccin-mocha',
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: '', foreground: '#cdd6f4' }, // Text
          { token: 'keyword', foreground: '#cba6f7' }, // Mauve
          { token: 'string', foreground: '#a6e3a1' }, // Green
          { token: 'number', foreground: '#fab387' }, // Peach
          { token: 'comment', foreground: '#6c7086' }, // Overlay 0
          { token: 'type', foreground: '#89b4fa' }, // Blue
          { token: 'function', foreground: '#89dceb' }, // Sky
          { token: 'variable', foreground: '#cdd6f4' }, // Text
          { token: 'constant', foreground: '#fab387' }, // Peach
          { token: 'parameter', foreground: '#f5c2e7' }, // Pink
          { token: 'class', foreground: '#f9e2af' }, // Yellow
          { token: 'operator', foreground: '#89dceb' }, // Sky
        ],
        colors: {
          // Editor colors
          'editor.background': '#1e1e2e', // Base
          'editor.foreground': '#cdd6f4', // Text
          'editor.lineHighlightBackground': '#313244', // Surface0
          'editor.selectionBackground': '#45475a', // Surface2
          'editor.inactiveSelectionBackground': '#313244', // Surface0

          // Editor widgets
          'editorWidget.background': '#181825', // Crust
          'editorWidget.border': '#313244', // Surface0

          // Sidebar
          'sideBar.background': '#181825', // Crust
          'sideBar.foreground': '#cdd6f4', // Text

          // Bracket pairs
          'editorBracketHighlight.foreground1': '#f5e0dc', // Rosewater
          'editorBracketHighlight.foreground2': '#b4befe', // Lavender
          'editorBracketHighlight.foreground3': '#cba6f7', // Mauve
          'editorBracketHighlight.foreground4': '#f9e2af', // Yellow
          'editorBracketHighlight.foreground5': '#f5c2e7', // Pink
          'editorBracketHighlight.foreground6': '#94e2d5', // Teal
          'editorBracketHighlight.unexpectedBracket.foreground': '#f38ba8', // Red

          // Gutter
          'editorGutter.background': '#1e1e2e', // Base
          'editorGutter.modifiedBackground': '#89b4fa', // Blue
          'editorGutter.addedBackground': '#a6e3a1', // Green
          'editorGutter.deletedBackground': '#f38ba8', // Red

          // Line numbers
          'editorLineNumber.foreground': '#6c7086', // Overlay0
          'editorLineNumber.activeForeground': '#cdd6f4', // Text

          // Cursor
          'editorCursor.foreground': '#f5e0dc', // Rosewater

          // Diff editor (future proofing)
          'diffEditor.insertedTextBackground': '#a6e3a133', // Darker Green
          'diffEditor.removedTextBackground': '#f38ba833', // Darker Red
        },
      },
    },
  ];
