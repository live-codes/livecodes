# Sucrase

[Sucrase](https://sucrase.io/) is a super-fast alternative to [Babel](./babel.html.md) for when you can target modern JS runtimes.

## Language Info

### Name

`sucrase`

### Extension

`.sucrase`

### Editor

`script`

## Compiler

The official [Sucrase compiler](https://github.com/alangpierce/sucrase).

### Version

`sucrase`: v3.32.0

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `sucrase` are passed as a JSON object to the [`transform` function](https://github.com/alangpierce/sucrase#usage-from-code) during compile. Please check the [documentation](https://github.com/alangpierce/sucrase) for full reference.

By default, the following transforms are enabled: `['jsx', 'typescript']`

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json
{
  "sucrase": { "transforms": ["typescript", "imports"] }
}
```

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  sucrase: 'export const Greet = (name: string) => <>Hello {name}!</>;',
  compiled: 'open',
};

<LiveCodes params={params}></LiveCodes>

## Links

- [Sucrase official website](https://sucrase.io/)
- [Sucrase GitHub Repo](https://github.com/alangpierce/sucrase)