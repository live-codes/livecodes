import { Template } from '../models';

export const livescriptStarter: Template = {
  title: 'LiveScript Starter',
  thumbnail: 'assets/templates/livescript.svg',
  language: 'livescript',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <sapn id="title">World</sapn>!</h1>
  <img src="{{ __localpen_baseUrl__ }}assets/templates/livescript.svg" class="logo" />
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
    language: 'livescript',
    content: `
{ capitalize, join, map, words } = require 'prelude-ls'

title = 'live script'
|> words
|> map capitalize
|> join ''

(document.getElementById \\title).textContent = title

increment = (count) -> -> count += 1
counter = increment 0

counter-element = document.getElementById \\counter
button = document.getElementById \\counter-button

button.addEventListener \\click,
  -> counter-element.textContent = counter!
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  modules: [],
};
