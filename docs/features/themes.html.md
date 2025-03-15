# Themes

import ThemeDemo from '../../src/components/ThemeDemo.tsx';

LiveCodes comes with dark and light themes. In addition, a theme color can be set to change the app color.

## Theme

Dark/Light theme can be set in:

- UI, either:

  - Dark/Light theme switch in toolbar
  - Settings menu → Dark theme switch

- [Query params](../configuration/query-params.html.md): `?theme=dark` or `?theme=light`.
  e.g. https://livecodes.io/?theme=light

- [Configuration object](../configuration/configuration-object.html.md): [`theme`](../configuration/configuration-object.html.md)#theme) property.

![LiveCodes dark theme](../../static/img/screenshots/themes-1.jpg)

<div className="caption">LiveCodes dark theme</div>

![LiveCodes light theme](../../static/img/screenshots/themes-2.jpg)

<div className="caption">LiveCodes light theme</div>

## Theme Color

Similarly, a theme color can be set in:

- UI: Settings menu → Color

- [Query params](../configuration/query-params.html.md): `?themeColor={color}`.
  e.g. https://livecodes.io/?themeColor=lightblue

- [Configuration object](../configuration/configuration-object.html.md): [`themeColor`](../configuration/configuration-object.html.md)#themecolor) property.

![LiveCodes alternate theme color](../../static/img/screenshots/themes-3.jpg)

<div className="caption">Change theme color from UI</div>

![LiveCodes custom theme color](../../static/img/screenshots/themes-4.jpg)

<div className="caption">Custom theme color</div>

## Demo

<ThemeDemo></ThemeDemo>

:::info Note
Please note that editor themes can be set in the [editor settings](./editor-settings.html.md) or using the [`editorTheme`](../configuration/configuration-object.html.md)#editortheme) configuration option.