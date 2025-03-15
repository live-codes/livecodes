# Data URLs

> **Data URLs**, URLs prefixed with the `data:` scheme, allow content creators to embed small files inline in documents.
>
> — [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

Sometimes, you need to use an external file (e.g. script, stylesheet) that is not hosted online. In this case, you can use data URLs to embed the file in your code. These can then be used similar to regular URLs (e.g. for `<script src>`, `<link href>`, import URL, etc.).

LiveCodes UI allows creating and consuming these data URLs.

## Creating data URLs

Data URLs can be created from:

### Assets

For local files on user's device.

[Assets screen](./assets.html.md) can be accessed from Settings menu → Assets. This works for any file type, including text files (e.g. stylesheets or scripts) and binary files like images. Generated data URLs are saved locally in the user's browser storage and are available across projects.

### "Copy code as data URL" button

For code in code editor.

The button can be found in the editor toolbar, below the code editor. This copies the code of the active editor as data URL to the clipboard.

The content is base64-encoded. Unicode content is appropriately encoded (see [The "Unicode Problem"](https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem)).

## Consuming data URLs

Data URLs can be used anywhere you use a regular URL (e.g. for `<script src>`, `<link href>`, import URL, etc.).

In addition, LiveCodes supports [importing](./import.html.md) data URLs, like other URLs. If the language is detected, it is loaded in the appropriate editor (e.g. `data:text/typescript;charset=UTF-8;base64,....` is detected as TypeScript).

:::caution

Depending on the browser, there may be [length limitations](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#common_problems) on URLs. So, it is generally recommended to use data URLs for small files.

For large files, it is better to host these online. LiveCodes allows hosting assets on [GitHub Pages](https://pages.github.com/) (see [assets](./assets.html.md)).

:::

## Example

If we add this this in script editor:

```js
export const sayHello = (name) => 'Hello ' + name;
```

then copy it as data URL, we will get:

`data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IHNheUhlbGxvID0gKG5hbWUpID0+ICdIZWxsbyAnICsgbmFtZTs=`.

This can be used (e.g. in another project) like this:

```js
import { sayHello } from 'data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IHNheUhlbGxvID0gKG5hbWUpID0+ICdIZWxsbyAnICsgbmFtZTs=';

console.log(sayHello('Ali'));
```

## Related

- [Data URLs (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)
- [Assets](./assets.html.md)
- [Import](./import.html.md)
- [External Resources](./external-resources.html.md)
- [Module resolution](./module-resolution.html.md)
- [CSS](./css.html.md)