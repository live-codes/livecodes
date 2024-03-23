import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { sqljsBaseUrl } from '../../vendors';

declare global {
  interface Window {
    PGlite: any;
    pgsqldb: any;
  }
}

export const pgSqlCompiler: CompilerFunction = async (code, { config }) => {
  window.PGlite =
    window.PGlite ||
    (await import('https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js')).PGlite;

  const options = getLanguageCustomSettings('pgsql', config);
  const { dbURL, scriptURLs, params } = options;
  if (dbURL) {
    try {
      const res = await fetch(dbURL);
      const buf = await res.arrayBuffer();
      window.pgsqldb = new window.PGlite(new Uint8Array(buf));
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Could not load database file from url: ' + dbURL);
    }
  }

  window.pgsqldb = window.pgsqldb || new window.PGlite();

  if (Array.isArray(scriptURLs)) {
    const scripts = await Promise.all(
      scriptURLs
        .map((url) =>
          fetch(url)
            .then((res) => res.text())
            // eslint-disable-next-line no-console
            .catch(console.warn),
        )
        .filter(Boolean),
    );
    code = [...scripts, code].join('; ');
  }

  try {
    const result = await window.pgsqldb.query(code).catch(() => []);
    return `${JSON.stringify({ data: transformData(result) }, null, 2)}`;
  } catch (error: any) {
    return `${JSON.stringify({ error: error.message }, null, 2)}`;
  } finally {
    // window.pgsqldb.close();
  }
};

const transformData = (data: Array<{ [key: string]: any }>) => {
  const table = {
    columns: [],
    values: [],
  };
  if (!data.length) {
    return [table];
  }
  data.forEach((item) => {
    const columns = Object.keys(item);
    if (!table.columns.length) {
      table.columns = columns;
    }
    table.values.push(columns.map((key) => item[key]));
  });
  return [table];
};
