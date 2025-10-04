# Query Parameters

import LiveCodes from '../../src/components/LiveCodes.tsx';

A flexible and convenient way to configure the app is to use URL query parameters.
It allows configuration of a wide range of options, including those of the [configuration object](./configuration-object.html.md) and [embed options](../sdk/js-ts.html.md)#embed-options).

<div style={{ clear: 'both' }}></div>
Example:

```
https://livecodes.io?js=console.log('Hello World!')&console=open
```

<LiveCodes params={{ js: "console.log('Hello World!')", console: 'open' }}></LiveCodes>

## Usage

- All properties of [configuration object](./configuration-object.html.md) and [embed options](../sdk/js-ts.html.md)#embed-options) that have values of primitive types (e.g. string, number, boolean) can be assigned to a query parameter with the same name.

  These include:
  [config](../sdk/js-ts.html.md)#config),
  [import](../sdk/js-ts.html.md)#import),
  [lite](../configuration/configuration-object.html.md)#mode),
  [loading](../sdk/js-ts.html.md)#loading),
  [template](../sdk/js-ts.html.md)#template),
  [view](../configuration/configuration-object.html.md)#view),
  [title](./configuration-object.html.md)#title),
  [description](./configuration-object.html.md)#description),
  [activeEditor](./configuration-object.html.md)#activeeditor),
  [cssPreset](./configuration-object.html.md)#csspreset),
  [readonly](./configuration-object.html.md)#readonly),
  [allowLangChange](./configuration-object.html.md)#allowlangchange),
  [mode](./configuration-object.html.md)#mode),
  [autoupdate](./configuration-object.html.md)#autoupdate),
  [autosave](./configuration-object.html.md)#autosave),
  [delay](./configuration-object.html.md)#delay),
  [formatOnsave](./configuration-object.html.md)#formatonsave),
  [theme](./configuration-object.html.md)#theme),
  [themeColor](./configuration-object.html.md)#themecolor),
  [appLanguage](./configuration-object.html.md)#applanguage),
  [recoverUnsaved](./configuration-object.html.md)#recoverunsaved),
  [welcome](./configuration-object.html.md)#welcome),
  [showSpacing](./configuration-object.html.md)#showspacing),
  [layout](./configuration-object.html.md)#layout),
  [editor](./configuration-object.html.md)#editor),
  [editorTheme](./configuration-object.html.md)#editortheme),
  [fontFamily](./configuration-object.html.md)#fontfamily),
  [fontSize](./configuration-object.html.md)#fontsize),
  [useTabs](./configuration-object.html.md)#usetabs),
  [tabSize](./configuration-object.html.md)#tabsize),
  [lineNumbers](./configuration-object.html.md)#linenumbers),
  [wordWrap](./configuration-object.html.md)#wordwrap),
  [closeBrackets](./configuration-object.html.md)#closebrackets),
  [emmet](./configuration-object.html.md)#emmet),
  [editorMode](./configuration-object.html.md)#editormode),
  [semicolons](./configuration-object.html.md)#semicolons),
  [singleQuote](./configuration-object.html.md)#singlequote),
  [trailingComma](./configuration-object.html.md)#trailingcomma).

  Example:

  ```
  ?theme=light&delay=500&lineNumbers=false
  ```

- Any value given for booleans except `"false"` (including no value) will be considered `true`.

  Example: all these are considered `true`

  ```
  ?lite=true
  ?lite=1
  ?lite=any
  ?lite
  ```

  while this is considered `false`

  ```
  ?lite=false
  ```

- Parameters that expect array of values can be supplied with comma separated values. These include:
  [tags](./configuration-object.html.md)#tags),
  [languages](./configuration-object.html.md)#languages),
  [processors](./configuration-object.html.md)#processors),
  [stylesheets](./configuration-object.html.md)#stylesheets),
  [scripts](./configuration-object.html.md)#scripts).

  Example:

  ```
  ?processors=tailwindcss,autoprefixer
  ```

- Custom Settings can be set like this:

  ```
  ?customSettings={template:{prerender:false}}
  ```

  or this:

  ```
  ?customSettings.template.prerender=false
  ```

- Values set in the URL query parameters override those set in [configuration object](./configuration-object.html.md).

- Unlike [user settings](../features/user-settings.html.md) that are set in the UI which are saved and subsequently used, those that are set in query parameters are not automatically saved.

- Additional query parameters include:

  - `no-defaults`: `boolean` (Default: `false`).

    If `true`, the app will not load the [default template/language](../features/default-template-language.html.md).

  - `x`: `string`.

    Alias to [`import`](../sdk/js-ts.html.md)#import) (a URL to [import](../features/import.html.md)).

  - `files`: `string`.

    A comma-separated [list of files to import](../features/import.html.md)#file-selection).

  - `raw`: [`Language`](../api/type-aliases/Language.md).

    When used with `import` or `x`, imports the URL as code of the provided language.

  - `language`: [`Language`](../api/type-aliases/Language.md).

    The language to load by default in the editor.

  - `lang`: [`Language`](../api/type-aliases/Language.md).

    Alias to `language`.

  - `active`: `"markup" | "style" | "script" | 0 | 1 | 2`.

    Alias to [`activeEditor`](./configuration-object.html.md)#activeeditor).

  - `tools`: `"open" | "full" | "closed" | "console" | "compiled" | "tests" | "none"`

    The [tools pane](../features/tools-pane.html.md) status.

  - `console`: `"open" | "full" | "closed" | "none"`

    The [console](../features/console.html.md) status.

  - `compiled`: `"open" | "full" | "closed" | "none"`

    The [compiled code viewer](../features/compiled-code.html.md) status.

  - `tests`: `"open" | "full" | "closed" | "none"`

    The [tests panel](../features/tests.html.md) status.

  - `scrollPosition`: `boolean` (Default: `true`).

    If `false`, the [result page](../features/result.html.md) [scroll position](../features/result.html.md)#scroll-position) will not be maintained after reload.

  - Any [`Language`](../api/type-aliases/Language.md) can used as a query parameter, and the value will be used as its code.

    Example:

    ```
    https://livecodes.io?js=console.log('Hello World!')
    ```

:::info Examples
For usage examples, check [storybook](pathname:///../stories/?path=/story/embed-options-params--select-language) and [unit tests](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/config/__tests__/build-config.spec.ts).
:::

{/* TODO: add docs for languageSelector and ToolsStatus */}