import { Pen } from '../../models';
import { createImportMap } from '../import-map';

describe('createImportMap', () => {
  test('create import map', () => {
    const config = ({
      imports: {
        mylib: 'https://someurl/path/module',
        unused: 'https://someurl2/path2/module2',
      },
    } as unknown) as Pen;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'mylib';
    console.log('hi');
    `;

    const importMap = {
      '@codemirror/basic-setup': 'https://cdn.skypack.dev/@codemirror/basic-setup',
      mylib: 'https://someurl/path/module',
    };

    const map = createImportMap(code, config);
    expect(map).toEqual(importMap);
  });
});
