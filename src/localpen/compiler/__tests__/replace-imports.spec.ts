import { Pen } from '../../models';
import { replaceImports } from '../replace-imports';

describe('replaceImports', () => {
  test('replace imports', () => {
    const config = ({
      modules: [
        {
          name: 'mylib',
          url: 'https://someurl/path/module',
        },
      ],
    } as unknown) as Pen;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'mylib'
    `;

    const expectedCode = `
    import { EditorState, EditorView, basicSetup } from 'https://cdn.skypack.dev/@codemirror/basic-setup';
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import {keymap} from 'https://someurl/path/module'
    `;

    const processedCode = replaceImports(code, config);
    expect(processedCode).toEqual(expectedCode);
  });
});
