import type { Template } from '../../models';

export const jest: Template = {
  name: 'multifile-jest',
  title: window.deps.translateString('templates.multifile.jest', 'Jest Template'),
  thumbnail: 'assets/templates/jest.svg',
  mainFile: 'index.html',
  activeEditor: 'Counter.js',
  autotest: true,
  files: [
    {
      filename: 'index.html',
      language: 'html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>
    <div class="container">
      <h1>Hello, <span id="title">World</span>!</h1>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
      <p>You clicked <span id="counter">0</span> times.</p>
      <button id="counter-button">Click me</button>
      <p class="info">Run tests in the "Tests" panel below.</p>
    </div>

    <script type="module" src="script.js"></script>
  </body>
</html>
`,
    },
    {
      filename: 'styles.css',
      language: 'css',
      content: `.container,
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
`,
    },
    {
      filename: 'script.js',
      language: 'javascript',
      content: `import { Counter } from './Counter.js';

const title = document.querySelector("#title");
const count = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "Jest";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.innerText = counter.getValue();
  },
  false
);
`,
    },
    {
      filename: 'Counter.js',
      language: 'javascript',
      content: `export class Counter {
  count;

  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
  }

  getValue() {
    return this.count;
  }
}
`,
    },
  ],
  tests: {
    language: 'tsx',
    content: `import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { assert } from "chai";
import { Counter } from "./Counter.js";

describe("Counter Class", () => {
  test("Should initialize count with zero", () => {
    const counter = new Counter();
    expect(counter.getValue()).toBe(0);
  });

  test("Should increment", () => {
    const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.increment();
    assert.equal(counter.getValue(), 3);
  });})

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('jest.svg');
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
`,
  },
  tools: {
    enabled: 'all',
    active: 'tests',
    status: 'open',
  },
};
