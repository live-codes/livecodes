import type { Template } from '../../models';

export const fsharpWasmStarter: Template = {
  name: 'fsharp-wasm',
  aliases: ['f#-wasm'],
  title: window.deps.translateString('templates.starter.fsharp-wasm', 'F# (Wasm) Starter'),
  thumbnail: 'assets/templates/fsharp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fsharp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.fsharp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.fsharp.loaded;

    // get initial output
    const initialOutput = livecodes.fsharp.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.fsharp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
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
    language: 'fsharp-wasm',
    content: `
let title = "F#"
printfn "%s" title

let input = System.Console.ReadLine()
let count = int input + 1
printfn "%d" count
`.trimStart(),
  },
};
