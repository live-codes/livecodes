import { Template } from '../models';

export const typescriptStarter: Template = {
  title: 'TypeScript Starter',
  thumbnail: 'assets/templates/typescript.svg',
  language: 'typescript',
  markup: {
    language: 'html',
    content: `
<div id="root">
  <h1>Hello, TypeScript</h1>
  <img src="{{ __localpen_baseUrl__ }}assets/templates/typescript.svg" class="logo" />
  <p id="counter-text"></p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
#root,
#root button {
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
const root = document.querySelector("#root");
const counterText = document.querySelector("#counter-text");
const button = document.querySelector("#counter-button");
let count = 0;

const showCount = () => {
  counterText.innerHTML = \`You clicked \${count} times.\`;
};

button.addEventListener(
  "click",
  () => {
    count += 1;
    showCount();
  },
  false
);

showCount();
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
};
