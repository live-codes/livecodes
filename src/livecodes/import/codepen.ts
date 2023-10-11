import { detectLanguage, getLanguageByAlias } from '../languages';
import type { Config, EditorId, Language } from '../models';
import { hostPatterns } from './check-src';

const languages: { [key in EditorId]: Language[] } = {
  markup: ['html', 'markdown', 'haml'],
  style: ['css', 'scss', 'sass', 'less', 'stylus'],
  script: ['javascript', 'typescript', 'coffeescript', 'livescript'],
};

const getCode = async (url: string, editor: EditorId) => {
  const [_, penUser, penId] = new RegExp(hostPatterns.codepen).exec(url) || [];
  if (!penUser || !penId) return {};
  const penUrl = `https://codepen.io/${penUser}/pen/${penId}`;

  const srcExtension = languages[editor][1];
  let compiledExtension = languages[editor][0];
  if (compiledExtension === 'javascript') {
    compiledExtension = 'js';
  }
  const [src, compiled] = await Promise.all(
    [`${penUrl}.${srcExtension}`, `${penUrl}.${compiledExtension}`].map((pageUrl) =>
      fetch(pageUrl).then((res) => res.text()),
    ),
  );
  const result = await detectLanguage(src, languages[editor]);
  const language =
    src.trim() !== compiled.trim() && result.language === languages[editor][0]
      ? result.secondBest
      : result.language;
  return {
    language,
    code: src,
  };
};

export const importFromCodepen = async (url: string): Promise<Partial<Config>> => {
  try {
    const editorIds: EditorId[] = ['markup', 'style', 'script'];
    const [markup, style, script] = await Promise.all(
      editorIds.map((editor) => getCode(url, editor)),
    );

    return {
      markup: {
        language: getLanguageByAlias(markup.language) || 'html',
        content: markup.code || '',
      },
      style: {
        language: getLanguageByAlias(style.language) || 'css',
        content: style.code || '',
      },
      script: {
        language: getLanguageByAlias(script.language) || 'javascript',
        content: script.code || '',
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch: ' + url);
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};
