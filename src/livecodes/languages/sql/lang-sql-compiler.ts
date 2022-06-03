import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { sqljsBaseUrl } from '../../vendors';

(self as any).createSqlCompiler = (): CompilerFunction => {
  const SQLPromise = (self as any).initSqlJs({
    locateFile: (filename: string) => sqljsBaseUrl + filename,
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
};
