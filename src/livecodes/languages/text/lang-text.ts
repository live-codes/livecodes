import type { LanguageSpecs } from '../../models';

export const text: LanguageSpecs = {
  name: 'text',
  title: 'Text',
  info: false,
  compiler: {
    factory: () => async (code) => code,
  },
  extensions: ['txt', 'csv', 'tsv', 'plaintext'],
  editor: '',
  multiFileSupport: true,
  editorSupport: { monaco: { language: 'plaintext' } },
};
