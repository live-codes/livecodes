import type { LanguageSpecs } from '../../models';
import { jsYamlUrl } from '../../vendors';

export const yaml: LanguageSpecs = {
  name: 'yaml',
  title: 'YAML',
  info: false,
  compiler: {
    url: jsYamlUrl,
    factory: () => async (code) => {
      try {
        return JSON.stringify((self as any).jsyaml.load(code, { json: true }), null, 2);
      } catch {
        return '{}';
      }
    },
    compiledCodeLanguage: 'json',
  },
  extensions: ['yaml', 'yml'],
  editor: '',
  multiFileSupport: true,
};
