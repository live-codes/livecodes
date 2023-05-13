import type { LanguageSpecs } from '../../models';

export const blockly: LanguageSpecs = {
  name: 'blockly',
  title: 'Blockly',
  compiler: {
    factory:
      () =>
      async (_code, { options }) =>
        options?.blockly?.js || '',
  },
  extensions: ['blockly.xml', 'xml'],
  editor: 'script',
  editorLanguage: 'xml',
};
