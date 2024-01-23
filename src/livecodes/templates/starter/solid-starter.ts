import type { Template } from '../../models';

export const solidStarter: Template = {
  name: 'solid',
  title: 'Solid Starter',
  thumbnail: 'assets/templates/solid.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
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
    language: 'solid.tsx',
    content: `
import { createSignal } from "solid-js";

function Greeting(props: { name: string }) {
  return (
    <>
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/solid.svg" />
    </>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);
  return (
    <>
      <p>You clicked {count()} times.</p>
      <button onClick={increment}>Click me</button>
    </>
  );
}

export default function App() {
  return (
    <div className="container">
      <Greeting name="Solid" />
      <Counter />
    </div>
  );
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
