/* eslint-disable import/no-internal-modules */
import type { I18nKeyType } from './i18n';
import type { Config, CustomEvents } from './models';
import { livecodes, params, isEmbed, clickToLoad, loading } from './main';
import { customEvents } from './events/custom-events';

const rootSelector = '#livecodes';
const loadingEl = document.querySelector<HTMLElement>('#loading')!;
const loadingText = document.querySelector<HTMLElement>('#loading-text')!;
const loadingHTML = loadingEl.innerHTML;

if (isEmbed) {
  document.body.classList.add('embed');
  if (clickToLoad) {
    loadingEl.classList.add('click-to-load');
    loadingEl.title = 'Click to Load';
    loadingText.innerText = 'Click to load LiveCodes';

    // load on click
    loadingEl.addEventListener('click', load);

    // load from API
    addEventListener('message', (e) => {
      if (e.source === parent && e.data?.type === customEvents.load) {
        load();
      }
    });

    // load on visible
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              load();
              observer.unobserve(document.body);
            }
          });
        },
        { rootMargin: '150px' },
      );
      observer.observe(document.body);
    }
  }
} else {
  // Splash i18n
  const i18nItem = (item: I18nKeyType) => `i18n_${item}`;
  const i18nLoadingText = localStorage.getItem(i18nItem('splash.loading'));
  if (i18nLoadingText) {
    loadingText.innerText = i18nLoadingText;
  }
}

function load() {
  window.dispatchEvent(new Event(customEvents.load));

  if (!clickToLoad) return;
  loadingEl.style.opacity = '0';
  setTimeout(() => {
    loadingEl.classList.remove('click-to-load');
    loadingEl.innerHTML = loadingHTML;
    loadingEl.title = '';
    loadingEl.style.opacity = '1';
  }, 500);
}

function loaded() {
  loadingEl.style.opacity = '0';
  setTimeout(() => {
    loadingEl.remove();
  }, 500);

  document.querySelector<HTMLElement>(rootSelector)!.style.opacity = '1';
}

function resize() {
  document.body.style.height = window.innerHeight + 'px';
}

resize();
window.addEventListener('resize', resize, false);
setTimeout(resize, 500);

window.addEventListener(customEvents.appLoaded, (e: CustomEventInit) => {
  loaded();
  (window as any).livecodes = e.detail;
});

// window.addEventListener(customEvents.ready, () => {
//   // project loaded
// });

// window.addEventListener(customEvents.change, () => {
//   // content changed
// });

// window.addEventListener(customEvents.testResults, (e: CustomEventInit) => {
//   const testResults = e.detail;
// });

// window.addEventListener(customEvents.console, (e: CustomEventInit) => {
//   const { method, args } = e.detail;
// });

