import type { CompilerFunction, LanguageSpecs } from '../../models';
import { sqlFormatterUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, config }) => {
  const { duckdbCompiler } = await import(baseUrl + '{{hash:lang-duckdb-compiler-esm.js}}');
  return duckdbCompiler(code, { baseUrl, config });
};

export const duckdb: LanguageSpecs = {
  name: 'duckdb',
  title: 'DuckDB',
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
    factory: () => async (code) => code,
    runOutsideWorker,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-sql-script.js}}'],
    scriptType: 'application/json',
    compiledCodeLanguage: 'json',
  },
  extensions: ['duckdb.sql', 'duckdb'],
  editor: 'script',
  editorLanguage: 'sql',
};
