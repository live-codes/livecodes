# Tests

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Overview

Automated tests can be added for projects. The tests are run in the context of the result web page.
The "Tests" panel is located in the "[Tools pane](./tools-pane.md)" below the result page.

The automated tests are run by the <a href="https://jestjs.io/" target="_blank">Jest testing framework</a>, which runs totally in the browser (using <a href="https://github.com/kvendrik/jest-lite" target="_blank">jest-lite</a>). In addition, other [testing libraries](#supported-testing-libraries) are also supported.

Screenshots:

![Livecodes Tests](/img/screenshots/tests.png)

![Livecodes Tests](/img/screenshots/test-editor.png)

## Use Cases

- Automated tests increase the confidence in the code and can improve the quality of projects.
- Allows <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank">Test-driven development (TDD)</a>.
- Can be used for education and training by preparing projects with tests that are required to pass by the students' implementation (similar to <a href="https://www.freecodecamp.org/learn" target="_blank">freeCodeCamp</a>).
- Can be used by wesites that offer coding challenges (similar to <a href="https://www.codewars.com/" target="_blank">Codewars</a>).

## Demos

Demo: (template=jest)

<LiveCodes query="template=jest&tests"></LiveCodes>

<p>&nbsp;</p>

Demo: (template=jest-react)

<LiveCodes query="template=jest-react&tests"></LiveCodes>

In the tests panel, you can find:

- "Run" button: To run tests (keyboard shortcut: Ctrl/Cmd + Alt + t).
- "Watch" button toggle: To watch the project and re-run tests automatically when code changes.
- "Reset" button: Resets test results.
- "Edit" button: Opens a code editor to edit tests (not in embeds).
- Test results.

## Supported Languages

The testing code can be written using JavaScript, TypeScript, JSX or TSX.
However, since the tests are run against the result web page, they can test projects that use any language/framework.

This is <a href="https://livecodes.io/?x=id/3i8wrwcwhud&tests" target="_blank">a demo</a> for running tests against a Python project.

<LiveCodes query="x=id/3i8wrwcwhud&tests"></LiveCodes>

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

- Jest globals: `expect`, `test`, `it`, `describe`, `beforeAll`, `afterAll`, `beforeEach`, `afterEach`
- Jest function mocks: `jest.fn`, `jest.spyOn`, `jest.clearAllMocks`, `jest.resetAllMocks`

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

### Chai

Jest assertions can be used in the tests. However, if you prefer to Chai, it can be easily used.
Autocomplete is also available in Monaco editor for Chai API.

```js
import { assert } from 'chai';
```

## Examples

Usage examples are provided in the starter templates (<a href="/?template=jest" target="_blank">Jest Starter</a> and <a href="/?template=jest-react" target="_blank">Jest/React Starter</a>).

:::caution

The test code is added to the result page and run in its context. Please note that script errors (e.g. import or syntax errors) may prevent the tests from loading.

:::

## API

Tests can be run and test results collected by the [API](../advanced/api.md).
