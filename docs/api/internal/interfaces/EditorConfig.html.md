# Interface: EditorConfig

## Extended by

- [`UserConfig`](UserConfig.md)

## Properties

### closeBrackets

> **closeBrackets**: `boolean`

Use auto-complete to close brackets and quotes.

#### Default

```ts
true
```

#### Defined in

[models.ts:791](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L791)

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

#### Defined in

[models.ts:718](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L718)

***

### editorMode

> **editorMode**: `undefined` \| `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

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

#### Defined in

[models.ts:808](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L808)

***

### fontFamily

> **fontFamily**: `undefined` \| `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

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

#### Defined in

[models.ts:757](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L757)

***

### lineNumbers

> **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

#### Default

```ts
true
```

#### Defined in

[models.ts:779](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L779)

***

### tabSize

> **tabSize**: `number`

The number of spaces per indentation-level.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
2
```

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

#### Defined in

[models.ts:731](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L731)

***

### useTabs

> **useTabs**: `boolean`

If `true`, lines are indented with tabs instead of spaces.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
false
```

#### Defined in

[models.ts:765](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L765)

***

### wordWrap

> **wordWrap**: `boolean`

Enables word-wrap for long lines.

#### Default

```ts
false
```

#### Defined in

[models.ts:785](https://github.com/live-codes/livecodes/blob/74dabade5b38ddc0aa3c7fcab9dac740d9af1548/src/sdk/models.ts#L785)