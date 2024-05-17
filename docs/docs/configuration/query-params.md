# Query Parameters

import LiveCodes from '../../src/components/LiveCodes.tsx';

A flexible and convenient way to configure the app is to use URL query parameters.
It allows configuration of a wide range of options, including those of the [configuration object](./configuration-object.md) and [embed options](../sdk/js-ts.md#embed-options).

<div style={{clear: 'both'}}></div>
Example:

```
https://livecodes.io?js=console.log('Hello World!')&console=open
```

<LiveCodes params={{js: "console.log('Hello World!')", console: 'open'}}></LiveCodes>

## Usage

- All properties of [configuration object](./configuration-object.md) and [embed options](../sdk/js-ts.md#embed-options) that have values of primitive types (e.g. string, number, boolean) can be assigned to a query parameter with the same name.

  These include:
  [config](../sdk/js-ts.md#config),
  [import](../sdk/js-ts.md#import),
  [lite](../sdk/js-ts.md#lite),
  [loading](../sdk/js-ts.md#loading),
  [template](../sdk/js-ts.md#template),
  [view](../sdk/js-ts.md#view),
  [title](./configuration-object.md#title),
  [description](./configuration-object.md#description),
  [activeEditor](./configuration-object.md#activeEditor),
  [cssPreset](./configuration-object.md#cssPreset),
  [readonly](./configuration-object.md#readonly),
  [allowLangChange](./configuration-object.md#allowLangChange),
  [mode](./configuration-object.md#mode),
  [autoupdate](./configuration-object.md#autoupdate),
  [autosave](./configuration-object.md#autosave),
  [delay](./configuration-object.md#delay),
  [formatOnsave](./configuration-object.md#formatOnsave),
  [theme](./configuration-object.md#theme),
  [recoverUnsaved](./configuration-object.md#recoverUnsaved),
  [showSpacing](./configuration-object.md#showSpacing),
  [editor](./configuration-object.md#editor),
  [fontFamily](./configuration-object.md#fontFamily),
  [fontSize](./configuration-object.md#fontSize),
  [useTabs](./configuration-object.md#useTabs),
  [tabSize](./configuration-object.md#tabSize),
  [lineNumbers](./configuration-object.md#lineNumbers),
  [wordWrap](./configuration-object.md#wordWrap),
  [closeBrackets](./configuration-object.md#closeBrackets),
  [emmet](./configuration-object.md#emmet),
  [editorMode](./configuration-object.md#editorMode),
  [semicolons](./configuration-object.md#semicolons),
  [singleQuote](./configuration-object.md#singleQuote),
  [trailingComma](./configuration-object.md#trailingComma).

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
  [tags](./configuration-object.md#tags),
  [languages](./configuration-object.md#languages),
  [processors](./configuration-object.md#processors),
  [stylesheets](./configuration-object.md#stylesheets),
  [scripts](./configuration-object.md#scripts).

  Example:

  ```
  ?languages=html,md,css,ts
  ```

- Values set in the URL query parameters override those set in [configuration object](./configuration-object.md).

- Unlike [user settings](../features/user-settings.md) that are set in the UI which are saved and subsequently used, those that are set in query parameters are not automatically saved.

- Additional query parameters include:

  - `no-defaults`: `boolean` (Default: `false`).

    If `true`, the app will not load the [default template/language](../features/default-template-language.md).

  - `x`: `string`.

    Alias to [`import`](../sdk/js-ts.md#import) (a URL to [import](../features/import.md)).

  - `files`: `string`.

    A comma-separated [list of files to import](../features/import.md#file-selection).

  - `raw`: [`Language`](../api/modules/internal.md#language).

    When used with `import` or `x`, imports the URL as code of the provided language.

  - `language`: [`Language`](../api/modules/internal.md#language).

    The language to load by default in the editor.

  - `lang`: [`Language`](../api/modules/internal.md#language).

    Alias to `language`.

  - `active`: `"markup" | "style" | "script" | 0 | 1 | 2`.

    Alias to [`activeEditor`](./configuration-object.md#activeEditor).

  - `tools`: `"open" | "full" | "closed" | "console" | "compiled" | "tests" | "none"`

    The [tools pane](../features/tools-pane.md) status.

  - `console`: `"open" | "full" | "closed" | "none"`

    The [console](../features/console.md) status.

  - `compiled`: `"open" | "full" | "closed" | "none"`

    The [compiled code viewer](../features/compiled-code.md) status.

  - `tests`: `"open" | "full" | "closed" | "none"`

    The [tests panel](../features/tests.md) status.

  - `scrollPosition`: `boolean` (Default: `true`).

    If `false`, the [result page](../features/result.md) [scroll position](../features/result.md#scroll-position) will not be maintained after reload.

  - Any [`Language`](../api/modules/internal.md#language) can used as a query parameter, and the value will be used as its code.

    Example:

    ```
    https://livecodes.io?js=console.log('Hello World!')
    ```

:::info Examples
For usage examples, check [storybook](pathname:///../stories/?path=/story/embed-options-params--select-language) and [unit tests](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/config/__tests__/build-config.spec.ts).
:::

<!-- TODO: add docs for languageSelector and ToolsStatus -->
