# React SDK

The react SDK is a thin wrapper around the [JavaScript SDK](js-ts.md) to provide an easy to use react component, yet retaining the full power, by having access to the [SDK methods](js-ts.md#sdk-methods).

It has a very simple [implementation](https://github.com/live-codes/livecodes/blob/develop/src/sdk/react.tsx) which you can easily modify in case you need.

## Installation

Please refer to the [SDK installation](./index.md#installation) section.

## Usage

The react component is provided as the default export from `livecodes/react`.

```jsx
import LiveCodes from 'livecodes/react';

export const Playground = () => <LiveCodes />;
```

### TypeScript Support

Prop types are exported as `Props` from `livecodes/react`.

```tsx
import LiveCodes, { type Props } from 'livecodes/react';

const props: Props = {};
export const Playground = () => <LiveCodes {...props} />;
```

### Props

All [embed options](js-ts.md#embed-options) are available as props with the corresponding types.

Example:

```jsx
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

  ```jsx
  import LiveCodes from 'livecodes/react';

  export const Playground = () => <LiveCodes className="dark" />;
  ```

- `height`

  Type: `string`.

  Sets the hight of playground container element.

  Example:

  ```jsx
  import LiveCodes from 'livecodes/react';

  export const Playground = () => <LiveCodes height="500px" />;
  ```

- `style`

  Type: `Record<string, string>`.

  Styles to add to playground container element. Styles set here override the [default styles](js-ts.md#default-styles).

  Example:

  ```jsx
  import LiveCodes from 'livecodes/react';

  const style = {
    margin: 'auto',
    width: '80%',
  };
  export const Playground = () => <LiveCodes style={style} />;
  ```

- `getSDK`

  Type: `(sdk: Playground) => void`.

  A callback function, that is provided with an instance of the [JavaScript SDK](js-ts.md) representing the current playground. This allows making use of full capability of the SDK by calling [SDK methods](js-ts.md#sdk-methods).

  Example:

  ```tsx
  import LiveCodes from 'livecodes/react';
  import type { Playground } from 'livecodes';

  export const App = () => {
    let playground: Playground | undefined;

    const getSDK = (sdk: Playground) => {
      playground = sdk;
    };

    const run = async () => {
      await playground?.run();
    };

    return (
      <>
        <LiveCodes getSDK={getSDK} />
        <button onClick={run}>Run</button>
      </>
    );
  };
  ```
