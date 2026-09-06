/* eslint-disable import/no-unresolved */

// @ts-ignore
import { EditorView } from '@codemirror/view';
// @ts-ignore
import type { Extension } from '@codemirror/state';
// @ts-ignore
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
// @ts-ignore
import { tags as t } from '@lezer/highlight';

import type { CodemirrorTheme } from '../../models';
import {
  cm6ThemeBasicDarkUrl,
  cm6ThemeBasicLightUrl,
  cm6ThemeGruvboxDarkUrl,
  cm6ThemeGruvboxLightUrl,
  cm6ThemeMaterialDarkUrl,
  cm6ThemeNordUrl,
  cm6ThemeSolarizedDarkUrl,
  cm6ThemeSolarizedLightUrl,
  ddietrCmThemesBaseUrl,
  thememirrorBaseUrl,
  vendorsBaseUrl,
} from '../../vendors';

export const codemirrorThemes: Array<{
  name: CodemirrorTheme;
  title: string;
  url?: string;
  exportName?: string;
}> = [
  {
    name: 'amy',
    title: 'Amy',
    url: thememirrorBaseUrl + 'amy.js',
    exportName: 'amy',
  },
  {
    name: 'aura',
    title: 'Aura',
    url: ddietrCmThemesBaseUrl + 'aura.js',
    exportName: 'aura',
  },
  {
    name: 'ayu-light',
    title: 'Ayu Light',
    url: thememirrorBaseUrl + 'ayu-light.js',
    exportName: 'ayuLight',
  },
  {
    name: 'barf',
    title: 'Barf',
    url: thememirrorBaseUrl + 'barf.js',
    exportName: 'barf',
  },
  {
    name: 'basic-light',
    title: 'Basic Light',
    url: cm6ThemeBasicLightUrl,
    exportName: 'basicLight',
  },
  {
    name: 'basic-dark',
    title: 'Basic Dark',
    url: cm6ThemeBasicDarkUrl,
    exportName: 'basicDark',
  },
  {
    name: 'bespin',
    title: 'Bespin',
    url: thememirrorBaseUrl + 'bespin.js',
    exportName: 'bespin',
  },
  {
    name: 'birds-of-paradise',
    title: 'Birds of Paradise',
    url: thememirrorBaseUrl + 'birds-of-paradise.js',
    exportName: 'birdsOfParadise',
  },
  {
    name: 'boys-and-girls',
    title: 'Boys and Girls',
    url: thememirrorBaseUrl + 'boys-and-girls.js',
    exportName: 'boysAndGirls',
  },
  {
    name: 'catppuccin-latte',
    title: 'Catppuccin Latte',
    url: vendorsBaseUrl + 'catppuccin/codemirror/codemirror-theme-catppuccin.js',
    exportName: 'catppuccinLatte',
  },
  {
    name: 'catppuccin-frappe',
    title: 'Catppuccin Frappe',
    url: vendorsBaseUrl + 'catppuccin/codemirror/codemirror-theme-catppuccin.js',
    exportName: 'catppuccinFrappe',
  },
  {
    name: 'catppuccin-macchiato',
    title: 'Catppuccin Macchiato',
    url: vendorsBaseUrl + 'catppuccin/codemirror/codemirror-theme-catppuccin.js',
    exportName: 'catppuccinMacchiato',
  },
  {
    name: 'catppuccin-mocha',
    title: 'Catppuccin Mocha',
    url: vendorsBaseUrl + 'catppuccin/codemirror/codemirror-theme-catppuccin.js',
    exportName: 'catppuccinMocha',
  },
  {
    name: 'clouds',
    title: 'Clouds',
    url: thememirrorBaseUrl + 'clouds.js',
    exportName: 'clouds',
  },
  {
    name: 'cobalt',
    title: 'Cobalt',
    url: thememirrorBaseUrl + 'cobalt.js',
    exportName: 'cobalt',
  },
  { name: 'cm-light', title: 'Codemirror Light' },
  {
    name: 'cool-glow',
    title: 'Cool Glow',
    url: thememirrorBaseUrl + 'cool-glow.js',
    exportName: 'coolGlow',
  },
  {
    name: 'dracula',
    title: 'Dracula',
    url: thememirrorBaseUrl + 'dracula.js',
    exportName: 'dracula',
  },
  {
    name: 'espresso',
    title: 'Espresso',
    url: thememirrorBaseUrl + 'espresso.js',
    exportName: 'espresso',
  },
  {
    name: 'github-dark',
    title: 'GitHub Dark',
    url: ddietrCmThemesBaseUrl + 'github-dark.js',
    exportName: 'githubDark',
  },
  {
    name: 'github-light',
    title: 'GitHub Light',
    url: ddietrCmThemesBaseUrl + 'github-light.js',
    exportName: 'githubLight',
  },
  {
    name: 'gruvbox-dark',
    title: 'Gruvbox Dark',
    url: cm6ThemeGruvboxDarkUrl,
    exportName: 'gruvboxDark',
  },
  {
    name: 'gruvbox-light',
    title: 'Gruvbox Light',
    url: cm6ThemeGruvboxLightUrl,
    exportName: 'gruvboxLight',
  },
  {
    name: 'material-dark',
    title: 'Material Dark',
    url: cm6ThemeMaterialDarkUrl,
    exportName: 'materialDark',
  },
  {
    name: 'material-light',
    title: 'Material Light',
    url: ddietrCmThemesBaseUrl + 'material-light.js',
    exportName: 'materialLight',
  },
  { name: 'monochrome', title: 'Monochrome' },
  { name: 'monochrome-dark', title: 'Monochrome Dark' },
  {
    name: 'noctis-lilac',
    title: 'Noctis Lilac',
    url: thememirrorBaseUrl + 'noctis-lilac.js',
    exportName: 'noctisLilac',
  },
  {
    name: 'nord',
    title: 'Nord',
    url: cm6ThemeNordUrl,
    exportName: 'nord',
  },
  { name: 'one-dark', title: 'One Dark' },
  {
    name: 'rose-pine-dawn',
    title: 'Rosé Pine Dawn',
    url: thememirrorBaseUrl + 'rose-pine-dawn.js',
    exportName: 'rosePineDawn',
  },
  {
    name: 'smoothy',
    title: 'Smoothy',
    url: thememirrorBaseUrl + 'smoothy.js',
    exportName: 'smoothy',
  },
  {
    name: 'solarized-dark',
    title: 'Solarized Dark',
    url: cm6ThemeSolarizedDarkUrl,
    exportName: 'solarizedDark',
  },
  {
    name: 'solarized-light',
    title: 'Solarized Light',
    url: cm6ThemeSolarizedLightUrl,
    exportName: 'solarizedLight',
  },
  {
    name: 'tokyo-night',
    title: 'Tokyo Night',
    url: ddietrCmThemesBaseUrl + 'tokyo-night.js',
    exportName: 'tokyoNight',
  },
  {
    name: 'tokyo-night-day',
    title: 'Tokyo Night Day',
    url: ddietrCmThemesBaseUrl + 'tokyo-night-day.js',
    exportName: 'tokyoNightDay',
  },
  {
    name: 'tokyo-night-storm',
    title: 'Tokyo Night Storm',
    url: ddietrCmThemesBaseUrl + 'tokyo-night-storm.js',
    exportName: 'tokyoNightStorm',
  },
  {
    name: 'tomorrow',
    title: 'Tomorrow',
    url: thememirrorBaseUrl + 'tomorrow.js',
    exportName: 'tomorrow',
  },
];

