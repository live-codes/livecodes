# CSS Modules

A [CSS Module](https://github.com/css-modules/css-modules) is a CSS file in which all class names and animation names are scoped locally by default.

The selector names are unique to avoid naming collision. They can then be imported as a JavaScript object.

## Usage

CSS Modules can be enabled from the style editor menu.

Selectors added to the style editor (using any language e.g. CSS, SCSS, Less, etc.) are transformed to unique selectors. The transformed classes are then accessible in the script editor as a JSON object.

**Example:**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="source" label="Source" default>

```css
:global .page {
  padding: 20px;
}

.large-text {
  color: black;
  font-size: 40px;
}

.large-text:hover {
  color: red;
}

.title {
  composes: large-text;
  color: green;
}

.article {
  font-size: 16px;
}
```

  </TabItem>
  <TabItem value="compiled" label="Compiled">

```css
.page {
  padding: 20px;
}

._large-text_nk3ao_9 {
  color: black;
  font-size: 40px;
}

._large-text_nk3ao_9:hover {
  color: red;
}

._title_nk3ao_27 {
  color: green;
}

._article_nk3ao_37 {
  font-size: 16px;
}
```

  </TabItem>
  <TabItem value="json" label="JSON Object">

```json
{
  "large-text": "_large-text_nk3ao_9",
  "title": "_title_nk3ao_27 _large-text_nk3ao_9",
  "article": "_article_nk3ao_37",
  "largeText": "_large-text_nk3ao_9"
}
```

  </TabItem>
</Tabs>

In the script editor, the JSON object representing the transformed classes can be imported from the relative URLs `'./style.module.css'` or `'./styles.module.css'`.

[Default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#default_import), [named](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import) and [namespace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) imports are supported. Class names are available in camelCase (e.g `.large-text` becomes `largeText`).

**Example:**

```js
import classes from './style.module.css';
import { article } from './styles.module.css';
import * as allClasses from './styles.module.css';

console.log(classes.title);
console.log(article);
console.log(allClasses.largeText);
```

For full example, see [example usage](#example-usage) below.

:::info

CSS Modules has to be enabled (from style editor menu), to be able to import classes in the script editor.

Importing a URL that does not include `.module` (e.g. `./style.css`) gets the processed CSS **string** as the module's default export.

The extension of the style editor language can also be used, in addition to `.css`. For example, when using `SCSS`, importing from any of the following URLs is the same:

- `./style.module.css`
- `./styles.module.css`
- `./style.module.scss`
- `./styles.module.scss`

:::

## Language Info

### Name

`cssmodules`

### Type

[Processor](../features/css-processors.md)

### Editor

`style`

## Compiler

The CSS Modules processor is provided using [postcss-modules](https://github.com/madyankin/postcss-modules) as a [PostCSS](./postcss.md) plugin.

### Version

`postcss-modules`: v6.0.0

## Custom Settings

[Custom settings](../advanced/custom-settings.md) added to the property `cssmodules` are passed as a JSON object to the `postcss-modules` plugin. Please check the [documentation](https://github.com/madyankin/postcss-modules#usage) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json
{
  "cssmodules": {
    "exportGlobals": true,
    "localsConvention": "camelCaseOnly"
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

export const config = {
activeEditor: 'style',
markup: {
language: 'html', content: '<div class="page">\n <p>Title in large text</p>\n</div>\n'
},
style: {
language: 'css',
content: ':global .page {\n padding: 10px;\n}\n\n.large-text {\n color: black;\n font-size: 40px;\n}\n\n.large-text:hover {\n color: red;\n}\n\n.title {\n composes: large-text;\n color: green;\n}\n'
},
script: {
language: 'javascript',
content: 'import classes from "./style.module.css";\n\nconst title = document.querySelector(".page p");\ntitle.className = classes.title;'
},
processors: ['cssmodules'],
tools: {
status: 'open',
active: 'compiled',
enabled: 'all'
}
};

export const params = {
activeEditor: 'style',
html: '<div class="page">\n <p>Title in large text</p>\n</div>\n',
css: ':global .page {\n padding: 10px;\n}\n\n.large-text {\n color: black;\n font-size: 40px;\n}\n\n.large-text:hover {\n color: red;\n}\n\n.title {\n composes: large-text;\n color: green;\n}\n',
js: 'import classes from "./style.module.css";\n\nconst title = document.querySelector(".page p");\ntitle.className = classes.title;\nconsole.log(classes.title);',
processors: 'cssmodules',
compiled: 'open',
};

<LiveCodes params={params} height="400"></LiveCodes>

## Links

- [CSS Modules](https://github.com/css-modules/css-modules)
- [postcss-modules](https://github.com/madyankin/postcss-modules)
- [PostCSS](https://postcss.org/)
