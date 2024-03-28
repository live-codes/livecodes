import type { CompilerFunction, LanguageSpecs } from '../../models';
import { sqlFormatterUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, config }) => {
  const { pgSqlCompiler } = await import(baseUrl + '{{hash:lang-postgresql-compiler-esm.js}}');
  return pgSqlCompiler(code, { baseUrl, config });
};

export const postgresql: LanguageSpecs = {
  name: 'postgresql',
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
    scriptType: 'application/json',
    compiledCodeLanguage: 'json',
  },
  extensions: [
    'pg.sql',
    'pgsql',
    'pgsql.sql',
    'pgsql',
    'pg',
    'pglite',
    'pglite.sql',
    'postgresql',
    'postgres',
    'postgre.sql',
    'postgresql.sql',
  ],
  editor: 'script',
  editorLanguage: 'sql',
};
