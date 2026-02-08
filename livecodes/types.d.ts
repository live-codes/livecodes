declare module "sdk/models" {
    export interface API {
        /**
         * Runs the [result page](https://livecodes.io/docs/features/result) (after any required compilation for code).
         * @example
         * ```ts
         * import { createPlayground } from "livecodes";
         *
         * createPlayground("#container").then(async (playground) => {
         *   await playground.run();
         *   // new result page is displayed
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
         *   // code in editors is formatted
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
         *   // new project loaded
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
         *   // source code, language and compiled code for the script editor
         *   const { content, language, compiled } = code.script;
         *
         *   // result page HTML
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
         *     // this will run on every code change
         *     console.log("code:", code);
         *     console.log("config:", config);
         *   });
         *
         *   const consoleWatcher = playground.watch("console", ({ method, args }) => {
         *     // this will run on every console output
         *     console[method](...args);
         *   });
         *
         *   const testsWatcher = playground.watch("tests", ({ results }) => {
         *     // this will run when tests run
         *     results.forEach((testResult) => {
         *       console.log("status:", testResult.status); // "pass", "fail" or "skip"
         *       console.log(testResult.errors); // array of errors as strings
         *     });
         *   });
         *
         *   // then later
         *   codeWatcher.remove();
         *   consoleWatcher.remove();
         *   testsWatcher.remove();
         *   // events are no longer watched
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
         *   // playground destroyed
         *   // any further SDK call throws an error
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
         * // use config
         * createPlayground('#container', {
         *   config: {
         *     markup: {
         *       language: 'markdown',
         *       content: '# Hello World!',
         *     },
         *   },
         * });
         *
         * // use params
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
declare module "livecodes/models" {
    export type * from "sdk/models";
    export interface ModalOptions {
        size?: 'large' | 'small' | 'full' | 'large-fixed';
        closeButton?: boolean;
        isAsync?: boolean;
        onClose?: () => void;
        scrollToSelector?: string;
        autoFocus?: boolean;
    }
    export interface Modal {
        show: (container: HTMLElement, options?: ModalOptions) => void;
        close: () => void;
    }
    export interface Notifications {
        info: (message: string, dismissable?: boolean) => void;
        success: (message: string, dismissable?: boolean) => void;
        warning: (message: string, dismissable?: boolean) => void;
        error: (message: string, dismissable?: boolean) => void;
        confirm: (message: string, confirmCallback: () => void, cancelCallback?: () => void) => void;
    }
    export interface INinjaAction {
        title: string;
        keywords?: string;
        content?: string;
        id?: string;
        hotkey?: string;
        icon?: string;
        mdIcon?: string;
        parent?: string;
        children?: string[] | Array<Omit<INinjaAction, 'parent'>>;
        section?: string;
        href?: string;
        attributes?: Record<string, string>;
        handler?: (action: INinjaAction, event: KeyboardEvent | CustomEvent<INinjaAction> | undefined, searchQuery: string) => void | {
            keepOpen: boolean;
        } | Promise<void>;
        matcher?: (action: INinjaAction, searchOptions: {
            searchString: string;
            searchRegex: RegExp;
        }) => boolean;
        keepOpen?: boolean;
    }
}
declare module "livecodes/utils/utils" {
    import type { Config, Language, Processor } from "livecodes/models";
    export const debounce: (fn: (...x: any[]) => any, delay: number | (() => number)) => (...args: unknown[]) => void;
    export const decodeHTML: (html: string) => string;
    export const encodeHTML: (html: string) => string;
    export const escapeScript: (code: string) => string;
    export const escapeCode: (code: string, slash?: boolean) => string;
    export const pipe: (...fns: Function[]) => Function;
    export const safeName: (name: string, symbol?: string) => string;
    export const isMobile: () => boolean;
    export const isMac: () => boolean;
    export const ctrl: (e: KeyboardEvent) => boolean;
    export const isFirefox: () => boolean;
    export const isRelativeUrl: (url?: string) => boolean;
    export const getAbsoluteUrl: (url: string, baseUrl?: string) => string;
    export const cloneObject: <T>(x: Record<string, any>) => T;
    export const objectMap: (obj: Record<string, any>, fn: (value: any, key: string, index: number) => any) => {
        [k: string]: any;
    };
    export const objectFilter: (obj: Record<string, any>, predicate: (value: any, key: string, index: number) => any) => {
        [k: string]: any;
    };
    export const copyToClipboard: (text: string) => boolean | Promise<void>;
    export const copyImage: (image: Blob, type: 'png' | 'jpg' | 'svg') => Promise<boolean>;
    export const stringToValidJson: (str: string) => string;
    export const stringify: (obj: any, pretty?: boolean) => string;
    export const getRandomString: () => string;
    export const downloadFile: (filename: string, extension: string, content: string) => void;
    export const loadScript: (url: string, name?: string) => Promise<unknown>;
    export const loadStylesheet: (url: string, id?: string, insertBefore?: string) => void;
    export const typedArrayToBuffer: (array: Uint8Array) => ArrayBuffer;
    export const getDate: () => string;
    export const handleFetchError: (res: Response) => Response | Promise<never>;
    export const fetchWithHandler: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    export const blobToBase64: (file: Blob) => Promise<string>;
    export const Uint8ArrayToBase64: (u8: Uint8Array) => string;
    export const base64ToUint8Array: (str: string) => Uint8Array;
    export const typedArraysAreEqual: (a: Uint8Array, b: Uint8Array) => boolean;
    export const toDataUrl: (content: string, type?: string) => string;
    export const getWorkerDataURL: (url: string) => string;
    export const createWorkerFromContent: (content: string) => Worker;
    export const removeComments: (src: string) => string;
    export const removeStrings: (src: string) => string;
    export const removeCommentsAndStrings: (src: string) => string;
    export const getLanguageCustomSettings: (language: Language | Processor, config: Config) => any;
    export const getValidUrl: (url?: string) => string | null;
    export const runOrContinue: <T>(fn: (x: T) => Promise<T>, catchFn?: (err: unknown) => void) => (x: T) => Promise<T>;
    export const getFileExtension: (file: string) => string;
    export const isInIframe: () => boolean;
    export const indentCode: (code: string, spaces: number, skipFirstLine?: boolean) => string;
    export const hideOnClickOutside: (element: HTMLElement) => {
        clear: () => void;
    };
    export const callWorker: <T = string, K = unknown>(worker: Worker, message: {
        method: T;
        args?: any;
    }) => Promise<K>;
    export const capitalize: (str: string) => string;
    export const toCamelCase: (str: string) => string;
    export const removeDuplicates: (arr: any[] | undefined) => any[];
    export const replaceAsync: (str: string, regexp: RegExp, asyncFn: (...args: any) => Promise<string>) => Promise<string>;
    export const addAttrs: (el: HTMLElement, attributes: Record<string, string> | string) => void;
    /**
     * Bypasses the AMD module definition system by temporarily disabling it while executing the given function.
     *
     * @param fn - The function to execute.
     * @return The result of executing the function.
     */
    export const bypassAMD: <T = any>(fn: () => Promise<T>) => Promise<T>;
    /**
     * Returns an async function that ensures the given asynchronous function is executed only once and awaits the previous executions.
     *
     * @param {() => Promise<void>} fn - The asynchronous function to be executed once.
     * @return {() => Promise<void>} An async function that, when called multiple times, executes the given function if it hasn't been executed before or awaits the previous execution.
     */
    export const doOnce: (fn: () => Promise<void>) => () => Promise<void>;
    export const evaluateCssCalc: (expression: string) => string;
    export const colorToRgba: (name: string) => {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    export const colorToHsla: (color: string) => {
        h: number;
        s: number;
        l: number;
        a: number;
    };
    export const colorToHex: (color: string) => string;
    type ValueOf<T> = T[keyof T];
    type NonEmptyArray<T> = [T, ...T[]];
    type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;
    /**
     * converts TypeScript string union to array
     * see https://stackoverflow.com/a/70694878/5054774
     */
    export const stringUnionToArray: <T>() => <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) => MustInclude<T, U>;
    export const preventFocus: (container: HTMLElement) => void;
    export const findFirstFocusableElement: (container: HTMLElement) => Element | undefined;
    export const isFocusable: (item: any | null) => boolean;
    /**
     * Compares two objects and returns a list of keys of source object
     * whose values are different from the destination object.
     */
    export const compareObjects: (srcObj: Partial<Record<string, unknown>>, dstObj: Partial<Record<string, unknown>>) => string[];
    export const getErrorMessage: (err: unknown) => string;
    export const addProp: (obj: Record<string, unknown>, key: string, value: unknown) => void;
    export const onLoad: (fn: (...args: any[]) => any) => void;
    export const predefinedValues: {
        readonly APP_VERSION: string;
        readonly SDK_VERSION: string;
        readonly COMMIT_SHA: string;
        readonly REPO_URL: string;
        readonly DOCS_BASE_URL: string;
    };
}
declare module "livecodes/html/index" {
    const resultTemplate: string;
    const appHTML: string;
    const menuProjectHTML: string;
    const menuSettingsHTML: string;
    const menuHelpHTML: string;
    const languageInfo: string;
    const customSettingsScreen: string;
    const testEditorScreen: string;
    const importScreen: string;
    const deployScreen: string;
    const syncScreen: string;
    const backupScreen: string;
    const broadcastScreen: string;
    const welcomeScreen: string;
    const aboutScreen: string;
    const infoScreen: string;
    const resourcesScreen: string;
    const keyboardShortcutsScreen: string;
    const loginScreen: string;
    const savePromptScreen: string;
    const recoverPromptScreen: string;
    const templatesScreen: string;
    const openScreen: string;
    const assetsScreen: string;
    const addAssetScreen: string;
    const snippetsScreen: string;
    const addSnippetScreen: string;
    const shareScreen: string;
    const embedScreen: string;
    const editorSettingsScreen: string;
    const codeToImageScreen: string;
    const resultPopupHTML: string;
    export { aboutScreen, addAssetScreen, addSnippetScreen, appHTML, assetsScreen, backupScreen, broadcastScreen, codeToImageScreen, customSettingsScreen, deployScreen, editorSettingsScreen, embedScreen, importScreen, infoScreen, keyboardShortcutsScreen, languageInfo, loginScreen, menuHelpHTML, menuProjectHTML, menuSettingsHTML, openScreen, recoverPromptScreen, resourcesScreen, resultPopupHTML, resultTemplate, savePromptScreen, shareScreen, snippetsScreen, syncScreen, templatesScreen, testEditorScreen, welcomeScreen, };
}
declare module "livecodes/utils/compression" {
    export const compress: (uncompressed: string) => string;
    export const decompress: (compressed: string, isJSON?: boolean) => string | null;
}
declare module "livecodes/sync/diff" {
    import * as DeepDiff from 'deep-diff';
    import * as Y from 'yjs';
    export { DeepDiff, Y };
    export function toJSON<T>(source: unknown): T;
    export function applyChange<LHS = any, RHS = any>(target: any, change: DeepDiff.Diff<LHS, RHS>): void;
}
declare module "livecodes/sync/models" {
    import type { WorkerMessageEvent } from "livecodes/models";
    export type SyncMethod = 'sync' | 'exportToLocalSync' | 'exportStoreAsBase64Update' | 'restoreFromUpdate' | 'restoreFromLocalSync';
    export type SyncMessageEvent = WorkerMessageEvent<SyncMethod>;
    export interface StoredSyncData {
        lastModified: number;
        data: Uint8Array;
        lastSyncSha: string;
    }
}
declare module "livecodes/services/modules" {
    import type { CDN } from "livecodes/models";
    export const modulesService: {
        getModuleUrl: (moduleName: string, { isModule, defaultCDN, external, }?: {
            isModule?: boolean;
            defaultCDN?: CDN;
            external?: string;
        }) => string;
        getUrl: (path: string, cdn?: CDN) => string;
        cdnLists: {
            npm: CDN[];
            module: CDN[];
            gh: CDN[];
        };
        checkCDNs: (testModule: string, preferredCDN?: CDN) => Promise<CDN>;
    };
    export const getAppCDN: () => CDN;
}
declare module "livecodes/services/github" {
    import type { User } from "livecodes/models";
    export interface GitHubFile {
        path: string;
        content: string;
    }
    export const getGithubHeaders: (user: User, mediaType?: 'object' | 'raw') => {
        Accept: string;
        'Content-Type': string;
        Authorization: string;
    };
    export const repoExists: (user: User, repo: string) => Promise<boolean>;
    export const getContent: ({ user, repo, branch, path, }: {
        user: User;
        repo: string;
        branch?: string;
        path: string;
    }) => Promise<any>;
    export const commitFiles: ({ files, user, repo, branch, message, newRepo, privateRepo, description, readmeContent, clearPrevious, }: {
        files: GitHubFile[];
        user: User;
        repo: string;
        branch: string;
        message: string;
        newRepo?: boolean;
        privateRepo?: boolean;
        description?: string;
        readmeContent?: string;
        clearPrevious?: boolean;
    }) => Promise<{
        tree: string;
        commit: string;
    } | null>;
    export const commitFile: ({ file, user, repo, branch, message, newRepo, privateRepo, description, readmeContent, }: {
        file: GitHubFile;
        user: User;
        repo: string;
        branch: string;
        message: string;
        newRepo?: boolean;
        privateRepo?: boolean;
        description?: string;
        readmeContent?: string;
    }) => Promise<{
        tree: any;
        commit: any;
    } | null>;
    export const getUserRepos: (user: User, reposType?: 'all' | 'owner' | 'public' | 'private' | 'member') => Promise<any[]>;
}
declare module "livecodes/events/custom-events" {
    import type { CustomEvents } from "livecodes/models";
    export const customEvents: CustomEvents;
}
declare module "livecodes/events/events" {
    import type { EventsManager } from "livecodes/models";
    export const createEventsManager: () => EventsManager;
}
declare module "livecodes/events/pub" {
    export const createPub: <T>() => {
        subscribe: (fn: (data: T) => void) => {
            unsubscribe: () => void;
        };
        notify: (data: T) => void;
        hasSubscribers: () => boolean;
        unsubscribeAll: () => void;
    };
}
declare module "livecodes/events/index" {
    export * from "livecodes/events/custom-events";
    export * from "livecodes/events/events";
    export * from "livecodes/events/pub";
}
declare module "livecodes/vendors" {
    export const vendorsBaseUrl: string;
    export const acornUrl: string;
    export const artTemplateUrl: string;
    export const asciidocUrl: string;
    export const assemblyscriptLoaderUrl: string;
    export const astringUrl: string;
    export const astroBaseUrl: string;
    export const astroWasmURL: string;
    export const autoCompleteUrl: string;
    export const babelUrl: string;
    export const bbobHtmlUrl: string;
    export const bbobPresetHtmlUrl: string;
    export const biwaschemeUrl: string;
    export const blocklyCdnBaseUrl: string;
    export const browserfsUrl: string;
    export const browserJestUrl: string;
    export const brythonBaseUrl: string;
    export const chaiUrl: string;
    export const cherryCljsBaseUrl: string;
    export const cjs2esUrl: string;
    export const clioBaseUrl: string;
    export const cm6ThemeBasicLightUrl: string;
    export const cm6ThemeBasicDarkUrl: string;
    export const cm6ThemeGruvboxLightUrl: string;
    export const cm6ThemeGruvboxDarkUrl: string;
    export const cm6ThemeMaterialDarkUrl: string;
    export const cm6ThemeNordUrl: string;
    export const cm6ThemeSolarizedLightUrl: string;
    export const cm6ThemeSolarizedDarkUrl: string;
    export const codeiumProviderUrl: string;
    export const codeMirrorBaseUrl: string;
    export const coffeeScriptUrl: string;
    export const colorisBaseUrl: string;
    export const comlinkBaseUrl: string;
    export const cppWasmBaseUrl: string;
    export const csharpWasmBaseUrl: string;
    export const yaegiWasmBaseUrl: string;
    export const csstreeUrl: string;
    export const cytoscapeSvgUrl: string;
    export const cytoscapeUrl: string;
    export const ddietrCmThemesBaseUrl: string;
    export const doppioJvmBaseUrl = "https://unpkg.com/@seth0x41/doppio@1.0.0/";
    export const dotUrl: string;
    export const ejsUrl: string;
    export const elkjsBaseUrl: string;
    export const emmetMonacoUrl: string;
    export const esModuleShimsPath = "es-module-shims@1.10.0/dist/es-module-shims.js";
    export const etaUrl: string;
    export const fflateUrl: string;
    export const flexSearchUrl: string;
    export const fontAnonymousProUrl: string;
    export const fontAstigmataUrl: string;
    export const fontAwesomeUrl: string;
    export const fontCascadiaCodeUrl: string;
    export const fontCodeNewRomanUrl: string;
    export const fontComicMonoUrl: string;
    export const fontCourierPrimeUrl: string;
    export const fontDECTerminalModernUrl: string;
    export const fontDejaVuMonoUrl: string;
    export const fontFantasqueUrl: string;
    export const fontFiraCodeUrl: string;
    export const fontFixedsysUrl: string;
    export const fontHackUrl: string;
    export const fontHermitUrl: string;
    export const fontIBMPlexMonoUrl: string;
    export const fontInconsolataUrl: string;
    export const fontInterUrl: string;
    export const fontIosevkaUrl: string;
    export const fontJetbrainsMonoUrl: string;
    export const fontMaterialIconsUrl: string;
    export const fontMenloUrl: string;
    export const fontMonaspaceBaseUrl: string;
    export const fontMonofurUrl: string;
    export const fontMonoidUrl: string;
    export const fontNotoUrl: string;
    export const fontNovaMonoUrl: string;
    export const fontOpenDyslexicUrl: string;
    export const fontProFontWindowsUrl: string;
    export const fontRobotoMonoUrl: string;
    export const fontSFMonoUrl: string;
    export const fontSourceCodeProUrl: string;
    export const fontSpaceMonoUrl: string;
    export const fontSudoVarUrl: string;
    export const fontUbuntuMonoUrl: string;
    export const fontVictorMonoUrl: string;
    export const fscreenUrl: string;
    export const githubMarkdownCss: string;
    export const gleamBaseUrl: string;
    export const go2jsBaseUrl: string;
    export const graphreCdnUrl: string;
    export const handlebarsBaseUrl: string;
    export const highlightjsUrl: string;
    export const hpccJsCdnUrl: string;
    export const htmlToImageUrl: string;
    export const imbaBaseUrl: string;
    export const jestTypesUrl: string;
    export const jsclUrl: string;
    export const jsZipUrl: string;
    export const juliaWasmBaseUrl: string;
    export const liquidJsUrl: string;
    export const localforageUrl: string;
    export const luaUrl: string;
    export const lunaConsoleStylesUrl: string;
    export const lunaDataGridStylesUrl: string;
    export const lunaDomViewerStylesUrl: string;
    export const lunaObjViewerStylesUrl: string;
    export const malinaBaseUrl: string;
    export const markedUrl: string;
    export const mermaidCdnUrl: string;
    export const metaPngUrl: string;
    export const minizincUrl: string;
    export const mjmlUrl: string;
    export const monacoBaseUrl: string;
    export const monacoEmacsUrl: string;
    export const monacoThemesBaseUrl: string;
    export const monacoVimUrl: string;
    export const monacoVolarUrl: string;
    export const mustacheUrl: string;
    export const ninjaKeysUrl: string;
    export const nomnomlCdnUrl: string;
    export const normalizeCssUrl: string;
    export const nunjucksBaseUrl: string;
    export const opalBaseUrl: string;
    export const parinferUrl: string;
    export const pathBrowserifyUrl: string;
    export const pgliteUrl: string;
    export const pintoraUrl: string;
    export const plotlyCdnUrl: string;
    export const postcssImportUrlUrl: string;
    export const prettierBaseUrl: string;
    export const prettierMinizincUrl: string;
    export const prettierPhpUrl: string;
    export const prismBaseUrl: string;
    export const prismOfficialThemesBaseUrl: string;
    export const prismThemesBaseUrl: string;
    export const prismThemeNordUrl: string;
    export const prismThemesLaserWaveUrl: string;
    export const pyodideBaseUrl: string;
    export const qrcodeUrl: string;
    export const quillEditorCdnBaseUrl: string;
    export const quillHtmlEditUrl: string;
    export const quillBlotFormatterUrl: string;
    export const quillBetterTableBaseUrl: string;
    export const requireUrl: string;
    export const reasonCompilerUrl: string;
    export const reasonReactUrl: string;
    export const reasonStdLibBaseUrl: string;
    export const rescriptCdnBaseUrl: string;
    export const rescriptStdLibBaseUrl: string;
    export const resetCssUrl: string;
    export const riotBaseUrl: string;
    export const rubyWasmBaseUrl: string;
    export const rubyWasmScriptUrl: string;
    export const snackbarUrl: string;
    export const spacingJsUrl: string;
    export const sqlFormatterUrl: string;
    export const sqljsBaseUrl: string;
    export const squintCljsBaseUrl: string;
    export const stencilUrl: string;
    export const stylisUrl: string;
    export const svelteBaseUrl: string;
    export const svgbobWasmCdnUrl: string;
    export const tagifyBaseUrl: string;
    export const tailwindcssBaseUrl: string;
    export const tailwindcss3Url: string;
    export const tauPrologBaseUrl: string;
    export const tealUrl: string;
    export const thememirrorBaseUrl: string;
    export const tesseractUrl: string;
    export const twigUrl: string;
    export const typescriptUrl: string;
    export const uniterUrl: string;
    export const vegaCdnUrl: string;
    export const vegaLiteCdnUrl: string;
    export const vue3CdnUrl: string;
    export const vue2CdnUrl: string;
    export const vueRuntimeUrl: string;
    export const vueSDKUrl: string;
    export const vueSfcLoaderCdnBaseUrl: string;
    export const wabtjsUrl: string;
    export const wasmoonUrl: string;
    export const waveDromBaseUrl: string;
    export const webRBaseUrl: string;
}
declare module "livecodes/storage/fake-storage" {
    import type { SimpleStorage, Storage } from "livecodes/storage/models";
    export const fakeStorage: Omit<Storage<any>, 'getList'> & {
        getList: () => Promise<[]>;
    };
    export const fakeSimpleStorage: SimpleStorage<any>;
}
declare module "livecodes/storage/storage" {
    import type { Storage, StoreName } from "livecodes/storage/models";
    export const generateId: () => string;
    /**
     * Creates asynchronous data store using localforage
     */
    export const createStorage: <T>(name: StoreName, isEmbed: boolean) => Promise<Storage<T>>;
}
declare module "livecodes/storage/project-storage" {
    import type { ProjectStorage, StoreName } from "livecodes/storage/models";
    export const createProjectStorage: (name: StoreName, isEmbed: boolean) => Promise<ProjectStorage>;
}
declare module "livecodes/storage/simple-storage" {
    import type { SimpleStorage, StoreName } from "livecodes/storage/models";
    /**
     * Creates a simple synchronous key/value data store using localstorage
     */
    export const createSimpleStorage: <T>(name: StoreName, isEmbed: boolean) => SimpleStorage<T>;
}
declare module "livecodes/storage/stores" {
    import type { ProjectStorage, SimpleStorage, Storage, Stores } from "livecodes/storage/models";
    export const createStores: () => Stores;
    export const initializeStores: (stores: Stores, isEmbed: boolean) => Promise<void>;
    export const initializeSimpleStores: (stores: Stores, isEmbed: boolean) => Promise<void>;
    export const getStoreKey: (store: SimpleStorage<any> | Storage<any> | ProjectStorage, stores: Stores) => string | null;
}
declare module "livecodes/sync/sync.worker" {
    import type { User } from "livecodes/models";
    import type { Stores } from "livecodes/storage/index";
    const sync: ({ user, repo, branch, newRepo, }: {
        user: User;
        repo: string;
        branch?: string;
        newRepo: boolean;
    }) => Promise<boolean>;
    const exportToLocalSync: ({ user, storeKey }: {
        user: User;
        storeKey: keyof Stores;
    }) => Promise<void>;
    const exportStoreAsBase64Update: ({ storeKey }: {
        storeKey: keyof Stores;
    }) => Promise<string | undefined>;
    const restoreFromUpdate: ({ update, storeKey, mergeCurrent, }: {
        update: Uint8Array;
        storeKey: keyof Stores;
        mergeCurrent?: boolean;
    }) => Promise<void>;
    const restoreFromLocalSync: ({ user, storeKey, mergeCurrent, }: {
        user: User;
        storeKey: keyof Stores;
        mergeCurrent?: boolean;
    }) => Promise<void>;
    export type workerSync = typeof sync;
    export type workerExportToLocalSync = typeof exportToLocalSync;
    export type workerExportStoreAsBase64Update = typeof exportStoreAsBase64Update;
    export type workerRestoreFromUpdate = typeof restoreFromUpdate;
    export type workerRestoreFromLocalSync = typeof restoreFromLocalSync;
}
declare module "livecodes/sync/sync" {
    import type { workerExportStoreAsBase64Update, workerExportToLocalSync, workerRestoreFromLocalSync, workerRestoreFromUpdate, workerSync } from "livecodes/sync/sync.worker";
    export const init: (baseUrl: string) => void;
    export const sync: workerSync;
    export const exportToLocalSync: workerExportToLocalSync;
    export const exportStoreAsBase64Update: workerExportStoreAsBase64Update;
    export const restoreFromUpdate: workerRestoreFromUpdate;
    export const restoreFromLocalSync: workerRestoreFromLocalSync;
}
declare module "livecodes/sync/index" {
    export * from "livecodes/sync/diff";
    export type * from "livecodes/sync/models";
    export * from "livecodes/sync/sync";
}
declare module "livecodes/storage/models" {
    import type { AppData, Asset, ContentConfig, Language, Snippet, Subscribable, UserConfig, UserData } from "livecodes/models";
    import type { StoredSyncData } from "livecodes/sync/index";
    export interface Storage<T> extends Subscribable<T[]> {
        getList: () => Promise<string[]>;
        getAllData: () => Promise<T[]>;
        getItem: (id: string) => Promise<T | null>;
        addItem: (item: T) => Promise<string>;
        updateItem: (id: string, item: T) => Promise<string>;
        deleteItem: (id: string) => Promise<void>;
        bulkInsert: (data: T[]) => Promise<void>;
        restore: (data: T[]) => Promise<void>;
        clear: () => Promise<void>;
    }
    export interface ProjectStorage extends Omit<Storage<StorageItem>, 'getList' | 'addItem' | 'updateItem' | 'bulkInsert'> {
        getList: () => Promise<SavedProject[]>;
        addItem: (config: ContentConfig) => Promise<string>;
        updateItem: (id: string, config: ContentConfig) => Promise<string>;
        deleteItem: (id: string) => Promise<void>;
        bulkInsert: (newProjects: ContentConfig[]) => Promise<void>;
    }
    export interface StorageItem {
        id: string;
        config: ContentConfig;
        lastModified: number;
    }
    export interface RecoverItem {
        config: ContentConfig;
        lastModified: number;
    }
    export interface SavedProject {
        id: string;
        title: string;
        description: string;
        tags: string[];
        languages: Language[];
        lastModified: number;
    }
    export interface SimpleStorage<T> extends Subscribable<T | null> {
        getValue: () => T | null;
        setValue: (value: T | null) => void;
        clear: () => void;
    }
    export interface Stores {
        projects: ProjectStorage | undefined;
        templates: ProjectStorage | undefined;
        assets: Storage<Asset> | undefined;
        snippets: Storage<Snippet> | undefined;
        recover: SimpleStorage<RecoverItem> | undefined;
        userConfig: SimpleStorage<UserConfig> | undefined;
        userData: Storage<Partial<UserData>> | undefined;
        appData: SimpleStorage<AppData> | undefined;
        sync: Storage<StoredSyncData> | undefined;
    }
    export type StorageData = {
        [key in keyof Stores]: any | undefined;
    };
    export type StoreName = '__livecodes_data__' | '__livecodes_templates__' | '__livecodes_assets__' | '__livecodes_snippets__' | '__livecodes_project_recover__' | '__livecodes_user_config__' | '__livecodes_user_data__' | '__livecodes_app_data__' | '__livecodes_sync_data__' | '__livecodes_key__';
}
declare module "livecodes/storage/encrypt" {
    export const encrypt: (text: string) => Promise<string>;
    export const decrypt: (encrypted: string) => Promise<string | null>;
}
declare module "livecodes/storage/index" {
    export * from "livecodes/storage/encrypt";
    export * from "livecodes/storage/fake-storage";
    export type { ProjectStorage, RecoverItem, SavedProject, SimpleStorage, Storage, StorageData, StorageItem, StoreName, Stores, } from "livecodes/storage/models";
    export * from "livecodes/storage/project-storage";
    export * from "livecodes/storage/simple-storage";
    export * from "livecodes/storage/storage";
    export * from "livecodes/storage/stores";
}
declare module "livecodes/UI/info" {
    import type { Config, Modal } from "livecodes/models";
    import type { ProjectStorage } from "livecodes/storage/index";
    export const getTags: (value: string) => string[];
    export const createProjectInfoUI: (config: Config, storage: ProjectStorage, modal: Modal, onUpdate: (title: string, description: string, head: string, htmlAttrs: string, tags: string[]) => void) => Promise<void>;
}
declare module "livecodes/UI/loading" {
    export const loadingMessage: (message?: string) => HTMLDivElement;
}
declare module "livecodes/UI/selectors" {
    export const getToolbarElement: () => HTMLElement;
    export const getProjectTitleElement: () => HTMLElement;
    export const getEditorContainerElement: () => HTMLElement;
    export const getEditorsElement: () => HTMLElement;
    export const getMarkupElement: () => HTMLElement;
    export const getStyleElement: () => HTMLElement;
    export const getScriptElement: () => HTMLElement;
    export const getOutputElement: () => HTMLElement;
    export const getResultElement: () => HTMLElement;
    export const getResultIFrameElement: () => HTMLIFrameElement;
    export const getGutterElement: () => HTMLElement;
    export const getLogoLink: () => HTMLAnchorElement;
    export const getRunButton: () => HTMLElement;
    export const getLightThemeButton: () => HTMLElement;
    export const getDarkThemeButton: () => HTMLElement;
    export const getI18nMenuButton: () => HTMLElement;
    export const getI18nMenuContainer: () => HTMLElement;
    export const getMarkupEditorTitle: () => HTMLElement;
    export const getStyleEditorTitle: () => HTMLElement;
    export const getScriptEditorTitle: () => HTMLElement;
    export const getEditorToolbar: () => HTMLElement;
    export const getFocusButton: () => HTMLElement;
    export const getCopyButton: () => HTMLElement;
    export const getCopyAsUrlButton: () => HTMLElement;
    export const getCodeToImageButton: () => HTMLElement;
    export const getUndoButton: () => HTMLElement;
    export const getRedoButton: () => HTMLElement;
    export const getFormatButton: () => HTMLElement;
    export const getEditorModeNode: () => HTMLElement | null;
    export const getEditorStatus: () => HTMLElement;
    export const getExternalResourcesBtn: () => HTMLElement;
    export const getExternalResourcesMark: () => HTMLElement;
    export const getProjectInfoBtn: () => HTMLElement;
    export const getCustomSettingsBtn: () => HTMLElement;
    export const getEditorSettingsBtn: () => HTMLElement;
    export const getShareButton: () => HTMLElement;
    export const getResultButton: () => HTMLElement;
    export const getFullscreenButton: () => HTMLElement;
    export const getEditorTitles: () => NodeListOf<HTMLElement>;
    export const getEditorDivs: () => NodeListOf<HTMLElement>;
    export const getToolspaneElement: () => HTMLElement;
    export const getToolspaneBar: () => HTMLElement;
    export const getToolspaneButtons: () => HTMLElement;
    export const getToolspaneTitles: () => HTMLElement | null;
    export const getConsoleButton: () => HTMLElement | null;
    export const getCompiledButton: () => HTMLElement | null;
    export const getTestsButton: () => HTMLElement | null;
    export const getToolspaneLoader: () => HTMLElement | null;
    export const getZoomButton: () => HTMLElement | null;
    export const getZoomButtonValue: () => HTMLElement | null;
    export const getResultPopupButton: () => HTMLElement | null;
    export const getModalSaveButton: () => HTMLElement;
    export const getModalDoNotSaveButton: () => HTMLElement;
    export const getModalCancelButton: () => HTMLElement;
    export const getModalRecoverButton: () => HTMLElement;
    export const getModalSavePreviousButton: () => HTMLElement;
    export const getModalCancelRecoverButton: () => HTMLElement;
    export const getModalUnsavedName: () => HTMLElement;
    export const getModalUnsavedLastModified: () => HTMLElement;
    export const getModalDisableRecoverCheckbox: () => HTMLInputElement;
    export const getLanguageMenuLinks: () => NodeListOf<HTMLElement>;
    export const getLanguageMenuButtons: () => NodeListOf<HTMLElement>;
    export const getstyleMenu: () => HTMLElement | null;
    export const getSettingToggles: () => NodeListOf<HTMLInputElement>;
    export const getThemeColorSelector: () => HTMLElement | null;
    export const getCssPresetLinks: () => NodeListOf<HTMLAnchorElement>;
    export const getAppMenuProjectScroller: () => HTMLElement | null;
    export const getAppMenuProjectButton: () => HTMLElement | null;
    export const getAppMenuSettingsScroller: () => HTMLElement | null;
    export const getAppMenuSettingsButton: () => HTMLElement | null;
    export const getAppMenuHelpScroller: () => HTMLElement | null;
    export const getAppMenuHelpButton: () => HTMLElement | null;
    export const getExportJSONLink: () => HTMLAnchorElement | null;
    export const getExportResultLink: () => HTMLAnchorElement | null;
    export const getExportSourceLink: () => HTMLAnchorElement | null;
    export const getExportGithubGistLink: () => HTMLAnchorElement | null;
    export const getExportCodepenLink: () => HTMLAnchorElement | null;
    export const getExportJsfiddleLink: () => HTMLAnchorElement | null;
    export const getLoginLink: () => HTMLAnchorElement | null;
    export const getLogoutLink: () => HTMLAnchorElement | null;
    export const getNewLink: () => HTMLAnchorElement | null;
    export const getOpenLink: () => HTMLAnchorElement | null;
    export const getSaveLink: () => HTMLAnchorElement | null;
    export const getForkLink: () => HTMLAnchorElement | null;
    export const getSaveAsTemplateLink: () => HTMLAnchorElement | null;
    export const getExternalResourcesLink: () => HTMLAnchorElement | null;
    export const getCustomSettingsLink: () => HTMLAnchorElement | null;
    export const getShareLink: () => HTMLAnchorElement | null;
    export const getEmbedLink: () => HTMLAnchorElement | null;
    export const getEditorSettingsLink: () => HTMLAnchorElement | null;
    export const getDeployLink: () => HTMLAnchorElement | null;
    export const getSyncLink: () => HTMLAnchorElement | null;
    export const getSyncIndicator: () => HTMLAnchorElement | null;
    export const getImportLink: () => HTMLAnchorElement | null;
    export const getBackupLink: () => HTMLAnchorElement | null;
    export const getBroadcastLink: () => HTMLAnchorElement | null;
    export const getWelcomeLink: () => HTMLAnchorElement | null;
    export const getAboutLink: () => HTMLAnchorElement | null;
    export const getCommandMenuLink: () => HTMLAnchorElement | null;
    export const getKeyboardShortcutsMenuLink: () => HTMLAnchorElement | null;
    export const getAutoupdateToggle: () => HTMLInputElement;
    export const getDelayValue: () => HTMLElement;
    export const getDelayRange: () => HTMLInputElement;
    export const getAutosaveToggle: () => HTMLInputElement;
    export const getAutosyncToggle: () => HTMLInputElement;
    export const getFormatOnsaveToggle: () => HTMLInputElement;
    export const getProcessorToggles: () => NodeListOf<HTMLInputElement>;
    export const getEmmetToggle: () => HTMLInputElement;
    export const getThemeToggle: () => HTMLInputElement;
    export const getLayoutToggle: () => HTMLInputElement;
    export const getShowWelcomeToggle: () => HTMLInputElement;
    export const getRecoverToggle: () => HTMLInputElement;
    export const getThemeColorContainer: () => HTMLElement;
    export const getCustomThemeColorInput: () => HTMLInputElement;
    export const getSpacingToggle: () => HTMLInputElement;
    export const getCSSPresetLinks: () => NodeListOf<HTMLAnchorElement>;
    export const getProjectInfoLink: () => HTMLInputElement;
    export const getAssetsLink: () => HTMLInputElement;
    export const getSnippetsLink: () => HTMLInputElement;
    export const getHelpMenu: () => HTMLElement;
    export const getInfoTitleInput: () => HTMLInputElement;
    export const getInfoHead: () => HTMLTextAreaElement;
    export const getInfoHtmlAttrs: () => HTMLTextAreaElement;
    export const getInfoDescription: () => HTMLTextAreaElement;
    export const getInfoTagsInput: () => HTMLInputElement;
    export const getExternalResourcesTextareas: () => NodeListOf<HTMLTextAreaElement>;
    export const getExternalResourcesCssPresetInputs: () => NodeListOf<HTMLInputElement>;
    export const getCustomSettingsEditor: () => HTMLElement | null;
    export const getLoadCustomSettingsButton: () => HTMLElement | null;
    export const getTestEditor: () => HTMLElement | null;
    export const getLoadTestsButton: () => HTMLElement | null;
    export const getEditTestsButton: () => HTMLElement | null;
    export const getRunTestsButton: () => HTMLElement | null;
    export const getWatchTestsButton: () => HTMLElement | null;
    export const getUrlImportForm: (importContainer: HTMLElement) => HTMLFormElement | null;
    export const getUrlImportButton: (importContainer: HTMLElement) => HTMLButtonElement;
    export const getUrlImportInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getCodeImportInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getImportJsonUrlForm: (importContainer: HTMLElement) => HTMLInputElement;
    export const getImportJsonUrlButton: (importContainer: HTMLElement) => HTMLInputElement;
    export const getImportJsonUrlInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getBulkImportJsonUrlForm: (importContainer: HTMLElement) => HTMLInputElement;
    export const getBulkImportJsonUrlButton: (importContainer: HTMLElement) => HTMLInputElement;
    export const getBulkImportJsonUrlInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getLinkToSavedProjects: (importContainer: HTMLElement) => HTMLAnchorElement;
    export const getImportFileInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getImportFileInputLabel: (importContainer: HTMLElement) => HTMLInputElement;
    export const getBulkImportFileInput: (importContainer: HTMLElement) => HTMLInputElement;
    export const getNewRepoForm: (deployContainer: HTMLElement) => HTMLFormElement | null;
    export const getNewRepoButton: (deployContainer: HTMLElement) => HTMLButtonElement;
    export const getNewRepoNameInput: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getNewRepoNameError: (deployContainer: HTMLElement) => HTMLElement;
    export const getNewRepoMessageInput: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getNewRepoCommitSource: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getNewRepoAutoSync: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getExistingRepoForm: (deployContainer: HTMLElement) => HTMLFormElement | null;
    export const getExistingRepoButton: (deployContainer: HTMLElement) => HTMLButtonElement;
    export const getExistingRepoNameInput: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getExistingRepoMessageInput: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getExistingRepoCommitSource: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getExistingRepoAutoSync: (deployContainer: HTMLElement) => HTMLInputElement;
    export const getStarterTemplatesTab: (templatesContainer: HTMLElement) => HTMLElement | null;
    export const getStarterTemplatesList: (templatesContainer: HTMLElement) => HTMLElement | null;
    export const getUserTemplatesScreen: (templatesContainer: HTMLElement) => HTMLElement;
    export const getTemplatesSearchInput: (templatesContainer: HTMLElement) => HTMLInputElement;
    export const getBulkImportButton: (listContainer: HTMLElement) => HTMLElement;
    export const getExportAllButton: (listContainer: HTMLElement) => HTMLElement;
    export const getDeleteAllButton: (listContainer: HTMLElement) => HTMLElement;
    export const getAddAssetButton: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetsDeleteAllButton: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetsButton: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetDataUrlFileInput: (listContainer: HTMLElement) => HTMLInputElement;
    export const getAssetDataUrlOutput: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetGHPagesFileInput: (listContainer: HTMLElement) => HTMLInputElement;
    export const getAssetGHPagesFileInputLabel: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetGHPagesFileInputButton: (listContainer: HTMLElement) => HTMLElement;
    export const getAssetGHPagesOutput: (listContainer: HTMLElement) => HTMLElement;
    export const getSyncStatus: (syncContainer: HTMLElement | undefined) => HTMLElement | null;
    export const getStartSyncBtns: (syncContainer: HTMLElement | undefined) => NodeListOf<HTMLButtonElement>;
    export const getBackupForm: (backupContainer: HTMLElement) => HTMLFormElement;
    export const getBackupBtn: (backupContainer: HTMLElement) => HTMLButtonElement;
    export const getBackupCheckedInputs: (backupContainer: HTMLElement) => NodeListOf<HTMLInputElement>;
    export const getAddSnippetButton: (snippetsContainer: HTMLElement) => HTMLElement;
    export const getSnippetsDeleteAllButton: (snippetsContainer: HTMLElement) => HTMLElement;
    export const getSnippetLanguageSelect: (snippetsContainer: HTMLElement) => HTMLSelectElement;
    export const getAddSnippetEditor: (snippetsContainer: HTMLElement) => HTMLElement;
    export const getSnippetTitleInput: (snippetsContainer: HTMLElement) => HTMLInputElement;
    export const getSnippetDescriptionArea: (snippetsContainer: HTMLElement) => HTMLTextAreaElement;
    export const getSaveSnippetBtn: (snippetsContainer: HTMLElement) => HTMLButtonElement;
    export const getSnippetsBtn: (snippetsContainer: HTMLElement) => HTMLButtonElement;
    export const getBroadcastStatusLabel: (broadcastContainer: HTMLElement) => HTMLElement;
    export const getBroadcastForm: (broadcastContainer: HTMLElement) => HTMLFormElement;
    export const getBroadcastServerUrlInput: (broadcastContainer: HTMLElement) => HTMLInputElement;
    export const getBroadcastSourceCheckbox: (broadcastContainer: HTMLElement) => HTMLInputElement;
    export const getBroadcastBtn: (broadcastContainer: HTMLElement) => HTMLButtonElement;
    export const getBroadcastChannelUrlSection: (broadcastContainer: HTMLElement) => HTMLElement;
    export const getBroadcastChannelUrl: (broadcastContainer: HTMLElement) => HTMLAnchorElement;
    export const getBroadcastStatusBtn: () => HTMLElement | null;
    export const getQrCodeContainer: () => HTMLElement;
    export const getEditorSettingsFormatLink: (editorSettingsContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkNew: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkOpen: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkImport: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkDefaultTemplateLi: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkNoDefaultTemplate: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkLoadDefault: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkRecentOpen: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getWelcomeLinkTemplates: (welcomeContainer: HTMLElement) => HTMLAnchorElement;
    export const getModalShowWelcomeCheckbox: (welcomeContainer: HTMLElement) => HTMLInputElement;
    export const getModalWelcomeRecover: (welcomeContainer?: Document) => HTMLElement;
    export const getModalWelcomeScreen: (welcomeContainer: HTMLElement) => HTMLElement;
    export const getModalWelcomeRecent: (welcomeContainer: HTMLElement) => HTMLElement;
    export const getModalWelcomeRecentList: (welcomeContainer: HTMLElement) => HTMLElement;
    export const getModalWelcomeTemplateList: (welcomeContainer: HTMLElement) => HTMLElement;
    export const getNinjaKeys: () => any;
    export const getResultModeDrawer: () => HTMLElement;
}
declare module "livecodes/UI/login" {
    import type { EventsManager, GithubScope, User } from "livecodes/models";
    export const createLoginContainer: (eventsManager: EventsManager, loginCallback: (scopes: GithubScope[]) => void) => HTMLElement;
    export const displayLoggedIn: (user: User) => void;
    export const displayLoggedOut: () => void;
}
declare module "livecodes/utils/get-import-instance" {
    export function getImportInstance(url: string): any;
}
declare module "livecodes/utils/index" {
    export * from "livecodes/utils/get-import-instance";
    export * from "livecodes/utils/utils";
}
declare module "livecodes/UI/open" {
    import type { Config, ContentConfig, EventsManager, Language, LanguageSpecs, Modal, Notifications, Screen } from "livecodes/models";
    import type { ProjectStorage, SavedProject } from "livecodes/storage/index";
    export const createOpenItem: (item: SavedProject, list: HTMLElement, getLanguageTitle: (language: Language) => string, getLanguageByAlias: (alias?: string) => Language | undefined, isTemplate?: boolean) => {
        link: HTMLAnchorElement;
        deleteButton: HTMLButtonElement;
        setAsDefaultLink: HTMLSpanElement;
        removeDefaultLink: HTMLSpanElement;
    };
    export const createSavedProjectsList: ({ projectStorage, eventsManager, showScreen, getContentConfig, notifications, modal, loadConfig, getProjectId, setProjectId, languages, getLanguageTitle, getLanguageByAlias, }: {
        projectStorage: ProjectStorage;
        eventsManager: EventsManager;
        showScreen: (screen: Screen['screen']) => void;
        getContentConfig: (config: Config | ContentConfig) => ContentConfig;
        notifications: Notifications;
        modal: Modal;
        loadConfig: (config: ContentConfig) => Promise<void>;
        getProjectId: () => string | undefined;
        setProjectId: (id: string) => void;
        languages: LanguageSpecs[];
        getLanguageTitle: (language: Language) => string;
        getLanguageByAlias: (alias?: string) => Language | undefined;
    }) => Promise<void>;
}
declare module "livecodes/UI/split-panes" {
    export const createSplitPanes: (layout?: 'vertical' | 'horizontal') => {
        show: (pane: 'code' | 'output' | 'toggle', full?: boolean) => void;
        getLayout: () => "horizontal" | "vertical";
        setLayout: (newLayout: 'vertical' | 'horizontal') => void;
        destroy: (preserveStyles?: boolean | undefined, preserveGutters?: boolean | undefined) => void;
    };
}
declare module "livecodes/UI/templates" {
    import type { EventsManager, Template } from "livecodes/models";
    export const createTemplatesContainer: (eventsManager: EventsManager) => HTMLElement;
    export const createStarterTemplateLink: (template: Template & {
        id: string;
    }, starterTemplatesList: HTMLElement | null, baseUrl: string) => HTMLAnchorElement;
    export const noUserTemplates: () => string;
    export const initTemplatesSearchIndex: () => void;
    export const addTemplateToIndex: ({ id, title, name, description, aliases, tags, languages, }: {
        id: string;
        title: string;
        name?: string;
        description?: string;
        aliases?: string[];
        tags?: string[];
        languages?: string[];
    }) => void;
    export const setupTemplatesSearch: (container: HTMLElement) => void;
}
declare module "livecodes/UI/index" {
    export * from "livecodes/UI/info";
    export * from "livecodes/UI/loading";
    export * from "livecodes/UI/login";
    export * from "livecodes/UI/open";
    export * from "livecodes/UI/selectors";
    export * from "livecodes/UI/split-panes";
    export * from "livecodes/UI/templates";
}
declare module "livecodes/languages/css-presets" {
    import type { CssPreset } from "livecodes/models";
    export const cssPresets: CssPreset[];
}
declare module "livecodes/languages/prettier" {
    export const prettierUrl: string;
    export const parserPlugins: {
        babel: string;
        estree: string;
        glimmer: string;
        html: string;
        markdown: string;
        postcss: string;
        php: string;
        minizinc: string;
        pug: string;
        java: string;
    };
}
declare module "livecodes/languages/art-template/lang-art-template" {
    import type { LanguageSpecs } from "livecodes/models";
    export const artTemplate: LanguageSpecs;
}
declare module "livecodes/languages/art-template/index" {
    export * from "livecodes/languages/art-template/lang-art-template";
}
declare module "livecodes/languages/utils" {
    import type { Compiler, Config, CustomSettings, Language, Processor } from "livecodes/models";
    import { getLanguageCustomSettings } from "livecodes/utils/utils";
    export const getLanguageByAlias: (alias?: string) => Language | undefined;
    export const getLanguageTitle: (language: Language) => string;
    export const getLanguageEditorId: (alias?: string) => import("sdk/models").EditorId | undefined;
    export const getLanguageExtension: (alias?: string) => Language | undefined;
    export const getLanguageSpecs: (alias?: string) => import("sdk/models").LanguageSpecs | undefined;
    export const getLanguageCompiler: (alias?: string) => Compiler | undefined;
    export const mapLanguage: (language: Language) => Language;
    export const languageIsEnabled: (language: Language, config: Config) => boolean;
    export const processorIsEnabled: (processor: Processor, config: Config) => boolean;
    export const processorIsActivated: (processor: Processor, config: Config) => boolean;
    /**
     * returns a string with names of enabled processors/postcss plugins
     * for the supplied language (separated by hyphens)
     */
    export const getActivatedProcessors: (language: Language, config: Config) => string;
    export const escapeCode: (code: string, slash?: boolean) => string;
    export const getCustomSettings: (language: Language | Processor, config: Config) => CustomSettings;
    export const detectLanguage: (code: string, languages: Language[]) => Promise<{
        language: Language;
        secondBest: Language;
    }>;
    export { getLanguageCustomSettings };
}
declare module "livecodes/languages/asciidoc/lang-asciidoc" {
    import type { LanguageSpecs } from "livecodes/models";
    export const asciidoc: LanguageSpecs;
}
declare module "livecodes/languages/asciidoc/index" {
    export * from "livecodes/languages/asciidoc/lang-asciidoc";
}
declare module "livecodes/languages/assemblyscript/lang-assemblyscript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const assemblyscript: LanguageSpecs;
}
declare module "livecodes/languages/assemblyscript/index" {
    export * from "livecodes/languages/assemblyscript/lang-assemblyscript";
}
declare module "livecodes/languages/astro/lang-astro" {
    import type { LanguageSpecs } from "livecodes/models";
    export const astro: LanguageSpecs;
}
declare module "livecodes/languages/astro/index" {
    export * from "livecodes/languages/astro/lang-astro";
}
declare module "livecodes/languages/babel/lang-babel" {
    import type { LanguageSpecs } from "livecodes/models";
    export const babel: LanguageSpecs;
}
declare module "livecodes/languages/babel/index" {
    export * from "livecodes/languages/babel/lang-babel";
}
declare module "livecodes/languages/bbcode/lang-bbcode" {
    import type { LanguageSpecs } from "livecodes/models";
    export const bbcode: LanguageSpecs;
}
declare module "livecodes/languages/bbcode/index" {
    export * from "livecodes/languages/bbcode/lang-bbcode";
}
declare module "livecodes/languages/blockly/lang-blockly" {
    import type { LanguageSpecs } from "livecodes/models";
    export const blockly: LanguageSpecs;
}
declare module "livecodes/languages/blockly/index" {
    export * from "livecodes/languages/blockly/lang-blockly";
}
declare module "livecodes/languages/civet/lang-civet" {
    import type { LanguageSpecs } from "livecodes/models";
    export const civet: LanguageSpecs;
}
declare module "livecodes/languages/civet/index" {
    export * from "livecodes/languages/civet/lang-civet";
}
declare module "livecodes/languages/clio/lang-clio" {
    import type { LanguageSpecs } from "livecodes/models";
    export const clio: LanguageSpecs;
}
declare module "livecodes/languages/clio/index" {
    export * from "livecodes/languages/clio/lang-clio";
}
declare module "livecodes/compiler/models" {
    import type { CompileOptions, CompileResult, Config, Language, Processor } from "livecodes/models";
    export interface Compiler {
        load: (languages: LanguageOrProcessor[], config: Config) => Promise<unknown[]>;
        compile: (content: string, language: Language, config: Config, options: CompileOptions) => Promise<CompileResult>;
        clearCache: () => void;
        typescriptFeatures: (options: {
            feature: TypescriptFeatures;
            payload: any;
        }) => Promise<unknown>;
        isFake: boolean;
    }
    export type LanguageOrProcessor = Language | Processor;
    export type TypescriptFeatures = 'getOptionDeclarations' | 'ata' | 'initCodeMirrorTS' | 'changeCodeMirrorLanguage' | 'addTypes';
    export interface CompilerMessageEvent extends MessageEvent {
        data: CompilerMessage;
    }
    export type CompilerMessage = {
        from?: 'compiler';
    } & (InitMessage | InitSuccessMessage | LoadMessage | LoadedMessage | LoadFailedMessage | CompileMessage | CompileInCompilerMessage | CompiledMessage | CompileFailedMessage | TypeScriptMessage);
    export interface InitMessage {
        type: 'init';
        payload: Config;
        baseUrl: string;
        scriptUrl: string;
    }
    export interface InitSuccessMessage {
        type: 'init-success';
    }
    export interface LoadMessage {
        type: 'load';
        payload: {
            language: LanguageOrProcessor;
            config: Config;
        };
    }
    export interface LoadedMessage {
        type: 'loaded';
        payload: LanguageOrProcessor;
    }
    export interface LoadFailedMessage {
        type: 'load-failed';
        payload: LanguageOrProcessor;
    }
    export interface CompileMessage {
        type: 'compile';
        payload: {
            content: string;
            language: LanguageOrProcessor;
            config: Config;
            options: any;
        };
    }
    export interface CompileInCompilerMessage {
        type: 'compileInCompiler';
        payload: {
            content: string;
            language: LanguageOrProcessor;
            config: Config;
            options: any;
        };
    }
    export interface CompiledMessage {
        type: 'compiled';
        trigger: 'compile' | 'compileInCompiler';
        payload: {
            content: string;
            language: LanguageOrProcessor;
            compiled: string | CompileResult;
            config: Config;
            options: any;
        };
    }
    export interface CompileFailedMessage {
        type: 'compile-failed';
        trigger: 'compile' | 'compileInCompiler';
        payload: {
            content: string;
            language: LanguageOrProcessor;
            error: string;
        };
    }
    export interface TypeScriptMessage {
        type: 'ts-features';
        payload: {
            id: string;
            feature: TypescriptFeatures;
            data: any;
        };
    }
}
declare module "livecodes/compiler/utils" {
    import type { CompileResult, CompilerFunction } from "livecodes/models";
    export const getCompileResult: (result: Awaited<ReturnType<CompilerFunction>>) => CompileResult;
}
declare module "livecodes/compiler/compile-in-compiler" {
    import type { CompileOptions, CompileResult, Config } from "livecodes/models";
    import type { LanguageOrProcessor } from "livecodes/compiler/models";
    export const compileInCompiler: (content: string, language: LanguageOrProcessor | undefined, config: Config, options?: CompileOptions, worker?: Worker) => Promise<CompileResult>;
}
declare module "livecodes/compiler/import-map" {
    import type { CompileInfo, Config, Language } from "livecodes/models";
    export const importsPattern: RegExp;
    export const dynamicImportsPattern: RegExp;
    export const getImports: (code: string, removeSpecifier?: boolean) => string[];
    export const isBare: (mod: string) => boolean;
    export const findImportMapKey: (mod: string, importmap: Record<string, string>) => string | undefined;
    export const createImportMap: (code: string, config: Config, { fallbackToCdn, external }?: {
        fallbackToCdn?: boolean;
        external?: string;
    }) => {
        [x: string]: string;
    };
    export const hasImports: (code: string) => boolean;
    export const hasExports: (code: string) => boolean;
    export const hasDefaultExport: (code: string) => boolean;
    export const hasUrlImportsOrExports: (code: string) => boolean;
    export const hasAwait: (code: string) => boolean;
    export const isModuleScript: (code: string) => boolean;
    export const replaceImports: (code: string, config: Config, { importMap, external }?: {
        importMap?: Record<string, string>;
        external?: string;
    }) => string;
    export const isScriptImport: (mod: string) => boolean;
    export const replaceSFCImports: (code: string, { filename, config, isSfc, getLanguageByAlias, compileSFC, external, }: {
        config: Config;
        filename: string;
        isSfc: (mod: string) => boolean;
        getLanguageByAlias: (alias: string) => Language | undefined;
        compileSFC: (code: string, options: {
            filename: string;
            config: Config;
        }) => Promise<string>;
        external?: string;
    }) => Promise<string>;
    export const removeImports: (code: string, mods: string[]) => string;
    export const styleimportsPattern: RegExp;
    export const hasStyleImports: (code: string) => boolean;
    export const replaceStyleImports: (code: string, exceptions?: string[] | RegExp[]) => string;
    export const cjs2esm: (code: string) => string;
    export const createCSSModulesImportMap: (compiledScript: string, compiledStyle: string, cssTokens?: CompileInfo['cssModules'], extension?: Language) => {
        [x: string]: string;
    };
}
declare module "livecodes/compiler/compile-blocks" {
    import type { Config } from "livecodes/models";
    import type { LanguageOrProcessor } from "livecodes/compiler/models";
    interface CompileBlocksOptions {
        removeEnclosingTemplate?: boolean;
        languageAttribute?: 'lang' | 'type';
        prepareFn?: (code: string, config: Config) => Promise<string>;
        skipCompilers?: LanguageOrProcessor[];
    }
    /**
     * This is a workaround to prevent typescript removing default imports (components)
     * that are not used in the typescript code but are used in the template
     * by exporting them
     * e.g.
     * <script setup>
     * import Counter from './App.vue';
     * </script>
     * <template><Counter /></template>
     */
    export const exportDefaultImports: (code: string) => string;
    export const fetchBlocksSource: (code: string, blockElement: 'template' | 'style' | 'script') => Promise<string>;
    export const compileBlocks: (code: string, blockElement: 'template' | 'style' | 'script', config: Config, options?: CompileBlocksOptions) => Promise<string>;
    export const compileAllBlocks: (code: string, config: Config, options?: CompileBlocksOptions) => Promise<string>;
}
declare module "livecodes/compiler/get-all-compilers" {
    import type { Compilers, Config, LanguageSpecs, ProcessorSpecs } from "livecodes/models";
    export const getAllCompilers: (languages: Array<LanguageSpecs | ProcessorSpecs>, config: Config, baseUrl: string) => Compilers;
}
declare module "livecodes/services/allowed-origin" {
    export const allowedOrigin: (origin?: string) => boolean;
    export const whitelistTarget: (url: string) => boolean;
}
declare module "livecodes/services/auth" {
    import type { GithubScope, User } from "livecodes/models";
    interface AuthService {
        load(): Promise<void>;
        getUser(): Promise<User | void>;
        signIn(scopes?: GithubScope[]): Promise<User | void>;
        signOut(): Promise<void>;
        isLoggedIn(): boolean;
    }
    export const createAuthService: (isEmbed: boolean) => AuthService;
}
declare module "livecodes/services/broadcast" {
    export const broadcastService: {
        getUrl: () => string;
    };
}
declare module "livecodes/services/cors" {
    export const corsService: {
        fetch: (url: string, options?: RequestInit) => Promise<Response>;
    };
}
declare module "livecodes/html/sandbox/index" {
    export const sandboxVersion = "v9";
}
declare module "livecodes/services/sandbox" {
    export const sandboxService: {
        getResultUrl: () => string;
        getCompilerUrl: () => string;
        getOrigin: () => string;
    };
}
declare module "livecodes/services/share" {
    import type { Config } from "livecodes/models";
    type ConfigWithResult = Partial<Config & {
        result: string;
    }>;
    interface ShareService {
        getProject: (id: string) => Promise<ConfigWithResult>;
        shareProject: (config: ConfigWithResult) => Promise<string>;
    }
    export const shareService: ShareService;
}
declare module "livecodes/services/utils" {
    export const removeCDNPrefix: (url: string) => string;
    export const removeSpecifier: (type: string) => string;
}
declare module "livecodes/services/types" {
    import type { Types } from "livecodes/models";
    export const typesService: {
        getTypeUrls: (types: string[]) => Promise<Types>;
        getTypesAsImports: (types: string[]) => string;
    };
}
declare module "livecodes/services/index" {
    export * from "livecodes/services/allowed-origin";
    export * from "livecodes/services/auth";
    export * from "livecodes/services/broadcast";
    export * from "livecodes/services/cors";
    export * from "livecodes/services/modules";
    export * from "livecodes/services/sandbox";
    export * from "livecodes/services/share";
    export * from "livecodes/services/types";
}
declare module "livecodes/compiler/compiler-sandbox" {
    export const createCompilerSandbox: (sandboxUrl: string) => Promise<Window>;
}
declare module "livecodes/compiler/create-compiler" {
    import type { Config } from "livecodes/models";
    import type { Compiler } from "livecodes/compiler/models";
    export const createCompiler: ({ config, baseUrl, eventsManager, }: {
        config: Config;
        baseUrl: string;
        eventsManager: any;
    }) => Promise<Compiler>;
}
declare module "livecodes/compiler/get-compiler" {
    import type { Config, EventsManager } from "livecodes/models";
    import type { Compiler } from "livecodes/compiler/models";
    export const getCompiler: (options: {
        config: Config;
        baseUrl: string;
        eventsManager: EventsManager;
    }) => Promise<Compiler>;
}
declare module "livecodes/compiler/index" {
    export * from "livecodes/compiler/compile-blocks";
    export * from "livecodes/compiler/compile-in-compiler";
    export * from "livecodes/compiler/get-all-compilers";
    export * from "livecodes/compiler/get-compiler";
    export * from "livecodes/compiler/import-map";
    export * from "livecodes/compiler/utils";
}
declare module "livecodes/languages/commonlisp/lang-commonlisp" {
    import type { LanguageSpecs } from "livecodes/models";
    export const parenFormatter: () => (value: string) => Promise<{
        formatted: any;
        cursorOffset: number;
    }>;
    export const commonlisp: LanguageSpecs;
}
declare module "livecodes/languages/commonlisp/index" {
    export * from "livecodes/languages/commonlisp/lang-commonlisp";
}
declare module "livecodes/languages/clojurescript/lang-clojurescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const clojurescript: LanguageSpecs;
}
declare module "livecodes/languages/clojurescript/index" {
    export * from "livecodes/languages/clojurescript/lang-clojurescript";
}
declare module "livecodes/languages/coffeescript/lang-coffeescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const coffeescript: LanguageSpecs;
}
declare module "livecodes/languages/coffeescript/index" {
    export * from "livecodes/languages/coffeescript/lang-coffeescript";
}
declare module "livecodes/languages/cpp/lang-cpp" {
    import type { LanguageSpecs } from "livecodes/models";
    export const cdnUrl: string;
    export const cpp: LanguageSpecs;
}
declare module "livecodes/languages/cpp/index" {
    export * from "livecodes/languages/cpp/lang-cpp";
}
declare module "livecodes/languages/cpp-wasm/lang-cpp-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const cppWasm: LanguageSpecs;
}
declare module "livecodes/languages/cpp-wasm/index" {
    export * from "livecodes/languages/cpp-wasm/lang-cpp-wasm";
}
declare module "livecodes/languages/csharp-wasm/lang-csharp-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const csharpWasm: LanguageSpecs;
}
declare module "livecodes/languages/csharp-wasm/index" {
    export * from "livecodes/languages/csharp-wasm/lang-csharp-wasm";
}
declare module "livecodes/languages/css/lang-css" {
    import type { LanguageSpecs } from "livecodes/models";
    export const css: LanguageSpecs;
}
declare module "livecodes/languages/css/index" {
    export * from "livecodes/languages/css/lang-css";
}
declare module "livecodes/languages/diagrams/lang-diagrams" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const diagrams: LanguageSpecs;
}
declare module "livecodes/languages/diagrams/index" {
    export * from "livecodes/languages/diagrams/lang-diagrams";
}
declare module "livecodes/languages/dot/lang-dot" {
    import type { LanguageSpecs } from "livecodes/models";
    export const dot: LanguageSpecs;
}
declare module "livecodes/languages/dot/index" {
    export * from "livecodes/languages/dot/lang-dot";
}
declare module "livecodes/languages/ejs/lang-ejs" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ejs: LanguageSpecs;
}
declare module "livecodes/languages/ejs/index" {
    export * from "livecodes/languages/ejs/lang-ejs";
}
declare module "livecodes/languages/eta/lang-eta" {
    import type { LanguageSpecs } from "livecodes/models";
    export const eta: LanguageSpecs;
}
declare module "livecodes/languages/eta/index" {
    export * from "livecodes/languages/eta/lang-eta";
}
declare module "livecodes/languages/fennel/lang-fennel" {
    import type { LanguageSpecs } from "livecodes/models";
    export const fennel: LanguageSpecs;
}
declare module "livecodes/languages/fennel/index" {
    export * from "livecodes/languages/fennel/lang-fennel";
}
declare module "livecodes/languages/flow/lang-flow" {
    import type { LanguageSpecs } from "livecodes/models";
    export const flow: LanguageSpecs;
}
declare module "livecodes/languages/flow/index" {
    export * from "livecodes/languages/flow/lang-flow";
}
declare module "livecodes/languages/gleam/lang-gleam" {
    import type { LanguageSpecs } from "livecodes/models";
    export const gleam: LanguageSpecs;
}
declare module "livecodes/languages/gleam/index" {
    export * from "livecodes/languages/gleam/lang-gleam";
}
declare module "livecodes/languages/go/lang-go" {
    import type { LanguageSpecs } from "livecodes/models";
    export const go: LanguageSpecs;
}
declare module "livecodes/languages/go/index" {
    export * from "livecodes/languages/go/lang-go";
}
declare module "livecodes/languages/go-wasm/lang-go-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const goWasm: LanguageSpecs;
}
declare module "livecodes/languages/go-wasm/index" {
    export * from "livecodes/languages/go-wasm/lang-go-wasm";
}
declare module "livecodes/languages/haml/lang-haml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const haml: LanguageSpecs;
}
declare module "livecodes/languages/haml/index" {
    export * from "livecodes/languages/haml/lang-haml";
}
declare module "livecodes/languages/handlebars/lang-handlebars" {
    import type { LanguageSpecs } from "livecodes/models";
    export const runtimeUrl: string;
    export const handlebars: LanguageSpecs;
}
declare module "livecodes/languages/handlebars/index" {
    export * from "livecodes/languages/handlebars/lang-handlebars";
}
declare module "livecodes/languages/html/lang-html" {
    import type { LanguageSpecs } from "livecodes/models";
    export const html: LanguageSpecs;
}
declare module "livecodes/languages/html/index" {
    export * from "livecodes/languages/html/lang-html";
}
declare module "livecodes/languages/imba/lang-imba" {
    import type { LanguageSpecs } from "livecodes/models";
    export const imba: LanguageSpecs;
}
declare module "livecodes/languages/imba/index" {
    export * from "livecodes/languages/imba/lang-imba";
}
declare module "livecodes/languages/java/lang-java" {
    import type { LanguageSpecs } from "livecodes/models";
    export const java: LanguageSpecs;
}
declare module "livecodes/languages/java/index" {
    export * from "livecodes/languages/java/lang-java";
}
declare module "livecodes/languages/javascript/lang-javascript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const javascript: LanguageSpecs;
}
declare module "livecodes/languages/javascript/index" {
    export * from "livecodes/languages/javascript/lang-javascript";
}
declare module "livecodes/languages/jinja/lang-jinja" {
    import type { LanguageSpecs } from "livecodes/models";
    export const jinjaUrl: string;
    export const jinja: LanguageSpecs;
}
declare module "livecodes/languages/jinja/index" {
    export * from "livecodes/languages/jinja/lang-jinja";
}
declare module "livecodes/languages/jsx/lang-jsx" {
    import type { LanguageSpecs } from "livecodes/models";
    export const jsx: LanguageSpecs;
}
declare module "livecodes/languages/jsx/lang-tsx" {
    import type { LanguageSpecs } from "livecodes/models";
    export const tsx: LanguageSpecs;
}
declare module "livecodes/languages/jsx/index" {
    export * from "livecodes/languages/jsx/lang-jsx";
    export * from "livecodes/languages/jsx/lang-tsx";
}
declare module "livecodes/languages/julia/lang-julia" {
    import type { LanguageSpecs } from "livecodes/models";
    export const julia: LanguageSpecs;
}
declare module "livecodes/languages/julia/index" {
    export * from "livecodes/languages/julia/lang-julia";
}
declare module "livecodes/languages/less/lang-less" {
    import type { LanguageSpecs } from "livecodes/models";
    export const less: LanguageSpecs;
}
declare module "livecodes/languages/less/index" {
    export * from "livecodes/languages/less/lang-less";
}
declare module "livecodes/languages/liquid/lang-liquid" {
    import type { LanguageSpecs } from "livecodes/models";
    export const liquid: LanguageSpecs;
}
declare module "livecodes/languages/liquid/index" {
    export * from "livecodes/languages/liquid/lang-liquid";
}
declare module "livecodes/languages/livescript/lang-livescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const livescript: LanguageSpecs;
}
declare module "livecodes/languages/livescript/index" {
    export * from "livecodes/languages/livescript/lang-livescript";
}
declare module "livecodes/languages/lua/lang-lua" {
    import type { LanguageFormatter, LanguageSpecs } from "livecodes/models";
    export const luaFormatter: LanguageFormatter;
    export const lua: LanguageSpecs;
}
declare module "livecodes/languages/lua/index" {
    export * from "livecodes/languages/lua/lang-lua";
}
declare module "livecodes/languages/lua-wasm/lang-lua-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const luaWasm: LanguageSpecs;
}
declare module "livecodes/languages/lua-wasm/index" {
    export * from "livecodes/languages/lua-wasm/lang-lua-wasm";
}
declare module "livecodes/languages/malina/lang-malina" {
    import type { LanguageSpecs } from "livecodes/models";
    export const malina: LanguageSpecs;
}
declare module "livecodes/languages/malina/index" {
    export * from "livecodes/languages/malina/lang-malina";
}
declare module "livecodes/languages/markdown/lang-markdown" {
    import type { LanguageSpecs } from "livecodes/models";
    export const markdown: LanguageSpecs;
}
declare module "livecodes/languages/markdown/index" {
    export * from "livecodes/languages/markdown/lang-markdown";
}
declare module "livecodes/languages/mdx/lang-mdx" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const mdx: LanguageSpecs;
}
declare module "livecodes/languages/mdx/index" {
    export * from "livecodes/languages/mdx/lang-mdx";
}
declare module "livecodes/languages/minizinc/lang-minizinc" {
    import type { LanguageSpecs } from "livecodes/models";
    export const minizinc: LanguageSpecs;
}
declare module "livecodes/languages/minizinc/index" {
    export * from "livecodes/languages/minizinc/lang-minizinc";
}
declare module "livecodes/languages/mjml/lang-mjml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const mjml: LanguageSpecs;
}
declare module "livecodes/languages/mjml/index" {
    export * from "livecodes/languages/mjml/lang-mjml";
}
declare module "livecodes/languages/mustache/lang-mustache" {
    import type { LanguageSpecs } from "livecodes/models";
    export const mustache: LanguageSpecs;
}
declare module "livecodes/languages/mustache/index" {
    export * from "livecodes/languages/mustache/lang-mustache";
}
declare module "livecodes/languages/nunjucks/lang-nunjucks" {
    import type { LanguageSpecs } from "livecodes/models";
    export const runtimeUrl: string;
    export const nunjucks: LanguageSpecs;
}
declare module "livecodes/languages/nunjucks/index" {
    export * from "livecodes/languages/nunjucks/lang-nunjucks";
}
declare module "livecodes/languages/ocaml/lang-ocaml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ocaml: LanguageSpecs;
}
declare module "livecodes/languages/ocaml/index" {
    export * from "livecodes/languages/ocaml/lang-ocaml";
}
declare module "livecodes/languages/perl/lang-perl" {
    import type { LanguageSpecs } from "livecodes/models";
    export const perl: LanguageSpecs;
}
declare module "livecodes/languages/perl/index" {
    export * from "livecodes/languages/perl/lang-perl";
}
declare module "livecodes/languages/php/lang-php" {
    import type { LanguageSpecs } from "livecodes/models";
    export const php: LanguageSpecs;
}
declare module "livecodes/languages/php/index" {
    export * from "livecodes/languages/php/lang-php";
}
declare module "livecodes/languages/php-wasm/lang-php-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const phpWasm: LanguageSpecs;
}
declare module "livecodes/languages/php-wasm/index" {
    export * from "livecodes/languages/php-wasm/lang-php-wasm";
}
declare module "livecodes/languages/postgresql/lang-postgresql" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const postgresql: LanguageSpecs;
}
declare module "livecodes/languages/postgresql/index" {
    export * from "livecodes/languages/postgresql/lang-postgresql";
}
declare module "livecodes/languages/prolog/lang-prolog" {
    import type { LanguageSpecs } from "livecodes/models";
    export const prolog: LanguageSpecs;
}
declare module "livecodes/languages/prolog/index" {
    export * from "livecodes/languages/prolog/lang-prolog";
}
declare module "livecodes/languages/pug/lang-pug" {
    import type { LanguageSpecs } from "livecodes/models";
    export const pug: LanguageSpecs;
}
declare module "livecodes/languages/pug/index" {
    export * from "livecodes/languages/pug/lang-pug";
}
declare module "livecodes/languages/python/lang-python" {
    import type { LanguageSpecs } from "livecodes/models";
    export const python: LanguageSpecs;
}
declare module "livecodes/languages/python/index" {
    export * from "livecodes/languages/python/lang-python";
}
declare module "livecodes/languages/python-wasm/lang-python-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const pythonWasm: LanguageSpecs;
}
declare module "livecodes/languages/python-wasm/index" {
    export * from "livecodes/languages/python-wasm/lang-python-wasm";
}
declare module "livecodes/languages/r/lang-r" {
    import type { LanguageSpecs } from "livecodes/models";
    export const r: LanguageSpecs;
}
declare module "livecodes/languages/r/index" {
    export * from "livecodes/languages/r/lang-r";
}
declare module "livecodes/languages/react/lang-react" {
    import type { LanguageSpecs } from "livecodes/models";
    export const react: LanguageSpecs;
}
declare module "livecodes/languages/react/lang-react-tsx" {
    import type { LanguageSpecs } from "livecodes/models";
    export const reactTsx: LanguageSpecs;
}
declare module "livecodes/languages/react/index" {
    export * from "livecodes/languages/react/lang-react";
    export * from "livecodes/languages/react/lang-react-tsx";
}
declare module "livecodes/languages/typescript/lang-typescript" {
    import type { Config, LanguageSpecs } from "livecodes/models";
    export const hasCustomJsxRuntime: (code: string, config: Config) => boolean;
    export const typescriptOptions: {
        target: string;
        jsx: string;
        allowUmdGlobalAccess: boolean;
        esModuleInterop: boolean;
    };
    export const typescript: LanguageSpecs;
}
declare module "livecodes/languages/typescript/index" {
    export * from "livecodes/languages/typescript/lang-typescript";
}
declare module "livecodes/languages/react-native/lang-react-native" {
    import type { LanguageSpecs } from "livecodes/models";
    export const reactNative: LanguageSpecs;
}
declare module "livecodes/languages/react-native/lang-react-native-tsx" {
    import type { LanguageSpecs } from "livecodes/models";
    export const reactNativeTsx: LanguageSpecs;
}
declare module "livecodes/languages/react-native/index" {
    export * from "livecodes/languages/react-native/lang-react-native";
    export * from "livecodes/languages/react-native/lang-react-native-tsx";
}
declare module "livecodes/languages/rescript/lang-rescript" {
    import type { CompilerFunction, LanguageFormatter, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const formatterFactory: LanguageFormatter['factory'];
    export const rescript: LanguageSpecs;
}
declare module "livecodes/languages/rescript/index" {
    export * from "livecodes/languages/rescript/lang-rescript";
}
declare module "livecodes/languages/reason/lang-reason" {
    import type { LanguageSpecs } from "livecodes/models";
    export const reason: LanguageSpecs;
}
declare module "livecodes/languages/reason/index" {
    export * from "livecodes/languages/reason/lang-reason";
}
declare module "livecodes/languages/richtext/lang-richtext" {
    import type { LanguageSpecs } from "livecodes/models";
    export const richtext: LanguageSpecs;
}
declare module "livecodes/languages/richtext/index" {
    export * from "livecodes/languages/richtext/lang-richtext";
}
declare module "livecodes/languages/riot/lang-riot" {
    import type { LanguageSpecs } from "livecodes/models";
    export const riot: LanguageSpecs;
}
declare module "livecodes/languages/riot/index" {
    export * from "livecodes/languages/riot/lang-riot";
}
declare module "livecodes/languages/ruby/lang-ruby" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ruby: LanguageSpecs;
}
declare module "livecodes/languages/ruby/index" {
    export * from "livecodes/languages/ruby/lang-ruby";
}
declare module "livecodes/languages/ruby-wasm/lang-ruby-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const rubyWasm: LanguageSpecs;
}
declare module "livecodes/languages/ruby-wasm/index" {
    export * from "livecodes/languages/ruby-wasm/lang-ruby-wasm";
}
declare module "livecodes/languages/scheme/lang-scheme" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scheme: LanguageSpecs;
}
declare module "livecodes/languages/scheme/index" {
    export * from "livecodes/languages/scheme/lang-scheme";
}
declare module "livecodes/languages/scss/lang-sass" {
    import type { LanguageSpecs } from "livecodes/models";
    export const sass: LanguageSpecs;
}
declare module "livecodes/languages/scss/lang-scss" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scss: LanguageSpecs;
}
declare module "livecodes/languages/scss/index" {
    export * from "livecodes/languages/scss/lang-sass";
    export * from "livecodes/languages/scss/lang-scss";
}
declare module "livecodes/languages/solid/lang-solid" {
    import type { LanguageSpecs } from "livecodes/models";
    export const solid: LanguageSpecs;
}
declare module "livecodes/languages/solid/lang-solid-tsx" {
    import type { LanguageSpecs } from "livecodes/models";
    export const solidTsx: LanguageSpecs;
}
declare module "livecodes/languages/solid/index" {
    export * from "livecodes/languages/solid/lang-solid";
    export * from "livecodes/languages/solid/lang-solid-tsx";
}
declare module "livecodes/languages/sql/lang-sql" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scriptType = "application/json";
    export const sql: LanguageSpecs;
}
declare module "livecodes/languages/sql/index" {
    export * from "livecodes/languages/sql/lang-sql";
}
declare module "livecodes/languages/stencil/lang-stencil" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stencil: LanguageSpecs;
}
declare module "livecodes/languages/stencil/index" {
    export * from "livecodes/languages/stencil/lang-stencil";
}
declare module "livecodes/languages/stylis/lang-stylis" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stylis: LanguageSpecs;
}
declare module "livecodes/languages/stylis/index" {
    export * from "livecodes/languages/stylis/lang-stylis";
}
declare module "livecodes/languages/stylus/lang-stylus" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stylus: LanguageSpecs;
}
declare module "livecodes/languages/stylus/index" {
    export * from "livecodes/languages/stylus/lang-stylus";
}
declare module "livecodes/languages/sucrase/lang-sucrase" {
    import type { LanguageSpecs } from "livecodes/models";
    export const sucrase: LanguageSpecs;
}
declare module "livecodes/languages/sucrase/index" {
    export * from "livecodes/languages/sucrase/lang-sucrase";
}
declare module "livecodes/languages/svelte/lang-svelte" {
    import type { LanguageSpecs } from "livecodes/models";
    export const svelte: LanguageSpecs;
    export const svelteApp: LanguageSpecs;
}
declare module "livecodes/languages/svelte/index" {
    export * from "livecodes/languages/svelte/lang-svelte";
}
declare module "livecodes/languages/tcl/lang-tcl" {
    import type { LanguageSpecs } from "livecodes/models";
    export const tcl: LanguageSpecs;
}
declare module "livecodes/languages/tcl/index" {
    export * from "livecodes/languages/tcl/lang-tcl";
}
declare module "livecodes/languages/teal/lang-teal" {
    import type { LanguageSpecs } from "livecodes/models";
    export const teal: LanguageSpecs;
}
declare module "livecodes/languages/teal/index" {
    export * from "livecodes/languages/teal/lang-teal";
}
declare module "livecodes/languages/twig/lang-twig" {
    import type { LanguageSpecs } from "livecodes/models";
    export const twig: LanguageSpecs;
}
declare module "livecodes/languages/twig/index" {
    export * from "livecodes/languages/twig/lang-twig";
}
declare module "livecodes/languages/vento/lang-vento" {
    import type { LanguageSpecs } from "livecodes/models";
    export const vento: LanguageSpecs;
}
declare module "livecodes/languages/vento/index" {
    export * from "livecodes/languages/vento/lang-vento";
}
declare module "livecodes/languages/vue/lang-vue" {
    import type { LanguageSpecs } from "livecodes/models";
    export const vue: LanguageSpecs;
    export const vueApp: LanguageSpecs;
}
declare module "livecodes/languages/vue/index" {
    export * from "livecodes/languages/vue/lang-vue";
}
declare module "livecodes/languages/vue2/lang-vue2" {
    import type { LanguageSpecs } from "livecodes/models";
    export const vue2: LanguageSpecs;
}
declare module "livecodes/languages/vue2/index" {
    export * from "livecodes/languages/vue2/lang-vue2";
}
declare module "livecodes/languages/wat/lang-wat" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scriptType = "application/wasm-uint8";
    export const wat: LanguageSpecs;
}
declare module "livecodes/languages/wat/index" {
    export * from "livecodes/languages/wat/lang-wat";
}
declare module "livecodes/languages/languages" {
    import type { LanguageSpecs } from "livecodes/models";
    export const languages: LanguageSpecs[];
}
declare module "livecodes/languages/postcss/postcss-plugins" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const autoprefixer: ProcessorSpecs;
    export const cssnano: ProcessorSpecs;
    export const postcssImportUrl: ProcessorSpecs;
    export const postcssPresetEnv: ProcessorSpecs;
    export const purgecss: ProcessorSpecs;
    export const tokencss: ProcessorSpecs;
    export const cssModules: ProcessorSpecs;
}
declare module "livecodes/languages/postcss/processor-postcss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const postcss: ProcessorSpecs;
}
declare module "livecodes/languages/postcss/index" {
    export * from "livecodes/languages/postcss/postcss-plugins";
    export * from "livecodes/languages/postcss/processor-postcss";
}
declare module "livecodes/languages/lightningcss/processor-lightningcss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const lightningcss: ProcessorSpecs;
}
declare module "livecodes/languages/lightningcss/index" {
    export * from "livecodes/languages/lightningcss/processor-lightningcss";
}
declare module "livecodes/languages/tailwindcss/processor-tailwindcss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const tailwindcss: ProcessorSpecs;
}
declare module "livecodes/languages/tailwindcss/index" {
    export * from "livecodes/languages/tailwindcss/processor-tailwindcss";
}
declare module "livecodes/languages/unocss/processor-unocss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const unocss: ProcessorSpecs;
}
declare module "livecodes/languages/unocss/index" {
    export * from "livecodes/languages/unocss/processor-unocss";
}
declare module "livecodes/languages/windicss/processor-windicss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const windicss: ProcessorSpecs;
}
declare module "livecodes/languages/windicss/index" {
    export * from "livecodes/languages/windicss/processor-windicss";
}
declare module "livecodes/languages/processors" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const processors: ProcessorSpecs[];
}
declare module "livecodes/languages/index" {
    export * from "livecodes/languages/css-presets";
    export * from "livecodes/languages/languages";
    export * from "livecodes/languages/postcss/index";
    export * from "livecodes/languages/prettier";
    export * from "livecodes/languages/processors";
    export * from "livecodes/languages/utils";
}
declare module "livecodes/config/default-config" {
    import type { Config } from "livecodes/models";
    export const defaultConfig: Config;
}
declare module "livecodes/config/build-config" {
    import type { Config, UrlQueryParams } from "livecodes/models";
    /**
     * Builds and validates a configuration object by merging default config with user config and URL params
     *
     * @param appConfig - Partial configuration object provided by user
     * @returns Complete validated configuration object
     *
     * The function:
     * 1. Merges default config with user provided config
     * 2. Handles special case for 'result' mode tools
     * 3. Processes URL query parameters
     * 4. Sets active editor
     * 5. Fixes language names in final config
     */
    export const buildConfig: (appConfig: Partial<Config>) => Config;
    /**
     * Extracts and processes URL query parameters and hash parameters, converting them into a structured object
     *
     * @param queryParams - The URL search query string. Defaults to parent.location.search
     * @param hashParams - The URL hash string. Defaults to parent.location.hash
     * @returns {UrlQueryParams} An object containing processed URL parameters where:
     *
     * - Values 'true' and 'false' are converted to boolean
     * - Empty string values are converted to true
     * - URL encoded values are decoded
     * - Special 'params' key content is decompressed and parsed as JSON
     * - Hash parameters take precedence over query parameters with the same key
     *
     * @example
     * // For URL: http://example.com?foo=bar&empty=&isTrue=true#param=value
     * getParams() // Returns: { foo: "bar", empty: true, isTrue: true, param: "value" }
     */
    export const getParams: (queryParams?: string, hashParams?: string) => UrlQueryParams;
    export const loadParamConfig: (config: Config, params: UrlQueryParams) => Partial<Config>;
}
declare module "livecodes/config/upgrade-config" {
    import type { Config } from "livecodes/models";
    interface genericConfig extends Config {
        [x: string]: any;
    }
    export const upgradeConfig: (oldConfig: genericConfig) => genericConfig;
    export const isEarlier: ({ version, comparedTo }: {
        version: string;
        comparedTo: string;
    }) => boolean;
}
declare module "livecodes/config/validate-config" {
    import type { Config } from "livecodes/models";
    export const validateConfig: (config: Partial<Config>) => Partial<Config>;
}
declare module "livecodes/config/config" {
    import type { AppConfig, Config, ContentConfig, EditorConfig, FormatterConfig, UserConfig } from "livecodes/models";
    export const getConfig: () => Config;
    export const setConfig: (newConfig: Config) => void;
    export const getContentConfig: (config: Config | ContentConfig) => ContentConfig;
    export const getAppConfig: (config: Config | AppConfig) => AppConfig;
    export const getUserConfig: (config: Config | UserConfig) => UserConfig;
    export const getEditorConfig: (config: Config | UserConfig) => EditorConfig;
    export const getFormatterConfig: (config: Config | UserConfig) => FormatterConfig;
    export const upgradeAndValidate: (config: Partial<Config>) => Partial<Config>;
}
declare module "livecodes/config/index" {
    export * from "livecodes/config/build-config";
    export * from "livecodes/config/config";
    export * from "livecodes/config/default-config";
}
declare module "livecodes/notifications/snackbar" {
    import type { Action } from '@snackbar/core';
    export const darkTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const lightTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const infoTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const successTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const warningTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const dangerTheme: {
        textColor: string;
        actionColor: string;
        backgroundColor: string;
    };
    export const closeButton: Action;
    export const acceptButton: Action;
}
declare module "livecodes/notifications/create-notifications" {
    import type { Notifications } from "livecodes/models";
    export const hasOpenNotifications: () => boolean;
    export const createNotifications: () => Notifications;
}
declare module "livecodes/notifications/index" {
    export * from "livecodes/notifications/create-notifications";
}
declare module "livecodes/UI/accordion" {
    export const createAccordion: ({ container, single, open, }: {
        container: HTMLElement | Document;
        single?: boolean;
        open?: boolean;
    }) => void;
}
declare module "livecodes/UI/modal" {
    import type { Modal } from "livecodes/models";
    export const createModal: (deps: {
        translate: (container: HTMLElement) => void;
        isEmbed: boolean;
        onClose: () => void;
    }) => Modal;
}
declare module "livecodes/cache/cache" {
    import type { Cache, Code, EditorId, Language } from "livecodes/models";
    export const getCache: () => Cache;
    export const setCache: (newCache?: Cache) => void;
    export const updateCache: (editorId: EditorId, language: Language, modified: string) => void;
    export const getCachedCode: () => Code;
}
declare module "livecodes/cache/utils" {
    import type { Cache, ContentConfig } from "livecodes/models";
    export const cacheIsValid: (cache: Cache, config: ContentConfig) => boolean;
}
declare module "livecodes/cache/index" {
    export * from "livecodes/cache/cache";
    export * from "livecodes/cache/utils";
}
declare module "livecodes/export/utils" {
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Config, ContentConfig, EditorId, Language, User } from "livecodes/models";
    export interface Files {
        [key: string]: {
            content: string;
        };
    }
    export const getFilesFromConfig: (config: Config | ContentConfig, { getLanguageExtension, }: {
        getLanguageExtension: typeof getLanguageExtensionFn;
    }) => Files;
    export const getDescriptionFile: (config: ContentConfig, user?: User, url?: string, gist?: boolean) => {
        [x: string]: {
            content: string;
        };
    };
    export const getCompilerScripts: ({ baseUrl, editorId, config, compiled, supportedLanguages, getLanguageCompiler, }: {
        baseUrl: string;
        editorId: EditorId;
        config: Config;
        compiled: {
            script: string;
            style: string;
            markup: string;
        };
        supportedLanguages: {
            script: Language[];
            style: Language[];
            markup: Language[];
        };
        getLanguageCompiler: typeof getLanguageCompilerFn;
    }) => string[];
    export const getContent: ({ editorId, config, compiled, supportedLanguages, getLanguageCompiler, }: {
        editorId: EditorId;
        config: Config;
        compiled: {
            script: string;
            style: string;
            markup: string;
        };
        supportedLanguages: {
            script: Language[];
            style: Language[];
            markup: Language[];
        };
        getLanguageCompiler: typeof getLanguageCompilerFn;
    }) => string;
}
declare module "livecodes/deploy/deploy" {
    import type { getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { ContentConfig, User } from "livecodes/models";
    import { type GitHubFile } from "livecodes/services/github";
    export interface DeployResult {
        url: string;
        username: string;
        repo: string;
        tree: string;
        commit: string;
    }
    export const deploy: ({ user, repo, config, content, message, commitSource, singleFile, newRepo, deps, }: {
        user: User;
        repo: string;
        config: ContentConfig;
        content: {
            resultPage: string;
            style: string;
            script: string;
        };
        message: string;
        commitSource: boolean;
        singleFile: boolean;
        newRepo: boolean;
        deps: {
            getLanguageExtension: typeof getLanguageExtensionFn;
        };
    }) => Promise<DeployResult | null>;
    export const deployFile: ({ file, user, repo, branch, message, description, readmeContent, }: {
        file: GitHubFile;
        user: User;
        repo: string;
        branch: string;
        message: string;
        description?: string;
        readmeContent?: string;
    }) => Promise<DeployResult | null>;
    export const deployedConfirmation: (deployResult: DeployResult, sourcePublished: boolean) => HTMLDivElement;
}
declare module "livecodes/deploy/index" {
    export * from "livecodes/deploy/deploy";
}
declare module "livecodes/editor/fake-editor" {
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export const createFakeEditor: (options: EditorOptions) => CodeEditor;
}
declare module "livecodes/editor/fonts" {
    export interface Font {
        id: string;
        name: string;
        label?: string;
        url: string;
    }
    export const fonts: Font[];
    export const getFontFamily: (font: string | undefined) => string;
}
declare module "livecodes/editor/create-editor" {
    import type { CodeEditor, Config, EditorOptions } from "livecodes/models";
    export const createEditor: (options: EditorOptions & {
        activeEditor?: Config['activeEditor'];
    }) => Promise<CodeEditor>;
}
declare module "livecodes/editor/custom-editor-commands" {
    import type { EventsManager } from "livecodes/models";
    export const registerEditorCommands: (enable: boolean, eventsManager: EventsManager) => void;
}
declare module "livecodes/editor/blockly/blockly" {
    import type { BlocklyContent, CustomEditorOptions, Theme } from "livecodes/models";
    export const showBlockly: ({ baseUrl, editors, config, html, eventsManager, }: CustomEditorOptions) => Promise<void>;
    export const getBlocklyContent: ({ baseUrl, editors, config, html, eventsManager, }: CustomEditorOptions) => Promise<BlocklyContent>;
    export const setBlocklyTheme: (theme: Theme) => void;
}
declare module "livecodes/editor/blockly/blockly-editor" {
    import type { CustomEditor, EventsManager } from "livecodes/models";
    export const createBlocklyEditor: ({ baseUrl, eventsManager, }: {
        baseUrl: string;
        eventsManager: EventsManager;
    }) => CustomEditor;
}
declare module "livecodes/editor/blockly/index" {
    export * from "livecodes/editor/blockly/blockly-editor";
}
declare module "livecodes/editor/quill/quill" {
    import type { CustomEditorOptions, Theme } from "livecodes/models";
    export const showQuillEditor: ({ baseUrl, config, editors, eventsManager, }: CustomEditorOptions) => Promise<void>;
    export const getQuillEditorContent: ({ baseUrl, editors, config, html, eventsManager, }: CustomEditorOptions) => Promise<{
        html?: string;
    }>;
    export const setQuillEditorTheme: (theme: Theme) => void;
}
declare module "livecodes/editor/quill/quill-editor" {
    import type { CustomEditor, EventsManager } from "livecodes/models";
    export const createQuillEditor: ({ baseUrl, eventsManager, }: {
        baseUrl: string;
        eventsManager: EventsManager;
    }) => CustomEditor;
}
declare module "livecodes/editor/quill/index" {
    export * from "livecodes/editor/quill/quill-editor";
}
declare module "livecodes/editor/custom-editors" {
    import type { CustomEditors, EventsManager } from "livecodes/models";
    export const createCustomEditors: (options: {
        baseUrl: string;
        eventsManager: EventsManager;
    }) => CustomEditors;
}
declare module "livecodes/editor/index" {
    export * from "livecodes/editor/create-editor";
    export * from "livecodes/editor/custom-editors";
    export * from "livecodes/editor/fonts";
}
declare module "livecodes/export/export-codepen" {
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Config, EditorId } from "livecodes/models";
    export const exportCodepen: (config: Config, { baseUrl, compiled, deps, }: {
        baseUrl: string;
        compiled: {
            script: string;
            style: string;
            markup: string;
        };
        deps: {
            getLanguageExtension: typeof getLanguageExtensionFn;
            getLanguageCompiler: typeof getLanguageCompilerFn;
        };
    }) => void;
}
declare module "livecodes/export/export-github-gist" {
    import type { getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Config, User } from "livecodes/models";
    export const exportGithubGist: (config: Config, { user, deps, }: {
        user: User;
        deps: {
            getLanguageExtension: typeof getLanguageExtensionFn;
        };
    }) => Promise<void>;
}
declare module "livecodes/export/export-html" {
    import type { Config } from "livecodes/models";
    export const exportHTML: (config: Config, html: string) => void;
}
declare module "livecodes/export/export-jsfiddle" {
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Config, EditorId } from "livecodes/models";
    export const exportJsfiddle: (config: Config, { baseUrl, compiled, deps, }: {
        baseUrl: string;
        compiled: {
            script: string;
            style: string;
            markup: string;
        };
        deps: {
            getLanguageExtension: typeof getLanguageExtensionFn;
            getLanguageCompiler: typeof getLanguageCompilerFn;
        };
    }) => void;
}
declare module "livecodes/export/export-json" {
    import type { Config } from "livecodes/models";
    export const exportJSON: (config: Config) => void;
}
declare module "livecodes/export/export-src" {
    import type { getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Config } from "livecodes/models";
    export const exportSrc: (config: Config, { html, deps, }: {
        html: string;
        deps: {
            getLanguageExtension: typeof getLanguageExtensionFn;
        };
    }, _baseUrl?: string) => Promise<void>;
}
declare module "livecodes/export/export" {
    import type { Config } from "livecodes/models";
    export type ExportType = 'json' | 'src' | 'html' | 'codepen' | 'jsfiddle' | 'githubGist';
    export const exportConfig: (config: Config, baseUrl: string, type: ExportType, payload?: any) => void;
}
declare module "livecodes/export/index" {
    export * from "livecodes/export/export";
    export * from "livecodes/export/utils";
}
declare module "livecodes/formatter/models" {
    import type { FormatFn, FormatterConfig, Language } from "livecodes/models";
    export interface Formatter {
        load: (languages: Language[]) => Promise<string>;
        getFormatFn: (language: Language) => Promise<FormatFn>;
        destroy: () => void;
    }
    export interface FormatterMessageEvent extends MessageEvent {
        data: FormatterMessage;
    }
    export type FormatterMessage = InitMessage | LoadMessage | LoadedMessage | LoadFailedMessage | FormatMessage | FormattedMessage | FormatFailedMessage;
    export interface InitMessage {
        type: 'init';
        baseUrl: string;
    }
    export interface LoadMessage {
        type: 'load';
        payload: Language[];
    }
    export interface LoadedMessage {
        type: 'loaded';
        payload: Language[];
    }
    export interface LoadFailedMessage {
        type: 'load-failed';
        payload: Language[];
    }
    export interface FormatMessage {
        type: 'format';
        payload: {
            language: Language;
            value: string;
            cursorOffset: number;
            formatterConfig: Partial<FormatterConfig>;
        };
    }
    export interface FormattedMessage {
        type: 'formatted';
        payload: {
            language: Language;
            value: string;
            cursorOffset: number;
            formatted: string;
            formattedCursorOffset: number;
        };
    }
    export interface FormatFailedMessage {
        type: 'format-failed';
        payload: {
            language: Language;
            value: string;
            cursorOffset: number;
            error: string;
        };
    }
}
declare module "livecodes/formatter/formatter" {
    import type { Formatter } from "livecodes/formatter/models";
    export const createFormatter: (baseUrl: string) => Formatter;
}
declare module "livecodes/formatter/get-formatter" {
    import type { Config } from "livecodes/models";
    import type { Formatter } from "livecodes/formatter/models";
    export const getFormatter: (config: Config, baseUrl: string, lazy: boolean) => Formatter;
}
declare module "livecodes/formatter/index" {
    export * from "livecodes/formatter/get-formatter";
}
declare module "livecodes/import/check-src" {
    export const getValidUrl: (url: string) => URL | undefined;
    export const hostPatterns: {
        github: RegExp;
        githubGist: RegExp;
        gitlab: RegExp;
        codepen: RegExp;
        jsbin: RegExp;
        typescriptPlayground: RegExp;
        vuePlayground: RegExp;
        sveltePlayground: RegExp;
    };
    export const isCompressedCode: (url: string) => boolean;
    export const isCodepen: (url: string, pattern?: RegExp) => boolean;
    export const isDom: (url: string) => boolean;
    export const isGithubUrl: (url: string, pattern?: RegExp) => boolean | undefined;
    export const isGithub: (url: string) => boolean | undefined;
    export const isGithubDir: (url: string, pattern?: RegExp) => boolean | undefined;
    export const isGithubGist: (url: string, pattern?: RegExp) => boolean;
    export const isGitlabUrl: (url: string, pattern?: RegExp) => boolean | undefined;
    export const isGitlabDir: (url: string, pattern?: RegExp) => boolean | undefined;
    export const isGitlabSnippet: (url: string, pattern?: RegExp) => boolean | undefined;
    export const isJsbin: (url: string, pattern?: RegExp) => boolean;
    export const isProjectId: (url: string) => boolean;
    export const isTypescriptPlayground: (url: string, pattern?: RegExp) => boolean;
    export const isVuePlayground: (url: string, pattern?: RegExp) => boolean;
    export const isSveltePlayground: (url: string, pattern?: RegExp) => boolean;
}
declare module "livecodes/import/code" {
    import type { Config } from "livecodes/models";
    export const importCompressedCode: (url: string) => Partial<Config>;
}
declare module "livecodes/import/project-id" {
    export const importProject: (url: string) => Promise<Partial<import("sdk").Config & {
        result: string;
    }>>;
}
declare module "livecodes/import/codepen" {
    import type { Config } from "livecodes/models";
    export const importFromCodepen: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/dom" {
    import type { Config, EditorId, Language } from "livecodes/models";
    type Selectors = {
        [key in EditorId]: {
            language: Language;
            selector: string;
        };
    };
    export const getLanguageSelectors: (params: {
        [key: string]: string;
    }) => Partial<Selectors>;
    export const importFromDom: (html: string, params: {
        [key: string]: string;
    }, config: Config) => Promise<Partial<Config>>;
}
declare module "livecodes/import/github" {
    import type { Config, User } from "livecodes/models";
    export const importFromGithub: (url: string, loggedInUser: User | null | void) => Promise<Partial<Config>>;
    /**
     * Adds base tag for relative links.
     * Removes <!DOCTYPE html>, <html>, <link> and <script> tags.
     * Extracts html attributes.
     */
    export const modifyMarkup: (config: Partial<Config>, files: Array<{
        user: string;
        repo: string;
        ref: string;
        path: string;
    }>) => Partial<Config>;
}
declare module "livecodes/import/utils" {
    import type { Config, EditorId, Language } from "livecodes/models";
    export interface SourceFile {
        filename: string;
        content: string;
        language?: Language;
        editorId?: EditorId;
    }
    export const populateConfig: (files: SourceFile[], params: {
        [key: string]: string;
    }) => Partial<Config>;
}
declare module "livecodes/import/github-dir" {
    import type { User } from "livecodes/models";
    export const importFromGithubDir: (url: string, params: {
        [key: string]: string;
    }, loggedInUser: User | null | void) => Promise<Partial<import("sdk/models").Config>>;
}
declare module "livecodes/import/github-gist" {
    export const importFromGithubGist: (url: string, params: {
        [key: string]: string;
    }) => Promise<{}>;
}
declare module "livecodes/import/gitlab" {
    import type { Config, Language } from "livecodes/models";
    export interface FileData {
        rawURL: string;
        filename: string;
        extension: Language;
        startLine: number;
        endLine: number;
    }
    export const importFromGitlab: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/gitlab-dir" {
    export const importFromGitlabDir: (url: string, params: {
        [key: string]: string;
    }) => Promise<Partial<import("sdk").Config>>;
}
declare module "livecodes/import/gitlab-snippet" {
    export const importFromGitlabSnippet: (url: string, params: {
        [key: string]: string;
    }) => Promise<{}>;
}
declare module "livecodes/import/jsbin" {
    import type { Config } from "livecodes/models";
    export const importFromJsbin: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/typescript-playground" {
    import type { Config } from "livecodes/models";
    export const importTypescriptPlayground: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/image" {
    import type { ContentConfig } from "livecodes/models";
    export const importFromImage: (blob: Blob) => Promise<Partial<ContentConfig>>;
}
declare module "livecodes/import/zip" {
    import type { ContentConfig } from "livecodes/models";
    import type { populateConfig as populateConfigFn } from "livecodes/import/utils";
    export const importFromZip: (blob: Blob, populateConfig: typeof populateConfigFn) => Promise<Partial<ContentConfig>>;
}
declare module "livecodes/import/url" {
    import type { Config } from "livecodes/models";
    export const importFromUrl: (url: string, params: {
        [key: string]: string;
    }, config: Config) => Promise<Partial<Config>>;
}
declare module "livecodes/import/vue-playground" {
    import type { Config } from "livecodes/models";
    export const importVuePlayground: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/import-src" {
    export { importFromCodepen } from "livecodes/import/codepen";
    export { importFromDom } from "livecodes/import/dom";
    export { importFromGithub } from "livecodes/import/github";
    export { importFromGithubDir } from "livecodes/import/github-dir";
    export { importFromGithubGist } from "livecodes/import/github-gist";
    export { importFromGitlab } from "livecodes/import/gitlab";
    export { importFromGitlabDir } from "livecodes/import/gitlab-dir";
    export { importFromGitlabSnippet } from "livecodes/import/gitlab-snippet";
    export { importFromJsbin } from "livecodes/import/jsbin";
    export { importTypescriptPlayground } from "livecodes/import/typescript-playground";
    export { importFromUrl } from "livecodes/import/url";
    export { importVuePlayground } from "livecodes/import/vue-playground";
}
declare module "livecodes/import/import" {
    import type { Config, User } from "livecodes/models";
    export const importCode: (url: string, params: {
        [key: string]: any;
    }, config: Config, user: User | null | void, baseUrl: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/index" {
    export * from "livecodes/import/import";
}
declare module "livecodes/languages/jsx/react-runtime" {
    export const reactRuntime = "\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { createRoot } from \"react-dom/client\";\nimport App from \"./script\";\n(() => {\n  if (typeof App !== \"function\") return;\n  const root = createRoot(document.querySelector(\"#livecodes-app\") || document.body.appendChild(document.createElement(\"div\")));\n  root.render(_jsx(App, {}));\n})();\n";
}
declare module "livecodes/languages/react-native/react-native-runtime" {
    export const reactNativeRuntime = "\nimport { AppRegistry } from \"react-native\";\nimport App from \"./script\";\n(() => {\n  if (typeof App !== \"function\") return;\n  const rootTag = document.querySelector(\"#livecodes-app\") || document.body.appendChild(document.createElement(\"div\"));\n  AppRegistry.registerComponent(\"App\", () => App);\n  AppRegistry.runApplication(\"App\", { rootTag });\n})();\n";
}
declare module "livecodes/languages/solid/solid-runtime" {
    export const solidRuntime = "\nimport { render, createComponent } from \"solid-js/web\";\nimport App from \"./script\";\n(() => {\n  if (typeof App !== \"function\") return;\n  const root = document.querySelector(\"#livecodes-app\") || document.body.appendChild(document.createElement(\"div\"));\n  render(() => createComponent(App, {}), root);\n})();\n";
}
declare module "livecodes/toolspane/test-imports" {
    export const testImports: {
        react: string;
        'react/jsx-runtime': string;
        'react-dom': string;
        'react-dom/client': string;
        'react-dom/test-utils': string;
        '@testing-library/dom': string;
        '@testing-library/jest-dom': string;
        '@testing-library/react': string;
        '@testing-library/react/pure': string;
        '@testing-library/user-event': string;
        chai: string;
    };
}
declare module "livecodes/result/result-page" {
    import type { Cache, CompileInfo, Config } from "livecodes/models";
    export const createResultPage: ({ code, config, forExport, template, baseUrl, singleFile, runTests, compileInfo, }: {
        code: Cache;
        config: Config;
        forExport: boolean;
        template: string;
        baseUrl: string;
        singleFile: boolean;
        runTests: boolean;
        compileInfo: CompileInfo;
    }) => Promise<string>;
    export const cleanResultFromDev: (result: string) => string;
}
declare module "livecodes/result/utils" {
    export const typeOf: (obj: any) => string;
    export const proxyConsole: () => void;
    export const handleEval: () => void;
    export const handleResize: () => void;
    export const handleScrollPosition: () => void;
}
declare module "livecodes/result/index" {
    export * from "livecodes/result/result-page";
    export * from "livecodes/result/utils";
}
declare module "livecodes/templates/get-starter-templates" {
    import type { Config, Template } from "livecodes/models";
    /**
     * get starter templates with languages that are enabled in the current config
     */
    export const getStarterTemplates: (config: Config, baseUrl: string) => Promise<Template[]>;
    export const getTemplate: (name: string, config: Config, baseUrl: string) => Promise<Template>;
}
declare module "livecodes/templates/index" {
    export * from "livecodes/templates/get-starter-templates";
}
declare module "livecodes/toolspane/compiled-code-viewer" {
    import type { CompiledCodeViewer, Config, Editors, EventsManager } from "livecodes/models";
    export const createCompiledCodeViewer: (config: Config, baseUrl: string, _editors: Editors, _eventsManager: EventsManager, isEmbed: boolean, _runTests: () => Promise<void>) => CompiledCodeViewer;
}
declare module "livecodes/toolspane/console" {
    import type { Config, Console, Editors, EventsManager } from "livecodes/models";
    export const createConsole: (config: Config, baseUrl: string, _editors: Editors, eventsManager: EventsManager, isEmbed: boolean, _runTests: () => Promise<void>) => Console;
}
declare module "livecodes/UI/icons" {
    export const run = "<i class=\"icon-run\"></i>";
    export const checked = "<i class=\"icon-checked checked\"></i>";
    export const unchecked = "<i class=\"icon-unchecked unchecked\"></i>";
    export const reset = "<i class=\"icon-reset\"></i>";
    export const edit = "<i class=\"icon-edit\"></i>";
    export const copy = "<i class=\"icon-copy\"></i>";
    export const iconDelete = "<i class=\"icon-delete\"></i>";
}
declare module "livecodes/toolspane/test-viewer" {
    import type { Config, Editors, EventsManager, TestViewer } from "livecodes/models";
    export const createTestViewer: (_config: Config, _baseUrl: string, _editors: Editors, eventsManager: EventsManager, isEmbed: boolean, runTests: () => Promise<void>) => TestViewer;
}
declare module "livecodes/toolspane/tools" {
    import type { Config, Editors, EventsManager, ToolsPane } from "livecodes/models";
    export const createToolsPane: (config: Config, baseUrl: string, editors: Editors, eventsManager: EventsManager, isEmbed: boolean, runTests: () => Promise<void>, setTools: (tools: Config['tools']) => void) => ToolsPane;
}
declare module "livecodes/toolspane/index" {
    export * from "livecodes/toolspane/compiled-code-viewer";
    export * from "livecodes/toolspane/console";
    export * from "livecodes/toolspane/test-viewer";
    export * from "livecodes/toolspane/tools";
}
declare module "livecodes/types/default-types" {
    import type { Types } from "livecodes/models";
    export const getDefaultTypes: () => Types;
}
declare module "livecodes/types/bundle-types" {
    export interface Options {
        main: string;
        name: string;
        baseDir?: string;
        newline?: string;
        indent?: string;
        prefix?: string;
        separator?: string;
        externals?: boolean;
        exclude?: ((file: string) => boolean) | RegExp;
        verbose?: boolean;
        referenceExternals?: boolean;
        emitOnIncludedFileNotFound?: boolean;
        emitOnNoIncludedFileNotFound?: boolean;
        headerText?: string;
    }
    export interface ModLine {
        original: string;
        modified?: string;
        skip?: boolean;
    }
    export interface Result {
        file: string;
        name: string;
        indent: string;
        exp: string;
        refs: string[];
        externalImports: string[];
        relativeImports: string[];
        exports: string[];
        lines: ModLine[];
        importLineRef: ModLine[];
        relativeRef: ModLine[];
        fileExists: boolean;
    }
    export interface BundleResult {
        fileMap: {
            [name: string]: Result;
        };
        includeFilesNotFound: string[];
        noIncludeFilesNotFound: string[];
        emitted?: boolean;
        options: Options;
    }
    export function bundle(options: Options): Promise<string>;
}
declare module "livecodes/types/type-loader" {
    import type { EditorLibrary, Types } from "livecodes/models";
    export const createTypeLoader: (baseUrl: string) => {
        load: (code: string, configTypes: Types, loadAll?: boolean, forceLoad?: boolean, callback?: (type: EditorLibrary) => void) => Promise<EditorLibrary[]>;
    };
}
declare module "livecodes/types/index" {
    export * from "livecodes/types/default-types";
    export * from "livecodes/types/type-loader";
}
declare module "livecodes/_modules" {
    /**
     * <h2>Internal API.</h2>
     * This module should <strong>NOT</strong> be used.
     * It is only there for generating documentation for internal modules.
     *
     * Importing from it is prevented by the eslint rule 'no-restricted-imports'
     *
     * @module
     */
    export * as UI from "livecodes/UI/index";
    export * as modal from "livecodes/UI/modal";
    export * as cache from "livecodes/cache/index";
    export * as compiler from "livecodes/compiler/index";
    export * as config from "livecodes/config/index";
    export * as deploy from "livecodes/deploy/index";
    export * as editor from "livecodes/editor/index";
    export * as events from "livecodes/events/index";
    export * as export from "livecodes/export/index";
    export * as formatter from "livecodes/formatter/index";
    export * as html from "livecodes/html/index";
    export * as import from "livecodes/import/index";
    export * as languages from "livecodes/languages/index";
    export type * as models from "livecodes/models";
    export * as notifications from "livecodes/notifications/index";
    export * as result from "livecodes/result/index";
    export * as services from "livecodes/services/index";
    export * as storage from "livecodes/storage/index";
    export * as sync from "livecodes/sync/index";
    export * as templates from "livecodes/templates/index";
    export * as toolspane from "livecodes/toolspane/index";
    export * as types from "livecodes/types/index";
    export * as utils from "livecodes/utils/index";
    export * as vendors from "livecodes/vendors";
}
declare module "sdk/index" {
    import type { Code, Config, EmbedOptions, Language, Playground } from "sdk/models";
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
declare module "livecodes/UI/broadcast" {
    import type { AppData, EventsManager, Modal, Notifications } from "livecodes/models";
    export interface BroadcastInfo {
        isBroadcasting: boolean;
        channel: string;
        channelUrl: string;
        channelToken: string;
        broadcastSource: boolean;
    }
    export type BroadcastData = BroadcastInfo & AppData['broadcast'];
    export interface BroadcastResponseData {
        channel: string;
        channelUrl: string;
        channelToken?: string;
    }
    export interface BroadcastResponseError {
        error: string;
    }
    export const createBroadcastUI: ({ modal, notifications, eventsManager, deps, }: {
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        deps: {
            getBroadcastData: () => BroadcastData | null;
            setBroadcastData: (broadcastData: BroadcastData) => void;
            broadcast: (broadcastData: Partial<BroadcastData>) => Promise<BroadcastResponseData | BroadcastResponseError | undefined>;
        };
    }) => Promise<void>;
}
declare module "livecodes/i18n/app-languages" {
    import type { AppLanguage } from "livecodes/models";
    export const appLanguages: {
        [key in Exclude<AppLanguage, 'auto'>]: string;
    };
}
declare module "livecodes/UI/command-menu-actions" {
    import type { Config, INinjaAction, Screen, TemplateName } from "livecodes/models";
    export const getCommandMenuActions: ({ deps, }: {
        deps: {
            getConfig: () => Config;
            loadStarterTemplate: (templateName: TemplateName) => Promise<void>;
            changeEditorSettings: (config: Partial<Config>) => void;
            changeLayout: (layout: Config['layout']) => void;
            showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
        };
    }) => {
        actions: INinjaAction[];
        keyboardShortcuts: {
            title: string;
            hotkey: string;
        }[];
        loginAction: INinjaAction;
        logoutAction: INinjaAction;
    };
}
declare module "livecodes/UI/create-language-menus" {
    import type { Config, EventsManager, Template } from "livecodes/models";
    export const createLanguageMenus: (config: Config, baseUrl: string, eventsManager: EventsManager, showLanguageInfo: (languageInfo: HTMLElement) => void, loadStarterTemplate: (templateName: Template['name']) => void, importCode: (options: {
        importUrl: string;
    }) => Promise<boolean>, registerMenuButton: (menu: HTMLElement, button: HTMLElement) => void) => void;
    export const createProcessorItem: (processor: {
        name: string;
        title: string;
    }) => HTMLLIElement;
}
declare module "livecodes/UI/theme-colors" {
    export const themeColors: readonly [{
        readonly name: "blue";
        readonly themeColor: "hsl(214, 40%, 50%)";
    }, {
        readonly name: "cyan";
        readonly themeColor: "hsl(192, 40%, 50%)";
    }, {
        readonly name: "green";
        readonly themeColor: "hsl(142, 40%, 50%)";
    }, {
        readonly name: "amber";
        readonly themeColor: "hsl(38, 40%, 50%)";
    }, {
        readonly name: "red";
        readonly themeColor: "hsl(0, 40%, 50%)";
    }, {
        readonly name: "violet";
        readonly themeColor: "hsl(262, 40%, 50%)";
    }, {
        readonly name: "slate";
        readonly themeColor: "hsl(220, 20%, 50%)";
    }, {
        readonly name: "custom";
        readonly themeColor: undefined;
    }];
}
declare module "livecodes/editor/ts-compiler-options" {
    import type * as Monaco from 'monaco-editor';
    import type { Language } from "livecodes/models";
    type CompilerOptions = Monaco.languages.typescript.CompilerOptions;
    export const hasJsx: string[];
    export const getCompilerOptions: (language: Language) => CompilerOptions;
}
declare module "livecodes/handlers/keyboard-shortcuts" {
    import type { createSplitPanes } from "livecodes/UI/index";
    import type { CodeEditor, Config, EditorId, EventsManager, ToolsPane } from "livecodes/models";
    /**
     * Keyboard shortcut handler dependencies
     */
    export interface KeyboardShortcutDeps {
        eventsManager: EventsManager;
        getActiveEditor: () => CodeEditor;
        getConfig: () => Config;
        showEditor: (editorId: EditorId) => void;
        run: () => Promise<void>;
        toolsPane?: ToolsPane;
        split?: ReturnType<typeof createSplitPanes>;
        isEmbed: boolean;
    }
    /**
     * Handles all keyboard shortcuts and event listeners
     */
    export const handleKeyboardShortcuts: (deps: KeyboardShortcutDeps) => void;
}
declare module "livecodes/handlers/index" {
    export * from "livecodes/handlers/keyboard-shortcuts";
}
declare module "livecodes/i18n/locale-paths" {
    export const pathLoader: (baseUrl: string) => (lngs: string[], nss: string[]) => string | false;
}
declare module "livecodes/i18n/models" {
    import type { CustomTypeOptions } from 'i18next';
    /**
     * Report error when no property is provided.
     */
    export type RequireAtLeastOne<T> = T extends any ? keyof T extends never ? never : {
        [K in keyof T]-?: T & Required<Pick<T, K>>;
    }[keyof T] : never;
    /**
     * Increment a number type by 1.
     */
    type Increment<N extends number, T extends any[] = []> = T['length'] extends N ? [...T, any]['length'] : Increment<N, [...T, any]>;
    /**
     * A stack data structure implemented with tuple.
     */
    type Stack<T> = T[];
    /**
     * Get the generic type of the stack.
     */
    type GetStackType<S extends Stack<any>> = S[number];
    /**
     * Push a value to the stack.
     */
    type Push<S extends Stack<any>, V> = [V, ...S];
    /**
     * Pop a value from the stack.
     */
    type Pop<S extends Stack<any>> = S extends [
        GetStackType<S>,
        ...infer Rest extends Array<GetStackType<S>>
    ] ? Rest : never;
    /**
     * Get the top value of the stack.
     */
    type Top<S extends Stack<any>> = S extends [
        infer Top extends GetStackType<S>,
        ...Array<GetStackType<S>>
    ] ? Top : never;
    const emptyObjectSymbol: unique symbol;
    /**
     * An empty object type which has no properties.
     */
    interface EmptyObject {
        [emptyObjectSymbol]?: never;
    }
    /**
     * A type that can be used to represent a nested object structure.
     *
     * @param T The type of the value.
     */
    interface SelfNestedObject<T> {
        [key: string]: T | SelfNestedObject<T>;
    }
    export interface TagElement {
        name: string;
        attributes?: Record<string, string>;
    }
    /**
     * Get the base object of the given namespace.
     *
     * @param Base The overall i18next resources object.
     * @param Key The key to get the base object.
     */
    type GetNamespaceBase<Base extends CustomTypeOptions['resources'], Key extends string> = Key extends `${infer Namespace}:${infer _Rest}` ? Namespace extends keyof Base ? Base[Namespace] : never : Base[CustomTypeOptions['defaultNS']];
    /**
     * Recursively get the translation of the given key.
     *
     * @param Base The base object of the namespace. Use `GetNamespaceBase` to get it.
     * @param Key The key to get the translation.
     */
    type GetTranslation<Base extends SelfNestedObject<string>, Key extends string> = Key extends `${infer Start}.${infer Rest}` ? Start extends keyof Base ? Rest extends string ? Base[Start] extends SelfNestedObject<string> ? GetTranslation<Base[Start], Rest> : never : never : never : Key extends keyof Base ? Base[Key] extends string ? Base[Key] : never : never;
    /**
     * Infer all flattened keys of the given object.
     *
     * The first level keys are considered as namespaces and will be separated by colon, while the rest
     * will be separated by dot.
     *
     * @param Base The object to infer keys from.
     * @param isNs Whether it is a namespace.
     */
    type InferKeys<Base, isNs extends boolean = false, KeyStr extends string = ''> = {
        [K in keyof Base]: Base[K] extends Record<string, unknown> ? KeyStr extends '' ? InferKeys<Base[K], true, `${K & string}`> : KeyStr extends CustomTypeOptions['defaultNS'] ? InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`> | InferKeys<Base[K], false, `${K & string}`> : InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`> : `${KeyStr}${KeyStr extends '' ? '' : '.'}${K & string}`;
    }[keyof Base];
    /**
     * Extract all interpolations from the given string.
     *
     * @param Value The string to extract interpolations from.
     */
    type ExtractInterpolations<Value extends string> = Value extends `${infer _First}{{${infer Interpolation}}}${infer Rest}` ? Interpolation | ExtractInterpolations<Rest> : never;
    /**
     * Other options that could be passed to `translateString` in addition to interpolations.
     */
    interface I18nOptions {
        isHTML?: boolean;
    }
    /**
     * Type system's version of `abstractifyHTML`.
     *
     * @param T The HTML string to abstractify.
     */
    type AbstractifyHTML<T extends string, Index extends number = 1, I extends Stack<number> = [], S extends Stack<string> = []> = T extends `${infer Pre}<${infer Tag}>${infer Post}` ? Tag extends `/${Top<S>}` ? `${Pre}</${Top<I>}>${AbstractifyHTML<Post, Index, Pop<I>, Pop<S>>}` : Tag extends `${infer _} /` ? `${Pre}<${Index}></${Index}>${AbstractifyHTML<Post, Increment<Index>, I, S>}` : `${Pre}<${Index}>${AbstractifyHTML<Post, Increment<Index>, Push<I, Index>, Push<S, Tag extends `${infer RealTag} ${infer _Rest}` ? RealTag : Tag>>}` : T;
    type I18nRawInterpolationType<Value extends string> = {
        [K in ExtractInterpolations<Value>]?: string | number;
    };
    /**
     * Type for the interpolation object passed to `translateString`.
     *
     * @param T The value that contains interpolations.
     */
    export type I18nInterpolationType<T extends string> = I18nRawInterpolationType<T> extends EmptyObject ? [I18nOptions?] : [I18nRawInterpolationType<T> & I18nOptions];
    /**
     * Type for the key passed to `translateString`.
     */
    export type I18nKeyType = InferKeys<CustomTypeOptions['resources'], true>;
    type I18nRawValueType<Key extends I18nKeyType> = GetTranslation<GetNamespaceBase<CustomTypeOptions['resources'], Key>, Key>;
    /**
     * Type for the default value passed to `translateString`.
     *
     * @param Key The key of the translation.
     * @param Value The default value to translate. Should be inferred.
     */
    export type I18nValueType<Key extends I18nKeyType, Value extends string> = Value extends I18nRawValueType<Key> ? Value : AbstractifyHTML<Value> extends I18nRawValueType<Key> ? Value : never;
}
declare module "livecodes/i18n/utils" {
    import type { TagElement } from "livecodes/i18n/models";
    /**
     * Abstractify HTML string. Convert all tags to a format like `<0>`, `<1>`, etc.
     * @param html The HTML string to abstractify.
     * @returns The abstractified HTML string, with a list of objects of their tag names and attributes.
     */
    export const abstractifyHTML: (html: string) => {
        html: string;
        elements: TagElement[];
    };
    /**
     * Reverse the abstractified HTML string back to the original HTML string.
     *
     * @param html The abstractified HTML string.
     * @param elements The list of objects of their tag names and attributes.
     * @returns The original HTML string.
     */
    export const unabstractifyHTML: (html: string, elements: TagElement[], interpolation?: {}) => string;
}
declare module "livecodes/i18n/i18n" {
    import type { I18nInterpolationType, I18nKeyType, I18nValueType } from "livecodes/i18n/models";
    export const init: (lng: string | undefined, baseUrl: string) => Promise<{
        translate: (container: HTMLElement) => void;
        translateString: <Key extends I18nKeyType, Value extends string>(key: Key, value: I18nValueType<Key, Value>, ...args: I18nInterpolationType<Value>) => string;
        translateKey: import("i18next").TFunction<["translation", ..."language-info"[]], undefined>;
        getLanguage: () => string;
        getLanguageDirection: (lng?: string | undefined) => "ltr" | "rtl";
        changeLanguage: (lng?: string | undefined, callback?: import("i18next").Callback | undefined) => Promise<import("i18next").TFunction<"translation", undefined>>;
        loadNamespaces: (ns: string | readonly string[], callback?: import("i18next").Callback | undefined) => Promise<void>;
    }>;
}
declare module "livecodes/i18n/locales/en/language-info" {
    const languageInfo: {
        readonly artTemplate: {
            readonly desc: "High performance JavaScript templating engine.";
            readonly link: "<1> <2>art-template official website</2> </1> <3> <4>art-template documentation</4> </3>";
            readonly name: "art-template";
        };
        readonly asciidoc: {
            readonly desc: "AsciiDoc compiled to HTML using Asciidoctor.";
            readonly link: "<1> <2>AsciiDoc official website</2> </1> <3> <4>Asciidoctor official website</4> </3> <5> <6>Asciidoctor documentation</6> </5> <7> <8>Learn X in Y minutes, where X=asciidoc</8> </7>";
            readonly name: "AsciiDoc";
        };
        readonly assemblyscript: {
            readonly desc: "A TypeScript-like language for WebAssembly.";
            readonly link: "<1> <2>AssemblyScript official website</2> </1> <3> <4>AssemblyScript documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "AssemblyScript";
        };
        readonly astro: {
            readonly desc: "Build faster websites with less client-side Javascript. (Still in Beta)";
            readonly link: "<1> <2>Astro official website</2> </1> <3> <4>Astro documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Astro";
        };
        readonly babel: {
            readonly desc: "The JavaScript compiler";
            readonly link: "<1><2>Official website</2></1> <3> <4>Babel documentation</4> </3>";
            readonly name: "Babel";
        };
        readonly bbcode: {
            readonly desc: "BBCode (\"Bulletin Board Code\") is a lightweight markup language used to format messages in many Internet forum software.";
            readonly link: "<1><2>bbcode.org</2></1> <3> <4>BBCode guide</4> </3> <5> <6>BBCode on Wikipedia</6> </5>";
            readonly name: "BBCode";
        };
        readonly blockly: {
            readonly desc: "A JavaScript library for building visual programming editors.";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>Guides</4> </3> <5> <6>Reference</6> </5> <7> <8>Samples</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Blockly";
        };
        readonly civet: {
            readonly desc: "Civet is a programming language that compiles to TypeScript or JavaScript, so you can use existing tooling but enable concise and powerful syntax.";
            readonly link: "<1> <2>Civet official website</2> </1> <3> <4>Civet cheatsheet</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Civet";
        };
        readonly clio: {
            readonly desc: "Clio is a fast, distributed, functional programming language that compiles to JavaScript.";
            readonly link: "<1> <2>Clio official website</2> </1> <3> <4>Clio documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Clio";
        };
        readonly clojurescript: {
            readonly desc: "ClojureScript is a compiler for <1>Clojure</1> that targets JavaScript. <2></2>In LiveCodes, it runs in the browser using <3>Cherry</3>";
            readonly link: "<1> <2>ClojureScript official website</2> </1> <3> <4>Clojure official website</4> </3> <5> <6>Cherry repo</6> </5> <7> <8>Learn X in Y minutes, where X=clojure</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "ClojureScript (CLJS)";
        };
        readonly coffeescript: {
            readonly desc: "Unfancy JavaScript.";
            readonly link: "<1> <2>CoffeeScript official website</2> </1> <3> <4>Learn X in Y minutes, where X=coffeescript</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "CoffeeScript";
        };
        readonly commonlisp: {
            readonly desc: "A Common Lisp implementation on Javascript using JSCL (a Lisp-to-Javascript compiler bootstrapped from Common Lisp).";
            readonly link: "<1> <2>Common-Lisp.net</2> </1> <3> <4>JSCL Project</4> </3> <5> <6>Common Lisp Resources</6> </5> <7> <8>Learn X in Y minutes, where X=Common Lisp</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Common Lisp";
        };
        readonly cpp: {
            readonly desc1: "C++ support using JSCPP (a simple C++ interpreter written in JavaScript).";
            readonly desc2: "It is not a complete implementation of C++. Please refer to <1>JSCPP documentation</1> for details.";
            readonly link: "<1> <2>Standard C++ Foundation</2> </1> <3> <4>JSCPP</4> </3> <5> <6>Learn X in Y minutes, where X=C++</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "C++";
        };
        readonly cppWasm: {
            readonly desc: "Clang C/C++ compiler running on WebAssembly, using <1>wasm-clang</1> adapted by <2>polylang.io</2>";
            readonly link: "<1> <2>Standard C++ Foundation</2> </1> <3> <4>Clang official website</4> </3> <5> <6>Learn X in Y minutes, where X=C++</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "C/C++ (Wasm)";
        };
        readonly csharpWasm: {
            readonly desc: "C# compiler running on WebAssembly, using <1>Blazor</1>";
            readonly link: "<1> <2>C# language documentation</2> </1> <3> <4>Learn X in Y minutes, where X=C#</4> </3> <5> <6>LiveCodes Documentation</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "C# (Wasm)";
        };
        readonly diagrams: {
            readonly desc1: "(Experimental)";
            readonly desc2: "Diagrams-as-code. Supports:";
            readonly desc3: "<1> <2>Cytoscape</2> </1> <3> <4>ELK</4> (using <5>elkjs</5>) </3> <6> <7>Gnuplot</7> (using <8>gnuplot-JS</8>) </6> <9> <10>Graphviz</10> (using <11>@hpcc-js/wasm</11>) </9> <12> <13>Mermaid</13> </12> <14> <15>Nomnoml</15> </14> <16> <17>Pintora</17> </16> <18> <19>Plotly</19> </18> <20> <21>Svgbob</21> </20> <22> <23>Vega</23> </22> <24> <25>VegaLite</25> </24> <26> <27>WaveDrom</27> </26>";
            readonly link: "<1> <2>Load starter template</2> </1> <3> <4>LiveCodes Documentation</4> </3>";
            readonly name: "Diagrams";
        };
        readonly dot: {
            readonly desc: "The fastest + concise javascript template engine for Node.js and browsers.";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>LiveCodes Documentations</4> </3>";
            readonly name: "doT.js";
        };
        readonly ejs: {
            readonly desc: "Embedded JavaScript templating.";
            readonly link: "<1><2>Official website</2></1> <3> <4>LiveCodes Documentations</4> </3>";
            readonly name: "EJS";
        };
        readonly eta: {
            readonly desc: "Embedded JS template engine for Node, Deno, and the browser. Lightweight, fast, and pluggable. Written in TypeScript.";
            readonly link: "<1><2>Official website</2></1> <3> <4>Documentation</4> </3> <5> <6>LiveCodes Documentations</6> </5>";
            readonly name: "Eta";
        };
        readonly fennel: {
            readonly desc: "Fennel is a programming language that brings together the speed, simplicity, and reach of Lua with the flexibility of a lisp syntax and macro system.";
            readonly link: "<1> <2>Fennel official website</2> </1> <3> <4>Getting Started with Fennel</4> </3> <5> <6>LiveCodes Documentations</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Fennel";
        };
        readonly flow: {
            readonly desc: "Flow is a static type checker for JavaScript.";
            readonly link: "<1> <2>Flow official website</2> </1> <3> <4>Flow documentation</4> </3>";
            readonly name: "Flow";
        };
        readonly gleam: {
            readonly desc1: "Gleam is a friendly language for building type-safe systems that scale!";
            readonly desc2: "Gleam is a statically-typed functional programming language, which compiles to Erlang or JavaScript.";
            readonly link: "<1><2>Gleam website</2></1> <3> <4>Gleam documentation</4> </3> <5> <6>Gleam language tour</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Gleam";
        };
        readonly go: {
            readonly desc1: "Go (Golang) is an open source programming language that makes it easy to build simple, reliable, and efficient software.";
            readonly desc2: "Here, it is compiled to JavaScript using GopherJS.";
            readonly link: "<1><2>Go website</2></1> <3><4>Go documentation</4></3> <5> <6>GopherJS repo</6> </5> <7> <8>Learn X in Y minutes, where X=Go</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "Go";
        };
        readonly goWasm: {
            readonly desc: "Go interpreter running on WebAssembly, using Yaegi";
            readonly link: "<1><2>Go official website</2></1> <3><4>Yaegi</4></3> <5> <6>Learn X in Y minutes, where X=Go</6> </5> <7> <8>LiveCodes Documentations</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Go (Wasm)";
        };
        readonly haml: {
            readonly desc: "Haml compiler for client side javascript view templates using clientside-haml-js.";
            readonly link: "<1><2>Haml official website</2></1> <3> <4>Haml documentation</4> </3> <5> <6>clientside-haml-js GitHub repo</6> </5> <7> <8>Learn X in Y minutes, where X=haml</8> </7> <9> <10>LiveCodes Documentations</10> </9>";
            readonly name: "Haml";
        };
        readonly handlebars: {
            readonly desc: "Minimal templating on steroids.";
            readonly link: "<1><2>Official website</2></1> <3> <4>LiveCodes Documentations</4> </3>";
            readonly name: "Handlebars";
        };
        readonly imba: {
            readonly desc: "The friendly full-stack language.";
            readonly link: "<1><2>Official website</2></1>";
            readonly name: "Imba";
        };
        readonly java: {
            readonly desc: "JVM running in the browser using DoppioJVM.";
            readonly link: "<1> <2>Java official website</2> </1> <3> <4>DoppioJVM</4> </3> <5> <6>Learn X in Y minutes, where X=java</6> </5> <7> <8>LiveCodes Documentation</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Java";
        };
        readonly javascript: {
            readonly desc: "The scripting language of the web.";
            readonly link: "<1> <2>JavaScript on MDN</2> </1> <3> <4>Learn X in Y minutes, where X=JavaScript</4> </3> <5> <6>LiveCodes Documentation</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "JavaScript";
        };
        readonly jinja: {
            readonly desc: "Jinja is a fast, expressive, extensible templating engine.";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>Template documentation</4> </3> <5> <6>JavaScript implementation</6> </5> <7> <8>LiveCodes Documentations</8> </7>";
            readonly name: "Jinja";
        };
        readonly jsx: {
            readonly desc: "JSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler.  By default it uses React as the JSX runtime.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>JSX in React documentation</4> </3> <5> <6>LiveCodes Documentations</6> </5>";
            readonly name: "JSX";
        };
        readonly julia: {
            readonly desc1: "Julia language support in LiveCodes is still experimental";
            readonly desc2: "Julia compiler and Julia Base running on WASM, using <1>julia-wasm</1> adapted by <2>polylang.io</2>";
            readonly link: "<1> <2>Julia official website</2> </1> <3> <4>Julia documentation</4> </3> <5> <6>Learn X in Y minutes, where X=Julia</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Julia";
        };
        readonly less: {
            readonly desc: "It's CSS, with just a little more.";
            readonly link: "<1><2>Less official website</2></1> <3> <4>Learn X in Y minutes, where X=less</4> </3>";
            readonly name: "Less";
        };
        readonly liquid: {
            readonly desc: "A simple, expressive and safe template engine.";
            readonly link: "<1> <2>LiquidJS official website</2> </1> <3> <4>LiquidJS documentation</4> </3> <5> <6>LiveCodes Documentations</6> </5>";
            readonly name: "LiquidJS";
        };
        readonly livescript: {
            readonly desc: "A language which compiles to JavaScript.";
            readonly link: "<1> <2>LiveScript official website</2> </1> <3> <4>Learn X in Y minutes, where X=LiveScript</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "LiveScript";
        };
        readonly lua: {
            readonly desc: "Lua running in the browser using fengari-web.";
            readonly link: "<1><2>Lua official website</2></1> <3> <4>Lua documentation</4> </3> <5> <6>Fengari official website</6> </5> <7> <8>fengari-web GitHub repo</8> </7> <9> <10>Learn X in Y minutes, where X=Lua</10> </9> <11> <12>LiveCodes Documentations</12> </11> <13> <14>Load starter template</14> </13>";
            readonly name: "Lua";
        };
        readonly luaWasm: {
            readonly desc: "Lua running in the browser using Wasmoon, a real lua 5.4 VM with JS bindings made with WebAssembly.";
            readonly link: "<1><2>Lua official website</2></1> <3> <4>Lua documentation</4> </3> <5> <6>Wasmoon GitHub repo</6> </5> <7> <8>Learn X in Y minutes, where X=Lua</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "Lua (Wasm)";
        };
        readonly malina: {
            readonly desc: "Frontend compiler, inspired by Svelte.";
            readonly link: "<1> <2>Malina.js repo</2> </1> <3> <4>Malina.js documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Malina.js";
        };
        readonly markdown: {
            readonly desc: "Markdown compiled to HTML using Marked.";
            readonly link: "<1> <2>Markdown official website</2> </1> <3> <4>Marked documentation</4> </3> <5> <6>Learn X in Y minutes, where X=markdown</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Markdown";
        };
        readonly mdx: {
            readonly desc: "Markdown for the component era. <1></1>MDX lets you seamlessly write JSX in your Markdown documents.";
            readonly link: "<1><2>MDX documentation</2></1> <3> <4>Load starter template</4> </3>";
            readonly name: "MDX";
        };
        readonly minizinc: {
            readonly desc: "MiniZinc is a high-level constraint modelling language that allows you to easily express and solve discrete optimisation problems.";
            readonly link: "<1> <2>MiniZinc official website</2> </1> <3> <4>MiniZinc documentation</4> </3> <5> <6>MiniZinc tutorial</6> </5> <7> <8>LiveCodes Documentations</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "MiniZinc";
        };
        readonly mjml: {
            readonly desc: "MJML is a markup language designed to reduce the pain of coding a responsive email.";
            readonly link: "<1><2>MJML official website</2></1> <3> <4>MJML documentation</4> </3> <5> <6>MJML official templates</6> </5> <7> <8>LiveCodes Documentations</8> </7>";
            readonly name: "MJML";
        };
        readonly mustache: {
            readonly desc: "Logic-less templates.";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>mustache(5) manual</4> </3> <5> <6>JavaScript implementation</6> </5> <7> <8>LiveCodes Documentations</8> </7>";
            readonly name: "Mustache";
        };
        readonly nunjucks: {
            readonly desc: "A rich and powerful templating language for JavaScript. Nunjucks is essentially a port of <1>jinja2</1>";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>LiveCodes Documentations</4> </3>";
            readonly name: "Nunjucks";
        };
        readonly ocaml: {
            readonly desc1: "OCaml is an industrial-strength programming language supporting functional, imperative and object-oriented styles.";
            readonly desc2: "ReScript compiler is used here to compile OCaml to JavaScript.";
            readonly link: "<1><2>OCaml website</2></1> <3> <4>OCaml documentation</4> </3> <5> <6>ReScript website</6> </5> <7> <8>Learn X in Y minutes, where X=OCaml</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "OCaml";
        };
        readonly perl: {
            readonly desc: "Perl running in the browser using Perlito.";
            readonly link: "<1> <2>Perl official website</2> </1> <3> <4>Perl documentation</4> </3> <5> <6>Perlito5 Readme</6> </5> <7> <8>Learn X in Y minutes, where X=perl</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Perl";
        };
        readonly php: {
            readonly desc: "PHP running in the browser using Uniter.";
            readonly link: "<1><2>PHP official website</2></1> <3> <4>PHP documentation</4> </3> <5> <6>Uniter GitHub repo</6> </5> <7> <8>Learn X in Y minutes, where X=PHP</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "PHP";
        };
        readonly phpWasm: {
            readonly desc: "PHP in Browser, powered by WebAssembly, using php-wasm.";
            readonly link: "<1><2>PHP official website</2></1> <3> <4>PHP documentation</4> </3> <5> <6>php-wasm GitHub repo</6> </5> <7> <8>Learn X in Y minutes, where X=PHP</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "PHP (Wasm)";
        };
        readonly postgresql: {
            readonly desc: "PostgreSQL packaged as WASM using PGlite";
            readonly link: "<1> <2>PostgreSQL official website</2> </1> <3> <4>PostgreSQL documentation</4> </3> <5> <6>PGlite GitHub repo</6> </5> <7> <8>Learn X in Y minutes, where X=SQL</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "PostgreSQL";
        };
        readonly prolog: {
            readonly desc: "An open source Prolog interpreter in JavaScript.";
            readonly link: "<1> <2>Tau Prolog official website</2> </1> <3> <4>Tau Prolog documentation</4> </3> <5> <6>SWI-Prolog</6> </5> <7> <8>Learn X in Y minutes, where X=Prolog</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Tau Prolog";
        };
        readonly pug: {
            readonly desc: "Robust, elegant, feature rich template engine.";
            readonly link: "<1> <2>Pug documentation</2> </1> <3> <4>Learn X in Y minutes, where X=Pug</4> </3> <5> <6>LiveCodes Documentations</6> </5>";
            readonly name: "Pug";
        };
        readonly python: {
            readonly desc: "Python running in the browser using Brython.";
            readonly link: "<1> <2>Python official website</2> </1> <3> <4>Python documentation</4> </3> <5> <6>Brython documentation</6> </5> <7> <8>Learn X in Y minutes, where X=Python</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "Python";
        };
        readonly pythonWasm: {
            readonly desc1: "Python with the scientific stack, compiled to WebAssembly using Pyodide.";
            readonly desc2: "Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy, scikit-learn and many more. In addition it’s possible to install pure Python wheels from PyPi.";
            readonly link: "<1> <2>Python official website</2> </1> <3> <4>Python documentation</4> </3> <5><6>Pyodide documentation</6></5> <7> <8>Learn X in Y minutes, where X=Python</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "Python (Wasm)";
        };
        readonly r: {
            readonly desc: "R running in the browser using WebR.";
            readonly link: "<1> <2>R project official website</2> </1> <3> <4>The R Manuals</4> </3> <5> <6>R for Data Science (2e)</6> </5> <7> <8>WebR documentation</8> </7> <9> <10>Learn X in Y minutes, where X=R</10> </9> <11> <12>LiveCodes Documentations</12> </11> <13> <14>Load starter template</14> </13>";
            readonly name: "R";
        };
        readonly react: {
            readonly desc: "React Compiler is a build-time only tool that automatically optimizes React apps.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>React Compiler</4> </3> <5> <6>LiveCodes Documentations</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "React Compiler";
        };
        readonly reactNative: {
            readonly desc: "React Native for Web is an accessible implementation of React Native's Components and APIs that is interoperable with React DOM.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>React Native website</4> </3> <5> <6>React Native for Web website</6> </5> <7> <8>React Native documentation</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "React Native for Web";
        };
        readonly reactNativeTsx: {
            readonly desc: "React Native for Web is an accessible implementation of React Native's Components and APIs that is interoperable with React DOM.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>React Native website</4> </3> <5> <6>React Native for Web website</6> </5> <7> <8>React Native documentation</8> </7> <9> <10>TypeScript website</10> </9> <11> <12>TypeScript documentation</12> </11> <13> <14>LiveCodes Documentations</14> </13> <15> <16>Load starter template (JSX)</16> </15>";
            readonly name: "React Native for Web (with TypeScript)";
        };
        readonly reactTsx: {
            readonly desc: "React Compiler is a build-time only tool that automatically optimizes React apps.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>React Compiler</4> </3> <5> <6>TypeScript website</6> </5> <7> <8>TypeScript documentation</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template (JSX)</12> </11>";
            readonly name: "React Compiler (with TypeScript)";
        };
        readonly reason: {
            readonly desc1: "Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.";
            readonly desc2: "ReScript compiler is used here to compile Reason to JavaScript.";
            readonly link: "<1><2>Reason website</2></1> <3> <4>Reason documentation</4> </3> <5> <6>ReasonReact</6> </5> <7> <8>ReScript website</8> </7> <9> <10>Learn X in Y minutes, where X=reason</10> </9> <11> <12>Load starter template</12> </11>";
            readonly name: "Reason";
        };
        readonly rescript: {
            readonly desc: "ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.";
            readonly link: "<1> <2>ReScript website</2> </1> <3> <4>ReScript / React</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "ReScript";
        };
        readonly richtext: {
            readonly desc1: "Using Quill:";
            readonly desc2: "Your powerful rich text editor.";
            readonly link: "<1> <2>Quill official website</2> </1>";
            readonly name: "Rich Text Editor";
        };
        readonly riot: {
            readonly desc: "Simple and elegant component-based UI library.";
            readonly link: "<1> <2>Riot.js official website</2> </1> <3> <4>Riot.js documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Riot.js";
        };
        readonly ruby: {
            readonly desc: "Ruby running in the browser using Opal.";
            readonly link: "<1> <2>Ruby official website</2> </1> <3> <4>Ruby documentation</4> </3> <5><6>Opal official website</6></5> <7> <8>Opal standard library CDN</8> </7> <9> <10>Learn X in Y minutes, where X=ruby</10> </9> <11> <12>LiveCodes Documentations</12> </11> <13> <14>Load starter template</14> </13>";
            readonly name: "Ruby";
        };
        readonly rubyWasm: {
            readonly desc: "Ruby running in the browser using ruby-wasm (a collection of WebAssembly ports of the CRuby).";
            readonly link: "<1> <2>Ruby official website</2> </1> <3> <4>Ruby documentation</4> </3> <5> <6>ruby.wasm website</6> </5> <7><8>CRuby</8></7> <9> <10>Learn X in Y minutes, where X=ruby</10> </9> <11> <12>LiveCodes Documentations</12> </11> <13> <14>Load starter template</14> </13>";
            readonly name: "Ruby (WASM)";
        };
        readonly sass: {
            readonly desc: "Syntactically Awesome Style Sheets.";
            readonly link: "<1> <2>Sass official website</2> </1> <3> <4>Sass documentation</4> </3> <5> <6>Sass (the indented) syntax</6> </5> <7> <8>Learn X in Y minutes, where X=sass</8> </7>";
            readonly name: "Sass";
        };
        readonly scheme: {
            readonly desc: "Scheme running in the browser using biwascheme.";
            readonly link: "<1> <2>The Scheme Programming Language</2> </1> <3> <4>BiwaScheme official website</4> </3> <5> <6>BiwaScheme reference</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Scheme";
        };
        readonly scss: {
            readonly desc: "Syntactically Awesome Style Sheets.";
            readonly link: "<1> <2>Sass official website</2> </1> <3> <4>Sass documentation</4> </3> <5> <6>SCSS syntax</6> </5> <7> <8>Learn X in Y minutes, where X=sass</8> </7>";
            readonly name: "SCSS";
        };
        readonly solid: {
            readonly desc: "A declarative, efficient and flexible JavaScript library for building user interfaces.";
            readonly link: "<1><2>Official website</2></1> <3><4>Documentation</4></3> <5> <6>LiveCodes Documentations</6> </5> <7> <8>Load starter template (TSX)</8> </7>";
            readonly name: "Solid";
            readonly tsx: {
                readonly desc: "A declarative, efficient and flexible JavaScript library for building user interfaces.";
                readonly link: "<1><2>Official website</2></1> <3> <4>Solid documentation</4> </3> <5> <6>TypeScript website</6> </5> <7> <8>TypeScript documentation</8> </7> <9> <10>LiveCodes Documentations</10> </9> <11> <12>Load starter template</12> </11>";
                readonly name: "Solid (with TypeScript)";
            };
        };
        readonly sql: {
            readonly desc: "SQLite compiled to JavaScript using SQL.js";
            readonly link: "<1> <2>SQLite official website</2> </1> <3> <4>SQLite syntax documentation</4> </3> <5> <6>SQL.js official website</6> </5> <7> <8>Learn X in Y minutes, where X=SQL</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "SQLite";
        };
        readonly stencil: {
            readonly desc: "A Compiler for Web Components and High Performance Web Apps.";
            readonly link: "<1> <2>Stencil official website</2> </1> <3> <4>Stencil documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Stencil";
        };
        readonly styleProcessors: {
            readonly link: "<1> <2>Tailwind CSS</2> </1> <3> <4>Windi CSS</4> </3> <5> <6>UnoCSS</6> </5> <7> <8>Lightning CSS</8> </7> <9> <10>PostCSS</10> Plugins: <11> <12> <13>Autoprefixer</13> </12> <14> <15>postcss-preset-env</15> </14> <16> <17>postcss-import-url</17> </16> <18> <19>postcss-modules</19> </18> </11> </9>";
            readonly name: "CSS Frameworks and Processors";
        };
        readonly stylis: {
            readonly desc: "Light-weight css preprocessor.";
            readonly link: "<1> <2>Stylis official website</2> </1>";
            readonly name: "Stylis";
        };
        readonly stylus: {
            readonly desc: "Expressive, Dynamic, Robust CSS.";
            readonly link: "<1> <2>Stylus official website</2> </1> <3> <4>Learn X in Y minutes, where X=stylus</4> </3>";
            readonly name: "Stylus";
        };
        readonly sucrase: {
            readonly desc: "Super-fast alternative to Babel for when you can target modern JS runtimes.";
            readonly link: "<1> <2>Sucrase official website</2> </1> <3> <4>Sucrase GitHub Repo</4> </3> <5> <6>LiveCodes Documentations</6> </5>";
            readonly name: "Sucrase";
        };
        readonly svelte: {
            readonly desc: "Cybernetically enhanced web apps.";
            readonly link: "<1> <2>Svelte official website</2> </1> <3> <4>Svelte documentation</4> </3> <5> <6>Load starter template</6> </5>";
            readonly name: "Svelte";
        };
        readonly tcl: {
            readonly desc: "Tcl running in the browser, using <1>wacl</1>.";
            readonly link: "<1> <2>Tcl official website</2> </1> <3> <4>wacl repo</4> </3> <5> <6>Learn X in Y minutes, where X=Tcl</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "Tcl (Tool Command Language)";
        };
        readonly teal: {
            readonly desc: "A typed dialect of Lua.";
            readonly link: "<1> <2>Teal GitHub repo</2> </1> <3> <4>Teal docs</4> </3> <5> <6>Teal tutorial</6> </5> <7> <8>LiveCodes Documentations</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Teal";
        };
        readonly tsx: {
            readonly desc: "TypeScript in JSX. TSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler. By default it uses React as the JSX runtime.";
            readonly link: "<1> <2>React official website</2> </1> <3> <4>JSX in React documentation</4> </3> <5> <6>Typescript documentation</6> </5> <7> <8>LiveCodes Documentations</8> </7>";
            readonly name: "TSX";
        };
        readonly twig: {
            readonly desc: "A JavaScript implementation of the <1>Twig</1> PHP templating language by <2>Twig.js</2>";
            readonly link: "<1> <2>Twig official website</2> </1> <3> <4>Twig Documentation</4> </3> <5> <6>Twig.js Repo</6> </5> <7> <8>Twig.js Documentation</8> </7> <9> <10>LiveCodes Documentations</10> </9>";
            readonly name: "Twig";
        };
        readonly typescript: {
            readonly desc: "A Typed Superset of JavaScript.";
            readonly link: "<1> <2>Official website</2> </1> <3> <4>TypeScript documentation</4> </3> <5> <6>Learn X in Y minutes, where X=TypeScript</6> </5> <7> <8>Load starter template</8> </7>";
            readonly name: "TypeScript";
        };
        readonly vue: {
            readonly link: "<1> <2>Vue.js v3 official website</2> </1> <3> <4>Vue3 documentation</4> </3> <5> <6>Vue3 single file components</6> </5> <7> <8>LiveCodes Documentations</8> </7> <9> <10>Load starter template</10> </9>";
            readonly name: "Vue3 Single File Components";
        };
        readonly vue2: {
            readonly desc: "Loaded using vue3-sfc-loader.";
            readonly link: "<1><2>Vue.js official website</2></1> <3> <4>Vue2 documentation</4> </3> <5> <6>Vue2 single file components</6> </5> <7> <8>vue3-sfc-loader GitHub repo</8> </7> <9> <10>LiveCodes Documentations</10> </9>";
            readonly name: "Vue2 Single File Components";
        };
        readonly wat: {
            readonly desc1: "Low-level textual representation of the WebAssembly (wasm) binary format.";
            readonly desc2: "It is converted to wasm using wabt.js.";
            readonly link: "<1><2>WebAssembly.org</2></1> <3> <4>WebAssembly Text Specs</4> </3> <5> <6>WebAssembly on MDN</6> </5> <7> <8>Understanding WebAssembly text format</8> </7> <9> <10>wabt.js documentation</10> </9> <11> <12>Learn X in Y minutes, where X=WebAssembly</12> </11> <13> <14>Load starter template</14> </13>";
            readonly name: "WebAssembly Text Format";
        };
    };
    export default languageInfo;
}
declare module "livecodes/i18n/locales/en/translation" {
    const translation: {
        readonly about: {
            readonly blog: {
                readonly text: "Blog";
                readonly title: "LiveCodes Blog";
            };
            readonly configuration: "Configuration";
            readonly credits: {
                readonly heading: "Credits";
                readonly para1: "LiveCodes is made possible by open source projects, web services and contributors. <1>View Credits</1>";
                readonly para2: "© 2024 Hatem Hosny. LiveCodes is licensed under MIT License.";
            };
            readonly documentations: {
                readonly heading: "Documentations";
            };
            readonly gettingStarted: "Getting Started";
            readonly github: {
                readonly text: "GitHub";
                readonly title: "GitHub";
            };
            readonly heading: "About LiveCodes";
            readonly livecodes: {
                readonly aboutUs: "About LiveCodes";
                readonly para1: "<1><2>LiveCodes</2></1> is an open-source, feature-rich, client-side code playground. Currently, 90+ languages and frameworks are supported. It can be used as a standalone app or embedded in any web page.";
                readonly para2: "A powerful SDK makes it easy to integrate and communicate with playgrounds. Extensive documentation is available with code examples, live demos, and screenshots.";
            };
            readonly sdk: "LiveCodes SDK";
            readonly sponsor: {
                readonly text: "Sponsor";
                readonly title: "Sponsor LiveCodes";
            };
            readonly twitter: {
                readonly text: "𝕏 / Twitter";
                readonly title: "𝕏 / Twitter";
            };
            readonly version: {
                readonly app: "App version: <1>{{APP_VERSION}}</1>";
                readonly appPermanentUrl: "App Permanent URL";
                readonly commit: "Git commit: <1>{{COMMIT_SHA}}</1>";
                readonly heading: "Version";
                readonly sdk: "SDK version: <1>{{SDK_VERSION}}</1>";
                readonly sdkPermanentUrl: "SDK Permanent URL";
            };
        };
        readonly app: {
            readonly changeTheme: {
                readonly hint: "Change Theme";
            };
            readonly codeToImage: {
                readonly hint: "Code to Image";
            };
            readonly consoleMessage: {
                readonly appVersion: "App version: {{APP_VERSION}}";
                readonly commit: "Git commit: {{COMMIT_SHA}}";
                readonly learnMore: "Learn more! {{docsUrl}} 🚀";
                readonly sdkVersion: "SDK version: {{SDK_VERSION}}";
            };
            readonly copy: {
                readonly hint: "Copy (Ctrl/⌘ + A, Ctrl/⌘ + C)";
            };
            readonly copyAsUrl: {
                readonly hint: "Copy code as data URL";
            };
            readonly customSettings: {
                readonly hint: "Custom Settings";
            };
            readonly editorSettings: {
                readonly hint: "Editor Settings";
            };
            readonly externalResources: {
                readonly hint: "External Resources";
            };
            readonly focus: {
                readonly hint: "Toggle Focus mode (Ctrl/⌘ + K, Z)";
            };
            readonly format: {
                readonly hint: "Format (Alt + Shift + F)";
            };
            readonly fullscreen: {
                readonly hint: "Full Screen";
            };
            readonly i18nButton: {
                readonly hint: "UI Language";
            };
            readonly i18nMenu: {
                readonly docs: "i18n Documentation";
                readonly helpTranslate: "Help Us Translate";
            };
            readonly logo: {
                readonly title: "LiveCodes: A Code Playground That Just Works!";
            };
            readonly projectInfo: {
                readonly hint: "Project Info";
            };
            readonly redo: {
                readonly hint: "Redo (Ctrl/⌘ + Shift + Z)";
            };
            readonly result: {
                readonly hint: "Result (Ctrl/⌘ + Alt + R)";
            };
            readonly run: {
                readonly hint: "Run (Shift + Enter)";
            };
            readonly share: {
                readonly hint: "Share (Ctrl/⌘ + Alt + S)";
            };
            readonly themeColors: {
                readonly custom: "Custom";
            };
            readonly undo: {
                readonly hint: "Undo (Ctrl/⌘ + Z)";
            };
            readonly untitledProject: "Untitled Project";
        };
        readonly assets: {
            readonly action: {
                readonly delete: "Delete";
            };
            readonly add: {
                readonly dataURL: {
                    readonly desc: "Add asset as a base64-encoded <1>data url</1>.";
                    readonly heading: "Data URL";
                    readonly label: "Add file";
                };
                readonly githubPages: {
                    readonly desc: "Deploy asset to GitHub Pages. The file is pushed to <1>gh-pages</1> branch of the repo <2>livecodes-assets</2> on your GitHub account. If the repo does not already exist, a public repo will be created.";
                    readonly heading: "GitHub Pages";
                    readonly label: "Upload file";
                };
                readonly heading: "Add Asset";
            };
            readonly delete: {
                readonly all: "Delete {{assets}} assets?";
                readonly one: "Delete asset: {{asset}}?";
            };
            readonly deleteAll: "Delete All";
            readonly generic: {
                readonly clickToCopyURL: "Click to copy URL";
            };
            readonly heading: "Assets";
            readonly link: {
                readonly date: "Date: {{modified}}";
                readonly type: "Type: {{type}}";
                readonly url: "URL: {{url}}";
            };
            readonly loadFile: {
                readonly error: {
                    readonly failedToUpload: "Error: Failed to upload file";
                    readonly unauthenticated: "Error: Unauthenticated user";
                };
                readonly upload: "Upload file";
                readonly uploading: "Uploading...";
            };
            readonly noMatch: "No assets match these filters.";
            readonly noSavedAssets: "You have no saved assets.";
            readonly processAsset: {
                readonly addFile: "Added file: ";
                readonly deployNotice: "The asset should be available on this URL soon (~1 min).";
                readonly success: "File added to assets!";
                readonly urlLabel: "URL: ";
            };
            readonly resetFilters: "Reset";
            readonly search: "Search";
            readonly sort: {
                readonly date: "Date";
                readonly fileName: "File Name";
                readonly heading: "Sort By:";
            };
            readonly type: {
                readonly archive: "Archive";
                readonly audio: "Audio";
                readonly csv: "CSV";
                readonly font: "Font";
                readonly html: "HTML";
                readonly icon: "Icon";
                readonly image: "Image";
                readonly json: "JSON";
                readonly other: "Other";
                readonly script: "Script";
                readonly stylesheet: "Stylesheet";
                readonly text: "Text";
                readonly video: "Video";
                readonly xml: "XML";
            };
            readonly types: {
                readonly all: "All types";
            };
            readonly url: {
                readonly fail: "Failed to copy URL.";
                readonly success: "URL is copied to clipboard.";
            };
        };
        readonly backup: {
            readonly backup: {
                readonly assets: "Assets";
                readonly button: "Backup";
                readonly desc: "Backup LiveCodes data, so that it can be later restored on this or other devices. <1></1> Please visit the <2>documentations</2> for details.";
                readonly heading: "Backup";
                readonly projects: "Projects";
                readonly settings: "User Settings";
                readonly snippets: "Code Snippets";
                readonly templates: "User Templates";
            };
            readonly backupBtn: "Backup";
            readonly error: {
                readonly atLeastOneStore: "Please select at least one store to backup";
                readonly incorrectFileType: "Error: Incorrect file type";
            };
            readonly fileInputLabel: "Restore from file";
            readonly heading: "Backup / Restore";
            readonly inProgress: "In progress...";
            readonly restore: {
                readonly desc: "Restore previously backed-up LiveCodes data. <1></1> If you choose to replace current content, you may want to back it up first. <2></2> Please visit the <3>documentations</3> for details.";
                readonly fromFile: "Restore from file";
                readonly heading: "Restore";
                readonly mode: {
                    readonly merge: "Merge with current content";
                    readonly replace: "Replace current content";
                };
                readonly success: "Restored Successfully!";
            };
        };
        readonly broadcast: {
            readonly broadcastBtn: {
                readonly start: "Broadcast";
                readonly stop: "Stop broadcast";
            };
            readonly broadcasting: "Broadcasting...";
            readonly channelURL: "Channel URL";
            readonly connecting: "Connecting...";
            readonly desc: "Broadcast the result page to other browsers/devices in real time. Please visit the <1>documentations</1> for details.";
            readonly error: {
                readonly generic: "Broadcast failed!";
                readonly serverURLRequired: "Server URL is required!";
            };
            readonly heading: "Broadcast";
            readonly includeSourceCode: "Include source code";
            readonly serverURL: {
                readonly heading: "Server URL";
            };
        };
        readonly codeToImage: {
            readonly background: "Background";
            readonly borderRadius: "Border Radius";
            readonly code: "Code";
            readonly copyCode: "Copy Code";
            readonly copyImage: "Copy Image";
            readonly default: "Default";
            readonly direction: "Direction";
            readonly fileName: "File Name";
            readonly fontFamily: "Font Family";
            readonly fontSize: "Font Size";
            readonly heading: "Code to Image";
            readonly image: "Image";
            readonly imageFormat: {
                readonly jpg: "JPEG";
                readonly label: "Image Format";
                readonly png: "PNG";
                readonly svg: "SVG";
            };
            readonly layout: "Layout";
            readonly opacity: "Opacity";
            readonly padding: "Padding";
            readonly presets: "Presets";
            readonly preview: "Preview";
            readonly save: "Save Image";
            readonly scale: "Image Scale";
            readonly shadow: "Shadow";
            readonly shareImage: "Share Image";
            readonly shareTitle: "Share";
            readonly shareUrl: "Share URL";
            readonly theme: "Theme";
            readonly width: "Width";
            readonly windowStyle: {
                readonly label: "Window Style";
                readonly mac: "macOS";
                readonly none: "None";
                readonly windows: "Windows";
            };
        };
        readonly commandMenu: {
            readonly changeTheme: {
                readonly dark: "Change to Dark Theme";
                readonly light: "Change to Light Theme";
                readonly title: "Change Theme";
            };
            readonly changeUILanguage: "Change UI Language";
            readonly closeModalMenu: "Close Modal/Menu";
            readonly contribute: "Contribute";
            readonly copy: "Copy Code";
            readonly copyAsDataUrl: "Copy Code as Data URL";
            readonly disableAutoSave: "Disable Auto Save";
            readonly disableAutoUpdate: "Disable Auto Update";
            readonly disableEmacs: "Disable Emacs Mode";
            readonly disableFormatOnSave: "Disable Format On-Save";
            readonly disableRecoverUnsaved: "Disable Recover Unsaved";
            readonly disableVim: "Disable Vim Mode";
            readonly enableAutoSave: "Enable Auto Save";
            readonly enableAutoUpdate: "Enable Auto Update";
            readonly enableEmacs: "Enable Emacs Mode";
            readonly enableFormatOnSave: "Enable Format On-Save";
            readonly enableRecoverUnsaved: "Enable Recover Unsaved";
            readonly enableVim: "Enable Vim Mode";
            readonly focus: {
                readonly editor: "Focus Editor";
                readonly home: "Move Focus to Home";
                readonly outOfEditor: "Move Focus out of Editor";
                readonly toggleTabFocusMode: "Toggle Tab Focus Mode";
            };
            readonly formatCode: "Format Code";
            readonly home: "Home";
            readonly horizontalLayout: "Horizontal Layout";
            readonly keyboardShortcuts: "Keyboard Shortcuts";
            readonly login: "Login";
            readonly logout: "Logout";
            readonly moveToParent: "move to parent";
            readonly placeholder: "Type a command or search...";
            readonly processors: "Processors";
            readonly responsiveLayout: "Responsive Layout";
            readonly run: "Run";
            readonly saveAsFork: "Save as a Fork (New Project)";
            readonly saveAsTemplate: "Save as a Template";
            readonly selectLanguage: "Select Language";
            readonly show: {
                readonly compiled: "Toggle Compiled Code";
                readonly console: "Toggle Console";
                readonly focusMode: "Toggle Focus Mode";
                readonly fullscreen: "Toggle Full Screen";
                readonly markup: "Show Markup Editor";
                readonly maximizeCompiled: "Maximize Compiled Code";
                readonly maximizeConsole: "Maximize Console";
                readonly maximizeTests: "Maximize Tests";
                readonly next: "Show Next Editor";
                readonly previous: "Show Previous Editor";
                readonly result: "Toggle Result";
                readonly runTests: "Run Tests";
                readonly script: "Show Script Editor";
                readonly style: "Show Style Editor";
                readonly tests: "Toggle Tests";
                readonly title: "Show …";
                readonly zoom: "Toggle Result Zoom";
            };
            readonly starterTemplates: "Starter Templates";
            readonly sync: "Sync (beta) …";
            readonly template: "Template";
            readonly theme: {
                readonly color: "Set Theme Color";
                readonly defaultColor: "Set Default Theme Color";
            };
            readonly title: "Command Menu";
            readonly toClose: "to close";
            readonly toNavigate: "to navigate";
            readonly toSelect: "to select";
            readonly toggle: "Toggle: ";
            readonly verticalLayout: "Vertical Layout";
        };
        readonly core: {
            readonly broadcast: {
                readonly heading: "Broadcast";
                readonly successSetToken: "Broadcast user token set successfully";
            };
            readonly changeLanguage: {
                readonly hint: "Change Language";
                readonly message: "Loading {{lang}}. This may take a while!";
            };
            readonly copy: {
                readonly copied: "Code copied to clipboard";
                readonly copiedAsDataURL: "Code copied as data URL";
                readonly copiedImage: "Image copied to clipboard.";
                readonly hint: "Copied!";
                readonly title: "Copy";
            };
            readonly error: {
                readonly couldNotLoadTemplate: "Could not load template: {{template}}";
                readonly failedToCopyCode: "Failed to copy code";
                readonly failedToCopyImage: "Failed to copy image";
                readonly failedToLoadTemplate: "Failed loading template";
                readonly failedToLoadTemplates: "Failed loading starter templates";
                readonly failedToParseSettings: "Failed parsing settings as JSON";
                readonly failedToSaveImage: "Failed to save image";
                readonly failedToShareImage: "Failed to share image";
                readonly invalidCommand: "Invalid command!";
                readonly invalidImport: "Invalid import URL";
                readonly invalidPanelId: "Invalid panel id";
                readonly invalidToken: "Invalid token!";
                readonly login: "Login error!";
                readonly logout: "Logout error!";
                readonly noResultContainer: "Result container not found";
                readonly unavailable: "Command unavailable";
                readonly unavailableForEmbeds: "Command unavailable for embeds";
            };
            readonly export: {
                readonly gist: "Creating a public GitHub gist...";
            };
            readonly fork: {
                readonly success: "Forked as a new project";
            };
            readonly fullScreen: {
                readonly enter: "Full Screen";
                readonly exit: "Exit Full Screen";
            };
            readonly generating: "Generating...";
            readonly import: {
                readonly loading: "Loading Project...";
            };
            readonly layout: {
                readonly horizontal: "Horizontal layout";
                readonly responsive: "Responsive layout";
                readonly vertical: "Vertical layout";
            };
            readonly loadDefaults: {
                readonly template: "Loading default template";
            };
            readonly login: {
                readonly success: "Logged in successfully";
                readonly successWithName: "Logged in as: {{name}}";
            };
            readonly logout: {
                readonly success: "Logged out successfully";
            };
            readonly result: {
                readonly hint: "Show result in new window";
            };
            readonly save: {
                readonly success: "Project locally saved to device!";
                readonly successWithName: "Project \"{{name}}\" saved to device.";
            };
            readonly template: {
                readonly blank: "Blank Project";
                readonly delete: "Delete template \"{{item}}\"?";
                readonly javascript: "JavaScript Starter";
                readonly react: "React Starter";
                readonly saved: "Saved as a new template";
                readonly typescript: "TypeScript Starter";
                readonly vue: "Vue 3 Starter";
            };
            readonly unload: {
                readonly notSaved: "Changes you made may not be saved.";
            };
            readonly zoom: {
                readonly hint: "Zoom";
            };
        };
        readonly customSettings: {
            readonly JSON: "Custom Settings JSON";
            readonly desc: "<1></1> For further details, please refer to the <2> documentation </2>";
            readonly heading: "Custom Settings";
            readonly load: "Load";
        };
        readonly deploy: {
            readonly create: {
                readonly desc: "A new <1>public</1> repo will be created. The result page will be pushed to <2>gh-pages</2> branch.";
                readonly heading: "Create New Repo";
                readonly repoName: "Repo Name <1></1>";
            };
            readonly error: {
                readonly generic: "Deployment failed!";
                readonly repoNameExists: "Repo name already exists";
                readonly repoNameRequired: "Repo name is required";
            };
            readonly existing: {
                readonly desc: "A new commit will be added to <1>gh-pages</1> branch.";
                readonly heading: "Existing Repo";
                readonly repoName: "Repo Name";
            };
            readonly generic: {
                readonly commitMessage: "Commit Message";
                readonly commitSourceCodePublic: "Commit source code (public)";
                readonly deployBtn: "Deploy";
                readonly deploying: "Deploying...";
            };
            readonly heading: "Deploy to GitHub Pages";
            readonly searchRepo: "Search your public repos...";
        };
        readonly editorSettings: {
            readonly closeBrackets: "Auto-close brackets and quotes";
            readonly codeJarDesc: "<1></1> * The marked features are not available in CodeJar.";
            readonly default: "Default";
            readonly desc: "<1></1> Please check the <2>documentations</2> for details.";
            readonly editor: {
                readonly codejar: "CodeJar";
                readonly codemirror: "CodeMirror";
                readonly heading: "Editor";
                readonly monaco: "Monaco";
            };
            readonly editorMode: {
                readonly emacs: "Emacs";
                readonly heading: "Editor Mode *";
                readonly vim: "Vim";
            };
            readonly editorTheme: "Editor Theme";
            readonly emmet: "Enable Emmet *";
            readonly foldRegions: "Fold (collapse) regions *";
            readonly fontFamily: "Font Family";
            readonly fontSize: "Font Size";
            readonly format: "Format";
            readonly heading: "Editor Settings";
            readonly lineNumbers: "Show line numbers";
            readonly lineNumbersRelative: "Relative line numbers *";
            readonly notAvailableInCodeJar: "Not available in CodeJar";
            readonly preview: "Preview";
            readonly semicolons: "Format: Use Semicolons";
            readonly singleQuote: "Format: Use Single Quotes";
            readonly tabSize: "Tab Size";
            readonly theme: "Dark Mode";
            readonly trailingComma: "Format: Use Trailing Commas";
            readonly useTabs: {
                readonly heading: "Indentation";
                readonly spaces: "Spaces";
                readonly tabs: "Tabs";
            };
            readonly wordWrap: "Word-wrap";
        };
        readonly embed: {
            readonly activeEditor: {
                readonly heading: "Active Editor";
                readonly markup: "{{markup}}";
                readonly script: "{{script}}";
                readonly style: "{{style}}";
            };
            readonly activeTool: {
                readonly compiled: "Compiled";
                readonly console: "Console";
                readonly heading: "Active Tool";
                readonly tests: "Tests";
            };
            readonly code: {
                readonly copy: "Copy Code";
                readonly heading: "Code";
            };
            readonly codeEditor: {
                readonly codeJar: "CodeJar";
                readonly codeMirror: "CodeMirror";
                readonly default: "Default";
                readonly heading: "Code Editor";
                readonly monaco: "Monaco";
            };
            readonly desc: "Please check the <1>documentations</1> for advanced configurations.";
            readonly embedType: {
                readonly cdn: "Script (CDN)";
                readonly heading: "Embed Type";
                readonly html: "HTML";
                readonly iframe: "Iframe";
                readonly npm: "JS (npm)";
                readonly react: "React";
                readonly svelte: "Svelte";
                readonly vue: "Vue";
            };
            readonly heading: "Embed Project";
            readonly layout: {
                readonly heading: "Layout";
                readonly horizontal: "Horizontal";
                readonly responsive: "Responsive";
                readonly vertical: "Vertical";
            };
            readonly lite: "Lite Mode";
            readonly loading: {
                readonly click: "On-click";
                readonly eager: "Eager";
                readonly heading: "Loading";
                readonly lazy: "Lazy";
            };
            readonly mode: {
                readonly codeblock: "Code Block";
                readonly editor: "Editor";
                readonly full: "Full";
                readonly heading: "Display Mode";
                readonly result: "Result";
                readonly simple: "Simple";
            };
            readonly permanentUrl: "Permanent URL";
            readonly preview: "Preview";
            readonly previewLoading: "Loading Preview...";
            readonly readonly: "Read only";
            readonly theme: {
                readonly dark: "Dark";
                readonly heading: "Theme";
                readonly light: "Light";
            };
            readonly tools: {
                readonly closed: "Closed";
                readonly full: "Full";
                readonly heading: "Tools";
                readonly none: "None";
                readonly open: "Open";
            };
            readonly view: {
                readonly editor: "Editor";
                readonly heading: "Default View";
                readonly result: "Result";
                readonly split: "Split";
            };
        };
        readonly generic: {
            readonly about: {
                readonly blog: "Blog";
                readonly configuration: "Configuration";
                readonly gettingStarted: "Getting Started";
                readonly github: "GitHub";
                readonly sdk: "LiveCodes SDK";
                readonly sponsor: "Sponsor";
                readonly twitter: "𝕏 / Twitter";
            };
            readonly clickForInfo: "Click for info...";
            readonly close: "Close";
            readonly custom: "Custom";
            readonly embed: {
                readonly logoHint: "Edit on LiveCodes 🡕";
            };
            readonly error: {
                readonly authentication: "Authentication error!";
                readonly exceededSize: "Error: Exceeded size {{size}} MB";
                readonly failedToReadFile: "Error: Failed to read file";
            };
            readonly loading: "Loading...";
            readonly more: "More...";
            readonly optional: "Optional";
            readonly required: "Required";
            readonly tagline: "A Code Playground That Just Works!";
        };
        readonly import: {
            readonly bulk: {
                readonly desc: "Bulk import multiple projects to your saved projects. Projects can be exported from the <1>Saved Projects</1> screen.";
                readonly fromFile: "Bulk import from local file";
                readonly fromURL: "Bulk import from URL";
                readonly heading: "Bulk Import";
                readonly started: "Bulk import started...";
            };
            readonly code: {
                readonly desc: "Supported Sources: <1> <2>GitHub gist</2> <3>GitHub file</3> <4>Directory in a GitHub repo</4> <5>Gitlab snippet</5> <6>Gitlab file</6> <7>Directory in a Gitlab repo</7> <8>JS Bin</8> <9>Raw code</9> <10>Code in web page DOM</10> <11>Code in zip file</11> <12>Code in image (OCR)</12> <13>Official playgrounds<14></14>(TypeScript and Vue)</13> </1> Please visit the <15>documentations</15> for details.";
                readonly fromFile: "Import local files";
                readonly fromURL: "Import from URL";
                readonly heading: "Import Code";
            };
            readonly error: {
                readonly failedToLoadURL: "Error: failed to load URL";
                readonly invalidConfigFile: "Invalid configuration file";
                readonly invalidFile: "Error: Invalid file";
            };
            readonly generic: {
                readonly file: "Local file";
                readonly url: "URL";
            };
            readonly heading: "Import";
            readonly json: {
                readonly desc: "Import a single project JSON to editor. A project can be exported from app&nbsp;menu&nbsp;→ Export&nbsp;→ Export&nbsp;Project&nbsp;(JSON).";
                readonly fromFile: "Import project from local file";
                readonly fromURL: "Import project from URL";
                readonly heading: "Import Project JSON";
            };
            readonly success: "Import Successful!";
        };
        readonly keyboardShortcuts: {
            readonly command: "Command";
            readonly editorShortcuts: "For the list of code editor keyboard shortcuts, see <1> VS Code shortcuts</1>";
            readonly heading: "Keyboard Shortcuts";
            readonly key: "Key";
        };
        readonly login: {
            readonly accessAllowed: "Allow access to:";
            readonly desc: "<1>By logging in, you agree that <2>cookies</2> may be stored on your device.</1> <3> <4>Why are these permissions required?</4> </3> <5> <6>How to change/revoke permissions?</6> </5>";
            readonly gist: "Gists";
            readonly heading: "Login with GitHub";
            readonly loginAs: "Logged in as {{name}}";
            readonly loginBtn: "Login";
            readonly logout: "Log out";
            readonly privateRepo: "Private Repos";
            readonly publicRepo: "Repos";
        };
        readonly menu: {
            readonly about: "About ...";
            readonly appHelp: {
                readonly heading: "Help";
                readonly hint: "Help";
            };
            readonly appProject: {
                readonly heading: "Project";
                readonly hint: "Project";
            };
            readonly appSettings: {
                readonly heading: "Settings";
                readonly hint: "App Settings";
            };
            readonly assets: "Assets …";
            readonly autoSave: "Auto Save";
            readonly autoUpdate: "Auto Update";
            readonly backup: "Backup / Restore …";
            readonly blog: "LiveCodes Blog";
            readonly broadcast: "Broadcast …";
            readonly commandMenu: "Command Menu";
            readonly config: "Configuration";
            readonly customSettings: "Custom Settings …";
            readonly delay: {
                readonly heading: "Delay: <1>1.5</1>s";
                readonly hint: "Delay before auto-update";
            };
            readonly deploy: "Deploy …";
            readonly docs: "Documentation";
            readonly editorSettings: "Editor Settings …";
            readonly embed: "Embed …";
            readonly export: {
                readonly codepen: "Edit in CodePen";
                readonly gist: "Export to GitHub Gist";
                readonly heading: "Export";
                readonly jsfiddle: "Edit in JSFiddle";
                readonly json: "Export Project (JSON)";
                readonly result: "Export Result (HTML)";
                readonly src: "Export Source (ZIP)";
            };
            readonly features: "Features";
            readonly formatOnsave: "Format On-save";
            readonly getstart: "Getting Started";
            readonly import: "Import …";
            readonly keyboardShortcuts: "Keyboard Shortcuts";
            readonly layout: "Vertical Layout";
            readonly license: "License";
            readonly login: "Login";
            readonly logout: "Log out";
            readonly new: "New …";
            readonly open: "Open …";
            readonly project: "Project Info …";
            readonly recoverUnsaved: "Recover Unsaved";
            readonly report: "Report an issue";
            readonly resources: "External Resources …";
            readonly save: "Save";
            readonly saveAs: {
                readonly fork: "Fork (New Project)";
                readonly heading: "Save as …";
                readonly template: "Template";
            };
            readonly sdk: "SDK";
            readonly share: "Share …";
            readonly showSpacing: {
                readonly heading: "Show Spacing";
                readonly hint: "Press Alt/Option and move your cursor over result page";
            };
            readonly showWelcome: {
                readonly title: "Show Welcome screen on startup";
            };
            readonly snippets: "Code Snippets …";
            readonly source: "Source code on GitHub";
            readonly sync: "Sync (beta) … <1> ⏳</1>";
            readonly theme: "Dark Theme";
            readonly themeColor: "Color";
            readonly welcome: {
                readonly heading: "Welcome …";
            };
        };
        readonly open: {
            readonly action: {
                readonly delete: "Delete";
            };
            readonly defaultTemplate: "Default template ";
            readonly delete: {
                readonly all: "Delete {{projects}} projects?";
                readonly deleting: "Deleting projects...";
                readonly one: "Delete project: {{project}}?";
            };
            readonly deleteAll: "Delete All";
            readonly exportAll: "Export All";
            readonly filter: {
                readonly language: "filter by language";
                readonly tag: "filter by tag";
            };
            readonly heading: "Saved Projects";
            readonly import: "Import";
            readonly lastModified: "Last modified: {{modified}}";
            readonly noData: {
                readonly desc: "You can save a project from (settings&nbsp;menu&nbsp;&gt;&nbsp;Save) or by the keyboard shortcut (Ctrl/⌘&nbsp;+&nbsp;S).";
                readonly heading: "You have no saved projects.";
            };
            readonly noMatch: "No projects match these filters.";
            readonly placeholder: {
                readonly allLanguages: "All languages";
                readonly filterByTags: "Filter by tags";
                readonly search: "Search";
            };
            readonly removeDefault: "(unset)";
            readonly reset: "Reset";
            readonly setAsDefault: "Set as default";
            readonly sort: {
                readonly heading: "Sort By:";
                readonly lastModified: "Last Modified";
                readonly title: "Title";
            };
        };
        readonly project: {
            readonly desc: "Description";
            readonly head: "Add to &lt;head&gt;";
            readonly heading: "Project Info";
            readonly htmlAttr: "Attributes for &lt;html&gt;";
            readonly tags: "Tags";
            readonly title: "Project Title";
        };
        readonly recoverPrompt: {
            readonly desc: "Your last project has unsaved changes!";
            readonly heading: "Recover unsaved project?";
            readonly meta: "Title: <1></1> <2></2> Last modified: <3></3>";
            readonly notShowAgain: "Do not show this again.";
            readonly prompt: {
                readonly discard: "Discard unsaved project";
                readonly heading: "<1></1>Do you want to recover it now?";
                readonly recover: "Recover project to editor";
                readonly save: "Save to device and continue";
            };
        };
        readonly resources: {
            readonly browseOnJsDelivr: "Browse package files on jsDelivr";
            readonly cssPresets: {
                readonly heading: "CSS Presets";
                readonly none: "None";
                readonly normalizeCss: "Normalize.css";
                readonly resetCss: "Reset CSS";
            };
            readonly error: {
                readonly failedToLoadResults: "Failed to load results!";
                readonly noResultsFound: "No results found for: ";
            };
            readonly fonts: {
                readonly add: "Add";
                readonly heading: "Fonts <1>(powered by Google Fonts)</1>";
                readonly select: "Select font ...";
            };
            readonly heading: "External Resources";
            readonly scripts: "External Scripts";
            readonly search: {
                readonly heading: "Search Packages <1>(powered by jsDelivr)</1>";
                readonly placeholder: "e.g. jquery, lodash@4, bootstrap@5.2.3, ...";
            };
            readonly stylesheets: "External Stylesheets";
            readonly urlDesc: "Add stylesheet/script URLs. Each URL should be in a separate line.";
        };
        readonly resultMode: {
            readonly linkText: "Edit on LiveCodes";
        };
        readonly savePrompt: {
            readonly heading: "Unsaved changes";
            readonly prompt: {
                readonly cancel: "Cancel";
                readonly discard: "Do not save";
                readonly heading: "The changes you made may not be saved. <1></1> Do you want to save now?";
                readonly save: "Save";
            };
        };
        readonly share: {
            readonly characters: "{{urlLength}} characters";
            readonly copy: {
                readonly clickToCopy: "Click to copy";
                readonly copied: "URL copied to clipboard";
            };
            readonly encodedURL: "Get encoded URL";
            readonly error: {
                readonly failedToCopy: "Copy to clipboard failed!";
                readonly failedToGenerateURL: "Failed to generate short URL!";
            };
            readonly expireInOneYear: "Expires in 1 year";
            readonly generateURL: "Generating URL …";
            readonly heading: "Share";
            readonly permanentURL: "Permanent URL";
            readonly qrcode: {
                readonly clickToDownload: "Click to download";
                readonly generating: "Generating...";
            };
            readonly services: {
                readonly devTo: "Dev.to";
                readonly email: "Email";
                readonly facebook: "Facebook";
                readonly hackerNews: "Hacker News";
                readonly linkedIn: "LinkedIn";
                readonly pinterest: "Pinterest";
                readonly pocket: "Pocket";
                readonly qrCode: "QR code";
                readonly reddit: "Reddit";
                readonly share: "Share via …";
                readonly telegram: "Telegram";
                readonly tumblr: "Tumblr";
                readonly twitter: "𝕏 / Twitter";
                readonly whatsApp: "WhatsApp";
            };
            readonly shortURL: "Get short URL";
        };
        readonly snippets: {
            readonly action: {
                readonly copy: "Copy";
                readonly delete: "Delete";
                readonly edit: "Edit";
            };
            readonly add: {
                readonly code: "Code";
                readonly desc: "Description";
                readonly heading: "Add Snippet";
                readonly language: "Language";
                readonly save: "Save";
                readonly snippets: "Snippets";
                readonly title: "Title";
            };
            readonly copy: {
                readonly clickToCopySnippet: "Click to copy snippet";
                readonly copied: "Snippet is copied to clipboard.";
            };
            readonly delete: {
                readonly all: "Delete {{snippets}} snippets?";
                readonly one: "Delete snippet: {{snippet}}?";
            };
            readonly deleteAll: "Delete All";
            readonly error: {
                readonly failedToCopy: "Failed to copy URL.";
                readonly noTitle: "Please add snippet title.";
            };
            readonly filter: {
                readonly language: "filter by language";
            };
            readonly heading: "Code Snippets";
            readonly lastModified: "Last modified: {{modified}}";
            readonly noMatch: "No snippets match these filters.";
            readonly noSavedSnippets: "You have no saved snippets.";
            readonly placeholder: {
                readonly allLanguages: "All languages";
                readonly search: "Search";
            };
            readonly reset: "Reset";
            readonly save: {
                readonly success: "Snippet locally saved to device!";
            };
            readonly sort: {
                readonly date: "Date";
                readonly heading: "Sort By:";
                readonly title: "Title";
            };
            readonly text: "Plain Text";
        };
        readonly splash: {
            readonly loading: "Loading LiveCodes…";
        };
        readonly sync: {
            readonly autoSync: "Auto sync";
            readonly create: {
                readonly desc: "A new <1>private</1> repo will be created. Your LiveCodes local data will be synchronized with <2>main</2> branch.";
                readonly heading: "Create New Repo";
                readonly repoName: "Repo Name";
            };
            readonly error: {
                readonly generic: "Sync failed!";
                readonly repoNameRequired: "Repo name is required";
            };
            readonly existing: {
                readonly desc: "Your LiveCodes local data will be synchronized with <1>main</1> branch.";
                readonly heading: "Existing Repo";
                readonly repoName: "Repo Name";
            };
            readonly heading: "Sync to GitHub Repo";
            readonly searchRepos: "Search your repos...";
            readonly success: "Sync complete!";
            readonly syncBtn: "Sync";
            readonly syncInProgress: "Sync in progress...";
            readonly syncStarted: "Sync started...";
        };
        readonly templates: {
            readonly heading: "New Project";
            readonly noUserTemplates: {
                readonly desc: "You can save a project as a template from <1></1>(App&nbsp;menu&nbsp;&gt;&nbsp;Save&nbsp;as&nbsp;&gt; Template).";
                readonly heading: "You have no saved templates.";
            };
            readonly search: {
                readonly label: "Search templates";
                readonly placeholder: "Search templates...";
            };
            readonly starter: {
                readonly angular: "Angular Starter";
                readonly assemblyscript: "AssemblyScript Starter";
                readonly astro: "Astro Starter";
                readonly backbone: "Backbone Starter";
                readonly blank: "Blank Project";
                readonly blockly: "Blockly Starter";
                readonly bootstrap: "Bootstrap Starter";
                readonly civet: "Civet Starter";
                readonly clio: "Clio Starter";
                readonly clojurescript: "ClojureScript Starter";
                readonly coffeescript: "CoffeeScript Starter";
                readonly commonlisp: "Common Lisp Starter";
                readonly cpp: "C++ Starter";
                readonly 'cpp-wasm': "C++ (Wasm) Starter";
                readonly 'csharp-wasm': "C# (Wasm) Starter";
                readonly d3: "D3 Starter";
                readonly daisyui: "daisyUI Starter";
                readonly diagrams: "Diagrams Starter";
                readonly fennel: "Fennel Starter";
                readonly gleam: "Gleam Starter";
                readonly go: "Go Starter";
                readonly 'go-wasm': "Go (Wasm) Starter";
                readonly heading: "Starter Templates";
                readonly imba: "Imba Starter";
                readonly java: "Java Starter";
                readonly javascript: "JavaScript Starter";
                readonly jest: "Jest Starter";
                readonly 'jest-react': "Jest/React Starter";
                readonly jquery: "jQuery Starter";
                readonly julia: "Julia Starter";
                readonly knockout: "Knockout Starter";
                readonly lit: "Lit Starter";
                readonly livescript: "LiveScript Starter";
                readonly loading: "Loading starter templates...";
                readonly lua: "Lua Starter";
                readonly 'lua-wasm': "Lua (Wasm) Starter";
                readonly malina: "Malina.js Starter";
                readonly markdown: "Markdown Starter";
                readonly mdx: "MDX Starter";
                readonly minizinc: "MiniZinc Starter";
                readonly ocaml: "Ocaml Starter";
                readonly perl: "Perl Starter";
                readonly phaser: "Phaser Starter";
                readonly php: "PHP Starter";
                readonly 'php-wasm': "PHP (Wasm) Starter";
                readonly postgresql: "PostgreSQL Starter";
                readonly preact: "Preact Starter";
                readonly prolog: "Prolog Starter";
                readonly python: "Python Starter";
                readonly 'python-wasm': "Python (Wasm) Starter";
                readonly r: "R Starter";
                readonly react: "React Starter";
                readonly 'react-native': "React Native Starter";
                readonly reason: "Reason Starter";
                readonly rescript: "ReScript Starter";
                readonly riot: "Riot.js Starter";
                readonly ruby: "Ruby Starter";
                readonly 'ruby-wasm': "Ruby (Wasm) Starter";
                readonly scheme: "Scheme Starter";
                readonly shadcnui: "shadcn/ui Starter";
                readonly solid: "Solid Starter";
                readonly sql: "SQL Starter";
                readonly stencil: "Stencil Starter";
                readonly svelte: "Svelte Starter";
                readonly tailwindcss: "Tailwind CSS Starter";
                readonly tcl: "Tcl Starter";
                readonly teal: "Teal Starter";
                readonly typescript: "TypeScript Starter";
                readonly vue: "Vue SFC Starter";
                readonly vue2: "Vue 2 Starter";
                readonly wat: "WebAssembly Text Starter";
            };
            readonly user: {
                readonly heading: "My Templates";
                readonly loading: "Loading user templates...";
            };
        };
        readonly testEditor: {
            readonly heading: "Edit Tests";
            readonly load: "Load";
            readonly tests: "Tests";
        };
        readonly testSettings: {
            readonly desc: "<1></1> For further details, please refer to the <2>documentation</2>";
        };
        readonly toolspane: {
            readonly close: "Close";
            readonly compiled: {
                readonly title: "Compiled";
            };
            readonly console: {
                readonly clear: "Clear console";
                readonly title: "Console";
            };
            readonly test: {
                readonly edit: "Edit";
                readonly error: "<1><2>Test error!</2></1>";
                readonly loading: "<1>Loading tests...</1>";
                readonly noTest: "<1>This project has no tests!</1>";
                readonly reset: "Reset";
                readonly run: {
                    readonly desc: "Ctrl/⌘ + Alt + T";
                    readonly heading: "Run";
                };
                readonly summary: {
                    readonly desc: "Tests: {{failed}}\n       {{passed}}\n       {{skipped}}\n       {{total}}<1></1>\nTime: {{duration}}s";
                    readonly failed: "{{failedNum}} failed";
                    readonly passed: "{{passedNum}} passed";
                    readonly skipped: "{{skippedNum}} skipped";
                    readonly total: "{{totalNum}} total";
                };
                readonly title: "Tests";
                readonly watch: {
                    readonly desc: "Run tests when code changes";
                    readonly heading: "Watch";
                };
            };
        };
        readonly welcome: {
            readonly about: {
                readonly documentation: "Documentation";
                readonly heading: "About LiveCodes";
            };
            readonly heading: "Welcome";
            readonly recent: {
                readonly heading: "Recent";
            };
            readonly recover: {
                readonly cancel: "Cancel";
                readonly heading: "Recover";
                readonly lastModified: "Last modified:";
                readonly recover: "Recover";
                readonly save: "Save";
                readonly unsavedChanges: "Your last project had unsaved changes:";
            };
            readonly showOnStartup: "Show on startup";
            readonly start: {
                readonly heading: "Start";
                readonly import: "Import...";
                readonly loadDefaultTemplate: "Load default template";
                readonly new: "New...";
                readonly noDefaultTemplate: "No default template";
                readonly open: "Open...";
            };
            readonly templates: {
                readonly heading: "Starter Templates";
            };
        };
    };
    export default translation;
}
declare module "livecodes/i18n/locales/models" {
    import type { RequireAtLeastOne } from "livecodes/i18n/models";
    import type LangInfoTranslation from "livecodes/i18n/locales/en/language-info";
    import type Translation from "livecodes/i18n/locales/en/translation";
    /**
     * Add new translatable attributes here.
     *
     * To add new custom data attributes for HTML intellisense, see `scripts/vscode-intellisense.js`.
     */
    type I18nAttributes = RequireAtLeastOne<{
        textContent?: string;
        innerHTML?: string;
        title?: string;
        'data-hint'?: string;
        placeholder?: string;
    }>;
    /**
     * Basic template type for i18n object.
     *
     * Only use in `en` language with `as const satisfies`.
     */
    export interface I18nTranslationTemplate {
        [key: string]: I18nAttributes | string | I18nTranslationTemplate;
    }
    /**
     * Maps a nested object structure to a structure where all leaf nodes are strings.
     *
     * Use to keep the same structure as the `en` i18n object for other languages.
     */
    export type I18nStructure<T> = {
        readonly [K in keyof T]: T[K] extends Record<string, unknown> ? I18nStructure<T[K]> : string;
    };
    /**
     * Type for all i18n object of namespace `translation` other than `en`.
     */
    export type I18nTranslation = I18nStructure<typeof Translation>;
    /**
     * Type for all i18n object of namespace `language-info` other than `en`.
     */
    export type I18nLangInfoTranslation = I18nStructure<typeof LangInfoTranslation>;
}
declare module "livecodes/i18n/index" {
    export * from "livecodes/i18n/i18n";
    export type * from "livecodes/i18n/locales/models";
    export type * from "livecodes/i18n/models";
}
declare module "livecodes/import/files" {
    import type { ContentConfig, EventsManager } from "livecodes/models";
    import type { populateConfig as populateConfigFn } from "livecodes/import/utils";
    export const importFromFiles: (files: FileList, populateConfig: typeof populateConfigFn, eventsManager: EventsManager) => Promise<Partial<ContentConfig>>;
}
declare module "livecodes/services/permanent-url" {
    type SDKFile = 'esm' | 'umd' | 'react' | 'vue' | 'types';
    export const permanentUrlService: {
        getAppUrl: () => string;
        getSDKUrl: (file?: SDKFile) => string;
    };
}
declare module "livecodes/UI/sync-ui" {
    import type { EventsManager, Modal, Notifications, User, UserData } from "livecodes/models";
    export const isSyncInProgress: () => boolean;
    export const updateSyncStatus: ({ inProgress, lastSync, syncContainer, }: {
        inProgress?: boolean;
        lastSync?: number;
        syncContainer?: HTMLElement;
    }) => void;
    export const createSyncUI: ({ baseUrl, modal, notifications, eventsManager, user, deps, }: {
        baseUrl: string;
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        user: User;
        deps: {
            getSyncData: () => Promise<UserData['data']['sync'] | null>;
            setSyncData: (syncData: UserData['data']['sync']) => Promise<void>;
        };
    }) => Promise<void>;
}
declare module "livecodes/UI/import" {
    import { importCode } from "livecodes/import/import";
    import type { populateConfig as populateConfigFn } from "livecodes/import/utils";
    import type { ContentConfig, EventsManager, Modal, Notifications, Screen, User } from "livecodes/models";
    import type { ProjectStorage } from "livecodes/storage/index";
    export { importCode };
    export const createImportUI: ({ baseUrl, modal, notifications, eventsManager, getUser, loadConfig, populateConfig, projectStorage, showScreen, }: {
        baseUrl: string;
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        getUser: (() => Promise<void | User>) | undefined;
        loadConfig: (newConfig: Partial<ContentConfig>, url?: string) => Promise<void>;
        populateConfig: typeof populateConfigFn;
        projectStorage: ProjectStorage | undefined;
        showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
    }) => void;
}
declare module "livecodes/UI/qrcode" {
    export const generateQrCode: ({ container, url, title, logo, }: {
        container: HTMLElement;
        url: string;
        title?: string;
        logo?: string;
    }) => Promise<void>;
}
declare module "livecodes/UI/share" {
    import type { EventsManager, ShareData } from "livecodes/models";
    export const createShareContainer: (shareFn: (shortUrl: boolean, permanentUrl: boolean) => Promise<ShareData>, baseUrl: string, eventsManager: EventsManager) => Promise<HTMLElement>;
}
declare module "livecodes/UI/deploy" {
    import { deployFile } from "livecodes/deploy/deploy";
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import type { Cache, Config, ContentConfig, EventsManager, Modal, Notifications, User } from "livecodes/models";
    export { deployFile };
    export const createDeployUI: ({ modal, notifications, eventsManager, user, deployRepo, deps, }: {
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        user: User;
        deployRepo: string | undefined;
        deps: {
            getResultPage: (_: {
                forExport: boolean;
                template: string;
                singleFile: boolean;
            }) => Promise<string>;
            getCache: () => Cache;
            getConfig: () => Config;
            getContentConfig: (config: Config | ContentConfig) => ContentConfig;
            getLanguageExtension: typeof getLanguageExtensionFn;
            getLanguageCompiler: typeof getLanguageCompilerFn;
            setProjectDeployRepo: (repo: string) => Promise<void>;
        };
    }) => Promise<void>;
}
declare module "livecodes/UI/backup" {
    import type { EventsManager, Modal, Notifications } from "livecodes/models";
    import type { Stores } from "livecodes/storage/index";
    export const isInProgress: () => boolean;
    export const updateProgressStatus: ({ inProgress, backupContainer, }: {
        inProgress?: boolean;
        backupContainer: HTMLElement;
    }) => void;
    export const createBackupUI: ({ baseUrl, modal, notifications, eventsManager, stores, deps, }: {
        baseUrl: string;
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        stores: Stores;
        deps: {
            loadUserConfig: () => void;
        };
    }) => void;
}
declare module "livecodes/UI/embed-ui" {
    import type { CodeEditor, ContentConfig, EditorId, EventsManager, Modal, Notifications } from "livecodes/models";
    export const createEmbedUI: ({ config, editorLanguages, modal, notifications, eventsManager, createEditorFn, getUrlFn, }: {
        config: ContentConfig;
        editorLanguages: {
            script: string;
            style: string;
            markup: string;
        };
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        createEditorFn: (container: HTMLElement) => Promise<CodeEditor>;
        getUrlFn: (permanentUrl?: boolean) => Promise<string>;
    }) => Promise<void>;
}
declare module "livecodes/editor/codejar/prism-themes" {
    import type { CodejarTheme } from "livecodes/models";
    export const prismThemes: Array<{
        name: CodejarTheme;
        title: string;
        url: string;
        overrideCSS?: string;
    }>;
}
declare module "livecodes/editor/codemirror/codemirror-themes" {
    import type { CodemirrorTheme } from "livecodes/models";
    export const codemirrorThemes: Array<{
        name: CodemirrorTheme;
        title: string;
        url?: string;
        exportName?: string;
    }>;
    export const customThemes: {
        monochrome: any[];
        'monochrome-dark': any[];
    };
}
declare module "livecodes/editor/monaco/monaco-themes" {
    import type * as Monaco from 'monaco-editor';
    import type { MonacoTheme } from "livecodes/models";
    export const monacoThemes: Array<{
        name: MonacoTheme;
        title: string;
        url?: string;
    }>;
    export const customThemes: Array<{
        name: MonacoTheme;
        theme: Monaco.editor.IStandaloneThemeData;
    }>;
}
declare module "livecodes/editor/themes" {
    import type { CodejarTheme, CodemirrorTheme, Config, MonacoTheme } from "livecodes/models";
    export const getEditorTheme: ({ editor, editorTheme, theme, editorThemes, }: Pick<Config, 'editorTheme' | 'editor' | 'theme'> & {
        editorThemes: Array<MonacoTheme | CodemirrorTheme | CodejarTheme>;
    }) => "idle" | "lazy" | "dark" | "active4d" | "all-hallows-eve" | "amy" | "birds-of-paradise" | "blackboard" | "brilliance-black" | "brilliance-dull" | "catppuccin-latte" | "catppuccin-frappe" | "catppuccin-macchiato" | "catppuccin-mocha" | "chrome-devtools" | "clouds-midnight" | "clouds" | "cobalt" | "cobalt2" | "custom-vs-light" | "custom-vs-dark" | "dawn" | "dracula" | "dreamweaver" | "eiffel" | "espresso-libre" | "github" | "github-dark" | "github-light" | "hc-black" | "hc-light" | "idlefingers" | "iplastic" | "katzenmilch" | "krtheme" | "kuroir" | "magicwb-amiga" | "merbivore-soft" | "merbivore" | "monochrome" | "monochrome-dark" | "monokai" | "monokai-bright" | "monoindustrial" | "night-owl" | "nord" | "oceanic-next" | "pastels-on-dark" | "slush-and-poppies" | "solarized-dark" | "solarized-light" | "spacecadet" | "sunburst" | "textmate-mac-classic" | "tomorrow" | "tomorrow-night" | "tomorrow-night-blue" | "tomorrow-night-bright" | "tomorrow-night-eighties" | "twilight" | "upstream-sunburst" | "vibrant-ink" | "vs" | "vs-dark" | "xcode-default" | "zenburnesque" | "aura" | "ayu-light" | "barf" | "basic-light" | "basic-dark" | "bespin" | "boys-and-girls" | "cm-light" | "cool-glow" | "espresso" | "gruvbox-dark" | "gruvbox-light" | "material-dark" | "material-light" | "noctis-lilac" | "one-dark" | "rose-pine-dawn" | "smoothy" | "tokyo-night" | "tokyo-night-day" | "tokyo-night-storm" | "a11y-dark" | "atom-dark" | "base16-ateliersulphurpool-light" | "cb" | "coldark-cold" | "coldark-dark" | "coy" | "coy-without-shadows" | "darcula" | "duotone-dark" | "duotone-earth" | "duotone-forest" | "duotone-light" | "duotone-sea" | "duotone-space" | "funky" | "ghcolors" | "holi-theme" | "hopscotch" | "laserwave" | "lucario" | "material-oceanic" | "nord-2" | "okaidia" | "one-light" | "pojoaque" | "shades-of-purple" | "solarized-dark-atom" | "synthwave84" | "vsc-dark-plus" | "xonokai" | "z-touchs" | null;
}
declare module "livecodes/UI/editor-settings" {
    import type { createEditor } from "livecodes/editor/create-editor";
    import type { EditorLibrary, EventsManager, FormatFn, Modal, UserConfig } from "livecodes/models";
    export const createEditorSettingsUI: ({ baseUrl, modal, eventsManager, scrollToSelector, deps, }: {
        baseUrl: string;
        modal: Modal;
        eventsManager: EventsManager;
        scrollToSelector: string;
        deps: {
            getUserConfig: () => UserConfig;
            createEditor: typeof createEditor;
            loadTypes: (code: string) => Promise<EditorLibrary[]>;
            getFormatFn: () => Promise<FormatFn>;
            changeSettings: (newConfig: Partial<UserConfig>) => void;
        };
    }) => Promise<void>;
}
declare module "livecodes/UI/code-to-image" {
    import type { CodeEditor, CodejarTheme, Config, EditorId, EditorOptions, EventsManager, FormatFn, Modal, Notifications } from "livecodes/models";
    type PreviewEditorOptions = Pick<EditorOptions, 'container' | 'editorTheme' | 'fontFamily' | 'fontSize' | 'lineNumbers' | 'wordWrap'>;
    type Preset = PreviewEditorOptions & {
        id: string;
        format: 'png' | 'jpg' | 'svg';
        bg1: string;
        bg2: string;
        bgDirection: `to ${'top' | 'bottom' | 'left' | 'right' | 'top right' | 'top left' | 'bottom right' | 'bottom left'}`;
        opacity: number | undefined;
        width: number;
        padding: number;
        borderRadius: number;
        shadow: boolean;
        watermark: boolean;
        windowStyle: 'mac' | 'windows' | 'none';
        scale: number;
        fileName: string;
        editorTheme: CodejarTheme;
    };
    export const createCodeToImageUI: ({ baseUrl, currentUrl, fileName, editorId, modal, notifications, eventsManager, deps, }: {
        baseUrl: string;
        currentUrl: string;
        fileName: string;
        editorId: EditorId;
        modal: Modal;
        notifications: Notifications;
        eventsManager: EventsManager;
        deps: {
            createEditor: (options: PreviewEditorOptions) => Promise<CodeEditor>;
            getFormatFn: () => Promise<FormatFn>;
            getShareUrl: (config: Partial<Config>, shortUrl?: boolean) => Promise<string>;
            getSavedPreset: () => Partial<Preset> | undefined;
            savePreset: (preset: Partial<Preset>) => void;
        };
    }) => Promise<void>;
}
declare module "livecodes/UI/assets" {
    import type { DeployResult } from "livecodes/deploy/index";
    import type { Asset, EventsManager, Modal, Notifications, Screen, User } from "livecodes/models";
    import type { GitHubFile } from "livecodes/services/github";
    import { type Storage } from "livecodes/storage/index";
    export const createAssetsList: ({ assetsStorage, eventsManager, showScreen, notifications, modal, baseUrl, }: {
        assetsStorage: Storage<Asset>;
        eventsManager: EventsManager;
        showScreen: (screen: Screen['screen']) => void;
        notifications: Notifications;
        modal: Modal;
        baseUrl: string;
    }) => Promise<void>;
    export const createAddAssetContainer: ({ assetsStorage, eventsManager, showScreen, notifications, deployAsset, getUser, baseUrl, activeTab, }: {
        assetsStorage: Storage<Asset>;
        eventsManager: EventsManager;
        showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
        notifications: Notifications;
        deployAsset: (user: User, file: GitHubFile) => Promise<DeployResult | null>;
        getUser: (fn?: () => void) => Promise<User | void>;
        baseUrl: string;
        activeTab: number;
    }) => HTMLElement;
}
declare module "livecodes/UI/snippets" {
    import type { AppData, CodeEditor, EditorOptions, EventsManager, Modal, Notifications, Screen, Snippet } from "livecodes/models";
    import type { Storage } from "livecodes/storage/models";
    export const createSnippetsList: ({ snippetsStorage, eventsManager, notifications, modal, deps, }: {
        snippetsStorage: Storage<Snippet>;
        eventsManager: EventsManager;
        notifications: Notifications;
        modal: Modal;
        deps: {
            createEditorFn: (options: Partial<EditorOptions>) => Promise<CodeEditor>;
            showScreen: (screen: Screen['screen']) => void;
        };
    }) => Promise<void>;
    export const createAddSnippetContainer: ({ snippetId, snippetsStorage, eventsManager, showScreen, notifications, deps, }: {
        snippetId?: string;
        snippetsStorage: Storage<Snippet>;
        eventsManager: EventsManager;
        showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
        notifications: Notifications;
        deps: {
            createEditorFn: (options: Partial<EditorOptions>) => Promise<CodeEditor>;
            getAppData: () => AppData | null;
            setAppData: (data: AppData) => void;
        };
    }) => Promise<HTMLElement>;
}
declare module "livecodes/services/pkgInfo" {
    import type { CDNService } from "livecodes/models";
    export const pkgInfoService: CDNService;
}
declare module "livecodes/services/google-fonts" {
    export const googleFonts: {
        getFonts: () => string[];
        getStylesheetUrl: (font: string) => string;
    };
}
declare module "livecodes/UI/resources" {
    import type { Config, EventsManager, Modal } from "livecodes/models";
    export const createExternalResourcesUI: ({ baseUrl, modal, eventsManager, deps, }: {
        baseUrl: string;
        modal: Modal;
        eventsManager: EventsManager;
        deps: {
            getConfig: () => Config;
            setConfig: (config: Config) => void;
            loadResources: () => Promise<void>;
        };
    }) => void;
}
declare module "livecodes/core" {
    import type { I18nInterpolationType, I18nKeyType, I18nValueType } from "livecodes/i18n/index";
    import { languages, processors } from "livecodes/languages/index";
    import type { API, Config } from "livecodes/models";
    import { createAuthService } from "livecodes/services/index";
    global {
        interface Window {
            deps: {
                showMode: typeof showMode;
                /**
                 * String-level i18n helper function.
                 * @param key The key of the translation.
                 * @param value The default value to translate.
                 * @param args The interpolation object.
                 * @returns The translated string.
                 */
                translateString: <Key extends I18nKeyType, Value extends string>(key: Key, value: I18nValueType<Key, Value>, ...args: I18nInterpolationType<I18nValueType<Key, Value>>) => string;
                languages: typeof languages;
                processors: typeof processors;
            };
        }
    }
    export let authService: ReturnType<typeof createAuthService> | undefined;
    const showMode: (mode?: Config['mode'], view?: Config['view']) => void;
    const initApp: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    const initEmbed: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    const initHeadless: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    export { initApp, initEmbed, initHeadless };
}
declare module "livecodes/app" {
    export const app: (config: Partial<import("sdk").Config>, baseUrl: string) => Promise<import("sdk/models").API>;
}
declare module "livecodes/embed" {
    export const app: (config: Partial<import("sdk").Config>, baseUrl: string) => Promise<import("sdk/models").API>;
}
declare module "livecodes/headless" {
    export const app: (config: Partial<import("sdk").Config>, baseUrl: string) => Promise<import("sdk/models").API>;
}
declare module "livecodes/main" {
    import type { API, Config, EmbedOptions } from "livecodes/models";
    export type { API, Config };
    export const params: URLSearchParams;
    export let isEmbed: boolean;
    export const clickToLoad: boolean;
    export const loading: EmbedOptions['loading'];
    export const disableAI: boolean;
    export const livecodes: (container: string, config?: Partial<Config>) => Promise<API>;
}
declare module "livecodes/index" { }
declare module "livecodes/cache/__tests__/cache.spec" { }
declare module "livecodes/compiler/compile.page" { }
declare module "livecodes/compiler/compile.worker" { }
declare module "livecodes/compiler/compiler-utils" { }
declare module "livecodes/compiler/__tests__/import-map.spec" { }
declare module "livecodes/config/__tests__/build-config.spec" { }
declare module "livecodes/config/__tests__/is-earlier.spec" { }
declare module "livecodes/config/__tests__/upgrade-config.spec" { }
declare module "livecodes/config/__tests__/validate-config.spec" { }
declare module "livecodes/editor/custom-editor-utils" { }
declare module "livecodes/editor/codejar/codejar" {
    import 'prismjs';
    import 'prismjs/components/prism-css';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/components/prism-json';
    import 'prismjs/components/prism-jsx';
    import 'prismjs/components/prism-markup';
    import 'prismjs/components/prism-tsx';
    import 'prismjs/components/prism-typescript';
    import 'prismjs/plugins/autoloader/prism-autoloader';
    import 'prismjs/plugins/line-numbers/prism-line-numbers';
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export const createEditor: (options: EditorOptions) => Promise<CodeEditor>;
}
declare module "livecodes/editor/codemirror/editor-languages" {
    import { LanguageSupport } from '@codemirror/language';
    import type { Language } from "livecodes/models";
    export const editorLanguages: Partial<{
        [key in Language]: () => Promise<LanguageSupport>;
    }>;
}
declare module "livecodes/editor/codemirror/codemirror" {
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export const createEditor: (options: EditorOptions) => Promise<CodeEditor>;
}
declare module "livecodes/editor/monaco/twoslashSupport" {
    /**
     * This is a port of the twoslash bit which grabs compiler options
     * from the source code
     */
    export const extractTwoSlashCompilerOptions: (optionDeclarations: any[] | undefined) => (code: string) => any;
    export function parsePrimitive(value: string, type: string): any;
    export const twoslashCompletions: (optionDeclarations: any[] | undefined) => (model: import('monaco-editor').editor.ITextModel, position: import('monaco-editor').Position, _token: any) => import('monaco-editor').languages.CompletionList;
}
declare module "livecodes/editor/monaco/register-twoslash" {
    import type * as Monaco from 'monaco-editor';
    type CompilerOptions = Monaco.languages.typescript.CompilerOptions;
    export const registerTwoSlash: ({ isJSLang, editor, monaco, compilerOptions, }: {
        isJSLang: boolean;
        editor: Monaco.editor.IStandaloneCodeEditor;
        monaco: typeof Monaco;
        compilerOptions: CompilerOptions;
    }) => Promise<void>;
}
declare module "livecodes/editor/monaco/monaco" {
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export const createEditor: (options: EditorOptions) => Promise<CodeEditor>;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-astro" {
    const _default: {
        config: {
            comments: {
                blockComment: string[];
            };
            brackets: string[][];
            autoClosingPairs: ({
                open: string;
                close: string;
                notIn?: undefined;
            } | {
                open: string;
                close: string;
                notIn: string[];
            })[];
            autoCloseBefore: string;
            surroundingPairs: {
                open: string;
                close: string;
            }[];
            folding: {
                markers: {
                    start: RegExp;
                    end: RegExp;
                };
            };
        };
        tokens: {
            defaultToken: string;
            tokenPostfix: string;
            ignoreCase: boolean;
            empty: string[];
            tokenizer: {
                root: ((string | RegExp)[] | (RegExp | (string | {
                    token: string;
                    next: string;
                })[])[])[];
                doctype: (string | RegExp)[][];
                frontmatter: (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[][];
                frontmatterEmbedded: ((RegExp | {
                    token: string;
                    next: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[])[];
                expression: ((RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                expressionEmbedded: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[])[];
                comment: (string | RegExp)[][];
                otherTag: (string | RegExp)[][];
                script: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | (string | {
                    token: string;
                    next: string;
                })[])[])[];
                scriptAfterType: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                scriptAfterTypeEquals: ((RegExp | {
                    token: string;
                    switchTo: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                scriptWithCustomType: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                scriptEmbedded: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[])[];
                style: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | (string | {
                    token: string;
                    next: string;
                })[])[])[];
                styleAfterType: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                styleAfterTypeEquals: ((RegExp | {
                    token: string;
                    switchTo: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                styleWithCustomType: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                styleEmbedded: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                    nextEmbedded: string;
                })[])[];
            };
        };
    };
    export default _default;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-clio" {
    const _default_1: {
        tokens: {
            keywords: string[];
            typeKeywords: string[];
            operators: string[];
            symbols: RegExp;
            escapes: RegExp;
            tokenizer: {
                root: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[] | (RegExp | {
                    cases: {
                        '@typeKeywords': string;
                        '@keywords': string;
                        '@default': string;
                    };
                })[] | {
                    include: string;
                } | (RegExp | {
                    cases: {
                        '@operators': string;
                        '@default': string;
                    };
                })[] | (RegExp | {
                    token: string;
                })[] | (RegExp | {
                    token: string;
                    bracket: string;
                    next: string;
                })[])[];
                string: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    bracket: string;
                    next: string;
                })[])[];
                stringSingle: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    bracket: string;
                    next: string;
                })[])[];
                whitespace: (string | RegExp)[][];
                function: (RegExp | {
                    token: string;
                    next: string;
                })[][];
                chain: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
            };
        };
    };
    export default _default_1;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-imba" {
    const _default_2: {
        tokens: {
            defaultToken: string;
            ignoreCase: boolean;
            tokenPostfix: string;
            brackets: {
                open: string;
                close: string;
                token: string;
            }[];
            keywords: string[];
            boolean: string[];
            operators: string[];
            assignments: string[];
            logic: string[];
            ranges: string[];
            spread: string[];
            dot: string[];
            access: string[];
            math: string[];
            unspaced_ops: RegExp;
            comment: RegExp;
            symbols: RegExp;
            escapes: RegExp;
            postaccess: RegExp;
            ivar: RegExp;
            B: RegExp;
            br: RegExp;
            constant: RegExp;
            id: RegExp;
            plainid: RegExp;
            fieldid: RegExp;
            propid: RegExp;
            defid: RegExp;
            decid: RegExp;
            symid: RegExp;
            symref: RegExp;
            optid: RegExp;
            esmIdentifier: RegExp;
            propertyPath: RegExp;
            tagNameIdentifier: RegExp;
            variable: RegExp;
            varKeyword: RegExp;
            tagIdentifier: RegExp;
            implicitCall: RegExp;
            cssModifier: RegExp;
            cssPropertyPath: RegExp;
            cssPropertyKey: RegExp;
            cssVariable: RegExp;
            cssPropertyName: RegExp;
            cssPropertyKey2: RegExp;
            cssUpModifier: RegExp;
            cssIsModifier: RegExp;
            regEx: RegExp;
            regexpctl: RegExp;
            regexpesc: RegExp;
            tokenizer: {
                root: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[])[];
                _comment: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1~$S2\t*': {
                            token: string;
                        };
                        '@default': {
                            token: string;
                            next: string;
                        };
                    };
                })[])[];
                illegal_indent: ((RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                identifier_: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        this: string;
                        self: string;
                        '@keywords': string;
                        '$0~[A-Z].*': string;
                        '@default': string;
                    };
                })[])[];
                block_: (string | (string | RegExp)[])[];
                indentable_: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _indent: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _paren_indent: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                block: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                bool_: (string | RegExp)[][];
                op_: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '@spread': string;
                        '@access': string;
                        '@default': string;
                    };
                })[] | (RegExp | {
                    cases: {
                        '$2@assignments': string;
                        '$2@math': string;
                        '$2@operators': string;
                        '$2@logic': string;
                        '$2@access': string;
                        '@default': string;
                    };
                })[])[];
                keyword_: (string | RegExp)[][];
                return_: (string | RegExp)[][];
                primitive_: string[];
                value_: string[];
                expr_: string[];
                attr_expr_: string[];
                access_: (RegExp | {
                    cases: {
                        '$2~[A-Z].*': string[];
                        '$2~#.*': string[];
                        '@default': string[];
                    };
                })[][];
                call_: (string | RegExp)[][];
                key_: ((RegExp | string[])[] | (RegExp | {
                    cases: {
                        '@default': string[];
                    };
                })[])[];
                implicit_call_: (RegExp | {
                    cases: {
                        '$2~[A-Z].*': string[];
                        '@default': string[];
                    };
                })[][];
                implicit_call_body: (string | (string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                arglist_: (string | (string | RegExp)[])[];
                params_: (string | (string | RegExp)[])[];
                object_: (string | RegExp)[][];
                parens_: (string | RegExp)[][];
                parens_body: (string | (string | RegExp)[])[];
                array_: (string | RegExp)[][];
                array_body: (string | (string | RegExp)[] | (RegExp | {
                    token: string;
                    switchTo: string;
                })[])[];
                object_body: (string | (string | RegExp)[] | (RegExp | string[])[])[];
                object_value: (string | (string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                object_dynamic_key: (string | string[])[];
                comment_: (string | RegExp)[][];
                block_comment_: (string | RegExp)[][];
                _block_comment: (string | RegExp)[][];
                try_: (string | RegExp)[][];
                catch_: (string | RegExp)[][];
                catch_start: (string | RegExp | {
                    switchTo: string;
                })[][];
                _catch: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _try: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                do_: (string | RegExp)[][];
                do_start: ((RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                do_piped: ((RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                _do_piped_params: (string | (string | RegExp | {
                    switchTo: string;
                })[])[];
                _do_params: (string | (string | RegExp | {
                    switchTo: string;
                })[])[];
                _do: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                class_: ((string | RegExp)[] | (RegExp | string[])[])[];
                class_start: ((RegExp | string[])[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                tagclass_: ((string | RegExp)[] | (RegExp | string[])[])[];
                tagclass_start: ((RegExp | string[])[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                import_: ((string | RegExp)[] | (RegExp | string[])[])[];
                import_body: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | (string | {
                    switchTo: string;
                })[])[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                import_source: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                export_: ((string | RegExp)[] | (RegExp | string[])[])[];
                export_body: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | string[])[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                esm_specifiers: (string | (RegExp | (string | {
                    switchTo: string;
                })[])[] | (RegExp | {
                    cases: {
                        '$/==part': {
                            token: string;
                            switchTo: string;
                        };
                        '@default': {
                            token: string;
                        };
                    };
                })[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                _path: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '$#==$F': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[])[];
                member_: ((string | RegExp)[] | (RegExp | string[])[])[];
                func_: ((string | RegExp)[] | (RegExp | string[])[])[];
                flow_: (RegExp | string[])[][];
                flow_start: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                for_: (string | RegExp)[][];
                while_: (string | RegExp)[][];
                while_body: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                for_start: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                for_source: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                for_body: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                decorator_: ((string | RegExp)[] | (RegExp | string[])[])[];
                _decorator_params: (string | (string | RegExp)[])[];
                field_: ((string | RegExp)[] | (RegExp | string[])[])[];
                _field_1: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | string[])[])[];
                _field_value: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | string[])[])[];
                var_: (RegExp | string[])[][];
                inline_var_: (RegExp | string[])[][];
                string_: (string | RegExp)[][];
                number_: ((string | RegExp)[] | (RegExp | string[])[])[];
                _string: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        "$F=='": string;
                        '@default': {
                            token: string;
                            next: string;
                        };
                    };
                })[] | (RegExp | {
                    cases: {
                        '$#==$F': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[])[];
                _herestring: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$F': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[] | (RegExp | {
                    cases: {
                        '$F=="""': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[])[];
                interpolation_body: (string | (string | RegExp)[])[];
                _class: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _tagclass: (string | (string | RegExp)[])[];
                def_params: (string | (string | RegExp | {
                    switchTo: string;
                })[])[];
                def_parens: (string | (string | RegExp)[])[];
                def_dynamic_name: (string | (string | {
                    token: string;
                    switchTo: string;
                })[])[];
                _render: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _def: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _flow: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _varblock: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                _vardecl: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                array_var_body: (string | (string | RegExp)[])[];
                array_var_body_value: (string | (string | RegExp)[])[];
                inline_var_body: (string | (string | RegExp)[])[];
                var_value: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                common_: (string | (string | RegExp)[])[];
                comma_: (string | RegExp)[][];
                spread_: (string | RegExp)[][];
                type_: (string | RegExp)[][];
                _type: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | {
                    cases: {
                        '$/==0': {
                            token: string;
                            next: string;
                        };
                        '@default': string;
                    };
                })[] | (RegExp | {
                    cases: {
                        '$#==$/': {
                            token: string;
                            next: string;
                        };
                        '@default': {
                            token: string;
                            next: string;
                        };
                    };
                })[])[];
                css_: (string | RegExp)[][];
                sel_: ((string | RegExp)[] | (RegExp | string[])[])[];
                css_props: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                css_selector: (string | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                css_inline: (string | RegExp)[][];
                css_selector_parens: (string | (string | RegExp)[])[];
                css_selector_attr: (string | (string | RegExp)[])[];
                css_property: ((RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][] | (RegExp | string[])[] | (string | RegExp | {
                    switchTo: string;
                })[])[];
                css_value_: (string | (string | RegExp)[] | (RegExp | string[])[])[];
                css_value: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                css_multiline_value: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                css_expressions: (string | (string | RegExp)[])[];
                css_interpolation: (string | (string | RegExp)[])[];
                expressions: (string | RegExp)[][];
                whitespace: (string | RegExp)[][];
                space: (string | RegExp)[][];
                tag_: (RegExp | string[])[][];
                tag_content: (string | (string | RegExp)[] | (RegExp | {
                    cases: {
                        '$1==$S2\t': any;
                        '$1==$S2': {
                            cases: {
                                '$1==$S6': any;
                                '@default': {
                                    token: string;
                                    switchTo: string;
                                };
                            };
                        };
                        '@default': any;
                    };
                })[] | (RegExp | {
                    cases: {};
                })[][])[];
                tag_children: never[];
                _tag: (string | (RegExp | string[])[] | (string | RegExp | {
                    switchTo: string;
                })[] | (RegExp | {
                    cases: {
                        '$/==event': {
                            token: string;
                            switchTo: string;
                        };
                        '$/==event-modifier': {
                            token: string;
                            switchTo: string;
                        };
                        '$/==modifier': {
                            token: string;
                            switchTo: string;
                        };
                        '$/==rule': {
                            token: string;
                            switchTo: string;
                        };
                        '$/==rule-modifier': {
                            token: string;
                            switchTo: string;
                        };
                        '@default': {
                            token: string;
                            switchTo: string;
                        };
                    };
                })[] | (RegExp | {
                    cases: {
                        '$/==name': string;
                        '@default': string;
                    };
                })[] | (RegExp | {
                    token: string;
                    switchTo: string;
                })[] | (RegExp | {
                    cases: {
                        '$/==attr': {
                            token: string;
                            next: string;
                        };
                        '@default': {
                            token: string;
                        };
                    };
                })[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                tag_event_: (string | RegExp)[][];
                _tag_part: (string | RegExp)[][];
                _tag_event: (string | (string | RegExp)[] | (RegExp | string[])[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                tag_attr_: (string | RegExp)[][];
                _tag_attr: (string | (string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                _tag_interpolation: (string | (string | RegExp)[])[];
                _tag_parens: (string | (string | RegExp)[])[];
                _tag_value: (string | (string | RegExp)[])[];
                regexp_: ((RegExp | string[])[] | (RegExp | {
                    token: string;
                    bracket: string;
                    next: string;
                })[])[];
                _regexp: ((string | RegExp)[] | (RegExp | (string | {
                    token: string;
                    next: string;
                })[])[] | (RegExp | ({
                    token: string;
                    next?: undefined;
                } | {
                    token: string;
                    next: string;
                })[])[] | (string | {
                    token: string;
                    next: string;
                })[])[];
                _regexrange: (string | RegExp)[][];
                _hereregexp: (string | (string | RegExp)[])[];
            };
        };
        config: {
            wordPattern: RegExp;
            comments: {
                blockComment: string[];
                lineComment: string;
            };
            brackets: string[][];
            autoClosingPairs: {
                open: string;
                close: string;
                notIn: string[];
            }[];
            onEnterRules: {
                beforeText: RegExp;
                action: {
                    indentAction: number;
                };
            }[];
        };
    };
    export default _default_2;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-minizinc" {
    import type { languages } from 'monaco-editor';
    const _default_3: {
        config: languages.LanguageConfiguration;
        tokens: languages.IMonarchLanguage;
        completions: languages.CompletionItemProvider;
    };
    export default _default_3;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-prolog" {
    const _default_4: {
        config: {
            comments: {
                lineComment: string;
                blockComment: string[];
            };
            brackets: string[][];
            autoClosingPairs: ({
                open: string;
                close: string;
                notIn?: undefined;
            } | {
                open: string;
                close: string;
                notIn: string[];
            })[];
            surroundingPairs: {
                open: string;
                close: string;
            }[];
        };
        tokens: {
            defaultToken: string;
            tokenPostfix: string;
            atom: RegExp;
            variable: RegExp;
            builtins: string[];
            tokenizer: {
                root: ((string | RegExp)[] | (RegExp | {
                    cases: {
                        '@builtins': string;
                        '@default': string;
                    };
                })[])[];
                commentBlock: (string | RegExp)[][];
                stringDouble: (string | RegExp)[][];
                stringSingle: (string | RegExp)[][];
            };
        };
    };
    export default _default_4;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-sql" {
    const _default_5: {
        config: {
            comments: {
                lineComment: string;
                blockComment: string[];
            };
            brackets: string[][];
            autoClosingPairs: {
                open: string;
                close: string;
            }[];
            surroundingPairs: {
                open: string;
                close: string;
            }[];
        };
        tokens: {
            defaultToken: string;
            tokenPostfix: string;
            ignoreCase: boolean;
            brackets: {
                open: string;
                close: string;
                token: string;
            }[];
            keywords: string[];
            operators: string[];
            builtinFunctions: string[];
            builtinVariables: string[];
            pseudoColumns: string[];
            tokenizer: {
                root: ((string | RegExp)[] | {
                    include: string;
                } | (RegExp | {
                    cases: {
                        '@keywords': string;
                        '@operators': string;
                        '@builtinVariables': string;
                        '@builtinFunctions': string;
                        '@default': string;
                    };
                })[])[];
                whitespace: (string | RegExp)[][];
                comments: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                comment: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                pseudoColumns: (RegExp | {
                    cases: {
                        '@pseudoColumns': string;
                        '@default': string;
                    };
                })[][];
                numbers: (string | RegExp)[][];
                strings: (RegExp | {
                    token: string;
                    next: string;
                })[][];
                string: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                complexIdentifiers: (RegExp | {
                    token: string;
                    next: string;
                })[][];
                bracketedIdentifier: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                quotedIdentifier: ((string | RegExp)[] | (RegExp | {
                    token: string;
                    next: string;
                })[])[];
                scopes: ((string | RegExp)[] | (RegExp | {
                    token: string;
                })[])[];
            };
        };
    };
    export default _default_5;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-wat" {
    const _default_6: {
        config: {
            brackets: string[][];
            autoClosingPairs: {
                open: string;
                close: string;
            }[];
            surroundingPairs: {
                open: string;
                close: string;
            }[];
        };
        tokens: {
            keywords: string[];
            types: string[];
            instructions: string[];
            controlInstructions: string[];
            escapes: RegExp;
            digits: RegExp;
            octaldigits: RegExp;
            binarydigits: RegExp;
            hexdigits: RegExp;
            tokenizer: {
                root: ((string | RegExp)[] | {
                    include: string;
                } | (RegExp | {
                    token: string;
                })[] | (RegExp | {
                    cases: {
                        '@types': {
                            token: string;
                        };
                        '@keywords': {
                            token: string;
                        };
                        '@controlInstructions': {
                            token: string;
                        };
                        '@instructions': {
                            token: string;
                        };
                        '@default': string;
                    };
                })[])[];
                string: (string | RegExp)[][];
                whitespace: ((string | RegExp)[] | (RegExp | string[])[])[];
            };
        };
    };
    export default _default_6;
}
declare module "livecodes/formatter/format.worker" { }
declare module "livecodes/handlers/__tests__/keyboard-shortcuts.test" { }
declare module "livecodes/i18n/locales/ar/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/ar/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/bn/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/bn/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/de/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/de/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/es/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/es/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/fa/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/fa/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/fr/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/fr/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/hi/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/hi/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/id/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/id/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/it/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/it/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/ja/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/ja/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/nl/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/nl/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/pt/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/pt/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/ru/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/ru/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/tr/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/tr/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/ur/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/ur/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/i18n/locales/zh-CN/language-info" {
    import type { I18nLangInfoTranslation } from "livecodes/i18n/locales/models";
    const languageInfo: I18nLangInfoTranslation;
    export default languageInfo;
}
declare module "livecodes/i18n/locales/zh-CN/translation" {
    import type { I18nTranslation } from "livecodes/i18n/locales/models";
    const translation: I18nTranslation;
    export default translation;
}
declare module "livecodes/import/__tests__/hosts.spec" { }
declare module "livecodes/import/__tests__/populate-config.spec" { }
declare module "livecodes/import/__tests__/url.spec" { }
declare module "livecodes/languages/language-info" {
    export { languageInfo } from "livecodes/html/index";
}
declare module "livecodes/languages/__tests__/languages.spec" { }
declare module "livecodes/languages/art-template/lang-art-template-compiler" { }
declare module "livecodes/languages/assemblyscript/lang-assemblyscript-compiler" { }
declare module "livecodes/languages/assemblyscript/lang-assemblyscript-script" { }
declare module "livecodes/languages/astro/lang-astro-compiler" { }
declare module "livecodes/languages/clio/lang-clio-compiler" { }
declare module "livecodes/languages/cpp/lang-cpp-script" { }
declare module "livecodes/languages/cpp-wasm/lang-cpp-wasm-script" { }
declare module "livecodes/languages/csharp-wasm/lang-csharp-wasm-script" {
    global {
        interface Window {
            DotNet: any;
            Blazor: {
                start: (options: any) => Promise<void>;
            };
        }
    }
}
declare module "livecodes/languages/diagrams/lang-diagrams-compiler-esm" {
    import type { CompilerFunction } from "livecodes/models";
    export const diagramsCompiler: CompilerFunction;
}
declare module "livecodes/languages/dot/lang-dot-compiler" { }
declare module "livecodes/languages/ejs/lang-ejs-compiler" { }
declare module "livecodes/languages/eta/lang-eta-compiler" { }
declare module "livecodes/languages/fennel/lang-fennel-compiler" { }
declare module "livecodes/languages/gleam/gleam-modules" {
    export interface Modules {
        [key: string]: {
            srcUrl?: string;
            src?: string;
            compiledUrl?: string;
        };
    }
    export const modules: Modules;
}
declare module "livecodes/languages/gleam/lang-gleam-compiler" { }
declare module "livecodes/languages/go-wasm/lang-go-wasm-script" { }
declare module "livecodes/languages/haml/lang-haml-compiler" { }
declare module "livecodes/languages/handlebars/lang-handlebars-compiler" { }
declare module "livecodes/languages/imba/lang-imba-compiler" { }
declare module "livecodes/languages/java/lang-java-script" { }
declare module "livecodes/languages/jinja/lang-jinja-compiler" { }
declare module "livecodes/languages/julia/lang-julia-script" { }
declare module "livecodes/languages/lightningcss/processor-lightningcss-compiler" {
    export const lightningcssFeatures: {
        Nesting: number;
        NotSelectorList: number;
        DirSelector: number;
        LangSelectorList: number;
        IsSelector: number;
        TextDecorationThicknessPercent: number;
        MediaIntervalSyntax: number;
        MediaRangeSyntax: number;
        CustomMediaQueries: number;
        ClampFunction: number;
        ColorFunction: number;
        OklabColors: number;
        LabColors: number;
        P3Colors: number;
        HexAlphaColors: number;
        SpaceSeparatedColorNotation: number;
        FontFamilySystemUi: number;
        DoublePositionGradients: number;
        VendorPrefixes: number;
        LogicalProperties: number;
        LightDark: number;
        Selectors: number;
        MediaQueries: number;
        Colors: number;
    };
}
declare module "livecodes/languages/liquid/lang-liquid-compiler" { }
declare const wasmoon: any;
declare module "livecodes/languages/malina/lang-malina-compiler" { }
declare module "livecodes/languages/minizinc/lang-minizinc-script" { }
declare module "livecodes/languages/mustache/lang-mustache-compiler" { }
declare module "livecodes/languages/nunjucks/lang-nunjucks-compiler" { }
declare const p5pkg: any;
declare const phpWasm: any;
declare const php: any;
declare const runPhpScript: (element: HTMLElement) => void;
declare module "livecodes/languages/postcss/processor-postcss-compiler" { }
declare module "livecodes/languages/postgresql/lang-postgresql-compiler-esm" {
    import type { CompilerFunction } from "livecodes/models";
    global {
        interface Window {
            PGlite: any;
            pgsqldb: any;
        }
    }
    export const pgSqlCompiler: CompilerFunction;
}
declare const livecodes: any;
declare const pl: any;
declare module "livecodes/languages/pug/lang-pug-compiler" { }
declare module "livecodes/languages/python-wasm/lang-python-wasm-script" { }
declare module "livecodes/languages/r/lang-r-script-esm" { }
declare module "livecodes/languages/rescript/lang-rescript-compiler-esm" {
    import type { CompilerFunction } from "livecodes/models";
    export const rescriptCompiler: CompilerFunction;
}
declare module "livecodes/languages/rescript/lang-rescript-formatter" { }
declare module "livecodes/languages/riot/lang-riot-compiler" { }
declare module "livecodes/languages/ruby-wasm/lang-ruby-wasm-script" { }
declare module "livecodes/languages/scss/lang-scss-compiler" { }
declare module "livecodes/languages/solid/lang-solid-compiler" { }
declare module "livecodes/languages/sql/lang-sql-compiler" { }
declare module "livecodes/languages/sql/lang-sql-script" { }
declare module "livecodes/languages/svelte/lang-svelte-compiler" { }
declare module "livecodes/languages/tailwindcss/utils" {
    export const addCodeInStyleBlocks: (css: string, html: string) => string;
}
declare module "livecodes/languages/tailwindcss/processor-tailwindcss-compiler" { }
declare module "livecodes/languages/tcl/lang-tcl-script" { }
declare module "livecodes/languages/teal/lang-teal-compiler" { }
declare module "livecodes/languages/twig/lang-twig-compiler" { }
declare module "livecodes/languages/unocss/processor-unocss-compiler" { }
declare module "livecodes/languages/vento/lang-vento-compiler" { }
declare module "livecodes/languages/vue/lang-vue-compiler" { }
declare module "livecodes/languages/vue2/lang-vue2-compiler" { }
declare module "livecodes/languages/wat/lang-wat-compiler" { }
declare module "livecodes/languages/wat/lang-wat-script" { }
declare module "livecodes/languages/windicss/processor-windicss-compiler" { }
declare module "livecodes/notifications/__tests__/create-notifications.spec" { }
declare module "livecodes/result/result-utils" { }
declare module "livecodes/result/__tests__/type-of.spec" { }
declare module "livecodes/services/firebase" {
    export { getApp, initializeApp } from 'firebase/app';
    export { GithubAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
    export type { User as FirebaseUser } from 'firebase/auth';
    export const firebaseConfig: any;
}
declare module "livecodes/services/__tests__/modulesService.spec" { }
declare module "livecodes/templates/starter/angular-starter" {
    import type { Template } from "livecodes/models";
    export const angularStarter: Template;
}
declare module "livecodes/templates/starter/assemblyscript-starter" {
    import type { Template } from "livecodes/models";
    export const assemblyscriptStarter: Template;
}
declare module "livecodes/templates/starter/astro-starter" {
    import type { Template } from "livecodes/models";
    export const astroStarter: Template;
}
declare module "livecodes/templates/starter/backbone-starter" {
    import type { Template } from "livecodes/models";
    export const backboneStarter: Template;
}
declare module "livecodes/templates/starter/blank" {
    import type { Template } from "livecodes/models";
    export const blank: Template;
}
declare module "livecodes/templates/starter/blockly-starter" {
    import type { Template } from "livecodes/models";
    export const blocklyStarter: Template;
}
declare module "livecodes/templates/starter/bootstrap-starter" {
    import type { Template } from "livecodes/models";
    export const bootstrapStarter: Template;
}
declare module "livecodes/templates/starter/civet-starter" {
    import type { Template } from "livecodes/models";
    export const civetStarter: Template;
}
declare module "livecodes/templates/starter/clio-starter" {
    import type { Template } from "livecodes/models";
    export const clioStarter: Template;
}
declare module "livecodes/templates/starter/clojurescript-starter" {
    import type { Template } from "livecodes/models";
    export const clojurescriptStarter: Template;
}
declare module "livecodes/templates/starter/coffeescript-starter" {
    import type { Template } from "livecodes/models";
    export const coffeescriptStarter: Template;
}
declare module "livecodes/templates/starter/commonlisp-starter" {
    import type { Template } from "livecodes/models";
    export const commonlispStarter: Template;
}
declare module "livecodes/templates/starter/cpp-starter" {
    import type { Template } from "livecodes/models";
    export const cppStarter: Template;
}
declare module "livecodes/templates/starter/cpp-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const cppWasmStarter: Template;
}
declare module "livecodes/templates/starter/csharp-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const csharpWasmStarter: Template;
}
declare module "livecodes/templates/starter/d3-starter" {
    import type { Template } from "livecodes/models";
    export const d3Starter: Template;
}
declare module "livecodes/templates/starter/daisyui-starter" {
    import type { Template } from "livecodes/models";
    export const daisyuiStarter: Template;
}
declare module "livecodes/templates/starter/diagrams-starter" {
    import type { Template } from "livecodes/models";
    export const diagramsStarter: Template;
}
declare module "livecodes/templates/starter/fennel-starter" {
    import type { Template } from "livecodes/models";
    export const fennelStarter: Template;
}
declare module "livecodes/templates/starter/gleam-starter" {
    import type { Template } from "livecodes/models";
    export const gleamStarter: Template;
}
declare module "livecodes/templates/starter/go-starter" {
    import type { Template } from "livecodes/models";
    export const goStarter: Template;
}
declare module "livecodes/templates/starter/go-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const goWasmStarter: Template;
}
declare module "livecodes/templates/starter/imba-starter" {
    import type { Template } from "livecodes/models";
    export const imbaStarter: Template;
}
declare module "livecodes/templates/starter/java-starter" {
    import type { Template } from "livecodes/models";
    export const javaStarter: Template;
}
declare module "livecodes/templates/starter/javascript-starter" {
    import type { Template } from "livecodes/models";
    export const javascriptStarter: Template;
}
declare module "livecodes/templates/starter/jest-react-starter" {
    import type { Template } from "livecodes/models";
    export const jestReactStarter: Template;
}
declare module "livecodes/templates/starter/jest-starter" {
    import type { Template } from "livecodes/models";
    export const jestStarter: Template;
}
declare module "livecodes/templates/starter/jquery-starter" {
    import type { Template } from "livecodes/models";
    export const jqueryStarter: Template;
}
declare module "livecodes/templates/starter/julia-starter" {
    import type { Template } from "livecodes/models";
    export const juliaStarter: Template;
}
declare module "livecodes/templates/starter/knockout-starter" {
    import type { Template } from "livecodes/models";
    export const knockoutStarter: Template;
}
declare module "livecodes/templates/starter/lit-starter" {
    import type { Template } from "livecodes/models";
    export const litStarter: Template;
}
declare module "livecodes/templates/starter/livescript-starter" {
    import type { Template } from "livecodes/models";
    export const livescriptStarter: Template;
}
declare module "livecodes/templates/starter/lua-starter" {
    import type { Template } from "livecodes/models";
    export const luaStarter: Template;
}
declare module "livecodes/templates/starter/lua-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const luaWasmStarter: Template;
}
declare module "livecodes/templates/starter/malina-starter" {
    import type { Template } from "livecodes/models";
    export const malinaStarter: Template;
}
declare module "livecodes/templates/starter/markdown-starter" {
    import type { Template } from "livecodes/models";
    export const markdownStarter: Template;
}
declare module "livecodes/templates/starter/mdx-starter" {
    import type { Template } from "livecodes/models";
    export const mdxStarter: Template;
}
declare module "livecodes/templates/starter/minizinc-starter" {
    import type { Template } from "livecodes/models";
    export const minizincStarter: Template;
}
declare module "livecodes/templates/starter/ocaml-starter" {
    import type { Template } from "livecodes/models";
    export const ocamlStarter: Template;
}
declare module "livecodes/templates/starter/perl-starter" {
    import type { Template } from "livecodes/models";
    export const perlStarter: Template;
}
declare module "livecodes/templates/starter/phaser-starter" {
    import type { Template } from "livecodes/models";
    export const phaserStarter: Template;
}
declare module "livecodes/templates/starter/php-starter" {
    import type { Template } from "livecodes/models";
    export const phpStarter: Template;
}
declare module "livecodes/templates/starter/php-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const phpWasmStarter: Template;
}
declare module "livecodes/templates/starter/postgresql-starter" {
    import type { Template } from "livecodes/models";
    export const postgresqlStarter: Template;
}
declare module "livecodes/templates/starter/preact-starter" {
    import type { Template } from "livecodes/models";
    export const preactStarter: Template;
}
declare module "livecodes/templates/starter/prolog-starter" {
    import type { Template } from "livecodes/models";
    export const prologStarter: Template;
}
declare module "livecodes/templates/starter/python-starter" {
    import type { Template } from "livecodes/models";
    export const pythonStarter: Template;
}
declare module "livecodes/templates/starter/python-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const pythonWasmStarter: Template;
}
declare module "livecodes/templates/starter/r-starter" {
    import type { Template } from "livecodes/models";
    export const rStarter: Template;
}
declare module "livecodes/templates/starter/react-native-starter" {
    import type { Template } from "livecodes/models";
    export const reactNativeStarter: Template;
}
declare module "livecodes/templates/starter/react-starter" {
    import type { Template } from "livecodes/models";
    export const reactStarter: Template;
}
declare module "livecodes/templates/starter/reason-starter" {
    import type { Template } from "livecodes/models";
    export const reasonStarter: Template;
}
declare module "livecodes/templates/starter/rescript-starter" {
    import type { Template } from "livecodes/models";
    export const rescriptStarter: Template;
}
declare module "livecodes/templates/starter/riot-starter" {
    import type { Template } from "livecodes/models";
    export const riotStarter: Template;
}
declare module "livecodes/templates/starter/ruby-starter" {
    import type { Template } from "livecodes/models";
    export const rubyStarter: Template;
}
declare module "livecodes/templates/starter/ruby-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const rubyWasmStarter: Template;
}
declare module "livecodes/templates/starter/scheme-starter" {
    import type { Template } from "livecodes/models";
    export const schemeStarter: Template;
}
declare module "livecodes/templates/starter/shadcn-ui-starter" {
    import type { Template } from "livecodes/models";
    export const shadcnuiStarter: Template;
}
declare module "livecodes/templates/starter/solid-starter" {
    import type { Template } from "livecodes/models";
    export const solidStarter: Template;
}
declare module "livecodes/templates/starter/sql-starter" {
    import type { Template } from "livecodes/models";
    export const sqlStarter: Template;
}
declare module "livecodes/templates/starter/stencil-starter" {
    import type { Template } from "livecodes/models";
    export const stencilStarter: Template;
}
declare module "livecodes/templates/starter/svelte-starter" {
    import type { Template } from "livecodes/models";
    export const svelteStarter: Template;
}
declare module "livecodes/templates/starter/tailwindcss-starter" {
    import type { Template } from "livecodes/models";
    export const tailwindcssStarter: Template;
}
declare module "livecodes/templates/starter/tcl-starter" {
    import type { Template } from "livecodes/models";
    export const tclStarter: Template;
}
declare module "livecodes/templates/starter/teal-starter" {
    import type { Template } from "livecodes/models";
    export const tealStarter: Template;
}
declare module "livecodes/templates/starter/typescript-starter" {
    import type { Template } from "livecodes/models";
    export const typescriptStarter: Template;
}
declare module "livecodes/templates/starter/vue-sfc-starter" {
    import type { Template } from "livecodes/models";
    export const vueSfcStarter: Template;
}
declare module "livecodes/templates/starter/vue2-starter" {
    import type { Template } from "livecodes/models";
    export const vue2Starter: Template;
}
declare module "livecodes/templates/starter/wat-starter" {
    import type { Template } from "livecodes/models";
    export const watStarter: Template;
}
declare module "livecodes/templates/starter/index" {
    export const starterTemplates: import("sdk/models").Template[];
}
declare module "livecodes/utils/__tests__/object-filter.spec" { }
declare module "livecodes/utils/__tests__/object-map.spec" { }
declare module "livecodes/utils/__tests__/utils.spec" { }
declare module "sdk/vue" {
    import type { AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, DefineComponent, ExtractPropTypes, RendererElement, RendererNode, VNode, VNodeProps } from '@vue/runtime-core';
    import type { EmbedOptions, Playground } from "sdk/models";
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
declare module "sdk/__tests__/getPlaygroundUrl.test" { }
