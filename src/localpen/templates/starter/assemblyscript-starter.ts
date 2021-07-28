import { Template } from '../../models';

export const assemblyscriptStarter: Template = {
  name: 'assemblyscript',
  title: 'AssemblyScript Starter',
  thumbnail: 'assets/templates/assemblyscript.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __localpen_baseUrl__ }}assets/templates/assemblyscript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>loading...</button>
</div>

<script>
  (async() => {
    // \`wasm\` is a global variable (promise)
    // which exposes the compiled wasm module
    const { wasmModule } = await wasm;
    const { __getString, getTitle, increment } = wasmModule.exports;

    const title = document.querySelector('#title');
    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    title.innerHTML = __getString(getTitle());
    button.innerText = 'Click me';
    button.disabled = false;

    button.addEventListener("click", () => {
      count = increment(count);
      counter.textContent = count;
    }, false);

  })();
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
    language: 'assemblyscript',
    content: `
export function getTitle(): string {
  return "AssemblyScript";
}
export function increment(num: i32): i32 {
  return num + 1;
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {
    assemblyscript: {
      url: '{{ __localpen_baseUrl__ }}types/assemblyscript.d.ts',
      declareAsModule: false,
      autoload: true,
    },
  },
};
