import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp } from '../helpers';

test.describe('JSX', () => {
  test('default export', async ({ page, getTestUrl }) => {
    const jsx = `export default () => <h1>Hello, World!</h1>`;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('default export with named exports', async ({ page, getTestUrl }) => {
    const jsx = `
    export const name = 'World'
    const App = () => <h1>Hello, \{name\}!</h1>
    export default App
    `;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('default export with style import', async ({ page, getTestUrl }) => {
    const jsx = `
    import "./style.css"
    const App = () => <h1>Hello, World!</h1>
    export default App
    `;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('default export with style default import', async ({ page, getTestUrl }) => {
    const jsx = `
    import styles from "./style.css"
    const App = () => <h1>{styles}</h1>
    export default App
    `;
    const css = `h1 { color: red; }`;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), css: encodeURIComponent(css) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('red');
  });

  test('no default export', async ({ page, getTestUrl }) => {
    const jsx = `
    import React from "react";
    import { createRoot } from "react-dom/client";

    function App(props) {
      return <h1>Hello, {props.name}!</h1>;
    }

    const root = createRoot(document.querySelector("#app"));
    root.render(<App name="World" />);
    `;
    const html = '<div id="app"></div>';

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), html: encodeURIComponent(html) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('no default export & no react import', async ({ page, getTestUrl }) => {
    const jsx = `
    import { createRoot } from "react-dom/client";

    function App(props) {
      return <h1>Hello, {props.name}!</h1>;
    }

    const root = createRoot(document.querySelector("#app"));
    root.render(<App name="World" />);
    `;
    const html = '<div id="app"></div>';

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), html: encodeURIComponent(html) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('add to markup', async ({ page, getTestUrl }) => {
    const jsx = `export default () => <h1>Hello, World!</h1>`;
    const html = '<div>hi</div>';

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), html: encodeURIComponent(html) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('add to specific element', async ({ page, getTestUrl }) => {
    const jsx = `export default () => <h1>Hello, World!</h1>`;
    const html = '<div id="livecodes-app"></div>';

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), html: encodeURIComponent(html) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    await getResult().waitForSelector('h1');
    expect(await getResult().innerText('#livecodes-app')).toContain('Hello, World!');
  });

  test('import default export in markup', async ({ page, getTestUrl }) => {
    const jsx = `export default \`Hello, World!\``;
    const html = `
    <script type="module">
    import text from './script';
    const h1 = document.createElement('h1');
    h1.textContent = text;
    document.body.appendChild(h1);
    </script>
    `;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx), html: encodeURIComponent(html) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });

  test('custom runtime', async ({ page, getTestUrl }) => {
    const jsx = `/** @jsx h */
    import { h, render } from 'preact';
    function App(props) {
      return <h1>Hello, {props.name}!</h1>;
    }
    render(<App name="World" />, document.body);
    `;

    await page.goto(getTestUrl({ jsx: encodeURIComponent(jsx) }));
    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1')).toContain('Hello, World!');
  });
});
