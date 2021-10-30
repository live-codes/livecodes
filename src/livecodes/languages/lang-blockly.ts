import { LanguageSpecs } from '../models';

export const blockly: LanguageSpecs = {
  name: 'blockly',
  title: 'Blockly',
  info: false,
  compiler: {
    factory: () => async (_code, { options }) => options?.blockly?.js || '',
  },
  extensions: ['blockly.xml', 'xml'],
  editor: 'script',
  editorLanguage: 'xml',
};
