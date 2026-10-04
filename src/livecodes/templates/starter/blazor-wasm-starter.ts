import type { Template } from '../../models';

export const blazorWasmStarter: Template = {
  name: 'blazor-wasm',
  aliases: ['blazor', 'razor'],
  title: window.deps.translateString('templates.starter.blazor-wasm', 'Blazor (Wasm) Starter'),
  thumbnail: 'assets/templates/blazor.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <img class="logo" alt="Blazor logo" src="{{ __livecodes_baseUrl__ }}assets/templates/blazor.svg" />
  <div id="blazor-app">Loading...</div>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
body {
  font: 1em system-ui, -apple-system, sans-serif;
}
.container {
  text-align: center;
}
.logo {
  width: 120px;
}
#counter-button {
  font: inherit;
  padding: 0.4em 1.1em;
  cursor: pointer;
}
`.trimStart(),
  },
  script: {
    language: 'blazor-wasm',
    content: `
<h1>Hello, Blazor!</h1>

<p>You clicked <span id="counter">@count</span> times.</p>

<button id="counter-button" @onclick="Increment">Click me</button>

@code {
    private int count;

    private void Increment() => count++;
}
`.trimStart(),
  },
};
