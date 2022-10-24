/* eslint-disable import/no-internal-modules */
import type { LanguageSupport } from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { sCSS } from '@codemirror/legacy-modes/mode/css';

import type { CodeEditor, EditorOptions, Language } from '../../models';
import { createEditorCreator, legacy } from './codemirror';

export const basicLanguages: Partial<{ [key in Language]: () => LanguageSupport }> = {
  html,
  css,
  javascript,
  typescript: () => javascript({ typescript: true }),
  jsx: () => javascript({ jsx: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  json,
  scss: () => legacy(sCSS),
};

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> =>
  createEditorCreator({ languages: {}, emmet: [], vim: () => [], emacs: () => [] })(options);
