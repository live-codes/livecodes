# Interface: UserConfig

## Extends

- [`EditorConfig`](EditorConfig.md).[`FormatterConfig`](FormatterConfig.md)

## Extended by

- [`Config`](../../interfaces/Config.md)

## Properties

### appLanguage

> **appLanguage**: `undefined` \| [`AppLanguage`](../type-aliases/AppLanguage.md)

Sets the app UI language used.

#### Defined in

[models.ts:707](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L707)

***

### autosave

> **autosave**: `boolean`

If `true`, the project is automatically saved on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

#### Default

```ts
false
```

#### Defined in

[models.ts:656](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L656)

***

### autotest

> **autotest**: `boolean`

If `true`, the project is watched for code changes which trigger tests to auto-run.

#### Default

```ts
false
```

#### Defined in

[models.ts:662](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L662)

***

### autoupdate

> **autoupdate**: `boolean`

If `true`, the result page is automatically updated on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

#### Default

```ts
true
```

#### Defined in

[models.ts:649](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L649)

***

### closeBrackets

> **closeBrackets**: `boolean`

Use auto-complete to close brackets and quotes.

#### Default

```ts
true
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`closeBrackets`](EditorConfig.md#closebrackets)

#### Defined in

[models.ts:791](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L791)

***

### delay

> **delay**: `number`

Time delay (in milliseconds) following code change,
after which the result page is updated (if [`autoupdate`](https://livecodes.io/docs/configuration/configuration-object#autoupdate) is `true`)
and/or the project is saved (if [`autosave`](https://livecodes.io/docs/configuration/configuration-object#autosave) is `true`).

#### Default

```ts
1500
```

#### Defined in

[models.ts:670](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L670)

***

### editor

> **editor**: `undefined` \| `"monaco"` \| `"codemirror"` \| `"codejar"`

Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.

If `undefined` (the default), Monaco editor is used on desktop, CodeMirror is used on mobile
and CodeJar is used in codeblocks, in lite mode and in readonly playgrounds.

#### Default

```ts
undefined
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`editor`](EditorConfig.md#editor)

#### Defined in

[models.ts:718](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L718)

***

### editorMode

> **editorMode**: `undefined` \| `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`editorMode`](EditorConfig.md#editormode)

#### Defined in

[models.ts:802](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L802)

***

### editorTheme

> **editorTheme**: `undefined` \| `string` \| [`EditorTheme`](../type-aliases/EditorTheme.md)[]

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) themes.

See docs for [editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme) for details.

#### Examples

```ts
"vs"
```

```ts
"monaco:twilight, codemirror:one-dark"
```

```ts
["vs@light"]
```

```ts
["vs@light", "vs-dark@dark"]
```

```ts
["monaco:vs@light", "codemirror:github-light@light", "dracula@dark"]
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`editorTheme`](EditorConfig.md#editortheme)

#### Defined in

[models.ts:744](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L744)

***

### emmet

> **emmet**: `boolean`

Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).

#### Default

```ts
true
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`emmet`](EditorConfig.md#emmet)

#### Defined in

[models.ts:797](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L797)

***

### enableAI

> **enableAI**: `boolean`

If `true`, [AI code assistant](https://livecodes.io/docs/features/ai) is enabled.

#### Default

```ts
false
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`enableAI`](EditorConfig.md#enableai)

#### Defined in

[models.ts:808](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L808)

***

### fontFamily

> **fontFamily**: `undefined` \| `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`fontFamily`](EditorConfig.md#fontfamily)

#### Defined in

[models.ts:749](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L749)

***

### fontSize

> **fontSize**: `undefined` \| `number`

Sets the font size.

If `undefined` (the default), the font size is set to 14 for the full app and 12 for [embeds](https://livecodes.io/docs/features/embeds).

#### Default

```ts
undefined
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`fontSize`](EditorConfig.md#fontsize)

#### Defined in

[models.ts:757](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L757)

***

### formatOnsave

> **formatOnsave**: `boolean`

If `true`, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.

#### Default

```ts
false
```

#### Defined in

[models.ts:676](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L676)

***

### layout

> **layout**: `undefined` \| `"horizontal"` \| `"vertical"` \| `"responsive"`

Sets the app layout to horizontal or vertical.
If set to `"responsive"` (the default) or `undefined`,
the layout is vertical in small screens when the playground height is larger than its width,
otherwise horizontal.

#### Default

```ts
"responsive"
```

#### Defined in

[models.ts:685](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L685)

***

### lineNumbers

> **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

#### Default

```ts
true
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`lineNumbers`](EditorConfig.md#linenumbers)

#### Defined in

[models.ts:779](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L779)

***

### recoverUnsaved

> **recoverUnsaved**: `boolean`

Enables [recovering last unsaved project](https://livecodes.io/docs/features/recover) when the app is reopened.

#### Default

```ts
true
```

#### Defined in

[models.ts:691](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L691)

***

### semicolons

> **semicolons**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use semi-colons.

#### Default

```ts
true
```

#### Inherited from

[`FormatterConfig`](FormatterConfig.md).[`semicolons`](FormatterConfig.md#semicolons)

#### Defined in

[models.ts:828](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L828)

***

### showSpacing

> **showSpacing**: `boolean`

Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.

#### Default

```ts
false
```

#### Defined in

[models.ts:697](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L697)

***

### singleQuote

> **singleQuote**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.

#### Default

```ts
false
```

#### Inherited from

[`FormatterConfig`](FormatterConfig.md).[`singleQuote`](FormatterConfig.md#singlequote)

#### Defined in

[models.ts:833](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L833)

***

### tabSize

> **tabSize**: `number`

The number of spaces per indentation-level.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
2
```

#### Inherited from

[`FormatterConfig`](FormatterConfig.md).[`tabSize`](FormatterConfig.md#tabsize)

#### Defined in

[models.ts:773](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L773)

***

### theme

> **theme**: [`Theme`](../type-aliases/Theme.md)

Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.

#### Default

```ts
"dark"
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`theme`](EditorConfig.md#theme)

#### Defined in

[models.ts:724](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L724)

***

### themeColor

> **themeColor**: `undefined` \| `string`

Sets the app theme color.
If `undefined`, it is set to `"hsl(214, 40%, 50%)"`.

#### Default

```ts
undefined
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`themeColor`](EditorConfig.md#themecolor)

#### Defined in

[models.ts:731](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L731)

***

### trailingComma

> **trailingComma**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use [trailing commas](https://prettier.io/docs/en/options.html#trailing-commas).

#### Default

```ts
true
```

#### Inherited from

[`FormatterConfig`](FormatterConfig.md).[`trailingComma`](FormatterConfig.md#trailingcomma)

#### Defined in

[models.ts:839](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L839)

***

### useTabs

> **useTabs**: `boolean`

If `true`, lines are indented with tabs instead of spaces.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
false
```

#### Inherited from

[`FormatterConfig`](FormatterConfig.md).[`useTabs`](FormatterConfig.md#usetabs)

#### Defined in

[models.ts:765](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L765)

***

### welcome

> **welcome**: `boolean`

If `true`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.

#### Defined in

[models.ts:702](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L702)

***

### wordWrap

> **wordWrap**: `boolean`

Enables word-wrap for long lines.

#### Default

```ts
false
```

#### Inherited from

[`EditorConfig`](EditorConfig.md).[`wordWrap`](EditorConfig.md#wordwrap)

#### Defined in

[models.ts:785](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L785)