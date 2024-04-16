import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { Editor, Config, ToolsPaneStatus, EditorId, Tool } from '../models';
import { removeDuplicates } from '../utils';
import { defaultConfig } from './default-config';

export const validateConfig = (config: Partial<Config>): Partial<Config> => {
  type types = 'array' | 'boolean' | 'object' | 'number' | 'string' | 'undefined';
  const is = (x: any, type: types, arrayType?: types): boolean => {
    if (type === 'array') {
      if (!Array.isArray(x)) return false;
      if (arrayType) {
        return x.filter((l) => is(l, arrayType)).length > 0;
      }
      return true;
    }
    if (type === 'object') {
      return x && typeof x === type;
    }
    if (type === 'number' && !isNaN(Number(x))) {
      return true;
    }
    return typeof x === type;
  };

  const includes = (arr: any[], x: any) => x != null && arr.includes(x);

  const modes: Array<Config['mode']> = ['full', 'focus', 'simple', 'editor', 'codeblock', 'result'];
  const themes: Array<Config['theme']> = ['light', 'dark'];
  const layout: Array<Config['layout']> = ['responsive', 'horizontal', 'vertical'];
  const editorModes: Array<Config['editorMode']> = ['vim', 'emacs'];
  const tools: Array<Tool['name']> = ['console', 'compiled', 'tests'];
  const toolsPaneStatus: ToolsPaneStatus[] = ['', 'full', 'closed', 'open', 'none'];
  const editors: Array<Config['editor']> = ['monaco', 'codemirror', 'codejar'];
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const zoomLevels: Array<Config['zoom']> = [1, 0.5, 0.25];

  const isEditor = (x: any) =>
    is(x, 'object') &&
    (is(x.language, 'string') ||
      is(x.content, 'string') ||
      is(x.contentUrl, 'string') ||
      is(x.hiddenContent, 'string') ||
      is(x.hiddenContentUrl, 'string'));

  const validateEditorProps = (x: Editor, editorId: EditorId): Editor => ({
    language:
      getLanguageEditorId(x.language) === editorId
        ? getLanguageByAlias(x.language) || defaultConfig[editorId].language
        : defaultConfig[editorId].language,
    ...(is(x.content, 'string') ? { content: x.content } : {}),
    ...(is(x.contentUrl, 'string') ? { contentUrl: x.contentUrl } : {}),
    ...(is(x.hiddenContent, 'string') ? { hiddenContent: x.hiddenContent } : {}),
    ...(is(x.hiddenContentUrl, 'string') ? { hiddenContentUrl: x.hiddenContentUrl } : {}),
    ...(is(x.selector, 'string') ? { selector: x.selector } : {}),
    ...(is(x.position, 'object') ? { position: x.position } : {}),
  });

  const validateTestsProps = (x: Partial<Config['tests']>): Partial<Config['tests']> => ({
    ...(x && is(x.language, 'string') ? { language: x.language } : {}),
    ...(x && is(x.content, 'string') ? { content: x.content } : {}),
    ...(x && is(x.contentUrl, 'string') ? { contentUrl: x.contentUrl } : {}),
    ...(x && is(x.hiddenContent, 'string') ? { hiddenContent: x.hiddenContent } : {}),
    ...(x && is(x.hiddenContentUrl, 'string') ? { hiddenContentUrl: x.hiddenContentUrl } : {}),
    ...(x && is(x.selector, 'string') ? { selector: x.selector } : {}),
    ...(x && is(x.position, 'object') ? { position: x.position } : {}),
  });

  const validateToolsProps = (x: Config['tools']): Config['tools'] => ({
    ...defaultConfig.tools,
    ...(x && Array.isArray(x.enabled)
      ? { enabled: x.enabled.filter((t) => tools.includes(t)) }
      : {
          ...(x && x.enabled == null && x.status === 'none'
            ? { enabled: [] }
            : { enabled: defaultConfig.tools.enabled }),
        }),
    ...(x &&
    x.active != null &&
    includes(tools, x.active) &&
    (typeof x.enabled === 'string' ||
      x.enabled == null ||
      (Array.isArray(x.enabled) && includes(x.enabled, x.active)))
      ? { active: x.active }
      : { active: defaultConfig.tools.active }),
    ...(x && x.status != null && includes(toolsPaneStatus, x.status)
      ? { status: x.status }
      : { status: defaultConfig.tools.status }),
  });

  return {
    ...(is(config.title, 'string') ? { title: config.title } : {}),
    ...(is(config.description, 'string') ? { description: config.description } : {}),
    ...(is(config.head, 'string') ? { head: config.head } : {}),
    ...(is(config.htmlAttrs, 'string') || is(config.htmlAttrs, 'object')
      ? { htmlAttrs: config.htmlAttrs }
      : {}),
    ...(is(config.tags, 'array', 'string') ? { tags: removeDuplicates(config.tags) } : {}),
    ...(is(config.autoupdate, 'boolean') ? { autoupdate: config.autoupdate } : {}),
    ...(is(config.autosave, 'boolean') ? { autosave: config.autosave } : {}),
    ...(is(config.autotest, 'boolean') ? { autotest: config.autotest } : {}),
    ...(is(config.delay, 'number') ? { delay: Number(config.delay) } : {}),
    ...(is(config.formatOnsave, 'boolean') ? { formatOnsave: config.formatOnsave } : {}),
    ...(includes(modes, config.mode) ? { mode: config.mode } : {}),
    ...(includes(themes, config.theme) ? { theme: config.theme } : {}),
    ...(includes(layout, config.layout) ? { layout: config.layout } : {}),
    ...(is(config.editorTheme, 'array', 'string') || is(config.editorTheme, 'string')
      ? { editorTheme: config.editorTheme }
      : {}),
    ...(is(config.recoverUnsaved, 'boolean') ? { recoverUnsaved: config.recoverUnsaved } : {}),
    ...(is(config.welcome, 'boolean') ? { welcome: config.welcome } : {}),
    ...(is(config.showSpacing, 'boolean') ? { showSpacing: config.showSpacing } : {}),
    ...(is(config.readonly, 'boolean') ? { readonly: config.readonly } : {}),
    ...(is(config.allowLangChange, 'boolean') ? { allowLangChange: config.allowLangChange } : {}),
    ...(includes(editorIds, config.activeEditor) ? { activeEditor: config.activeEditor } : {}),
    ...(is(config.languages, 'array', 'string')
      ? { languages: removeDuplicates(config.languages) }
      : {}),
    ...(isEditor(config.markup)
      ? { markup: validateEditorProps(config.markup as Editor, 'markup') }
      : {}),
    ...(isEditor(config.style)
      ? { style: validateEditorProps(config.style as Editor, 'style') }
      : {}),
    ...(isEditor(config.script)
      ? { script: validateEditorProps(config.script as Editor, 'script') }
      : {}),
    ...(is(config.tools, 'object')
      ? { tools: validateToolsProps(config.tools as Config['tools']) }
      : {}),
    ...(is(config.tests, 'object')
      ? { tests: validateTestsProps(config.tests as Partial<Editor>) }
      : {}),
    ...(includes(zoomLevels, Number(config.zoom))
      ? { zoom: Number(config.zoom) as Config['zoom'] }
      : {}),
    ...(is(config.stylesheets, 'array', 'string')
      ? { stylesheets: removeDuplicates(config.stylesheets) }
      : {}),
    ...(is(config.scripts, 'array', 'string') ? { scripts: removeDuplicates(config.scripts) } : {}),
    ...(is(config.cssPreset, 'string') ? { cssPreset: config.cssPreset } : {}),
    ...(is(config.processors, 'array', 'string')
      ? { processors: removeDuplicates(config.processors) }
      : {}),
    ...(is(config.customSettings, 'object') ? { customSettings: config.customSettings } : {}),
    ...(includes(editors, config.editor) ? { editor: config.editor } : {}),
    ...(is(config.fontFamily, 'string') ? { fontFamily: config.fontFamily } : {}),
    ...(is(config.fontSize, 'number') ? { fontSize: Number(config.fontSize) } : {}),
    ...(is(config.useTabs, 'boolean') ? { useTabs: config.useTabs } : {}),
    ...(is(config.tabSize, 'number') ? { tabSize: Number(config.tabSize) } : {}),
    ...(is(config.lineNumbers, 'boolean') ? { lineNumbers: config.lineNumbers } : {}),
    ...(is(config.wordWrap, 'boolean') ? { wordWrap: config.wordWrap } : {}),
    ...(is(config.closeBrackets, 'boolean') ? { closeBrackets: config.closeBrackets } : {}),
    ...(is(config.semicolons, 'boolean') ? { semicolons: config.semicolons } : {}),
    ...(is(config.singleQuote, 'boolean') ? { singleQuote: config.singleQuote } : {}),
    ...(is(config.trailingComma, 'boolean') ? { trailingComma: config.trailingComma } : {}),
    ...(is(config.emmet, 'boolean') ? { emmet: config.emmet } : {}),
    ...(is(config.enableAI, 'boolean') ? { enableAI: config.enableAI } : {}),
    ...(includes(editorModes, config.editorMode) ? { editorMode: config.editorMode } : {}),
    ...(is(config.imports, 'object') ? { imports: config.imports } : {}),
    ...(is(config.types, 'object') ? { types: config.types } : {}),
    ...(is(config.version, 'string') ? { version: config.version } : {}),
  };
};
