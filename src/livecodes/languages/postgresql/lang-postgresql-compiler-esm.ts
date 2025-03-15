import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings, safeName } from '../../utils/utils';
import { pgliteUrl } from '../../vendors';

declare global {
  interface Window {
    PGlite: any;
    pgsqldb: any;
  }
}

export const pgSqlCompiler: CompilerFunction = async (code, { config }) => {
  if (!code.trim()) return '{ data: [] }';
  window.PGlite = window.PGlite || (await import(pgliteUrl)).PGlite;

  const options = getLanguageCustomSettings('pgsql', config);
  const { dbName, scriptURLs, ...pgliteOptions } = options;

  if (dbName) {
    window.pgsqldb = new window.PGlite(`idb://${safeName(dbName)}`, pgliteOptions);
  } else {
    window.pgsqldb = new window.PGlite(`memory://livecodes`, pgliteOptions);
  }

  if (Array.isArray(scriptURLs)) {
    const scripts = await Promise.all(
      scriptURLs
        .map((url) =>
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Error fetching: ' + url);
              }
              return res.text();
            })
            // eslint-disable-next-line no-console
            .catch(console.warn),
        )
        .filter(Boolean),
    );
    code = [...scripts, code].join('; ');
  }

  try {
    const result = await window.pgsqldb.exec(code, { rowMode: 'array' });
    return `${JSON.stringify({ data: transformData(result) }, null, 2)}`;
  } catch (error: any) {
    return `${JSON.stringify({ error: error.message }, null, 2)}`;
  } finally {
    window.pgsqldb.close();
  }
};

const transformData = (
  data: Array<{
    fields: Array<{ name: string; dataTypeID: number }>;
    rows: unknown[][];
    affectedRows?: number;
  }>,
): Array<{ columns: string[]; values: unknown[][] }> =>
  data
    .filter((item) => item.fields.length > 0)
    .map((item) => ({ columns: item.fields.map((field) => field.name), values: item.rows }));
