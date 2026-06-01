import type { CodejarTheme } from '../../models';
import {
  prismOfficialThemesBaseUrl,
  prismThemeNordUrl,
  prismThemesBaseUrl,
  prismThemesLaserWaveUrl,
  vendorsBaseUrl,
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
  {
    name: 'catppuccin-latte',
    title: 'Catppuccin Latte',
    url: vendorsBaseUrl + 'catppuccin/prism/latte.css',
  },
  {
    name: 'catppuccin-frappe',
    title: 'Catppuccin Frappe',
    url: vendorsBaseUrl + 'catppuccin/prism/frappe.css',
  },
  {
    name: 'catppuccin-macchiato',
    title: 'Catppuccin Macchiato',
    url: vendorsBaseUrl + 'catppuccin/prism/macchiato.css',
  },
  {
    name: 'catppuccin-mocha',
    title: 'Catppuccin Mocha',
    url: vendorsBaseUrl + 'catppuccin/prism/mocha.css',
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
  {
    name: 'livecodes-dark',
    title: 'LiveCodes Dark',
    url: 'data:text/css;charset=UTF-8;base64,cHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sCmNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CiAgY29sb3I6ICNkZGU2ZjA7CiAgZm9udC1zaXplOiAxM3B4OwogIHRleHQtc2hhZG93OiBub25lOyAvKiBQcmV2ZW50cyBjYXJldCBkaXN0b3J0aW9uICovCiAgZm9udC1mYW1pbHk6IE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAiQW5kYWxlIE1vbm8iLCAiVWJ1bnR1IE1vbm8iLCAiQ291cmllciBOZXciLCBtb25vc3BhY2U7CiAgZGlyZWN0aW9uOiBsdHI7CiAgdGV4dC1hbGlnbjogbGVmdDsKICB3aGl0ZS1zcGFjZTogcHJlOwogIHdvcmQtc3BhY2luZzogbm9ybWFsOwogIHdvcmQtYnJlYWs6IG5vcm1hbDsKICBsaW5lLWhlaWdodDogMS41OwogIHRhYi1zaXplOiA0OwogIGh5cGhlbnM6IG5vbmU7CiAgY2FyZXQtY29sb3I6ICMwMGM4ZmY7IC8qIEZvcmNlcyBjb3JyZWN0IGN1cnNvciBjb2xvciAqLwp9CgpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXTo6c2VsZWN0aW9uLApjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl06OnNlbGVjdGlvbiwKcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gKjo6c2VsZWN0aW9uLApjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gKjo6c2VsZWN0aW9uIHsKICB0ZXh0LXNoYWRvdzogbm9uZTsKICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwMCwgMjU1LCAwLjI1KTsgLyogIzAwYzhmZjMzICovCn0KCkBtZWRpYSBwcmludCB7CiAgcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sCiAgY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdIHsKICAgIHRleHQtc2hhZG93OiBub25lOwogIH0KfQoKcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gewogIHBhZGRpbmc6IDFlbTsKICBtYXJnaW46IC41ZW0gMDsKICBvdmVyZmxvdzogYXV0bzsKICBiYWNrZ3JvdW5kOiAjMTYxOTFkOwp9Cgo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gewogIHBhZGRpbmc6IC4xZW0gLjNlbTsKICBib3JkZXItcmFkaXVzOiAuM2VtOwogIGJhY2tncm91bmQ6ICMxNjE5MWQ7Cn0KCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioKKiBUb2tlbnMKKi8KLm5hbWVzcGFjZSB7CiAgb3BhY2l0eTogLjc7Cn0KCi50b2tlbi5jb21tZW50LAoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSwKLnRva2VuLmNkYXRhIHsKICBjb2xvcjogIzU1NjA3MDsKICBmb250LXN0eWxlOiBpdGFsaWM7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7CiAgY29sb3I6ICM5Y2MwZDQ7Cn0KCi50b2tlbi50YWcgLnRva2VuLnB1bmN0dWF0aW9uIHsKICBjb2xvcjogIzU1NjA3MDsKfQoKLnRva2VuLmtleXdvcmQgewogIGNvbG9yOiAjMDBjOGZmOwp9CgoudG9rZW4ub3BlcmF0b3IgewogIGNvbG9yOiAjN2ZkOWZmOwp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciwKLnRva2VuLmF0dHItdmFsdWUsCi50b2tlbi5pbnNlcnRlZCB7CiAgY29sb3I6ICMwMGU1Yzg7Cn0KCi50b2tlbi5yZWdleCB7CiAgY29sb3I6ICM0ZWU4ZDQ7Cn0KCi50b2tlbi5udW1iZXIsCi50b2tlbi5jb25zdGFudCwKLnRva2VuLnN5bWJvbCB7CiAgY29sb3I6ICNmZmI4NmM7Cn0KCi50b2tlbi5ib29sZWFuIHsKICBjb2xvcjogI2ZmOGM2NjsKfQoKLnRva2VuLmZ1bmN0aW9uIHsKICBjb2xvcjogIzY5ZDZmZjsKfQoKLnRva2VuLmNsYXNzLW5hbWUsCi50b2tlbi50eXBlLAoudG9rZW4ubmFtZXNwYWNlIHsKICBjb2xvcjogIzVmZTBjODsKfQoKLnRva2VuLnRhZyB7CiAgY29sb3I6ICMwMGM4ZmY7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewogIGNvbG9yOiAjYzliOGZmOwp9CgoudG9rZW4udmFyaWFibGUgewogIGNvbG9yOiAjZGRlNmYwOwp9CgoudG9rZW4uYm9sZCB7CiAgZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KCi50b2tlbi5pdGFsaWMgewogIGZvbnQtc3R5bGU6IGl0YWxpYzsKfQoKLnRva2VuLmltcG9ydGFudCwKLnRva2VuLmRlbGV0ZWQgewogIGNvbG9yOiAjZmY0ZDRkOwp9CgovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqCiogTGFuZ3VhZ2UgU3BlY2lmaWMgT3ZlcnJpZGVzCiovCi5sYW5ndWFnZS1qc29uIC50b2tlbi5wcm9wZXJ0eSwKLmxhbmd1YWdlLWNzcyAudG9rZW4ucHJvcGVydHkgewogIGNvbG9yOiAjNjlkNmZmOwp9CgoubGFuZ3VhZ2UtY3NzIC50b2tlbi5udW1iZXIsCi5sYW5ndWFnZS1jc3MgLnRva2VuLnVuaXQgewogIGNvbG9yOiAjZmZiODZjOwp9CgpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSA+IGNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIHotaW5kZXg6IDE7Cn0KCi5saW5lLWhpZ2hsaWdodC5saW5lLWhpZ2hsaWdodCB7CiAgYmFja2dyb3VuZDogcmdiYSgxMywgMjQsIDM3LCAwLjcpOwogIGJveC1zaGFkb3c6IGluc2V0IDVweCAwIDAgIzAwYzhmZjsKICB6LWluZGV4OiAwOwp9',
  },
  {
    name: 'livecodes-light',
    title: 'LiveCodes Light',
    url: 'data:text/css;charset=UTF-8;base64,cHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sCmNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CiAgY29sb3I6ICMxYzI3MzM7CiAgZm9udC1zaXplOiAxM3B4OwogIHRleHQtc2hhZG93OiBub25lOyAvKiBQcmV2ZW50cyBjYXJldCBkaXN0b3J0aW9uICovCiAgZm9udC1mYW1pbHk6IE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAiQW5kYWxlIE1vbm8iLCAiVWJ1bnR1IE1vbm8iLCAiQ291cmllciBOZXciLCBtb25vc3BhY2U7CiAgZGlyZWN0aW9uOiBsdHI7CiAgdGV4dC1hbGlnbjogbGVmdDsKICB3aGl0ZS1zcGFjZTogcHJlOwogIHdvcmQtc3BhY2luZzogbm9ybWFsOwogIHdvcmQtYnJlYWs6IG5vcm1hbDsKICBsaW5lLWhlaWdodDogMS41OwogIHRhYi1zaXplOiA0OwogIGh5cGhlbnM6IG5vbmU7CiAgY2FyZXQtY29sb3I6ICMwMDczYTg7IC8qIEZvcmNlcyBjb3JyZWN0IGN1cnNvciBjb2xvciAqLwp9CgpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXTo6c2VsZWN0aW9uLApjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl06OnNlbGVjdGlvbiwKcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gKjo6c2VsZWN0aW9uLApjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gKjo6c2VsZWN0aW9uIHsKICB0ZXh0LXNoYWRvdzogbm9uZTsKICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDExNSwgMTY4LCAwLjI1KTsgLyogIzAwNzNhODMzICovCn0KCkBtZWRpYSBwcmludCB7CiAgcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sCiAgY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdIHsKICAgIHRleHQtc2hhZG93OiBub25lOwogIH0KfQoKcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gewogIHBhZGRpbmc6IDFlbTsKICBtYXJnaW46IC41ZW0gMDsKICBvdmVyZmxvdzogYXV0bzsKICBiYWNrZ3JvdW5kOiAjZmZmZmZmOwp9Cgo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gewogIHBhZGRpbmc6IC4xZW0gLjNlbTsKICBib3JkZXItcmFkaXVzOiAuM2VtOwogIGJhY2tncm91bmQ6ICNmZmZmZmY7Cn0KCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioKKiBUb2tlbnMKKi8KLm5hbWVzcGFjZSB7CiAgb3BhY2l0eTogLjc7Cn0KCi50b2tlbi5jb21tZW50LAoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSwKLnRva2VuLmNkYXRhIHsKICBjb2xvcjogIzg2OTNhMzsKICBmb250LXN0eWxlOiBpdGFsaWM7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7CiAgY29sb3I6ICM0YTVkNmU7Cn0KCi50b2tlbi50YWcgLnRva2VuLnB1bmN0dWF0aW9uIHsKICBjb2xvcjogIzg2OTNhMzsKfQoKLnRva2VuLmtleXdvcmQgewogIGNvbG9yOiAjMDA3M2E4Owp9CgoudG9rZW4ub3BlcmF0b3IgewogIGNvbG9yOiAjMDI4OGM0Owp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciwKLnRva2VuLmF0dHItdmFsdWUsCi50b2tlbi5pbnNlcnRlZCB7CiAgY29sb3I6ICMwMDg1NzM7Cn0KCi50b2tlbi5yZWdleCB7CiAgY29sb3I6ICMwMDk5N2Y7Cn0KCi50b2tlbi5udW1iZXIsCi50b2tlbi5jb25zdGFudCwKLnRva2VuLnN5bWJvbCB7CiAgY29sb3I6ICNjMjVlMDA7Cn0KCi50b2tlbi5ib29sZWFuIHsKICBjb2xvcjogI2NjNDQyMjsKfQoKLnRva2VuLmZ1bmN0aW9uIHsKICBjb2xvcjogIzBhN2JiZjsKfQoKLnRva2VuLmNsYXNzLW5hbWUsCi50b2tlbi50eXBlLAoudG9rZW4ubmFtZXNwYWNlIHsKICBjb2xvcjogIzAwODk3YjsKfQoKLnRva2VuLnRhZyB7CiAgY29sb3I6ICMwMDczYTg7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewogIGNvbG9yOiAjNmI0ZmM0Owp9CgoudG9rZW4udmFyaWFibGUgewogIGNvbG9yOiAjMWMyNzMzOwp9CgoudG9rZW4uYm9sZCB7CiAgZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KCi50b2tlbi5pdGFsaWMgewogIGZvbnQtc3R5bGU6IGl0YWxpYzsKfQoKLnRva2VuLmltcG9ydGFudCwKLnRva2VuLmRlbGV0ZWQgewogIGNvbG9yOiAjZDExNDE0Owp9CgovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqCiogTGFuZ3VhZ2UgU3BlY2lmaWMgT3ZlcnJpZGVzCiovCi5sYW5ndWFnZS1qc29uIC50b2tlbi5wcm9wZXJ0eSwKLmxhbmd1YWdlLWNzcyAudG9rZW4ucHJvcGVydHkgewogIGNvbG9yOiAjMGE3YmJmOwp9CgoubGFuZ3VhZ2UtY3NzIC50b2tlbi5udW1iZXIsCi5sYW5ndWFnZS1jc3MgLnRva2VuLnVuaXQgewogIGNvbG9yOiAjYzI1ZTAwOwp9CgpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSA+IGNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIHotaW5kZXg6IDE7Cn0KCi5saW5lLWhpZ2hsaWdodC5saW5lLWhpZ2hsaWdodCB7CiAgYmFja2dyb3VuZDogI2YyZjdmYjsKICBib3gtc2hhZG93OiBpbnNldCA1cHggMCAwICMwMDczYTg7CiAgei1pbmRleDogMDsKfQ==',
  },
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
  { name: 'nord-2', title: 'Nord 2', url: prismThemeNordUrl },
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
