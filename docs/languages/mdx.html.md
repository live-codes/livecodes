# MDX

[MDX](https://mdxjs.com/) allows using JSX in [Markdown](./markdown.html.md), creating dynamic and component-driven content for websites, documentation, and applications.

:::info Note

Please note that Markdown is also supported in LiveCodes and is [documented here](./markdown.html.md).

:::

## Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const mdxConfig = {
  markup: {
    language: 'mdx',
    content: `import { Counter } from './script';

# Counter

<Counter />
`,},
  style: {
    language: 'css',
    content: `body, body button {
  text-align: center;
  font: 1em sans-serif;
}
`,
  },
  script: {
    language: 'jsx',
    content: `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
}
`,
  },
}

<LiveCodes config={mdxConfig}></LiveCodes>

## Usage

Components can be imported from the script editor that uses [JSX](./jsx.html.md) or [React](./react.html.md) by importing from `'./script'` (with no extension).

Example:

```js
import { ComponentName } from './script';
```

## Language Info

### Name

`mdx`

### Extension

`.html.md)`

### Editor

`script`

## Compiler

[MDX](https://mdxjs.com/)

### Version

`@mdx-js/mdx`: v3.1.1

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `mdx` are passed as a JSON object to [`mdx.compile`](https://mdxjs.com/packages/mdx/#compilefile-options). Please check the [documentation](https://mdxjs.com/packages/mdx/#compileoptions) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).


## Starter Template

https://livecodes.io/?template=mdx

## Links

- [MDX](https://mdxjs.com/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React](https://react.dev/)
- [Markdown support in LiveCodes](./markdown.html.md)
- [JSX support in LiveCodes](./jsx.html.md)
- [React support in LiveCodes](./react.html.md)