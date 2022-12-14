# Query Parameters

import LiveCodes from '../../src/components/LiveCodes.tsx';

A flexible and convient way to configure the app is to use URL query parameters.
It allows configuration of a wide range of options, including those of the [configuration object](./configuration-object.md) and [embed options](../advanced/api.md#embed-options).

Example:

```
https://livecodes.io?js=console.log('Hello World!')&console=open
```

<LiveCodes query="js=console.log('Hello World!')&console=open"></LiveCodes>

## Usage

- All properties of [configuration object](./configuration-object.md) and [embed options](../advanced/api.md#embed-options) that have values of primitive types (e.g. string, number, boolean) can be used as usual.

  These include:
  [config](../advanced/api.md#config),
  [import](../advanced/api.md#import),
  [lite](../advanced/api.md#lite),
  [loading](../advanced/api.md#loading),
  [template](../advanced/api.md#template),
  [view](../advanced/api.md#view),
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

- Values set in the URL query parameters ovverride those set in [configuration object](./configuration-object.md).

- Unlike [user settings](../features/user-settings.md) that are set in the UI which are saved and subsequently used, those that are set in query parameters are not automatically saved.
