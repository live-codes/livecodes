import { replaceImports } from '../compiler';
import { Pen } from '../models';

export const exportCodepen = (config: Pen) => {
  /* eslint-disable camelcase */
  const form = document.createElement('form') as HTMLFormElement;
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const dataInput = document.createElement('input') as HTMLInputElement;
  dataInput.name = 'data';

  dataInput.value = JSON.stringify({
    title: config.title,
    html: config.markup.content,
    html_pre_processor: ['markdown'].includes(config.markup.language)
      ? config.markup.language
      : 'none',
    css: config.style.content,
    css_pre_processor: ['less', 'scss', 'sass', 'stylus'].includes(config.style.language)
      ? config.style.language
      : 'none',
    css_prefix: config.processors.postcss.autoprefixer ? 'autoprefixer' : 'neither',
    js: replaceImports(config.script.content || '', config),
    js_pre_processor: ['typescript', 'coffeescript'].includes(config.script.language)
      ? config.script.language
      : config.script.language === 'jsx'
      ? 'babel'
      : 'none',
    js_external: config.scripts.join(';'),
    css_external: config.stylesheets.join(';'),
  });
  form.appendChild(dataInput);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
