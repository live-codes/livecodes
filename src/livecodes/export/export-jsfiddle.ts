import type { Config, EditorId, Language } from '../models';
import type {
  getLanguageCompiler as getLanguageCompilerFn,
  getLanguageExtension as getLanguageExtensionFn,
} from '../languages';
import { getCompilerScripts, getContent } from './utils';

export const exportJsfiddle = (
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
  /* eslint-disable camelcase */
  const form = document.createElement('form') as HTMLFormElement;
  form.action = 'https://jsfiddle.net/api/post/library/pure/';
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const supportedLanguages: { [key in EditorId]: Language[] } = {
    markup: ['haml'],
    style: ['scss', 'sass'],
    script: ['babel', 'typescript', 'coffeescript'],
  };

  const getEditorContent = (editorId: EditorId) =>
    getContent({ editorId, config, compiled, supportedLanguages, ...deps });
  const getEditorCompilerScripts = (editorId: EditorId) =>
    getCompilerScripts({ baseUrl, editorId, config, compiled, supportedLanguages, ...deps });

  const data = {
    title: config.title,
    description: config.description || '',
    html: getEditorContent('markup'),
    css: getEditorContent('style'),
    css_panel: config.style.language === 'scss' ? '1' : '0',
    js: getEditorContent('script'),
    js_panel:
      config.script.language === 'typescript'
        ? '4'
        : config.script.language === 'jsx'
          ? '3'
          : config.script.language === 'coffeescript'
            ? '5'
            : '0',
    resources: [
      ...config.stylesheets,
      ...config.scripts,
      ...getEditorCompilerScripts('markup'),
      ...getEditorCompilerScripts('style'),
      ...getEditorCompilerScripts('script'),
    ].join(','),
  };
  (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
    const input = document.createElement('input') as HTMLInputElement;
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  form.remove();
};
