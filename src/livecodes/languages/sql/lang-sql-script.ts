import { scriptType } from './lang-sql';

interface ResultItem {
  columns: string[];
  values: string[][];
}

(window as any).livecodes = {
  ...(window as any).livecodes,
  sql: {
    getResult: () =>
      new Promise((resolve, reject) => {
        window.addEventListener('load', () => {
          const script = document.querySelector(`script[type="${scriptType}"]`);
          if (script) {
            try {
              const result = JSON.parse(script.innerHTML);
              if (result.data) {
                resolve(result);
              }
              reject(result.error || 'Error compiling SQL');
            } catch {
              reject('Error compiling SQL');
            }
          } else {
            reject('Error compiling SQL');
          }
        });
      }),
    getResultAsObjects: () =>
      new Promise(async (resolve, reject) => {
        try {
          const result: { data: ResultItem[] } = await livecodes.sql.getResult();
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
                  {},
                ),
              ],
              [] as Array<Record<string, string>>,
            );
          });
          resolve(output);
        } catch (error) {
          reject(error);
        }
      }),
    render: (selector: HTMLElement | HTMLDocument | string) =>
      new Promise<void>((resolve, reject) => {
        livecodes.sql
          .getResult()
          .then((result: { data: ResultItem[] }) => {
            const data = result.data;
            data.forEach((table) => {
              const columns = table.columns;
              const rows = table.values;
              const tableElement = document.createElement('table');
              const tableHead = document.createElement('tr');
              tableElement.append(tableHead);
              columns.forEach((col: string) => {
                const cell = document.createElement('th');
                cell.innerHTML = col;
                tableHead.append(cell);
              });
              rows.forEach((row) => {
                const rowElement = document.createElement('tr');
                tableElement.append(rowElement);
                row.forEach((value: string) => {
                  const cell = document.createElement('td');
                  cell.innerHTML = value;
                  rowElement.append(cell);
                });
              });
              const container =
                typeof selector === 'string'
                  ? document.querySelector(selector)
                  : selector instanceof Element || selector instanceof HTMLDocument
                    ? selector
                    : document.body;
              container!.append(tableElement);
              resolve();
            });
          })
          .catch(reject);
      }),
  },
};
