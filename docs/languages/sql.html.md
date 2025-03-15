# SQL (SQLite)

[SQLite](https://www.sqlite.org/) is a small, fast, self-contained, high-reliability, full-featured, SQL database engine. LiveCodes runs SQLite (compiled to [Wasm](https://webassembly.org/)) in the browser using [SQL.js](https://sql.js.org/).

:::info Note

Please note that LiveCodes also supports [PostgreSQL](./postgresql.html.md).

:::

## Usage

The SQL code runs (in the browser) and the output is produced as a JSON object. This JSON object is added to the [result page](../features/result.html.md) in a `script` block with type `application/json`.

[Helper methods](#helper-methods) are provided for easy access/rendering of the JSON object (see below).

### Helper Methods

The JavaScript object `livecodes.sql` is globally available in the [result page](../features/result.html.md). This can be used in `script` blocks in the [markup editor](../features/projects.html.md) (page HTML - see HTML editor is [example usage](#example-usage)). It provides the following methods for easy access/rendering of the JSON object:

- `livecodes.sql.getResult`

  Type: `() => Promise<{ data: Array<{ columns: string[]; values: unknown[][]; }>}>`:

  Returns a promise that resolves to the JSON object. The object has a single property `data` which is an array of objects, each representing the output of a query (e.g. `SELECT * FROM table`). Each object has two properties `columns` (an array of column names) and `values` (an array of arrays of values).

  In case of errors, the promise rejects with the error message.

  Example:

  ```html title="HTML"
  <script>
    livecodes.sql
      .getResult()
      .then((result) => {
        console.log(result);
        // { data: [{ columns: ['columnA', 'columnB'], values: [['row 1 - value A', 'row 1 - value B'], ['row 2 - value A', 'row 2 - value B']] }] }
      })
      .catch((error) => {
        console.error(error);
        // 'error message'
      });
  </script>
  ```

- `livecodes.sql.getResultAsObjects`

  Type: `() => Promise<{ [key: string]: unknown; }[][]>`:

  Returns a promise that resolves to the data as an array (representing queries/tables) of arrays (representing rows) of objects. Each object has key/value pairs for the column names and their values.

  In case of errors, the promise rejects with the error message.

  Example:

  ```html title="HTML"
  <script>
    livecodes.sql
      .getResultAsObjects()
      .then((result) => {
        console.log(result);
        // [[{ columnA: 'row 1 - value A', columnB: 'row 1 - value B' }, { columnA: 'row 2 - value A', columnB: 'row 2 - value B' }]]
      })
      .catch((error) => {
        console.error(error);
        // 'error message'
      });
  </script>
  ```

- `livecodes.sql.render: (element?: HTMLElement | string) => Promise<void>`:

  Accepts a single parameter which can be a DOM element or a CSS selector and renders the JSON object as HTML `table`(s) in that element. If no element is specified, it renders the table(s) in `document.body`.

  Example:

  ```html title="HTML"
  <div id="tables"></div>
  <script>
    livecodes.sql.render('#tables');
  </script>
  ```

:::info Note

Helper methods for SQLite are identical to those for [PostgreSQL](./postgresql.html.md). So the same code can be used for both engines.

:::

### Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

<LiveCodes template="sql"></LiveCodes>

### Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `sql` are used during running the SQL code. It is a JSON object with the following properties:

- `dbURL`: a URL to a SQLite database. It is downloaded and used to run the SQL code ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) must be enabled). Changes are NOT persisted to the remote database.

- `scriptURLs`: An array of URLs to SQL scripts that should be loaded before running the SQL code.

- `params`: An object that can be used to pass parameters to the SQL code.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "postgresql": {
    "dbURL": "https://myserver.com/sqlite.db",
    "scriptURLs": ["https://myserver.com/sql.sql"],
    "params": {
      "param1": "value1",
      "param2": "value2"
    }
  }
}
```

## Language Info

### Name

`sql`

### Aliases/Extensions

`sql`, `sqlite`, `sqlite3`

### Editor

`script`

## Compiler

[SQL.js](https://sql.js.org/)

### Version

`sql.js`: v1.10.3

## Code Formatting

using [`sql-formatter`](https://github.com/sql-formatter-org/sql-formatter)

## Starter Template

https://livecodes.io/?template=sql

## Links

- [SQLite official website](https://www.sqlite.org/)
- [SQLite syntax documentation](https://www.sqlite.org/lang.html)
- [SQL.js official website](https://sql.js.org/)
- [PostgreSQL in LiveCodes](./postgresql.html.md)