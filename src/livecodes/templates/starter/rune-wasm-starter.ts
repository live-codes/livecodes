import type { Template } from '../../models';

export const runeWasmStarter: Template = {
  name: 'rune-wasm',
  aliases: ['rune', 'rn'],
  title: window.deps.translateString('templates.starter.rune-wasm', 'Rune Starter'),
  thumbnail: 'assets/templates/rune.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rune.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");
    let count = 0;

    await livecodes.runeWasm.loaded;

    const initialOutput = livecodes.runeWasm.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      await livecodes.runeWasm.run(count.toString());
      update(livecodes.runeWasm.output);
    };

    function update(output) {
      const lines = (output || '').trim().split('\\n');
      if (lines[0]) {
        document.querySelector("#title").innerText = lines[0];
      }
      const parsed = parseInt(lines[1]);
      if (!isNaN(parsed)) {
        count = parsed;
        document.querySelector("#counter").innerText = count;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }

    console.log("Rune WASM is ready!");
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
    language: 'rune-wasm',
    content: `
pub fn main() {
    println("Hello, Rune!");
    let count = input;
    count = count + 1;
    println(\`{count}\`);
}
`.trimStart(),
  },
};
