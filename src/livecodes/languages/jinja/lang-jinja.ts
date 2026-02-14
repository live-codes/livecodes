import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const jinjaUrl = `${vendorsBaseUrl}jinja/jinja.js`;

export const jinja: LanguageSpecs = {
  name: 'jinja',
  title: 'Jinja',
  formatter: {
    factory: () => {
      (self as any).importScripts(jinjaUrl);
      return async (code, cursorOffset, formatterConfig) => {
        const formatted = new (self as any).Jinja.Template(code).format({
          indent: formatterConfig?.tabSize || 2,
        });
        return { formatted, cursorOffset };
      };
    },
  },
  compiler: {
    url: jinjaUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-jinja-compiler.js}}');
      return (self as any).createJinjaCompiler();
    },
  },
  extensions: ['jinja'],
  editor: 'markup',
  editorLanguage: 'html',
  multiFileSupport: true,
};
