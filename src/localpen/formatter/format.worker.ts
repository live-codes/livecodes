import { Language, Parser } from '../models';
import { languages } from '../languages';
import { FormatterMessage, FormatterMessageEvent } from './models';

const worker: Worker = self as any;
(self as any).window = self;
declare const prettier: any;
declare const prettierPlugins: { [key: string]: { parsers: any } };
declare const importScripts: (...args: string[]) => void;

let baseUrl: string;
const parsers: { [key: string]: Parser } = {};
const plugins: { [key: string]: any } = {};

const loadPrettier = () => {
  importScripts(baseUrl + 'vendor/prettier/standalone.js');
};
const load = (languages: Language[]) => {
  try {
    loadPrettier();
    languages.forEach((language) => loadParser(language));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load prettier');
  }
};

function loadParser(language: Language): Parser | undefined {
  if (!prettier) {
    loadPrettier();
  }
  if (language in parsers) {
    return parsers[language];
  }

  const parser = languages.find((lang) => lang.name === language)?.parser;
  if (!parser) return;

  if (!(self as any).prettierPlugins) {
    (self as any).prettierPlugins = {};
  }
  parser.plugins = parser.pluginUrls
    .map((pluginUrl) => {
      if (plugins[pluginUrl]) return true;
      try {
        importScripts(baseUrl + pluginUrl);
        plugins[pluginUrl] = true;
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

const format = (language: Language, value: string, cursorOffset: number) => {
  const parser = loadParser(language);
  return prettier.formatWithCursor(value, {
    parser: parser?.name,
    plugins: prettierPlugins,
    cursorOffset,
  });
};

worker.addEventListener(
  'message',
  (event: FormatterMessageEvent) => {
    const message = event.data;

    if (message.type === 'init') {
      const config = message.payload;
      baseUrl = config.baseUrl;
    }

    if (message.type === 'load') {
      const languages = message.payload;
      load(languages);
    }

    if (message.type === 'format') {
      const { language, value, cursorOffset } = message.payload;
      try {
        const formatResult = format(language, value, cursorOffset);
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
