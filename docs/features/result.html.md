# Result Page

The output of a LiveCodes project is a single HTML page. This includes the (compiled) code from editors (markup + style + script) and [external resources](./external-resources.html.md) (CSS + JS), in addition to customizations specified in [custom settings](../advanced/custom-settings.html.md).

This page is loaded in a [sandboxed iframe](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) with a unique origin to enforce [security](./security.html.md). The page code is sent to the iframe in the browser (no code is sent to the server).

## Result page structure

This is the pseudo-code for the structure of the result page (inspired by [CodePen docs](https://blog.codepen.io/documentation/preview-template/)).

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html { Config.htmlAttrs }*>
  <head>
    <title>{ Config.title }*</title>
    <meta name="title" content="{ Config.title }*" />
    <meta name="description" content="{ Config.description }*" />

    { Config.head }*

    { CSS preset }**

    { External CSS }**

    { Editor CSS }

    { Language(s) run-time CSS }***

    { Language(s) run-time JS }***

    { Import map }****

  </head>
  <body>

    { Editor HTML }

    { External JS }**

    { Editor JS }

    { Spacing script (if enabled) }*****

    { Test scripts (if enabled) }******

  </body>
</html>
```

\* See [Configuration Object](../configuration/configuration-object.html.md).

\*\* See [External Resources](./external-resources.html.md).

\*\*\* Although most languages are compiled and then the compiled code is used, some languages require run-time scripts or styles to run in the result page.

\*\*\*\* See [Module Resolution](./module-resolution.html.md).

\*\*\*\*\* See [Show Sapcings](#show-spacings).

\*\*\*\*\*\* See [Tests](./tests.html.md).

## Result page zoom

The zoom button in the [tools pane](./tools-pane.html.md) below result page, allows you to toggle result page zoom (1x/0.5x/0.25x).

![Result page zoom](../../static/img/screenshots/zoom.jpg)

## Open in new window

From the [tools pane](./tools-pane.html.md), the result page can be viewed in a separate window.

![Open in new window](../../static/img/screenshots/new-window.jpg)

:::caution

Please note that the URL of the result page shown in the new window is a [temporary URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#parameters), for local preview. Sharing this URL will not work.

If you need to share a project, use the [Share screen](./share.html.md). While, if you need to share the result page use the `result` [display mode](./display-modes.html.md) or the [broadcast](./broadcast.html.md) feature.

:::

## Show Spacings

The spacing between elements on the result page can be measured by adding [Spacing.js](https://spacingjs.com/) to the result page.

![Show Spacings](../../static/img/screenshots/spacing.jpg)

1. Enable `Show Spacing` setting in the Settings menu.
2. Move your cursor to an element and press Alt on Windows, or Option on a Mac.
3. Move your cursor to another element, the measurement results will be there.

:::note

`Show Spacing` is only available when viewing the result page in the app. It is not added to the result page for example when [exported](./export.html.md) or [deployed](./deploy.html.md).

:::

## Scroll Position

By default, the result page scroll position is maintained after reloads.

To disable this behavior, set the [query param](../configuration/query-params.html.md) `scrollPosition` to `false`.

Example:

    https://livecodes.io?scrollPosition=false