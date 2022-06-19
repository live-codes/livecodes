import { replaceImports } from '../compiler';
import { getLanguageCompiler } from '../languages';
import { Config, EditorId } from '../models';
import { escapeScript } from '../utils';

export const exportCodepen = (
  config: Config,
  { baseUrl, compiled }: { baseUrl: string; compiled: { [key in EditorId]: string } },
) => {
  /* eslint-disable camelcase */
  const form = document.createElement('form') as HTMLFormElement;
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const dataInput = document.createElement('input') as HTMLInputElement;
  dataInput.name = 'data';

  const supportedLanguages = {
    markup: ['markdown', 'haml'],
    style: ['less', 'scss', 'sass', 'stylus'],
    script: ['babel', 'typescript', 'coffeescript', 'livescript'],
  };

  const getCompilerScripts = (editorId: EditorId) => {
    if (supportedLanguages[editorId].includes(config[editorId].language)) return [];
    const compilerScripts = getLanguageCompiler(config[editorId].language)?.scripts;
    const compiledCode =
      config[editorId].language === 'python' ? config[editorId].content || '' : compiled[editorId];
    const scripts =
      typeof compilerScripts === 'function'
        ? compilerScripts({ compiled: compiledCode, baseUrl, config })
        : compilerScripts;
    return scripts || [];
  };

  const getContent = (editorId: EditorId) => {
    const isScriptSupported = ['javascript', 'jsx', 'tsx', ...supportedLanguages.script].includes(
      config.script.language,
    );

    const content = {
      markup: ['html', ...supportedLanguages.markup].includes(config.markup.language)
        ? config.markup.content
        : compiled.markup,
      style: ['css', ...supportedLanguages.style].includes(config.style.language)
        ? config.style.content
        : compiled.style,
      script:
        config.script.language === 'php'
          ? config.script.content?.replace(/<\?php/g, '') || ''
          : config.script.language === 'python'
          ? config.script.content
          : replaceImports(
              (isScriptSupported ? config.script.content : compiled.script) || '',
              config,
            ),
    };

    const scriptType = getLanguageCompiler(config.script.language)?.scriptType;
    if (!isScriptSupported && scriptType && scriptType !== 'module') {
      if (editorId === 'markup') {
        return (
          content.markup +
          `
<script type="${scriptType}">
${escapeScript(content.script || '')}
</script>
`
        );
      }
      if (editorId === 'script') {
        if (config.script.language === 'python') {
          return 'window.addEventListener("load", () => {brython()});';
        }
        return '';
      }
    }
    return content[editorId] || '';
  };

  dataInput.value = JSON.stringify({
    title: config.title,
    desciption: config.description,
    tags: config.tags,
    html: getContent('markup'),
    html_pre_processor: supportedLanguages.markup.includes(config.markup.language)
      ? config.markup.language
      : 'none',
    css: getContent('style'),
    css_pre_processor: supportedLanguages.style.includes(config.style.language)
      ? config.style.language
      : 'none',
    css_starter:
      config.cssPreset === 'normalize.css'
        ? 'normalize'
        : config.cssPreset === 'reset-css'
        ? 'reset'
        : 'neither',
    css_prefix: config.processors.postcss.autoprefixer ? 'autoprefixer' : 'neither',
    js: getContent('script'),
    js_pre_processor: supportedLanguages.script.includes(config.script.language)
      ? config.script.language
      : config.script.language === 'jsx'
      ? 'babel'
      : config.script.language === 'tsx'
      ? 'typescript'
      : 'none',
    html_classes: config.customSettings.htmlClasses || '',
    head: config.customSettings.head || '',
    css_external: config.stylesheets.join(';'),
    js_external: [
      ...config.scripts,
      ...getCompilerScripts('markup'),
      ...getCompilerScripts('style'),
      ...getCompilerScripts('script'),
    ].join(';'),
  });
  form.appendChild(dataInput);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
