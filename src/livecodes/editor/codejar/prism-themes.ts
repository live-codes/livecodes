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
  {
    name: 'catppuccin-latte',
    title: 'Catppuccin Latte',
    // https://github.com/catppuccin/prismjs/blob/main/themes/latte.css
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7Cgljb2xvcjogIzRjNGY2OTsKfQoKOm5vdChwcmUpID4gY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CgliYWNrZ3JvdW5kOiAjZTZlOWVmOwp9CgovKiBodHRwczovL3ByaXNtanMuY29tL3Rva2Vucy5odG1sICovCgoudG9rZW4ua2V5d29yZCB7Cgljb2xvcjogIzg4MzllZjsKfQoKLnRva2VuLmJ1aWx0aW4gewoJY29sb3I6ICNkMjBmMzk7Cn0KCi50b2tlbi5jbGFzcy1uYW1lIHsKCWNvbG9yOiAjZGY4ZTFkOwp9CgoudG9rZW4uZnVuY3Rpb24gewoJY29sb3I6ICMxZTY2ZjU7Cn0KCi50b2tlbi5ib29sZWFuLAoudG9rZW4ubnVtYmVyIHsKCWNvbG9yOiAjZmU2NDBiOwp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciB7Cgljb2xvcjogIzQwYTAyYjsKfQoKLnRva2VuLnN5bWJvbCB7Cgljb2xvcjogI2RmOGUxZDsKfQoKLnRva2VuLnJlZ2V4IHsKCWNvbG9yOiAjZWE3NmNiOwp9CgoudG9rZW4udXJsIHsKCWNvbG9yOiAjNDBhMDJiOwp9CgoudG9rZW4ub3BlcmF0b3IgewoJY29sb3I6ICMwNGE1ZTU7Cn0KCi50b2tlbi52YXJpYWJsZSB7Cgljb2xvcjogIzRjNGY2OTsKfQoKLnRva2VuLmNvbnN0YW50IHsKCWNvbG9yOiAjZmU2NDBiOwp9CgoudG9rZW4ucHJvcGVydHkgewoJY29sb3I6ICMxZTY2ZjU7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7Cgljb2xvcjogIzdjN2Y5MzsKfQoKLnRva2VuLmltcG9ydGFudCB7Cgljb2xvcjogIzg4MzllZjsKfQoKLnRva2VuLmNvbW1lbnQgewoJY29sb3I6ICM3YzdmOTM7Cn0KCi50b2tlbi50YWcgewoJY29sb3I6ICMxZTY2ZjU7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewoJY29sb3I6ICNkZjhlMWQ7Cn0KCi50b2tlbi5hdHRyLXZhbHVlIHsKCWNvbG9yOiAjNDBhMDJiOwp9CgoudG9rZW4ubmFtZXNwYWNlIHsKCWNvbG9yOiAjZGY4ZTFkOwp9CgoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSB7Cgljb2xvcjogIzg4MzllZjsKfQoKLnRva2VuLmNkYXRhIHsKCWNvbG9yOiAjMTc5Mjk5Owp9CgoudG9rZW4uZW50aXR5IHsKCWNvbG9yOiAjZDIwZjM5Owp9CgoudG9rZW4uYXRydWxlIHsKCWNvbG9yOiAjODgzOWVmOwp9CgoudG9rZW4uc2VsZWN0b3IgewoJY29sb3I6ICMxZTY2ZjU7Cn0KCi8qIERpZmYgKi8KCi50b2tlbi5kZWxldGVkIHsKCWNvbG9yOiAjZDIwZjM5Owp9CgoudG9rZW4uaW5zZXJ0ZWQgewoJY29sb3I6ICM0MGEwMmIKfQoKLyogT3RoZXIgKi8KCi50b2tlbi5pbXBvcnRhbnQsCi50b2tlbi5ib2xkIHsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9Ci50b2tlbi5pdGFsaWMgewoJZm9udC1zdHlsZTogaXRhbGljOwp9Cg==',
  },
  {
    name: 'catppuccin-frappe',
    title: 'Catppuccin Frappe',
    // https://github.com/catppuccin/prismjs/blob/main/themes/frappe.css
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7Cgljb2xvcjogI2M2ZDBmNTsKfQoKOm5vdChwcmUpID4gY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CgliYWNrZ3JvdW5kOiAjMjkyYzNjOwp9CgovKiBodHRwczovL3ByaXNtanMuY29tL3Rva2Vucy5odG1sICovCgoudG9rZW4ua2V5d29yZCB7Cgljb2xvcjogI2NhOWVlNjsKfQoKLnRva2VuLmJ1aWx0aW4gewoJY29sb3I6ICNlNzgyODQ7Cn0KCi50b2tlbi5jbGFzcy1uYW1lIHsKCWNvbG9yOiAjZTVjODkwOwp9CgoudG9rZW4uZnVuY3Rpb24gewoJY29sb3I6ICM4Y2FhZWU7Cn0KCi50b2tlbi5ib29sZWFuLAoudG9rZW4ubnVtYmVyIHsKCWNvbG9yOiAjZWY5Zjc2Owp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciB7Cgljb2xvcjogI2E2ZDE4OTsKfQoKLnRva2VuLnN5bWJvbCB7Cgljb2xvcjogI2U1Yzg5MDsKfQoKLnRva2VuLnJlZ2V4IHsKCWNvbG9yOiAjZjRiOGU0Owp9CgoudG9rZW4udXJsIHsKCWNvbG9yOiAjYTZkMTg5Owp9CgoudG9rZW4ub3BlcmF0b3IgewoJY29sb3I6ICM5OWQxZGI7Cn0KCi50b2tlbi52YXJpYWJsZSB7Cgljb2xvcjogI2M2ZDBmNTsKfQoKLnRva2VuLmNvbnN0YW50IHsKCWNvbG9yOiAjZWY5Zjc2Owp9CgoudG9rZW4ucHJvcGVydHkgewoJY29sb3I6ICM4Y2FhZWU7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7Cgljb2xvcjogIzk0OWNiYjsKfQoKLnRva2VuLmltcG9ydGFudCB7Cgljb2xvcjogI2NhOWVlNjsKfQoKLnRva2VuLmNvbW1lbnQgewoJY29sb3I6ICM5NDljYmI7Cn0KCi50b2tlbi50YWcgewoJY29sb3I6ICM4Y2FhZWU7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewoJY29sb3I6ICNlNWM4OTA7Cn0KCi50b2tlbi5hdHRyLXZhbHVlIHsKCWNvbG9yOiAjYTZkMTg5Owp9CgoudG9rZW4ubmFtZXNwYWNlIHsKCWNvbG9yOiAjZTVjODkwOwp9CgoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSB7Cgljb2xvcjogI2NhOWVlNjsKfQoKLnRva2VuLmNkYXRhIHsKCWNvbG9yOiAjODFjOGJlOwp9CgoudG9rZW4uZW50aXR5IHsKCWNvbG9yOiAjZTc4Mjg0Owp9CgoudG9rZW4uYXRydWxlIHsKCWNvbG9yOiAjY2E5ZWU2Owp9CgoudG9rZW4uc2VsZWN0b3IgewoJY29sb3I6ICM4Y2FhZWU7Cn0KCi8qIERpZmYgKi8KCi50b2tlbi5kZWxldGVkIHsKCWNvbG9yOiAjZTc4Mjg0Owp9CgoudG9rZW4uaW5zZXJ0ZWQgewoJY29sb3I6ICNhNmQxODkKfQoKLyogT3RoZXIgKi8KCi50b2tlbi5pbXBvcnRhbnQsCi50b2tlbi5ib2xkIHsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9Ci50b2tlbi5pdGFsaWMgewoJZm9udC1zdHlsZTogaXRhbGljOwp9Cg==',
  },
  {
    name: 'catppuccin-macchiato',
    title: 'Catppuccin Macchiato',
    // https://github.com/catppuccin/prismjs/blob/main/themes/macchiato.css
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7Cgljb2xvcjogI2NhZDNmNTsKfQoKOm5vdChwcmUpID4gY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CgliYWNrZ3JvdW5kOiAjMWUyMDMwOwp9CgovKiBodHRwczovL3ByaXNtanMuY29tL3Rva2Vucy5odG1sICovCgoudG9rZW4ua2V5d29yZCB7Cgljb2xvcjogI2M2YTBmNjsKfQoKLnRva2VuLmJ1aWx0aW4gewoJY29sb3I6ICNlZDg3OTY7Cn0KCi50b2tlbi5jbGFzcy1uYW1lIHsKCWNvbG9yOiAjZWVkNDlmOwp9CgoudG9rZW4uZnVuY3Rpb24gewoJY29sb3I6ICM4YWFkZjQ7Cn0KCi50b2tlbi5ib29sZWFuLAoudG9rZW4ubnVtYmVyIHsKCWNvbG9yOiAjZjVhOTdmOwp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciB7Cgljb2xvcjogI2E2ZGE5NTsKfQoKLnRva2VuLnN5bWJvbCB7Cgljb2xvcjogI2VlZDQ5ZjsKfQoKLnRva2VuLnJlZ2V4IHsKCWNvbG9yOiAjZjViZGU2Owp9CgoudG9rZW4udXJsIHsKCWNvbG9yOiAjYTZkYTk1Owp9CgoudG9rZW4ub3BlcmF0b3IgewoJY29sb3I6ICM5MWQ3ZTM7Cn0KCi50b2tlbi52YXJpYWJsZSB7Cgljb2xvcjogI2NhZDNmNTsKfQoKLnRva2VuLmNvbnN0YW50IHsKCWNvbG9yOiAjZjVhOTdmOwp9CgoudG9rZW4ucHJvcGVydHkgewoJY29sb3I6ICM4YWFkZjQ7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7Cgljb2xvcjogIzkzOWFiNzsKfQoKLnRva2VuLmltcG9ydGFudCB7Cgljb2xvcjogI2M2YTBmNjsKfQoKLnRva2VuLmNvbW1lbnQgewoJY29sb3I6ICM5MzlhYjc7Cn0KCi50b2tlbi50YWcgewoJY29sb3I6ICM4YWFkZjQ7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewoJY29sb3I6ICNlZWQ0OWY7Cn0KCi50b2tlbi5hdHRyLXZhbHVlIHsKCWNvbG9yOiAjYTZkYTk1Owp9CgoudG9rZW4ubmFtZXNwYWNlIHsKCWNvbG9yOiAjZWVkNDlmOwp9CgoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSB7Cgljb2xvcjogI2M2YTBmNjsKfQoKLnRva2VuLmNkYXRhIHsKCWNvbG9yOiAjOGJkNWNhOwp9CgoudG9rZW4uZW50aXR5IHsKCWNvbG9yOiAjZWQ4Nzk2Owp9CgoudG9rZW4uYXRydWxlIHsKCWNvbG9yOiAjYzZhMGY2Owp9CgoudG9rZW4uc2VsZWN0b3IgewoJY29sb3I6ICM4YWFkZjQ7Cn0KCi8qIERpZmYgKi8KCi50b2tlbi5kZWxldGVkIHsKCWNvbG9yOiAjZWQ4Nzk2Owp9CgoudG9rZW4uaW5zZXJ0ZWQgewoJY29sb3I6ICNhNmRhOTUKfQoKLyogT3RoZXIgKi8KCi50b2tlbi5pbXBvcnRhbnQsCi50b2tlbi5ib2xkIHsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9Ci50b2tlbi5pdGFsaWMgewoJZm9udC1zdHlsZTogaXRhbGljOwp9Cg==',
  },
  {
    name: 'catppuccin-mocha',
    title: 'Catppuccin Mocha',
    // https://github.com/catppuccin/prismjs/blob/main/themes/mocha.css
    url: 'data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7Cgljb2xvcjogI2NkZDZmNDsKfQoKOm5vdChwcmUpID4gY29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLApwcmVbY2xhc3MqPSJsYW5ndWFnZS0iXSB7CgliYWNrZ3JvdW5kOiAjMTgxODI1Owp9CgovKiBodHRwczovL3ByaXNtanMuY29tL3Rva2Vucy5odG1sICovCgoudG9rZW4ua2V5d29yZCB7Cgljb2xvcjogI2NiYTZmNzsKfQoKLnRva2VuLmJ1aWx0aW4gewoJY29sb3I6ICNmMzhiYTg7Cn0KCi50b2tlbi5jbGFzcy1uYW1lIHsKCWNvbG9yOiAjZjllMmFmOwp9CgoudG9rZW4uZnVuY3Rpb24gewoJY29sb3I6ICM4OWI0ZmE7Cn0KCi50b2tlbi5ib29sZWFuLAoudG9rZW4ubnVtYmVyIHsKCWNvbG9yOiAjZmFiMzg3Owp9CgoudG9rZW4uc3RyaW5nLAoudG9rZW4uY2hhciB7Cgljb2xvcjogI2E2ZTNhMTsKfQoKLnRva2VuLnN5bWJvbCB7Cgljb2xvcjogI2Y5ZTJhZjsKfQoKLnRva2VuLnJlZ2V4IHsKCWNvbG9yOiAjZjVjMmU3Owp9CgoudG9rZW4udXJsIHsKCWNvbG9yOiAjYTZlM2ExOwp9CgoudG9rZW4ub3BlcmF0b3IgewoJY29sb3I6ICM4OWRjZWI7Cn0KCi50b2tlbi52YXJpYWJsZSB7Cgljb2xvcjogI2NkZDZmNDsKfQoKLnRva2VuLmNvbnN0YW50IHsKCWNvbG9yOiAjZmFiMzg3Owp9CgoudG9rZW4ucHJvcGVydHkgewoJY29sb3I6ICM4OWI0ZmE7Cn0KCi50b2tlbi5wdW5jdHVhdGlvbiB7Cgljb2xvcjogIzkzOTliMjsKfQoKLnRva2VuLmltcG9ydGFudCB7Cgljb2xvcjogI2NiYTZmNzsKfQoKLnRva2VuLmNvbW1lbnQgewoJY29sb3I6ICM5Mzk5YjI7Cn0KCi50b2tlbi50YWcgewoJY29sb3I6ICM4OWI0ZmE7Cn0KCi50b2tlbi5hdHRyLW5hbWUgewoJY29sb3I6ICNmOWUyYWY7Cn0KCi50b2tlbi5hdHRyLXZhbHVlIHsKCWNvbG9yOiAjYTZlM2ExOwp9CgoudG9rZW4ubmFtZXNwYWNlIHsKCWNvbG9yOiAjZjllMmFmOwp9CgoudG9rZW4ucHJvbG9nLAoudG9rZW4uZG9jdHlwZSB7Cgljb2xvcjogI2NiYTZmNzsKfQoKLnRva2VuLmNkYXRhIHsKCWNvbG9yOiAjOTRlMmQ1Owp9CgoudG9rZW4uZW50aXR5IHsKCWNvbG9yOiAjZjM4YmE4Owp9CgoudG9rZW4uYXRydWxlIHsKCWNvbG9yOiAjY2JhNmY3Owp9CgoudG9rZW4uc2VsZWN0b3IgewoJY29sb3I6ICM4OWI0ZmE7Cn0KCi8qIERpZmYgKi8KCi50b2tlbi5kZWxldGVkIHsKCWNvbG9yOiAjZjM4YmE4Owp9CgoudG9rZW4uaW5zZXJ0ZWQgewoJY29sb3I6ICNhNmUzYTEKfQoKLyogT3RoZXIgKi8KCi50b2tlbi5pbXBvcnRhbnQsCi50b2tlbi5ib2xkIHsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9Ci50b2tlbi5pdGFsaWMgewoJZm9udC1zdHlsZTogaXRhbGljOwp9Cg==',
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
