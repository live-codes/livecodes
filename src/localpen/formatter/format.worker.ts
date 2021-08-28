import { FormatFn, Language, Parser } from '../models';
import { languages, prettierUrl } from '../languages';
import { getAbsoluteUrl } from '../utils';
import { FormatterMessage, FormatterMessageEvent } from './models';

const worker: Worker = self as any;
(self as any).window = self;
declare const prettierPlugins: { [key: string]: { parsers: any } };
declare const importScripts: (...args: string[]) => void;

let baseUrl: string;
const parsers: { [key: string]: Parser } = {};
const plugins: { [key: string]: any } = {};
const formatters: { [key: string]: FormatFn } = {};

const loadPrettier = () => {
  importScripts(getAbsoluteUrl(prettierUrl, baseUrl));
};

const getParser = (language: Language) => languages.find((lang) => lang.name === language)?.parser;
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
    console.warn('Failed to load prettier');
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
      const url = getAbsoluteUrl(pluginUrl, baseUrl);
      if (plugins[url]) return true;
      try {
        importScripts(url);
        plugins[url] = true;
        if (!prettierPlugins.pug && (self as any).pluginPug) {
          prettierPlugins.pug = (self as any).pluginPug;
        }
        return true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to load prettier parser for language: ' + language);
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
): Promise<ReturnType<FormatFn>> => {
  const unFormatted = {
    formatted: value,
    cursorOffset,
  };

  if (getParser(language) != null) {
    const parser = loadParser(language);
    return (
      (self as any).prettier.formatWithCursor(value, {
        parser: parser?.name,
        plugins: prettierPlugins,
        cursorOffset,
      }) || unFormatted
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
      const { language, value, cursorOffset } = message.payload;
      try {
        const formatResult = await format(language, value, cursorOffset);
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
      } catch (error) {
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
