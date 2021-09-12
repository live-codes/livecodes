import { Template } from '../../models';

export const sqlStarter: Template = {
  name: 'sql',
  title: 'SQL Starter',
  thumbnail: 'assets/templates/sqlite.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="tables"></div>
<pre id="raw-output" class="output"></pre>
<pre id="flat-output" class="output"></pre>

<script>
  localpen.sql.render('#tables');

  localpen.sql.getResult().then((raw) => {
    console.log(raw)
    document.querySelector('#raw-output').innerHTML = 'raw output: \\n' + JSON.stringify(raw, null, 2);
  }).catch(console.error);


  localpen.sql.getResultAsTables().then((results) => {
    results.forEach(console.table);
    document.querySelector('#flat-output').innerHTML = 'flat output: \\n' + JSON.stringify(results, null, 2);
  }).catch(console.error);
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
body {
  color: #272727;
  margin: 1em;
}

table {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 5px;
  border-spacing: 0;
  margin: 1em;
  width: 95%;
}

th, td {
  text-align: left;
  padding: 0.5em;
}

tr:nth-child(odd) {background-color: #f2f2f2;}

pre.output {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 1em;
  padding: 1em;
}
`.trimStart(),
  },
  script: {
    language: 'sql',
    content: `
-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS \`quotes\` (
  \`id\` int(6) NOT NULL,
  \`rev\` int(3) NOT NULL,
  \`quote\` varchar(200) NOT NULL,
  PRIMARY KEY (\`id\`,\`rev\`)
);

INSERT INTO \`quotes\` (\`id\`, \`rev\`, \`quote\`) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. – Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. – Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. – T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. – Walt Disney');

SELECT * FROM \`quotes\`;

SELECT a.id, a.rev, a.quote
FROM \`quotes\` a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM \`quotes\`
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM \`quotes\` a
LEFT OUTER JOIN \`quotes\` b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM \`quotes\`) a
  WHERE a.rank = 1
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
