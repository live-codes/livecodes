import type { Template } from '../../models';

export const janetWasmStarter: Template = {
  name: 'janet-wasm',
  aliases: ['janet'],
  title: window.deps.translateString('templates.starter.janet-wasm', 'Janet (Wasm) Starter'),
  thumbnail: 'assets/templates/janet.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>

  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/janet.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // The program reads standard input, so give it something to read on the first run.
  livecodes.janetWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      await livecodes.janetWasm.loaded;
    } catch (error) {
      // surface the boot error instead of crashing on a null output
      button.innerText = "Error";
      console.error(error);
      return;
    }

    update(livecodes.janetWasm.output);

    button.onclick = async () => {
      button.disabled = true;
      const { output } = await livecodes.janetWasm.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = (output || '').split('\\n');

      if (!isNaN(Number(count))) {
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
    language: 'janet-wasm',
    content: `
# Read the counter from standard input; a blank or missing value counts as zero.
(def raw (string/trim (or (file/read stdin :all) "")))
(def n (or (scan-number raw) 0))
(print "Janet")
(print (inc n))
`.trimStart(),
  },
};
