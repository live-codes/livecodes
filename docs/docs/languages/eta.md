# Eta

[Eta](https://eta.js.org/) is an embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable. Written in TypeScript.

## Usage

## Language Info

### Name

`eta`

### Extension

`.eta`

### Editor

`markup`

## Compiler

The official [Eta compiler](https://www.npmjs.com/package/eta).

### Version

`eta`: v2.0.1

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.md) added to the property `eta` are passed as a JSON object to the [`Eta.render`](https://eta.js.org/docs/api/rendering) method during compile. Please check the [documentation](https://eta.js.org/docs/api/configuration) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json
{
  "name": {}
}
```

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {};

<LiveCodes params={params}></LiveCodes>

## Links

- [Official website](https://eta.js.org/)
- [Documentation](https://eta.js.org/docs/learn)
