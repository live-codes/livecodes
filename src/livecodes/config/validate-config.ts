import { Editor, Config, ToolsPaneStatus, EditorId, Tool } from '../models';
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
    return typeof x === type;
  };

  const includes = (arr: any[], x: any) => x != null && arr.includes(x);

  const modes: Array<Config['mode']> = ['full', 'editor', 'codeblock', 'result'];
  const themes: Array<Config['theme']> = ['light', 'dark'];
  const tools: Array<Tool['name']> = ['console', 'compiled', 'tests'];
  const toolsPaneStatus: ToolsPaneStatus[] = ['', 'full', 'closed', 'open', 'none'];
  const editors: Array<Config['editor']> = ['monaco', 'codemirror', 'codejar', ''];
  const editorIds: EditorId[] = ['markup', 'style', 'script'];

  const isEditor = (x: any) => is(x, 'object') && is(x.language, 'string');
  const validateEditorProps = (x: Editor): Editor => ({
    language: x.language,
    ...(is(x.content, 'string') ? { content: x.content } : {}),
    ...(is(x.contentUrl, 'string') ? { contentUrl: x.contentUrl } : {}),
    ...(is(x.selector, 'string') ? { selector: x.selector } : {}),
  });

  const validateTestsProps = (x: Partial<Config['tests']>): Partial<Config['tests']> => ({
    ...(x && is(x.language, 'string') ? { language: x.language } : {}),
    ...(x && is(x.content, 'string') ? { content: x.content } : {}),
    ...(x && is(x.contentUrl, 'string') ? { contentUrl: x.contentUrl } : {}),
    ...(x && is(x.selector, 'string') ? { selector: x.selector } : {}),
  });

  const validateToolsProps = (x: Partial<Config['tools']>): Config['tools'] => ({
    ...defaultConfig.tools,
    ...(x && (x.enabled === 'all' || x.enabled?.every((t) => includes(tools, t)))
      ? { enabled: x.enabled }
      : {}),
    ...(x &&
    includes(tools, x.active) &&
    (x.enabled === 'all' ||
      !x.enabled ||
      (Array.isArray(x.enabled) && includes(x.enabled, x.active)))
      ? { active: x.active }
      : {}),
    ...(x && includes(toolsPaneStatus, x.status) ? { status: x.status } : {}),
  });

  const isProcessors = (x: any) => is(x, 'object') && is(x.postcss, 'object');
  const validateProcessors = (x: any): Config['processors'] => ({
    postcss: {
      ...x.postcss,
      ...(is(x.postcss?.tailwindcss, 'boolean')
        ? { tailwindcss: x.postcss.tailwindcss }
        : { tailwindcss: defaultConfig.processors.postcss.tailwindcss }),
      ...(is(x.postcss?.windicss, 'boolean')
        ? { windicss: x.postcss.windicss }
        : { windicss: defaultConfig.processors.postcss.windicss }),
      ...(is(x.postcss?.autoprefixer, 'boolean')
        ? { autoprefixer: x.postcss.autoprefixer }
        : { autoprefixer: defaultConfig.processors.postcss.autoprefixer }),
      ...(is(x.postcss?.postcssPresetEnv, 'boolean')
        ? { postcssPresetEnv: x.postcss.postcssPresetEnv }
        : { postcssPresetEnv: defaultConfig.processors.postcss.postcssPresetEnv }),
    },
  });

  return {
    ...(is(config.title, 'string') ? { title: config.title } : {}),
    ...(is(config.description, 'string') ? { description: config.description } : {}),
    ...(is(config.tags, 'array', 'string') ? { tags: config.tags } : {}),
    ...(is(config.autoupdate, 'boolean') ? { autoupdate: config.autoupdate } : {}),
    ...(is(config.autosave, 'boolean') ? { autosave: config.autosave } : {}),
    ...(is(config.delay, 'number') ? { delay: config.delay } : {}),
    ...(is(config.formatOnsave, 'boolean') ? { formatOnsave: config.formatOnsave } : {}),
    ...(is(config.emmet, 'boolean') ? { emmet: config.emmet } : {}),
    ...(includes(modes, config.mode) ? { mode: config.mode } : {}),
    ...(includes(themes, config.theme) ? { theme: config.theme } : {}),
    ...(is(config.enableRestore, 'boolean') ? { enableRestore: config.enableRestore } : {}),
    ...(is(config.showSpacing, 'boolean') ? { showSpacing: config.showSpacing } : {}),
    ...(is(config.readonly, 'boolean') ? { readonly: config.readonly } : {}),
    ...(is(config.allowLangChange, 'boolean') ? { allowLangChange: config.allowLangChange } : {}),
    ...(includes(editorIds, config.activeEditor) ? { activeEditor: config.activeEditor } : {}),
    ...(is(config.languages, 'array', 'string') ? { languages: config.languages } : {}),
    ...(isEditor(config.markup) ? { markup: validateEditorProps(config.markup as Editor) } : {}),
    ...(isEditor(config.style) ? { style: validateEditorProps(config.style as Editor) } : {}),
    ...(isEditor(config.script) ? { script: validateEditorProps(config.script as Editor) } : {}),
    ...(is(config.tools, 'object')
      ? { tools: validateToolsProps(config.tools as Config['tools']) }
      : {}),
    ...(is(config.tests, 'object')
      ? { tests: validateTestsProps(config.tests as Partial<Editor>) }
      : {}),
    ...(is(config.stylesheets, 'array', 'string') ? { stylesheets: config.stylesheets } : {}),
    ...(is(config.scripts, 'array', 'string') ? { scripts: config.scripts } : {}),
    ...(is(config.cssPreset, 'string') ? { cssPreset: config.cssPreset } : {}),
    ...(isProcessors(config.processors)
      ? { processors: validateProcessors(config.processors) }
      : {}),
    ...(is(config.customSettings, 'object') ? { customSettings: config.customSettings } : {}),
    ...(includes(editors, config.editor) ? { editor: config.editor } : {}),
    ...(is(config.imports, 'object') ? { imports: config.imports } : {}),
    ...(is(config.types, 'object') ? { types: config.types } : {}),
    ...(is(config.version, 'string') ? { version: config.version } : {}),
    ...(is(config.showVersion, 'boolean') ? { showVersion: config.showVersion } : {}),
  };
};
