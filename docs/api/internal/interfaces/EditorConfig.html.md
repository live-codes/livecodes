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

[models.ts:801](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L801)

***

### editor

> **editor**: `undefined` \| `"auto"` \| `"monaco"` \| `"codemirror"` \| `"codejar"`

Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.

If `undefined` (the default), Monaco editor is used on desktop,
CodeMirror is used on mobile and in `simple` mode,
while CodeJar is used in `codeblock` mode, in `lite` mode and in `readonly` playgrounds.

If set to `auto`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.

#### Default

```ts
undefined
```

#### Defined in

[models.ts:722](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L722)

***

### editorMode

> **editorMode**: `undefined` \| `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

#### Defined in

[models.ts:812](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L812)

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

[models.ts:748](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L748)

***

### emmet

> **emmet**: `boolean`

Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).

#### Default

```ts
true
```

#### Defined in

[models.ts:807](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L807)

***

### foldRegions

> **foldRegions**: `boolean`

When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.

#### Default

```ts
false
```

#### Defined in

[models.ts:795](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L795)

***

### fontFamily

> **fontFamily**: `undefined` \| `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

#### Defined in

[models.ts:753](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L753)

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

[models.ts:761](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L761)

***

### lineNumbers

> **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

#### Default

```ts
true
```

#### Defined in

[models.ts:783](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L783)

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

[models.ts:777](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L777)

***

### theme

> **theme**: [`Theme`](../type-aliases/Theme.md)

Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.

#### Default

```ts
"dark"
```

#### Defined in

[models.ts:728](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L728)

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

[models.ts:735](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L735)

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

[models.ts:769](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L769)

***

### wordWrap

> **wordWrap**: `boolean`

Enables word-wrap for long lines.

#### Default

```ts
false
```

#### Defined in

[models.ts:789](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L789)