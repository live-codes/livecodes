# JSX

## Usage

### Importing Modules

### Exports

### Styles

#### CSS Processors

#### Importing Styles

#### CSS Modules

#### CSS Frameworks

[CSS Frameworks](../features/css.md#css-processors) supported in LiveCodes (e.g. [Tailwind CSS](./tailwindcss.md), [UnoCSS](./unocss.md), [WindiCSS](./windicss.md)) are available for use in JSX. Make sure that the required utility is enabled (Style menu or `processors` property of [configuration object](../configuration/configuration-object.md#processors)) and required [directives](https://tailwindcss.com/docs/functions-and-directives#tailwind) are added to the style editor.

Example:

#### CSS-in-JS

### Root Element

To render the React components to a specific [root](https://react.dev/reference/react-dom/client/createRoot) DOM element use `livecodes-app` as the element ID. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used as the root.

### Custom JSX Runtimes

To [mount](https://vuejs.org/api/application.html#app-mount) the application instance to a specific DOM element use `livecodes-app` as the element ID. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used to mount the instance.

## Language Info

### Name

`jsx`

### Extension

`.jsx`

### Editor

`script`

## Compiler

[TypeScript compiler](./typescript.md)

### Version

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.md) added to the property `name` are passed as a JSON object to the `compiler` during compile. Please check the [documentation](#) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "name": {}
}
```

## Starter Template

https://livecodes.io/?template=react

## Links

- [React](https://react.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [CSS Modules](https://github.com/css-modules/css-modules)
