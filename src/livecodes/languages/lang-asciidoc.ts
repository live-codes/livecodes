import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

export const asciidoc: LanguageSpecs = {
  name: 'asciidoc',
  title: 'AsciiDoc',
  compiler: {
    url: 'https://cdn.jsdelivr.net/npm/@asciidoctor/core@2.2.5/dist/browser/asciidoctor.min.js',
    factory: () => {
      const asciidoctor = (window as any).Asciidoctor();
      return async (code, { config }) =>
        asciidoctor.convert(code, {
          ...getLanguageCustomSettings('asciidoc', config),
        });
    },
  },
  extensions: ['adoc', 'asciidoc', 'asc'],
  editor: 'markup',
  preset: 'asciidoctor.css',
};
