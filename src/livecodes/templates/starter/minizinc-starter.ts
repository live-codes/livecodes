import type { Template } from '../../models';

export const minizincStarter: Template = {
  name: 'minizinc',
  aliases: ['mzn'],
  title: window.deps.translateString('templates.starter.minizinc', 'MiniZinc Starter'),
  thumbnail: 'assets/templates/minizinc.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/minizinc.png" title="MiniZinc" />
  <button id="button" onclick="run()">Run</button>
  <div class="solver">
    <label for="solver" class="label">Solver:</label>
    <select id="solvers" hidden></select>
  </div>
  <label for="data" class="label">Data:</label>
  <textarea id="data">flour = 8000;
banana = 11;
sugar = 3000;
butter = 1500;
cocoa = 500;
</textarea>
  <div class="label">Output:</div>
  <pre id="output"></pre>
</div>

<script>
  const btn = document.getElementById('button');
  const menu = document.getElementById('solvers');
  const data = document.getElementById('data');
  const output = document.getElementById('output');

  const defaultSolver = 'Gecode';
  livecodes.minizinc.getSolvers().then((solvers) => {
    solvers.forEach((solver) => {
      const option = document.createElement('option');
      option.innerText = solver.name;
      if (solver.name === defaultSolver) {
        option.selected = true;
      }
      menu.append(option);
    })
    menu.hidden = false;
  });

  async function run() {

    btn.disabled = true;
    btn.innerText = 'Running...';
    output.innerHTML = 'Loading...';
    output.classList.remove('error');

    const config = {
      jsonOutput: false,
      options: { solver: menu.value || defaultSolver },
    };

    const result = await livecodes.minizinc.run({ dzn: data.value, config });

    if (result.status === 'ERROR') {
      output.classList.add('error');
      output.innerHTML = result.errors.map((err) => err.message).join('<br>');
    } else {
      output.innerHTML =
        result.solution?.output?.default ??
        result.solution?.output?.dzn ??
        JSON.stringify(
          result.solution?.output?.json ?? result.solution?.output ?? '',
          null,
          2,
        );
    }

    btn.disabled = false;
    btn.innerText = 'Run';
  }

  run();
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
* {
  box-sizing: border-box;
}

.container {
  text-align: center;
  font: 1em sans-serif;
  max-width: 900px;
  margin: 1em auto;
  padding: 0 2em;
}

.logo {
  width: 100px;
}

.label {
  display: block;
  text-align: left;
  margin: 0.5em 0;
  font-weight: bold;
}

#button {
  display: block;
  margin: 1em auto;
  width: 10em;
  height: 2em;
  background-color: #1491EB;
  border: 0;
  border-radius: 3px;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
}

#button:hover {
  background-color: #1180cf;
}

#button:disabled {
  background-color: #6a9bbe;
}

.solver {
  display: flex;
  gap: 1em;
}

#data {
  height: 9em;
  resize: vertical;
}

#data, #output {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #3d3d3d;
  margin: 1em auto;
  padding: 0.8em;
  text-align: left;
  width: 100%;
}

#output.error {
  color: red;
}
`.trimStart(),
  },
  script: {
    language: 'minizinc',
    content: String.raw`
% from https://docs.minizinc.dev/en/stable/part_2_tutorial.html
% Baking cakes for the school fete (with data file)

int: flour;  % no. grams of flour available
int: banana;  % no. of bananas available
int: sugar;  % no. grams of sugar available
int: butter;  % no. grams of butter available
int: cocoa;  % no. grams of cocoa available

constraint assert(flour >= 0,
  "Invalid datafile: " ++ "Amount of flour should be non-negative");
constraint assert(banana >= 0,
  "Invalid datafile: " ++ "Amount of banana should be non-negative");
constraint assert(sugar >= 0,
  "Invalid datafile: " ++ "Amount of sugar should be non-negative");
constraint assert(butter >= 0,
  "Invalid datafile: " ++ "Amount of butter should be non-negative");
constraint assert(cocoa >= 0,
  "Invalid datafile: " ++ "Amount of cocoa should be non-negative");

var 0..100: b;  % no. of banana cakes
var 0..100: c;  % no. of chocolate cakes

% flour
constraint 250 * b + 200 * c <= flour;
% bananas
constraint 2 * b <= banana;
% sugar
constraint 75 * b + 150 * c <= sugar;
% butter
constraint 100 * b + 150 * c <= butter;
% cocoa
constraint 75 * c <= cocoa;

% maximize our profit
solve maximize 400 * b + 450 * c;

output [
  "no. of banana cakes = \(b)\n",
  "no. of chocolate cakes = \(c)\n"];
`.trimStart(),
  },
};
