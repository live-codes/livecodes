# Interface: Code

An object that contains the language, content and compiled code for each of the 3 [code editors](https://livecodes.io/docs/features/projects)
and the [result page](https://livecodes.io/docs/features/result) HTML.

See [docs](https://livecodes.io/docs/api/interfaces/Code) for details.

## Properties

### markup

> **markup**: `object`

Markup editor code.

#### compiled

> **compiled**: `string`

The compiled code.

#### content

> **content**: `string`

The source code.

#### language

> **language**: [`Language`](../type-aliases/Language.md)

The language of the code.

#### Defined in

[src/sdk/models.ts:1276](https://github.com/live-codes/livecodes/blob/a9e1ee5301dfecfbec8fbeb82682e7aac5851e35/src/sdk/models.ts#L1276)

***

### result

> **result**: `string`

The HTML content of the result page.

#### Defined in

[src/sdk/models.ts:1303](https://github.com/live-codes/livecodes/blob/a9e1ee5301dfecfbec8fbeb82682e7aac5851e35/src/sdk/models.ts#L1303)

***

### script

> **script**: `object`

Script editor code.

#### compiled

> **compiled**: `string`

The compiled code.

#### content

> **content**: `string`

The source code.

#### language

> **language**: [`Language`](../type-aliases/Language.md)

The language of the code.

#### Defined in

[src/sdk/models.ts:1294](https://github.com/live-codes/livecodes/blob/a9e1ee5301dfecfbec8fbeb82682e7aac5851e35/src/sdk/models.ts#L1294)

***

### style

> **style**: `object`

Style editor code.

#### compiled

> **compiled**: `string`

The compiled code.

#### content

> **content**: `string`

The source code.

#### language

> **language**: [`Language`](../type-aliases/Language.md)

The language of the code.

#### Defined in

[src/sdk/models.ts:1285](https://github.com/live-codes/livecodes/blob/a9e1ee5301dfecfbec8fbeb82682e7aac5851e35/src/sdk/models.ts#L1285)