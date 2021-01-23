import { Template } from '../models';

export const preactStarter: Template = {
  title: 'Preact Starter',
  thumbnail: 'assets/templates/preact.svg',
  language: 'jsx',
  markup: {
    language: 'html',
    content: '<div id="root"></div>\n',
  },
  style: {
    language: 'css',
    content: `
#app,
#app button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'js',
    content: `
import { h, Component, render } from "preact";
import { useState } from "preact/hooks";
import htm from "htm";

const html = htm.bind(h);

function App(props) {
  const [counter, setCounter] = useState(0);
  return html\`
  <div id="app">
    <h1>Hello, \${props.name}!</h1>
    <img src="/localpen/assets/templates/preact.svg" className="logo" />
    <p>You clicked \${counter} times.</p>
    <button onClick=\${() => setCounter(counter + 1)}>Click me</button>
  </div>
  \`;
}

render(html\`<\${App} name="Preact" />\`, document.querySelector("#root"));
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  modules: [],
};
