import type { LanguageSpecs } from '../../models';

export const richtext: LanguageSpecs = {
  name: 'richtext',
  title: 'Rich Text',
  longTitle: 'Rich Text Editor',
  compiler: {
    factory:
      () =>
      async (_code, { config }) =>
        config.markup.content || '',
    styles: ['{{hash:quill.css}}'],
  },
  extensions: ['rte', 'rte.html', 'rich'],
  editor: 'markup',
  editorLanguage: 'html',
};
