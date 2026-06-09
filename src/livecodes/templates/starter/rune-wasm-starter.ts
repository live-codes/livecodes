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

    await livecodes.runeWasm.loaded;

    if (livecodes.runeWasm.output) {
      document.querySelector("#title").innerHTML = livecodes.runeWasm.output;
    }

    button.disabled = false;
    button.textContent = "Click me";

    let count = 0;
    button.onclick = () => {
      count++;
      document.querySelector("#counter").innerText = count;
    };

    // check console
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

    let a = 10;
    let b = 32;
    let sum = a + b;
    println(\`\${a} + \${b} = \${sum}\`);
}
`.trimStart(),
  },
};
