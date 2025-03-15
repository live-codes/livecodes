# Nunjucks

[Nunjucks](https://mozilla.github.io/nunjucks/) is a rich and powerful templating language for JavaScript.

## Usage

There are 2 modes for rendering:

### Pre-rendered (Default)

The values of the expressions are evaluated and added to the template during compilation of the [result page](../features/result.html.md).

The values of all expressions should be supplied in advance using [custom settings](../advanced/custom-settings.html.md) to the property `template.data` which accepts an object of key-value pairs.

Example: This provides the value of the expression `name`

```json title="Custom Settings"
{
  "template": {
    "data": {
      "name": "LiveCodes"
    }
  }
}
```

[Full example below](#pre-rendered)

### Dynamic

To use this mode, the property `template.prerender` in [custom settings](../advanced/custom-settings.html.md) should be set to `false`.

Example:

```json title="Custom Settings"
{
  "template": {
    "prerender": false
  }
}
```

In this mode, in addition to values supplied in custom settings (see above), expressions can have values that are evaluated during the [result page](../features/result.html.md) runtime.

This can be achieved in JavaScript (or any [language](../languages/index.html.md) that compiles to it) by assigning `window.livecodes.templateData` to an object with the data.

Please note that template rendering occurs on [page load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event), so the assignment must occur before that.

Example:

```js title="Script Editor (JS)"
window.livecodes.templateData = { name: 'LiveCodes' };
```

[Full example below](#dynamic-1)

## Language Info

### Name

`nunjucks`

### Extension

`.njk`, `.nunjucks`

### Editor

`markup`

## Compiler

The official [Nunjucks compiler](https://www.npmjs.com/package/nunjucks).

### Version

`nunjucks`: v3.2.3

## Code Formatting

Using [Prettier](https://prettier.io/).

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

### Pre-rendered

export const config = {
  markup: { language: 'nunjucks', content: 'Hello {{name}}!' },
  customSettings: { template: { data: { name: 'LiveCodes' } } },
};

export const params = { compiled: 'open' };

<LiveCodes config={config} params={params}></LiveCodes>

### Dynamic

export const config2 = {
  markup: { language: 'nunjucks', content: 'Hello {{name}}!' },
  script: {
    language: 'javascript',
    content: 'window.livecodes.templateData = { name: "LiveCodes" };',
  },
  customSettings: { template: { prerender: false } },
  activeEditor: 'script',
};

<LiveCodes config={config2}></LiveCodes>

## Links

- [Official website](https://mozilla.github.io/nunjucks/)
- [Documentation](https://mozilla.github.io/nunjucks/templating.html)