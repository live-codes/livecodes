import type { LanguageSpecs } from '../../models';
import { sqlFormatterUrl, sqljsBaseUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const scriptType = 'application/json';
export const runOutsideWorker = async (code: string, { baseUrl, config }) => {
  console.log(code);
  const { pgSqlCompiler } = await import(baseUrl + '{{hash:lang-pgsql-compiler-esm.js}}');
  return pgSqlCompiler(code, { baseUrl, config });
};

export const pgsql: LanguageSpecs = {
  name: 'pgsql',
  title: 'PostgreSQL',
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
    scriptType,
    compiledCodeLanguage: 'json',
  },
  extensions: ['pg.sql', 'pgsql.sql', 'pgsql', 'pg', 'postgresql', 'postgre.sql', 'postgresql.sql'],
  editor: 'script',
};
