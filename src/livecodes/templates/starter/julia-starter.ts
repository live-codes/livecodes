import type { Template } from '../../models';

export const juliaStarter: Template = {
  name: 'julia',
  title: 'Julia Starter',
  thumbnail: 'assets/templates/julia.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/julia.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.julia.input = "";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.julia.loaded;

    // get initial output
    const initialOutput = livecodes.julia.output;
    update(initialOutput);

    button.innerText = "Click me";
    button.disabled = false;
    button.onclick = async () => {
      // run with new input
      const output = await livecodes.julia.run(window.count);
      update(output);
    };

    function parseOutput(output) {
      return output.replace(/"/g, '').split('\\n');
    }

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = parseOutput(output);

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'julia',
    content: `
function increment(x)
    if x == ""
        return 0
    else
        num = parse(Int, x)
        num + 1
    end
end

function getTitle()
    "Julia"
end

function formatOutput(args...)
    join(map(x -> string(x), args), "\\n")
end

formatOutput(getTitle(), increment(livecodesInput))
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
