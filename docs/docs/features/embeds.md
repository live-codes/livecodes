# Embedded Playgrounds

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Overview

LiveCodes playgrounds can be embedded in any web page. The playground can be [prefilled with code](./code-prefill.md) in any supported language. This can be very useful in documentation websites, technical blogs, educational websites and others.

Demo:

<LiveCodes template="javascript"></LiveCodes>

The embedding web page can communicate with the playground using a powerful [SDK](../sdk/index.md) (e.g. edit/format code, watch for code changes, get the compiled code or result page HTML, run tests, change layout, ...etc).

## Create Embedded Playground

### App Embed Screen

In the [standalone app](../getting-started.md#standalone-app), the Embed Screen can be accessed from app menu → Embed.

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{screen: 'embed'}} linkText="direct link" />

It shows a preview of the embedded playground, allows customizations of [embed options](../sdk/js-ts.md#embed-options) and provides generated code that can be added to the web page that will embed the playground.

![LiveCodes embed](../../static/img/screenshots/embed1.png)
![LiveCodes embed](../../static/img/screenshots/embed2.png)
![LiveCodes embed](../../static/img/screenshots/embed3.png)

:::info Note

Please note that the Embed Screen sends the project code to [LiveCodes share service](./share.md) to generate a short URL for usage in the embed code.

:::

The setting "Embed Type" allows selection from different variations of the generated code:

- Using the SDK from CDN.
- Using the SDK with a bundler (e.g. vite, parcel, webpack, etc).
- Using the React SDK.
- Using the Vue SDK.
- Using iframe and [query params](../configuration/query-params.md).
- Using HTML code that the SDK can use to [auto-prefill](./code-prefill.md#auto-prefill-from-page-dom) the playground.

### SDK

The LiveCodes [SDK](../sdk/index.md) can be used to embed playgrounds, specify [embed](../sdk/js-ts.md#embed-options) and [configuration](../configuration/index.md) options and allows communication with the embedded playground with many [SDK methods](../sdk/js-ts.md#sdk-methods).

This method provides more control and allows advanced scenarios.

## Avoid Breaking Changes

To avoid breaking changes that would cause the embedded playgrounds to stop working as expected with later updates, follow these recommendations:

- Use a [permanent URL](./permanent-url.md) to a pinned version of the LiveCodes app for [`EmbedOptions.appUrl`](../sdk/js-ts.md#appurl). The code generated in the Embed screen uses that by default.
- Specify the version of the SDK used. The code generated in the Embed screen also does that.
- For project code, [specify the versions](./module-resolution.md#package-version) of the imported packages and [external resources](./external-resources.md). [Custom import maps](./module-resolution.md#custom-module-resolution) can be set to control the module import behavior.

Check the [Permanent URL](./permanent-url.md) section for more details.

## Differences from Full App

Some of the features of the full standalone app are not available or shown by default in embedded playgrounds, either because of security reasons, being not useful when embedded or because of space limitations.

### Features Not Available

- All features that require saving/loading from browser storage:  
  e.g. [projects](./projects.md), [assets](./assets.md), [code snippets](./snippets.md), [user settings](./user-settings.md), [default template/language](./default-template-language.md), [recover unsaved](./recover.md), [backup/restore](./backup-restore.md).
- All features that require authentication:  
  e.g. [login/logout](./github-integration.md), [sync](./sync.md), [deploy](./deploy.md), [importing](./import.md) from private github repos.
- [Broadcast](./broadcast.md).
- App menu.
- Some tools in [tools pane](./tools-pane.md):  
  e.g. open result page in new window, broadcast status.
- [Welcome screen](./welcome.md).

### Features Not Shown by Default

- [External resources](./external-resources.md) button (below the editor) and external resources screen are only shown if the loaded project has external resources (e.g. via [`EmbedOptions.config.stylesheets`](../configuration/configuration-object.md#stylesheets) and [`EmbedOptions.config.scripts`](../configuration/configuration-object.md#scripts)).
- [Tests](./tests.md) are not shown in [tools pane](./tools-pane.md) unless the loaded project has tests (e.g. via [`EmbedOptions.config.tests`](../configuration/configuration-object.md#tests)). Test editor is not available.
- Loading [starter templates](./templates.md) can be achieved by the [SDK](../sdk/index.md) ([`EmbedOptions.template`](../sdk/js-ts.md#template)), not from the UI.
- [Importing](./import.md) from external sources can be achieved by the [SDK](../sdk/index.md) ([`EmbedOptions.import`](../sdk/js-ts.md#import)), not from the UI.
- Getting a [share](./share.md) URL can be achieved by the [SDK](../sdk/index.md) ([`getShareUrl`](../sdk/js-ts.md#getshareurl) method), not from the UI.

## Security

- All user code, [result page](./result.md) and compilers run in [sandboxed iframes](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) with a unique origin.

- Embedded playgrounds do not have access to the parent page, or to sensitive data like user cookies and localstorage of the embedding page origin. Communications with the SDK occur by means of [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) calls.

## Related

- [SDK](../sdk/index.md)
- [Code prefill](./code-prefill.md)
- [Configuration](../configuration/index.md)
- [Embed options](../sdk/js-ts.md#embed-options)
- [SDK methods](../sdk/js-ts.md#sdk-methods)
- [Permanent URL](./permanent-url.md)
- [Lite mode](./lite.md)
- [Read-only](./read-only.md)
