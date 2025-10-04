# Tests

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Overview

Automated tests can be added for projects. The tests are run in the context of the result web page.

The automated tests are run by the <a href="https://jestjs.io/" target="_blank">Jest testing framework</a>, which runs totally in the browser. In addition, other [testing libraries](#supported-testing-libraries) are also supported.

Screenshots:

![Livecodes Tests](/img/screenshots/tests.jpg)

![Livecodes Tests](/img/screenshots/test-editor.jpg)

## Use Cases

- Automated tests increase the confidence in the code and can improve the quality of projects.
- Allows <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank">Test-driven development (TDD)</a>.
- Can be used for education and training by preparing projects with tests that are required to pass by the students' implementation (similar to <a href="https://www.freecodecamp.org/learn" target="_blank">freeCodeCamp</a>).
- Can be used by websites that offer coding challenges (similar to <a href="https://www.codewars.com/" target="_blank">Codewars</a>).

## Demos

Demo: (template=jest)

<LiveCodes template="jest" params={{tests: 'open'}}></LiveCodes>

<p>&nbsp;</p>

Demo: (template=jest-react)

<LiveCodes template="jest-react" params={{tests: 'open'}}></LiveCodes>

## Tests Panel

The "Tests" panel is located in the "[Tools pane](./tools-pane.html.md)" below the result page.

In the tests panel, you can find:

- "Run" button: To run tests (keyboard shortcut: Ctrl/Cmd + Alt + t).
- "Watch" button toggle: To watch the project and re-run tests automatically when code changes.
- "Reset" button: Resets test results.
- "Edit" button: Opens a code editor to edit tests (not in embeds).
- Test results.

:::info Note

Please note that the tests panel are hidden by default in [embedded playgrounds](./embeds.html.md) unless the [project has tests](../configuration/configuration-object.html.md)#tests). In such case, the panel is added to the [tools pane](./tools-pane.html.md). However, the test editor is not shown.

The [SDK](../sdk/index.html.md) can control the visibility of the different tools in the tools pane (see [`tools`](../configuration/configuration-object.html.md)#tools) property of the [configuration object](../configuration/configuration-object.html.md)).

The tests panel and the test editor are always shown in the [full standalone app](../getting-started.html.md)#standalone-app).

:::

## Supported Languages

The testing code can be written using JavaScript, TypeScript, JSX or TSX.
However, since the tests run against the result web page, they can test projects that use any language/framework.

This is [a demo](https://livecodes.io/?x=id/xyi6usem2sf&tests) for running tests against a Ruby project.

<LiveCodes import="id/xyi6usem2sf" params={{tests: "open"}} height="80vh"></LiveCodes>

Languages may have test modules. This is [an example](https://livecodes.io/?x=id/665ar3bpqka&console=full) of running [Python doctest](https://docs.python.org/3/library/doctest.html) tests:

<LiveCodes import="id/665ar3bpqka" params={{console: "full"}} height="80vh"></LiveCodes>


## Importing Code

Functions, objects or values can be exported from the `script` code like a regular ES module.
These can then be imported in the test code for usage. This is only available for code in the `script` editor. The testing code also have access to global objects like `window`.

Example:

```js
// in the script editor
export default function greet() {
  return 'Hello, World!';
}

export const add = (x, y) => x + y;

window.multiply = (x, y) => x * y;
```

```js
// in the test editor
import greet, { add } from './script'; // relative import without extension

describe('test imported', () => {
  test('greet', () => {
    expect(greet()).toBe('Hello, World!');
  });

  test('add', () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe('test global', () => {
  test('multiply', () => {
    expect(window.multiply(2, 3)).toBe(6);
  });
});
```

## Supported Jest features

- [Jest globals](https://jestjs.io/docs/api): `expect`, `test`, `xtest`, `it`, `fit`, `xit`, `describe`, `fdescribe`, `xdescribe`, `beforeAll`, `afterAll`, `beforeEach`, `afterEach`
- Jest function mocks: `jest.fn`, `jest.mocked`, `jest.replaceProperty`, `jest.spyOn`

These can be directly used in the test editor, without the need for any imports.
Autocomplete is available in Monaco editor for Jest API.

## Supported testing libraries

In addition to Jest, you may wish to use other supported testing libraries. These have to be explicitly imported to the testing code.

### Testing library

Simple and complete testing utilities that encourage good testing practices.

- <a href="https://testing-library.com/docs/dom-testing-library/intro" target="_blank">DOM Testing Library</a>

```js
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
```

- <a href="https://testing-library.com/docs/react-testing-library/intro" target="_blank">React Testing Library</a>

```js
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
```

- <a href="https://testing-library.com/docs/ecosystem-jest-dom" target="_blank">jest-dom</a>

```js
import '@testing-library/jest-dom';
```

- <a href="https://testing-library.com/docs/user-event/intro" target="_blank">user-event</a>

```js
import userEvent from '@testing-library/user-event';
```

### Chai

Jest assertions can be used in the tests. However, if you prefer Chai, it can be easily used.
Autocomplete is also available in Monaco editor for Chai API.

```js
import { assert } from 'chai';
```

## Examples

Usage examples are provided in the starter templates (<a href="pathname:///../?template=jest" target="_blank">Jest Starter</a> and <a href="pathname:///../?template=jest-react" target="_blank">Jest/React Starter</a>).

:::caution

The test code is added to the result page and runs in its context. Please note that script errors (e.g. import or syntax errors) may prevent the tests from loading.

:::

## SDK

The [SDK](../sdk/index.html.md) allows [running tests](../sdk/js-ts.html.md)#runtests) and collecting results.