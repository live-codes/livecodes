import type { Template } from '../../models';

export const postgresqlStarter: Template = {
  name: 'postgresql',
  aliases: ['pg', 'postgres', 'pgsql'],
  title: window.deps.translateString('templates.starter.postgresql', 'PostgreSQL Starter'),
  thumbnail: 'assets/templates/postgresql.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="output">
  <details open>
    <summary>Tables</summary>
    <div id="tables"></div>
  </details>
  <details open>
    <summary>Result</summary>
    <pre><code id="result"></code></pre>
  </details>
  <details open>
    <summary>Result as objects</summary>
    <pre><code id="obj-result"></code></pre>
  </details>
</div>

<script>
  livecodes.sql.render('#tables');

  livecodes.sql.getResult().then((result) => {
    console.log(result)
    document.querySelector('#result').innerHTML =  JSON.stringify(result, null, 2);
  }).catch(console.error);


  livecodes.sql.getResultAsObjects().then((results) => {
    results.forEach(console.table);
    document.querySelector('#obj-result').innerHTML = JSON.stringify(results, null, 2);
  }).catch(console.error);
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
#output {
  color: #3d3d3d;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#output summary {
  cursor: pointer;
}

#output table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 4px;
  border-spacing: 0;
  font-size: 0.9em;
  margin: 1em;
  width: 95%;
}

#output th,
#output td {
  padding: 0.5em;
}

#output tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#output pre {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 1em;
  min-width: 95%;
  padding: 1em;
}
`.trimStart(),
  },
  script: {
    language: 'postgresql',
    content: `
-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int NOT NULL,
  rev int NOT NULL,
  quote varchar(200) NOT NULL,
  PRIMARY KEY (id, rev)
);

INSERT INTO quotes (id, rev, quote) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. – Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. – Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. – T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. – Walt Disney');

SELECT a.id, a.rev, a.quote
FROM quotes a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM quotes
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM quotes a
LEFT OUTER JOIN quotes b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM quotes) a
  WHERE a.rank = 1;
`.trimStart(),
  },
};
