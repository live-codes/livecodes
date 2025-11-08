import type { Config } from '../../models';
import {
  createImportMap,
  getStyleImports,
  hasStyleImports,
  replaceImports,
  replaceStyleImports,
  resolvePath,
} from '../import-map';

describe('Import map', () => {
  test('create import map', () => {
    const config = {
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
        similar: './should/not/be/used',
        unused: 'https://someurl2/path2/module2',
      },
    } as unknown as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import thing from "similar2";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'mylib';
    import { internal } from 'mylib/internal';
    console.log('hi');
    `;

    const importMap = {
      '@codemirror/basic-setup': 'https://esm.sh/@codemirror/basic-setup',
      lodash: 'https://unpkg.com/lodash',
      mylib: 'https://someurl/path/module',
      similar2: 'https://esm.sh/similar2',
    };

    const map = createImportMap(code, config);
    expect(map).toEqual(importMap);
  });

  test('replace imports', () => {
    const config = {
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
      },
    } as unknown as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { flatten } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/flatten.js';
    import { concat } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/concat.ts#nobundle';
    import { drop } from 'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/drop.ts';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'mylib';
    import { internal } from 'mylib/internal';
    `;

    const expectedCode = `
    import { EditorState, EditorView, basicSetup } from 'https://esm.sh/@codemirror/basic-setup';
    import fp from "https://unpkg.com/lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { flatten } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/flatten.js';
    import { concat } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/concat.ts#nobundle';
    import { drop } from 'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/drop.ts';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'https://someurl/path/module';
    import { internal } from 'https://someurl/path/module/internal';
    `;

    const processedCode = replaceImports(code, config);
    expect(processedCode).toEqual(expectedCode);
  });

  test('create import map - defaultCDN', () => {
    const config = {
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
        similar: './should/not/be/used',
        unused: 'https://someurl2/path2/module2',
      },
      customSettings: { defaultCDN: 'skypack' },
    } as unknown as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import thing from "similar2";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'mylib';
    import { internal } from 'mylib/internal';
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

  test('replace imports - defaultCDN', () => {
    const config = {
      imports: {
        mylib: 'https://someurl/path/module',
        lodash: 'https://unpkg.com/lodash',
      },
      customSettings: { defaultCDN: 'skypack' },
    } as unknown as Config;
    const code = `
    import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
    import fp from "lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { flatten } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/flatten.js';
    import { concat } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/concat.ts#nobundle';
    import { drop } from 'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/drop.ts';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'mylib';
    import { internal } from 'mylib/internal';
    `;

    const expectedCode = `
    import { EditorState, EditorView, basicSetup } from 'https://cdn.skypack.dev/@codemirror/basic-setup';
    import fp from "https://unpkg.com/lodash/fp.js";
    import { html } from 'http://localhost/@codemirror/lang-html';
    import { flatten } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/flatten.js';
    import { concat } from 'https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/concat.ts#nobundle';
    import { drop } from 'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/remeda/remeda@master/src/drop.ts';
    import { tagExtension } from './state';
    import { oneDark } from '../theme-one-dark';
    import { keymap } from 'https://someurl/path/module';
    import { internal } from 'https://someurl/path/module/internal';
    `;

    const processedCode = replaceImports(code, config);
    expect(processedCode).toEqual(expectedCode);
  });

  test('replace style imports', () => {
    const code = `
@import "github-markdown-css";
@import "jsdelivr:github-markdown-css";
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
@import "github-markdown-css" print;
@import "github-markdown-css" screen and (orientation:landscape);

body {
  color: blue;
}    `;

    const expectedCode = `
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
@media print {
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
}
@media screen and (orientation:landscape) {
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
}

body {
  color: blue;
}    `;

    expect(hasStyleImports(code)).toBe(true);
    expect(hasStyleImports('body {color: blue;}')).toBe(false);

    const processedCode = replaceStyleImports(code);
    expect(processedCode).toEqual(expectedCode);
  });

  test('get style imports', () => {
    const code = `
@import "github-markdown-css-1";
@import "jsdelivr:github-markdown-css-2";
@import "https://cdn.jsdelivr.net/npm/github-markdown-css-3";
@import 'https://cdn.jsdelivr.net/npm/github-markdown-css-4';
@import url("https://cdn.jsdelivr.net/npm/github-markdown-css-5");
@import url('https://cdn.jsdelivr.net/npm/github-markdown-css-6');
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css-7);
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css-8) print;
@import "github-markdown-css-9" print;
@import "github-markdown-css-10" screen and (orientation:landscape);
@import "github-markdown-css-11" layer(layer-name);
@import "github-markdown-css-12" layer(layer-name) supports(supports-condition);
@import "github-markdown-css-13" layer(layer-name) supports(supports-condition) list-of-media-queries;
@import "github-markdown-css-14" layer(layer-name) list-of-media-queries;
@import "github-markdown-css-15" supports(supports-condition);
@import "github-markdown-css-16" supports(supports-condition) list-of-media-queries;
@import "github-markdown-css-17" list-of-media-queries;
@import "./styles.css";

body {
  color: blue;
}    `;

    const expectedImports = [
      'github-markdown-css-1',
      'jsdelivr:github-markdown-css-2',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-3',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-4',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-5',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-6',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-7',
      'https://cdn.jsdelivr.net/npm/github-markdown-css-8',
      'github-markdown-css-9',
      'github-markdown-css-10',
      'github-markdown-css-11',
      'github-markdown-css-12',
      'github-markdown-css-13',
      'github-markdown-css-14',
      'github-markdown-css-15',
      'github-markdown-css-16',
      'github-markdown-css-17',
      './styles.css',
    ];

    const imports = getStyleImports(code);
    expect(imports).toEqual(expectedImports);
  });

  test('get style imports (deduped)', () => {
    const code = `
@import "github-markdown-css";
@import "jsdelivr:github-markdown-css";
@import "https://cdn.jsdelivr.net/npm/github-markdown-css";
@import 'https://cdn.jsdelivr.net/npm/github-markdown-css';
@import url("https://cdn.jsdelivr.net/npm/github-markdown-css");
@import url('https://cdn.jsdelivr.net/npm/github-markdown-css');
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css);
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css) print;
@import "github-markdown-css" print;
@import "github-markdown-css" screen and (orientation:landscape);
@import "github-markdown-css" layer(layer-name);
@import "github-markdown-css" layer(layer-name) supports(supports-condition);
@import "github-markdown-css" layer(layer-name) supports(supports-condition) list-of-media-queries;
@import "github-markdown-css" layer(layer-name) list-of-media-queries;
@import "github-markdown-css" supports(supports-condition);
@import "github-markdown-css" supports(supports-condition) list-of-media-queries;
@import "github-markdown-css" list-of-media-queries;
@import "./styles.css";

body {
  color: blue;
}    `;

    const expectedImports = [
      'github-markdown-css',
      'jsdelivr:github-markdown-css',
      'https://cdn.jsdelivr.net/npm/github-markdown-css',
      './styles.css',
    ];

    const imports = getStyleImports(code);
    expect(imports).toEqual(expectedImports);
  });

  test('resolve path', () => {
    expect(resolvePath('https://someurl/path', './script.js')).toEqual('https://someurl/path');
    expect(resolvePath('https://someurl/path', 'script.js')).toEqual('https://someurl/path');
    expect(resolvePath('https://someurl/path', './deep/script.js')).toEqual('https://someurl/path');
    expect(resolvePath('https://someurl/path', 'deep/script.js')).toEqual('https://someurl/path');
    expect(resolvePath('https://someurl/path')).toEqual('https://someurl/path');

    const dataUrl =
      'data:text/javascript;charset=UTF-8;base64,Y29uc29sZS5sb2coIkhlbGxvLCBXb3JsZCEiKTs=';
    expect(resolvePath(dataUrl, './script.js')).toEqual(dataUrl);
    expect(resolvePath(dataUrl, 'script.js')).toEqual(dataUrl);
    expect(resolvePath(dataUrl, './deep/script.js')).toEqual(dataUrl);
    expect(resolvePath(dataUrl, 'deep/script.js')).toEqual(dataUrl);
    expect(resolvePath(dataUrl)).toEqual(dataUrl);

    expect(resolvePath('my-lib', './script.js')).toEqual('my-lib');
    expect(resolvePath('my-lib', 'script.js')).toEqual('my-lib');
    expect(resolvePath('my-lib', './deep/script.js')).toEqual('my-lib');
    expect(resolvePath('my-lib', 'deep/script.js')).toEqual('my-lib');
    expect(resolvePath('my-lib')).toEqual('my-lib');

    expect(resolvePath('/utils.js', './script.js')).toEqual('./utils.js');
    expect(resolvePath('/utils.js', 'script.js')).toEqual('./utils.js');
    expect(resolvePath('/utils.js', './deep/script.js')).toEqual('./utils.js');
    expect(resolvePath('/utils.js', 'deep/script.js')).toEqual('./utils.js');
    expect(resolvePath('/utils.js')).toEqual('./utils.js');

    expect(resolvePath('./utils.js', './script.js')).toEqual('./utils.js');
    expect(resolvePath('./utils.js', 'script.js')).toEqual('./utils.js');
    expect(resolvePath('./utils.js', './deep/script.js')).toEqual('./deep/utils.js');
    expect(resolvePath('./utils.js', 'deep/script.js')).toEqual('./deep/utils.js');
    expect(resolvePath('./utils.js')).toEqual('./utils.js');

    expect(resolvePath('../utils.js', './script.js')).toEqual('./utils.js');
    expect(resolvePath('../utils.js', 'script.js')).toEqual('./utils.js');
    expect(resolvePath('../utils.js', './deep/script.js')).toEqual('./utils.js');
    expect(resolvePath('../utils.js', 'deep/script.js')).toEqual('./utils.js');
    expect(resolvePath('../utils.js')).toEqual('./utils.js');

    expect(resolvePath('../path/utils.js', './script.js')).toEqual('./path/utils.js');
    expect(resolvePath('../path/utils.js', 'script.js')).toEqual('./path/utils.js');
    expect(resolvePath('../path/utils.js', './deep/script.js')).toEqual('./path/utils.js');
    expect(resolvePath('../path/utils.js', 'deep/script.js')).toEqual('./path/utils.js');
    expect(resolvePath('../path/utils.js', 'very/deep/script.js')).toEqual('./very/path/utils.js');
    expect(resolvePath('../path/utils.js')).toEqual('./path/utils.js');
  });
});
