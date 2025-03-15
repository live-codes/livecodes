# Babel

[Babel](https://babeljs.io/) is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

## Language Info

### Name

`babel`

### Extensions

`.es`, `.babel`

### Editor

`script`

## Compiler

The official [`@babel/standalone` compiler](https://babeljs.io/docs/babel-standalone).

### Version

`@babel/standalone`: v7.24.7

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `babel` are passed as a JSON object to the [`Babel.transform`](https://babeljs.io/docs/babel-standalone#api) method during compile. Please check the [documentation](https://babeljs.io/docs/babel-core/) for full reference.

By default, the following configuration is used:

```json
{
  "babel": { "presets": [["env", { "modules": false }], "typescript", "react"] }
}
```

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  babel:
    'export const numbers = [1, 2, 3].map((x) => x * 2);\n\nexport const Greet = (name: string) => <>Hello {name}!</>;\n',
  compiled: 'open',
};

<LiveCodes params={params}></LiveCodes>

## Links

- [Babel official website](https://babeljs.io/)
- [Babel documentation](https://babeljs.io/docs/)