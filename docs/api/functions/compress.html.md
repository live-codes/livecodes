# Function: compress()

> **compress**(`uncompressed`): `string`

A utility function that allows compressing the stringified config object (e.g. for sharing in URL hash)
It encodes it in base64 with a few tweaks to make it URI safe.

This is the `compressToEncodedURIComponent` function re-exported from `lz-string` for convenience.

## Parameters

• **uncompressed**: `string`

A string which should be compressed.

## Returns

`string`

The compressed string

## Param

The string to be compressed (e.g. stringified config object)

## Example

```ts
const compressed = compress(JSON.stringify(config));
```

## Defined in

[src/sdk/index.ts:522](https://github.com/live-codes/livecodes/blob/c3b62a72e2817a8178746f6774572e3863c09a69/src/sdk/index.ts#L522)