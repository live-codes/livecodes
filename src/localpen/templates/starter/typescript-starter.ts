import { Template } from '../../models';

export const typescriptStarter: Template = {
  name: 'typescript',
  title: 'TypeScript Starter',
  thumbnail: 'assets/templates/typescript.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, TypeScript!</h1>
  <img src="{{ __localpen_baseUrl__ }}assets/templates/typescript.svg" class="logo" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
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
    language: 'typescript',
    content: `
const counter = document.querySelector("#counter");
const button = document.querySelector("#counter-button");
let count = 0;

button.addEventListener(
  "click",
  () => {
    count += 1;
    counter.textContent = String(count);
  },
  false
);
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
