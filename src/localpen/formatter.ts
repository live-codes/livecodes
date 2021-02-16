import { Language, Parser, Pen } from './models';
import { languages } from './languages';
import { CodeEditor } from './editor';

export const createFormatter = (config: Pen) => {
  const baseUrl = config.baseUrl;
  const prettierPath = baseUrl + 'vendor/prettier/standalone.mjs';

  let prettier: any;
  const parsers: { [key: string]: Parser } = {};
  const plugins: { [key: string]: any } = {};

  const load = async (languages: Language[]) => {
    try {
      prettier = (await import(prettierPath)).default;
      languages.forEach((language) => loadParser(language));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load prettier');
    }
  };

  async function loadParser(language: Language): Promise<Parser | undefined> {
    if (!prettier) {
      await load([language]);
    }
    if (language in parsers) {
      return parsers[language];
    }

    const parser = languages.find((lang) => lang.name === language)?.parser;
    if (!parser) return;

    parser.plugins = (
      await Promise.all(
        parser.pluginUrls.map(async (pluginUrl) => {
          try {
            const pluginModule = plugins[pluginUrl] || (await import(baseUrl + pluginUrl)).default;
            plugins[pluginUrl] = pluginModule;
            return pluginModule;
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Failed to load prettier parser for language: ' + language);
          }
        }),
      )
    ).filter(Boolean);

    if (parser.plugins.length > 0) {
      parsers[language] = parser;
    }
    return parser;
  }

  const computeOffset = (code: string, pos: any) => {
    let line = 1;
    let col = 1;
    let offset = 0;
    while (offset < code.length) {
      if (line === pos.lineNumber && col === pos.column) return offset;
      if (code[offset] === '\n') {
        line++;
        col = 1;
      } else col++;
      offset++;
    }
    return -1;
  };

  const computePosition = (code: string, offset: number) => {
    let line = 1;
    let col = 1;
    let char = 0;
    while (char < offset) {
      if (code[char] === '\n') {
        line++;
        col = 1;
      } else col++;
      char++;
    }
    return { lineNumber: line, column: col };
  };

  const format = async (editor: CodeEditor, language: Language) => {
    const global = window as any;
    if (editor.monaco && global.monaco) {
      const val = editor.getValue();
      const pos = editor.monaco.getPosition();
      const parser = await loadParser(language);
      if (!parser) return;
      const prettyVal = prettier.formatWithCursor(val, {
        parser: parser.name,
        plugins: parser.plugins,
        cursorOffset: computeOffset(val, pos),
      });
      editor.monaco.executeEdits('prettier', [
        {
          identifier: 'delete',
          range: editor.monaco.getModel().getFullModelRange(),
          text: '',
          forceMoveMarkers: true,
        },
      ]);
      editor.monaco.executeEdits('prettier', [
        {
          identifier: 'insert',
          range: new global.monaco.Range(1, 1, 1, 1),
          text: prettyVal.formatted,
          forceMoveMarkers: true,
        },
      ]);
      editor.monaco.setSelection(new global.monaco.Range(0, 0, 0, 0));
      editor.monaco.setPosition(computePosition(prettyVal.formatted, prettyVal.cursorOffset));
    }
  };

  return {
    load,
    loadParser,
    format,
  };
};
