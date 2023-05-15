import type { Template } from '../../models';

export const mdxStarter: Template = {
  name: 'mdx',
  title: 'MDX Starter',
  thumbnail: 'assets/templates/mdx.svg',
  activeEditor: 'markup',
  markup: {
    language: 'mdx',
    content: `
import { Hello, Counter } from './script';

<Hello title="MDX" />

![MDX Logo](http://127.0.0.1:8080/livecodes/assets/templates/mdx.svg)

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
import React, { useState } from "react";

export const Hello = (props) => <h1>Hello, {props.title || "World"}!</h1>;

export function Counter(props) {
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
