import { Config, Editors, EventsManager, TestResult, TestViewer } from '../models';
import { getToolspaneElement } from '../UI';

export const createTestViewer = (
  _config: Config,
  _baseUrl: string,
  _editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
  runTests: () => Promise<void>,
): TestViewer => {
  let testResultsElement: HTMLElement;
  const loading = '<div class="test-summary">Loading tests...</div>';

  const createElements = () => {
    if (testResultsElement) return;
    const toolsPaneElement = getToolspaneElement();

    const container = document.createElement('div');
    container.id = 'test-container';
    toolsPaneElement.appendChild(container);

    const testActions = document.createElement('div');
    testActions.id = 'test-actions';
    testActions.classList.add('buttons');
    testActions.innerHTML = `
    <a id="run-tests-btn" href="#" class="button hint--top" data-hint="Ctrl/Cmd + Alt + T">
      ${icons.run} Run
    </a>
    <a id="watch-tests-btn" href="#" class="button disabled hint--top" data-hint="Run tests when code changes">
      ${icons.checked} ${icons.unchecked} Watch
    </a>
    <a id="reset-tests-btn" href="#" class="button">${icons.reset} Reset</a>
    ${isEmbed ? '' : '<a id="edit-tests-btn" href="#" class="button">' + icons.edit + ' Edit</a>'}
    `;
    container.appendChild(testActions);

    testResultsElement = document.createElement('div');
    testResultsElement.id = 'test-results';
    testResultsElement.classList.add('luna-console');
    testResultsElement.innerHTML = loading;
    container.appendChild(testResultsElement);

    eventsManager.addEventListener(
      document.querySelector('#reset-tests-btn') as HTMLElement,
      'click',
      (ev: Event) => {
        ev.preventDefault();
        resetTests();
      },
    );
  };

  const resetTests = () => {
    testResultsElement.querySelectorAll<HTMLElement>('.test-result').forEach((item) => {
      item.querySelectorAll('.test-error').forEach((err) => err.remove());
      if (item.classList.contains('pass')) {
        item.classList.remove('pass');
      }
      if (item.classList.contains('fail')) {
        item.classList.remove('fail');
      }
    });
    const testSummary = testResultsElement.querySelector<HTMLElement>('.test-summary');
    if (testSummary) {
      testSummary.innerText = '';
    }
  };

  const clearTests = () => {
    if (testResultsElement) {
      testResultsElement.innerHTML = loading;
    }
  };

  const showResults = ({ results, error }: { results: TestResult[]; error?: string }) => {
    if (!testResultsElement) {
      createElements();
    }
    testResultsElement.innerHTML = '';

    if (error) {
      testResultsElement.innerHTML =
        '<div class="no-tests"><span class="fail">Test error!</span></div>';
      return;
    }

    if (results.length === 0) {
      testResultsElement.innerHTML = '<div class="no-tests">This project has no tests!</div>';
      return;
    }

    results.forEach((result) => {
      const item = document.createElement('div');
      item.innerText = result.testPath.filter((p) => p !== 'ROOT_DESCRIBE_BLOCK').join(' › ');
      item.classList.add('test-result', result.status);
      result.errors
        .map((err) => err.split('at Object.<anonymous>')[0]?.trim())
        .map((err) =>
          err.startsWith('AssertionError: ') ? err.replace('AssertionError: ', '') : err,
        )
        .forEach((err) => {
          const testError = document.createElement('pre');
          testError.classList.add('test-error');
          testError.innerText = err;
          item.appendChild(testError);
        });
      testResultsElement.appendChild(item);
    });

    const passed = results.filter((r) => r.status === 'pass').length;
    const failed = results.filter((r) => r.status === 'fail').length;
    const total = results.length;
    const duration = results.reduce((totalDuration, r) => totalDuration + r.duration, 0) / 1000;
    const summary = document.createElement('div');
    summary.classList.add('test-summary');
    summary.innerHTML = `
    Tests: ${failed !== 0 ? '<span class="fail">' + failed + ' failed</span>,' : ''}
           ${passed !== 0 ? '<span class="pass">' + passed + ' passed</span>,' : ''}
           ${total} total <br />
    Time: ${duration}s
`;
    testResultsElement.prepend(summary);
  };

  return {
    name: 'tests',
    title: 'Tests',
    load: async () => {
      createElements();
    },
    onActivate: () => {
      runTests();
    },
    onDeactivate: () => {
      //
    },
    showResults,
    resetTests,
    clearTests,
  };
};

const icons = {
  run: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Play</title><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>',
  checked:
    '<svg xmlns="http://www.w3.org/2000/svg" class="checked" viewBox="0 0 512 512"><title>Checkbox</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/><rect x="64" y="64" width="384" height="384" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>',
  unchecked:
    '<svg xmlns="http://www.w3.org/2000/svg" class="unchecked" viewBox="0 0 512 512"><title>Square</title><path d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',
  reset:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Refresh</title><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>',
  edit: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>',
};
