import { getMainFile, isEditorId } from '../config/utils';
import { getFileLanguage, getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { Config, EditorId, Language } from '../models';

export interface SourceFile {
  filename: string;
  content: string;
  path?: string;
  language?: Language;
  editorId?: EditorId;
}

const prepareFiles = (config: { files?: Config['files'] }): Partial<Config> => {
  if (!config.files?.length) return config;
  const mainFile = getMainFile(config);
  if (!mainFile || !config.files.find((f) => f.filename === mainFile)) {
    return config;
  }
  const title = config.files
    .find((f) => f.filename === mainFile)
    ?.content.match(/<title>(.*?)<\/title>/)?.[1];

  config.files.sort((f1, f2) => (f1.filename === mainFile ? -1 : f2.filename === mainFile ? 1 : 0));
  return {
    ...(title ? { title } : {}),
    mainFile,
    activeEditor: mainFile,
    ...config,
  };
};

export const populateConfig = (
  files: SourceFile[],
  params: { [key: string]: string },
): Partial<Config> => {
  if (files.length === 0) return {};

  const configFile = files.find(
    (file) =>
      file.filename.toLowerCase() === 'livecodes.json' ||
      (files.length === 1 && file.filename.toLowerCase().endsWith('.json')),
  );
  if (configFile) {
    try {
      const obj = JSON.parse(configFile.content);
      if (
        // if is LiveCodes config
        obj.markup?.language ||
        obj.style?.language ||
        obj.script?.language ||
        (obj.files?.[0]?.filename && obj.files?.[0]?.content)
      ) {
        return obj;
      }
    } catch {
      // invalid JSON
    }
  }

  // select files in query params (e.g. ?files=index.html,script.js)
  const filesInParams = params.files;
  if (filesInParams) {
    const config = filesInParams
      .split(',')
      .map((filename) => filename.trim())
      .reduce((output: Partial<Config>, filename: string) => {
        const file = files.find((file) => file.filename === filename);
        if (!file) return output;
        const language = getFileLanguage(file.filename) as Language;
        return {
          ...output,
          files: [
            ...(output.files || []),
            {
              filename: file.path || file.filename,
              content: file.content,
              language,
            },
          ],
        };
      }, {} as Partial<Config>);
    return prepareFiles(config);
  }

  // external styles and scripts (e.g. github gist exported from codepen)
  const stylesFile = files.find((file) => file.filename === 'styles');
  const scriptsFile = files.find((file) => file.filename === 'scripts');

  if (!stylesFile && !scriptsFile) {
    return prepareFiles({
      files: files.map((file) => ({
        filename: file.path || file.filename,
        content: file.content,
        language: file.language || (getFileLanguage(file.filename) as Language),
      })),
    });
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
      // put extension-less files last
      if (!a.filename.includes('.')) return 1;
      if (!b.filename.includes('.')) return -1;

      // if same language, sort by filename
      if (a.language === b.language) {
        return a.filename.localeCompare(b.filename);
      }

      // put markdown last
      if (a.editorId === b.editorId && a.editorId === 'markup') {
        if (a.filename.endsWith('.md')) return 1;
        if (b.filename.endsWith('.md')) return -1;
        if (a.filename.endsWith('.markdown')) return 1;
        if (b.filename.endsWith('.markdown')) return -1;
      }
      return (
        // then sort by language
        window.deps.languages.findIndex((language) => language.name === a.language) -
        window.deps.languages.findIndex((language) => language.name === b.language)
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
      if (!file.editorId || !isEditorId(file.editorId) || output[file.editorId]) return output;
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
