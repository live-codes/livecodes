import type { Template } from '../../models';

export const preactStarter: Template = {
  name: 'preact',
  title: 'Preact Starter',
  thumbnail: 'assets/templates/preact.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<div id="app"></div>\n',
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
    language: 'jsx',
    content: `
/** @jsx h */
import { h, render } from 'preact';
import { useSignal } from "@preact/signals?deps=preact";

function App(props) {
  const count = useSignal(0);
  return (
    <div class="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/preact.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => count.value++}>Click me</button>
    </div>
  );
}

render(<App name="Preact" />, document.body);
`.trimStart(),
  },
};
