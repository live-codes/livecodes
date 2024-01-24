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

function Counter(props: { name: string }) {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/solid.svg" />
      <p>You clicked {count()} times.</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

export default function App() {
  return <Counter name="Solid" />;
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
