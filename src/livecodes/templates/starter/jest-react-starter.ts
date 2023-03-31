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
import { createRoot } from "react-dom/client";

export const increment = (count) => (count ?? 0) + 1;

export default function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>{'Hello'}, {props.name}!</h1>
      <img className="logo" src="https://dev.livecodes.io/livecodes/assets/templates/jest.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p className="info">Run tests in the "Tests" panel below.</p>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App name="Jest with React" />);
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
  tests: {
    language: 'tsx',
    content: `
import React from "react";
import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { assert } from "chai";
import App, { increment } from "./script";

const renderComponent = () => {
  cleanup();
  return waitFor(() => {
    return render(<App name="Jest with React" />, {
      container: document.querySelector('#app')
    });
  });
}

beforeEach(renderComponent);

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
    expect(document.querySelector('.logo').src).toContain('jest.svg');
  });

  test("Should increment counter on button click", async () => {
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`.trimStart(),
  },
};
