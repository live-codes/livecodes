import { FormatFn, Language, Parser, Pen } from './models';
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

  const format = async (editor: CodeEditor, language: Language) => {
    const parser = await loadParser(language);
    if (!parser) return;

    const formatFn: FormatFn = (value: string, cursorOffset: number) =>
      prettier.formatWithCursor(value, {
        parser: parser.name,
        plugins: parser.plugins,
        cursorOffset,
      });

    editor.format(formatFn);
  };

  return {
    load,
    loadParser,
    format,
  };
};
