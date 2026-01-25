import type { Template } from '../../models';

export const coffeescriptStarter: Template = {
  name: 'coffeescript',
  aliases: ['coffee'],
  title: window.deps.translateString('templates.starter.coffeescript', 'CoffeeScript Starter'),
  thumbnail: 'assets/templates/coffeescript.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/coffeescript.svg" />
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
    language: 'coffeescript',
    content: `
titleElement = document.getElementById 'title'
counterElement = document.getElementById 'counter'
button = document.getElementById 'counter-button'

title = 'CoffeeScript'
titleElement.innerText = title

counter = (count) -> -> count += 1
increment = counter 0

button.addEventListener('click',
  -> counterElement.innerText = increment())
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
