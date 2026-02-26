import type { LanguageSpecs } from '../../models';
import {
  codeMirrorBaseUrl,
  monacoLanguagesBaseUrl,
  sqlFormatterUrl,
  sqljsBaseUrl,
} from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const scriptType = 'application/json';

export const sql: LanguageSpecs = {
  name: 'sql',
  title: 'SQL',
  formatter: {
    factory: () => {
      importScripts(sqlFormatterUrl);
      return async (value: string) => ({
        formatted: await (self as any).sqlFormatter.format(value, { linesBetweenQueries: 2 }),
        cursorOffset: 0,
      });
    },
  },
  compiler: {
    url: sqljsBaseUrl + 'sql-wasm.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-sql-compiler.js}}');
      return (self as any).createSqlCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-sql-script.js}}'],
    scriptType,
    compiledCodeLanguage: 'json',
  },
  extensions: ['sql', 'sqlite', 'sqlite3'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'sql.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-sql.js')).sql(),
    },
  },
};
