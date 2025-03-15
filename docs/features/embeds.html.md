# Embedded Playgrounds

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Overview

LiveCodes playgrounds can be embedded in any web page. The playground can be [prefilled with code](./code-prefill.html.md) in any supported language. This can be very useful in documentation websites, technical blogs, educational websites and others.

Demo:

<LiveCodes template="javascript"></LiveCodes>

The embedding web page can communicate with the playground using a powerful [SDK](../sdk/index.html.md) (e.g. edit/format code, watch for code changes, get the compiled code or result page HTML, run tests, change layout, ...etc).

## Create Embedded Playground

### App Embed Screen

In the [standalone app](../getting-started.html.md)#standalone-app), the Embed Screen can be accessed from Project menu → Embed.

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{ screen: 'embed' }} linkText="direct link" />

It shows a preview of the embedded playground, allows customizations of [embed options](../sdk/js-ts.html.md)#embed-options) and provides generated code that can be added to the web page that will embed the playground.

![LiveCodes embed](../../static/img/screenshots/embed-1.jpg)
![LiveCodes embed](../../static/img/screenshots/embed-2.jpg)
![LiveCodes embed](../../static/img/screenshots/embed-3.jpg)

:::info Note

Please note that the Embed Screen sends the project code to [LiveCodes share service](./share.html.md) to generate a short URL for usage in the embed code.

:::

The setting "Embed Type" allows selection from different variations of the generated code:

- Using the SDK from CDN.
- Using the SDK with a bundler (e.g. vite, parcel, webpack, etc).
- Using the React SDK.
- Using the Vue SDK.
- Using iframe and [query params](../configuration/query-params.html.md).
- Using HTML code that the SDK can use to [auto-prefill](./code-prefill.html.md)#auto-prefill-from-page-dom) the playground.

### SDK

The LiveCodes [SDK](../sdk/index.html.md) can be used to embed playgrounds, specify [embed](../sdk/js-ts.html.md)#embed-options) and [configuration](../configuration/index.html.md) options and allows communication with the embedded playground with many [SDK methods](../sdk/js-ts.html.md)#sdk-methods).

This method provides more control and allows advanced scenarios.

## Avoid Breaking Changes

To avoid breaking changes that would cause the embedded playgrounds to stop working as expected with later updates, follow these recommendations:

- Use a [permanent URL](./permanent-url.html.md) to a pinned version of the LiveCodes app for [`EmbedOptions.appUrl`](../sdk/js-ts.html.md)#appurl). The code generated in the Embed screen uses that by default.
- Specify the version of the SDK used. The code generated in the Embed screen also does that.
- For project code, [specify the versions](./module-resolution.html.md)#package-version) of the imported packages and [external resources](./external-resources.html.md). [Custom import maps](./module-resolution.html.md)#custom-module-resolution) can be set to control the module import behavior.

Check the [Permanent URL](./permanent-url.html.md) section for more details.

## Differences from Full App

Some of the features of the full standalone app are not available or shown by default in embedded playgrounds, either because of security reasons, being not useful when embedded or because of space limitations.

### Features Not Available

- All features that require saving/loading from browser storage:
  e.g. [projects](./projects.html.md), [assets](./assets.html.md), [code snippets](./snippets.html.md), [user settings](./user-settings.html.md), [default template/language](./default-template-language.html.md), [recover unsaved](./recover.html.md), [backup/restore](./backup-restore.html.md).
- All features that require authentication:
  e.g. [login/logout](./github-integration.html.md), [sync](./sync.html.md), [deploy](./deploy.html.md), [importing](./import.html.md) from private github repos.
- [Broadcast](./broadcast.html.md).
- App menus.
- Some tools in [tools pane](./tools-pane.html.md):
  e.g. open result page in new window, broadcast status.
- [Welcome screen](./welcome.html.md).

### Features Not Shown by Default

- [External resources](./external-resources.html.md) button (below the editor) and external resources screen are only shown if the loaded project has external resources (e.g. via [`EmbedOptions.config.stylesheets`](../configuration/configuration-object.html.md)#stylesheets) and [`EmbedOptions.config.scripts`](../configuration/configuration-object.html.md)#scripts)).
- [Tests](./tests.html.md) are not shown in [tools pane](./tools-pane.html.md) unless the loaded project has tests (e.g. via [`EmbedOptions.config.tests`](../configuration/configuration-object.html.md)#tests)). Test editor is not available.
- Loading [starter templates](./templates.html.md) can be achieved by the [SDK](../sdk/index.html.md) ([`EmbedOptions.template`](../sdk/js-ts.html.md)#template)), not from the UI.
- [Importing](./import.html.md) from external sources can be achieved by the [SDK](../sdk/index.html.md) ([`EmbedOptions.import`](../sdk/js-ts.html.md)#import)), not from the UI.
- Getting a [share](./share.html.md) URL can be achieved by the [SDK](../sdk/index.html.md) ([`getShareUrl`](../sdk/js-ts.html.md)#getshareurl) method), not from the UI.

## Security

- All user code, [result page](./result.html.md) and compilers run in [sandboxed iframes](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) with a unique origin.

- Embedded playgrounds do not have access to the parent page, or to sensitive data like user cookies and localstorage of the embedding page origin. Communications with the SDK occur by means of [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) calls.

## Related

- [SDK](../sdk/index.html.md)
- [Code prefill](./code-prefill.html.md)
- [Configuration](../configuration/index.html.md)
- [Embed options](../sdk/js-ts.html.md)#embed-options)
- [SDK methods](../sdk/js-ts.html.md)#sdk-methods)
- [Permanent URL](./permanent-url.html.md)
- [Lite mode](./lite.html.md)
- [Read-only](./read-only.html.md)