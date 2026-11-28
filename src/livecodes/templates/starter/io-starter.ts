import type { Template } from '../../models';

export const ioStarter: Template = {
  name: 'io',
  title: window.deps.translateString('templates.starter.io', 'Io Starter'),
  thumbnail: 'assets/templates/io.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/io.svg" />
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
    language: 'io',
    content: `
"Hello from Io!" println

// The Io VM can call JavaScript and reach the page through the JS object.
JS document getElementById("name") set("innerText", "Io")

button := JS document getElementById("counter-button")
button set("innerText", "Click me")
button set("disabled", false)

count := 0
button addEventListener("click", block(
  count = count + 1
  JS document getElementById("counter") set("innerText", count)
  writeln("clicked ", count, " times")
))
`.trimStart(),
  },
};
