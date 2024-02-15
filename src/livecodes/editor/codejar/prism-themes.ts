import type { CodejarTheme } from '../../models';
import {
  prismOfficialThemesBaseUrl,
  prismThemesBaseUrl,
  prismThemesLaserWaveUrl,
} from '../../vendors';

const changeLineNumberColor = (color: string) =>
  `.line-numbers-rows > span::before { color: ${color} !important; }`;

export const prismThemes: Array<{
  name: CodejarTheme;
  title: string;
  url: string;
  overrideCSS?: string;
}> = [
  { name: 'a11y-dark', title: 'A11y Dark', url: prismThemesBaseUrl + 'prism-a11y-dark.css' },
  { name: 'atom-dark', title: 'Atom Dark', url: prismThemesBaseUrl + 'prism-atom-dark.css' },
  {
    name: 'base16-ateliersulphurpool-light',
    title: 'Base16 Ateliersulphurpool Light',
    url: prismThemesBaseUrl + 'prism-base16-ateliersulphurpool.light.css',
  },
  { name: 'cb', title: 'CB', url: prismThemesBaseUrl + 'prism-cb.css' },
  {
    name: 'coldark-cold',
    title: 'Coldark Cold',
    url: prismThemesBaseUrl + 'prism-coldark-cold.css',
  },
  {
    name: 'coldark-dark',
    title: 'Coldark Dark',
    url: prismThemesBaseUrl + 'prism-coldark-dark.css',
  },
  { name: 'coy', title: 'Coy', url: prismOfficialThemesBaseUrl + 'prism-coy.css' },
  {
    name: 'coy-without-shadows',
    title: 'Coy Without Shadows',
    url: prismThemesBaseUrl + 'prism-coy-without-shadows.css',
  },
  { name: 'darcula', title: 'Darcula', url: prismThemesBaseUrl + 'prism-darcula.css' },
  { name: 'dark', title: 'Dark', url: prismOfficialThemesBaseUrl + 'prism-dark.css' },
  { name: 'dracula', title: 'Dracula', url: prismThemesBaseUrl + 'prism-dracula.css' },
  {
    name: 'duotone-dark',
    title: 'Duotone Dark',
    url: prismThemesBaseUrl + 'prism-duotone-dark.css',
  },
  {
    name: 'duotone-earth',
    title: 'Duotone Earth',
    url: prismThemesBaseUrl + 'prism-duotone-earth.css',
  },
  {
    name: 'duotone-forest',
    title: 'Duotone Forest',
    url: prismThemesBaseUrl + 'prism-duotone-forest.css',
  },
  {
    name: 'duotone-light',
    title: 'Duotone Light',
    url: prismThemesBaseUrl + 'prism-duotone-light.css',
  },
  {
    name: 'duotone-sea',
    title: 'Duotone Sea',
    url: prismThemesBaseUrl + 'prism-duotone-sea.css',
  },
  {
    name: 'duotone-space',
    title: 'Duotone Space',
    url: prismThemesBaseUrl + 'prism-duotone-space.css',
  },
  { name: 'funky', title: 'Funky', url: prismOfficialThemesBaseUrl + 'prism-funky.css' },
  { name: 'ghcolors', title: 'GH Colors', url: prismThemesBaseUrl + 'prism-ghcolors.css' },
  {
    name: 'gruvbox-dark',
    title: 'Gruvbox Dark',
    url: prismThemesBaseUrl + 'prism-gruvbox-dark.css',
  },
  {
    name: 'gruvbox-light',
    title: 'Gruvbox Light',
    url: prismThemesBaseUrl + 'prism-gruvbox-light.css',
  },
  { name: 'holi-theme', title: 'Holi Theme', url: prismThemesBaseUrl + 'prism-holi-theme.css' },
  { name: 'hopscotch', title: 'Hopscotch', url: prismThemesBaseUrl + 'prism-hopscotch.css' },
  { name: 'laserwave', title: 'Laserwave', url: prismThemesLaserWaveUrl },
  { name: 'lucario', title: 'Lucario', url: prismThemesBaseUrl + 'prism-lucario.css' },
  {
    name: 'material-dark',
    title: 'Material Dark',
    url: prismThemesBaseUrl + 'prism-material-dark.css',
  },
  {
    name: 'material-light',
    title: 'Material Light',
    url: prismThemesBaseUrl + 'prism-material-light.css',
  },
  {
    name: 'material-oceanic',
    title: 'Material Oceanic',
    url: prismThemesBaseUrl + 'prism-material-oceanic.css',
  },
  {
    name: 'monochrome',
    title: 'Monochrome',
    // code[class*="language-"],pre[class*="language-"]{color:#24292e;background-color:#fffffe;}
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiMyNDI5MmU7YmFja2dyb3VuZC1jb2xvcjojZmZmZmZlO30=',
  },
  {
    name: 'monochrome-dark',
    title: 'Monochrome Dark',
    // code[class*="language-"],pre[class*="language-"]{color:#e2e2e3;background-color:#24292e;}
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiNlMmUyZTM7YmFja2dyb3VuZC1jb2xvcjojMjQyOTJlO30=',
  },
  { name: 'night-owl', title: 'Night Owl', url: prismThemesBaseUrl + 'prism-night-owl.css' },
  { name: 'nord', title: 'Nord', url: prismThemesBaseUrl + 'prism-nord.css' },
  { name: 'okaidia', title: 'Okaidia', url: prismOfficialThemesBaseUrl + 'prism-okaidia.css' },
  { name: 'one-dark', title: 'One Dark', url: prismThemesBaseUrl + 'prism-one-dark.css' },
  { name: 'one-light', title: 'One Light', url: prismThemesBaseUrl + 'prism-one-light.css' },
  { name: 'pojoaque', title: 'Pojoaque', url: prismThemesBaseUrl + 'prism-pojoaque.css' },
  {
    name: 'shades-of-purple',
    title: 'Shades of Purple',
    url: prismThemesBaseUrl + 'prism-shades-of-purple.css',
  },
  {
    name: 'solarized-dark-atom',
    title: 'Solarized Dark Atom',
    url: prismThemesBaseUrl + 'prism-solarized-dark-atom.css',
  },
  {
    name: 'solarized-light',
    title: 'Solarized Light',
    url: prismOfficialThemesBaseUrl + 'prism-solarizedlight.css',
  },
  { name: 'synthwave84', title: 'Synthwave 84', url: prismThemesBaseUrl + 'prism-synthwave84.css' },
  { name: 'tomorrow', title: 'Tomorrow', url: prismOfficialThemesBaseUrl + 'prism-tomorrow.css' },
  { name: 'twilight', title: 'Twilight', url: prismOfficialThemesBaseUrl + 'prism-twilight.css' },
  { name: 'vs', title: 'VS', url: prismThemesBaseUrl + 'prism-vs.css' },
  {
    name: 'vsc-dark-plus',
    title: 'VSC Dark Plus',
    url: prismThemesBaseUrl + 'prism-vsc-dark-plus.css',
  },
  {
    name: 'xonokai',
    title: 'Xonokai',
    url: prismThemesBaseUrl + 'prism-xonokai.css',
    overrideCSS: changeLineNumberColor('#6f705e'),
  },
  { name: 'z-touchs', title: 'Z-Touchs', url: prismThemesBaseUrl + 'prism-z-touch.css' },
];
