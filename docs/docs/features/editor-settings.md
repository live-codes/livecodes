# Editor Settings

LiveCodes allows a lot of flexibility for configuring which code editor to use and its settings.

`Editor Settings` screen can be accessed from app menu → Editor Settings.

![LiveCodes Editor Settings](../../static/img/screenshots/editor-settings.jpg)

![LiveCodes Editor Settings](../../static/img/screenshots/editor-settings2.jpg)

A preview code editor is displayed to preview the settings in real time.

The settings selected in the `Editor Settings` screen are saved locally to [user settings](./user-settings.md) and are used subsequently. These include:

### Code Editor

The following code editors are supported:

- [**Monaco Editor**](https://microsoft.github.io/monaco-editor/): This is the code editor that powers [**VS Code**](https://code.visualstudio.com/). It is [feature-rich](https://code.visualstudio.com/docs/editor/codebasics) and supports autocomplete with [**IntelliSense**](https://code.visualstudio.com/docs/editor/intellisense) (including [types for custom libraries](./intellisense.md)). However, it requires a relatively large download and is not supported in mobile browsers. (compressed download size: **~2.5 MB**)
- [**CodeMirror**](https://codemirror.net/): Has [many editing features](https://codemirror.net/docs/extensions/), including autocomplete, with good **mobile support**. (compressed download size: **~180 kB**)
- [**CodeJar**](https://medv.io/codejar/): A **lightweight** code editor with very basic editing features. [PrismJs](https://prismjs.com/) is used for syntax highlighting. Please note that some editor settings are not supported in CodeJar (see below). (compressed download size: **~18 kB**)

By default, Monaco editor is used on desktop, CodeMirror is used on mobile and CodeJar is used in [codeblocks](./display-modes.md#codeblock), in [Lite mode](./lite.md) and in [readonly](../configuration/configuration-object.md) playgrounds.

### Editor Options

These include:

- Font family
- Font size
- Indentation (Spaces/Tabs)
- Tab size
- Line numbers
- Word-wrap
- Auto-close brackets and quotes

### Emmet

Allows using [**Emmet**](https://emmet.io/) [abbreviations and actions](https://docs.emmet.io/).

(Not supported in CodeJar)

### Editor Modes

Allows using [**Vim**](https://vimhelp.org/) and [**Emacs**](https://www.gnu.org/software/emacs/manual/html_node/emacs/Basic.html) keyboard bindings.

(Not supported in CodeJar)

### Format Options

These are [**Prettier**](https://prettier.io/) [configuration options](https://prettier.io/docs/en/options.html) used for code formatting.

In addition to those specified in [Editor Options](#editor-options), the following options are available:

- Use Semicolons
- Use Single Quotes
- Use Trailing Commas
