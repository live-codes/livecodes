import { LanguageSpecs } from '../models';

export const haml: LanguageSpecs = {
  name: 'haml',
  title: 'Haml',
  compiler: {
    url: 'vendor/clientside-haml-js/haml.js',
    factory: () => (code: string) =>
      (window as any).haml.compileHaml({ source: code, tolerateFaults: true })(),
    umd: true,
  },
  extensions: ['haml'],
  editor: 'markup',
};
