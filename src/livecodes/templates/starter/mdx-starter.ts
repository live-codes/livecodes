import type { Template } from '../../models';

export const mdxStarter: Template = {
  name: 'mdx',
  title: 'MDX Starter',
  thumbnail: 'assets/templates/mdx.svg',
  activeEditor: 'markup',
  markup: {
    language: 'mdx',
    content: `
import { Greeting, Counter } from './script';

<Greeting name="MDX" />

![MDX Logo]({{ __livecodes_baseUrl__ }}assets/templates/mdx.svg)

<Counter />
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
body,
body button {
  text-align: center;
  font: 1em sans-serif;
}
img {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'jsx',
    content: `
import { useState } from "react";

export const Greeting = (props) => <h1>Hello, {props.name || "World"}!</h1>;

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trimStart(),
  },
};
