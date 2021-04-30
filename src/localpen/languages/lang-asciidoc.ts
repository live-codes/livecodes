import { LanguageSpecs } from '../models';

export const asciidoc: LanguageSpecs = {
  name: 'asciidoc',
  title: 'AsciiDoc',
  compiler: {
    url: 'vendor/asciidoctor/asciidoctor.min.js',
    factory: () => {
      const asciidoctor = (window as any).Asciidoctor();
      return asciidoctor.convert.bind(asciidoctor);
    },
    umd: true,
  },
  extensions: ['adoc', 'asciidoc', 'asc'],
  editor: 'markup',
  preset: 'asciidoctor.css',
};
