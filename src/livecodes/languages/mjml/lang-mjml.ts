import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { mjmlUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const mjml: LanguageSpecs = {
  name: 'mjml',
  title: 'MJML',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: mjmlUrl,
    factory:
      () =>
      async (code, { config }) => {
        if (!code.trim()) return '';
        const { html, errors } = (self as any).mjml(
          code,
          getLanguageCustomSettings('mjml', config),
        );
        errors?.forEach(
          (err: { line: number; tagName: string; message: string; formattedMessage: string }) => {
            // eslint-disable-next-line no-console
            console.warn(err.formattedMessage);
          },
        );
        return html;
      },
  },
  extensions: ['mjml'],
  editor: 'markup',
  editorLanguage: 'xml',
};
