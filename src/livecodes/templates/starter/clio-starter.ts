import type { Template } from '../../models';

export const clioStarter: Template = {
  name: 'clio',
  title: 'Clio Starter',
  thumbnail: 'assets/templates/clio.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/clio.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
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
    language: 'clio',
    content: `
fn capitalize str:
  (str.charAt 0 -> .toUpperCase) + (str.slice 1 -> .toLowerCase)

fn greet name:
  f"Hello, {name}!"

fn setTitle name:
  title = document.querySelector "#title"
  title.innerText = name -> capitalize -> greet

fn increment value:
  (Number value) + 1

fn activateBtn btn:
  btn.disabled = false
  btn.innerText = "Click me"
  btn

fn onBtnClick:
  counter = document.querySelector "#counter"
  counter.innerText = increment counter.innerText

export fn main argv:
  setTitle "clio"
  document.querySelector "#counter-button"
    -> activateBtn
    -> .addEventListener "click" onBtnClick
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
