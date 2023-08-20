# Projects

A _LiveCodes_ project is a combination of markup, styles & scripts that result in a **single web page**. Check the section about the [Result Page](./result.md) to have more details about how this page is constructed.

There is no concept of file system or, for example, organizing multiple files in a directory structure of a single project.

:::info Simple Concept
code in [markup editor](#markup-editor) + code in [style editor](#style-editor) + code in [script editor](#script-editor) + [external resources](./external-resources.md) => [result page](./result.md)
:::

## Markup Editor

Code added in this editor eventually represents the page markup (HTML).

Examples for languages supported include HTML, Markdown, Pug, Haml.

## Style Editor

Code added in this editor eventually represents the page styles (CSS).

Examples for languages supported include CSS, SCSS, SASS, Less, Stylus. In addition, many CSS processors are supported (e.g. Autoprefixer, postcss-preset-env, postcss-import-url, PurgeCSS, Tailwind CSS).

## Script Editor

Code added in this editor eventually represents the page scripts.

These are either:

- Languages compiled to JavaScript (e.g TypeScript, JSX, CoffeeScript)
- Languages that are interpreted by a JavaScript runtime (e.g. PHP - interpreted by [Uniter runtime](https://github.com/asmblah/uniter), Scheme - interpreted by [BiwaScheme](https://www.biwascheme.org))
- Languages running in WASM (e.g. Python - [Pyodide](https://pyodide.org/), AssemblyScript).

For the full list of supported languages, check the [Languages section](../languages/index.md).

## Organizing Projects

Projects can be saved to the local device browser storage from app menu → Save / app menu → Save as → Fork (New Project) or using the keyboard shortcut <kbd>Ctrl</kbd> + <kbd>S</kbd>.

The list of saved projects can be accessed from app menu → Open.

![LiveCodes Projects](../../static/img/screenshots/saved-projects.png).

Saved projects can be sorted by title or date (asc/desc). They can also be filtered by language and/or tags. You may, as well, search for a project by title or description.

Project title, description and tags can be edited from app menu → Project Info.

Projects can be [imported](./import.md), [exported](./export.md), [synchronized](./sync.md), [backed up and restored](./backup-restore.md).

[Assets](./assets.md) and [code snippets](./snippets.md) are stored in the browser storage and can be used across projects.

## Related

- [Result Page](./result.md)
- [Templates](./templates.md)
- [Code Snippets](./snippets.md)
- [Assets](./assets.md)
- [External Resources](./external-resources.md)
- [Import](./import.md)
- [Export](./export.md)
- [Backup/Restore](./backup-restore.md)
- [Sync](./sync.md)
- [Share](./share.md)
- [Broadcast](./broadcast.md)
