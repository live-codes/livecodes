# React SDK

import LiveCodes from '../../src/components/LiveCodes.tsx';

The react SDK is a thin wrapper around the [JavaScript SDK](js-ts.html.md) to provide an easy to use react component, yet retaining the full power, by having access to the [SDK methods](js-ts.html.md)#sdk-methods).

It has a very simple [implementation](https://github.com/live-codes/livecodes/blob/develop/src/sdk/react.tsx) which you can easily modify in case you need.

## Installation

Please refer to the [SDK installation](./index.html.md)#installation) section.

## Usage

The react component is provided as the default export from `livecodes/react`.

```jsx title="JSX"
import LiveCodes from 'livecodes/react';

export const Playground = () => <LiveCodes />;
```

### TypeScript Support

Prop types are exported as `Props` from `livecodes/react`.

```tsx title="TSX"
import LiveCodes, { type Props } from 'livecodes/react';

const options: Props = {
  // embed options
};
export const Playground = () => <LiveCodes {...options} />;
```

TypeScript types are [documented here](../api/globals.md).

### Props

All [embed options](js-ts.html.md)#embed-options) are available as props with the corresponding types.

Example:

```jsx title="JSX"
import LiveCodes from 'livecodes/react';

const config = {
  markup: {
    language: 'markdown',
    content: '# Hello World!',
  },
};
export const Playground = () => <LiveCodes config={config} view="result" />;
```

In addition, the following props are also available:

- `className`

  Type: `string`.

  Class name(s) to add to playground container element.

  Example:

  ```jsx title="JSX"
  import LiveCodes from 'livecodes/react';

  export const Playground = () => <LiveCodes className="centered" />;
  ```

- `height`

  Type: `string`.

  Sets the height of playground container element.

  Example:

  ```jsx title="JSX"
  import LiveCodes from 'livecodes/react';

  export const Playground = () => <LiveCodes height="500px" />;
  ```

- `style`

  Type: `Record<string, string>`.

  Defines styles to add to playground container element. Styles set here override the [default styles](js-ts.html.md)#default-styles).

  Example:

  ```tsx title="JSX"
  import LiveCodes from 'livecodes/react';

  const style = {
    margin: 'auto',
    width: '80%',
  };
  export const Playground = () => <LiveCodes style={style} />;
  ```

- `sdkReady`

  Type: `(sdk: Playground) => void`.

  A callback function, that is provided with an instance of the [JavaScript SDK](js-ts.html.md) representing the current playground. This allows making use of full capability of the SDK by calling [SDK methods](js-ts.html.md)#sdk-methods).

  Example:

  ```tsx title="TSX"
  import { useState } from 'react';
  import LiveCodes from 'livecodes/react';
  import type { Playground } from 'livecodes';

  export const App = () => {
    const [playground, setPlayground] = useState<Playground>();

    const onReady = (sdk: Playground) => {
      setPlayground(sdk);
    };

    const run = async () => {
      await playground?.run();
    };

    return (
      <>
        <LiveCodes sdkReady={onReady} />
        <button onClick={run}>Run</button>
      </>
    );
  };
  ```

## Demo

export const reactSDKDemo = {
  jsx: `import LiveCodes from "livecodes/react";\n\nconst App = () => {\n  const params = {\n    html: "<h1>Hello World!</h1>",\n    css: "h1 {color: blue;}",\n    js: 'console.log("Hello, World!")',\n    console: "open",\n  };\n\n  return <LiveCodes params={params} />;\n};\n\nexport default App;\n`,
};

<LiveCodes params={reactSDKDemo} height="80vh" />

## Related

- [SDK Installation](./index.html.md)#installation)
- [JS/TS SDK](./js-ts.html.md)
- [Vue SDK](./vue.html.md)
- [Using SDK in Svelte](./svelte.html.md)
- [Using SDK in Solid](./solid.html.md)
- [Embedded Playgrounds](../features/embeds.html.md)