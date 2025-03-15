# art-template

[art-template](https://aui.github.io/art-template/) is a high performance JavaScript templating engine.

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

`art-template`

### Extensions

`.art`, `.art-template`

### Editor

`markup`

## Compiler

The official [art-template compiler](https://www.npmjs.com/package/art-template).

### Version

`art-template`: v4.13.2

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `art-template` are passed as a JSON object to the [`compile`](https://aui.github.io/art-template/docs/api.html#compile-source-options) method during compile. Please check the [documentation](https://aui.github.io/art-template/docs/options.html) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "art-template": {
    "minimize": false
  }
}
```

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

### Pre-rendered

export const config = {
  markup: { language: 'art-template', content: 'Hello {{name}}!' },
  customSettings: { template: { data: { name: 'LiveCodes' } } },
};

export const params = { compiled: 'open' };

<LiveCodes config={config} params={params}></LiveCodes>

### Dynamic

export const config2 = {
  markup: { language: 'art-template', content: 'Hello {{name}}!' },
  script: {
    language: 'javascript',
    content: 'window.livecodes.templateData = { name: "LiveCodes" };',
  },
  customSettings: { template: { prerender: false } },
  activeEditor: 'script',
};

<LiveCodes config={config2}></LiveCodes>

## Links

- [Official website](https://aui.github.io/art-template/)
- [Documentation](https://aui.github.io/art-template/docs/)