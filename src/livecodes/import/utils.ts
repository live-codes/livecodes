import { languages, getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { EditorId, Language, Config } from '../models';

export interface SourceFile {
  filename: string;
  content: string;
  language?: Language;
  editorId?: EditorId;
}

export const populateConfig = (
  files: SourceFile[],
  params: { [key: string]: string },
): Partial<Config> => {
  if (files.length === 0) return {};

  const configFile = files.find((file) => file?.filename.toLowerCase() === 'livecodes.json');
  if (configFile) {
    try {
      return JSON.parse(configFile.content);
    } catch {
      // invalid JSON
    }
  }

  // select files in query params (e.g. ?files=index.html,script.js)
  const filesInParams = params.files;
  if (filesInParams) {
    return filesInParams
      .split(',')
      .map((filename) => filename.trim())
      .reduce((output: Partial<Config>, filename: string) => {
        const extension = filename.split('.')[filename.split('.').length - 1];
        const language = getLanguageByAlias(extension);
        if (!language) return output;
        const file = files.find((file) => file.filename === filename);
        if (!file) return output;

        const editorId = getLanguageEditorId(language);
        if (!editorId || output[editorId]) return output;

        return {
          ...output,
          activeEditor: output.activeEditor || editorId, // set first as active editor
          [editorId]: {
            language,
            content: file.content,
          },
        };
      }, {} as Partial<Config>);
  }

  // select languages from files
  const code = files
    .map((file) => ({
      ...file,
      filename: file.filename.toLowerCase(),
    }))
    .filter(
      (file) =>
        // do not import json files
        !file.filename.endsWith('.json'),
    )
    .map((file) => {
      const extension = file.filename.split('.')[file.filename.split('.').length - 1];
      const language: Language = file.language || getLanguageByAlias(extension) || 'html';
      const editorId = file.editorId || getLanguageEditorId(language) || 'markup';
      return {
        ...file,
        language,
        editorId,
      };
    })
    .sort((a, b) => {
      // put default files first
      if (a.editorId === b.editorId && a.editorId === 'markup') {
        // index.html -> default.html
        if (a.filename.startsWith('index.')) return -1;
        if (b.filename.startsWith('index.')) return 1;

        if (a.filename.startsWith('default.')) return -1;
        if (b.filename.startsWith('default.')) return 1;
      }
      if (a.editorId === b.editorId && a.editorId === 'style') {
        // style.css -> styles.css
        if (a.filename.startsWith('style.')) return -1;
        if (b.filename.startsWith('style.')) return 1;

        if (a.filename.startsWith('styles.')) return -1;
        if (b.filename.startsWith('styles.')) return 1;
      }
      if (a.editorId === b.editorId && a.editorId === 'script') {
        // script.js -> app.js -> main.js -> index.js
        if (a.filename.startsWith('script.')) return -1;
        if (b.filename.startsWith('script.')) return 1;

        if (a.filename.startsWith('app.')) return -1;
        if (b.filename.startsWith('app.')) return 1;

        if (a.filename.startsWith('main.')) return -1;
        if (b.filename.startsWith('main.')) return 1;

        if (a.filename.startsWith('index.')) return -1;
        if (b.filename.startsWith('index.')) return 1;
      }
      // put readme last
      if (a.editorId === b.editorId && a.editorId === 'markup') {
        if (a.filename.startsWith('readme')) return 1;
        if (b.filename.startsWith('readme')) return -1;
      }
      if (a.language === b.language) {
        // if same language, sort by filename
        return a.filename.localeCompare(b.filename);
      }
      return (
        // then sort by language
        languages.findIndex((language) => language.name === a.language) -
        languages.findIndex((language) => language.name === b.language)
      );
    })
    .reduce((output: Partial<Config>, file) => {
      // tests
      if (file.filename.match(new RegExp('.(test|spec)\\.[jt]sx?'))) {
        if (output.tests?.content) return output;
        return {
          ...output,
          tests: {
            language: file.language,
            content: file.content,
          },
        };
      }

      // code
      if (!file.editorId || output[file.editorId]) return output;
      return {
        ...output,
        [file.editorId]: {
          language: file.language,
          content: file.content,
        },
      };
    }, {} as Partial<Config>);

  // extract external styles and scripts
  const stylesheets: string[] = [];
  const stylesFile = files.find((file) => file.filename === 'styles');
  if (stylesFile?.content) {
    try {
      const urls: string[] = [];
      const domparser = new DOMParser();
      const doc = domparser.parseFromString(stylesFile.content, 'text/html');
      doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((stylesheet) => {
        urls.push(stylesheet.href);
      });
      if (urls.length === 0) {
        stylesFile.content
          .trim()
          .split('\n')
          .forEach((line) => {
            urls.push(line);
          });
      }
      urls.forEach((url) => {
        try {
          stylesheets.push(new URL(url).href);
        } catch (error) {
          // not url
        }
      });
    } catch (error) {
      // not DOM
    }
  }

  const scripts: string[] = [];
  const scriptsFile = files.find((file) => file.filename === 'scripts');
  if (scriptsFile?.content) {
    try {
      const urls: string[] = [];
      const domparser = new DOMParser();
      const doc = domparser.parseFromString(scriptsFile.content, 'text/html');
      doc.querySelectorAll('script').forEach((script) => {
        urls.push(script.src);
      });
      if (urls.length === 0) {
        scriptsFile.content
          .trim()
          .split('\n')
          .forEach((line) => {
            urls.push(line);
          });
      }
      urls.forEach((url) => {
        try {
          scripts.push(new URL(url).href);
        } catch (error) {
          // not url
        }
      });
    } catch (error) {
      // not DOM
    }
  }

  const markupContent = code.markup?.content?.trim();
  const markupLines = markupContent?.split('\n').length || 0;
  const scriptContent = code.script?.content?.trim();
  const scriptLines = scriptContent?.split('\n').length || 0;
  const activeEditor =
    scriptContent && (!markupContent || scriptLines > markupLines || scriptLines > 10)
      ? 'script'
      : undefined;

  return {
    ...(activeEditor ? { activeEditor } : {}),
    ...code,
    stylesheets,
    scripts,
  };
};
