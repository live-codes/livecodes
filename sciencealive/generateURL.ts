import { getPlaygroundUrl } from 'livecodes';
import type { Config } from 'livecodes';


const SA_defaultConfig: Partial<Config> = {
    //Content
    title: 'Untitled',
    description: '',
    tags: [],
    activeEditor: undefined,
    languages: undefined,
    markup: {
        language: 'html',
        content: '',
    },
    style: {
        language: 'css',
        content: '',
    },
    script: {
        language: 'javascript',
        content: '',
    },

    //Config
    autoupdate: false,
    autosave: true,
    view: 'split',
    mode: 'focus',
    theme: 'dark',
    themeColor: undefined,
    recoverUnsaved: true,
    welcome: false,
    readonly: false,
    allowLangChange: false,
    
    //Advanced
    head: `<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    htmlAttrs: 'lang="en" class=""',
    autotest: false,
    delay: 1500,
    formatOnsave: false,
    layout: 'responsive',
    editorTheme: undefined,
    appLanguage: undefined,
    showSpacing: false,
    stylesheets: [],
    scripts: [],
    cssPreset: '',
    imports: {},
    types: {},
    tests: {
        language: 'typescript',
        content: '',
    },
    tools: {
        enabled: ['console'],
        active: 'console',
        status: 'open',
    },
    zoom: 1,
    processors: [],
    customSettings: {},
    editor: undefined,
    fontFamily: undefined,
    fontSize: undefined,
    useTabs: false,
    tabSize: 4,
    lineNumbers: true,
    wordWrap: false,
    closeBrackets: true,
    foldRegions: false,
    semicolons: true,
    singleQuote: false,
    trailingComma: true,
    emmet: true,
    editorMode: undefined,
};


let url = getPlaygroundUrl({
    appUrl: 'http://localhost:8080',
    config: SA_defaultConfig,
});

console.log(url);