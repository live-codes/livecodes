# React

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

[React Compiler](https://react.dev/learn/react-compiler) is a build-time only tool that automatically optimizes [React](https://react.dev/) apps.

Please note that using React compiler with TypeScript (TSX) is also supported in LiveCodes and is [documented here](./react-tsx.html.md).

Also note that LiveCodes supports running [JSX](./jsx.html.md) and [TSX](./tsx.html.md) which are compiled to JavaScript using the [TypeScript compiler](./typescript.html.md). This was the traditional way of running React and other JSX/TSX apps in LiveCodes before React compiler support was added.

## Demo:

<LiveCodes template="react" height="400px"></LiveCodes>

## Usage

The easiest way is to [auto-render](#auto-rendering) a component by exporting it as the [default export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export):

export const basicJsxDemo = {
  react: `export default function App() {\n  return <h1>Hello World!</h1>;\n}`,
};

<RunInLiveCodes
  params={basicJsxDemo}
  code={basicJsxDemo.jsx}
  language="react"
  formatCode={false}
></RunInLiveCodes>

You may, however, be more explicit and render the component yourself using [React DOM](https://react.dev/reference/react-dom/client):

export const reactDomDemo = {
  react: `import { createRoot } from "react-dom/client";\n\nfunction App() {\n  return <h1>Hello World!</h1>;\n}\n\nconst root = createRoot(document.querySelector("#root"));\nroot.render(<App />);`,
  html: `<div id="root"></div>`,
};

<RunInLiveCodes
  params={reactDomDemo}
  code={reactDomDemo.jsx}
  language="react"
  formatCode={false}
></RunInLiveCodes>

:::info note

React's [new JSX transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) is utilized. So there is no need to import React.

```jsx
// this is not needed:
// import React from 'react';

export default function App() {
  return <h1>Hello World!</h1>;
}
```

:::

### Auto-rendering

A component is rendered automatically as a React component (without having to manually use React Dom to render it) if the following conditions are met:

- The component is exported as the default export.
- No [imports from `"./script"`](#exports) in markup editor.
- Auto-rendering is not [disabled](#disabling-auto-rendering).

#### Root Element

To render the React components to a specific [root](https://react.dev/reference/react-dom/client/createRoot) DOM element use `"livecodes-app"` as the element `id`. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used as the root.

Example:

export const rootDemo = {
  html: `<div id="livecodes-app">Loading...</div>`,
  react: `export default function App() {\n  return <h1>Hello World!</h1>;\n}`,
};

<RunInLiveCodes
  params={rootDemo}
  code={rootDemo.html}
  language="html"
  formatCode={false}
></RunInLiveCodes>

#### Disabling Auto-rendering

To disable auto-rendering, set the [custom settings](#custom-settings) `disableAutoRender` property to `true`.

export const disableAutoRenderDemo = {
  markup: {
    language: 'html',
    content: `JSX auto-rendering is disabled. Set from Project menu → Custom Settings.`,
  },
  script: {
    language: 'react',
    content: `export default function App() {\n  return <h1>Hello World!</h1>;\n}`,
  },
  customSettings: { react: { disableAutoRender: true } },
};

<RunInLiveCodes
  config={disableAutoRenderDemo}
  code={JSON.stringify(disableAutoRenderDemo.customSettings, null, 2)}
  language="json"
  codeTitle="Custom Settings"
  formatCode={false}
></RunInLiveCodes>

### Importing Modules

npm modules can be imported as described in the section about [module resolution](../features/module-resolution.html.md), including bare module imports and importing from different CDNs. Stylesheet imports are added as `<link rel="stylesheet">` tags in the page `head`.

Example:

export const importsDemo = {
  react: `import { useState, useEffect } from "react";\nimport confetti from "canvas-confetti";\nimport "bootstrap/dist/css/bootstrap.css";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    if (count > 0) {\n      confetti();\n    }\n  }, [count]);\n\n  return (\n    <div className="m-5 text-center">\n      <p>You clicked {count} times.</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}\n`,
};

<RunInLiveCodes
  params={importsDemo}
  code={importsDemo.jsx}
  language="react"
  formatCode={false}
></RunInLiveCodes>

Module imports can be customized using import maps as described in [module resolution](../features/module-resolution.html.md)#custom-module-resolution) documentations.

#### Types for Imported Modules

Types for imported modules are loaded automatically (if available) to provide [Intellisense](../features/intellisense.html.md), auto-completion and type information.

![LiveCodes Intellisense](../../static/img/screenshots/intellisense-1.jpg)

![LiveCodes Intellisense](../../static/img/screenshots/intellisense-2.jpg)

Moreover, you can provide custom type definitions for modules that do not have types available on npm. See [Custom Types](../features/intellisense.html.md)#custom-types) for details.

### Exports

Values exported from script editor (default or named) can be imported in the markup editor by importing from `"./script"` (with no extension).

This can be useful, for example, when using [MDX](./mdx.html.md) to import components exported form JSX.

Demo:

export const exportsDemo = {
  mdx: `import Greeting from "./script";\n\n<Greeting name="MDX" />\n`,
  react: `export default function(props) {\n  return <h1>Greeting from {props.name}!</h1>;\n}\n`,
};

<LiveCodes params={exportsDemo}></LiveCodes>

:::info note

When values are imported from `"./script"`, [auto-rendering](#auto-rendering) is disabled, because it is assumed that you want to take control over component rendering.

:::

### Styles

CSS can be applied to the component using various ways:

#### Style Editor

Styles added in the style editor is applied globally to the [result page](../features/result.html.md). This can use different **languages/processors** supported in LiveCodes including CSS, SCSS, Less, Stylus, ..etc. See [style documentation](../features/css.html.md) for more details.

And of course, styles and stylesheets added in markup editor are also applied globally.

#### Importing Stylesheets

Stylesheets imported in script editor are added as `<link rel="stylesheet">` tags in the page `head`.
The stylesheet URL can be an absolute URL or a path in the npm package. The URL has to end with `".css"`.

example:

export const stylesDemo = {
  react: `import "bootstrap/dist/css/bootstrap.css";\n\nexport default () => <h1 className="m-5 text-center">Hello World!</h1>;\n`,
};

<RunInLiveCodes
  params={stylesDemo}
  code={stylesDemo.react}
  language="react"
  formatCode={false}
></RunInLiveCodes>

#### CSS Modules

CSS modules are supported and are [documented separately](./cssmodules.html.md). Make sure to enable CSS modules (from style editor menu or in [`processors`](../configuration/configuration-object.html.md)#processors) property of [configuration object](../configuration/configuration-object.html.md)).

Demo:

export const cssModulesDemo = {
  activeEditor: 'script',
  style: { language: 'css', content: `.title {\n  color: green;\n  font-family: sans-serif;\n}\n` },
  script: {
    language: 'react',
    content: `import classes from './style.module.css';\n\nexport default function() {\n  return <h1 className={classes.title}>Hello, CSS Modules!</h1>;\n}\n`,
  },
  processors: ['cssmodules'],
};

<LiveCodes config={cssModulesDemo}></LiveCodes>

#### CSS Frameworks

[CSS Frameworks](../features/css.html.md)#css-processors) supported in LiveCodes (e.g. [Tailwind CSS](./tailwindcss.html.md), [UnoCSS](./unocss.html.md), [WindiCSS](./windicss.html.md)) can detect class names added in JSX. Make sure that the required utility is enabled (from style editor menu or in [`processors`](../configuration/configuration-object.html.md)#processors) property of [configuration object](../configuration/configuration-object.html.md)) and that required [directives](https://tailwindcss.com/docs/functions-and-directives#tailwind) are added to the style editor.

Demo:

export const tailwindcssDemo = {
  activeEditor: 'script',
  style: {
    language: 'css',
    content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
  },
  script: {
    language: 'react',
    content: `export default function() {\n  return <h1 className="text-3xl font-bold text-gray-500 text-center m-4">Hello, Tailwind CSS!</h1>;\n}\n`,
  },
  processors: ['tailwindcss'],
};

<LiveCodes config={tailwindcssDemo}></LiveCodes>

#### CSS-in-JS

CSS-in-JS libraries can be imported and used as usual.

Demo:

export const styledComponentsDemo = {
  react: `import styled from 'styled-components';\n\nconst Title = styled.h1\`\n text-align: center;\n font-family: sans-serif;\n color: palevioletred;\n\`;\n\nexport default function () {\n return <Title>Hello, styled-components!</Title>;\n}\n`,
};

<LiveCodes params={styledComponentsDemo}></LiveCodes>

## Language Info

### Name

`react`

### Extensions

`.react.jsx`, `.react-jsx`

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

- `react`: the option `disableAutoRender` can be set to `true` to disable [auto-rendering](#auto-rendering).
- `babel`: custom settings for [babel](https://babeljs.io/docs/options).
- `babel-plugin-react-compiler`: custom settings for [babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler).
- `@babel/preset-env`: custom settings for [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).
- `@babel/preset-react`: custom settings for [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react).
- `@babel/preset-typescript`: custom settings for [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript).

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "react": {
    "disableAutoRender": true
  }
}
```

## Starter Template

https://livecodes.io/?template=react

## Links

- [React](https://react.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React compiler](https://react.dev/learn/react-compiler)