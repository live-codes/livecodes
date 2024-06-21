declare module "sdk/models" {
    export interface API {
        run: () => Promise<void>;
        format: (allEditors?: boolean) => Promise<void>;
        getShareUrl: (shortUrl?: boolean) => Promise<string>;
        getConfig: (contentOnly?: boolean) => Promise<Config>;
        setConfig: (config: Partial<Config>) => Promise<Config>;
        getCode: () => Promise<Code>;
        show: (panel: EditorId | Tool['name'] | 'result', options?: {
            full?: boolean;
            line?: number;
            column?: number;
            zoom?: Config['zoom'];
        }) => Promise<void>;
        runTests: () => Promise<{
            results: TestResult[];
        }>;
        onChange: (fn: ChangeHandler) => {
            remove: () => void;
        };
        watch: WatchFn;
        exec: (command: APICommands, ...args: any[]) => Promise<{
            output: any;
        } | {
            error: string;
        }>;
        destroy: () => Promise<void>;
    }
    export type ChangeHandler = SDKCodeHandler;
    export type SDKReadyHandler = (data: {
        config: Config;
    }) => void;
    export type SDKCodeHandler = (data: {
        code: Code;
        config: Config;
    }) => void;
    export type SDKConsoleHandler = (data: {
        method: string;
        args: any[];
    }) => void;
    export type SDKTestsHandler = (data: {
        results: TestResult[];
        error?: string;
    }) => void;
    export type SDKGenericHandler = () => void;
    export type WatchFns = ((event: 'load', fn: SDKGenericHandler) => {
        remove: SDKGenericHandler;
    }) | ((event: 'ready', fn: SDKReadyHandler) => {
        remove: SDKGenericHandler;
    }) | ((event: 'code', fn: SDKCodeHandler) => {
        remove: SDKGenericHandler;
    }) | ((event: 'console', fn: SDKConsoleHandler) => {
        remove: SDKGenericHandler;
    }) | ((event: 'tests', fn: SDKTestsHandler) => {
        remove: SDKGenericHandler;
    }) | ((event: 'destroy', fn: SDKGenericHandler) => {
        remove: SDKGenericHandler;
    });
    export type SDKEvent = Parameters<WatchFns>[0];
    export type SDKEventHandler = Parameters<WatchFns>[1];
    export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
    export type WatchFn = UnionToIntersection<WatchFns>;
    export type APICommands = 'setBroadcastToken' | 'showVersion';
    export interface Playground extends API {
        load: () => Promise<void>;
    }
    export interface EmbedOptions {
        appUrl?: string;
        params?: UrlQueryParams;
        config?: Partial<Config> | string;
        import?: string;
        lite?: boolean;
        loading?: 'lazy' | 'click' | 'eager';
        template?: TemplateName;
        view?: 'split' | 'editor' | 'result' | 'headless';
    }
    export interface Config extends ContentConfig, AppConfig, UserConfig {
    }
    export interface ContentConfig {
        title: string;
        description: string;
        head: string;
        htmlAttrs: Record<string, string> | string;
        tags: string[];
        activeEditor: EditorId | undefined;
        languages: Array<Language | Processor> | undefined;
        markup: Editor;
        style: Editor;
        script: Editor;
        stylesheets: string[];
        scripts: string[];
        cssPreset: CssPresetId;
        processors: Processor[];
        customSettings: CustomSettings;
        imports: {
            [key: string]: string;
        };
        types: Types;
        tests: Partial<Editor> | undefined;
        readonly version: string;
    }
    export interface AppConfig {
        readonly: boolean;
        allowLangChange: boolean;
        mode: 'full' | 'focus' | 'simple' | 'editor' | 'codeblock' | 'result';
        tools: Partial<{
            enabled: Array<Tool['name']> | 'all';
            active: Tool['name'] | '';
            status: ToolsPaneStatus;
        }>;
        zoom: 1 | 0.5 | 0.25;
    }
    export interface UserConfig extends EditorConfig, FormatterConfig {
        autoupdate: boolean;
        autosave: boolean;
        autotest: boolean;
        delay: number;
        formatOnsave: boolean;
        layout: 'responsive' | 'horizontal' | 'vertical' | undefined;
        recoverUnsaved: boolean;
        showSpacing: boolean;
        welcome: boolean;
    }
    export interface EditorConfig {
        editor: 'monaco' | 'codemirror' | 'codejar' | undefined;
        theme: Theme;
        editorTheme: EditorTheme[] | string | undefined;
        fontFamily: string | undefined;
        fontSize: number | undefined;
        useTabs: boolean;
        tabSize: number;
        lineNumbers: boolean;
        wordWrap: boolean;
        closeBrackets: boolean;
        emmet: boolean;
        editorMode: 'vim' | 'emacs' | undefined;
        enableAI: boolean;
    }
    export interface FormatterConfig {
        useTabs: boolean;
        tabSize: number;
        semicolons: boolean;
        singleQuote: boolean;
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
    }
    export type Language = 'html' | 'htm' | 'markdown' | 'md' | 'mdown' | 'mkdn' | 'mdx' | 'astro' | 'pug' | 'jade' | 'haml' | 'asciidoc' | 'adoc' | 'asc' | 'mustache' | 'handlebars' | 'hbs' | 'ejs' | 'eta' | 'nunjucks' | 'njk' | 'liquid' | 'liquidjs' | 'dot' | 'twig' | 'art-template' | 'art' | 'bbcode' | 'bb' | 'mjml' | 'diagrams' | 'diagram' | 'graph' | 'plt' | 'richtext' | 'rte' | 'rich' | 'rte.html' | 'css' | 'scss' | 'sass' | 'less' | 'stylus' | 'styl' | 'stylis' | 'postcss' | 'javascript' | 'js' | 'json' | 'babel' | 'es' | 'sucrase' | 'typescript' | 'flow' | 'ts' | 'jsx' | 'tsx' | 'react-native' | 'react-native.jsx' | 'react-native-tsx' | 'react-native.tsx' | 'vue' | 'vue3' | 'vue2' | 'svelte' | 'stencil' | 'stencil.tsx' | 'solid' | 'solid.jsx' | 'solid.tsx' | 'riot' | 'riotjs' | 'malina' | 'malinajs' | 'xht' | 'coffeescript' | 'coffee' | 'livescript' | 'ls' | 'civet' | 'clio' | 'imba' | 'assemblyscript' | 'as' | 'python' | 'py' | 'pyodide' | 'python-wasm' | 'py-wasm' | 'pythonwasm' | 'pywasm' | 'py3' | 'wasm.py' | 'r' | 'rlang' | 'rstats' | 'r-wasm' | 'ruby' | 'rb' | 'ruby-wasm' | 'wasm.rb' | 'rubywasm' | 'go' | 'golang' | 'php' | 'php-wasm' | 'phpwasm' | 'wasm.php' | 'cpp' | 'c' | 'C' | 'cp' | 'cxx' | 'c++' | 'cppm' | 'ixx' | 'ii' | 'hpp' | 'h' | 'cpp-wasm' | 'cppwasm' | 'cwasm' | 'wasm.cpp' | 'clang' | 'clang.cpp' | 'perl' | 'pl' | 'pm' | 'lua' | 'lua-wasm' | 'luawasm' | 'wasm.lua' | 'teal' | 'tl' | 'fennel' | 'fnl' | 'julia' | 'jl' | 'scheme' | 'scm' | 'commonlisp' | 'common-lisp' | 'lisp' | 'clojurescript' | 'clojure' | 'cljs' | 'clj' | 'cljc' | 'edn' | 'gleam' | 'rescript' | 'res' | 'resi' | 'reason' | 're' | 'rei' | 'ocaml' | 'ml' | 'mli' | 'tcl' | 'wat' | 'wast' | 'webassembly' | 'wasm' | 'Binary' | 'csharp' | 'sql' | 'sqlite' | 'sqlite3' | 'pg.sql' | 'pgsql.sql' | 'pgsql' | 'pg' | 'pglite' | 'pglite.sql' | 'postgresql' | 'postgres' | 'postgre.sql' | 'postgresql.sql' | 'prolog.pl' | 'prolog' | 'blockly' | 'blockly.xml' | 'xml' | 'pintora';
    export interface Editor {
        language: Language;
        content?: string;
        contentUrl?: string;
        hiddenContent?: string;
        hiddenContentUrl?: string;
        selector?: string;
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
    export type ParserName = 'babel' | 'babel-ts' | 'babel-flow' | 'glimmer' | 'html' | 'markdown' | 'css' | 'scss' | 'less' | 'php' | 'pug';
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
        scriptType?: 'module' | 'text/liquid' | 'text/python' | 'text/r' | 'text/ruby-wasm' | 'text/x-uniter-php' | 'text/php-wasm' | 'text/cpp' | 'text/perl' | 'text/julia' | 'text/biwascheme' | 'text/commonlisp' | 'text/tcl' | 'text/prolog' | 'application/json' | 'application/lua' | 'text/fennel' | 'application/wasm-uint8';
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
        aliases?: TemplateName[];
        thumbnail: string;
        tools?: Config['tools'];
        autotest?: Config['autotest'];
    };
    export type TemplateName = 'blank' | 'javascript' | 'typescript' | 'react' | 'react-native' | 'vue2' | 'vue' | 'angular' | 'preact' | 'svelte' | 'solid' | 'lit' | 'stencil' | 'mdx' | 'astro' | 'riot' | 'malina' | 'jquery' | 'backbone' | 'knockout' | 'jest' | 'jest-react' | 'bootstrap' | 'tailwindcss' | 'coffeescript' | 'livescript' | 'civet' | 'clio' | 'imba' | 'rescript' | 'reason' | 'ocaml' | 'python' | 'pyodide' | 'python-wasm' | 'r' | 'ruby' | 'ruby-wasm' | 'go' | 'php' | 'php-wasm' | 'cpp' | 'clang' | 'cpp-wasm' | 'perl' | 'lua' | 'lua-wasm' | 'teal' | 'fennel' | 'julia' | 'scheme' | 'commonlisp' | 'clojurescript' | 'gleam' | 'tcl' | 'markdown' | 'assemblyscript' | 'wat' | 'sql' | 'postgresql' | 'prolog' | 'blockly' | 'diagrams';
    export interface Tool {
        name: 'console' | 'compiled' | 'tests';
        title: 'Console' | 'Compiled' | 'Tests';
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
        title: 'Console';
        log: (...args: any[]) => void;
        info: (...args: any[]) => void;
        table: (...args: any[]) => void;
        warn: (...args: any[]) => void;
        error: (...args: any[]) => void;
        clear: (silent?: boolean) => void;
        evaluate: (code: string) => void;
        reloadEditor: (config: Config) => Promise<void>;
    }
    export interface CompiledCodeViewer extends Tool {
        title: 'Compiled';
        update: (language: Language, content: string, label?: string | undefined) => void;
        reloadEditor: (config: Config) => Promise<void>;
    }
    export interface TestViewer extends Tool {
        title: 'Tests';
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
        editorId: EditorId | 'compiled' | 'console' | 'customSettings' | 'editorSettings' | 'tests' | 'embed' | 'snippet' | 'add-snippet';
        theme: Theme;
        isEmbed: boolean;
        isHeadless: boolean;
        getLanguageExtension: (alias: string) => Language | undefined;
        mapLanguage: (language: Language) => Language;
        getFormatterConfig: () => Partial<FormatterConfig>;
        getFontFamily: (font: string | undefined) => string;
    }
    export type MonacoTheme = 'active4d' | 'all-hallows-eve' | 'amy' | 'birds-of-paradise' | 'blackboard' | 'brilliance-black' | 'brilliance-dull' | 'chrome-devtools' | 'clouds-midnight' | 'clouds' | 'cobalt' | 'cobalt2' | 'custom-vs-light' | 'custom-vs-dark' | 'dawn' | 'dracula' | 'dreamweaver' | 'eiffel' | 'espresso-libre' | 'github' | 'github-dark' | 'github-light' | 'hc-black' | 'hc-light' | 'idle' | 'idlefingers' | 'iplastic' | 'katzenmilch' | 'krtheme' | 'kuroir' | 'lazy' | 'magicwb-amiga' | 'merbivore-soft' | 'merbivore' | 'monochrome' | 'monochrome-dark' | 'monokai' | 'monokai-bright' | 'monoindustrial' | 'night-owl' | 'nord' | 'oceanic-next' | 'pastels-on-dark' | 'slush-and-poppies' | 'solarized-dark' | 'solarized-light' | 'spacecadet' | 'sunburst' | 'textmate-mac-classic' | 'tomorrow' | 'tomorrow-night' | 'tomorrow-night-blue' | 'tomorrow-night-bright' | 'tomorrow-night-eighties' | 'twilight' | 'upstream-sunburst' | 'vibrant-ink' | 'vs' | 'vs-dark' | 'xcode-default' | 'zenburnesque';
    export type CodemirrorTheme = 'amy' | 'aura' | 'ayu-light' | 'barf' | 'basic-light' | 'basic-dark' | 'bespin' | 'birds-of-paradise' | 'boys-and-girls' | 'clouds' | 'cm-light' | 'cobalt' | 'cool-glow' | 'dracula' | 'espresso' | 'github-dark' | 'github-light' | 'gruvbox-dark' | 'gruvbox-light' | 'material-dark' | 'material-light' | 'monochrome' | 'monochrome-dark' | 'noctis-lilac' | 'nord' | 'one-dark' | 'rose-pine-dawn' | 'smoothy' | 'solarized-light' | 'solarized-dark' | 'tokyo-night' | 'tokyo-night-day' | 'tokyo-night-storm' | 'tomorrow';
    export type CodejarTheme = 'a11y-dark' | 'atom-dark' | 'base16-ateliersulphurpool-light' | 'cb' | 'coldark-cold' | 'coldark-dark' | 'coy' | 'coy-without-shadows' | 'darcula' | 'dark' | 'dracula' | 'duotone-dark' | 'duotone-earth' | 'duotone-forest' | 'duotone-light' | 'duotone-sea' | 'duotone-space' | 'funky' | 'ghcolors' | 'gruvbox-dark' | 'gruvbox-light' | 'holi-theme' | 'hopscotch' | 'laserwave' | 'lucario' | 'material-dark' | 'material-light' | 'material-oceanic' | 'monochrome' | 'monochrome-dark' | 'night-owl' | 'nord' | 'okaidia' | 'one-dark' | 'one-light' | 'pojoaque' | 'shades-of-purple' | 'solarized-dark-atom' | 'solarized-light' | 'synthwave84' | 'tomorrow' | 'twilight' | 'vs' | 'vsc-dark-plus' | 'xonokai' | 'z-touchs';
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
        screen: 'login' | 'info' | 'new' | 'open' | 'assets' | 'add-asset' | 'snippets' | 'add-snippet' | 'import' | 'resources' | 'share' | 'embed' | 'deploy' | 'sync' | 'backup' | 'broadcast' | 'welcome' | 'about' | 'custom-settings' | 'editor-settings' | 'test-editor';
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
        config: string;
        embed: boolean;
        preview: boolean;
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
        getConfig: 'livecodes-get-config';
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
    export * from "sdk/models";
}
declare module "livecodes/events/events" {
    export const createEventsManager: () => {
        addEventListener: <T extends Event>(element: HTMLElement | Document | Window | FileReader | null, eventType: string, fn: (event: T) => any, options?: any) => void;
        removeEventListener: <T_1 extends Event>(element: HTMLElement | Document | Window | FileReader | null, eventType: string, fn: (event: T_1) => void) => void;
        removeEventListeners: () => void;
    };
}
declare module "livecodes/events/custom-events" {
    import type { CustomEvents } from "livecodes/models";
    export const customEvents: CustomEvents;
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
    export * from "livecodes/events/events";
    export * from "livecodes/events/custom-events";
    export * from "livecodes/events/pub";
}
declare module "livecodes/services/modules" {
    import type { CDN } from "livecodes/models";
    export const modulesService: {
        getModuleUrl: (moduleName: string, { isModule, defaultCDN }?: {
            isModule?: boolean;
            defaultCDN?: CDN;
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
declare module "livecodes/vendors" {
    export const typescriptVersion = "5.5.2";
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
    export const biwaschemeUrl: string;
    export const blocklyCdnBaseUrl: string;
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
    export const coffeeScriptUrl: string;
    export const cppWasmBaseUrl: string;
    export const csstreeUrl: string;
    export const cytoscapeSvgUrl: string;
    export const cytoscapeUrl: string;
    export const ddietrCmThemesBaseUrl: string;
    export const dotUrl: string;
    export const ejsUrl: string;
    export const elkjsBaseUrl: string;
    export const emmetMonacoUrl: string;
    export const esModuleShimsPath = "es-module-shims@1.4.4/dist/es-module-shims.js";
    export const etaUrl: string;
    export const fflateUrl: string;
    export const flexSearchUrl: string;
    export const fontAnonymousProUrl: string;
    export const fontAstigmataUrl: string;
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
    export const fontIosevkaUrl: string;
    export const fontJetbrainsMonoUrl: string;
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
    export const hintCssUrl: string;
    export const hpccJsCdnUrl: string;
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
    export const malinaVersion = "0.6.64";
    export const malinaUrl: string;
    export const markedUrl: string;
    export const mermaidCdnUrl: string;
    export const mjmlUrl: string;
    export const monacoBaseUrl = "https://typescript.azureedge.net/cdn/5.5.2/monaco/min/vs";
    export const monacoEmacsUrl: string;
    export const monacoThemesBaseUrl: string;
    export const monacoVimUrl: string;
    export const mustacheUrl: string;
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
    export const prettierPhpUrl: string;
    export const prismBaseUrl: string;
    export const prismOfficialThemesBaseUrl: string;
    export const prismThemesBaseUrl: string;
    export const prismThemesLaserWaveUrl: string;
    export const pyodideBaseUrl: string;
    export const qrcodeUrl: string;
    export const quillEditorCdnBaseUrl: string;
    export const quillHtmlEditUrl: string;
    export const quillBlotFormaterUrl: string;
    export const quillBetterTableBaseUrl: string;
    export const requireUrl: string;
    export const reasonCompilerUrl: string;
    export const reasonReactUrl: string;
    export const reasonStdLibBaseUrl: string;
    export const rescriptCompilerUrl: string;
    export const rescriptReactUrl: string;
    export const rescriptStdLibBaseUrl: string;
    export const resetCssUrl: string;
    export const riotBaseUrl: string;
    export const rubyWasmBaseUrl: string;
    export const rubyWasmScriptUrl: string;
    export const snackbarUrl: string;
    export const spacingJsUrl: string;
    export const sqlFormatterUrl: string;
    export const sqljsBaseUrl: string;
    export const stencilUrl: string;
    export const stylisUrl: string;
    export const svelteRuntimeBaseUrl: string;
    export const svgbobWasmCdnUrl: string;
    export const tagifyBaseUrl: string;
    export const tailwindcssUrl: string;
    export const tauPrologBaseUrl: string;
    export const tealUrl: string;
    export const thememirrorBaseUrl: string;
    export const twigUrl: string;
    export const typescriptUrl: string;
    export const typescriptAtaUrl: string;
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
    export const isRelativeUrl: (url?: string) => boolean;
    export const getAbsoluteUrl: (url: string, baseUrl?: string) => string;
    export const cloneObject: <T>(x: Record<string, any>) => T;
    export const objectMap: (obj: Record<string, any>, fn: (value: any, key: string, index: number) => any) => {
        [k: string]: any;
    };
    export const objectFilter: (obj: Record<string, any>, predicate: (value: any, key: string, index: number) => any) => {
        [k: string]: any;
    };
    export const copyToClipboard: (text: string) => boolean;
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
    export const toCamelCase: (str: string) => string;
    export const removeDuplicates: (arr: any[] | undefined) => any[];
    export const replaceAsync: (str: string, regexp: RegExp, asyncFn: (...args: any) => Promise<string>) => Promise<string>;
    export const addAttrs: (el: HTMLElement, attributes: Record<string, string> | string) => void;
    export const bypassAMD: <T = any>(fn: () => Promise<T>) => Promise<T>;
}
declare module "livecodes/languages/lightningcss/processor-lightningcss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const lightningcss: ProcessorSpecs;
}
declare module "livecodes/languages/lightningcss/index" {
    export * from "livecodes/languages/lightningcss/processor-lightningcss";
}
declare module "livecodes/languages/postcss/processor-postcss" {
    import type { ProcessorSpecs } from "livecodes/models";
    export const postcss: ProcessorSpecs;
}
declare module "livecodes/utils/get-import-instance" {
    export function getImportInstance(url: string): any;
}
declare module "livecodes/utils/index" {
    export * from "livecodes/utils/utils";
    export * from "livecodes/utils/get-import-instance";
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
declare module "livecodes/languages/postcss/index" {
    export * from "livecodes/languages/postcss/processor-postcss";
    export * from "livecodes/languages/postcss/postcss-plugins";
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
declare module "livecodes/languages/utils" {
    import type { Compiler, Language, CustomSettings, Config, Processor } from "livecodes/models";
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
        pug: string;
    };
}
declare module "livecodes/languages/babel/lang-babel" {
    import type { LanguageSpecs } from "livecodes/models";
    export const babel: LanguageSpecs;
}
declare module "livecodes/languages/babel/index" {
    export * from "livecodes/languages/babel/lang-babel";
}
declare module "livecodes/languages/css/lang-css" {
    import type { LanguageSpecs } from "livecodes/models";
    export const css: LanguageSpecs;
}
declare module "livecodes/languages/css/index" {
    export * from "livecodes/languages/css/lang-css";
}
declare module "livecodes/languages/haml/lang-haml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const haml: LanguageSpecs;
}
declare module "livecodes/languages/haml/index" {
    export * from "livecodes/languages/haml/lang-haml";
}
declare module "livecodes/languages/html/lang-html" {
    import type { LanguageSpecs } from "livecodes/models";
    export const html: LanguageSpecs;
}
declare module "livecodes/languages/html/index" {
    export * from "livecodes/languages/html/lang-html";
}
declare module "livecodes/languages/javascript/lang-javascript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const javascript: LanguageSpecs;
}
declare module "livecodes/languages/javascript/index" {
    export * from "livecodes/languages/javascript/lang-javascript";
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
declare module "livecodes/languages/less/lang-less" {
    import type { LanguageSpecs } from "livecodes/models";
    export const less: LanguageSpecs;
}
declare module "livecodes/languages/less/index" {
    export * from "livecodes/languages/less/lang-less";
}
declare module "livecodes/languages/markdown/lang-markdown" {
    import type { LanguageSpecs } from "livecodes/models";
    export const markdown: LanguageSpecs;
}
declare module "livecodes/languages/markdown/index" {
    export * from "livecodes/languages/markdown/lang-markdown";
}
declare module "livecodes/compiler/utils" {
    import type { CompileResult, CompilerFunction } from "livecodes/models";
    export const getCompileResult: (result: Awaited<ReturnType<CompilerFunction>>) => CompileResult;
}
declare module "livecodes/compiler/compile-in-compiler" {
    import type { Config, Language, CompileOptions, CompileResult } from "livecodes/models";
    export const compileInCompiler: (content: string, language: Language | undefined, config: Config, options?: CompileOptions, worker?: Worker) => Promise<CompileResult>;
}
declare module "livecodes/languages/mdx/lang-mdx" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const mdx: LanguageSpecs;
}
declare module "livecodes/languages/mdx/index" {
    export * from "livecodes/languages/mdx/lang-mdx";
}
declare module "livecodes/languages/pug/lang-pug" {
    import type { LanguageSpecs } from "livecodes/models";
    export const pug: LanguageSpecs;
}
declare module "livecodes/languages/pug/index" {
    export * from "livecodes/languages/pug/lang-pug";
}
declare module "livecodes/languages/scss/lang-scss" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scss: LanguageSpecs;
}
declare module "livecodes/languages/scss/lang-sass" {
    import type { LanguageSpecs } from "livecodes/models";
    export const sass: LanguageSpecs;
}
declare module "livecodes/languages/scss/index" {
    export * from "livecodes/languages/scss/lang-scss";
    export * from "livecodes/languages/scss/lang-sass";
}
declare module "livecodes/languages/svelte/lang-svelte" {
    import type { LanguageSpecs } from "livecodes/models";
    export const svelte: LanguageSpecs;
}
declare module "livecodes/languages/svelte/index" {
    export * from "livecodes/languages/svelte/lang-svelte";
}
declare module "livecodes/languages/stylus/lang-stylus" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stylus: LanguageSpecs;
}
declare module "livecodes/languages/stylus/index" {
    export * from "livecodes/languages/stylus/lang-stylus";
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
declare module "livecodes/languages/vue/lang-vue" {
    import type { LanguageSpecs } from "livecodes/models";
    export const vue: LanguageSpecs;
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
declare module "livecodes/languages/stencil/lang-stencil" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stencil: LanguageSpecs;
}
declare module "livecodes/languages/stencil/index" {
    export * from "livecodes/languages/stencil/lang-stencil";
}
declare module "livecodes/languages/coffeescript/lang-coffeescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const coffeescript: LanguageSpecs;
}
declare module "livecodes/languages/coffeescript/index" {
    export * from "livecodes/languages/coffeescript/lang-coffeescript";
}
declare module "livecodes/languages/livescript/lang-livescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const livescript: LanguageSpecs;
}
declare module "livecodes/languages/livescript/index" {
    export * from "livecodes/languages/livescript/lang-livescript";
}
declare module "livecodes/languages/assemblyscript/lang-assemblyscript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const assemblyscript: LanguageSpecs;
}
declare module "livecodes/languages/assemblyscript/index" {
    export * from "livecodes/languages/assemblyscript/lang-assemblyscript";
}
declare module "livecodes/languages/python/lang-python" {
    import type { LanguageSpecs } from "livecodes/models";
    export const python: LanguageSpecs;
}
declare module "livecodes/languages/python/index" {
    export * from "livecodes/languages/python/lang-python";
}
declare module "livecodes/languages/ruby/lang-ruby" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ruby: LanguageSpecs;
}
declare module "livecodes/languages/ruby/index" {
    export * from "livecodes/languages/ruby/lang-ruby";
}
declare module "livecodes/languages/php/lang-php" {
    import type { LanguageSpecs } from "livecodes/models";
    export const php: LanguageSpecs;
}
declare module "livecodes/languages/php/index" {
    export * from "livecodes/languages/php/lang-php";
}
declare module "livecodes/languages/perl/lang-perl" {
    import type { LanguageSpecs } from "livecodes/models";
    export const perl: LanguageSpecs;
}
declare module "livecodes/languages/perl/index" {
    export * from "livecodes/languages/perl/lang-perl";
}
declare module "livecodes/languages/lua/lang-lua" {
    import type { LanguageFormatter, LanguageSpecs } from "livecodes/models";
    export const luaFormatter: LanguageFormatter;
    export const lua: LanguageSpecs;
}
declare module "livecodes/languages/lua/index" {
    export * from "livecodes/languages/lua/lang-lua";
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
declare module "livecodes/languages/scheme/lang-scheme" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scheme: LanguageSpecs;
}
declare module "livecodes/languages/scheme/index" {
    export * from "livecodes/languages/scheme/lang-scheme";
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
declare module "livecodes/languages/python-wasm/lang-python-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const pythonWasm: LanguageSpecs;
}
declare module "livecodes/languages/python-wasm/index" {
    export * from "livecodes/languages/python-wasm/lang-python-wasm";
}
declare module "livecodes/languages/liquid/lang-liquid" {
    import type { LanguageSpecs } from "livecodes/models";
    export const liquid: LanguageSpecs;
}
declare module "livecodes/languages/liquid/index" {
    export * from "livecodes/languages/liquid/lang-liquid";
}
declare module "livecodes/languages/ejs/lang-ejs" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ejs: LanguageSpecs;
}
declare module "livecodes/languages/ejs/index" {
    export * from "livecodes/languages/ejs/lang-ejs";
}
declare module "livecodes/languages/handlebars/lang-handlebars" {
    import type { LanguageSpecs } from "livecodes/models";
    export const runtimeUrl: string;
    export const handlebars: LanguageSpecs;
}
declare module "livecodes/languages/handlebars/index" {
    export * from "livecodes/languages/handlebars/lang-handlebars";
}
declare module "livecodes/languages/dot/lang-dot" {
    import type { LanguageSpecs } from "livecodes/models";
    export const dot: LanguageSpecs;
}
declare module "livecodes/languages/dot/index" {
    export * from "livecodes/languages/dot/lang-dot";
}
declare module "livecodes/languages/nunjucks/lang-nunjucks" {
    import type { LanguageSpecs } from "livecodes/models";
    export const runtimeUrl: string;
    export const nunjucks: LanguageSpecs;
}
declare module "livecodes/languages/nunjucks/index" {
    export * from "livecodes/languages/nunjucks/lang-nunjucks";
}
declare module "livecodes/languages/go/lang-go" {
    import type { LanguageSpecs } from "livecodes/models";
    export const go: LanguageSpecs;
}
declare module "livecodes/languages/go/index" {
    export * from "livecodes/languages/go/lang-go";
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
declare module "livecodes/languages/ocaml/lang-ocaml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const ocaml: LanguageSpecs;
}
declare module "livecodes/languages/ocaml/index" {
    export * from "livecodes/languages/ocaml/lang-ocaml";
}
declare module "livecodes/languages/wat/lang-wat" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scriptType = "application/wasm-uint8";
    export const wat: LanguageSpecs;
}
declare module "livecodes/languages/wat/index" {
    export * from "livecodes/languages/wat/lang-wat";
}
declare module "livecodes/languages/riot/lang-riot" {
    import type { LanguageSpecs } from "livecodes/models";
    export const riot: LanguageSpecs;
}
declare module "livecodes/languages/riot/index" {
    export * from "livecodes/languages/riot/lang-riot";
}
declare module "livecodes/languages/sql/lang-sql" {
    import type { LanguageSpecs } from "livecodes/models";
    export const scriptType = "application/json";
    export const sql: LanguageSpecs;
}
declare module "livecodes/languages/sql/index" {
    export * from "livecodes/languages/sql/lang-sql";
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
declare module "livecodes/languages/blockly/lang-blockly" {
    import type { LanguageSpecs } from "livecodes/models";
    export const blockly: LanguageSpecs;
}
declare module "livecodes/languages/blockly/index" {
    export * from "livecodes/languages/blockly/lang-blockly";
}
declare module "livecodes/languages/twig/lang-twig" {
    import type { LanguageSpecs } from "livecodes/models";
    export const twig: LanguageSpecs;
}
declare module "livecodes/languages/twig/index" {
    export * from "livecodes/languages/twig/lang-twig";
}
declare module "livecodes/languages/astro/lang-astro" {
    import type { LanguageSpecs } from "livecodes/models";
    export const astro: LanguageSpecs;
}
declare module "livecodes/languages/astro/index" {
    export * from "livecodes/languages/astro/lang-astro";
}
declare module "livecodes/languages/malina/lang-malina" {
    import type { LanguageSpecs } from "livecodes/models";
    export const malina: LanguageSpecs;
}
declare module "livecodes/languages/malina/index" {
    export * from "livecodes/languages/malina/lang-malina";
}
declare module "livecodes/languages/cpp/lang-cpp" {
    import type { LanguageSpecs } from "livecodes/models";
    export const cdnUrl: string;
    export const cpp: LanguageSpecs;
}
declare module "livecodes/languages/cpp/index" {
    export * from "livecodes/languages/cpp/lang-cpp";
}
declare module "livecodes/languages/julia/lang-julia" {
    import type { LanguageSpecs } from "livecodes/models";
    export const julia: LanguageSpecs;
}
declare module "livecodes/languages/julia/index" {
    export * from "livecodes/languages/julia/lang-julia";
}
declare module "livecodes/languages/cpp-wasm/lang-cpp-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const cppWasm: LanguageSpecs;
}
declare module "livecodes/languages/cpp-wasm/index" {
    export * from "livecodes/languages/cpp-wasm/lang-cpp-wasm";
}
declare module "livecodes/languages/tcl/lang-tcl" {
    import type { LanguageSpecs } from "livecodes/models";
    export const tcl: LanguageSpecs;
}
declare module "livecodes/languages/tcl/index" {
    export * from "livecodes/languages/tcl/lang-tcl";
}
declare module "livecodes/languages/prolog/lang-prolog" {
    import type { LanguageSpecs } from "livecodes/models";
    export const prolog: LanguageSpecs;
}
declare module "livecodes/languages/prolog/index" {
    export * from "livecodes/languages/prolog/lang-prolog";
}
declare module "livecodes/languages/clio/lang-clio" {
    import type { LanguageSpecs } from "livecodes/models";
    export const clio: LanguageSpecs;
}
declare module "livecodes/languages/clio/index" {
    export * from "livecodes/languages/clio/lang-clio";
}
declare module "livecodes/languages/richtext/lang-richtext" {
    import type { LanguageSpecs } from "livecodes/models";
    export const richtext: LanguageSpecs;
}
declare module "livecodes/languages/richtext/index" {
    export * from "livecodes/languages/richtext/lang-richtext";
}
declare module "livecodes/languages/diagrams/lang-diagrams" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const diagrams: LanguageSpecs;
}
declare module "livecodes/languages/diagrams/index" {
    export * from "livecodes/languages/diagrams/lang-diagrams";
}
declare module "livecodes/languages/imba/lang-imba" {
    import type { LanguageSpecs } from "livecodes/models";
    export const imba: LanguageSpecs;
}
declare module "livecodes/languages/imba/index" {
    export * from "livecodes/languages/imba/lang-imba";
}
declare module "livecodes/languages/mustache/lang-mustache" {
    import type { LanguageSpecs } from "livecodes/models";
    export const mustache: LanguageSpecs;
}
declare module "livecodes/languages/mustache/index" {
    export * from "livecodes/languages/mustache/lang-mustache";
}
declare module "livecodes/languages/art-template/lang-art-template" {
    import type { LanguageSpecs } from "livecodes/models";
    export const artTemplate: LanguageSpecs;
}
declare module "livecodes/languages/art-template/index" {
    export * from "livecodes/languages/art-template/lang-art-template";
}
declare module "livecodes/languages/r/lang-r" {
    import type { LanguageSpecs } from "livecodes/models";
    export const r: LanguageSpecs;
}
declare module "livecodes/languages/r/index" {
    export * from "livecodes/languages/r/lang-r";
}
declare module "livecodes/languages/civet/lang-civet" {
    import type { LanguageSpecs } from "livecodes/models";
    export const civet: LanguageSpecs;
}
declare module "livecodes/languages/civet/index" {
    export * from "livecodes/languages/civet/lang-civet";
}
declare module "livecodes/languages/fennel/lang-fennel" {
    import type { LanguageSpecs } from "livecodes/models";
    export const fennel: LanguageSpecs;
}
declare module "livecodes/languages/fennel/index" {
    export * from "livecodes/languages/fennel/lang-fennel";
}
declare module "livecodes/languages/teal/lang-teal" {
    import type { LanguageSpecs } from "livecodes/models";
    export const teal: LanguageSpecs;
}
declare module "livecodes/languages/teal/index" {
    export * from "livecodes/languages/teal/lang-teal";
}
declare module "livecodes/languages/stylis/lang-stylis" {
    import type { LanguageSpecs } from "livecodes/models";
    export const stylis: LanguageSpecs;
}
declare module "livecodes/languages/stylis/index" {
    export * from "livecodes/languages/stylis/lang-stylis";
}
declare module "livecodes/languages/flow/lang-flow" {
    import type { LanguageSpecs } from "livecodes/models";
    export const flow: LanguageSpecs;
}
declare module "livecodes/languages/flow/index" {
    export * from "livecodes/languages/flow/lang-flow";
}
declare module "livecodes/languages/mjml/lang-mjml" {
    import type { LanguageSpecs } from "livecodes/models";
    export const mjml: LanguageSpecs;
}
declare module "livecodes/languages/mjml/index" {
    export * from "livecodes/languages/mjml/lang-mjml";
}
declare module "livecodes/languages/sucrase/lang-sucrase" {
    import type { LanguageSpecs } from "livecodes/models";
    export const sucrase: LanguageSpecs;
}
declare module "livecodes/languages/sucrase/index" {
    export * from "livecodes/languages/sucrase/lang-sucrase";
}
declare module "livecodes/languages/eta/lang-eta" {
    import type { LanguageSpecs } from "livecodes/models";
    export const eta: LanguageSpecs;
}
declare module "livecodes/languages/eta/index" {
    export * from "livecodes/languages/eta/lang-eta";
}
declare module "livecodes/compiler/compile-blocks" {
    import type { Config } from "livecodes/models";
    interface CompileBlocksOptions {
        removeEnclosingTemplate?: boolean;
        languageAttribute?: 'lang' | 'type';
        prepareFn?: (code: string, config: Config) => Promise<string>;
    }
    export const fetchBlocksSource: (code: string, blockElement: 'template' | 'style' | 'script') => Promise<string>;
    export const compileBlocks: (code: string, blockElement: 'template' | 'style' | 'script', config: Config, options?: CompileBlocksOptions) => Promise<string>;
    export const compileAllBlocks: (code: string, config: Config, options?: CompileBlocksOptions) => Promise<string>;
}
declare module "livecodes/compiler/get-all-compilers" {
    import type { LanguageSpecs, Config, Compilers, ProcessorSpecs } from "livecodes/models";
    export const getAllCompilers: (languages: Array<LanguageSpecs | ProcessorSpecs>, config: Config, baseUrl: string) => Compilers;
}
declare module "livecodes/services/allowed-origin" {
    export const allowedOrigin: (origin?: string) => boolean;
    export const whitelistTarget: (url: string) => boolean;
}
declare module "livecodes/sync/diff" {
    import * as Y from 'yjs';
    import * as DeepDiff from 'deep-diff';
    export { Y, DeepDiff };
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
declare module "livecodes/storage/project-storage" {
    import type { ProjectStorage, StoreName } from "livecodes/storage/models";
    export const createProjectStorage: (name: StoreName, isEmbed: boolean) => Promise<ProjectStorage>;
}
declare module "livecodes/storage/fake-storage" {
    import type { SimpleStorage, Storage } from "livecodes/storage/models";
    export const fakeStorage: Omit<Storage<any>, 'getList'> & {
        getList: () => Promise<[]>;
    };
    export const fakeSimpleStorage: SimpleStorage<any>;
}
declare module "livecodes/storage/simple-storage" {
    import type { SimpleStorage, StoreName } from "livecodes/storage/models";
    export const createSimpleStorage: <T>(name: StoreName, isEmbed: boolean) => SimpleStorage<T>;
}
declare module "livecodes/storage/stores" {
    import type { Storage, ProjectStorage, SimpleStorage, Stores } from "livecodes/storage/models";
    export const createStores: () => Stores;
    export const initializeStores: (stores: Stores, isEmbed: boolean) => Promise<void>;
    export const initializeSimpleStores: (stores: Stores, isEmbed: boolean) => Promise<void>;
    export const getStoreKey: (store: SimpleStorage<any> | Storage<any> | ProjectStorage, stores: Stores) => string | null;
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
    import type { workerSync, workerExportToLocalSync, workerExportStoreAsBase64Update, workerRestoreFromUpdate, workerRestoreFromLocalSync } from "livecodes/sync/sync.worker";
    export const init: (baseUrl: string) => void;
    export const sync: workerSync;
    export const exportToLocalSync: workerExportToLocalSync;
    export const exportStoreAsBase64Update: workerExportStoreAsBase64Update;
    export const restoreFromUpdate: workerRestoreFromUpdate;
    export const restoreFromLocalSync: workerRestoreFromLocalSync;
}
declare module "livecodes/sync/index" {
    export * from "livecodes/sync/diff";
    export * from "livecodes/sync/sync";
    export * from "livecodes/sync/models";
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
declare module "livecodes/storage/storage" {
    import type { Storage, StoreName } from "livecodes/storage/models";
    export const generateId: () => string;
    export const createStorage: <T>(name: StoreName, isEmbed: boolean) => Promise<Storage<T>>;
}
declare module "livecodes/utils/compression" {
    export const compress: (uncompressed: string) => string;
    export const decompress: (compressed: string, isJSON?: boolean) => string | null;
}
declare module "livecodes/storage/encrypt" {
    export const encrypt: (text: string) => Promise<string>;
    export const decrypt: (encrypted: string) => Promise<string | null>;
}
declare module "livecodes/storage/index" {
    export * from "livecodes/storage/storage";
    export * from "livecodes/storage/project-storage";
    export * from "livecodes/storage/simple-storage";
    export * from "livecodes/storage/fake-storage";
    export * from "livecodes/storage/stores";
    export * from "livecodes/storage/models";
    export * from "livecodes/storage/encrypt";
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
declare module "livecodes/compiler/import-map" {
    import type { CompileInfo, Config, Language } from "livecodes/models";
    export const importsPattern: RegExp;
    export const dynamicImportsPattern: RegExp;
    export const getImports: (code: string, removeSpecifier?: boolean) => string[];
    export const isBare: (mod: string) => boolean;
    export const findImportMapKey: (mod: string, importmap: Record<string, string>) => string | undefined;
    export const createImportMap: (code: string, config: Config, fallbackToCdn?: boolean) => {
        [x: string]: string;
    };
    export const hasImports: (code: string) => boolean;
    export const hasExports: (code: string) => boolean;
    export const hasDefaultExport: (code: string) => boolean;
    export const hasUrlImportsOrExports: (code: string) => boolean;
    export const hasAwait: (code: string) => boolean;
    export const isModuleScript: (code: string) => boolean;
    export const replaceImports: (code: string, config: Config, importMap?: Record<string, string>) => string;
    export const replaceSFCImports: (code: string, { filename, config, sfcExtension, getLanguageByAlias, compileSFC, }: {
        config: Config;
        filename: string;
        sfcExtension: string;
        getLanguageByAlias: (alias: string) => Language | undefined;
        compileSFC: (code: string, options: {
            filename: string;
            config: Config;
        }) => Promise<string>;
    }) => Promise<string>;
    export const removeImports: (code: string, mods: string[]) => string;
    export const styleimportsPattern: RegExp;
    export const hasStyleImports: (code: string) => boolean;
    export const replaceStyleImports: (code: string) => string;
    export const cjs2esm: (code: string) => string;
    export const createCSSModulesImportMap: (compiledScript: string, compiledStyle: string, cssTokens?: CompileInfo['cssModules'], extension?: Language) => {
        [x: string]: string;
    };
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
declare module "livecodes/compiler/models" {
    import type { Language, Config, Processor, CompileOptions, CompileResult } from "livecodes/models";
    export interface Compiler {
        load: (languages: LanguageOrProcessor[], config: Config) => Promise<unknown[]>;
        compile: (content: string, language: Language, config: Config, options: CompileOptions) => Promise<CompileResult>;
        clearCache: () => void;
    }
    export type LanguageOrProcessor = Language | Processor;
    export interface CompilerMessageEvent extends MessageEvent {
        data: CompilerMessage;
    }
    export type CompilerMessage = {
        from?: 'compiler';
    } & (InitMessage | InitSuccessMessage | LoadMessage | LoadedMessage | LoadFailedMessage | CompileMessage | CompileInCompilerMessage | CompiledMessage | CompileFailedMessage);
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
declare module "livecodes/languages/clojurescript/lang-clojurescript" {
    import type { LanguageSpecs } from "livecodes/models";
    export const clojurescript: LanguageSpecs;
}
declare module "livecodes/languages/clojurescript/index" {
    export * from "livecodes/languages/clojurescript/lang-clojurescript";
}
declare module "livecodes/languages/ruby-wasm/lang-ruby-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const rubyWasm: LanguageSpecs;
}
declare module "livecodes/languages/ruby-wasm/index" {
    export * from "livecodes/languages/ruby-wasm/lang-ruby-wasm";
}
declare module "livecodes/languages/lua-wasm/lang-lua-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const luaWasm: LanguageSpecs;
}
declare module "livecodes/languages/lua-wasm/index" {
    export * from "livecodes/languages/lua-wasm/lang-lua-wasm";
}
declare module "livecodes/languages/php-wasm/lang-php-wasm" {
    import type { LanguageSpecs } from "livecodes/models";
    export const phpWasm: LanguageSpecs;
}
declare module "livecodes/languages/php-wasm/index" {
    export * from "livecodes/languages/php-wasm/lang-php-wasm";
}
declare module "livecodes/languages/bbcode/lang-bbcode" {
    import type { LanguageSpecs } from "livecodes/models";
    export const bbcode: LanguageSpecs;
}
declare module "livecodes/languages/bbcode/index" {
    export * from "livecodes/languages/bbcode/lang-bbcode";
}
declare module "livecodes/languages/postgresql/lang-postgresql" {
    import type { CompilerFunction, LanguageSpecs } from "livecodes/models";
    export const runOutsideWorker: CompilerFunction;
    export const postgresql: LanguageSpecs;
}
declare module "livecodes/languages/postgresql/index" {
    export * from "livecodes/languages/postgresql/lang-postgresql";
}
declare module "livecodes/languages/gleam/lang-gleam" {
    import type { LanguageSpecs } from "livecodes/models";
    export const gleam: LanguageSpecs;
}
declare module "livecodes/languages/gleam/index" {
    export * from "livecodes/languages/gleam/lang-gleam";
}
declare module "livecodes/languages/languages" {
    import type { LanguageSpecs } from "livecodes/models";
    export const languages: LanguageSpecs[];
}
declare module "livecodes/languages/create-language-menus" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { Config, Template } from "livecodes/models";
    export const createLanguageMenus: (config: Config, baseUrl: string, eventsManager: ReturnType<typeof createEventsManager>, showLanguageInfo: (languageInfo: HTMLElement) => void, loadStarterTemplate: (templateName: Template['name']) => void, importCode: (options: {
        url: string;
    }) => Promise<boolean>) => void;
    export const createProcessorItem: (processor: {
        name: string;
        title: string;
    }) => HTMLLIElement;
}
declare module "livecodes/languages/css-presets" {
    import type { CssPreset } from "livecodes/models";
    export const cssPresets: CssPreset[];
}
declare module "livecodes/languages/index" {
    export * from "livecodes/languages/create-language-menus";
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
    export const buildConfig: (appConfig: Partial<Config>) => Config;
    export const getParams: (queryParams?: string) => UrlQueryParams;
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
    import type { ContentConfig, Config, UserConfig, EditorConfig, FormatterConfig, AppConfig } from "livecodes/models";
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
declare module "livecodes/cache/cache" {
    import type { Cache, Code, EditorId, Language } from "livecodes/models";
    export const getCache: () => Cache;
    export const setCache: (newCache?: Cache) => void;
    export const updateCache: (editorId: EditorId, language: Language, modified: string) => void;
    export const getCachedCode: () => Code;
}
declare module "livecodes/cache/utils" {
    import type { ContentConfig, Cache } from "livecodes/models";
    export const cacheIsValid: (cache: Cache, config: ContentConfig) => boolean;
}
declare module "livecodes/cache/index" {
    export * from "livecodes/cache/cache";
    export * from "livecodes/cache/utils";
}
declare module "livecodes/export/utils" {
    import type { ContentConfig, EditorId, Config, User, Language } from "livecodes/models";
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
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
    import type { ContentConfig, User } from "livecodes/models";
    import type { getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
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
    import type { Config, EditorId } from "livecodes/models";
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
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
    import type { Config, EditorId } from "livecodes/models";
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
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
    import type { Config } from "livecodes/models";
    import type { getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
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
declare module "livecodes/html/index" {
    const resultTemplate: string;
    const appHTML: string;
    const settingsMenuHTML: string;
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
    const resultPopupHTML: string;
    export { resultTemplate, appHTML, settingsMenuHTML, languageInfo, customSettingsScreen, testEditorScreen, importScreen, deployScreen, syncScreen, backupScreen, broadcastScreen, welcomeScreen, aboutScreen, infoScreen, resourcesScreen, loginScreen, savePromptScreen, recoverPromptScreen, templatesScreen, openScreen, assetsScreen, addAssetScreen, snippetsScreen, addSnippetScreen, shareScreen, embedScreen, editorSettingsScreen, resultPopupHTML, };
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
declare module "livecodes/import/codepen" {
    import type { Config } from "livecodes/models";
    export const importFromCodepen: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/dom" {
    import type { EditorId, Language, Config } from "livecodes/models";
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
    export const addBaseTag: (config: Partial<Config>, files: Array<{
        user: string;
        repo: string;
        ref: string;
        path: string;
    }>) => Partial<Config>;
}
declare module "livecodes/import/utils" {
    import type { EditorId, Language, Config } from "livecodes/models";
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
    import type { Language, Config } from "livecodes/models";
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
declare module "livecodes/import/svelte-playground" {
    import type { Config } from "livecodes/models";
    export const importSveltePlayground: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/typescript-playground" {
    import type { Config } from "livecodes/models";
    export const importTypescriptPlayground: (url: string) => Promise<Partial<Config>>;
}
declare module "livecodes/import/vue-playground" {
    import type { Config } from "livecodes/models";
    export const importVuePlayground: (url: string) => Promise<Partial<Config>>;
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
    export { importSveltePlayground } from "livecodes/import/svelte-playground";
    export { importTypescriptPlayground } from "livecodes/import/typescript-playground";
    export { importVuePlayground } from "livecodes/import/vue-playground";
    export { importFromUrl } from "livecodes/import/url";
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
declare module "livecodes/modal" {
    interface ModalOptions {
        size?: 'large' | 'small';
        closeButton?: boolean;
        isAsync?: boolean;
        onClose?: () => void;
        scrollToSelector?: string;
    }
    export const createModal: () => {
        show: (container: HTMLElement, { size, closeButton, isAsync, onClose, scrollToSelector, }?: ModalOptions) => void;
        close: () => void;
    };
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
    export const createNotifications: () => {
        info: (message: string, dismissable?: boolean) => void;
        success: (message: string, dismissable?: boolean) => void;
        warning: (message: string, dismissable?: boolean) => void;
        error: (message: string, dismissable?: boolean) => void;
        confirm: (message: string, confirmCallback: () => void, cancelCallback?: () => void) => void;
    };
}
declare module "livecodes/notifications/index" {
    export * from "livecodes/notifications/create-notifications";
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
        '@testing-library/dom': string;
        '@testing-library/jest-dom': string;
        '@testing-library/react': string;
        chai: string;
    };
}
declare module "livecodes/result/result-page" {
    import type { Cache, Config, CompileInfo } from "livecodes/models";
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
    export const getStarterTemplates: (config: Config, baseUrl: string) => Promise<Template[]>;
    export const getTemplate: (name: string, config: Config, baseUrl: string) => Promise<Template>;
}
declare module "livecodes/templates/index" {
    export * from "livecodes/templates/get-starter-templates";
}
declare module "livecodes/UI/info" {
    import type { createModal } from "livecodes/modal";
    import type { Config } from "livecodes/models";
    import type { ProjectStorage } from "livecodes/storage/index";
    export const getTags: (value: string) => string[];
    export const createProjectInfoUI: (config: Config, storage: ProjectStorage, modal: ReturnType<typeof createModal>, onUpdate: (title: string, description: string, head: string, htmlAttrs: string, tags: string[]) => void) => Promise<void>;
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
    export const getCodeRunButton: () => HTMLElement;
    export const getEditorToolbar: () => HTMLElement;
    export const getFocusButton: () => HTMLElement;
    export const getCopyButton: () => HTMLElement;
    export const getCopyAsUrlButton: () => HTMLElement;
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
    export const getToolspaneLoader: () => HTMLElement | null;
    export const getZoomButtonValue: () => HTMLElement | null;
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
    export const getCssPresetLinks: () => NodeListOf<HTMLAnchorElement>;
    export const getSettingsMenuScroller: () => HTMLElement | null;
    export const getSettingsButton: () => HTMLElement | null;
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
    export const getSpacingToggle: () => HTMLInputElement;
    export const getCSSPresetLinks: () => NodeListOf<HTMLAnchorElement>;
    export const getProjectInfoLink: () => HTMLInputElement;
    export const getAssetsLink: () => HTMLInputElement;
    export const getSnippetsLink: () => HTMLInputElement;
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
}
declare module "livecodes/UI/login" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { GithubScope, User } from "livecodes/models";
    export const createLoginContainer: (eventsManager: ReturnType<typeof createEventsManager>, loginCallback: (scopes: GithubScope[]) => void) => HTMLElement;
    export const displayLoggedIn: (user: User) => void;
    export const displayLoggedOut: () => void;
}
declare module "livecodes/UI/open" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { Config, ContentConfig, Language, LanguageSpecs, Screen } from "livecodes/models";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { SavedProject, ProjectStorage } from "livecodes/storage/index";
    export const createOpenItem: (item: SavedProject, list: HTMLElement, getLanguageTitle: (language: Language) => string, getLanguageByAlias: (alias?: string) => Language | undefined, isTemplate?: boolean) => {
        link: HTMLAnchorElement;
        deleteButton: HTMLButtonElement;
        setAsDefaultLink: HTMLSpanElement;
        removeDefaultLink: HTMLSpanElement;
    };
    export const createSavedProjectsList: ({ projectStorage, eventsManager, showScreen, getContentConfig, notifications, modal, loadConfig, getProjectId, setProjectId, languages, getLanguageTitle, getLanguageByAlias, }: {
        projectStorage: ProjectStorage;
        eventsManager: ReturnType<typeof createEventsManager>;
        showScreen: (screen: Screen['screen']) => void;
        getContentConfig: (config: Config | ContentConfig) => ContentConfig;
        notifications: ReturnType<typeof createNotifications>;
        modal: ReturnType<typeof createModal>;
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
    import type { createEventsManager } from "livecodes/events/index";
    import type { Template } from "livecodes/models";
    export const createTemplatesContainer: (eventsManager: ReturnType<typeof createEventsManager>, loadUserTemplates: () => void) => HTMLElement;
    export const createStarterTemplateLink: (template: Template, starterTemplatesList: HTMLElement | null, baseUrl: string) => HTMLAnchorElement;
    export const noUserTemplates = "\n<div class=\"modal-message no-data\">\n  <div>You have no saved templates.</div>\n  <div class=\"description\">\n    You can save a project as a template from\n    <wbr />(App&nbsp;menu&nbsp;>&nbsp;Save&nbsp;as&nbsp;> Template).\n  </div>\n</div>\n";
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
declare module "livecodes/toolspane/compiled-code-viewer" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { Editors, Config, CompiledCodeViewer } from "livecodes/models";
    export const createCompiledCodeViewer: (config: Config, baseUrl: string, _editors: Editors, _eventsManager: ReturnType<typeof createEventsManager>, isEmbed: boolean, _runTests: () => Promise<void>) => CompiledCodeViewer;
}
declare module "livecodes/toolspane/console" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { Editors, Config, Console } from "livecodes/models";
    export const createConsole: (config: Config, baseUrl: string, _editors: Editors, eventsManager: ReturnType<typeof createEventsManager>, isEmbed: boolean, _runTests: () => Promise<void>) => Console;
}
declare module "livecodes/UI/icons" {
    export const run = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z\" fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/></svg>";
    export const checked = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"checked\" viewBox=\"0 0 512 512\"><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M352 176L217.6 336 160 272\"/><rect x=\"64\" y=\"64\" width=\"384\" height=\"384\" rx=\"48\" ry=\"48\" fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"32\"/></svg>";
    export const unchecked = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"unchecked\" viewBox=\"0 0 512 512\"><path d=\"M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/></svg>";
    export const reset = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M320 146s24.36-12-64-12a160 160 0 10160 160\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M256 58l80 80-80 80\"/></svg>";
    export const edit = "<svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z\"></path></svg>";
    export const copy = "\n  <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n     viewBox=\"0 0 210.107 210.107\" style=\"enable-background:new 0 0 210.107 210.107;\" xml:space=\"preserve\">\n  <g>\n    <path d=\"M168.506,0H80.235C67.413,0,56.981,10.432,56.981,23.254v2.854h-15.38\n      c-12.822,0-23.254,10.432-23.254,23.254v137.492c0,12.822,10.432,23.254,23.254,23.254h88.271\n      c12.822,0,23.253-10.432,23.253-23.254V184h15.38c12.822,0,23.254-10.432,23.254-23.254V23.254C191.76,10.432,181.328,0,168.506,0z\n       M138.126,186.854c0,4.551-3.703,8.254-8.253,8.254H41.601c-4.551,0-8.254-3.703-8.254-8.254V49.361\n      c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.253,3.703,8.253,8.254V186.854z M176.76,160.746\n      c0,4.551-3.703,8.254-8.254,8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854\n      c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.254,3.703,8.254,8.254V160.746z\"/>\n  </g>\n  </svg>";
}
declare module "livecodes/toolspane/test-viewer" {
    import type { Config, Editors, EventsManager, TestViewer } from "livecodes/models";
    export const createTestViewer: (_config: Config, _baseUrl: string, _editors: Editors, eventsManager: EventsManager, isEmbed: boolean, runTests: () => Promise<void>) => TestViewer;
}
declare module "livecodes/toolspane/tools" {
    import type { Editors, Config, EventsManager, ToolsPane } from "livecodes/models";
    export const createToolsPane: (config: Config, baseUrl: string, editors: Editors, eventsManager: EventsManager, isEmbed: boolean, runTests: () => Promise<void>, setTools: (tools: Config['tools']) => void) => ToolsPane;
}
declare module "livecodes/toolspane/index" {
    export * from "livecodes/toolspane/compiled-code-viewer";
    export * from "livecodes/toolspane/console";
    export * from "livecodes/toolspane/test-viewer";
    export * from "livecodes/toolspane/tools";
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
declare module "livecodes/types/default-types" {
    import type { Types } from "livecodes/models";
    export const getDefaultTypes: () => Types;
}
declare module "livecodes/types/index" {
    export * from "livecodes/types/type-loader";
    export * from "livecodes/types/default-types";
}
declare module "livecodes/_modules" {
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
    export * as modal from "livecodes/modal";
    export * as models from "livecodes/models";
    export * as notifications from "livecodes/notifications/index";
    export * as result from "livecodes/result/index";
    export * as services from "livecodes/services/index";
    export * as storage from "livecodes/storage/index";
    export * as sync from "livecodes/sync/index";
    export * as templates from "livecodes/templates/index";
    export * as toolspane from "livecodes/toolspane/index";
    export * as types from "livecodes/types/index";
    export * as UI from "livecodes/UI/index";
    export * as utils from "livecodes/utils/index";
    export * as vendors from "livecodes/vendors";
}
declare module "livecodes/UI/broadcast" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { AppData } from "livecodes/models";
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
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
        deps: {
            getBroadcastData: () => BroadcastData | null;
            setBroadcastData: (broadcastData: BroadcastData) => void;
            broadcast: (broadcastData: Partial<BroadcastData>) => Promise<BroadcastResponseData | BroadcastResponseError | undefined>;
        };
    }) => Promise<void>;
}
declare module "livecodes/services/permanent-url" {
    type SDKFile = 'esm' | 'umd' | 'react' | 'vue' | 'types';
    export const permanentUrlService: {
        getAppUrl: () => string;
        getSDKUrl: (file?: SDKFile) => string;
    };
}
declare module "livecodes/UI/sync-ui" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { User, UserData } from "livecodes/models";
    export const isSyncInProgress: () => boolean;
    export const updateSyncStatus: ({ inProgress, lastSync, syncContainer, }: {
        inProgress?: boolean;
        lastSync?: number;
        syncContainer?: HTMLElement;
    }) => void;
    export const createSyncUI: ({ baseUrl, modal, notifications, eventsManager, user, deps, }: {
        baseUrl: string;
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
        user: User;
        deps: {
            getSyncData: () => Promise<UserData['data']['sync'] | null>;
            setSyncData: (syncData: UserData['data']['sync']) => Promise<void>;
        };
    }) => Promise<void>;
}
declare module "livecodes/UI/import" {
    import type { populateConfig as populateConfigFn } from "livecodes/import/utils";
    import type { createModal } from "livecodes/modal";
    import type { ContentConfig, User, Screen } from "livecodes/models";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { ProjectStorage } from "livecodes/storage/index";
    import type { createEventsManager } from "livecodes/events/index";
    import { importCode } from "livecodes/import/import";
    export { importCode };
    export const createImportUI: ({ baseUrl, modal, notifications, eventsManager, getUser, loadConfig, populateConfig, projectStorage, showScreen, }: {
        baseUrl: string;
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
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
    import type { createEventsManager } from "livecodes/events/index";
    import type { ShareData } from "livecodes/models";
    export const createShareContainer: (shareFn: (shortUrl: boolean, permanentUrl: boolean) => Promise<ShareData>, baseUrl: string, eventsManager: ReturnType<typeof createEventsManager>) => Promise<HTMLElement>;
}
declare module "livecodes/UI/deploy" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { Config, ContentConfig, Cache, User } from "livecodes/models";
    import type { getLanguageCompiler as getLanguageCompilerFn, getLanguageExtension as getLanguageExtensionFn } from "livecodes/languages/index";
    import { deployFile } from "livecodes/deploy/deploy";
    export { deployFile };
    export const createDeployUI: ({ modal, notifications, eventsManager, user, deployRepo, deps, }: {
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
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
    import type { createModal } from "livecodes/modal";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { createEventsManager } from "livecodes/events/index";
    import type { Stores } from "livecodes/storage/index";
    export const isInProgress: () => boolean;
    export const updateProgressStatus: ({ inProgress, backupContainer, }: {
        inProgress?: boolean;
        backupContainer: HTMLElement;
    }) => void;
    export const createBackupUI: ({ baseUrl, modal, notifications, eventsManager, stores, deps, }: {
        baseUrl: string;
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
        stores: Stores;
        deps: {
            loadUserConfig: () => void;
        };
    }) => void;
}
declare module "livecodes/UI/embed-ui" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { CodeEditor, ContentConfig, EditorId } from "livecodes/models";
    import type { createNotifications } from "livecodes/notifications/index";
    export const createEmbedUI: ({ baseUrl, config, editorLanguages, modal, notifications, eventsManager, createEditorFn, getUrlFn, }: {
        baseUrl: string;
        config: ContentConfig;
        editorLanguages: {
            script: string;
            style: string;
            markup: string;
        };
        modal: ReturnType<typeof createModal>;
        notifications: ReturnType<typeof createNotifications>;
        eventsManager: ReturnType<typeof createEventsManager>;
        createEditorFn: (container: HTMLElement) => Promise<CodeEditor>;
        getUrlFn: (permanentUrl?: boolean) => Promise<string>;
    }) => Promise<void>;
}
declare module "livecodes/editor/themes" {
    import type { CodejarTheme, CodemirrorTheme, Config, MonacoTheme } from "livecodes/models";
    export const getEditorTheme: ({ editor, editorTheme, theme, editorThemes, }: Pick<Config, 'editorTheme' | 'editor' | 'theme'> & {
        editorThemes: Array<MonacoTheme | CodemirrorTheme | CodejarTheme>;
    }) => "idle" | "lazy" | "dark" | "active4d" | "all-hallows-eve" | "amy" | "birds-of-paradise" | "blackboard" | "brilliance-black" | "brilliance-dull" | "chrome-devtools" | "clouds-midnight" | "clouds" | "cobalt" | "cobalt2" | "custom-vs-light" | "custom-vs-dark" | "dawn" | "dracula" | "dreamweaver" | "eiffel" | "espresso-libre" | "github" | "github-dark" | "github-light" | "hc-black" | "hc-light" | "idlefingers" | "iplastic" | "katzenmilch" | "krtheme" | "kuroir" | "magicwb-amiga" | "merbivore-soft" | "merbivore" | "monochrome" | "monochrome-dark" | "monokai" | "monokai-bright" | "monoindustrial" | "night-owl" | "nord" | "oceanic-next" | "pastels-on-dark" | "slush-and-poppies" | "solarized-dark" | "solarized-light" | "spacecadet" | "sunburst" | "textmate-mac-classic" | "tomorrow" | "tomorrow-night" | "tomorrow-night-blue" | "tomorrow-night-bright" | "tomorrow-night-eighties" | "twilight" | "upstream-sunburst" | "vibrant-ink" | "vs" | "vs-dark" | "xcode-default" | "zenburnesque" | "aura" | "ayu-light" | "barf" | "basic-light" | "basic-dark" | "bespin" | "boys-and-girls" | "cm-light" | "cool-glow" | "espresso" | "gruvbox-dark" | "gruvbox-light" | "material-dark" | "material-light" | "noctis-lilac" | "one-dark" | "rose-pine-dawn" | "smoothy" | "tokyo-night" | "tokyo-night-day" | "tokyo-night-storm" | "a11y-dark" | "atom-dark" | "base16-ateliersulphurpool-light" | "cb" | "coldark-cold" | "coldark-dark" | "coy" | "coy-without-shadows" | "darcula" | "duotone-dark" | "duotone-earth" | "duotone-forest" | "duotone-light" | "duotone-sea" | "duotone-space" | "funky" | "ghcolors" | "holi-theme" | "hopscotch" | "laserwave" | "lucario" | "material-oceanic" | "okaidia" | "one-light" | "pojoaque" | "shades-of-purple" | "solarized-dark-atom" | "synthwave84" | "vsc-dark-plus" | "xonokai" | "z-touchs" | null;
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
declare module "livecodes/editor/codemirror/codemirror-themes" {
    import type { CodemirrorTheme } from "livecodes/models";
    export const codemirrorThemes: Array<{
        name: CodemirrorTheme;
        title: string;
        url?: string;
        exportName?: string;
    }>;
    export const customThemes: {
        monochrome: import("@codemirror/state").Extension[];
        'monochrome-dark': import("@codemirror/state").Extension[];
    };
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
declare module "livecodes/UI/editor-settings" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { EditorLibrary, FormatFn, UserConfig } from "livecodes/models";
    import type { createEditor } from "livecodes/editor/create-editor";
    export const createEditorSettingsUI: ({ baseUrl, modal, eventsManager, scrollToSelector, deps, }: {
        baseUrl: string;
        modal: ReturnType<typeof createModal>;
        eventsManager: ReturnType<typeof createEventsManager>;
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
declare module "livecodes/UI/assets" {
    import type { DeployResult } from "livecodes/deploy/index";
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { Asset, Screen, User } from "livecodes/models";
    import type { createNotifications } from "livecodes/notifications/index";
    import type { GitHubFile } from "livecodes/services/github";
    import { type Storage } from "livecodes/storage/index";
    export const createAssetsList: ({ assetsStorage, eventsManager, showScreen, notifications, modal, baseUrl, }: {
        assetsStorage: Storage<Asset>;
        eventsManager: ReturnType<typeof createEventsManager>;
        showScreen: (screen: Screen['screen']) => void;
        notifications: ReturnType<typeof createNotifications>;
        modal: ReturnType<typeof createModal>;
        baseUrl: string;
    }) => Promise<void>;
    export const createAddAssetContainer: ({ assetsStorage, eventsManager, showScreen, notifications, deployAsset, getUser, baseUrl, activeTab, }: {
        assetsStorage: Storage<Asset>;
        eventsManager: ReturnType<typeof createEventsManager>;
        showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
        notifications: ReturnType<typeof createNotifications>;
        deployAsset: (user: User, file: GitHubFile) => Promise<DeployResult | null>;
        getUser: (fn?: () => void) => Promise<User | void>;
        baseUrl: string;
        activeTab: number;
    }) => HTMLElement;
}
declare module "livecodes/UI/snippets" {
    import type { createEventsManager } from "livecodes/events/index";
    import type { createModal } from "livecodes/modal";
    import type { Snippet, CodeEditor, EditorOptions, Screen, AppData } from "livecodes/models";
    import type { createNotifications } from "livecodes/notifications/index";
    import { type Storage } from "livecodes/storage/index";
    export const createSnippetsList: ({ snippetsStorage, eventsManager, notifications, modal, deps, }: {
        snippetsStorage: Storage<Snippet>;
        eventsManager: ReturnType<typeof createEventsManager>;
        notifications: ReturnType<typeof createNotifications>;
        modal: ReturnType<typeof createModal>;
        deps: {
            createEditorFn: (options: Partial<EditorOptions>) => Promise<CodeEditor>;
            showScreen: (screen: Screen['screen']) => void;
        };
    }) => Promise<void>;
    export const createAddSnippetContainer: ({ snippetId, snippetsStorage, eventsManager, showScreen, notifications, deps, }: {
        snippetId?: string;
        snippetsStorage: Storage<Snippet>;
        eventsManager: ReturnType<typeof createEventsManager>;
        showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
        notifications: ReturnType<typeof createNotifications>;
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
    import type { createEventsManager } from "livecodes/events/events";
    import type { createModal } from "livecodes/modal";
    import type { Config } from "livecodes/models";
    export const createExternalResourcesUI: ({ baseUrl, modal, eventsManager, deps, }: {
        baseUrl: string;
        modal: ReturnType<typeof createModal>;
        eventsManager: ReturnType<typeof createEventsManager>;
        deps: {
            getConfig: () => Config;
            setConfig: (config: Config) => void;
            loadResources: () => Promise<void>;
        };
    }) => void;
}
declare module "livecodes/core" {
    import type { API, Config } from "livecodes/models";
    const initApp: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    const initEmbed: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    const initLite: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    const initHeadless: (config: Partial<Config>, baseUrl: string) => Promise<API>;
    export { initApp, initEmbed, initLite, initHeadless };
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
    export const isHeadless: boolean;
    export const isLite: boolean;
    export const isEmbed: boolean;
    export const loadingParam: string | null;
    export const clickToLoad: boolean;
    export const loading: EmbedOptions['loading'];
    export const disableAI: boolean;
    export const livecodes: (container: string, config?: Partial<Config>) => Promise<API>;
}
declare module "livecodes/index" { }
declare module "livecodes/lite" {
    export const app: (config: Partial<import("sdk").Config>, baseUrl: string) => Promise<import("sdk/models").API>;
}
declare module "livecodes/cache/__tests__/cache.spec" { }
declare module "livecodes/compiler/compile.page" { }
declare module "livecodes/compiler/compile.worker" { }
declare module "livecodes/compiler/compiler-utils" { }
declare module "livecodes/compiler/__tests__/import-map.spec" { }
declare module "livecodes/config/__tests__/build-config.spec" { }
declare module "livecodes/config/__tests__/is-earlier.spec" { }
declare module "livecodes/config/__tests__/upgrade-config.spec" { }
declare module "livecodes/config/__tests__/validate-config.spec" { }
declare module "livecodes/editor/codejar/codejar" {
    import 'prismjs';
    import 'prismjs/plugins/autoloader/prism-autoloader';
    import 'prismjs/plugins/line-numbers/prism-line-numbers';
    import 'prismjs/components/prism-markup';
    import 'prismjs/components/prism-css';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/components/prism-typescript';
    import 'prismjs/components/prism-jsx';
    import 'prismjs/components/prism-tsx';
    import 'prismjs/components/prism-json';
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export const createEditor: (options: EditorOptions) => Promise<CodeEditor>;
}
declare module "livecodes/editor/codemirror/basic-setup" {
    import { lineNumbers } from '@codemirror/view';
    import { type Extension } from '@codemirror/state';
    import { closeBrackets } from '@codemirror/autocomplete';
    export const basicSetup: Extension;
    export const minimalSetup: Extension;
    export { EditorView } from '@codemirror/view';
    export { lineNumbers, closeBrackets };
}
declare module "livecodes/editor/codemirror/editor-languages" {
    import { LanguageSupport } from '@codemirror/language';
    import type { Language } from "livecodes/models";
    export const editorLanguages: Partial<{
        [key in Language]: () => Promise<LanguageSupport>;
    }>;
}
declare module "livecodes/editor/codemirror/extras" {
    export { indentationMarkers } from '@replit/codemirror-indentation-markers';
    export { vscodeKeymap } from '@replit/codemirror-vscode-keymap';
    export { colorPicker } from '@replit/codemirror-css-color-picker';
}
declare module "livecodes/editor/codemirror/codemirror" {
    import type { CodeEditor, EditorOptions } from "livecodes/models";
    export type CodeiumEditor = Pick<CodeEditor, 'getLanguage' | 'getValue'> & {
        editorId: EditorOptions['editorId'];
    };
    export const createEditor: (options: EditorOptions) => Promise<CodeEditor>;
}
declare module "livecodes/editor/codemirror/codemirror-codeium" {
    import type { CodeiumEditor } from "livecodes/editor/codemirror/codemirror";
    export const codeium: (editors: CodeiumEditor[], mapLanguage: (lang: string) => string) => import("@codemirror/state").Extension[];
}
declare module "livecodes/editor/codemirror/codemirror-core" {
    export * from '@codemirror/autocomplete';
    export * from '@codemirror/commands';
    export * from '@codemirror/language';
    export * from '@codemirror/lint';
    export * from '@codemirror/search';
    export * from '@codemirror/state';
    export * from '@codemirror/view';
    export type { TagSpec } from '@codemirror/lang-html';
    export { html, htmlCompletionSource, htmlCompletionSourceWith, htmlLanguage, } from '@codemirror/lang-html';
    export * from '@codemirror/lang-css';
    export * from '@codemirror/lang-javascript';
    export * from '@codemirror/lang-json';
    export * from '@codemirror/theme-one-dark';
    export * from '@lezer/common';
    export * from '@lezer/highlight';
    export * from '@lezer/lr';
}
declare module "livecodes/editor/codemirror/codemirror-emacs" {
    export { emacs } from '@replit/codemirror-emacs';
}
declare module "livecodes/editor/codemirror/codemirror-emmet" {
    export const emmet: import("@codemirror/state").Extension[];
}
declare module "livecodes/editor/codemirror/codemirror-vim" {
    export { vim } from '@replit/codemirror-vim';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-clojure" {
    export { clojure } from '@codemirror/legacy-modes/mode/clojure';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-coffeescript" {
    export { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-cpp" {
    export { cpp } from '@codemirror/lang-cpp';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-go" {
    export { go } from '@codemirror/legacy-modes/mode/go';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-json" {
    export * from '@codemirror/lang-json';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-julia" {
    export { julia } from '@codemirror/legacy-modes/mode/julia';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-less" {
    export { less } from '@codemirror/legacy-modes/mode/css';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-livescript" {
    export { liveScript } from '@codemirror/legacy-modes/mode/livescript';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-lua" {
    export { lua } from '@codemirror/legacy-modes/mode/lua';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-markdown" {
    export * from '@codemirror/lang-markdown';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-perl" {
    export { perl } from '@codemirror/legacy-modes/mode/perl';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-php" {
    export { php } from '@codemirror/lang-php';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-python" {
    export { python } from '@codemirror/lang-python';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-r" {
    export { r } from '@codemirror/legacy-modes/mode/r';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-ruby" {
    export { ruby } from '@codemirror/legacy-modes/mode/ruby';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-rust" {
    export { rust } from '@codemirror/legacy-modes/mode/rust';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-scheme" {
    export { scheme } from '@codemirror/legacy-modes/mode/scheme';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-scss" {
    export { sass } from '@codemirror/lang-sass';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-sql" {
    export { sql } from '@codemirror/lang-sql';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-stylus" {
    export { stylus } from '@codemirror/legacy-modes/mode/stylus';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-swift" {
    export { swift } from '@codemirror/legacy-modes/mode/swift';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-tcl" {
    export { tcl } from '@codemirror/legacy-modes/mode/tcl';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-vue" {
    export { vue } from '@codemirror/lang-vue';
}
declare module "livecodes/editor/codemirror/languages/codemirror-lang-wast" {
    export { wast } from '@codemirror/lang-wast';
}
declare module "livecodes/editor/monaco/twoslashSupport" {
    type TS = typeof import('typescript');
    export const extractTwoSlashCompilerOptions: (ts: TS) => (code: string) => any;
    export function parsePrimitive(value: string, type: string): any;
    export const twoslashCompletions: (ts: TS, _monaco: typeof import('monaco-editor')) => (model: import('monaco-editor').editor.ITextModel, position: import('monaco-editor').Position, _token: any) => import('monaco-editor').languages.CompletionList;
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
declare module "livecodes/editor/monaco/languages/monaco-lang-sql" {
    const _default_3: {
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
    export default _default_3;
}
declare module "livecodes/editor/monaco/languages/monaco-lang-wat" {
    const _default_4: {
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
    export default _default_4;
}
declare module "livecodes/formatter/format.worker" { }
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
declare module "livecodes/languages/haml/lang-haml-compiler" { }
declare module "livecodes/languages/handlebars/lang-handlebars-compiler" { }
declare module "livecodes/languages/imba/lang-imba-compiler" { }
declare module "livecodes/languages/julia/lang-julia-script" { }
declare module "livecodes/languages/lightningcss/processor-lightningcss-compiler" { }
declare module "livecodes/languages/liquid/lang-liquid-compiler" { }
declare const wasmoon: any;
declare module "livecodes/languages/malina/lang-malina-compiler" { }
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
declare module "livecodes/languages/tailwindcss/processor-tailwindcss-compiler" { }
declare module "livecodes/languages/tcl/lang-tcl-script" { }
declare module "livecodes/languages/teal/lang-teal-compiler" { }
declare module "livecodes/languages/twig/lang-twig-compiler" { }
declare module "livecodes/languages/unocss/processor-unocss-compiler" { }
declare module "livecodes/languages/vue/lang-vue-compiler" { }
declare module "livecodes/languages/vue2/lang-vue2-compiler" { }
declare module "livecodes/languages/wat/lang-wat-compiler" { }
declare module "livecodes/languages/wat/lang-wat-script" { }
declare module "livecodes/languages/windicss/processor-windicss-compiler" { }
declare module "livecodes/notifications/__tests__/create-notifications.spec" { }
declare module "livecodes/result/result-utils" { }
declare module "livecodes/result/__tests__/type-of.spec" { }
declare module "livecodes/services/firebase" {
    export { initializeApp, getApp } from 'firebase/app';
    export type { User as FirebaseUser } from 'firebase/auth';
    export { getAuth, signInWithPopup, signOut, GithubAuthProvider } from 'firebase/auth';
    export const firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
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
declare module "livecodes/templates/starter/imba-starter" {
    import type { Template } from "livecodes/models";
    export const imbaStarter: Template;
}
declare module "livecodes/templates/starter/jquery-starter" {
    import type { Template } from "livecodes/models";
    export const jqueryStarter: Template;
}
declare module "livecodes/templates/starter/knockout-starter" {
    import type { Template } from "livecodes/models";
    export const knockoutStarter: Template;
}
declare module "livecodes/templates/starter/livescript-starter" {
    import type { Template } from "livecodes/models";
    export const livescriptStarter: Template;
}
declare module "livecodes/templates/starter/lua-starter" {
    import type { Template } from "livecodes/models";
    export const luaStarter: Template;
}
declare module "livecodes/templates/starter/mdx-starter" {
    import type { Template } from "livecodes/models";
    export const mdxStarter: Template;
}
declare module "livecodes/templates/starter/perl-starter" {
    import type { Template } from "livecodes/models";
    export const perlStarter: Template;
}
declare module "livecodes/templates/starter/php-starter" {
    import type { Template } from "livecodes/models";
    export const phpStarter: Template;
}
declare module "livecodes/templates/starter/preact-starter" {
    import type { Template } from "livecodes/models";
    export const preactStarter: Template;
}
declare module "livecodes/templates/starter/python-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const pythonWasmStarter: Template;
}
declare module "livecodes/templates/starter/python-starter" {
    import type { Template } from "livecodes/models";
    export const pythonStarter: Template;
}
declare module "livecodes/templates/starter/react-native-starter" {
    import type { Template } from "livecodes/models";
    export const reactNativeStarter: Template;
}
declare module "livecodes/templates/starter/react-starter" {
    import type { Template } from "livecodes/models";
    export const reactStarter: Template;
}
declare module "livecodes/templates/starter/markdown-starter" {
    import type { Template } from "livecodes/models";
    export const markdownStarter: Template;
}
declare module "livecodes/templates/starter/rescript-starter" {
    import type { Template } from "livecodes/models";
    export const rescriptStarter: Template;
}
declare module "livecodes/templates/starter/reason-starter" {
    import type { Template } from "livecodes/models";
    export const reasonStarter: Template;
}
declare module "livecodes/templates/starter/ocaml-starter" {
    import type { Template } from "livecodes/models";
    export const ocamlStarter: Template;
}
declare module "livecodes/templates/starter/riot-starter" {
    import type { Template } from "livecodes/models";
    export const riotStarter: Template;
}
declare module "livecodes/templates/starter/ruby-starter" {
    import type { Template } from "livecodes/models";
    export const rubyStarter: Template;
}
declare module "livecodes/templates/starter/scheme-starter" {
    import type { Template } from "livecodes/models";
    export const schemeStarter: Template;
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
declare module "livecodes/templates/starter/malina-starter" {
    import type { Template } from "livecodes/models";
    export const malinaStarter: Template;
}
declare module "livecodes/templates/starter/julia-starter" {
    import type { Template } from "livecodes/models";
    export const juliaStarter: Template;
}
declare module "livecodes/templates/starter/tcl-starter" {
    import type { Template } from "livecodes/models";
    export const tclStarter: Template;
}
declare module "livecodes/templates/starter/prolog-starter" {
    import type { Template } from "livecodes/models";
    export const prologStarter: Template;
}
declare module "livecodes/templates/starter/jest-starter" {
    import type { Template } from "livecodes/models";
    export const jestStarter: Template;
}
declare module "livecodes/templates/starter/jest-react-starter" {
    import type { Template } from "livecodes/models";
    export const jestReactStarter: Template;
}
declare module "livecodes/templates/starter/javascript-starter" {
    import type { Template } from "livecodes/models";
    export const javascriptStarter: Template;
}
declare module "livecodes/templates/starter/r-starter" {
    import type { Template } from "livecodes/models";
    export const rStarter: Template;
}
declare module "livecodes/templates/starter/teal-starter" {
    import type { Template } from "livecodes/models";
    export const tealStarter: Template;
}
declare module "livecodes/templates/starter/ruby-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const rubyWasmStarter: Template;
}
declare module "livecodes/templates/starter/lua-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const luaWasmStarter: Template;
}
declare module "livecodes/templates/starter/php-wasm-starter" {
    import type { Template } from "livecodes/models";
    export const phpWasmStarter: Template;
}
declare module "livecodes/templates/starter/lit-starter" {
    import type { Template } from "livecodes/models";
    export const litStarter: Template;
}
declare module "livecodes/templates/starter/postgresql-starter" {
    import type { Template } from "livecodes/models";
    export const postgresqlStarter: Template;
}
declare module "livecodes/templates/starter/index" {
    export const starterTemplates: import("sdk/models").Template[];
}
declare module "livecodes/utils/__tests__/object-filter.spec" { }
declare module "livecodes/utils/__tests__/object-map.spec" { }
declare module "livecodes/utils/__tests__/utils.spec" { }
declare module "sdk/index" {
    import type { Code, Config, EmbedOptions, Language, Playground } from "sdk/models";
    export type { Code, Config, EmbedOptions, Language, Playground };
    export function createPlayground(container: string | HTMLElement, options?: EmbedOptions): Promise<Playground>;
    export function createPlayground(options: EmbedOptions & {
        view: 'headless';
    }): Promise<Playground>;
    export function getPlaygroundUrl(options?: EmbedOptions): string;
}
declare module "sdk/vue" {
    import type { DefineComponent, AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, ExtractPropTypes, RendererElement, RendererNode, VNode, VNodeProps } from '@vue/runtime-core';
    import type { Playground, EmbedOptions } from "sdk/models";
    export interface Props extends EmbedOptions {
        height?: string;
    }
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
