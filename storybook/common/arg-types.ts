import type { Control } from '@storybook/addon-docs/blocks';
import type { ArgTypes } from '@storybook/react-vite';

import './deps';
import { appLanguages, defaultConfig, languages, starterTemplates } from './internal';
import type { Config, Props } from './livecodes';
import { themes } from './themes';

export const delimiter = '__';

const getControlInfo = (name: string, defaultObj = defaultConfig) => {
  let group: string | undefined;
  let subcategory: string | undefined;
  let keyName: string | undefined;

  const parts = name.split(delimiter);
  if (parts.length === 2) {
    [group, keyName] = parts;
  } else {
    [group, subcategory, keyName] = parts;
  }

  const getType = (value: unknown) => {
    if (typeof value === 'string') return 'text';
    return typeof value;
  };

  const defaultValue =
    // @ts-expect-error TODO
    subcategory != null ? defaultObj?.[subcategory]?.[keyName] : defaultObj?.[keyName];

  return {
    table: {
      category: group,
      defaultValue: {
        summary: JSON.stringify(defaultValue, null, 2),
      },
      ...(subcategory ? { subcategory } : {}),
    },
    name: keyName,
    control: getType(defaultValue) as Control,
    required: false,
  };
};

const configArgTypes: Partial<
  ArgTypes<Props & Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>>>
