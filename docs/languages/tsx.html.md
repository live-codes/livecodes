# TSX

TSX is a syntax that allows using TypeScript in JSX.
[JSX](https://react.dev/learn/writing-markup-with-jsx) is a syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript.
It has been popularized by [React](https://react.dev/), and then adopted by many other libraries/frameworks.

By default, when running JSX/TSX in LiveCodes, [React](https://react.dev/) runtime is used.
However, other libraries like [Preact](https://preactjs.com/), [nano JSX](https://nanojsx.io/) and others can be used as well (see [Custom JSX Runtimes](./jsx.html.md)#custom-jsx-runtimes)).

Please note that [React compiler](https://react.dev/learn/react-compiler) is also available in LiveCodes and is [documented here](./react.html.md).

## Usage

For usage and examples, see documentation for [JSX](./jsx.html.md) and [TypeScript](./typescript.html.md) support in LiveCodes.

## Language Info

### Name

`tsx`

### Extension

`.tsx`

### Editor

`script`

## Compiler

[TypeScript compiler](./typescript.html.md)

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `tsx` are passed to the TypeScript compiler as [compiler options](https://www.typescriptlang.org/tsconfig#compilerOptions) while compiling TSX.
In addition, the option `disableAutoRender` can be set to `true` to disable [auto-rendering](./jsx#auto-rendering).

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "tsx": {
    "disableAutoRender": true,
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

## Links

- [React](https://react.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [TypeScript](https://www.typescriptlang.org/)