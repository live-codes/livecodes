# Configuration Object

## TypeScript Types

TypeScript types are [documented here](../api/interfaces/Config.md) and can be imported from the library.

```ts
import type { Config } from 'livecodes';
```

## Project Content

These are properties that define the content of the current [project](../features/projects.md).

### `title`

[`string`](../api/interfaces/ContentConfig#title)

Default: `"Untitled Project"`

Project title. This is used as [result page](../features/result.md) title.

### `description`

[`string`](../api/interfaces/ContentConfig#description)

Default: `""`

Project description. Used in [project](../features/projects.md) search. This can be set in the UI from app menu → Project Info.

### `tags`

[`string[]`](../api/interfaces/ContentConfig#tags)

Default: `[]`

Project tags. Used in [project](../features/projects.md) filter and search. This can be set in the UI from app menu → Project Info.

### `activeEditor`

[`"markup" | "style" | "script" | undefined`](../api/interfaces/ContentConfig#activeeditor)

Default: Last used editor for user, otherwise "markup"

Selects the active editor to show.

### `languages`

[`Language[] | undefined`](../api/interfaces/ContentConfig#languages)

Default: all supported languages in full app and only current editor languages in [embeds](../features/embeds.md).

List of enabled languages. Languages that are not already loaded in the editors ([markup](#markup), [style](#style) and [script](#script)) can be selected from a drop down menu at the editor title.

![Change Language](../../static/img/screenshots/languages.jpg)

### `markup`

[`Editor`](../api/interfaces/Editor)

Default: `{ language: 'html', content: '' }`

Configures the language and content of the markup editor.

### `style`

[`Editor`](../api/interfaces/Editor)

Default: `{ language: 'css', content: '' }`

Configures the language and content of the style editor.

### `script`

[`Editor`](../api/interfaces/Editor)

Default: `{ language: 'javascript', content: '' }`

Configures the language and content of the script editor.

### `stylesheets`

[`string[]`](../api/interfaces/ContentConfig#stylesheets)

Default: `[]`

List of URLs for [external stylesheets](../features/external-css-js.md) to add to the [result page](../features/result.md).

### `scripts`

[`string[]`](../api/interfaces/ContentConfig#scripts)

Default: `[]`

List of URLs for [external scripts](../features/external-css-js.md) to add to the [result page](../features/result.md).

### `cssPreset`

[`"" | "normalize.css" | "reset-css"`](../api/interfaces/ContentConfig.md#csspreset)

Default: `""`

[CSS Preset](../features/css-presets.md) to use.

### `processors`

[`Processor[]`](../api/modules#processor)

Default: `[]`

List of enabled [CSS processors](../features/css-processors.md).

### `customSettings`

[`CustomSettings`](../api/interfaces/ContentConfig.md#customsettings)

Default: `{}`

Defines [custom settings](../advanced/custom-settings.md) for the current project.

### `imports`

### `types`

### `tests`

### `version`

## App Settings

### `readonly`

### `allowLangChange`

### `mode`

### `showVersion`

### `tools`

## User Settings

### `autoupdate`

### `autosave`

### `delay`

### `formatOnsave`

### `theme`

### `recoverUnsaved`

### `showSpacing`

### `editor`

### `fontFamily`

### `fontSize`

### `useTabs`

### `tabSize`

### `lineNumbers`

### `wordWrap`

### `closeBrackets`

### `emmet`

### `editorMode`

### `semicolons`

### `singleQuote`

### `trailingComma`
