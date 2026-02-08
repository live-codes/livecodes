# Type Alias: WatchCode()

> **WatchCode**: (`event`, `fn`) => `object`

Called when the playground "content" is changed (see [`getCode`](https://livecodes.io/docs/sdk/js-ts#getcode) and [`getConfig`](https://livecodes.io/docs/sdk/js-ts#getcode)).

This includes changes in:
- Code (in editors)
- Editor [languages](https://livecodes.io/docs/languages/)
- [CSS processors](https://livecodes.io/docs/features/css#css-processors)
- [External resources](https://livecodes.io/docs/features/external-resources)
- Project info (e.g. allows adding content in page head and attributes to `<html>` element)
- [Custom settings](https://livecodes.io/docs/advanced/custom-settings) (e.g. allows changing [import maps](https://livecodes.io/docs/features/module-resolution#custom-module-resolution))
- Project title
- [Test](https://livecodes.io/docs/features/tests) code

## Parameters

• **event**: `"code"`

• **fn**

## Returns

`object`

### remove()

> **remove**: () => `void`

#### Returns

`void`

## Defined in

[models.ts:248](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L248)