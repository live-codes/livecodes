
declare module 'livecodes/__tests__/getPlaygroundUrl.test' {
    export {};
}
declare module 'livecodes' {
    import type { Code, Config, EmbedOptions, Language, Playground } from 'livecodes/models';
    export type { Code, Config, EmbedOptions, Language, Playground };
    /**
        * Creates a LiveCodes playground.
        *
        * @param {string | HTMLElement} container - `HTMLElement` or a string representing a CSS selector. This is the container where the playground is rendered.
        If not found, an error is thrown (except in [headless mode](https://livecodes.io/docs/sdk/headless), in which this parameter is optional and can be omitted).
        * @param {EmbedOptions} options - The [embed options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground (optional).
        * @return {Promise<Playground>} - A promise that resolves to a [`Playground`](https://livecodes.io/docs/api/interfaces/Playground/) object which exposes many [SDK methods](https://livecodes.io/docs/sdk/js-ts/#sdk-methods) that can be used to interact with the playground.
        */
    export function createPlayground(container: string | HTMLElement, options?: EmbedOptions): Promise<Playground>;
    export function createPlayground(options: EmbedOptions & {
            view: 'headless';
    }): Promise<Playground>;
    /**
        * Gets the URL to a LiveCodes playground (as a string) from the provided [options](https://livecodes.io/docs/sdk/js-ts#embed-options).
        * This can be useful for providing links to run code in playgrounds.
        *
        * @param {EmbedOptions} options - The [options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground.
        * @return {string} - The URL of the playground (as a string).
        *
        * large objects like config and params are store in the url hash params while the rest are in the search params
        * unless config is a string in which case it is stored in searchParams
        */
    export function getPlaygroundUrl(options?: EmbedOptions): string;
}
declare module 'livecodes/models' {
    export interface API {
            /**
                * Runs the [result page](https://livecodes.io/docs/features/result) (after any required compilation for code).
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   await playground.run();
                *   
                * });
                * ```
                */
            run: () => Promise<void>;
            /**
                * Formats the code.
                *
                * By default, the code in all editors (markup, style and script) is formatted.
                * To format only the active editor, the value `false` should be passed as an argument.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   await playground.format();
                *   
                * });
                * ```
                */
            format: (allEditors?: boolean) => Promise<void>;
            /**
                * Gets a [share url](https://livecodes.io/docs/features/share) for the current project.
                *
                * By default, the url has a long query string representing the compressed encoded config object.
                * If the argument `shortUrl` was set to `true`, a short url is generated.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   const longUrl = await playground.getShareUrl();
                *   const shortUrl = await playground.getShareUrl(true);
                * });
                * ```
                */
            getShareUrl: (shortUrl?: boolean) => Promise<string>;
            /**
                * Gets a [configuration object](https://livecodes.io/docs/configuration/configuration-object) representing the playground state.
                *
                * This can be used to restore state if passed as an [EmbedOptions](https://livecodes.io/docs/sdk/js-ts#embed-options) property when [creating playgrounds](https://livecodes.io/docs/sdk/js-ts/#createplayground),
                * or can be manipulated and loaded in run-time using [`setConfig`](https://livecodes.io/docs/sdk/js-ts#setconfig) method.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   const config = await playground.getConfig();
                * });
                * ```
                */
            getConfig: (contentOnly?: boolean) => Promise<Config>;
            /**
                * Loads a new project using the passed configuration object.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   const config = {
                *     markup: {
                *       language: "html",
                *       content: "Hello World!",
                *     },
                *   };
                *   const newConfig = await playground.setConfig(config);
                *   
                * });
                * ```
                */
            setConfig: (config: Partial<Config>) => Promise<Config>;
            /**
                * Gets the playground code (including source code, source language and compiled code) for each editor (markup, style, script), in addition to result page HTML.
                *
                * See [Code](https://livecodes.io/docs/api/interfaces/Code) for the structure of the returned object.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   const code = await playground.getCode();
                *
                *   
                *   const { content, language, compiled } = code.script;
                *
                *   
                *   const result = code.result;
                * });
                * ```
                */
            getCode: () => Promise<Code>;
            /**
                * Shows the selected panel.
                *
                * See [docs](https://livecodes.io/docs/sdk/js-ts#show) for details.
                * @example
                * await playground.show("style");
                * await playground.show("toggle-result");
                * await playground.show("result", { full: true });
                * await playground.show("script");
                * await playground.show("result", { zoom: 0.5 });
                * await playground.show("console", { full: true });
                */
            show: (panel: EditorId | 'editor' | 'result' | 'toggle-result' | Tool['name'], options?: {
                    full?: boolean;
                    line?: number;
                    column?: number;
                    zoom?: Config['zoom'];
            }) => Promise<void>;
            /**
                * Runs project [tests](https://livecodes.io/docs/features/tests) (if present) and gets test results.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   const { results } = await playground.runTests();
                * });
                * ```
                */
            runTests: () => Promise<{
                    results: TestResult[];
            }>;
            /**
                * Runs a callback function when code changes.
                *
                * @deprecated Use [`watch`](https://livecodes.io/docs/sdk/js-ts#watch) method instead.
                */
            onChange: (fn: (data: {
                    code: Code;
                    config: Config;
            }) => void) => {
                    remove: () => void;
            };
            /**
                * Allows to watch for various playground events.
                * It takes 2 arguments: event name and a callback function that will be called on every event.
                *
                * event name can be one of: `"load" | "ready" | "code" | "console" | "tests" | "destroy"`
                *
                * In some events, the callback function will be called with an object that supplies relevant data to the callback function (e.g. code, console output, test results).
                *
                * The watch method returns an object with a single method (`remove`), which when called will remove the callback from watching further events.
                *
                * See [docs](https://livecodes.io/docs/sdk/js-ts#watch) for details.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then((playground) => {
                *   const codeWatcher = playground.watch("code", ({ code, config }) => {
                *     
                *     console.log("code:", code);
                *     console.log("config:", config);
                *   });
                *
                *   const consoleWatcher = playground.watch("console", ({ method, args }) => {
                *     
                *     console[method](...args);
                *   });
                *
                *   const testsWatcher = playground.watch("tests", ({ results }) => {
                *     
                *     results.forEach((testResult) => {
                *       console.log("status:", testResult.status); 
                *       console.log(testResult.errors); 
                *     });
                *   });
                *
                *   
                *   codeWatcher.remove();
                *   consoleWatcher.remove();
                *   testsWatcher.remove();
                *   
                * });
                * ```
                */
            watch: WatchFn;
            /**
                * Executes custom commands, including: `"setBroadcastToken"` and `"showVersion"`.
                *
                * See [docs](https://livecodes.io/docs/sdk/js-ts#exec) for details.
                */
            exec: (command: APICommands, ...args: any[]) => Promise<{
                    output: any;
            } | {
                    error: string;
            }>;
            /**
                * Destroys the playground instance, and removes event listeners.
                *
                * Further call to any SDK methods throws an error.
                * @example
                * ```ts
                * import { createPlayground } from "livecodes";
                *
                * createPlayground("#container").then(async (playground) => {
                *   await playground.destroy();
                *   
                *   
                * });
                * ```
                */
            destroy: () => Promise<void>;
    }
    export type WatchFns = WatchLoad | WatchReady | WatchCode | WatchConsole | WatchTests | WatchDestroy;
    /**
        * Called when the playground first loads.
        */
    export type WatchLoad = (event: 'load', fn: () => void) => {
            remove: () => void;
    };
    /**
        * Called when a new project is loaded (including when [imported](https://livecodes.io/docs/features/import)) and the playground is ready to run.
        */
    export type WatchReady = (event: 'ready', fn: (data: {
            config: Config;
    }) => void) => {
            remove: () => void;
    };
    /**
        * Called when the playground "content" is changed (see [`getCode`](https://livecodes.io/docs/sdk/js-ts#getcode) and [`getConfig`](https://livecodes.io/docs/sdk/js-ts#getcode)).
        *
        * This includes changes in:
        * - Code (in editors)
        * - Editor [languages](https://livecodes.io/docs/languages/)
        * - [CSS processors](https://livecodes.io/docs/features/css#css-processors)
        * - [External resources](https://livecodes.io/docs/features/external-resources)
        * - Project info (e.g. allows adding content in page head and attributes to `<html>` element)
        * - [Custom settings](https://livecodes.io/docs/advanced/custom-settings) (e.g. allows changing [import maps](https://livecodes.io/docs/features/module-resolution#custom-module-resolution))
        * - Project title
        * - [Test](https://livecodes.io/docs/features/tests) code
        */
    export type WatchCode = (event: 'code', fn: (data: {
            code: Code;
            config: Config;
    }) => void) => {
            remove: () => void;
    };
    export type WatchConsole = (event: 'console', fn: (data: {
            method: string;
            args: any[];
    }) => void) => {
            remove: () => void;
    };
    export type WatchTests = (event: 'tests', fn: (data: {
            results: TestResult[];
            error?: string;
    }) => void) => {
            remove: () => void;
    };
    export type WatchDestroy = (event: 'destroy', fn: () => void) => {
            remove: () => void;
    };
    export type SDKEvent = Parameters<WatchFns>[0];
    export type SDKEventHandler = Parameters<WatchFns>[1];
    export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
    export type Prettify<T> = {
            [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
    } & {};
    export type WatchFn = UnionToIntersection<WatchFns>;
    export type APICommands = 'setBroadcastToken' | 'showVersion';
    /**
        * An object that represents the LiveCodes playground instance.
        *
        * The object exposes multiple [methods](https://livecodes.io/docs/sdk/js-ts/#sdk-methods) that can be used to interact with the playground.
        *
        * See [docs](https://livecodes.io/docs/sdk/js-ts) for details.
        */
    export interface Playground extends API {
            /**
                * Loads the playground, if not already loaded.
                *
                * When the embed option [loading](https://livecodes.io/docs/sdk/js-ts#loading) is set to `"click"`, the playground is not loaded automatically.
                * Instead, a screen is shown with "Click to load" button. Calling the SDK method `load()` allows loading the playground.
                *
                * If the playground was not loaded, calling any other method will load the playground first before executing.
                */
            load: () => Promise<void>;
    }
    /**
        * An object that represents the playground embed options.
        *
        * See [docs](https://livecodes.io/docs/sdk/js-ts/#embed-options) for details.
        */
    export interface EmbedOptions {
            /**
                * Allows loading the playground from a custom URL
                * (e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting) or a [permanent URL](https://livecodes.io/docs/features/permanent-url)).
                *
                * If supplied with an invalid URL, an error is thrown.
                * @default 'https://livecodes.io'
                */
            appUrl?: string;
            /**
                * An object that represents the [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.
                *
                * These 2 snippets produce similar output:
                *
                * ```js
                * import { createPlayground } from 'livecodes';
                *
                * 
                * createPlayground('#container', {
                *   config: {
                *     markup: {
                *       language: 'markdown',
                *       content: '# Hello World!',
                *     },
                *   },
                * });
                *
                * 
                * createPlayground('#container', { params: { md: '# Hello World!' } });
                * ```
                */
            params?: Prettify<UrlQueryParams>;
            /**
                * A [configuration object](https://livecodes.io/docs/configuration/configuration-object) or a URL to a JSON file representing a configuration object to load.
                *
                * If supplied and is not an object or a valid URL, an error is thrown.
                * @default {}
                */
            config?: Partial<Config> | string;
            /**
                * If `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).
                * @default false
                */
            headless?: boolean;
            /**
                * A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
                */
            import?: string;
            /**
                * @deprecated
                *
                * Use `{ config: { mode: "lite" } }` instead
                *
                * If `true`, the playground is loaded in [lite mode](https://livecodes.io/docs/features/lite).
                * @default false
                */
            lite?: boolean;
            /**
                * Sets how the playground loads:
                *
                * - `"eager"`: The playground loads immediately.
                * - `"lazy"`: A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
                * - `"click"`: The playground does not load automatically. Instead, a "Click-to-load" screen is shown.
                * @default "lazy"
                */
            loading?: 'lazy' | 'click' | 'eager';
            /**
                * A [starter template](https://livecodes.io/docs/features/templates) to load.
                * Allowed valued can be found [here](https://livecodes.io/docs/api/internal/type-aliases/TemplateName).
                */
            template?: TemplateName;
            /**
                * @deprecated
                *
                * The `view` option has been moved to `config.view`.
                * For headless mode use `headless: true`.
                *
                * The [default view](https://livecodes.io/docs/features/default-view) for the playground.
                *
                * When set to `"headless"`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).
                * @default "split"
                */
            view?: 'split' | 'editor' | 'result' | 'headless';
    }
    /**
        * The playground [configuration object](https://livecodes.io/docs/configuration/configuration-object).
        *
        * It is an object that holds the configuration and state of the playground.
        *
        * See [docs](https://livecodes.io/docs/configuration/configuration-object) for details.
        */
    export interface Config extends ContentConfig, AppConfig, UserConfig {
    }
    /**
        * The properties that define the content of the current [project](https://livecodes.io/docs/features/projects).
        */
    export interface ContentConfig {
            /**
                * Project title.
                * This is used as [result page](https://livecodes.io/docs/features/result) title and title meta tag.
                * Also used in project search.
                * @default "Untitled Project"
                */
            title: string;
            /**
                * Project description. Used in [project](https://livecodes.io/docs/features/projects) search
                * and [result page](https://livecodes.io/docs/features/result) description meta tag.
                * @default ""
                */
            description: string;
            /**
                * Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.
                * @default '<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
                */
            head: string;
            /**
                * Attributes added to the [result page](https://livecodes.io/docs/features/result) `<html>` element.
                * It can be an object or a string.
                * @example <caption>Both of these become `<html lang="en" class="dark">`</caption>
                * { lang: "en", class: "dark" }
                * 'lang="en" class="dark"'
                */
            htmlAttrs: Record<string, string> | string;
            /**
                * Project tags.
                * Used in [project](https://livecodes.io/docs/features/projects) filter and search.
                * @default []
                */
            tags: string[];
            /**
                * Selects the active editor to show.
                *
                * Defaults to the last used editor for user, otherwise `"markup"`
                * @type {`"markup"` | `"style"` | `"script"` | `undefined`}
                */
            activeEditor: EditorId | undefined;
            /**
                * List of enabled languages.
                *
                * Defaults to all supported languages in full app and only current editor languages in [embeds](https://livecodes.io/docs/features/embeds).
                */
            languages: Array<Language | Processor> | undefined;
            /**
                * An object that configures the language and content of the markup editor.
                *
                * See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.
                * @default { language: "html", content: "" }
                */
            markup: Prettify<Editor>;
            /**
                * An object that configures the language and content of the style editor.
                *
                * See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.
                * @default { language: "css", content: "" }
                */
            style: Prettify<Editor>;
            /**
                * An object that configures the language and content of the script editor.
                *
                * See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.
                * @default { language: "javascript", content: "" }
                */
            script: Prettify<Editor>;
            /**
                * List of URLs for [external stylesheets](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).
                */
            stylesheets: string[];
            /**
                * List of URLs for [external scripts](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).
                */
            scripts: string[];
            /**
                * [CSS Preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.
                * @type {"" | "normalize.css" | "reset-css"}
                */
            cssPreset: CssPresetId;
            /**
                * List of enabled [CSS processors](https://livecodes.io/docs/features/css/#css-processors).
                *
                * For the list of available processors, see [Processor](https://livecodes.io/docs/api/internal/type-aliases/Processor)
                */
            processors: Processor[];
            /**
                * Defines [custom settings](https://livecodes.io/docs/advanced/custom-settings) for the current project.
                */
            customSettings: Prettify<CustomSettings>;
            /**
                * Allows specifying custom [import maps](https://github.com/WICG/import-maps) for [module imports](https://livecodes.io/docs/features/module-resolution#custom-module-resolution).
                *
                * **Example**
                *
                * Setting `imports` like this:
                * ```js
                * "imports": {
                *   "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.4/dist/moment.js"
                * }
                * ```
                * results in the following import map:
                * ```html
                * <script type="importmap">
                *   {
                *     "imports": {
                *       "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.4/dist/moment.js"
                *     }
                *   }
                * </script>
                * ```
                * See docs for [Imports](https://livecodes.io/docs/configuration/configuration-object#imports)
                * and [Custom Module Resolution](https://livecodes.io/docs/features/module-resolution/#custom-module-resolution)
                */
            imports: {
                    [key: string]: string;
            };
            /**
                * Allows providing custom TypeScript type declarations for better [editor intellisense](https://livecodes.io/docs/features/intellisense).
                *
                * It is an object where each key represents module name and value represents the types.
                *
                * See docs for [Types](https://livecodes.io/docs/configuration/configuration-object#types)
                * and [Custom Types](https://livecodes.io/docs/features/intellisense#custom-types)
                *
                * @example
                * ```js
                * {
                *   "types": {
                *     "my-demo-lib": "https://my-custom-domain/my-type-declarations.d.ts"
                *   }
                * }
                * ```
                * @example
                * ```
                * {
                *   "types": {
                *     "my-demo-lib": {
                *       "url": "https://my-custom-domain/types.d.ts",
                *       "autoload": true,
                *       "declareAsModule": true
                *     }
                * }
                * ```
                */
            types: Prettify<Types>;
            /**
                * Configures the [language](https://livecodes.io/docs/features/tests#supported-languages)
                * and content of [tests](https://livecodes.io/docs/features/tests).
                */
            tests: Prettify<Partial<Editor>> | undefined;
            /**
                * This is a read-only property which specifies the current LiveCodes version.
                *
                * Version specified in [exported](https://livecodes.io/docs/features/export) projects allows automatically upgrading the project configuration when imported by an app with a newer version.
                */
            readonly version: string;
    }
    /**
        * These are properties that define how the app behaves.
        */
    export interface AppConfig {
            /**
                * If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.
                *
                * By default, when readonly is set to true, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used.
                * If you wish to use another editor, set the [editor](https://livecodes.io/docs/configuration/configuration-object#editor) property.
                * @default false
                */
            readonly: boolean;
            /**
                * If `false`, the UI will not show the menu that allows changing editor language.
                * @default true
                */
            allowLangChange: boolean;
            /**
                * Sets the [default view](https://livecodes.io/docs/features/default-view) for the playground.
                * @default "split"
                */
            view?: 'split' | 'editor' | 'result';
            /**
                * Sets the [display mode](https://livecodes.io/docs/features/display-modes).
                * @default "full"
                */
            mode: 'full' | 'focus' | 'lite' | 'simple' | 'editor' | 'codeblock' | 'result';
            /**
                * Sets enabled and active tools and status of [tools pane](https://livecodes.io/docs/features/tools-pane).
                * @default { enabled: "all", active: "", status: "" }
                * @example
                * ```js
                * {
                *   "tools": {
                *     "enabled": ["console", "compiled"],
                *     "active": "console",
                *     "status": "open"
                *   }
                * }
                * ```
                */
            tools: Partial<{
                    enabled: Array<Tool['name']> | 'all';
                    active: Tool['name'] | '';
                    status: ToolsPaneStatus;
            }>;
            /**
                * Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).
                */
            zoom: 1 | 0.5 | 0.25;
    }
    export interface UserConfig extends EditorConfig, FormatterConfig {
            /**
                * If `true`, the result page is automatically updated on code change,
                * after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).
                * @default true
                */
            autoupdate: boolean;
            /**
                * If `true`, the project is automatically saved on code change,
                * after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).
                * @default false
                */
            autosave: boolean;
            /**
                * If `true`, the project is watched for code changes which trigger tests to auto-run.
                * @default false
                */
            autotest: boolean;
            /**
                * Time delay (in milliseconds) following code change,
                * after which the result page is updated (if [`autoupdate`](https://livecodes.io/docs/configuration/configuration-object#autoupdate) is `true`)
                * and/or the project is saved (if [`autosave`](https://livecodes.io/docs/configuration/configuration-object#autosave) is `true`).
                * @default 1500
                */
            delay: number;
            /**
                * If `true`, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.
                * @default false
                */
            formatOnsave: boolean;
            /**
                * Sets the app layout to horizontal or vertical.
                * If set to `"responsive"` (the default) or `undefined`,
                * the layout is vertical in small screens when the playground height is larger than its width,
                * otherwise horizontal.
                * @default "responsive"
                */
            layout: 'responsive' | 'horizontal' | 'vertical' | undefined;
            /**
                * Enables [recovering last unsaved project](https://livecodes.io/docs/features/recover) when the app is reopened.
                * @default true
                */
            recoverUnsaved: boolean;
            /**
                * Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.
                * @default false
                */
            showSpacing: boolean;
            /**
                * If `true`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.
                */
            welcome: boolean;
            /**
                * Sets the app UI language used.
                */
            appLanguage: AppLanguage | undefined;
    }
    export interface EditorConfig {
            /**
                * Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.
                *
                * If `undefined` (the default), Monaco editor is used on desktop,
                * CodeMirror is used on mobile and in `simple` mode,
                * while CodeJar is used in `codeblock` mode, in `lite` mode and in `readonly` playgrounds.
                *
                * If set to `auto`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.
                *
                * @default undefined
                */
            editor: 'monaco' | 'codemirror' | 'codejar' | 'auto' | undefined;
            /**
                * Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.
                * @default "dark"
                */
            theme: Theme;
            /**
                * Sets the app theme color.
                * If `undefined`, it is set to `"hsl(214, 40%, 50%)"`.
                * @default undefined
                */
            themeColor: string | undefined;
            /**
                * Sets the [code editor](https://livecodes.io/docs/features/editor-settings) themes.
                *
                * See docs for [editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme) for details.
                *
                * @example "vs"
                * @example "monaco:twilight, codemirror:one-dark"
                * @example ["vs@light"]
                * @example ["vs@light", "vs-dark@dark"]
                * @example ["monaco:vs@light", "codemirror:github-light@light", "dracula@dark"]
                */
            editorTheme: EditorTheme[] | string | undefined;
            /**
                * Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.
                */
            fontFamily: string | undefined;
            /**
                * Sets the font size.
                *
                * If `undefined` (the default), the font size is set to 14 for the full app and 12 for [embeds](https://livecodes.io/docs/features/embeds).
                * @default undefined
                */
            fontSize: number | undefined;
            /**
                * If `true`, lines are indented with tabs instead of spaces.
                *
                * Also used in [code formatting](https://livecodes.io/docs/features/code-format).
                * @default false
                */
            useTabs: boolean;
            /**
                * The number of spaces per indentation-level.
                *
                * Also used in [code formatting](https://livecodes.io/docs/features/code-format).
                * @default 2
                */
            tabSize: number;
            /**
                * Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).
                * @default true
                */
            lineNumbers: boolean | 'relative';
            /**
                * Enables word-wrap for long lines.
                * @default false
                */
            wordWrap: boolean;
            /**
                * When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.
                * @default false
                */
            foldRegions: boolean;
            /**
                * Use auto-complete to close brackets and quotes.
                * @default true
                */
            closeBrackets: boolean;
            /**
                * Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).
                * @default true
                */
            emmet: boolean;
            /**
                * Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).
                */
            editorMode: 'vim' | 'emacs' | undefined;
    }
    export interface FormatterConfig {
            /**
                * If `true`, lines are indented with tabs instead of spaces.
                * @default false
                */
            useTabs: boolean;
            /**
                * The number of spaces per indentation-level.
                * @default 2
                */
            tabSize: number;
            /**
                * Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use semi-colons.
                * @default true
                */
            semicolons: boolean;
            /**
                * Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.
                * @default false
                */
            singleQuote: boolean;
            /**
                * Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use [trailing commas](https://prettier.io/docs/en/options.html#trailing-commas).
                * @default true
                */
            trailingComma: boolean;
    }
    export interface UserData {
            id: string;
            data: Partial<{
                    sync: {
                            autosync: boolean;
                            repo: string;
                            lastSync: number;
                    };
                    deploys: {
                            [key: string]: string;
                    };
            }>;
    }
    export interface AppData {
            defaultTemplate?: string | null;
            recentTemplates?: Array<{
                    name: Template['name'];
                    title: string;
            }>;
            recentProjects?: Array<{
                    id: string;
                    title: string;
                    description: string;
            }>;
            language?: Language;
            snippets?: {
                    language: Language;
            };
            broadcast?: {
                    serverUrl: string;
                    userToken?: string;
            };
            codeToImagePreset?: Record<string, any>;
    }
    /**
        * Language name, alias or extension.
        */
    export type Language = 'html' | 'htm' | 'markdown' | 'md' | 'mdown' | 'mkdn' | 'mdx' | 'astro' | 'pug' | 'jade' | 'haml' | 'asciidoc' | 'adoc' | 'asc' | 'mustache' | 'handlebars' | 'hbs' | 'ejs' | 'eta' | 'nunjucks' | 'njk' | 'liquid' | 'liquidjs' | 'dot' | 'twig' | 'vento' | 'vto' | 'art-template' | 'art' | 'jinja' | 'bbcode' | 'bb' | 'mjml' | 'diagrams' | 'diagram' | 'graph' | 'plt' | 'richtext' | 'rte' | 'rich' | 'rte.html' | 'css' | 'scss' | 'sass' | 'less' | 'stylus' | 'styl' | 'stylis' | 'postcss' | 'javascript' | 'js' | 'mjs' | 'json' | 'babel' | 'es' | 'sucrase' | 'typescript' | 'flow' | 'ts' | 'mts' | 'jsx' | 'tsx' | 'react' | 'react-jsx' | 'react.jsx' | 'react-tsx' | 'react.tsx' | 'react-native' | 'react-native.jsx' | 'react-native-tsx' | 'react-native.tsx' | 'vue' | 'vue3' | 'vue2' | 'vue-app' | 'app.vue' | 'svelte' | 'svelte-app' | 'app.svelte' | 'stencil' | 'stencil.tsx' | 'solid' | 'solid.jsx' | 'solid.tsx' | 'riot' | 'riotjs' | 'malina' | 'malinajs' | 'ripple' | 'ripplejs' | 'xht' | 'coffeescript' | 'coffee' | 'livescript' | 'ls' | 'civet' | 'clio' | 'imba' | 'assemblyscript' | 'as' | 'python' | 'py' | 'pyodide' | 'python-wasm' | 'py-wasm' | 'pythonwasm' | 'pywasm' | 'py3' | 'wasm.py' | 'r' | 'rlang' | 'rstats' | 'r-wasm' | 'ruby' | 'rb' | 'ruby-wasm' | 'wasm.rb' | 'rubywasm' | 'go' | 'golang' | 'go-wasm' | 'wasm.go' | 'gowasm' | 'php' | 'php-wasm' | 'phpwasm' | 'wasm.php' | 'cpp' | 'c' | 'C' | 'cp' | 'cxx' | 'c++' | 'cppm' | 'ixx' | 'ii' | 'hpp' | 'h' | 'cpp-wasm' | 'cppwasm' | 'cwasm' | 'wasm.cpp' | 'clang' | 'clang.cpp' | 'java' | 'csharp' | 'csharp-wasm' | 'cs' | 'cs-wasm' | 'wasm.cs' | 'perl' | 'pl' | 'pm' | 'lua' | 'lua-wasm' | 'luawasm' | 'wasm.lua' | 'teal' | 'tl' | 'fennel' | 'fnl' | 'julia' | 'jl' | 'scheme' | 'scm' | 'commonlisp' | 'common-lisp' | 'lisp' | 'clojurescript' | 'clojure' | 'cljs' | 'clj' | 'cljc' | 'edn' | 'gleam' | 'rescript' | 'res' | 'resi' | 'reason' | 're' | 'rei' | 'ocaml' | 'ml' | 'mli' | 'tcl' | 'wat' | 'wast' | 'webassembly' | 'wasm' | 'Binary' | 'sql' | 'sqlite' | 'sqlite3' | 'pg.sql' | 'pgsql.sql' | 'pgsql' | 'pg' | 'pglite' | 'pglite.sql' | 'postgresql' | 'postgres' | 'postgre.sql' | 'postgresql.sql' | 'prolog.pl' | 'prolog' | 'minizinc' | 'mzn' | 'dzn' | 'blockly' | 'blockly.xml' | 'xml' | 'pintora';
    export interface Editor {
            /**
                * A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).
                *
                * For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)
                */
            language: Language;
            /**
                * The initial content of the code editor.
                * @default ""
                */
            content?: string;
            /**
                * A URL to load `content` from. It has to be a valid URL that is CORS-enabled.
                *
                * The URL is only fetched if `content` property had no value.
                */
            contentUrl?: string;
            /**
                * Hidden content that gets evaluated without being visible in the code editor.
                *
                * This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)
                */
            hiddenContent?: string;
            /**
                * A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.
                *
                * The URL is only fetched if `hiddenContent` property had no value.
                */
            hiddenContentUrl?: string;
            /**
                * Lines that get folded when the editor loads.
                *
                * This can be used for less relevant content.
                * @example [{ from: 5, to: 8 }, { from: 15, to: 20 }]
                */
            foldedLines?: Array<{
                    from: number;
                    to: number;
            }>;
            /**
                * If set, this is used as the title of the editor in the UI,
                * overriding the default title set to the language name
                * (e.g. `"Python"` can be used instead of `"Py (Wasm)"`).
                */
            title?: string;
            /**
                * If `true`, the title of the code editor is hidden, however its code is still evaluated.
                *
                * This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).
                */
            hideTitle?: boolean;
            /**
                * The order of the editor in the UI.
                * @default 0
                */
            order?: number;
            /**
                * A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).
                */
            selector?: string;
            /**
                * The initial position of the cursor in the code editor.
                * @example  {lineNumber: 5, column: 10}
                */
            position?: EditorPosition;
    }
    export interface EditorPosition {
            lineNumber: number;
            column?: number;
    }
    export type EditorId = 'markup' | 'style' | 'script';
    export interface Editors {
            markup: CodeEditor;
            style: CodeEditor;
            script: CodeEditor;
    }
    export interface EditorLanguages {
            markup: Language;
            style: Language;
            script: Language;
    }
    export interface Types {
            [key: string]: string | {
                    url: string;
                    declareAsModule?: boolean;
                    declareAsGlobal?: boolean;
                    autoload?: boolean;
            };
    }
    export interface LanguageSpecs {
            name: Language;
            title: string;
            longTitle?: string;
            info?: boolean;
            parser?: Parser;
            formatter?: LanguageFormatter;
            compiler: Compiler | Language;
            extensions: Language[];
            editor: EditorId;
            editorLanguage?: Language;
            preset?: CssPresetId;
            largeDownload?: boolean;
    }
    export interface ProcessorSpecs {
            name: Processor;
            title: string;
            longTitle?: string;
            info?: string;
            isPostcssPlugin: boolean;
            needsHTML?: boolean;
            compiler: {
                    url: string;
                    factory: (config: Config, baseUrl: string, options: CompileOptions) => CompilerFunction | CompilerFunction[];
            };
            editor: EditorId;
            hidden?: boolean;
    }
    export type Processor = 'postcss' | 'postcssImportUrl' | 'tailwindcss' | 'windicss' | 'unocss' | 'tokencss' | 'lightningcss' | 'autoprefixer' | 'postcssPresetEnv' | 'cssmodules' | 'purgecss' | 'cssnano';
    export type ParserName = 'babel' | 'babel-ts' | 'babel-flow' | 'glimmer' | 'html' | 'markdown' | 'css' | 'scss' | 'less' | 'php' | 'pug' | 'java' | 'minizinc';
    export interface Parser {
            name: ParserName;
            plugins?: any[];
            pluginUrls: string[];
    }
    export type FormatFn = (value: string, cursorOffset: number, formatterConfig?: Partial<FormatterConfig>) => Promise<{
            formatted: string;
            cursorOffset: number;
    }>;
    export interface LanguageFormatter {
            factory: (baseUrl: string, language: Language) => FormatFn;
    }
    export type CssPresetId = '' | 'normalize.css' | 'reset-css';
    export interface CssPreset {
            id: CssPresetId;
            name: string;
            url: string;
    }
    export interface EditorLibrary {
            filename: string;
            content: string;
    }
    export interface CompileOptions {
            html?: string;
            blockly?: BlocklyContent;
            forceCompile?: boolean;
            compileInfo?: CompileInfo;
    }
    export interface CompileInfo {
            cssModules?: Record<string, string>;
            modifiedHTML?: string;
            importedContent?: string;
            imports?: Record<string, string>;
            errors?: string[];
    }
    export interface CompileResult {
            code: string;
            info: CompileInfo;
    }
    export type CompilerFunction = (code: string, { config, language, baseUrl, options, worker, }: {
            config: Config;
            language: Language | Processor;
            baseUrl: string;
            options: CompileOptions;
            worker?: Worker;
    }) => Promise<string | CompileResult>;
    export interface Compiler {
            dependencies?: Language[];
            url?: string;
            fn?: CompilerFunction;
            factory: (config: Config, baseUrl: string) => CompilerFunction | Promise<CompilerFunction>;
            runOutsideWorker?: CompilerFunction;
            editors?: EditorId[];
            styles?: string[] | ((options: {
                    compiled: string;
                    baseUrl: string;
                    config: Config;
            }) => string[]);
            scripts?: string[] | ((options: {
                    compiled: string;
                    baseUrl: string;
                    config: Config;
            }) => string[]);
            deferScripts?: boolean;
            inlineScript?: string | ((options: {
                    baseUrl: string;
            }) => Promise<string>);
            inlineModule?: string | ((options: {
                    baseUrl: string;
            }) => Promise<string>);
            loadAsExternalModule?: boolean;
            scriptType?: 'module' | 'text/liquid' | 'text/python' | 'text/r' | 'text/ruby-wasm' | 'text/x-uniter-php' | 'text/php-wasm' | 'text/cpp' | 'text/java' | 'text/csharp-wasm' | 'text/perl' | 'text/julia' | 'text/biwascheme' | 'text/commonlisp' | 'text/tcl' | 'text/prolog' | 'text/minizinc' | 'text/go-wasm' | 'application/json' | 'application/lua' | 'text/fennel' | 'application/wasm-uint8';
            liveReload?: boolean;
            aliasTo?: Language;
            compiledCodeLanguage?: Language;
            imports?: {
                    [key: string]: string;
            };
            types?: Types;
    }
    export interface Compilers {
            [language: string]: Compiler;
    }
    export type Template = Pick<ContentConfig, 'title' | 'markup' | 'style' | 'script'> & Partial<ContentConfig> & {
            name: TemplateName;
            aliases?: TemplateAlias[];
            thumbnail: string;
            tools?: Config['tools'];
            autotest?: Config['autotest'];
    };
    export type TemplateName = 'blank' | 'javascript' | 'typescript' | 'react' | 'react-native' | 'vue2' | 'vue' | 'angular' | 'preact' | 'svelte' | 'solid' | 'lit' | 'stencil' | 'mdx' | 'astro' | 'riot' | 'malina' | 'jquery' | 'backbone' | 'knockout' | 'jest' | 'jest-react' | 'bootstrap' | 'tailwindcss' | 'shadcn-ui' | 'daisyui' | 'd3' | 'phaser' | 'coffeescript' | 'livescript' | 'civet' | 'clio' | 'imba' | 'rescript' | 'reason' | 'ocaml' | 'python' | 'python-wasm' | 'r' | 'ruby' | 'ruby-wasm' | 'go' | 'go-wasm' | 'php' | 'php-wasm' | 'cpp' | 'cpp-wasm' | 'java' | 'csharp-wasm' | 'perl' | 'lua' | 'lua-wasm' | 'teal' | 'fennel' | 'julia' | 'scheme' | 'commonlisp' | 'clojurescript' | 'gleam' | 'tcl' | 'markdown' | 'assemblyscript' | 'wat' | 'sql' | 'postgresql' | 'prolog' | 'minizinc' | 'blockly' | 'diagrams';
    export type TemplateAlias = 'js' | 'ts' | 'ng' | 'bs' | 'tailwind' | 'tw' | 'coffee' | 'ls' | 'py' | 'pyodide' | 'py-wasm' | 'r-lang' | 'rlang' | 'rb' | 'rb-wasm' | 'golang' | 'golang-wasm' | 'c++' | 'clang' | 'c++-wasm' | 'c#-wasm' | 'cs-wasm' | 'pl' | 'lisp' | 'cljs' | 'md' | 'as' | 'postgres' | 'pg' | 'pgsql' | 'mzn';
    export interface Tool {
            name: 'console' | 'compiled' | 'tests';
            title: string;
            load: () => Promise<void>;
            onActivate: () => void;
            onDeactivate: () => void;
            getEditor?: () => CodeEditor | undefined;
    }
    export type ToolsPaneStatus = 'closed' | 'open' | 'full' | 'none' | '';
    export type ToolList = Array<{
            name: Tool['name'];
            factory: (config: Config, baseUrl: string, editors: Editors, eventsManager: EventsManager, isEmbed: boolean, runTests: () => Promise<void>) => Tool;
    }>;
    export interface Console extends Tool {
            title: string;
            log: (...args: any[]) => void;
            info: (...args: any[]) => void;
            table: (...args: any[]) => void;
            warn: (...args: any[]) => void;
            error: (...args: any[]) => void;
            clear: (silent?: boolean) => void;
            evaluate: (code: string) => void;
            reloadEditor: (config: Config) => Promise<void>;
            setTheme?: (theme: Theme) => void;
    }
    export interface CompiledCodeViewer extends Tool {
            title: string;
            update: (language: Language, content: string, label?: string | undefined) => void;
            reloadEditor: (config: Config) => Promise<void>;
    }
    export interface TestViewer extends Tool {
            title: string;
            showResults: ({ results, error }: {
                    results: TestResult[];
                    error?: string;
            }) => void;
            resetTests: () => void;
            clearTests: () => void;
    }
    export interface ToolsPane {
            load: () => Promise<void>;
            open: () => void;
            close: () => void;
            maximize: () => void;
            hide: () => void;
            getStatus: () => ToolsPaneStatus;
            getActiveTool: () => Tool['name'];
            setActiveTool: (name: Tool['name']) => void;
            disableTool: (name: Tool['name']) => void;
            enableTool: (name: Tool['name']) => void;
            console?: Console;
            compiled?: CompiledCodeViewer;
            tests?: TestViewer;
    }
    export interface CodeEditor {
            getValue: () => string;
            setValue: (value?: string, newState?: boolean) => void;
            getLanguage: () => Language;
            setLanguage: (language: Language, value?: string) => void;
            getEditorId: () => string;
            focus: () => void;
            getPosition: () => EditorPosition;
            setPosition: (position: EditorPosition) => void;
            foldRegions?: () => void | Promise<void>;
            foldLines?: (linesToFold: Array<{
                    from: number;
                    to: number;
            }>) => void | Promise<void>;
            layout?: () => void;
            addTypes?: (lib: EditorLibrary, force?: boolean) => any;
            onContentChanged: (callback: () => void) => void;
            addKeyBinding: (label: string, keybinding: any, callback: () => void) => void;
            keyCodes: {
                    CtrlEnter: any;
                    ShiftEnter: any;
                    Enter: any;
                    UpArrow: any;
                    DownArrow: any;
                    ShiftAltF: any;
            };
            changeSettings: (editorSettings: EditorConfig) => void;
            configureTailwindcss?: (enabled: boolean) => void;
            registerFormatter: (formatFn: FormatFn | undefined) => void;
            format: () => Promise<void>;
            isReadonly: boolean;
            setTheme: (theme: Theme, editorTheme: Config['editorTheme']) => void;
            undo: () => void;
            redo: () => void;
            destroy: () => void;
            monaco?: any;
            codemirror?: any;
            prism?: any;
            codejar?: any;
            isFake?: boolean;
    }
    export interface EditorOptions extends EditorConfig {
            baseUrl: string;
            container: HTMLElement | null;
            language: Language;
            value: string;
            mode?: Config['mode'];
            readonly: boolean;
            editorId: EditorId | 'compiled' | 'console' | 'customSettings' | 'editorSettings' | 'codeToImage' | 'tests' | 'embed' | 'snippet' | 'add-snippet';
            theme: Theme;
            isEmbed: boolean;
            isLite: boolean;
            isHeadless: boolean;
            getLanguageExtension: (alias: string) => Language | undefined;
            mapLanguage: (language: Language) => Language;
            getFormatterConfig: () => Partial<FormatterConfig>;
            getFontFamily: (font: string | undefined) => string;
    }
    export type MonacoTheme = 'active4d' | 'all-hallows-eve' | 'amy' | 'birds-of-paradise' | 'blackboard' | 'brilliance-black' | 'brilliance-dull' | 'catppuccin-latte' | 'catppuccin-frappe' | 'catppuccin-macchiato' | 'catppuccin-mocha' | 'chrome-devtools' | 'clouds-midnight' | 'clouds' | 'cobalt' | 'cobalt2' | 'custom-vs-light' | 'custom-vs-dark' | 'dawn' | 'dracula' | 'dreamweaver' | 'eiffel' | 'espresso-libre' | 'github' | 'github-dark' | 'github-light' | 'hc-black' | 'hc-light' | 'idle' | 'idlefingers' | 'iplastic' | 'katzenmilch' | 'krtheme' | 'kuroir' | 'lazy' | 'magicwb-amiga' | 'merbivore-soft' | 'merbivore' | 'monochrome' | 'monochrome-dark' | 'monokai' | 'monokai-bright' | 'monoindustrial' | 'night-owl' | 'nord' | 'oceanic-next' | 'pastels-on-dark' | 'slush-and-poppies' | 'solarized-dark' | 'solarized-light' | 'spacecadet' | 'sunburst' | 'textmate-mac-classic' | 'tomorrow' | 'tomorrow-night' | 'tomorrow-night-blue' | 'tomorrow-night-bright' | 'tomorrow-night-eighties' | 'twilight' | 'upstream-sunburst' | 'vibrant-ink' | 'vs' | 'vs-dark' | 'xcode-default' | 'zenburnesque';
    export type CodemirrorTheme = 'amy' | 'aura' | 'ayu-light' | 'barf' | 'basic-light' | 'basic-dark' | 'bespin' | 'birds-of-paradise' | 'boys-and-girls' | 'catppuccin-latte' | 'catppuccin-frappe' | 'catppuccin-macchiato' | 'catppuccin-mocha' | 'clouds' | 'cm-light' | 'cobalt' | 'cool-glow' | 'dracula' | 'espresso' | 'github-dark' | 'github-light' | 'gruvbox-dark' | 'gruvbox-light' | 'material-dark' | 'material-light' | 'monochrome' | 'monochrome-dark' | 'noctis-lilac' | 'nord' | 'one-dark' | 'rose-pine-dawn' | 'smoothy' | 'solarized-light' | 'solarized-dark' | 'tokyo-night' | 'tokyo-night-day' | 'tokyo-night-storm' | 'tomorrow';
    export type CodejarTheme = 'a11y-dark' | 'atom-dark' | 'base16-ateliersulphurpool-light' | 'catppuccin-latte' | 'catppuccin-frappe' | 'catppuccin-macchiato' | 'catppuccin-mocha' | 'cb' | 'coldark-cold' | 'coldark-dark' | 'coy' | 'coy-without-shadows' | 'darcula' | 'dark' | 'dracula' | 'duotone-dark' | 'duotone-earth' | 'duotone-forest' | 'duotone-light' | 'duotone-sea' | 'duotone-space' | 'funky' | 'ghcolors' | 'gruvbox-dark' | 'gruvbox-light' | 'holi-theme' | 'hopscotch' | 'laserwave' | 'lucario' | 'material-dark' | 'material-light' | 'material-oceanic' | 'monochrome' | 'monochrome-dark' | 'night-owl' | 'nord' | 'nord-2' | 'okaidia' | 'one-dark' | 'one-light' | 'pojoaque' | 'shades-of-purple' | 'solarized-dark-atom' | 'solarized-light' | 'synthwave84' | 'tomorrow' | 'twilight' | 'vs' | 'vsc-dark-plus' | 'xonokai' | 'z-touchs';
    export type EditorTheme = MonacoTheme | CodemirrorTheme | CodejarTheme | `${MonacoTheme}@${Theme}` | `${CodemirrorTheme}@${Theme}` | `${CodejarTheme}@${Theme}` | `monaco:${MonacoTheme}` | `codemirror:${CodemirrorTheme}` | `codejar:${CodejarTheme}` | `monaco:${MonacoTheme}@${Theme}` | `codemirror:${CodemirrorTheme}@${Theme}` | `codejar:${CodejarTheme}@${Theme}`;
    export interface CustomEditor {
            language: Language;
            show: (show: boolean, options: CustomEditorOptions) => Promise<void>;
            getContent: (options: CustomEditorOptions) => Promise<unknown>;
            setTheme: (theme: Theme) => void;
    }
    export interface CustomEditorOptions {
            baseUrl: string;
            editors: Editors;
            config: Config;
            html: string;
            eventsManager: EventsManager;
    }
    export type CustomEditors = {
            [key in Language]?: CustomEditor;
    };
    export interface BlocklyContent {
            xml?: string;
            js?: string;
    }
    export type AppLanguage = 'auto' | 'ar' | 'bn' | 'de' | 'en' | 'es' | 'fa' | 'fr' | 'hi' | 'id' | 'it' | 'ja' | 'nl' | 'pt' | 'tr' | 'ru' | 'ur' | 'zh-CN';
    export interface User {
            uid: string;
            token: string | null;
            displayName: string | null;
            username: string | null;
            email: string | null;
            photoURL: string | null;
    }
    export type GithubScope = 'gist' | 'repo' | 'public_repo';
    export interface ShareData {
            url: string;
            title: string;
    }
    export interface Screen {
            screen: 'login' | 'info' | 'new' | 'open' | 'assets' | 'add-asset' | 'snippets' | 'add-snippet' | 'import' | 'resources' | 'share' | 'embed' | 'deploy' | 'sync' | 'backup' | 'broadcast' | 'welcome' | 'about' | 'custom-settings' | 'editor-settings' | 'code-to-image' | 'test-editor' | 'keyboard-shortcuts';
            show: (options?: any) => void | Promise<unknown>;
    }
    export type CustomSettings = Partial<{
            [key in Language | Processor]: any;
    } & {
            template: {
                    data?: any;
                    prerender?: boolean;
            };
            scriptType: 'module' | 'application/javascript' | 'application/ecmascript' | 'text/javascript' | 'text/ecmascript' | '' | Compiler['scriptType'];
            mapImports: boolean;
            imports: Record<string, string>;
            convertCommonjs: boolean;
            defaultCDN: CDN;
            types: Types;
    }>;
    export type CDN = 'jspm' | 'skypack' | 'jsdelivr' | 'fastly.jsdelivr' | 'gcore.jsdelivr' | 'testingcf.jsdelivr' | 'jsdelivr.b-cdn' | 'jsdelivr.gh' | 'fastly.jsdelivr.gh' | 'gcore.jsdelivr.gh' | 'testingcf.jsdelivr.gh' | 'jsdelivr.b-cdn.gh' | 'jsdelivr.esm' | 'fastly.jsdelivr.esm' | 'gcore.jsdelivr.esm' | 'testingcf.jsdelivr.esm' | 'jsdelivr.b-cdn.esm' | 'esm.run' | 'esm.sh' | 'esbuild' | 'bundle.run' | 'unpkg' | 'npmcdn' | 'statically';
    export type EditorCache = Editor & {
            compiled: string;
            modified?: string;
    };
    export type Cache = ContentConfig & {
            markup: EditorCache;
            style: EditorCache;
            script: EditorCache;
            tests?: EditorCache;
            result?: string;
            styleOnlyUpdate?: boolean;
    };
    /**
        * An object that contains the language, content and compiled code for each of the 3 [code editors](https://livecodes.io/docs/features/projects)
        * and the [result page](https://livecodes.io/docs/features/result) HTML.
        *
        * See [docs](https://livecodes.io/docs/api/interfaces/Code) for details.
        */
    export interface Code {
            markup: {
                    language: Language;
                    content: string;
                    compiled: string;
            };
            style: {
                    language: Language;
                    content: string;
                    compiled: string;
            };
            script: {
                    language: Language;
                    content: string;
                    compiled: string;
            };
            result: string;
    }
    export type Theme = 'light' | 'dark';
    export type Await<T> = T extends PromiseLike<infer U> ? U : T;
    export type FileType = 'image' | 'audio' | 'video' | 'archive' | 'html' | 'stylesheet' | 'script' | 'font' | 'icon' | 'json' | 'csv' | 'xml' | 'text' | 'other';
    export interface Asset {
            id: string;
            filename: string;
            type: FileType;
            url: string;
            lastModified: number;
    }
    export interface Snippet {
            id: string;
            title: string;
            description: string;
            language: Language;
            code: string;
            lastModified: number;
    }
    export interface EventsManager {
            addEventListener: <T extends Event>(element: HTMLElement | Document | Window | FileReader | null, eventType: string, fn: (event: T) => any, _options?: any) => void;
            removeEventListener: <T extends Event>(element: HTMLElement | Document | Window | FileReader | null, eventType: string, fn: (event: T) => any) => void;
            removeEventListeners: () => void;
    }
    export interface TestResult {
            duration: number;
            errors: string[];
            status: 'pass' | 'fail' | 'skip';
            testPath: string[];
    }
    export interface Subscribable<T> {
            subscribe: (fn: (data: T) => void) => {
                    unsubscribe: () => void;
            };
            unsubscribeAll: () => void;
    }
    export type languageSelector = `${Language}-selector`;
    export type ToolNames = `${Tool['name']}` | `${Tool['name']},${Tool['name']}` | `${Tool['name']},${Tool['name']},${Tool['name']}`;
    export type ToolsStatus = `${ToolNames}|${Config['tools']['status']}`;
    export type UrlQueryParams = Partial<EmbedOptions & Omit<Config, 'activeEditor' | 'languages' | 'tags' | 'processors' | 'stylesheets' | 'scripts' | 'tools'> & Pick<Screen, 'screen'> & {
            new: '';
    } & {
            [key in Language]: string;
    } & {
            [key in languageSelector]: string;
    } & {
            sdkVersion: string;
            config: string;
            embed: boolean;
            preview: boolean;
            lite: boolean;
            x: string;
            files: string;
            raw: Language;
            language: Language;
            lang: Language;
            languages: string;
            processors: string;
            stylesheets: string;
            scripts: string;
            activeEditor: EditorId | 0 | 1 | 2;
            active: EditorId | 0 | 1 | 2;
            tags: string | string[];
            'no-defaults': boolean;
            scrollPosition: boolean;
            disableAI: boolean;
            tools: 'open' | 'full' | 'closed' | 'console' | 'compiled' | 'tests' | 'none' | ToolsStatus;
    } & {
            [key in Tool['name']]: 'open' | 'full' | 'closed' | 'none' | '' | 'true';
    }>;
    export interface CustomEvents {
            init: 'livecodes-init';
            /** @deprecated config is sent in hash params */
            getConfig: 'livecodes-get-config';
            /** @deprecated config is sent in hash params */
            config: 'livecodes-config';
            load: 'livecodes-load';
            appLoaded: 'livecodes-app-loaded';
            ready: 'livecodes-ready';
            change: 'livecodes-change';
            testResults: 'livecodes-test-results';
            console: 'livecodes-console';
            destroy: 'livecodes-destroy';
            resizeEditor: 'livecodes-resize-editor';
            apiResponse: 'livecodes-api-response';
            i18n: 'livecodes-i18n';
    }
    export interface PkgInfo {
            name: string;
            description?: string;
            version?: string;
            repository?: {
                    url?: string;
            };
            repo?: string;
            homepage?: string;
    }
    export interface APIError {
            error: boolean;
            status?: number;
            message?: string;
    }
    export interface CDNService {
            search: (query: string, limit?: number) => Promise<PkgInfo[] | APIError>;
            getPkgInfo: (pkgName: string) => Promise<PkgInfo | APIError>;
            getPkgFiles: (pkgName: string) => Promise<{
                    default?: string;
                    files: string[];
            } | APIError>;
            getPkgDefaultFiles: (pkgName: string) => Promise<{
                    js?: string;
                    css?: string;
            } | APIError>;
    }
    export interface WorkerMessageEvent<T, K = unknown> extends MessageEvent {
            data: {
                    messageId: string;
                    method: T;
                    args?: any;
                    data?: K;
            };
    }
}
declare module 'livecodes/react' {
    import React from 'react';
    import type { EmbedOptions, Playground } from 'livecodes/models';
    export interface Props extends EmbedOptions {
        className?: string;
        style?: Record<string, string>;
        height?: string;
        sdkReady?: (sdk: Playground) => void;
    }
    /**
      * A React component that renders a LiveCodes playground.
      *
      * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
      * @see {@link https://livecodes.io/docs/sdk/react}
      *
      * @prop {string} [appUrl] - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
      * @prop {object | string} [config] - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
      * @prop {string} [import] - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
      * @prop {boolean} [headless=false] - Whether to use the headless mode of LiveCodes.
      * @prop {boolean} [lite=false] - Deprecated! Use `config={{ mode: "lite" }}` instead - Whether to use the lite mode of LiveCodes.
      * @prop {string} [loading='lazy'] - When to load the playground.
      * @prop {object} [params] - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
      * @prop {string} [template] - A [starter template](https://livecodes.io/docs/features/templates) to load.
      * @prop {string} [view='split'] - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless="true"` - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
      * @prop {string} [height] - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
      * @prop {string} [className] - Sets the class name of playground container element.
      * @prop {object} [style] - Sets the style of playground container element.
      * @prop {function} [sdkReady] - A callback function that will be called when the SDK is ready.
      * @example
      * ```jsx
      * import LiveCodes from 'livecodes/react';
      *
      * const config = {
      *   markup: {
      *     language: 'markdown',
      *     content: '# Hello World!',
      *   },
      * };
      * export const Playground = () => <LiveCodes config={config} />;
      * ```
      */
    export default function LiveCodes(props: Props): React.ReactElement<Props>;
}
declare module 'livecodes/vue' {
    import type { AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, DefineComponent, ExtractPropTypes, RendererElement, RendererNode, VNode, VNodeProps } from '@vue/runtime-core';
    import type { EmbedOptions, Playground } from 'livecodes/models';
    export interface Props extends EmbedOptions {
        height?: string;
    }
    /**
      * A Vue component that renders a LiveCodes playground.
      *
      * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
      * @see {@link https://livecodes.io/docs/sdk/vue}
      *
      * @prop {string} [appUrl] - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
      * @prop {object | string} [config] - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
      * @prop {string} [import] - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
      * @prop {boolean} [headless=false] - Whether to use the headless mode of LiveCodes.
      * @prop {boolean} [lite=false] - Deprecated! Use `config={{ mode: "lite" }}` instead - Whether to use the lite mode of LiveCodes.
      * @prop {string} [loading='lazy'] - When to load the playground.
      * @prop {object} [params] - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
      * @prop {string} [template] - A [starter template](https://livecodes.io/docs/features/templates) to load.
      * @prop {string} [view='split'] - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless="true"` - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
      * @prop {string} [height] - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
      * @prop {object} [style] - Sets the style of playground container element.
      * @emits {event} [sdkReady] - When the playground initializes, the event `"sdkReady"` is emitted.
      * @example
      * ```html
      * <script setup>
      *   import LiveCodes from 'livecodes/vue';
      * </script>
      *
      * <template>
      *   <LiveCodes />
      * </template>
      * ```
      */
    const LiveCodes: LiveCodesComponent;
    export default LiveCodes;
    type LiveCodesComponent = DefineComponent<Props, () => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        sdkReady: (sdk: Playground) => true;
    }, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<Props>> & {
        onSdkReady?: (sdk: Playground) => void;
    }, {}>;
}
