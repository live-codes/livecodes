import { Template } from '../models';

export const reactStarter: Template = {
  title: 'React Starter',
  thumbnail: 'assets/templates/react.svg',
  language: 'jsx',
  markup: {
    language: 'html',
    content: '<div id="root">Loading...</div>\n',
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
    language: 'jsx',
    content: `
import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
      <h1>Hello, React</h1>
      <img src="{{ __localpen_baseUrl__ }}assets/templates/react.svg" className="logo" />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
ReactDOM.render(<App />, document.querySelector("#root"));
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
};
