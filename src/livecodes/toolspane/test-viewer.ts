/* eslint-disable import/no-internal-modules */
import type { Config, Editors, EventsManager, TestResult, TestViewer } from '../models';
import { sandboxService } from '../services/sandbox';
import { getToolspaneElement } from '../UI';
import * as icons from '../UI/icons';

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
      if (item.classList.contains('skip')) {
        item.classList.remove('skip');
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
        .map((err) => err.split(`at ${sandboxService.getResultUrl()}`)[0]?.trim())
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
    const skipped = results.filter((r) => r.status === 'skip').length;
    const total = results.length;
    const duration = results.reduce((totalDuration, r) => totalDuration + r.duration, 0) / 1000;
    const summary = document.createElement('div');
    summary.classList.add('test-summary');
    summary.innerHTML = `
    Tests: ${failed !== 0 ? '<span class="fail">' + failed + ' failed</span>,' : ''}
           ${passed !== 0 ? '<span class="pass">' + passed + ' passed</span>,' : ''}
           ${skipped !== 0 ? '<span class="skip">' + skipped + ' skipped</span>,' : ''}
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
