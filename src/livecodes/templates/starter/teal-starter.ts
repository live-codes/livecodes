import type { Template } from '../../models';

export const tealStarter: Template = {
  name: 'teal',
  title: 'Teal Starter',
  thumbnail: 'assets/templates/teal.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/teal.png" />
  <p id="counter">You clicked 0 times.</p>
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
    language: 'teal',
    content: `
global record Js
  record global
    record document
      querySelector: function(self: document, string): Element
    end
  end
end

global record Element
  innerHTML: string
  addEventListener: function(self: Element, string, function): nil
end

global js: Js = require "js"
global window = js.global
global document = window.document

global title = document:querySelector("#title")
global button = document:querySelector("#counter-button")
global counter_el = document:querySelector("#counter")

title.innerHTML = "Teal"

global count = 0
global function increment (current: integer): integer
  return current + 1
end

button:addEventListener("click", function()
  count = increment(count)
  counter_el.innerHTML = ("You clicked %d times."):format(count)
end)
`.trimStart(),
  },
};
