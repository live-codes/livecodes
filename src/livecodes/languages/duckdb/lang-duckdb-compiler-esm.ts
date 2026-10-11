import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils/utils';
import { duckdbWasmBaseUrl, duckdbWasmModuleUrl } from '../../vendors';

declare global {
  interface Window {
    duckdb: any;
  }
}

const getDuckDB = async () => {
  if (!window.duckdb) {
    window.duckdb = await import(duckdbWasmModuleUrl);
  }
  return window.duckdb;
};

const createDB = async (duckdb: any) => {
  const bundles = {
    mvp: {
      mainModule: duckdbWasmBaseUrl + 'duckdb-mvp.wasm',
      mainWorker: duckdbWasmBaseUrl + 'duckdb-browser-mvp.worker.js',
    },
    eh: {
      mainModule: duckdbWasmBaseUrl + 'duckdb-eh.wasm',
      mainWorker: duckdbWasmBaseUrl + 'duckdb-browser-eh.worker.js',
    },
  };
  const bundle = await duckdb.selectBundle(bundles);
  const workerUrl = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' }),
  );
  const worker = new Worker(workerUrl);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  return db;
};

export const duckdbCompiler: CompilerFunction = async (code, { config }) => {
  if (!code.trim()) return '{ data: [] }';
  const duckdb = await getDuckDB();

  const options = getLanguageCustomSettings('duckdb', config);
  const { scriptURLs } = options;

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

  const db = await createDB(duckdb);
  const conn = await db.connect();

  try {
    const result = await conn.query(code);
    return `${JSON.stringify({ data: transformData(result) }, jsonReplacer, 2)}`;
  } catch (error: any) {
    return `${JSON.stringify({ error: error.message }, null, 2)}`;
  } finally {
    await conn.close();
    await db.terminate();
  }
};

const jsonReplacer = (_key: string, value: any) => {
  if (typeof value === 'bigint') {
    return value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER)
      ? Number(value)
      : value.toString();
  }
  return value;
};

const transformData = (result: any): Array<{ columns: string[]; values: unknown[][] }> => {
  const fields = result?.schema?.fields ?? [];
  if (fields.length === 0) return [];
  const columns = fields.map((field: any) => field.name);
  const values = result.toArray().map((row: any) => {
    const obj = typeof row.toJSON === 'function' ? row.toJSON() : row;
    return columns.map((column: string) => obj[column]);
  });
  return [{ columns, values }];
};
