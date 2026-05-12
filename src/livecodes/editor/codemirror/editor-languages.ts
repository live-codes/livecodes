/* eslint-disable import/no-unresolved */
// @ts-ignore
import type { LanguageSupport } from '@codemirror/language';
// @ts-ignore
import { json } from '@codemirror/lang-json';

import type { Language } from '../../models';

export const editorLanguages: Partial<{ [key in Language]: () => Promise<LanguageSupport> }> = {
  json: async () => json(),
};