> = {
  config__title: {
    ...getControlInfo('config__title'),
    description:
      'Project title. This is used as [result page](https://livecodes.io/docs/features/result) title and title meta tag.',
    type: 'string',
    control: 'text',
  },
  config__description: {
    ...getControlInfo('config__description'),
    description:
      'Project description. Used in [result page](https://livecodes.io/docs/features/result) description meta tag.',
    type: 'string',
    control: 'text',
  },
  config__head: {
    ...getControlInfo('config__head'),
    description:
      'Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.',
    type: 'string',
    control: 'text',
  },
  config__htmlAttrs: {
    ...getControlInfo('config__htmlAttrs'),
    description:
      'Attributes added to the result page `<html>` element. It can be an object or a string.\n\nExample: `{ lang: "en", class: "dark" }` or `\'lang="en" class="dark"\'`, become `<html lang="en" class="dark">`.',
    type: 'string',
    control: 'text',
  },
  config__tags: {
    ...getControlInfo('config__tags'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nProject tags. Used in project filter and search.',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__autoupdate: {
    ...getControlInfo('config__autoupdate'),
    description:
      'If `true`, the result page is automatically updated on code change, after a time `delay`.',
    type: 'boolean',
    control: 'boolean',
  },
  config__autosave: {
    ...getControlInfo('config__autosave'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nIf `true`, the project is automatically saved on code change, after a time `delay`.',
    type: 'boolean',
    control: 'boolean',
  },
  config__autotest: {
    ...getControlInfo('config__autotest'),
    description:
      'If `true`, the project is watched for code changes which trigger tests to auto-run, after a time `delay`.',
    type: 'boolean',
    control: 'boolean',
  },
  config__delay: {
    ...getControlInfo('config__delay'),
    description:
      'Time delay (in milliseconds) following code change, after which the result page is updated (if `autoupdate` is true), tests are auto-run (if `autotest` is true), and the project is saved (if `autosave` is true).',
    type: 'number',
    control: 'number',
  },
  config__formatOnsave: {
    ...getControlInfo('config__formatOnsave'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nIf true, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.',
    type: 'boolean',
    control: 'boolean',
  },
  config__view: {
    ...getControlInfo('config__view'),
    description:
      'The [default view](https://livecodes.io/docs/features/default-view) for the playground.',
    type: 'string',
    control: 'inline-radio',
    options: ['split', 'editor', 'result'],
  },
  config__mode: {
    ...getControlInfo('config__mode'),
    description: 'Sets the [display mode](https://livecodes.io/docs/features/display-modes).',
    type: 'string',
    control: 'inline-radio',
    options: ['full', 'focus', 'simple', 'lite', 'result', 'editor', 'codeblock'],
  },
  config__theme: {
    ...getControlInfo('config__theme'),
    description:
      'Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.',
    type: 'string',
    control: 'inline-radio',
    options: ['light', 'dark'],
  },
  config__themeColor: {
    ...getControlInfo('config__themeColor'),
    description:
      'A string representing a CSS color value, used to set the app [theme color](https://livecodes.io/docs/features/themes).',
    type: 'string',
    control: 'color',
  },
  config__layout: {
    ...getControlInfo('config__layout'),
    description:
      'Sets the app layout to horizontal or vertical. If set to `"responsive"` (the default) or `undefined`, the layout is vertical in small screens when the playground height is larger than its width, otherwise horizontal.',
    type: 'string',
    control: 'inline-radio',
    options: ['responsive', 'vertical', 'horizontal'],
  },
  config__editorTheme: {
    ...getControlInfo('config__editorTheme'),
    description:
      'Sets the [code editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme).',
    type: 'string',
    control: 'select',
    options: themes,
  },
  config__appLanguage: {
    ...getControlInfo('config__appLanguage'),
    description:
      'Spoken language code that sets the app UI language (e.g. `"ar"`, `"zh-CN"`). Used in translations for internationalization. If `undefined` (the default), the language is automatically detected based on the user\'s browser settings and falls back to English, if detection fails or the language is not supported.',
    type: 'string',
    control: 'select',
    options: Object.values(appLanguages),
    mapping: Object.keys(appLanguages).reduce(
      (acc, key) => {
        acc[appLanguages[key as keyof typeof appLanguages]] = key;
        return acc;
      },
      {} as Record<string, string>,
    ),
  },
  config__recoverUnsaved: {
    ...getControlInfo('config__recoverUnsaved'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nEnables recovering last unsaved project when the app is reopened.',
    type: 'boolean',
    control: 'boolean',
  },
  config__showSpacing: {
    ...getControlInfo('config__showSpacing'),
    description:
      'Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.',
    type: 'boolean',
    control: 'boolean',
  },
  config__welcome: {
    ...getControlInfo('config__welcome'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nIf `true`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.',
    type: 'boolean',
    control: 'boolean',
  },
  config__readonly: {
    ...getControlInfo('config__readonly'),
    description:
      'If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.\n\nBy default, when `readonly` is set to `true`, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used. If you wish to use another editor, set the `editor` property.',
    type: 'boolean',
    control: 'boolean',
  },
  config__allowLangChange: {
    ...getControlInfo('config__allowLangChange'),
    description:
      '(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nIf `false`, the UI will not show the menu that allows changing editor language.',
    type: 'boolean',
    control: 'boolean',
  },
  config__activeEditor: {
    ...getControlInfo('config__activeEditor'),
    description: 'Selects the active editor to show.',
    type: 'string',
    control: 'inline-radio',
    options: ['markup', 'style', 'script'],
  },
  config__languages: {
    ...getControlInfo('config__languages'),
    description: 'List of enabled languages.',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  // @ts-expect-error TODO
  config__markup__language: {
    ...getControlInfo('config__markup__language'),
    description:
      'Sets the markup editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"markdown"`, `"md"`)',
    type: 'string',
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'markup').map((lang) => lang.name),
  },
  config__markup__content: {
    ...getControlInfo('config__markup__content'),
    description: 'The initial content of the markup code editor.',
    type: 'string',
    control: 'text',
  },
  config__markup__contentUrl: {
    ...getControlInfo('config__markup__contentUrl'),
    description:
      'A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__markup__hiddenContent: {
    ...getControlInfo('config__markup__hiddenContent'),
    description:
      'Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).',
    type: 'string',
    control: 'text',
  },
  config__markup__hiddenContentUrl: {
    ...getControlInfo('config__markup__hiddenContentUrl'),
    description:
      'A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__markup__foldedLines: {
    ...getControlInfo('config__markup__foldedLines'),
    description:
      'Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__markup__title: {
    ...getControlInfo('config__markup__title'),
    description:
      'If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "index.html" can be used instead of "HTML").',
    type: 'string',
    control: 'text',
  },
  config__markup__hideTitle: {
    ...getControlInfo('config__markup__hideTitle'),
    description:
      'If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).',
    type: 'boolean',
    control: 'boolean',
  },
  config__markup__order: {
    ...getControlInfo('config__markup__order'),
    description: 'The order of the editor in the UI.',
    type: 'number',
    control: 'text',
  },
  config__markup__selector: {
    ...getControlInfo('config__markup__selector'),
    description:
      'A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).',
    type: 'string',
    control: 'text',
  },
  config__markup__position: {
    ...getControlInfo('config__markup__position'),
    description:
      'The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__style__language: {
    ...getControlInfo('config__style__language'),
    description:
      'Sets the style editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"css"`, `"scss"`)',
    type: 'string',
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'style').map((lang) => lang.name),
  },
  config__style__content: {
    ...getControlInfo('config__style__content'),
    description: 'The initial content of the style code editor.',
    type: 'string',
    control: 'text',
  },
  config__style__contentUrl: {
    ...getControlInfo('config__style__contentUrl'),
    description:
      'A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__style__hiddenContent: {
    ...getControlInfo('config__style__hiddenContent'),
    description:
      'Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).',
    type: 'string',
    control: 'text',
  },
  config__style__hiddenContentUrl: {
    ...getControlInfo('config__style__hiddenContentUrl'),
    description:
      'A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__style__foldedLines: {
    ...getControlInfo('config__style__foldedLines'),
    description:
      'Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__style__title: {
    ...getControlInfo('config__style__title'),
    description:
      'If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "styles.css" can be used instead of "CSS").',
    type: 'string',
    control: 'text',
  },
  config__style__hideTitle: {
    ...getControlInfo('config__style__hideTitle'),
    description:
      'If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).',
    type: 'boolean',
    control: 'boolean',
  },
  config__style__order: {
    ...getControlInfo('config__style__order'),
    description: 'The order of the editor in the UI.',
    type: 'number',
    control: 'text',
  },
  config__style__selector: {
    ...getControlInfo('config__style__selector'),
    description:
      'A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).',
    type: 'string',
    control: 'text',
  },
  config__style__position: {
    ...getControlInfo('config__style__position'),
    description:
      'The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__script__language: {
    ...getControlInfo('config__script__language'),
    description:
      'Sets the script editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"javascript"`, `"js"`)',
    type: 'string',
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__script__content: {
    ...getControlInfo('config__script__content'),
    description: 'The initial content of the script code editor.',
    type: 'string',
    control: 'text',
  },
  config__script__contentUrl: {
    ...getControlInfo('config__script__contentUrl'),
    description:
      'A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__script__hiddenContent: {
    ...getControlInfo('config__script__hiddenContent'),
    description:
      'Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).',
    type: 'string',
    control: 'text',
  },
  config__script__hiddenContentUrl: {
    ...getControlInfo('config__script__hiddenContentUrl'),
    description:
      'A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.',
    type: 'string',
    control: 'text',
  },
  config__script__foldedLines: {
    ...getControlInfo('config__script__foldedLines'),
    description:
      'Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__script__title: {
    ...getControlInfo('config__script__title'),
    description:
      'If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "Python" can be used instead of "Py (Wasm)").',
    type: 'string',
    control: 'text',
  },
  config__script__hideTitle: {
    ...getControlInfo('config__script__hideTitle'),
    description:
      'If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).',
    type: 'boolean',
    control: 'boolean',
  },
  config__script__order: {
    ...getControlInfo('config__script__order'),
    description: 'The order of the editor in the UI.',
    type: 'number',
    control: 'text',
  },
  config__script__selector: {
    ...getControlInfo('config__script__selector'),
    description:
      'A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).',
    type: 'string',
    control: 'text',
  },
  config__script__position: {
    ...getControlInfo('config__script__position'),
    description:
      'The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__stylesheets: {
    ...getControlInfo('config__stylesheets'),
    description:
      'List of URLs for [external stylesheets](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__scripts: {
    ...getControlInfo('config__scripts'),
    description:
      'List of URLs for [external scripts](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__cssPreset: {
    ...getControlInfo('config__cssPreset'),
    description:
      'The [CSS preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.',
    type: 'string',
    control: 'inline-radio',
    options: ['normalize.css', 'reset-css'],
  },
  config__imports: {
    ...getControlInfo('config__imports'),
    description:
      'Allows specifying custom import maps for [module imports](https://livecodes.io/docs/features/module-resolution#custom-module-resolution) ([more info](https://livecodes.io/docs/configuration/configuration-object#imports)).',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__types: {
    ...getControlInfo('config__types'),
    description:
      'Allows providing custom TypeScript type declarations for better editor intellisense ([more info](https://livecodes.io/docs/configuration/configuration-object#types)).',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__tests__language: {
    ...getControlInfo('config__tests__language'),
    description:
      'Sets the tests editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"typescript"`, `"ts"`)',
    type: 'string',
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__tests__content: {
    ...getControlInfo('config__tests__content'),
    description: 'The content of the tests code editor.',
    type: 'string',
    control: 'text',
  },
  config__tools__enabled: {
    ...getControlInfo('config__tools__enabled'),
    description:
      'Enables/disables the [tools pane](https://livecodes.io/docs/features/tools-pane). It can be an array of tools to enable or `"all"` to enable all tools.',
    type: { name: `Array<'console' | 'compiled' | 'tests'> | 'all'`, value: [] as any },
  },
  config__tools__active: {
    ...getControlInfo('config__tools__active'),
    description:
      'Sets the active tool in the [tools pane](https://livecodes.io/docs/features/tools-pane).',
    type: 'string',
    control: 'inline-radio',
    options: ['console', 'compiled', 'tests'],
  },
  config__tools__status: {
    ...getControlInfo('config__tools__status'),
    description:
      'Sets the status of the [tools pane](https://livecodes.io/docs/features/tools-pane).',
    type: 'string',
    control: 'inline-radio',
    options: ['full', 'closed', 'open', 'none'],
  },
  config__zoom: {
    ...getControlInfo('config__zoom'),
    description:
      'Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).',
    type: 'number',
    control: 'inline-radio',
    options: [1, 0.5, 0.25],
  },
  config__processors: {
    ...getControlInfo('config__processors'),
    description:
      'List of enabled [CSS processors](https://livecodes.io/docs/features/css#css-processors).',
    type: { name: 'array', value: [] as any },
    control: 'object',
  },
  config__customSettings: {
    ...getControlInfo('config__customSettings'),
    description:
      'Defines [custom settings](https://livecodes.io/docs/advanced/custom-settings) for the current project.',
    type: { name: 'object', value: {} },
    control: 'object',
  },
  config__editor: {
    ...getControlInfo('config__editor'),
    description: `Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.

If \`undefined\` (the default):<br />
Monaco editor is used on desktop,<br />
CodeMirror is used on mobile and in \`simple\` mode,<br />
while CodeJar is used in [\`codeblock\` mode](https://livecodes.io/docs/features/display-modes#codeblock), in [\`lite\` mode](https://livecodes.io/docs/features/lite) and in \`readonly\` playgrounds.<br />

If set to \`"auto"\`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.`,
    type: 'string',
    control: 'inline-radio',
    options: ['monaco', 'codemirror', 'codejar', 'auto'],
  },
  config__fontFamily: {
    ...getControlInfo('config__fontFamily'),
    description: 'Sets the code editor font family.',
    type: 'string',
    control: 'text',
  },
  config__fontSize: {
    ...getControlInfo('config__fontSize'),
    description:
      'Sets the code editor font size.\n\nIf `undefined` (the default), the font size is set to `14` for the full app and `12` for embeds.',
    type: 'number',
    control: 'number',
  },
  config__useTabs: {
    ...getControlInfo('config__useTabs'),
    description:
      'If `true`, lines are indented with tabs instead of spaces. Also used in [code formatting](https://livecodes.io/docs/features/code-format).',
    type: 'boolean',
    control: 'boolean',
  },
  config__tabSize: {
    ...getControlInfo('config__useTabs'),
    description:
      'The number of spaces per indentation-level. Also used in [code formatting](https://livecodes.io/docs/features/code-format).',
    type: 'number',
    control: 'number',
  },
  config__lineNumbers: {
    ...getControlInfo('config__lineNumbers'),
    description:
      'Shows line numbers in code editor. If set to `"relative"`, line numbers are shown relative to the current line. This can be useful with `vim` mode.',
    type: 'boolean',
    control: 'inline-radio',
    options: ['true', 'false', 'relative'],
    mapping: { true: true, false: false, relative: 'relative' },
  },
  config__wordWrap: {
    ...getControlInfo('config__wordWrap'),
    description: 'Enables word-wrap for long lines.',
    type: 'boolean',
    control: 'boolean',
  },
  config__closeBrackets: {
    ...getControlInfo('config__closeBrackets'),
    description: 'Use auto-complete to close brackets and quotes.',
    type: 'boolean',
    control: 'boolean',
  },
  config__foldRegions: {
    ...getControlInfo('config__foldRegions'),
    description:
      'When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.',
    type: 'boolean',
    control: 'boolean',
  },
  config__semicolons: {
    ...getControlInfo('config__semicolons'),
    description: 'Configures Prettier code formatter to use semi-colons.',
    type: 'boolean',
    control: 'boolean',
  },
  config__singleQuote: {
    ...getControlInfo('config__singleQuote'),
    description:
      'Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.',
    type: 'boolean',
    control: 'boolean',
  },
  config__trailingComma: {
    ...getControlInfo('config__trailingComma'),
    description:
      'Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use trailing commas.',
    type: 'boolean',
    control: 'boolean',
  },
  config__minimap: {
    ...getControlInfo('config__minimap'),
    description: 'Enables minimap in code editor.',
    type: 'boolean',
    control: 'boolean',
  },
  config__emmet: {
    ...getControlInfo('config__emmet'),
    description: 'Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).',
    type: 'boolean',
    control: 'boolean',
  },
  config__editorMode: {
    ...getControlInfo('config__editorMode'),
    description:
      'Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).',
    type: 'string',
    control: 'inline-radio',
    options: ['vim', 'emacs'],
  },
  config__disableHomeLink: {
    ...getControlInfo('config__disableHomeLink'),
    description:
      'If `true`, the link on LiveCodes logo ("Edit on LiveCodes") is disabled in [embeds](https://livecodes.io/docs/features/embeds).',
    type: 'boolean',
    control: 'boolean',
  },
};

export const argTypes: Partial<
  ArgTypes<
    Props & Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>> & { props: Props }
  >
> = {
  appUrl: {
    control: 'text',
    description:
      'Allows loading the playground from a custom URL (e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting/) or a [permanent URL](https://livecodes.io/docs/features/permanent-url/)).',
    type: 'string',
    required: false,
    table: {
      category: 'Embed Options',
      defaultValue: { summary: '"https://livecodes.io"' },
    },
  },
  headless: {
    control: 'boolean',
    description:
      'When set to `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).',
    type: 'boolean',
    required: false,
    table: {
      category: 'Embed Options',
      defaultValue: { summary: 'false' },
    },
  },
  import: {
    control: 'text',
    description:
      'A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).',
    type: 'string',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  loading: {
    control: 'inline-radio',
    description: 'Sets how the playground loads.',
    options: ['eager', 'lazy', 'click'],
    type: 'string',
    required: false,
    table: {
      category: 'Embed Options',
      defaultValue: {
        summary: '"lazy"',
        detail: `"eager": The playground loads immediately.
"lazy": A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
"click": The playground does not load automatically. Instead, a "Click-to-load" screen is shown.`,
      },
    },
  },
  params: {
    control: 'object',
    description:
      'An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.',
    type: { name: 'object', value: {} },
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  template: {
    control: 'select',
    description: 'A [starter template](https://livecodes.io/docs/features/templates) to load.',
    type: 'string',
    required: false,
    table: {
      category: 'Embed Options',
    },
    options: starterTemplates.map((template) => template.name),
  },

  config: {
    table: { disable: true },
  },
  ...(Object.keys(defaultConfig) as Array<keyof Config>)
    .filter((key) => !key.includes('version'))
    .reduce(
      (acc, key) => {
        let defaultConfigValue = defaultConfig[key];
        if (
          defaultConfigValue &&
          typeof defaultConfigValue === 'object' &&
          ['markup', 'style', 'script'].includes(key)
        ) {
          defaultConfigValue = {
            contentUrl: undefined,
            hiddenContent: undefined,
            hiddenContentUrl: undefined,
            title: undefined,
            hideTitle: undefined,
            foldedLines: undefined,
            order: undefined,
            position: undefined,
            selector: undefined,
            ...defaultConfigValue,
          };
        }
        if (`config__${key}` in configArgTypes) {
          // @ts-expect-error TODO
          acc[`config__${key}`] = configArgTypes[`config__${key}`];
        } else if (
          defaultConfigValue &&
          typeof defaultConfigValue === 'object' &&
          !Array.isArray(defaultConfigValue)
        ) {
          Object.keys(defaultConfigValue).forEach((subkey) => {
            // @ts-expect-error TODO
            acc[`config__${key}__${subkey}`] =
              // @ts-expect-error TODO
              configArgTypes[`config__${key}__${subkey}`] ||
              getControlInfo(`config__${key}__${subkey}`);
          });
        } else {
          acc[`config__${key}`] = getControlInfo(`config__${key}`);
        }
        return acc;
      },
      {} as Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>>,
    ),

  props: {
    control: 'object',
    required: false,
    table: {
      readonly: true,
      category: 'Props',
    },
  },

  class: {
    control: 'text',
    type: 'string',
    required: false,
    table: {
      category: 'Styles',
    },
  },
  style: {
    control: 'object',
    required: false,
    table: {
      category: 'Styles',
    },
  },
  height: {
    control: 'text',
    type: 'string',
    required: false,
    table: {
      category: 'Styles',
      defaultValue: { summary: '300px' },
    },
  },

  // attrs: {
  //   description: 'Attributes to add to container element',
  //   control: 'object',
  //   required: false,
  //   table: {
  //     category: 'Container Element',
  //   },
  // },
};
