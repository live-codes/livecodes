import { Config, EditorId, Language } from '../models';
import type {
  getLanguageCompiler as getLanguageCompilerFn,
  getLanguageExtension as getLanguageExtensionFn,
} from '../languages';
import { getCompilerScripts, getContent } from './utils';

export const exportJsbin = (
  config: Config,
  {
    baseUrl,
    compiled,
    deps,
  }: {
    baseUrl: string;
    compiled: { [key in EditorId]: string };
    deps: {
      getLanguageExtension: typeof getLanguageExtensionFn;
      getLanguageCompiler: typeof getLanguageCompilerFn;
    };
  },
) => {
  const form = document.createElement('form') as HTMLFormElement;
  form.action = 'https://jsbin.com/';
  form.method = 'GET';
  form.target = '_blank';
  form.style.display = 'none';

  const supportedLanguages: { [key in EditorId]: Language[] } = {
    markup: ['markdown'],
    style: ['scss', 'sass', 'less', 'stylus'],
    script: ['babel', 'typescript', 'coffeescript', 'jsx'],
  };

  const getEditorContent = (editorId: EditorId) =>
    getContent({ editorId, config, compiled, supportedLanguages, ...deps });
  const getEditorCompilerScripts = (editorId: EditorId) =>
    getCompilerScripts({ baseUrl, editorId, config, compiled, supportedLanguages, ...deps });

  const markupLang = supportedLanguages.markup.includes(config.markup.language)
    ? config.markup.language
    : 'html';

  const styleLang = supportedLanguages.style.includes(config.style.language)
    ? config.style.language
    : 'css';

  const scriptLang = supportedLanguages.script.includes(config.script.language)
    ? config.script.language
    : 'javascript';

  const addResources = (styles: string[], scripts: string[]) => {
    if (styles.length === 0 && scripts.length === 0) return '';
    let content = '\n';
    styles.forEach((style) => {
      content += `<link rel="stylesheet" href="${style}">\n`;
    });
    scripts.forEach((script) => {
      content += `<script src="${script}"></script>\n`;
    });
    return content;
  };

  const resources = addResources(config.stylesheets, [
    ...config.scripts,
    ...getEditorCompilerScripts('markup'),
    ...getEditorCompilerScripts('style'),
    ...getEditorCompilerScripts('script'),
  ]);

  const data = {
    [markupLang]: getEditorContent('markup') + resources,
    [styleLang]: getEditorContent('style'),
    [scriptLang]: getEditorContent('script'),
  };
  Object.keys(data).forEach((key: string) => {
    const input = document.createElement('input') as HTMLInputElement;
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  form.remove();
};
