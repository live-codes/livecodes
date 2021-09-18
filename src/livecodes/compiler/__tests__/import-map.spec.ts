import { Config } from '../../models';
import { createImportMap, replaceImports } from '../import-map';

describe('Import map', () => {
  test('create import map', () => {
    const config = ({
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
        similar: './should/not/be/used',
        unused: 'https://someurl2/path2/module2',
      },
    } as unknown) as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import thing from "similar2";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'mylib';
    console.log('hi');
    `;

    const importMap = {
      '@codemirror/basic-setup': 'https://cdn.skypack.dev/@codemirror/basic-setup',
      lodash: 'https://unpkg.com/lodash',
      mylib: 'https://someurl/path/module',
      similar2: 'https://cdn.skypack.dev/similar2',
    };

    const map = createImportMap(code, config);
    expect(map).toEqual(importMap);
  });

  test('replace imports', () => {
    const config = ({
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
      },
    } as unknown) as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'mylib'
    `;

    const expectedCode = `
    import { EditorState, EditorView, basicSetup } from 'https://cdn.skypack.dev/@codemirror/basic-setup';
    import fp from "https://unpkg.com/lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'https://someurl/path/module'
    `;

    const processedCode = replaceImports(code, config);
    expect(processedCode).toEqual(expectedCode);
  });
});
