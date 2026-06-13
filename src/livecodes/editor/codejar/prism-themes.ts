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
    url: 'data:text/css;charset=UTF-8;base64,cHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sDQpjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBjb2xvcjogI2RkZTZmMDsNCiAgZm9udC1zaXplOiAxM3B4Ow0KICB0ZXh0LXNoYWRvdzogbm9uZTsgLyogUHJldmVudHMgY2FyZXQgZGlzdG9ydGlvbiAqLw0KICBmb250LWZhbWlseTogTWVubG8sIE1vbmFjbywgQ29uc29sYXMsICJBbmRhbGUgTW9ubyIsICJVYnVudHUgTW9ubyIsICJDb3VyaWVyIE5ldyIsIG1vbm9zcGFjZTsNCiAgZGlyZWN0aW9uOiBsdHI7DQogIHRleHQtYWxpZ246IGxlZnQ7DQogIHdoaXRlLXNwYWNlOiBwcmU7DQogIHdvcmQtc3BhY2luZzogbm9ybWFsOw0KICB3b3JkLWJyZWFrOiBub3JtYWw7DQogIGxpbmUtaGVpZ2h0OiAxLjU7DQogIHRhYi1zaXplOiA0Ow0KICBoeXBoZW5zOiBub25lOw0KICBjYXJldC1jb2xvcjogIzAwYzhmZjsgLyogRm9yY2VzIGNvcnJlY3QgY3Vyc29yIGNvbG9yICovDQp9DQoNCnByZVtjbGFzcyo9Imxhbmd1YWdlLSJdOjpzZWxlY3Rpb24sDQpjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl06OnNlbGVjdGlvbiwNCnByZVtjbGFzcyo9Imxhbmd1YWdlLSJdICo6OnNlbGVjdGlvbiwNCmNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSAqOjpzZWxlY3Rpb24gew0KICB0ZXh0LXNoYWRvdzogbm9uZTsNCiAgYmFja2dyb3VuZDogcmdiYSgwLCAyMDAsIDI1NSwgMC4yNSk7IC8qICMwMGM4ZmYzMyAqLw0KfQ0KDQpAbWVkaWEgcHJpbnQgew0KICBwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSwNCiAgY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdIHsNCiAgICB0ZXh0LXNoYWRvdzogbm9uZTsNCiAgfQ0KfQ0KDQpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7DQogIHBhZGRpbmc6IDFlbTsNCiAgbWFyZ2luOiAuNWVtIDA7DQogIG92ZXJmbG93OiBhdXRvOw0KICBiYWNrZ3JvdW5kOiAjMTgxYzIwOw0KfQ0KDQo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBwYWRkaW5nOiAuMWVtIC4zZW07DQogIGJvcmRlci1yYWRpdXM6IC4zZW07DQogIGJhY2tncm91bmQ6ICMxODFjMjA7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCiogVG9rZW5zDQoqLw0KLm5hbWVzcGFjZSB7DQogIG9wYWNpdHk6IC43Ow0KfQ0KDQoudG9rZW4uY29tbWVudCwNCi50b2tlbi5wcm9sb2csDQoudG9rZW4uZG9jdHlwZSwNCi50b2tlbi5jZGF0YSB7DQogIGNvbG9yOiAjNTU2MDcwOw0KICBmb250LXN0eWxlOiBpdGFsaWM7DQp9DQoNCi50b2tlbi5wdW5jdHVhdGlvbiB7DQogIGNvbG9yOiAjOWNjMGQ0Ow0KfQ0KDQoudG9rZW4udGFnIC50b2tlbi5wdW5jdHVhdGlvbiB7DQogIGNvbG9yOiAjNTU2MDcwOw0KfQ0KDQoudG9rZW4ua2V5d29yZCB7DQogIGNvbG9yOiAjMDBjOGZmOw0KfQ0KDQoudG9rZW4ub3BlcmF0b3Igew0KICBjb2xvcjogIzdmZDlmZjsNCn0NCg0KLnRva2VuLnN0cmluZywNCi50b2tlbi5jaGFyLA0KLnRva2VuLmF0dHItdmFsdWUsDQoudG9rZW4uaW5zZXJ0ZWQgew0KICBjb2xvcjogIzAwZTVjODsNCn0NCg0KLnRva2VuLnJlZ2V4IHsNCiAgY29sb3I6ICM0ZWU4ZDQ7DQp9DQoNCi50b2tlbi5udW1iZXIsDQoudG9rZW4uY29uc3RhbnQsDQoudG9rZW4uc3ltYm9sIHsNCiAgY29sb3I6ICNmZmI4NmM7DQp9DQoNCi50b2tlbi5ib29sZWFuIHsNCiAgY29sb3I6ICNmZjhjNjY7DQp9DQoNCi50b2tlbi5mdW5jdGlvbiB7DQogIGNvbG9yOiAjNjlkNmZmOw0KfQ0KDQoudG9rZW4uY2xhc3MtbmFtZSwNCi50b2tlbi50eXBlLA0KLnRva2VuLm5hbWVzcGFjZSB7DQogIGNvbG9yOiAjNWZlMGM4Ow0KfQ0KDQoudG9rZW4udGFnIHsNCiAgY29sb3I6ICMwMGM4ZmY7DQp9DQoNCi50b2tlbi5hdHRyLW5hbWUgew0KICBjb2xvcjogI2M5YjhmZjsNCn0NCg0KLnRva2VuLnZhcmlhYmxlIHsNCiAgY29sb3I6ICNkZGU2ZjA7DQp9DQoNCi50b2tlbi5ib2xkIHsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi50b2tlbi5pdGFsaWMgew0KICBmb250LXN0eWxlOiBpdGFsaWM7DQp9DQoNCi50b2tlbi5pbXBvcnRhbnQsDQoudG9rZW4uZGVsZXRlZCB7DQogIGNvbG9yOiAjZmY0ZDRkOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqIExhbmd1YWdlIFNwZWNpZmljIE92ZXJyaWRlcw0KKi8NCi5sYW5ndWFnZS1qc29uIC50b2tlbi5wcm9wZXJ0eSwNCi5sYW5ndWFnZS1jc3MgLnRva2VuLnByb3BlcnR5IHsNCiAgY29sb3I6ICM2OWQ2ZmY7DQp9DQoNCi5sYW5ndWFnZS1jc3MgLnRva2VuLm51bWJlciwNCi5sYW5ndWFnZS1jc3MgLnRva2VuLnVuaXQgew0KICBjb2xvcjogI2ZmYjg2YzsNCn0NCg0KcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIHotaW5kZXg6IDE7DQp9DQoNCi5saW5lLWhpZ2hsaWdodC5saW5lLWhpZ2hsaWdodCB7DQogIGJhY2tncm91bmQ6IHJnYmEoMTMsIDI0LCAzNywgMC43KTsNCiAgYm94LXNoYWRvdzogaW5zZXQgNXB4IDAgMCAjMDBjOGZmOw0KICB6LWluZGV4OiAwOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqIExpbmUgbnVtYmVycw0KKi8NCi5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHsNCiAgICBib3JkZXItcmlnaHQ6IG5vbmU7DQp9DQoNCi5saW5lLW51bWJlcnMtcm93cyA+IHNwYW46YmVmb3JlIHsNCiAgICBjb2xvcjogIzJlM2E0YTsNCn0NCg==',
  },
  {
    name: 'livecodes-light',
    title: 'LiveCodes Light',
    url: 'data:text/css;charset=UTF-8;base64,cHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0sDQpjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBjb2xvcjogIzFjMjczMzsNCiAgZm9udC1zaXplOiAxM3B4Ow0KICB0ZXh0LXNoYWRvdzogbm9uZTsgLyogUHJldmVudHMgY2FyZXQgZGlzdG9ydGlvbiAqLw0KICBmb250LWZhbWlseTogTWVubG8sIE1vbmFjbywgQ29uc29sYXMsICJBbmRhbGUgTW9ubyIsICJVYnVudHUgTW9ubyIsICJDb3VyaWVyIE5ldyIsIG1vbm9zcGFjZTsNCiAgZGlyZWN0aW9uOiBsdHI7DQogIHRleHQtYWxpZ246IGxlZnQ7DQogIHdoaXRlLXNwYWNlOiBwcmU7DQogIHdvcmQtc3BhY2luZzogbm9ybWFsOw0KICB3b3JkLWJyZWFrOiBub3JtYWw7DQogIGxpbmUtaGVpZ2h0OiAxLjU7DQogIHRhYi1zaXplOiA0Ow0KICBoeXBoZW5zOiBub25lOw0KICBjYXJldC1jb2xvcjogIzAwNzNhODsgLyogRm9yY2VzIGNvcnJlY3QgY3Vyc29yIGNvbG9yICovDQp9DQoNCnByZVtjbGFzcyo9Imxhbmd1YWdlLSJdOjpzZWxlY3Rpb24sDQpjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl06OnNlbGVjdGlvbiwNCnByZVtjbGFzcyo9Imxhbmd1YWdlLSJdICo6OnNlbGVjdGlvbiwNCmNvZGVbY2xhc3MqPSJsYW5ndWFnZS0iXSAqOjpzZWxlY3Rpb24gew0KICB0ZXh0LXNoYWRvdzogbm9uZTsNCiAgYmFja2dyb3VuZDogcmdiYSgwLCAxMTUsIDE2OCwgMC4yNSk7IC8qICMwMDczYTgzMyAqLw0KfQ0KDQpAbWVkaWEgcHJpbnQgew0KICBwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSwNCiAgY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdIHsNCiAgICB0ZXh0LXNoYWRvdzogbm9uZTsNCiAgfQ0KfQ0KDQpwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7DQogIHBhZGRpbmc6IDFlbTsNCiAgbWFyZ2luOiAuNWVtIDA7DQogIG92ZXJmbG93OiBhdXRvOw0KICBiYWNrZ3JvdW5kOiAjZmZmZmZmOw0KfQ0KDQo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBwYWRkaW5nOiAuMWVtIC4zZW07DQogIGJvcmRlci1yYWRpdXM6IC4zZW07DQogIGJhY2tncm91bmQ6ICNmZmZmZmY7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCiogVG9rZW5zDQoqLw0KLm5hbWVzcGFjZSB7DQogIG9wYWNpdHk6IC43Ow0KfQ0KDQoudG9rZW4uY29tbWVudCwNCi50b2tlbi5wcm9sb2csDQoudG9rZW4uZG9jdHlwZSwNCi50b2tlbi5jZGF0YSB7DQogIGNvbG9yOiAjODY5M2EzOw0KICBmb250LXN0eWxlOiBpdGFsaWM7DQp9DQoNCi50b2tlbi5wdW5jdHVhdGlvbiB7DQogIGNvbG9yOiAjNGE1ZDZlOw0KfQ0KDQoudG9rZW4udGFnIC50b2tlbi5wdW5jdHVhdGlvbiB7DQogIGNvbG9yOiAjODY5M2EzOw0KfQ0KDQoudG9rZW4ua2V5d29yZCB7DQogIGNvbG9yOiAjMDA3M2E4Ow0KfQ0KDQoudG9rZW4ub3BlcmF0b3Igew0KICBjb2xvcjogIzAyODhjNDsNCn0NCg0KLnRva2VuLnN0cmluZywNCi50b2tlbi5jaGFyLA0KLnRva2VuLmF0dHItdmFsdWUsDQoudG9rZW4uaW5zZXJ0ZWQgew0KICBjb2xvcjogIzAwODU3MzsNCn0NCg0KLnRva2VuLnJlZ2V4IHsNCiAgY29sb3I6ICMwMDk5N2Y7DQp9DQoNCi50b2tlbi5udW1iZXIsDQoudG9rZW4uY29uc3RhbnQsDQoudG9rZW4uc3ltYm9sIHsNCiAgY29sb3I6ICNjMjVlMDA7DQp9DQoNCi50b2tlbi5ib29sZWFuIHsNCiAgY29sb3I6ICNjYzQ0MjI7DQp9DQoNCi50b2tlbi5mdW5jdGlvbiB7DQogIGNvbG9yOiAjMGE3YmJmOw0KfQ0KDQoudG9rZW4uY2xhc3MtbmFtZSwNCi50b2tlbi50eXBlLA0KLnRva2VuLm5hbWVzcGFjZSB7DQogIGNvbG9yOiAjMDA4OTdiOw0KfQ0KDQoudG9rZW4udGFnIHsNCiAgY29sb3I6ICMwMDczYTg7DQp9DQoNCi50b2tlbi5hdHRyLW5hbWUgew0KICBjb2xvcjogIzZiNGZjNDsNCn0NCg0KLnRva2VuLnZhcmlhYmxlIHsNCiAgY29sb3I6ICMxYzI3MzM7DQp9DQoNCi50b2tlbi5ib2xkIHsNCiAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoNCi50b2tlbi5pdGFsaWMgew0KICBmb250LXN0eWxlOiBpdGFsaWM7DQp9DQoNCi50b2tlbi5pbXBvcnRhbnQsDQoudG9rZW4uZGVsZXRlZCB7DQogIGNvbG9yOiAjZDExNDE0Ow0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqIExhbmd1YWdlIFNwZWNpZmljIE92ZXJyaWRlcw0KKi8NCi5sYW5ndWFnZS1qc29uIC50b2tlbi5wcm9wZXJ0eSwNCi5sYW5ndWFnZS1jc3MgLnRva2VuLnByb3BlcnR5IHsNCiAgY29sb3I6ICMwYTdiYmY7DQp9DQoNCi5sYW5ndWFnZS1jc3MgLnRva2VuLm51bWJlciwNCi5sYW5ndWFnZS1jc3MgLnRva2VuLnVuaXQgew0KICBjb2xvcjogI2MyNWUwMDsNCn0NCg0KcHJlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gPiBjb2RlW2NsYXNzKj0ibGFuZ3VhZ2UtIl0gew0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIHotaW5kZXg6IDE7DQp9DQoNCi5saW5lLWhpZ2hsaWdodC5saW5lLWhpZ2hsaWdodCB7DQogIGJhY2tncm91bmQ6ICNmMmY3ZmI7DQogIGJveC1zaGFkb3c6IGluc2V0IDVweCAwIDAgIzAwNzNhODsNCiAgei1pbmRleDogMDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiBMaW5lIG51bWJlcnMNCiovDQoubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7DQogICAgYm9yZGVyLXJpZ2h0OiBub25lOw0KfQ0KDQoubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7DQogICAgY29sb3I6ICNiMGJjY2I7DQp9DQo=',
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
