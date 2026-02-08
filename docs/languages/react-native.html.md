# React Native

import LiveCodes from '../../src/components/LiveCodes.tsx';

[React Native](https://reactnative.dev/) is a framework for building mobile apps using React and React Native. React Native support in LiveCodes is achieved by using [React Native for Web](https://necolas.github.io/react-native-web/) (an accessible implementation of React Native's Components and APIs that is interoperable with React DOM).

TypeScript is also supported in React Native (TSX) and is [documented here](./react-native-tsx.html.md).

## Demo

<LiveCodes template="react-native" height="400px"></LiveCodes>

## Usage

For usage and examples, see documentation for [JSX](./jsx.html.md).

## Language Info

### Name

`react-native`

### Extension

`.react-native.jsx`

### Editor

`script`

## Compiler

[TypeScript compiler](./typescript.html.md) and [React Native for Web](https://necolas.github.io/react-native-web/)

### Version

`react-native-web`: v0.21.2

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `react-native` are passed to the TypeScript compiler as [compiler options](https://www.typescriptlang.org/tsconfig#compilerOptions) while compiling JSX.
In addition, the option `disableAutoRender` can be set to `true` to disable [auto-rendering](./jsx#auto-rendering).

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "react-native": {
    "disableAutoRender": true
  }
}
```

## Starter Template

https://livecodes.io/?template=react-native

## Links

- [React Native](https://reactnative.dev/)
- [React Native for Web](https://necolas.github.io/react-native-web/)
- [React](https://react.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [TypeScript](https://www.typescriptlang.org/)