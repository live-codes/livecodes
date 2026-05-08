---
name: livecodes/testing
description: >
  Write and run automated tests with Jest and Testing Library in the browser.
  Import code from script editor, use watch mode, and run tests programmatically.
  Load this skill when writing tests for playground code or running tests via SDK.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/features/tests.mdx
---

# LiveCodes — Write and Run Tests

LiveCodes includes Jest and Testing Library for automated testing in the browser. Tests run against the result page in real-time.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Project with tests
createPlayground('#container', {
  template: 'jest', // Jest starter template
  params: { tests: 'open' }, // Show tests panel
});

// Custom test configuration
createPlayground('#container', {
  config: {
    activeEditor: 'script',
    script: {
      language: 'javascript',
      content: `
export function add(a, b) {
  return a + b;
}

export function greet(name) {
  return 'Hello, ' + name;
}
      `,
    },
    tests: {
      language: 'javascript',
      content: `
import { add, greet } from './script';

describe('add', () => {
  test('adds numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('handles negatives', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

describe('greet', () => {
  test('greets by name', () => {
    expect(greet('World')).toBe('Hello, World');
  });
});
      `,
    },
  },
  params: { tests: 'open' },
});
```

## Core Patterns

### Test exports from script editor

```javascript
// Script editor (script.js)
export default function greet(name) {
  return 'Hello, ' + name;
}

export const add = (a, b) => a + b;

// Also available in global scope
window.multiply = (a, b) => a * b;
```

```javascript
// Tests editor
import greet, { add } from './script'; // Relative import, no extension

describe('imports', () => {
  test('greet', () => {
    expect(greet('World')).toBe('Hello, World');
  });

  test('add', () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe('globals', () => {
  test('multiply', () => {
    expect(window.multiply(2, 3)).toBe(6);
  });
});
```

### Use Testing Library

```javascript
// React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('button click', async () => {
  render(<MyComponent />);
  await userEvent.click(screen.getByText('Click me'));
  expect(screen.getByText('Clicked')).toBeInTheDocument();
});

// DOM Testing Library
import { getByText, waitFor } from '@testing-library/dom';

test('element appears', async () => {
  document.body.innerHTML = '<div id="root"></div>';
  // ... render something
  await waitFor(() => {
    expect(getByText(document.body, 'Loaded')).toBeTruthy();
  });
});
```

### Run tests programmatically via SDK

```javascript
const playground = await createPlayground('#container', {
  config: {
    /* ... */
  },
});

// Run tests and get results
const { results } = await playground.runTests();

results.forEach((result) => {
  console.log(result.status); // 'pass', 'fail', or 'skip'
  console.log(result.testPath); // ['describe', 'it']
  console.log(result.duration); // milliseconds
  console.log(result.errors); // string[] of error messages
});

// Watch for test results
playground.watch('tests', ({ results, error }) => {
  if (error) {
    console.error('Test error:', error);
    return;
  }
  const passed = results.filter((r) => r.status === 'pass');
  console.log(`${passed.length} tests passed`);
});
```

### Use Jest globals directly

```javascript
// Jest globals available without import
describe('my tests', () => {
  test('passes', () => {
    expect(1 + 1).toBe(2);
  });

  test('asynchronous', async () => {
    const result = await someAsyncFunction();
    expect(result).toBe('expected');
  });

  test.skip('skipped', () => {
    // Not run
  });

  test.only('run only this', () => {
    // Only this test runs
  });
});

// Lifecycle hooks
beforeAll(() => {
  /* runs once before all tests */
});
afterAll(() => {
  /* runs once after all tests */
});
beforeEach(() => {
  /* runs before each test */
});
afterEach(() => {
  /* runs after each test */
});

// Mocks
jest.fn();
jest.mocked(obj);
jest.spyOn(obj, 'method');
```

### Use Chai assertions (alternative)

```javascript
import { assert } from 'chai';

describe('with Chai', () => {
  test('assertions', () => {
    assert.equal(1 + 1, 2);
    assert.isArray([1, 2, 3]);
    assert.include([1, 2, 3], 2);
  });
});
```

## Test Panel Controls

In the standalone app or visible tests panel:

- **Run button**: Run tests (shortcut: Ctrl/Cmd + Alt + T)
- **Watch toggle**: Auto-run tests on code change
- **Reset button**: Clear test results
- **Edit button**: Open test editor (not available in embeds)

## Common Mistakes

### HIGH Script errors prevent tests from loading

Wrong:

```javascript
// Script editor has syntax error
export function add(a, b) {
  return a +  // Syntax error - missing operand
}

// Tests editor - tests never run because script failed
import { add } from './script';
test('add', () => expect(add(1, 2)).toBe(3));
```

Understanding:

```javascript
// Tests run against the result page
// Script errors prevent the page from loading
// Always ensure script compiles before testing

// Check the console for script errors
// Fix script errors before writing tests
```

Tests are added to the result page. Script errors (import errors, syntax errors) prevent the result page from loading, which prevents tests from running.

Source: docs/docs/features/tests.mdx — Example section

### MEDIUM Import path must be relative without extension

Wrong:

```javascript
import { add } from 'script'; // Missing ./
import { add } from './script.js'; // Has extension
```

Correct:

```javascript
import { add } from './script'; // Relative import, no extension
```

When importing from the script editor in tests, use relative imports without file extensions.

Source: docs/docs/features/tests.mdx — Importing Code section

## Supported Jest Features

| Feature                      | Support              |
| ---------------------------- | -------------------- |
| `describe`, `test`, `it`     | Full support         |
| `xtest`, `xit`, `fit`        | Skip/only tests      |
| `xdescribe`, `fdescribe`     | Skip/only suites     |
| `beforeAll`, `afterAll`      | Lifecycle hooks      |
| `beforeEach`, `afterEach`    | Lifecycle hooks      |
| `expect`                     | Full matchers        |
| `jest.fn()`, `jest.mocked()` | Function mocks       |
| `jest.spyOn()`               | Spy on methods       |
| `jest.replaceProperty()`     | Property replacement |

## Supported Testing Libraries

| Library               | Import                                                      |
| --------------------- | ----------------------------------------------------------- |
| DOM Testing Library   | `import { getByText, waitFor } from '@testing-library/dom'` |
| React Testing Library | `import { render, screen } from '@testing-library/react'`   |
| jest-dom              | `import '@testing-library/jest-dom'`                        |
| user-event            | `import userEvent from '@testing-library/user-event'`       |
| Chai                  | `import { assert } from 'chai'`                             |

Tests run in the browser using Jest. Libraries are automatically available — no import maps needed for testing libraries.