// from https://github.com/vadimdemedes/thememirror/blob/main/source/create-theme.ts
const createTheme = ({
  variant,
  settings,
  styles,
}: {
  variant: 'light' | 'dark';
  settings: any;
  styles: any[];
}) => {
  const theme = EditorView.theme(
    {
      '&': {
        backgroundColor: settings.background,
        color: settings.foreground,
      },
      '.cm-content': {
        caretColor: settings.caret,
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: settings.caret,
      },
      '&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-selectionMatch, .cm-content ::selection':
        {
          backgroundColor: settings.selection,
        },
      '.cm-activeLine': {
        backgroundColor: settings.lineHighlight,
      },
      '.cm-gutters': {
        backgroundColor: settings.gutterBackground,
        color: settings.gutterForeground,
      },
      '.cm-activeLineGutter': {
        backgroundColor: settings.lineHighlight,
      },
    },
    {
      dark: variant === 'dark',
    },
  );
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [theme, syntaxHighlighting(highlightStyle)];
  return extension;
};

// ==========================================
// LiveCodes Dark Theme
// ==========================================

const liveCodesDarkTheme = EditorView.theme(
  {
    '&': {
      color: '#dde6f0',
      backgroundColor: '#181c20',
    },
    '.cm-content': {
      caretColor: '#00c8ff',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#00c8ff',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
      backgroundColor: '#00c8ff59 !important',
    },
    '.cm-panels': {
      backgroundColor: '#111b2c',
      color: '#dde6f0',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid #181c20',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid #181c20',
    },
    '.cm-searchMatch': {
      backgroundColor: '#00c8ff66',
      outline: '1px solid #00c8ff',
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#00c8ff44',
    },
    '.cm-activeLine': {
      backgroundColor: '#0b0d0f4d',
      outline: '2px solid #1f2329',
    },
    '.cm-selectionMatch': {
      backgroundColor: '#00c8ff26',
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#00c8ff26',
      outline: '1px solid #00c8ff80',
    },
    '.cm-gutters': {
      backgroundColor: '#181c20',
      color: '#2e3a4a',
      border: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#0d1825',
      color: '#00c8ff',
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#556070',
    },
    '.cm-tooltip': {
      backgroundColor: '#16191d',
      border: '1px solid #1f3147',
      borderRadius: '3px',
      padding: '6px 10px',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: '#00c8ff26',
        color: '#ffffff',
      },
    },
  },
  { dark: true },
);

const liveCodesDarkHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.modifier], color: '#00c8ff' },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: '#dde6f0' },
  { tag: [t.variableName], color: '#dde6f0' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: '#69d6ff' },
  { tag: [t.typeName, t.className, t.namespace], color: '#5fe0c8' },
  { tag: [t.operator, t.operatorKeyword], color: '#9cc0d4' },
  { tag: [t.string], color: '#00e5c8' },
  { tag: [t.escape], color: '#5ff0db' },
  { tag: [t.regexp], color: '#4ee8d4' },
  { tag: [t.number, t.changed], color: '#ffb86c' },
  { tag: [t.bool, t.null], color: '#ff8c66' },
  { tag: [t.annotation, t.derefOperator, t.typeOperator], color: '#5fe0c8' },
  { tag: [t.meta, t.comment], color: '#556070', fontStyle: 'italic' },
  { tag: [t.docComment], color: '#6a7a8c', fontStyle: 'italic' },
  { tag: [t.strong], fontWeight: 'bold' },
  { tag: [t.emphasis], fontStyle: 'italic' },
  { tag: [t.strikethrough], textDecoration: 'line-through' },
  { tag: [t.heading], fontWeight: 'bold', color: '#00c8ff' },
  { tag: [t.link], color: '#00e5c8' },
  { tag: [t.invalid], color: '#ff4d4d' },
  { tag: [t.tagName], color: '#00c8ff' },
  { tag: [t.attributeName], color: '#c9b8ff' },
  { tag: [t.attributeValue], color: '#00e5c8' },
  { tag: [t.punctuation, t.bracket], color: '#b5c7d9' },
]);

const liveCodesDark: Extension = [
  liveCodesDarkTheme,
  syntaxHighlighting(liveCodesDarkHighlightStyle),
];

