import { replaceImports } from '../compiler';
import { Pen } from '../models';

export const exportJsfiddle = (config: Pen) => {
  /* eslint-disable camelcase */
  const form = document.createElement('form') as HTMLFormElement;
  form.action = 'https://jsfiddle.net/api/post/library/pure/';
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const data = {
    title: config.title,
    html: config.markup.content || '',
    css: config.style.content || '',
    css_panel: config.style.language === 'scss' ? '1' : '0',
    js: replaceImports(config.script.content || '', config),
    js_panel:
      config.script.language === 'typescript'
        ? '4'
        : config.script.language === 'jsx'
        ? '3'
        : config.script.language === 'coffeescript'
        ? '5'
        : '0',
    resources: [...config.stylesheets, ...config.scripts].join(','),
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
