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