// ==========================================
// LiveCodes Light Theme
// ==========================================

const liveCodesLightTheme = EditorView.theme(
  {
    '&': {
      color: '#1c2733',
      backgroundColor: '#ffffff',
    },
    '.cm-content': {
      caretColor: '#0073a8',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#0073a8',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
      backgroundColor: '#0073a859 !important',
    },
    '.cm-panels': {
      backgroundColor: '#ffffff',
      color: '#1c2733',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid #e8eef4',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid #e8eef4',
    },
    '.cm-searchMatch': {
      backgroundColor: '#0073a866',
      outline: '1px solid #0073a8',
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#0073a844',
    },
    '.cm-activeLine': {
      backgroundColor: '#0073a80d',
    },
    '.cm-selectionMatch': {
      backgroundColor: '#0073a826',
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#0073a826',
      outline: '1px solid #0073a880',
    },
    '.cm-gutters': {
      backgroundColor: '#ffffff',
      color: '#b0bccb',
      border: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#f2f7fb',
      color: '#0073a8',
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#8693a3',
    },
    '.cm-tooltip': {
      backgroundColor: '#ffffff',
      border: '1px solid #d6e0ea',
      borderRadius: '3px',
      padding: '6px 10px',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: '#0073a81f',
        color: '#0a2433',
      },
    },
  },
  { dark: false },
);

const liveCodesLightHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.modifier], color: '#0073a8' },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: '#1c2733' },
  { tag: [t.propertyName], color: '#6b4fc4' },
  { tag: [t.variableName], color: '#1c2733' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: '#0a7bbf' },
  { tag: [t.typeName, t.className, t.namespace], color: '#00897b' },
  { tag: [t.operator, t.operatorKeyword], color: '#4a5d6e' },
  { tag: [t.string], color: '#008573' },
  { tag: [t.escape], color: '#00a890' },
  { tag: [t.regexp], color: '#00997f' },
  { tag: [t.number, t.changed], color: '#c25e00' },
  { tag: [t.bool, t.null], color: '#cc4422' },
  { tag: [t.annotation, t.derefOperator, t.typeOperator], color: '#00897b' },
  { tag: [t.meta, t.comment], color: '#8693a3', fontStyle: 'italic' },
  { tag: [t.docComment], color: '#7a8696', fontStyle: 'italic' },
  { tag: [t.strong], fontWeight: 'bold' },
  { tag: [t.emphasis], fontStyle: 'italic' },
  { tag: [t.strikethrough], textDecoration: 'line-through' },
  { tag: [t.heading], fontWeight: 'bold', color: '#0073a8' },
  { tag: [t.link], color: '#008573' },
  { tag: [t.invalid], color: '#d11414' },
  { tag: [t.tagName], color: '#0073a8' },
  { tag: [t.attributeName], color: '#6b4fc4' },
  { tag: [t.attributeValue], color: '#008573' },
  { tag: [t.punctuation, t.bracket], color: '#3a4d5e' },
]);

const liveCodesLight: Extension = [
  liveCodesLightTheme,
  syntaxHighlighting(liveCodesLightHighlightStyle),
];

export const customThemes = {
  'livecodes-light': liveCodesLight,
  'livecodes-dark': liveCodesDark,
  monochrome: createTheme({
    variant: 'light',
    settings: {
      background: '#fffffe',
      foreground: '#24292e',
      caret: '#24292e',
      selection: '#c8c8fa',
      gutterBackground: '#fffffe',
      gutterForeground: '#24292e',
      lineHighlight: '#f1faff',
    },
    styles: [],
  }),
  'monochrome-dark': createTheme({
    variant: 'dark',
    settings: {
      background: '#24292e',
      foreground: '#e2e2e3',
      caret: '#e2e2e3',
      selection: '#444d56',
      gutterBackground: '#24292e',
      gutterForeground: '#e2e2e3',
      lineHighlight: '#444d56',
    },
    styles: [],
  }),
};
