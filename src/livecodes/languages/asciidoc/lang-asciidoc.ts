import type { LanguageSpecs } from '../../models';
import { asciidocUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../utils';

export const asciidoc: LanguageSpecs = {
  name: 'asciidoc',
  title: 'AsciiDoc',
  compiler: {
    url: asciidocUrl,
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
};
