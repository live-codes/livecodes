import { LanguageSpecs } from '../models';
import { formatterFactory as rescriptFormatterFactory } from './lang-rescript';

export const reason: LanguageSpecs = {
  name: 'reason',
  title: 'Reason',
  formatter: {
    factory: rescriptFormatterFactory,
  },
  compiler: 'rescript',
  extensions: ['re', 'rei'],
  editor: 'script',
  editorLanguage: 'javascript',
};
