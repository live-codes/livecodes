# IntelliSense

import LiveCodes from '../../src/components/LiveCodes.tsx';

The [code editor](./editor-settings.html.md)#code-editor) provides a rich experience with [intellisense](https://code.visualstudio.com/docs/editor/intellisense) and autocompletion. Many of the features required for this are based on TypeScript types that are either inferred by the editor or supplied as data definition files.

This not only works when the editor language is TypeScript, but also works with others like JavaScript and JSX.

Example:

![LiveCodes Autocomplete](../../static/img/screenshots/autocomplete.jpg)

## Types for imported npm packages

LiveCodes will try to automatically find type definitions for npm modules imported in the editor.

These are examples for automatically loading React types with autocomplete and hover info:

![LiveCodes Intellisense](../../static/img/screenshots/intellisense-1.jpg)

![LiveCodes Intellisense](../../static/img/screenshots/intellisense-2.jpg)

## TypeScript TwoSlash

The code editor supports [TypeScript TwoSlash](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ts-twoslasher). This can be very useful for debugging, sharing and teaching TypeScript.

This is supported in [JavaScript](../languages/javascript.html.md), [TypeScript](../languages/typescript.html.md), [JSX](../languages/jsx.html.md) and [TSX](../languages/tsx.html.md). This also includes [Babel](../languages/babel.html.md), [Sucrase](../languages/sucrase.html.md), [Solid](../languages/solid.html.md), [React Native](../languages/react-native.html.md), etc.

![TypeScript TwoSlash](../../static/img/screenshots/twoslash.jpg) <!-- http://127.0.0.1:8080/?x=id/npgxgngikwj -->

![TwoSlash in JSX](../../static/img/screenshots/twoslash-jsx.jpg) <!-- http://127.0.0.1:8080/?x=id/c9ttudp5b4x -->

## Custom Types

If no type definitions are found, or if you want to provide your own (e.g. for a module that is not hosted on npm), custom type definition files can be used.

In the standalone app, these can be provided in [custom settings](../advanced/custom-settings.html.md) using the `types` property. This takes an object with the key representing the module name and the value representing the URL of the file.

Example:

```json title="Custom Settings"
{
  "types": {
    "my-module": "https://cdn.jsdelivr.net/npm/my-module@1.0.0/types/my-module.d.ts",
    "my-other-module": "https://my-website.com/my-other-module/my-other-module.d.ts"
  }
}
```

For embedded playgrounds, these can be provided in the [configuration object](../configuration/configuration-object.html.md) using the [`types`](../configuration/configuration-object.html.md)#types) property.

This can be combined with the [`imports`](../configuration/configuration-object.html.md)#imports) property to provide [importmap](./module-resolution.html.md)#custom-module-resolution) for runtime implementation of your custom modules.

This is an example of how to create a playground that provides the implementation of the custom module: `my-module` and its type definition to provide editor intellisense:

```js
import { createPlayground } from 'livecodes';

const config = {
  activeEditor: 'script',
  script: {
    language: 'javascript',
    content: `import { foo } from 'my-module';\n\nconsole.log(foo());`
  };
  imports: {
    'my-module': 'https://my-website.com/my-module/index.js',
  },
  types: {
    'my-module': 'https://my-website.com/my-module/my-module.d.ts',
  },
};

createPlayground('#container', {config});
```

Please note that the URLs used for `types` and `imports` properties may be full URLs or [data URLs](./data-urls.html.md).

This can be of great use for library authors who want to provide playgrounds for documenting their libraries that are not (yet) published to npm.

## Demo

Let's assume we have this TypeScript module:

```ts title="Greeter.ts"
export class Greeter {
  private morningGreetings = ['Good morning', 'Have a good day', 'How are you today?'];
  private eveningGreetings = ['Good evening', 'Good night', 'Sleep well'];

  private randomSelector(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  public morning() {
    return this.randomSelector(this.morningGreetings);
  }

  public evening() {
    return this.randomSelector(this.eveningGreetings);
  }
}
```

which compiles to this JavaScript:

```js title="Greeter.js"
export class Greeter {
  constructor() {
    this.morningGreetings = ['Good morning', 'Have a good day', 'How are you today?'];
    this.eveningGreetings = ['Good evening', 'Good night', 'Sleep well'];
  }
  randomSelector(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  morning() {
    return this.randomSelector(this.morningGreetings);
  }
  evening() {
    return this.randomSelector(this.eveningGreetings);
  }
}
```

and this type definition:

```ts title="Greeter.d.ts"
export declare class Greeter {
  private morningGreetings;
  private eveningGreetings;
  private randomSelector;
  morning(): string;
  evening(): string;
}
```

The JavaScript output (Greeter.js) and the data definition file (Greeter.d.ts) should be hosted online or converted to data URLs (see [assets](./assets.html.md) and [data URLs](./data-urls.html.md)).

Then, they can be used like that:

export const customModules = {
  editor: 'monaco',
  activeEditor: 'script',
  script: {
    language: 'typescript',
    content:
      "import { Greeter } from 'my-greeter';\n\nconst greeter = new Greeter();\n// now `greeter` has autocomplete\n\ndocument.body.innerText = greeter.morning();\n\n// this should show error in the editor\n// Property 'morningGreetings' is private and only accessible within class 'Greeter'\nconsole.log(greeter.morningGreetings);",
  },
  imports: {
    'my-greeter':
      'data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNsYXNzIEdyZWV0ZXIgew0KICAgIGNvbnN0cnVjdG9yKCkgew0KICAgICAgICB0aGlzLm1vcm5pbmdHcmVldGluZ3MgPSBbJ0dvb2QgbW9ybmluZycsICdIYXZlIGEgZ29vZCBkYXknLCAnSG93IGFyZSB5b3UgdG9kYXk/J107DQogICAgICAgIHRoaXMuZXZlbmluZ0dyZWV0aW5ncyA9IFsnR29vZCBldmVuaW5nJywgJ0dvb2QgbmlnaHQnLCAnU2xlZXAgd2VsbCddOw0KICAgIH0NCiAgICByYW5kb21TZWxlY3RvcihhcnJheSkgew0KICAgICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07DQogICAgfQ0KICAgIG1vcm5pbmcoKSB7DQogICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNlbGVjdG9yKHRoaXMubW9ybmluZ0dyZWV0aW5ncyk7DQogICAgfQ0KICAgIGV2ZW5pbmcoKSB7DQogICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNlbGVjdG9yKHRoaXMuZXZlbmluZ0dyZWV0aW5ncyk7DQogICAgfQ0KfQ0K',
  },
  types: {
    'my-greeter':
      'data:text/typescript;charset=UTF-8;base64,ZXhwb3J0IGRlY2xhcmUgY2xhc3MgR3JlZXRlciB7DQogIHByaXZhdGUgbW9ybmluZ0dyZWV0aW5nczsNCiAgcHJpdmF0ZSBldmVuaW5nR3JlZXRpbmdzOw0KICBwcml2YXRlIHJhbmRvbVNlbGVjdG9yOw0KICBtb3JuaW5nKCk6IHN0cmluZzsNCiAgZXZlbmluZygpOiBzdHJpbmc7DQp9DQo=',
  },
};

<LiveCodes config={customModules} height="80vh" />

## Related

- [Module Resolution](./module-resolution.html.md)
- [Data Urls](./data-urls.html.md)
- [Assets](./assets.html.md)
- [Custom Settings](../advanced/custom-settings.html.md)
- [Configuration Object](../configuration/configuration-object.html.md)