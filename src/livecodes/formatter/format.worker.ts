import { defaultConfig } from '../config/default-config';
import { languages, parserPlugins, prettierUrl } from '../languages';
import type { FormatFn, FormatterConfig, Language, PrettierParser } from '../models';
import type { FormatterMessage, FormatterMessageEvent } from './models';

const worker: Worker = self as any;
(self as any).window = self;
declare const prettierPlugins: { [key: string]: { parsers: any } };
declare const importScripts: (...args: string[]) => void;

let baseUrl: string;
const parsers: { [key: string]: Promise<PrettierParser> } = {};
const plugins: { [key: string]: any } = {};
const formatters: { [key: string]: Promise<FormatFn> } = {};

const loadPrettier = () => {
  importScripts(prettierUrl);
};

const getParser = (
  language: Language,
): PrettierParser | (() => PrettierParser | Promise<PrettierParser>) | undefined => {
  const formatter = languages.find((lang) => lang.name === language)?.formatter;
  if (!formatter || !('prettier' in formatter)) return;
  const parser = formatter.prettier;
  if (!parser) return;
  if (typeof parser === 'function') return parser;
  if (parser.pluginUrls?.find((url) => url.includes('babel'))) {
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
  languages.forEach((language) => {
    if (getParser(language) != null) {
      loadParser(language).catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Failed to load formatter for: ' + language);
      });
    } else if (getFormatter(language) != null) {
      loadFormatter(language).catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Failed to load formatter for: ' + language);
      });
    }
  });
};

const loadParser = async (language: Language): Promise<PrettierParser | undefined> => {
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

  let parserPromise: Promise<PrettierParser> | undefined;

  if (typeof parser === 'function') {
    parserPromise = Promise.resolve(parser());
  } else if (parser.pluginUrls && parser.pluginUrls.length > 0) {
    parser.plugins = parser.pluginUrls
      .map((pluginUrl) => {
        if (plugins[pluginUrl]) return true;
        try {
          importScripts(pluginUrl);
          plugins[pluginUrl] = true;
          return true;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Failed to load formatter for: ' + language);
          return false;
        }
      })
      .filter(Boolean);
    parserPromise = Promise.resolve(parser);
  }

  if (!parserPromise) return;
  parsers[language] = parserPromise;
  try {
    return await parsers[language];
  } catch (error) {
    delete parsers[language];
    throw error;
  }
};

const loadFormatter = async (language: Language): Promise<FormatFn | undefined> => {
  if (language in formatters) {
    return formatters[language];
  }

  const formatter = getFormatter(language);
  if (!formatter || !('factory' in formatter)) return;

  formatters[language] = Promise.resolve(formatter.factory(baseUrl, language));
  try {
    return await formatters[language];
  } catch (error) {
    delete formatters[language];
    throw error;
  }
};

const format = async (
  language: Language,
  value: string,
  cursorOffset: number,
  formatterConfig: Partial<FormatterConfig>,
): Promise<ReturnType<FormatFn>> => {
  const unFormatted = { formatted: value, cursorOffset };

  if (getParser(language) != null) {
    const parser = await loadParser(language);
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
    const formatFn = await loadFormatter(language);
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
