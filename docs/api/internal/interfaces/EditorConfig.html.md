# Interface: EditorConfig

Configuration for code editor settings.

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

[src/sdk/models.ts:930](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L930)

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

[src/sdk/models.ts:851](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L851)

***

### editorMode

> **editorMode**: `undefined` \| `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

#### Defined in

[src/sdk/models.ts:947](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L947)

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

[src/sdk/models.ts:877](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L877)

***

### emmet

> **emmet**: `boolean`

Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).

#### Default

```ts
true
```

#### Defined in

[src/sdk/models.ts:942](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L942)

***

### foldRegions

> **foldRegions**: `boolean`

When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.

#### Default

```ts
false
```

#### Defined in

[src/sdk/models.ts:924](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L924)

***

### fontFamily

> **fontFamily**: `undefined` \| `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

#### Defined in

[src/sdk/models.ts:882](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L882)

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

[src/sdk/models.ts:890](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L890)

***

### lineNumbers

> **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

#### Default

```ts
true
```

#### Defined in

[src/sdk/models.ts:912](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L912)

***

### minimap

> **minimap**: `boolean`

Enables minimap in code editor.

#### Default

```ts
false
```

#### Defined in

[src/sdk/models.ts:936](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L936)

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

[src/sdk/models.ts:906](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L906)

***

### theme

> **theme**: [`Theme`](../type-aliases/Theme.md)

Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.

#### Default

```ts
"dark"
```

#### Defined in

[src/sdk/models.ts:857](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L857)

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

[src/sdk/models.ts:864](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L864)

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

[src/sdk/models.ts:898](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L898)

***

### wordWrap

> **wordWrap**: `boolean`

Enables word-wrap for long lines.

#### Default

```ts
false
```

#### Defined in

[src/sdk/models.ts:918](https://github.com/live-codes/livecodes/blob/1fff173950709dd2999dfb8e56eea413d185caf3/src/sdk/models.ts#L918)