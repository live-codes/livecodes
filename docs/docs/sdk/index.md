# LiveCodes SDK

import LiveCodes from '../../src/components/LiveCodes.tsx'

The SoftWare Development Kit (SDK) provides easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds.

It is framework/library agnostic, and is currently provided in the following variations:

- [JavaScript/TypeScript](./js-ts.md)

- [React](./react.md)

- [Vue](./vue.md)

This is an example of an editable embedded playground using the SDK.

<LiveCodes config={{markup: {language: 'markdown', content: '# Hello World!'}, script: {language: 'javascript', content: 'console.log("Hello, from JS!");'}, tools: {active: 'console', status: 'open'}}}></LiveCodes>
