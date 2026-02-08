# Solid (TS)

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

[Solid](https://www.solidjs.com/) is a JavaScript framework for making interactive web applications.

Solid offers very similar syntax to [React](https://react.dev/), with strong focus on [reactivity](https://www.solidjs.com/guides/reactivity) using signals. Solid supports templating in 3 forms [JSX](./jsx.html.md), Tagged Template Literals and Solid's HyperScript variant, although JSX is the predominate form. Solid also supports [TypeScript](./typescript.html.md).

## Demo

<LiveCodes template="solid" height="400px"></LiveCodes>

## Usage

For usage, see documentation for [JSX](./jsx.html.md) and [TypeScript](./typescript.html.md) support in LiveCodes.

## Language Info

### Name

`solid.tsx`

### Extension

`solid.tsx`

### Editor

`script`

## Compiler

[Official Solid JSX compiler](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions) (`babel-preset-solid`)

### Version

`babel-preset-solid` version 1.9.10

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `solid.tsx` are passed to the Babel compiler during compile. Please check the [documentation](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options) for full reference.
In addition, the option `disableAutoRender` can be set to `true` to disable [auto-rendering](./jsx#auto-rendering).

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "solid": {
    "disableAutoRender": true
  }
}
```

## Starter Template

https://livecodes.io/?template=solid

## Links

- [Solid](https://www.solidjs.com/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [TypeScript](https://www.typescriptlang.org/)