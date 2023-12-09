import type { CodejarTheme } from '../../models';
import { prismThemesBaseUrl } from '../../vendors';

export const prismThemes: Array<{ name: CodejarTheme; title: string; url?: string }> = [
  { name: 'prism-light', title: 'Prism Light' },
  { name: 'prism-dark', title: 'Prism Dark' },
  { name: 'a11y-dark', title: 'a11y-dark', url: prismThemesBaseUrl + 'prism-a11y-dark.css' },
  { name: 'atom-dark', title: 'atom-dark', url: prismThemesBaseUrl + 'prism-atom-dark.css' },
  {
    name: 'base16-ateliersulphurpool-light',
    title: 'base16-ateliersulphurpool-light',
    url: prismThemesBaseUrl + 'prism-base16-ateliersulphurpool.light.css',
  },
  { name: 'cb', title: 'cb', url: prismThemesBaseUrl + 'prism-cb.css' },
  {
    name: 'coldark-cold',
    title: 'coldark-cold',
    url: prismThemesBaseUrl + 'prism-coldark-cold.css',
  },
  {
    name: 'coldark-dark',
    title: 'coldark-dark',
    url: prismThemesBaseUrl + 'prism-coldark-dark.css',
  },
  {
    name: 'coy-without-shadows',
    title: 'coy-without-shadows',
    url: prismThemesBaseUrl + 'prism-coy-without-shadows.css',
  },
  { name: 'darcula', title: 'darcula', url: prismThemesBaseUrl + 'prism-darcula.css' },
  { name: 'dracula', title: 'dracula', url: prismThemesBaseUrl + 'prism-dracula.css' },
  {
    name: 'duotone-dark',
    title: 'duotone-dark',
    url: prismThemesBaseUrl + 'prism-duotone-dark.css',
  },
  {
    name: 'duotone-earth',
    title: 'duotone-earth',
    url: prismThemesBaseUrl + 'prism-duotone-earth.css',
  },
  {
    name: 'duotone-forest',
    title: 'duotone-forest',
    url: prismThemesBaseUrl + 'prism-duotone-forest.css',
  },
  {
    name: 'duotone-light',
    title: 'duotone-light',
    url: prismThemesBaseUrl + 'prism-duotone-light.css',
  },
  { name: 'duotone-sea', title: 'duotone-sea', url: prismThemesBaseUrl + 'prism-duotone-sea.css' },
  {
    name: 'duotone-space',
    title: 'duotone-space',
    url: prismThemesBaseUrl + 'prism-duotone-space.css',
  },
  { name: 'ghcolors', title: 'ghcolors', url: prismThemesBaseUrl + 'prism-ghcolors.css' },
  {
    name: 'gruvbox-dark',
    title: 'gruvbox-dark',
    url: prismThemesBaseUrl + 'prism-gruvbox-dark.css',
  },
  {
    name: 'gruvbox-light',
    title: 'gruvbox-light',
    url: prismThemesBaseUrl + 'prism-gruvbox-light.css',
  },
  { name: 'holi-theme', title: 'holi-theme', url: prismThemesBaseUrl + 'prism-holi-theme.css' },
  { name: 'hopscotch', title: 'hopscotch', url: prismThemesBaseUrl + 'prism-hopscotch.css' },
  { name: 'laserwave', title: 'laserwave', url: prismThemesBaseUrl + 'prism-laserwave.css' },
  { name: 'lucario', title: 'lucario', url: prismThemesBaseUrl + 'prism-lucario.css' },
  {
    name: 'material-dark',
    title: 'material-dark',
    url: prismThemesBaseUrl + 'prism-material-dark.css',
  },
  {
    name: 'material-light',
    title: 'material-light',
    url: prismThemesBaseUrl + 'prism-material-light.css',
  },
  {
    name: 'material-oceanic',
    title: 'material-oceanic',
    url: prismThemesBaseUrl + 'prism-material-oceanic.css',
  },
  { name: 'night-owl', title: 'night-owl', url: prismThemesBaseUrl + 'prism-night-owl.css' },
  { name: 'nord', title: 'nord', url: prismThemesBaseUrl + 'prism-nord.css' },
  { name: 'one-dark', title: 'one-dark', url: prismThemesBaseUrl + 'prism-one-dark.css' },
  { name: 'one-light', title: 'one-light', url: prismThemesBaseUrl + 'prism-one-light.css' },
  { name: 'pojoaque', title: 'pojoaque', url: prismThemesBaseUrl + 'prism-pojoaque.css' },
  {
    name: 'shades-of-purple',
    title: 'shades-of-purple',
    url: prismThemesBaseUrl + 'prism-shades-of-purple.css',
  },
  {
    name: 'solarized-dark-atom',
    title: 'solarized-dark-atom',
    url: prismThemesBaseUrl + 'prism-solarized-dark-atom.css',
  },
  { name: 'synthwave84', title: 'synthwave84', url: prismThemesBaseUrl + 'prism-synthwave84.css' },
  { name: 'vs', title: 'vs', url: prismThemesBaseUrl + 'prism-vs.css' },
  {
    name: 'vsc-dark-plus',
    title: 'vsc-dark-plus',
    url: prismThemesBaseUrl + 'prism-vsc-dark-plus.css',
  },
  { name: 'xonokai', title: 'xonokai', url: prismThemesBaseUrl + 'prism-xonokai.css' },
  { name: 'z-touchs', title: 'z-touchs', url: prismThemesBaseUrl + 'prism-z-touch.css' },
];
