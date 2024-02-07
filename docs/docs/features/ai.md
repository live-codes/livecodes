# AI Code Assistant 🪄

LiveCodes supports AI-powered code completion, totally for **free** and no account required, using [Codeium](https://codeium.com/), the ultrafast Copilot alternative.

The large generative machine learning model is capable of understanding the context of your code and comments in order to generate suggestions on what you might want to type next.

It has a wide range of language support, and it works everywhere (in the [standalone app](../getting-started.md#standalone-app), [embedded playgrounds](./embeds.md) and [self-hosted](./self-hosting.md) apps).

## Examples:

JavaScript:

<video controls style={{width: '100%'}}>

  <source src="/docs/vid/LiveCodes-AI.mp4" type="video/mp4" />
</video>

Python:

<video controls style={{width: '100%'}}>

  <source src="/docs/vid/LiveCodes-AI-py.mp4" type="video/mp4" />
</video>

## Instructions

The AI code assistant can be enabled from the [editor settings](./editor-settings.md) screen (App menu → Editor Settings → Enable AI Code Assistant). Also can be enabled using the [`enableAI`](../configuration/configuration-object.md#enableai) property in the [configuration object](../configuration/configuration-object.md).

Example:

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  config: {
    // highlight-next-line
    enableAI: true,
  },
});
```

Currently, only [Monaco editor](./editor-settings.md#code-editor) on desktop Chrome browser is supported. Wider editor and browser support is planned.

:::caution Note

Please note that when using Codeium AI assistant, your code is sent to their servers for code completion. However, your code is not used for training their model. Check Codeium [FAQ](https://codeium.com/faq#Will-Codeium-regurgitate-private-code%3F) and [privacy policy](https://codeium.com/privacy-policy) for more details.

:::
