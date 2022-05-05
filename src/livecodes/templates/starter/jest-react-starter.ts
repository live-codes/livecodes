import { Template } from '../../models';

export const jestReactStarter: Template = {
  name: 'jest-react',
  title: 'Jest/React Starter',
  thumbnail: 'assets/templates/jest.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="app">Loading...</div>
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
.info {
  color: #404040;
  font-size: 0.9em;
  margin: 2em;
}
`.trimStart(),
  },
  script: {
    language: 'jsx',
    content: `
import React, { useState } from "react";
import ReactDOM from "react-dom";

export const increment = (count) => (count ?? 0) + 1;

export default function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img
        className="logo"
        src="http://127.0.0.1:8080/livecodes/assets/templates/react.svg"
      />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(increment(count))}>Click me</button>
      <p className="info">Run tests in the "Tests" panel below.</p>
    </div>
  );
}
ReactDOM.render(<App name="Jest with React" />, document.querySelector("#app"));
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
  tests: {
    language: 'jsx',
    content: `
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { assert } from "chai";
import App, { increment } from "./script";

const container = document.querySelector('#app');
const renderComponent = async () => {
  await waitFor(async () => {
    return render(<App name="Jest with React" />, container);
  });
}

beforeEach(renderComponent);

afterEach(() => {
  unmountComponentAtNode(container);
  cleanup();
});

afterAll(renderComponent);

describe("Increment", () => {
  test("should increment count", () => {
    expect(increment(3)).toBe(4);
  });

  test("should return 1 if no count was supplied", () => {
    assert.equal(increment(), 1);
  });
});

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest with React!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('react.svg');
  });

  test("Should increment counter on button click", async () => {
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`.trimStart(),
  },
};
