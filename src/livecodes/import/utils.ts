import { languages, getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { EditorId, Language, Config } from '../models';

export interface SourceFile {
  filename: string;
  content: string;
  language?: Language;
  editorId?: EditorId;
}

export interface FileData {
  rawURL: string;
  extension: Language;
  startLine: number;
  endLine: number;
}

export const populateConfig = (files: SourceFile[], params: { [key: string]: string }) => {
  if (files.length === 0) return {};

  // select files based on language in query params (e.g. ?html=index.html&js=script.js)
  const languagesInParams = Object.keys(params).some(getLanguageByAlias);
  if (languagesInParams) {
    return Object.keys(params).reduce((output: Partial<Config>, param: string) => {
      const language = getLanguageByAlias(param);
      if (!language) return output;
      const file = files.find((file) => file?.filename === params[param]);
      if (!file) return output;

      const editorId = getLanguageEditorId(language);
      if (!editorId || output[editorId]) return output;

      return {
        ...output,
        [editorId]: {
          language,
          content: file.content,
        },
      };
    }, {} as Partial<Config>);
  }

  // select languages from files
  const code = files
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
      if (
        // put default files first
        a.editorId === b.editorId &&
        ((a.editorId === 'markup' && a.filename.toLowerCase().startsWith('index.')) ||
          (a.editorId === 'style' && a.filename.toLowerCase().startsWith('style.')) ||
          (a.editorId === 'script' && a.filename.toLowerCase().startsWith('script.')))
      ) {
        return -1;
      }
      if (
        // put default files first
        a.editorId === b.editorId &&
        ((b.editorId === 'markup' && b.filename.toLowerCase().startsWith('index.')) ||
          (b.editorId === 'style' && b.filename.toLowerCase().startsWith('style.')) ||
          (b.editorId === 'script' && b.filename.toLowerCase().startsWith('script.')))
      ) {
        return 1;
      }
      if (
        // put readme last
        a.editorId === b.editorId &&
        a.editorId === 'markup'
      ) {
        if (a.filename.toLowerCase().startsWith('readme')) return 1;
        if (b.filename.toLowerCase().startsWith('readme')) return -1;
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
      if (file.filename.toLowerCase().match(new RegExp('.(test|spec)\\.[jt]sx?'))) {
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
  return {
    ...code,
    stylesheets,
    scripts,
  };
};
