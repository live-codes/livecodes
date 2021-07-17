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
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __localpen_baseUrl__ }}assets/templates/typescript.svg" />
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
class Counter {
  private count: number;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
  }
  getValue() {
    return this.count;
  }
}

const title = document.querySelector("#title");
const count = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.textContent = "TypeScript";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.textContent = String(counter.getValue());
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
