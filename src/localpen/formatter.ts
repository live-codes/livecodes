import { monaco } from './monaco';
import { Language, Parser, Pen } from './models';

export const createFormatter = (config: Pen) => {
  const { baseUrl } = config;
  const prettierPath = baseUrl + '/vendor/prettier';

  let prettier: any;

  const load = async (languages: Language[]) => {
    try {
      prettier = (await import(`${prettierPath}/standalone.mjs`)).default;
      languages.forEach((language) => getParser(language));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load prettier');
    }
  };

  const parsers: { [key: string]: Parser } = {};
  const getParser = async (language: Language): Promise<Parser | null> => {
    if (!prettier) {
      await load([language]);
    }
    if (language in parsers) {
      return parsers[language];
    }
    let parser: Parser | null;
    try {
      if (language === 'html') {
        parser = {
          name: 'html',
          plugin: (await import(`${prettierPath}/parser-html.mjs`)).default,
        };
      } else if (language === 'markdown') {
        parser = {
          name: 'markdown',
          plugin: (await import(`${prettierPath}/parser-markdown.mjs`)).default,
        };
      } else if (language === 'css') {
        parser = {
          name: 'css',
          plugin: (await import(`${prettierPath}/parser-postcss.mjs`)).default,
        };
      } else if (language === 'scss') {
        parser = {
          name: 'scss',
          plugin: (await import(`${prettierPath}/parser-postcss.mjs`)).default,
        };
      } else if (language === 'less') {
        parser = {
          name: 'less',
          plugin: (await import(`${prettierPath}/parser-postcss.mjs`)).default,
        };
      } else if (language === 'pug') {
        parser = null;
      } else {
        parser = {
          name: 'babel',
          plugin: (await import(`${prettierPath}/parser-babel.mjs`)).default,
        };
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load prettier parser for language: ' + language);
      parser = null;
    }
    if (parser) {
      parsers[language] = parser;
    }
    return parser;
  };

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

  const format = async (editor: any, language: Language) => {
    const val = editor.getValue();
    const pos = editor.getPosition();

    const parser = await getParser(language);
    if (!parser) return;

    const prettyVal = prettier.formatWithCursor(val, {
      parser: parser.name,
      plugins: [parser.plugin],
      cursorOffset: computeOffset(val, pos),
    });

    editor.executeEdits('prettier', [
      {
        identifier: 'delete',
        range: editor.getModel().getFullModelRange(),
        text: '',
        forceMoveMarkers: true,
      },
    ]);

    editor.executeEdits('prettier', [
      {
        identifier: 'insert',
        range: new monaco.Range(1, 1, 1, 1),
        text: prettyVal.formatted,
        forceMoveMarkers: true,
      },
    ]);

    editor.setSelection(new monaco.Range(0, 0, 0, 0));
    editor.setPosition(computePosition(prettyVal.formatted, prettyVal.cursorOffset));
  };

  return {
    load,
    loadParser: (language: Language) => getParser(language),
    format,
  };
};
