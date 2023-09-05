# AI Code Assistant 🪄

LiveCodes supports AI-powered code completion, totally for **free**, using [Codeium](https://codeium.com/), the ultrafast Copilot alternative.

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

1. Install [Codeium chrome extension](https://codeium.com/chrome_tutorial).
2. Login to Codeium.
3. Enjoy the magic!

Currently, only [Monaco editor](./editor-settings.md#code-editor) on desktop Chrome browser is supported. Wider editor and browser support is planned.

:::caution Note

Please note that codeium extension sends your code to their servers for code completion. However, your code is not used for training their model. Check codeium [FAQ](https://codeium.com/faq#Will-Codeium-regurgitate-private-code%3F) and [privacy policy](https://codeium.com/privacy-policy) for more details.

:::

## Disabling AI Code Assistant

Obviously, if you want to disable the AI code completion on your device, just disable the browser extension.

However, if you want to prevent users from using AI code completion in playgrounds that you embed in your webpages (e.g. for code challenges or exercises), you may achieve that by adding the [query parameter](../configuration/query-params.md) `disableAI` (e.g. https://livecodes.io/?disableAI).

Example:

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  params: {
    html: '<h1>Hello LiveCodes!</h1>',
    // highlight-next-line
    disableAI: true,
  },
});
```
