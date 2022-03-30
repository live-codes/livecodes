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
      <img height="12" src="${icons.run}" />
      Run
    </a>
    <a id="watch-tests-btn" href="#" class="button disabled">
      <img height="12" class="checked" src="${icons.checked}" />
      <img height="12" class="unchecked" src="${icons.unchecked}" />
      Watch
    </a>
    <a id="reset-tests-btn" href="#" class="button">
      <img height="12" src="${icons.reset}" />
      Reset
    </a>
    ${
      isEmbed
        ? ''
        : '<a id="edit-tests-btn" href="#" class="button"><img height="12" src="' +
          icons.edit +
          '"/> Edit</a>'
    }
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

  interface TestResult {
    duration: number;
    errors: string[];
    status: 'pass' | 'fail';
    testPath: string[];
  }
  const showResults = ({ results, error }: { results: TestResult[]; error?: boolean }) => {
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
    testResultsElement.appendChild(summary);
  };

  return {
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
  } as Tool;
};

const icons = {
  run: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACkUlEQVRoge3ZS4iNYRgH8N+MGYqoWSiyEaXcoiiXSEpCFAt2LhssyGgikw1Fwgob1xU7lI0kKYnYDLmMa0iJlDQi9zFj8ZxxJDVzzvm+852Zzn9z+r7O97zPv//7Ps//fV+qqKKKKvo6+mE4arNOpBSswQd04hmWZptOcZiMdkHiTe63E2eFQr0GW0Xie3PPK/Eu964Na1GTTWqFYZdIevNf7xpwVF6daxhb/tRKX7BtWI+FeIlZuI2d6F9i7IKQVOW5iPHYh3rsQAumJRS/WyRZQr+gGVNxCxNxQ0y9wQmO81+k0QvuYLpYS1+xDo+kXKrTamrtOIhJuIwROIfTGJrGgGl35+eYj9V4j+V4IlRKtFSXw2Z04iQm4JR8yb6CMUkNUk6/9BarsASvMEesp23Cv5WELIzfeaHOIQwQTqFFVLuikZWD/YhGzMZD4eNuigIxqJiAWVvxG4JEM35hE+5hXqGBsiYCP4UjmCJUGYVLaCokSCUQ6cID4dUahTr7FWBAK4kIdIgicFRUskU9/bDSiPyLzp7+sS7NLIpALTaKrcEvXOjph5VEZDyOY4ZQogmPe/pxJUytetHdbwkSL4Q/O1BIkKwVmSlUGCcc8yFsx+dCA2VFZIg4A9goZsUdcXjRUmzALKbWYrSKLv5dfldZNAnKq8gw0eRW5p6vin3J0ySCl0ORGmHfWwWJrpOXuRIiQfqKjMYReRN4BhvEwV6iSEuROuGZ7goSr7EMK6RAomvApDEZJ4Sb7cAxbMGnFMb6gyQVGSi/25uC+6JPrJcyCZJTZAEOYyS+YTf24EdC8btFqUQahArrcs/X5Q/kKhZ95lphkj5y0UOcGLbp5VdvXagVdqNXTKMqqqiiisrEb1MziToz22dYAAAAAElFTkSuQmCC',
  checked:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACfklEQVRoge2ZO2hUQRSGv0RRMYkoSRZBCFhYKGgVsUxikU4lr840wVJFixDsotvYCrZWqVKpm8bONDaiURstTKxCQBLYuIkKPrIW51yubG52Z+a+Rrk/DAO7/znz/8ydNxQoUCAOSkAZeANsA/WMyzawBNwDel1NjAO1HMTvVb4Aoy4mdjTBY2AA6LBNkgA6gEHgiWr5DYyYBpcIe2I6DXWOmEE0bQI9JgFlwp7wDRVE210T8lslD6SpyBFDiLYlE/KWkjvTVOSILkRbzYQczBK+IlJfew5CUkFhxDf4aORgUonyHOzjwDJwpgnHWF9eRi4A37Ttm014Xhs5Aaxqu49acL010gW80zYXgQMt+F4aaQeeansfgGMGMV4aeaBtbQCnDGO8M3JN2/mBbAZN4ZWRYeAncnibtIxN1Mg+YB6YshQBcBqoahtlh/hEjYwpZwe4YSGiBHzS2HmgzSLWRp8V8Tpyhq4D9w34h4AXyn8FHDYRE0Of1Ri5inzrdeAhe+/d2oA55a0iC6ArUhvsl4HvGjMH7I/gzBKe7M5Z5I6lz2XWGiK8eakgn1GACWQs/QIuWeaNpc91+j0PrGvsc2Tr0Q981d9sJoVE9MVZR84Caxr/EvhMOH6SQmYL4kng4195nhE9blyR6cp+HNnRvgeOxszViMy3KN1AXwJ5GuHVXisOinutfwL/tZEtrX28xD6i9a5L7CgjK1r3pybHHYGm5cY/oowsaH0rNTnuuK31QlOWohd5eKwjz12+4A6iqYqsUUYYJTw0VZDdbR5jphO4iPRA8Bh6xTbJCPLw2OrZOKtSdTERoAd5eHxN+CSXZakhx+JZLD6nAgUK7MYfaphLIE5N7jQAAAAASUVORK5CYII=',
  unchecked:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABTElEQVRoge2ZQU4CQRBFX9yCbgRO4h7xAgbiQXRhjDuVA2nkGoocAM+ADmx1XFR1JpHR9LQ2U4t6SacWVHf+SzOzmALHcf7CAJgCL8AGKHe8NsAcuAP6qRJnQNFC+J/WOzBJkfjUA+6BIdBpesg/0AGOgQfN8gGMYzcPqG7iMke6RK6QTG9AL2bDlOomrPGIZLuNaV5o8zBnokRGSLZ5TPNam7s5EyWyj2QrYprDW8Iqtfn2WgiSBRexhotYw0Ws4SLWcBFruIg1XMQaLmINF7GGi1jDRazhItZwEWvUiay1WvyIfaB16yN2ncir1qNscdIJmZbff6gTmWk9zxYnnQuts1+7lD4yeCyRcZcVrpFMK+AwdtMEGTyWyLhrRDvPTBc4QW4gDENPmx4yRgaPbY+lw1qlSAR6yODxmWokt8tVAE/ADQ3+To7jbPMFrUy4GQLZs60AAAAASUVORK5CYII=',
  reset:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADm0lEQVRoge3aS4scVRQH8N9MxnQPxiQzIZMsIhjfMT6yleBroVEjqAEFNdkFdGPU6Fb0EygogvgRBJeiRBRH4+AzGhAniWYVzUKMosZxJGq7OLeoGqdtp6uqqyeQPxSnuvrec/+n695zT59zOYflhZEadU3iRmzHVbgEUzg/jXMaP+AbfIWDeB+nauRQGm3swQH8hU6f1xm8id1Y2TB3MI4ncbJAah7v4Gncgy2YwHnpmhBv6m48i7fxR6H/yaSz1ZQRO3G8QOAT7MWaEromUt/PC/qO484ubR/HphJjLEIbLxcG/Ay31aE4YQcOJ91/45U0JuwSU/e+qoNsFMQ7+A2PYkVVpV2wAvvxexrrI9yLufT5uSrKNwtP08Esrq6ibIm4xsLpm10zZRVulBsxI1xsU7gSf1poyLwSzqAtn04zYj9oCuNpzG4u+/p+lWULe1azb2IUr/nvveeJfpTtlC/sJtZEEc/rvYm+2q1TtxBlHF/iYuzDiwMg2wurcaHYMzZ1uYetS1H0lHyfGISLbQQtfCcMuXXIXCphtzzsOKvxljBk77CJVMGk2IDmlQsAh4rRwv1NYnF/gJ+HQ6c8ioZsT/LdYRCpiqIhW5I8PAwiVVE05LIkvx4GkTpxSnisJuOqgSD7/zyUJEBVjP5/k2WJlvz/CRYacjrJVU0yKonVSf6SPSgakiXKNjRGpzymkvwxe1A0JPNWlzdGpzyuSPJY9qBoyGyS1zVGpzyuTfJI9qBoyMEkb26MTnnckuR73b6ckAeNa5tiVAKTYqs4I1/0C97ITyIf21JDRm+AuF/sdQcUvNa/8ZDwz582RKpfjOCQ4PhAr4YtfJsa7hg8r75xl+B2whISdftT40OWV/JhTJ7k3reUDm15mvSxwfHqG9kPfFQfadM7Uqc5uc8eJrbJM/R9lzJekv8C6+rl1RfWi6ijgxfKKGiLtFAHH2o2iZ1hlaiRZLWS0mW59SIM6ODj9LkpTIpESEes2crB7Gb5qz2qmVhsW2HMY7ioLsUb5NNsThQmx+pSXsCYxaW3qZ49SqAtdwAdfCG8Wx0YEaWMbJ/IFvZAS9W3y197lrV/WASd/WISj8jDjmwq1Vkt7om2mF5ZONMREek0nhGV2K3Cba9M1zpRNNqV2kxbeGDghNixGzswUEQLD+INiwuXSz3C8boIACsZUOehmjXiUM0NImt5qXDXF6Tvf8X3wpUeEQdqpvUIxc/hbMY//p/+n/Z7Dv4AAAAASUVORK5CYII=',
  edit: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACC0lEQVRoge3ZP2sUQRyH8U8ukOKUtDYeJBIrSxtBrBRBQQT1HegLOLDS1kbttBIs09lpY6MRtBK00UJBQaOICFb+IYqYs5g9dk7vNnsxl52DeeDgdmcWvs/NzG+GPTKZTCbTALNNB4iYwV4soodvzcYZn1mcxwdBoP95iuMN5hqLNu4qw7/ACj4W1+u40Fi6mrSF0D28wYGorYUufggyyY5MLPEanRH9ukWfJ9uUayxiiR6uVPRtKafZrslHq08s8R4/i+8XK555UPTZP/F0NRk2nU7aWOZl0b5nGzJuSNWaqJI5qhy9mcnHrKbOwh4m08G74l538jGraSvneFV1YlDmatG/J+wzjZ5A2rhfhHmLhRrPHBP2jn5Fe4idkwpYhx3qj0TMbuV0WhF+jMbYzEgQJF5JZCSyhCyxdWQJWWLr2Ow+0VHu2FO7T8QSjY9ESykxtSMBh5XnoJvqHa2Tk4Blg69srqmWSVJiHt/xC6fxRQh4w3CZpNZEzDkh1O3i+qDRMslKwCMh2Kno3jCZpCWWhBdlnzH3V9shfFUWgOTWRMwlIdz1Ee1nDBaBJCVaWPXvu6U5YZrdEQpAX+KeBCXgiBDweXG9D5fxSRl+DbdwQlp/VQzQ3zse45ky/LpQAM4KpTlp+ntHPP9XhTWz1GCusVnAb0FmWTiitBpN9B8smoKpk8lkMplG+AMjhtjc7eXJkQAAAABJRU5ErkJggg==',
};
