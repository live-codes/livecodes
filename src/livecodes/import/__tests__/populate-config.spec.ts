import type { Config } from '../../models';
import { populateConfig, type SourceFile } from '../utils';

describe('populate Config object for imported files', () => {
  test('no files should return empty object', () => {
    const result = populateConfig([], {});
    expect(result).toEqual({});
  });

  test('should populate config from files', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('default files should be selected', () => {
    const files: SourceFile[] = [
      {
        filename: 'a.html',
        content: '<h1>a</h1>',
      },
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('default files should be selected (re-order)', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'a.html',
        content: '<h1>a</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('populate non-default files', () => {
    const files: SourceFile[] = [
      {
        filename: 'a.html',
        content: '<h1>a</h1>',
      },
      {
        filename: 'b.html',
        content: '<h1>b</h1>',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>a</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('select files by language', () => {
    const files: SourceFile[] = [
      {
        filename: 'hi.md',
        content: '# hi',
      },
      {
        filename: 'b.html',
        content: '<h1>b</h1>',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>b</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('select from same language', () => {
    const files: SourceFile[] = [
      {
        filename: 'a.md',
        content: '# a',
      },
      {
        filename: 'b.md',
        content: '# b',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'markdown',
        content: '# a',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('sort by filename', () => {
    const files: SourceFile[] = [
      {
        filename: 'c.md',
        content: '# c',
      },
      {
        filename: 'a.md',
        content: '# a',
      },
      {
        filename: 'b.md',
        content: '# b',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'markdown',
        content: '# a',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('avoid readme', () => {
    const files: SourceFile[] = [
      {
        filename: 'readme.md',
        content: '# readme',
      },
      {
        filename: 'z.md',
        content: '# z',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'markdown',
        content: '# z',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('select file in params', () => {
    const files: SourceFile[] = [
      {
        filename: 'c.md',
        content: '# c',
      },
      {
        filename: 'a.md',
        content: '# a',
      },
      {
        filename: 'b.md',
        content: '# b',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
    ];
    const result: Partial<Config> = {
      activeEditor: 'markup',
      markup: {
        language: 'markdown',
        content: '# b',
      },
    };

    expect(populateConfig(files, { files: 'b.md' })).toEqual(result);
  });

  test('select files in params', () => {
    const files: SourceFile[] = [
      {
        filename: 'c.md',
        content: '# c',
      },
      {
        filename: 'a.md',
        content: '# a',
      },
      {
        filename: 'b.md',
        content: '# b',
      },
      {
        filename: 'st.css',
        content: 'body{}',
      },
      {
        filename: 'style.css',
        content: '.style{}',
      },
      {
        filename: 'sc.js',
        content: '// hi',
      },
      {
        filename: 'script.js',
        content: '// script',
      },
    ];
    const result: Partial<Config> = {
      activeEditor: 'markup',
      markup: {
        language: 'markdown',
        content: '# b',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
    };

    expect(populateConfig(files, { files: 'b.md,st.css,sc.js' })).toEqual(result);
  });

  test('should populate stylesheets and scripts as elements', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
      {
        filename: 'styles',
        content: `
          <link rel="stylesheet" href="https://stylesheet.url/sheet1.css">
          <link rel="stylesheet" href="https://stylesheet.url/sheet2.css">
          <link rel="stylesheet" href="https://stylesheet.url/sheet3.css">
          `,
      },
      {
        filename: 'scripts',
        content: `
        <script src="https://script.url/script1.js"></script>
        <script src="https://script.url/script2.js"></script>
        <script src="https://script.url/script3.js"></script>
        `,
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [
        'https://script.url/script1.js',
        'https://script.url/script2.js',
        'https://script.url/script3.js',
      ],
      stylesheets: [
        'https://stylesheet.url/sheet1.css',
        'https://stylesheet.url/sheet2.css',
        'https://stylesheet.url/sheet3.css',
      ],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('should populate stylesheets and scripts as urls', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
      {
        filename: 'styles',
        content: `
          https://stylesheet.url/sheet1.css
          https://stylesheet.url/sheet2.css
          https://stylesheet.url/sheet3.css
          `,
      },
      {
        filename: 'scripts',
        content: `
        https://script.url/script1.js
        https://script.url/script2.js
        https://script.url/script3.js
        `,
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [
        'https://script.url/script1.js',
        'https://script.url/script2.js',
        'https://script.url/script3.js',
      ],
      stylesheets: [
        'https://stylesheet.url/sheet1.css',
        'https://stylesheet.url/sheet2.css',
        'https://stylesheet.url/sheet3.css',
      ],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('should populate test file (.spec)', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
      {
        filename: 'script.spec.js',
        content: '// tests',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
      tests: {
        language: 'javascript',
        content: '// tests',
      },
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('should populate test file (.test)', () => {
    const files: SourceFile[] = [
      {
        filename: 'index.html',
        content: '<h1>hello</h1>',
      },
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'script.js',
        content: '// hi',
      },
      {
        filename: 'script.test.ts',
        content: '// tests',
      },
    ];
    const result: Partial<Config> = {
      markup: {
        language: 'html',
        content: '<h1>hello</h1>',
      },
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'javascript',
        content: '// hi',
      },
      scripts: [],
      stylesheets: [],
      tests: {
        language: 'typescript',
        content: '// tests',
      },
    };

    expect(populateConfig(files, {})).toEqual(result);
  });

  test('set activeEditor', () => {
    const files: SourceFile[] = [
      {
        filename: 'style.css',
        content: 'body{}',
      },
      {
        filename: 'Greeter.jsx',
        content: 'export default () => <h1>Hi There</h1>',
      },
    ];
    const result: Partial<Config> = {
      activeEditor: 'script',
      style: {
        language: 'css',
        content: 'body{}',
      },
      script: {
        language: 'jsx',
        content: 'export default () => <h1>Hi There</h1>',
      },
      scripts: [],
      stylesheets: [],
    };

    expect(populateConfig(files, {})).toEqual(result);
  });
});
