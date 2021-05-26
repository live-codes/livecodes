import { Template } from '../../models';

export const polymerStarter: Template = {
  name: 'polymer',
  title: 'Polymer Starter',
  thumbnail: 'assets/templates/polymer.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <simple-greeting name="Polymer"></simple-greeting>
  <img src="{{ __localpen_baseUrl__ }}assets/templates/polymer.svg" class="logo" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <mwc-button id="counter-button" label="Click Me!" raised></mwc-button>
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
import { LitElement, property, customElement } from "lit-element";
import { html, render } from "lit-html";
import "@material/mwc-ripple";
import "@material/mwc-button";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  @property() name = "World";

  render() {
    return html\`<h1>Hello, \${this.name}!</h1>\`;
  }
}

const counter = document.querySelector("#counter");
const button = document.querySelector("#counter-button");
let count = 0;
const increment = () => {
  count += 1;
  return count;
};

button.addEventListener(
  "click",
  () => {
    render(increment(), counter);
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
