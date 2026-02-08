# Jinja

[Jinja](https://jinja.palletsprojects.com/) is a fast, expressive, extensible templating engine. Special placeholders in the template allow writing code similar to Python syntax. Then the template is passed data to render the final document.

LiveCodes uses a [minimalistic JavaScript implementation](https://github.com/huggingface/huggingface.js/tree/main/packages/jinja).

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

`jinja`

### Extension

`.jinja`

### Editor

`markup`

## Compiler

[@huggingface/jinja](https://www.npmjs.com/package/@huggingface/jinja).

### Version

`@huggingface/jinja`: v0.5.1

## Code Formatting

Using `@huggingface/jinja` integrated formatted.

## Example Usage

import LiveCodes from '../../src/components/LiveCodes';

### Pre-rendered

export const config = {
  markup: { language: 'jinja', content: `<ul id="navigation">
{% for item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% endfor %}
</ul>

<h1>My Webpage</h1>
{{ a_variable }}

` },
  customSettings: { template: { data: {
  navigation: [
    { href: "/", caption: "Home" },
    { href: "/about", caption: "About" },
    { href: "/contact", caption: "Contact" },
  ],
  a_variable: "Hello World!",
} } },
};

export const params = { compiled: 'open' };

<LiveCodes config={config} params={params}></LiveCodes>

### Dynamic

export const config2 = {
  markup: { language: 'jinja', content: `<ul id="navigation">
{% for item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% endfor %}
</ul>

<h1>My Webpage</h1>
{{ a_variable }}

` },
  script: {
    language: 'javascript',
    content: `window.livecodes.templateData = {
  navigation: [
    { href: "/", caption: "Home" },
    { href: "/about", caption: "About" },
    { href: "/contact", caption: "Contact" },
  ],
  a_variable: "Hello World!",
};`,
  },
  customSettings: { template: { prerender: false } },
  activeEditor: 'script',
};

<LiveCodes config={config2}></LiveCodes>

## Links

- [Jinja](https://jinja.palletsprojects.com/)
- [Template Documentation](https://jinja.palletsprojects.com/en/stable/templates/)
- [`@huggingface/jinja`](https://www.npmjs.com/package/@huggingface/jinja)