import type { Config, EditorId, Language } from '../models';
import type {
  getLanguageCompiler as getLanguageCompilerFn,
  getLanguageExtension as getLanguageExtensionFn,
} from '../languages';
import { getCompilerScripts, getContent } from './utils';

export const exportCodepen = (
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
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const dataInput = document.createElement('input') as HTMLInputElement;
  dataInput.name = 'data';

  const supportedLanguages: { [key in EditorId]: Language[] } = {
    markup: ['markdown', 'haml'],
    style: ['less', 'scss', 'sass', 'stylus'],
    script: ['babel', 'typescript', 'coffeescript', 'livescript'],
  };

  const getEditorContent = (editorId: EditorId) =>
    getContent({ editorId, config, compiled, supportedLanguages, ...deps });
  const getEditorCompilerScripts = (editorId: EditorId) =>
    getCompilerScripts({ baseUrl, editorId, config, compiled, supportedLanguages, ...deps });

  dataInput.value = JSON.stringify({
    title: config.title,
    desciption: config.description,
    tags: config.tags,
    html: getEditorContent('markup'),
    html_pre_processor: supportedLanguages.markup.includes(config.markup.language)
      ? config.markup.language
      : 'none',
    css: getEditorContent('style'),
    css_pre_processor: supportedLanguages.style.includes(config.style.language)
      ? config.style.language
      : 'none',
    css_starter:
      config.cssPreset === 'normalize.css'
        ? 'normalize'
        : config.cssPreset === 'reset-css'
          ? 'reset'
          : 'neither',
    css_prefix: config.processors.includes('autoprefixer') ? 'autoprefixer' : 'neither',
    js: getEditorContent('script'),
    js_pre_processor: supportedLanguages.script.includes(config.script.language)
      ? config.script.language
      : config.script.language === 'jsx'
        ? 'babel'
        : config.script.language === 'tsx'
          ? 'typescript'
          : 'none',
    html_classes: typeof config.htmlAttrs === 'object' ? config.htmlAttrs.class || '' : '',
    head: config.head || '',
    css_external: config.stylesheets.join(';'),
    js_external: [
      ...config.scripts,
      ...getEditorCompilerScripts('markup'),
      ...getEditorCompilerScripts('style'),
      ...getEditorCompilerScripts('script'),
    ].join(';'),
  });
  form.appendChild(dataInput);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
