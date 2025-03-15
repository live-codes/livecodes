# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system. LiveCodes runs PostgreSQL in the browser using [PGlite](https://github.com/electric-sql/pglite) (lightweight Postgres packaged as [Wasm](https://webassembly.org/)).

:::info Note

Please note that LiveCodes also supports [SQL using SQLite](./sql.html.md).

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

Helper methods for PostgreSQL are identical to those for [SQL using SQLite](./sql.html.md). So the same code can be used for both engines.

:::

### Limitations

Currently parameters are not supported.

### Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

<LiveCodes template="postgresql"></LiveCodes>

### Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `postgresql` are used during running the SQL code. It is a JSON object with the following properties:

- `dbName`: a database name that allows persisting data in the browser in IndexedDB (see [PGlite](https://github.com/electric-sql/pglite?tab=readme-ov-file#browser)).

- `scriptURLs`: An array of URLs to SQL scripts that should be loaded before running the SQL code.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "postgresql": {
    "dbName": "mydb",
    "scriptURLs": ["https://myserver.com/sql.sql"]
  }
}
```

## Language Info

### Name

`postgresql`

### Aliases/Extensions

`pg.sql`,
`pgsql`,
`pgsql.sql`,
`pgsql`,
`pg`,
`pglite`,
`pglite.sql`,
`postgresql`,
`postgres`,
`postgre.sql`,
`postgresql.sql`

### Editor

`script`

## Compiler

[PGlite](https://github.com/electric-sql/pglite)

### Version

`@electric-sql/pglite`: v0.1.5

## Code Formatting

using [`sql-formatter`](https://github.com/sql-formatter-org/sql-formatter)

## Starter Template

https://livecodes.io/?template=postgresql

## Links

- [PostgreSQL official website](https://www.postgresql.org/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [PGlite GitHub repo](https://github.com/electric-sql/pglite)
- [SQL in LiveCodes](./sql.html.md) (using SQLite)