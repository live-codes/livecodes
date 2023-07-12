// eslint-disable-next-line import/no-internal-modules
import { defaultConfig } from '../config/default-config';
import type { FormatFn, FormatterConfig, Language, Parser } from '../models';
import { languages, parserPlugins, prettierUrl } from '../languages';
import type { FormatterMessage, FormatterMessageEvent } from './models';

const worker: Worker = self as any;
(self as any).window = self;
declare const prettierPlugins: { [key: string]: { parsers: any } };
declare const importScripts: (...args: string[]) => void;

let baseUrl: string;
const parsers: { [key: string]: Parser } = {};
const plugins: { [key: string]: any } = {};
const formatters: { [key: string]: FormatFn } = {};

const loadPrettier = () => {
  importScripts(prettierUrl);
};

const getParser = (language: Language): Parser | undefined => {
  const parser = languages.find((lang) => lang.name === language)?.parser;
  if (!parser) return undefined;
  if (parser.pluginUrls.find((url) => url.includes('babel'))) {
    return {
      ...parser,
      pluginUrls: Array.from(new Set([...parser.pluginUrls, parserPlugins.estree])),
    };
  }
  return parser;
};
const getFormatter = (language: Language) =>
  languages.find((lang) => lang.name === language)?.formatter;

const load = (languages: Language[]) => {
  try {
    languages.forEach((language) => {
      if (getParser(language) != null) {
        loadParser(language);
      } else if (getFormatter(language) != null) {
        loadFormatter(language);
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load formatter');
  }
};

function loadParser(language: Language): Parser | undefined {
  if (!(self as any).prettier) {
    loadPrettier();
  }
  if (language in parsers) {
    return parsers[language];
  }

  const parser = getParser(language);
  if (!parser) return;

  if (!(self as any).prettierPlugins) {
    (self as any).prettierPlugins = {};
  }
  parser.plugins = parser.pluginUrls
    .map((pluginUrl) => {
      if (plugins[pluginUrl]) return true;
      try {
        importScripts(pluginUrl);
        plugins[pluginUrl] = true;
        if (!prettierPlugins.pug && (self as any).pluginPug) {
          prettierPlugins.pug = (self as any).pluginPug;
        }
        return true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to load formatter for: ' + language);
        return false;
      }
    })
    .filter(Boolean);

  if (parser.plugins.length > 0) {
    parsers[language] = parser;
  }
  return parser;
}

const loadFormatter = (language: Language): FormatFn | undefined => {
  if (language in formatters) {
    return formatters[language];
  }

  const formatter = getFormatter(language);
  if (!formatter) return;

  formatters[language] = formatter.factory(baseUrl, language);
  return formatters[language];
};

const format = async (
  language: Language,
  value: string,
  cursorOffset: number,
  formatterConfig: Partial<FormatterConfig>,
): Promise<ReturnType<FormatFn>> => {
  const unFormatted = { formatted: value, cursorOffset };

  if (getParser(language) != null) {
    const parser = loadParser(language);
    const options = {
      useTabs: formatterConfig.useTabs ?? defaultConfig.useTabs,
      tabWidth: formatterConfig.tabSize ?? defaultConfig.tabSize,
      semi: formatterConfig.semicolons ?? defaultConfig.semicolons,
      singleQuote: formatterConfig.singleQuote ?? defaultConfig.singleQuote,
      trailingComma: formatterConfig.trailingComma === false ? 'none' : 'all',
    };
    return (
      (await (self as any).prettier.formatWithCursor(value, {
        parser: parser?.name,
        plugins: prettierPlugins,
        cursorOffset,
        ...options,
      })) || unFormatted
    );
  }
  if (getFormatter(language) != null) {
    const formatFn = loadFormatter(language);
    const result = await formatFn?.(value, cursorOffset);
    return result || unFormatted;
  }
  return unFormatted;
};

worker.addEventListener(
  'message',
  async (event: FormatterMessageEvent) => {
    const message = event.data;

    if (message.type === 'init') {
      baseUrl = message.baseUrl;
    }

    if (message.type === 'load') {
      const languages = message.payload;
      load(languages);
    }

    if (message.type === 'format') {
      const { language, value, cursorOffset, formatterConfig } = message.payload;
      try {
        const formatResult = await format(language, value, cursorOffset, formatterConfig);
        const formattedMessage: FormatterMessage = {
          type: 'formatted',
          payload: {
            language,
            value,
            cursorOffset,
            formatted: formatResult.formatted,
            formattedCursorOffset: formatResult.cursorOffset,
          },
        };
        worker.postMessage(formattedMessage);
      } catch (error: any) {
        const formatFailedMessage: FormatterMessage = {
          type: 'format-failed',
          payload: { language, value, cursorOffset, error: error.message },
        };
        worker.postMessage(formatFailedMessage);
      }
    }
  },
  false,
);
