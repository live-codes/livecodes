# Interface: AppConfig

These are properties that define how the app behaves.

## Extended by

- [`Config`](../../interfaces/Config.md)

## Properties

### allowLangChange

> **allowLangChange**: `boolean`

If `false`, the UI will not show the menu that allows changing editor language.

#### Default

```ts
true
```

#### Defined in

[models.ts:603](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L603)

***

### mode

> **mode**: `"editor"` \| `"result"` \| `"full"` \| `"focus"` \| `"lite"` \| `"simple"` \| `"codeblock"`

Sets the [display mode](https://livecodes.io/docs/features/display-modes).

#### Default

```ts
"full"
```

#### Defined in

[models.ts:615](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L615)

***

### readonly

> **readonly**: `boolean`

If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.

By default, when readonly is set to true, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used.
If you wish to use another editor, set the [editor](https://livecodes.io/docs/configuration/configuration-object#editor) property.

#### Default

```ts
false
```

#### Defined in

[models.ts:597](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L597)

***

### tools

> **tools**: `Partial`\<`object`\>

Sets enabled and active tools and status of [tools pane](https://livecodes.io/docs/features/tools-pane).

#### Type declaration

##### active

> **active**: `""` \| `"console"` \| `"compiled"` \| `"tests"`

##### enabled

> **enabled**: (`"console"` \| `"compiled"` \| `"tests"`)[] \| `"all"`

##### status

> **status**: [`ToolsPaneStatus`](../type-aliases/ToolsPaneStatus.md)

#### Default

```ts
{ enabled: "all", active: "", status: "" }
```

#### Example

```js
{
  "tools": {
    "enabled": ["console", "compiled"],
    "active": "console",
    "status": "open"
  }
}
```

#### Defined in

[models.ts:631](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L631)

***

### view?

> `optional` **view**: `"split"` \| `"editor"` \| `"result"`

Sets the [default view](https://livecodes.io/docs/features/default-view) for the playground.

#### Default

```ts
"split"
```

#### Defined in

[models.ts:609](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L609)

***

### zoom

> **zoom**: `0.25` \| `0.5` \| `1`

Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).

#### Defined in

[models.ts:640](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L640)