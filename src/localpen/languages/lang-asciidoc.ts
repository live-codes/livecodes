import { LanguageSpecs } from '../models';

export const asciidoc: LanguageSpecs = {
  name: 'asciidoc',
  title: 'AsciiDoc',
  info: `
  <h3>AsciiDoc</h3>
  <div>AsciiDoc compiled to HTML using Asciidoctor.</div>
  <ul>
    <li><a href="https://asciidoc.org/" target="_blank">AsciiDoc official website</a></li>
    <li><a href="https://asciidoctor.org/" target="_blank">Asciidoctor official website</a></li>
    <li><a href="https://asciidoctor.org/docs/" target="_blank">Asciidoctor documentation</a></li>
    <!-- <li><a href="#">AsciiDoc usage in LocalPen</a></li> -->
  </ul>
  `,
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
