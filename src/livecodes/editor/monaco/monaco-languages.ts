import type * as Monaco from 'monaco-editor';

import type { Language } from '../../models';
import { monacoLanguagesBaseUrl } from '../../vendors';

export interface CustomLanguageDefinition {
  config?: Monaco.languages.LanguageConfiguration;
  tokens?: Monaco.languages.IMonarchLanguage;
  completions?: Monaco.languages.CompletionItemProvider;
  definitions?: Monaco.languages.DefinitionProvider;
  init?: (monaco: typeof Monaco) => void;
}

export const customLanguages: Partial<Record<Language, string | CustomLanguageDefinition>> = {
  astro: monacoLanguagesBaseUrl + 'astro.js',
  clio: monacoLanguagesBaseUrl + 'clio.js',
  imba: monacoLanguagesBaseUrl + 'imba.js',
  json5: monacoLanguagesBaseUrl + 'json5.js',
  minizinc: monacoLanguagesBaseUrl + 'minizinc.js',
  prolog: monacoLanguagesBaseUrl + 'prolog.js',
  // sql: monacoLanguagesBaseUrl + 'sql.js', // TODO: add autocomplete
  vue: monacoLanguagesBaseUrl + 'vue.js',
  svelte: monacoLanguagesBaseUrl + 'svelte.js',
  wat: monacoLanguagesBaseUrl + 'wat.js',

  dotenv: {
    config: { comments: { lineComment: '#' } },
    tokens: {
      tokenizer: {
        root: [
          [/#.*$/, 'comment'],
          [/([a-zA-Z_][a-zA-Z0-9_]*)(=)([^#]*)(#.*)$/, ['key', 'delimiter', 'value', 'comment']],
          [/([a-zA-Z_][a-zA-Z0-9_]*)(=)(.*)$/, ['key', 'delimiter', 'value']],
        ],
      },
    },
  },
};
