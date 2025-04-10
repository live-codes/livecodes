# CSS Modules

A [CSS Module](https://github.com/css-modules/css-modules) is a CSS file in which all class names and animation names are scoped locally by default.

The selector names are unique to avoid naming collision. They can then be imported as a JavaScript object.

## Usage

CSS Modules can be enabled from the style editor menu.

Selectors added to the style editor (using any language e.g. CSS, SCSS, Less, etc.) are transformed to unique selectors. The transformed classes are then accessible in the script editor as a JSON object, and are injected into the HTML elements.

**Example:**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="src-css" label="Source CSS" default>

```css
:global .page {
  padding: 20px;
}

.text {
  color: black;
  font-family: sans-serif;
}

.small-text {
  composes: text;
  font-size: 20px;
}

.large-text {
  composes: text;
  font-size: 40px;
}

.large-text:hover {
  color: red;
}

.title {
  composes: large-text;
  color: green;
}
```

  </TabItem>
  <TabItem value="compiled-css" label="Compiled CSS">

```css
.page {
  padding: 20px;
}

._text_1ygro_9 {
  color: black;
  font-family: sans-serif;
}

._small-text_1ygro_19 {
  font-size: 20px;
}

._large-text_1ygro_29 {
  font-size: 40px;
}

._large-text_1ygro_29:hover {
  color: red;
}

._title_1ygro_47 {
  color: green;
}
```

  </TabItem>
  <TabItem value="json" label="JSON Object">

```json
{
  "text": "_text_1ygro_9",
  "small-text": "_small-text_1ygro_19 _text_1ygro_9",
  "large-text": "_large-text_1ygro_29 _text_1ygro_9",
  "title": "_title_1ygro_47 _large-text_1ygro_29 _text_1ygro_9",
  "smallText": "_small-text_1ygro_19 _text_1ygro_9",
  "largeText": "_large-text_1ygro_29 _text_1ygro_9"
}
```

  </TabItem>
  <TabItem value="src-html" label="Source HTML">

```html
<div class="page">
  <h1>Page Title</h1>
  <p class="small-text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non
    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur
    similique facere facilis minima tempora.
  </p>
</div>
```

  </TabItem>
  <TabItem value="compiled-html" label="Compiled HTML">

```html
<div class="page">
  <h1>Page Title</h1>
  <p class="small-text _small-text_1ygro_19 _text_1ygro_9">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non
    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur
    similique facere facilis minima tempora.
  </p>
</div>
```

  </TabItem>
</Tabs>

In the script editor, the JSON object representing the transformed classes can be imported from the relative URLs `'./style.module.css'` or `'./styles.module.css'`.

[Default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#default_import), [named](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import) and [namespace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) imports are supported. Class names are also available in camelCase (e.g `.large-text` becomes `largeText`). This can be changed by setting [`localsConvention`](https://github.com/madyankin/postcss-modules#localsconvention) in [custom settings](#custom-settings).

**Example:**

```js title="In script editor (using JS in this case):"
import classes from './style.module.css';
import { smallText } from './styles.module.css';
import * as allClasses from './styles.module.css';

console.log(classes.title);

// .small-text -> smallText
console.log(smallText);

// .large-text -> largeText
console.log(allClasses.largeText);

// bracket notation for class with dash
console.log(allClasses['large-text']);
```

For full example, see [example usage](#example-usage) below.

:::info

CSS Modules has to be enabled (from style editor menu), to be able to import classes in the script editor.

Importing a URL that does not include `.module` (e.g. `./style.css`) gets the processed CSS **string** as the module's default export.

The extension of the style editor language can also be used, in addition to `.css`. For example, when using SCSS, importing from any of the following URLs is the same:

- `./style.module.css`
- `./styles.module.css`
- `./style.module.scss`
- `./styles.module.scss`

:::

## Language Info

### Name

`cssmodules`

### Type

[Processor](../features/css.html.md)#css-processors)

### Editor

`style`

## Compiler

The CSS Modules processor is provided using [postcss-modules](https://github.com/madyankin/postcss-modules) as a [PostCSS](./postcss.html.md) plugin.

### Version

`postcss-modules`: v6.0.1

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `cssmodules` are passed as a JSON object to the `postcss-modules` plugin during compile. Please check the [documentation](https://github.com/madyankin/postcss-modules#usage) for full reference.

In addition, the following settings are available:

- `addClassesToHTML`

  Type: `boolean`. Default: `true`.

  The generated classes are injected into the HTML elements, so the styles are applied without having to assign them using JavaScript.

- `removeOriginalClasses`

  Type: `boolean`. Default: `false`.

  When enabled, the original classes are removed from HTML, keeping only the generated classes. Only applies if `addClassesToHTML` is enabled.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json
{
  "cssmodules": {
    "exportGlobals": true,
    "localsConvention": "camelCaseOnly",
    "addClassesToHTML": false
  }
}
```

## Limitations

Currently, loading external sources in [`composes`](https://github.com/css-modules/css-modules#composing-from-other-files) is not supported.

```css
/* you cannot do this */
.title {
  composes: title from 'https://example.com/styles.css';
}
```

If you get this working, [please create a pull request](https://github.com/live-codes/livecodes/pulls).

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  activeEditor: 'style',
  html: '<div class="page">\n <h1>Page Title</h1>\n <p class="small-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur similique facere facilis minima tempora.</p>\n</div>\n',
  css: ':global .page {\n padding: 20px;\n}\n\n.text {\n color: black;\n font-family: sans-serif;\n}\n\n.small-text {\n composes: text;\n font-size: 20px;\n}\n\n.large-text {\n composes: text;\n font-size: 40px;\n}\n\n.large-text:hover {\n color: red;\n}\n\n.title {\n composes: large-text;\n color: green;\n}\n',
  js: "import classes from './style.module.css';\n\ndocument.querySelector('h1').className = classes.title;\nconsole.log(classes);\n",
  processors: 'cssmodules',
  compiled: 'open',
};

<LiveCodes params={params} height="400"></LiveCodes>

## Links

- [CSS Modules](https://github.com/css-modules/css-modules)
- [postcss-modules](https://github.com/madyankin/postcss-modules)
- [PostCSS](https://postcss.org/)