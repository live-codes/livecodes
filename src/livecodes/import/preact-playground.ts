import type { Config } from '../models';
import { modulesService } from '../services';

// https://github.com/preactjs/preact-www/blob/master/src/components/controllers/repl/query-encode.js
function base64ToText(base64: string) {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// https://github.com/preactjs/preact-www/blob/master/src/components/controllers/repl/examples/index.js
const EXAMPLES = [
  {
    slug: 'counter',
    file: 'counters/counter.txt',
  },
  {
    slug: 'counter-hooks',
    file: 'counters/counter-hooks.txt',
  },
  {
    slug: 'counter-signals',
    file: 'counters/counter-signals.txt',
  },
  {
    slug: 'counter-htm',
    file: 'counters/counter-htm.txt',
  },
  {
    slug: 'todo',
    file: 'todo-lists/todo-list.txt',
  },
  {
    slug: 'todo-signals',
    file: 'todo-lists/todo-list-signals.txt',
  },
  {
    slug: 'github-repo-list',
    file: 'github-repo-list.txt',
  },
  {
    slug: 'context',
    file: 'context.txt',
  },
  {
    slug: 'spiral',
    file: 'spiral.txt',
  },
];

const getExample = (slug: string) => EXAMPLES.find((e) => e.slug === slug)?.file;

export const importPreactPlayground = async (url: string): Promise<Partial<Config>> => {
  const exampleQuery = '?example=';
  const codeQuery = '?code=';
  const query = url.includes(exampleQuery)
    ? exampleQuery
    : url.includes(codeQuery)
      ? codeQuery
      : null;
  if (!query) return {};
  const code = url.split(query)[1];
  if (!code?.trim()) return {};
  const contentUrl =
    query === exampleQuery
      ? modulesService.getModuleUrl(
          `gh:preactjs/preact-www@master/src/components/controllers/repl/examples/` +
            getExample(code),
        )
      : undefined;
  const content = query === codeQuery ? base64ToText(decodeURIComponent(code)) : undefined;
  if (!contentUrl && !content) return {};
  return {
    activeEditor: 'script',
    markup: {
      language: 'html',
      content: '<div id="app"></div>',
    },
    style: {
      language: 'css',
      hiddenContent: 'html { font: 100%/1.3 system-ui, sans-serif; background: none; }',
      contentUrl: modulesService.getModuleUrl(
        'gh:preactjs/preact-www@master/src/components/controllers/repl/examples/style.css',
      ),
    },
    script: {
      language: 'jsx',
      hiddenContent: '/** @jsxImportSource preact */\n',
      content,
      contentUrl,
    },
  };
};
