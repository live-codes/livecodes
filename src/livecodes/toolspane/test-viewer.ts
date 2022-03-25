import { Config, Editors, EventsManager, Tool } from '../models';
import { getToolspaneElement } from '../UI';

export const createTestViewer = (
  _config: Config,
  _baseUrl: string,
  _editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
  runTests: () => Promise<void>,
): Tool => {
  let testResultsElement: HTMLElement;
  let initialRun = true;

  const createElements = () => {
    if (testResultsElement) return;
    const toolsPaneElement = getToolspaneElement();

    const container = document.createElement('div');
    container.id = 'test-container';
    toolsPaneElement.appendChild(container);

    const testActions = document.createElement('div');
    testActions.id = 'test-actions';
    testActions.innerHTML = `
    <a id="run-tests-btn" href="#">Run</a>
    <a id="watch-tests-btn" href="#">Watch</a>
    <a id="reset-tests-btn" href="#">Reset</a>
    ${isEmbed ? '' : '<a id="edit-tests-btn" href="#">Edit</a>'}
    `;
    container.appendChild(testActions);

    testResultsElement = document.createElement('div');
    testResultsElement.id = 'test-results';
    testResultsElement.classList.add('luna-console');
    testResultsElement.innerHTML = '<div class="test-summary">Loading tests...</div>';
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

  interface TestResult {
    duration: number;
    errors: string[];
    status: 'pass' | 'fail';
    testPath: string[];
  }
  const showResults = (results: TestResult[]) => {
    if (!testResultsElement) {
      createElements();
    }

    testResultsElement.innerHTML = '';
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
    Tests: ${failed} failed, ${passed} passed, ${total} total <br />
    Time: ${duration}s
`;
    testResultsElement.appendChild(summary);

    if (initialRun) {
      resetTests();
    }
    initialRun = false;
  };

  return {
    title: 'Tests',
    load: async () => {
      createElements();
    },
    onActivate: () => {
      if (initialRun) {
        runTests();
      }
    },
    onDeactivate: () => {
      //
    },
    showResults,
    resetTests,
  } as Tool;
};
