# React (TSX)

TSX is a syntax that allows using TypeScript in JSX.

[React Compiler](https://react.dev/learn/react-compiler) is a build-time only tool that automatically optimizes [React](https://react.dev/) apps.

Please note that LiveCodes supports running [JSX](./jsx.html.md) and [TSX](./tsx.html.md) which are compiled to JavaScript using the [TypeScript compiler](./typescript.html.md). This was the traditional way of running React and other JSX/TSX apps in LiveCodes before React compiler support was added.

## Usage

For usage and examples, see documentation for [React](./react.html.md) and [TypeScript](./typescript.html.md) support in LiveCodes.

## Language Info

### Name

`react-tsx`

### Extension

`.react.tsx`

### Editor

`script`

## Compiler

[React compiler](https://react.dev/learn/react-compiler), which is a [babel](./babel.html.md) plugin ([babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler)).

### Version

`babel-plugin-react-compiler`: v1.0.0

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

React compiler is implemented as a babel plugin ([babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler)). In addition the following babel presets are used:

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

[Custom settings](../advanced/custom-settings.html.md) can be used to add configuration under the following keys:

- `react-tsx`: the option `disableAutoRender` can be set to `true` to disable [auto-rendering](./react.html.md)#auto-rendering).
- `babel`: custom settings for [babel](https://babeljs.io/docs/options).
- `babel-plugin-react-compiler`: custom settings for [babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler).
- `@babel/preset-env`: custom settings for [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).
- `@babel/preset-react`: custom settings for [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react).
- `@babel/preset-typescript`: custom settings for [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript).

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "react-tsx": {
    "disableAutoRender": true
  }
}
```

## Links

- [React](https://react.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [TypeScript](https://www.typescriptlang.org/)