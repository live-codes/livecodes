import { Template } from '../../models';

export const mdxStarter: Template = {
  name: 'mdx',
  title: 'MDX Starter',
  thumbnail: 'assets/templates/mdx.svg',
  activeEditor: 'markup',
  markup: {
    language: 'mdx',
    content: `
import Paper from '@material-ui/core/Paper';

<Paper>
  <Hello title="MDX" />
</Paper>

![MDX Logo]({{ __livecodes_baseUrl__ }}assets/templates/mdx.svg)

<Counter variant="outlined" color="primary" />
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
import Button from "@material-ui/core/Button";

export const Hello = (props) => <h1>Hello, {props.title || "World"}!</h1>;

export function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <Button
        variant={props.variant}
        color={props.color}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </Button>
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
