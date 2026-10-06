import type { Template } from '../../models';

export const nimStarter: Template = {
  name: 'nim',
  title: window.deps.translateString('templates.starter.nim', 'Nim Starter'),
  thumbnail: 'assets/templates/nim.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/nim.svg" />
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
    language: 'nim',
    // The JavaScript backend runs the program in the result page, so it can drive the DOM directly.
    content: `
import dom

var count = 0

proc render() =
  document.getElementById("name").innerText = "Nim"
  document.getElementById("counter").innerText = $count

proc onClick(event: Event) =
  inc count
  render()

document.getElementById("counter-button").addEventListener("click", onClick)
render()
`.trimStart(),
  },
};
