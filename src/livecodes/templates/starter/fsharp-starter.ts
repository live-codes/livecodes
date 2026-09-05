import type { Template } from '../../models';

export const fsharpStarter: Template = {
  name: 'fsharp',
  aliases: ['f#', 'fs'],
  title: window.deps.translateString('templates.starter.fsharp', 'F# Starter'),
  thumbnail: 'assets/templates/fsharp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fsharp.svg" />
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
    language: 'fsharp',
    content: `
module Hello

open Browser.Dom

let counter () =
  let count = ref 0
  let button = document.querySelector("#counter-button")
  let display = document.querySelector("#counter")
  button.addEventListener("click", fun _ ->
    count.Value <- count.Value + 1
    display.textContent <- string count.Value
  )

let main () =
  let name = document.querySelector("#name")
  name.textContent <- "F#"
  printfn "Hello from F#!"
  counter ()
`.trimStart(),
  },
};
