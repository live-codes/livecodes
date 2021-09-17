import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/npm/sql.js@1.6.1/dist/';
const scriptType = 'application/json';

export const sql: LanguageSpecs = {
  name: 'sql',
  title: 'SQL',
  info: `
  <h3>SQLite</h3>
  <div>SQLite compiled to JavaScript using SQL.js</div>
  <ul>
    <li><a href="https://www.sqlite.org/" target="_blank" rel="noopener">SQLite official website</a></li>
    <li><a href="https://www.sqlite.org/lang.html" target="_blank" rel="noopener">SQLite syntax documentation</a></li>
    <li><a href="https://sql.js.org/" target="_blank" rel="noopener">SQL.js official website</a></li>
    <!-- <li><a href="#">SQL usage in LocalPen</a></li> -->
    <li><a href="?template=sql" target="_parent" data-template="sql">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: cdnBaselUrl + 'sql-wasm.min.js',
    factory: () => {
      const SQLPromise = (self as any).initSqlJs({
        locateFile: (filename: string) => cdnBaselUrl + filename,
      });
      return async (code, { config }) => {
        const SQL = await SQLPromise;
        const options = getLanguageCustomSettings('sql', config);
        const { dbURL, scriptURLs, params } = options;
        let db: any;
        if (dbURL) {
          try {
            const res = await fetch(dbURL);
            const buf = await res.arrayBuffer();
            db = new SQL.Database(new Uint8Array(buf));
          } catch {
            // eslint-disable-next-line no-console
            console.warn('Could not load database file from url: ' + dbURL);
          }
        }

        db = db || new SQL.Database();

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
          const result = db.exec(code, { ...params });
          return `${JSON.stringify({ data: result }, null, 2)}`;
        } catch (error: any) {
          return `${JSON.stringify({ error: error.message }, null, 2)}`;
        } finally {
          db.close();
        }
      };
    },
    inlineScript: `
window.localpen = {
  ...window.localpen,
  sql: {
    getResult: () =>
      new Promise((resolve, reject) => {
        window.addEventListener("load", () => {
          const script = document.querySelector('script[type="${scriptType}"]');
          if (script) {
            try {
              const result = JSON.parse(script.innerHTML);
              if (result.data) {
                resolve(result);
              }
              reject(result.error || "Error compiling SQL");
            } catch {
              reject("Error compiling SQL");
            }
          } else {
            reject("Error compiling SQL");
          }
        });
      }),
    getResultAsObjects: () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await localpen.sql.getResult();
          const output = result.data.map((item) => {
            const columns = item.columns;
            return item.values.reduce(
              (table, row) => [
                ...table,
                row.reduce(
                  (rowObj, value, i) => ({
                    ...rowObj,
                    [columns[i]]: value,
                  }),
                  {}
                ),
              ],
              []
            );
          });
          resolve(output);
        } catch (error) {
          reject(error);
        }
      }),
    render: (selector) =>
      new Promise((resolve, reject) => {
        localpen.sql
          .getResult()
          .then((result) => {
            const data = result.data;
            data.forEach((table) => {
              const columns = table.columns;
              const rows = table.values;
              const tableElement = document.createElement("table");
              const tableHead = document.createElement("tr");
              tableElement.append(tableHead);
              columns.forEach((col) => {
                const cell = document.createElement("th");
                cell.innerHTML = col;
                tableHead.append(cell);
              });
              rows.forEach((row) => {
                const rowElement = document.createElement("tr");
                tableElement.append(rowElement);
                row.forEach((value) => {
                  const cell = document.createElement("td");
                  cell.innerHTML = value;
                  rowElement.append(cell);
                });
              });
              const container = typeof selector === 'string'
              ? document.querySelector(selector)
              : selector instanceof Element || selector instanceof HTMLDocument
              ? selector
              : document.body;
              container.append(tableElement);
              resolve()
            });
          })
          .catch(reject);
      }),
  },
};
    `,
    scriptType,
    compiledCodeLanguage: 'json',
  },
  extensions: ['sql', 'sqlite', 'sqlite3'],
  editor: 'script',
};