window.addEventListener(customEvents.destroy, () => {
  window.removeEventListener('resize', resize);
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

if (isEmbed && params.get('config') === 'sdk') {
  addEventListener(
    'message',
    function configHandler(
      e: MessageEventInit<{ type: CustomEvents['config']; payload: Partial<Config> }>,
    ) {
      if (e.source !== parent || e.data?.type !== customEvents.config) return;
      removeEventListener('message', configHandler);
      livecodes('#livecodes', e.data.payload).then(loaded);
    },
  );
  parent.postMessage({ type: customEvents.getConfig }, '*');
} else {
  livecodes('#livecodes').then(loaded);
}

const showConsoleMessage = () => {
  const items = [
    {
      content: ' ',
      style:
        'padding-left: 2.5em; line-height: 4em; background-size: 2.5em; background-repeat: no-repeat; background-position: left center; background-image: url("data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MzciIGhlaWdodD0iNDg4IiAgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHN0eWxlPjwhW0NEQVRBWy5Ce3N0cm9rZTpub25lfS5De2ZpbGw6dXJsKCNDKX0uRHtmaWxsOiM5NmJmM2R9LkV7ZmlsbC1ydWxlOm5vbnplcm99XV0+PC9zdHlsZT48ZGVmcz48ZmlsdGVyIGlkPSJBIiB4PSItMS44MTgyJSIgeT0iLTIuNzIyOSUiIHdpZHRoPSIxMDQuMDU1OSUiIGhlaWdodD0iMTA2LjA3NDElIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjUiLz48ZmVPZmZzZXQgZHg9IjMiIGR5PSIzIiByZXN1bHQ9IkIiLz48ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAwMCIgZmxvb2Qtb3BhY2l0eT0iLjUiLz48ZmVDb21wb3NpdGUgaW4yPSJCIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iQyIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0iQyIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48ZmlsdGVyIGlkPSJCIiB4PSItNC40MDY4JSIgeT0iLTMuNjExMSUiIHdpZHRoPSIxMDkuODMwNSUiIGhlaWdodD0iMTA4LjA1NTYlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjUiLz48ZmVPZmZzZXQgZHg9IjMiIGR5PSIzIiByZXN1bHQ9IkIiLz48ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAwMCIgZmxvb2Qtb3BhY2l0eT0iLjUiLz48ZmVDb21wb3NpdGUgaW4yPSJCIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iQyIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0iQyIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9IkMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkN2Q3ZDciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2MjYyNjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjQSkiIGZpbGw9IiNjMWMxYzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuNSA0LjUpIiBjbGFzcz0iQiBFIj48cGF0aCBkPSJNMTYuNzUyNSAyODYuNzI5OEM2LjcwNjYgMjc1Ljc0NTUgMCAyNTMuODA5NyAwIDIzNC41OTA5YzAtMTkuMjA2MSA1LjAyNjYtMzcuMDMyIDE3LjU4OTEtNDYuNjMzNmgtLjgzNTdMMjE0LjQyOTIgMHYxMjcuNTk2NGMtMjEuNzc4NCAyMC41NzYyLTUxLjA5MzkgNDMuOTA1Ny0xMjQuODAyOCAxMDguMzg5MWwuODM1NyAxLjM1NTJjMzkuMzY3MyAyOC44MjIgODQuNTk4OCA3Mi43MTYzIDEyMy45NjYyIDExMS4xMjk3djEyOC45NjZ6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAwLjU3MTYgLjAwMTcpIj48cGF0aCBkPSJNMTk3LjY3NjEgMTkwLjY5NTZjMTAuMDM4NSAxMC45ODUgMTYuNzUyMyAzMi45MzE3IDE2Ljc1MjMgNTIuMTM5NnMtNS4wMjY4IDM3LjAzMDgtMTcuNTk2MiA0Ni42MzM2aC44NDQzTDAgNDc3LjQyNjZWMzQ5LjgyOTdjMjEuNzc5My0yMC41NjQ4IDUxLjA5NC00My44OTM3IDEyNC44MDM0LTEwOC4zNzc3bC0uODM1Ny0xLjM1NTNDODQuNjA3IDIxMS4yNzQ3IDM5LjM2OTIgMTY3LjM3OTkuMDAwOSAxMjguOTY3NlYweiIvPjwvZz48L2c+PGcgZmlsdGVyPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTkuNSA1OS41KSIgY2xhc3M9IkIiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0Ny4yMjkgOTIuNTk1MSkiPjxwYXRoIGQ9Ik0wIDI2MS45MjM4bDE0My4xNjk4LTg3LjQ1MzRWMEwwIDg3LjIxMDl2MTc0LjcxMjl6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMzMwMiA5Mi43NDA1KSI+PHBhdGggZD0iTTAgMTc0LjI3NjRsMTQyLjk4OTQgODcuMzA4MVY4Ny4xMTQyTDAgMHYxNzQuMjc2NHoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4yMzI1IDYuMDE0NykiPjxwYXRoIGQ9Ik0yODQuMTc0MyA4Ni41ODA1TDE0Mi4wODcyIDAgMCA4Ni41ODA1bDE0Mi4wODcyIDg2LjcyNTcgMTQyLjA4NzEtODYuNzI1N3oiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjMxOTYgOTIuNTk1MSkiPjxwYXRoIGQ9Ik0wIDgxLjU4NDVMMTMzLjgzMjcuMDk2NyAxMzMuNjk3NCAwIDAgODEuNTg0NXoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMuNDg3IDkyLjU5NTEpIj48cGF0aCBkPSJNLjEzNTMgMEwwIC4wOTY3bDEzMy44MzI3IDgxLjQ4NzhMLjEzNTMgMHoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjMxOTYgMTc0LjE3OTIpIj48cGF0aCBkPSJNMCAweiIvPjwvZz48cGF0aCBkPSJNMjkwLjEyODcgODcuMDE3TDE0Ny4zMTk2IDAgNC41MTA2IDg3LjAxNyAwIDg5Ljg3ODl2MTgwLjA0ODJMMTQ3LjUgMzYwbDQuNTEwNi0yLjc2NDhMMjk1IDI2OS45MjcxVjg5LjgzMDN6bS00LjUxMSAxNzcuMjgzN2wtMTMzLjc4NzUgODEuNzc4NlYxODIuNjE5NGwxMzMuOTY3OS04MS42MzMxem0tMTQyLjgwOSA4MS43Nzg2TDguODQwNyAyNjQuMjUyMVYxMDAuOTg2M2wxMzMuOTY4IDgxLjYzMzF6TTEzLjYyMjMgOTIuNjkxOWwxMzMuNjk3My04MS41MzYgMTMzLjY5NzQgODEuNTM2LTEzMy42OTc0IDgxLjQ4NzNMMTMuNDg3IDkyLjY5MTl6IiBmaWxsPSIjNDQ0Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjkwNTggMTMzLjQ4NDQpIiBjbGFzcz0iQyI+PHBhdGggZD0iTTAgMTQwLjU2Nmw3Ni45MDczLTQ2LjkwMzlWMEwwIDQ2Ljg1NTN2OTMuNzEwN3oiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjkuODI1NyAxMzMuNDg0NCkiIGNsYXNzPSJDIj48cGF0aCBkPSJNMCA5My42NjIxbDc2LjkwNzMgNDYuOTAzOVY0Ni44NTUzTDAgMHY5My42NjIxeiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MC42MzczIDg1LjUxMykiIGNsYXNzPSJDIj48cGF0aCBkPSJNMTUzLjM2MzggNDYuNzFMNzYuNjgxOSAwIDAgNDYuNzFsNzYuNjgxOSA0Ni44NTU0TDE1My4zNjM4IDQ2LjcxeiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDcuMzE5NiAxMzIuMjIzKSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0wIDQyLjEwMkw2OC45Njg1LjA5NjggNjguODc4NyAwIDAgNDIuMDUzNHYuMDQ4NnoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzguMzUwNyAxMzIuMjIzKSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0uMDkwMiAwTDAgLjA5NjggNjguOTY4NSA0Mi4xMDJ2LS4wNDg2TC4wOTAyIDB6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0Ny4zMTk2IDE3NC4yNzY0KSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0wIDB6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0Ljc3MzYgNzkuMTU5KSI+PHBhdGggZD0iTTE2MC41ODExIDQ3LjQ4NThMODIuNTQ1NiAwIDQuNTEwNiA0Ny40ODU4IDAgNTAuMjk5MnYxMDAuOTM3N2w4Mi41NDU2IDUwLjQ0NDYgNC41MTEtMi43NjQ4IDc4LjEyNTMtNDcuNjc5OFY1MC4yOTkyem0tNC41MTA5IDk4LjA3NjJsLTY5LjAxMzYgNDIuMTk4N3YtODQuMjAzNWw2OS4xMDQyLTQyLjEwMnptLTc4LjAzNTEgNDIuMTk4N0w4LjkzMDkgMTQ1LjU2MlY2MS40NTUybDY5LjEwNDIgNDIuMTAyek0xMy42Njc0IDUzLjA2NGw2OC44NzgyLTQxLjkwOCA2OC44Nzg3IDQxLjk1NjYtNjguODc4NyA0Mi4wMDQ4LTY4Ljk2ODQtNDEuOTU2NnoiLz48L2c+PC9nPjwvc3ZnPg==");',
    },
    { content: 'LiveCodes', style: 'font-weight: bold; font-size: 1.2em;' },
    { content: ' - ', style: 'font-size: 1.2em;' },
    {
      content: 'A Code Playground That Just Works!\n',
      style: 'font-style: italic; font-size: 1.2em;',
    },
    {
      content: `App version: ${process.env.VERSION}`,
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: ' ', style: 'padding-bottom: 0.4em;' },
    {
      content: `SDK version: ${process.env.SDK_VERSION}`,
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: ' ', style: 'padding-bottom: 0.4em;' },
    {
      content: `Commit: ${process.env.GIT_COMMIT}`,
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: '\n\n', style: '' },
    {
      content: `Learn more! ${process.env.DOCS_BASE_URL} 🚀`,
      style: 'padding: 0.2em 0.4em; font-size: 1.1em;',
    },
  ];

  const args = items.reduce(
    (acc, item) => {
      acc[0] += `%c${item.content}`;
      acc.push(item.style);
      return acc;
    },
    [''],
  );

  // eslint-disable-next-line no-console
  console.info(...args);
};

if (!isEmbed) {
  showConsoleMessage();
}
