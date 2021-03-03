import Prettier from 'prettier'; // for typescript types only

import { Language, Parser } from '../models';
import { languages } from '../languages';
import { FormatterMessage, FormatterMessageEvent } from './models';

const worker: Worker = self as any;

let baseUrl: string;
let prettier: typeof Prettier;
const parsers: { [key: string]: Parser } = {};
const plugins: { [key: string]: any } = {};

const load = async (languages: Language[]) => {
  try {
    prettier = prettier || (await import(baseUrl + 'vendor/prettier/standalone.mjs')).default;
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

const format = async (language: Language, value: string, cursorOffset: number) => {
  const parser = await loadParser(language);
  return prettier.formatWithCursor(value, {
    parser: parser?.name,
    plugins: parser?.plugins,
    cursorOffset,
  });
};

worker.addEventListener(
  'message',
  async (event: FormatterMessageEvent) => {
    const message = event.data;

    if (message.type === 'init') {
      const config = message.payload;
      baseUrl = config.baseUrl;
    }

    if (message.type === 'load') {
      const languages = message.payload;
      await load(languages);
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
