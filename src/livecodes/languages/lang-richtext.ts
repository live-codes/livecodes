import { LanguageSpecs } from '../models';

export const richtext: LanguageSpecs = {
  name: 'richtext',
  title: 'Rich Text',
  longTitle: 'Rich Text Editor',
  compiler: {
    factory: () => async (_code, { config }) => config.markup.content || '',
    styles: ['styles/quill.css'],
  },
  extensions: ['rte.html', 'rte', 'rich'],
  editor: 'markup',
  editorLanguage: 'html',
};
