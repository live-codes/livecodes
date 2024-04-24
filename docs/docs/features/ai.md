# AI Code Assistant 🪄

LiveCodes supports AI-powered code completion, totally for **free** with **no account or API token required**, using [Codeium](https://codeium.com/), the ultrafast Copilot alternative. This can be easily enabled from the UI (as easy as [flipping a switch](#ui)!)

The large generative machine learning model is capable of understanding the context of your code and comments (across the [3 code editors](./projects#markup-editor)) in order to generate suggestions on what you might want to type next.

It has a wide range of language support, and it works everywhere (in the [standalone app](../getting-started.md#standalone-app), [embedded playgrounds](./embeds.md) and [self-hosted](./self-hosting.md) apps).

Powered by:

<a href="https://codeium.com/"><img width="300px" src="/docs/img/credits/codeium.svg" alt="Codeium logo"/></a>.

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

The AI code assistant can be enabled from:

### UI

The [editor settings](./editor-settings.md) screen (App menu → Editor Settings → Enable AI Code Assistant).

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{screen: 'editor-settings'}} linkText="direct link" />

![LiveCodes Editor Settings](../../static/img/screenshots/editor-settings-1.png)

**Note**

When set from the UI, this configuration is saved locally to [user settings](./user-settings.md) and is remembered across sessions.

### Configuration

Alternatively, this can be enabled (_only for the current session_) using the [`enableAI`](../configuration/configuration-object.md#enableai) property in the [configuration object](../configuration/configuration-object.md). This can be used to enable the AI code assistant in [embedded playgrounds](./embeds.md).

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

Also this can be enabled using [query params](../configuration/query-params.md) (e.g. https://livecodes.io/?enableAI).

## Usage

On typing, the code completion suggestions will be shown in dimmed color. Press <kbd>Tab</kbd> to accept, or <kbd>Esc</kbd> to cancel.

On mobile, tap on the suggestion to accept it, or continue typing to reject.

:::caution Note

Please note that when using Codeium AI assistant, your code is sent to Codeium servers for code completion. However, your code is not used for training their model. Check Codeium [FAQ](https://codeium.com/faq#Will-Codeium-regurgitate-private-code%3F) and [privacy policy](https://codeium.com/privacy-policy) for more details.

:::
