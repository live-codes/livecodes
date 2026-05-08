import { parseChildren } from '../internal';

/**
 * Helper: creates a `<live-codes>` element with the given inner HTML
 * and returns the result of `parseChildren`.
 */
const parse = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return parseChildren(el);
};

// ---------------------------------------------------------------------------
// No children / invalid structure
// ---------------------------------------------------------------------------

describe('parseChildren – no children', () => {
  test('returns undefined when there are no children', () => {
    expect(parse('')).toBeUndefined();
  });

  test('returns undefined when child is not a template', () => {
    expect(parse('<div>hello</div>')).toBeUndefined();
  });

  test('returns undefined when template has lang attribute (not a wrapper)', () => {
    expect(parse('<template lang="html"><h1>Hi</h1></template>')).toBeUndefined();
  });

  test('returns undefined when template has filename attribute (not a wrapper)', () => {
    expect(parse('<template filename="index.html"><h1>Hi</h1></template>')).toBeUndefined();
  });

  test('returns undefined when wrapper template is empty', () => {
    expect(parse('<template></template>')).toBeUndefined();
  });

  test('returns undefined when wrapper template has only text', () => {
    expect(parse('<template>just text</template>')).toBeUndefined();
  });

  test('returns undefined when wrapper template has only non-code elements', () => {
    expect(parse('<template><div>not code</div></template>')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Single-editor mode
// ---------------------------------------------------------------------------

describe('parseChildren – single-editor mode', () => {
  test('parses a single <template lang="html"> as markup', () => {
    const result = parse(`
      <template>
        <template lang="html"><h1>Hello</h1></template>
      </template>
    `);
    expect(result).toEqual({
      markup: { language: 'html', content: '<h1>Hello</h1>' },
    });
  });

  test('parses a single <style lang="css"> as style', () => {
    const result = parse(`
      <template>
        <style lang="css">body { color: blue; }</style>
      </template>
    `);
    expect(result).toEqual({
      style: { language: 'css', content: 'body { color: blue; }' },
    });
  });

  test('parses a single <script lang="js"> as script', () => {
    const result = parse(`
      <template>
        <script lang="js">console.log('hi');</script>
      </template>
    `);
    expect(result).toEqual({
      script: { language: 'js', content: "console.log('hi');" },
    });
  });

  test('parses all three editors together', () => {
    const result = parse(`
      <template>
        <template lang="html"><h1>Hello</h1></template>
        <style lang="scss">body { color: blue; }</style>
        <script lang="ts">console.log('hi');</script>
      </template>
    `);
    expect(result).toEqual({
      markup: { language: 'html', content: '<h1>Hello</h1>' },
      style: { language: 'scss', content: 'body { color: blue; }' },
      script: { language: 'ts', content: "console.log('hi');" },
    });
  });

  test('uses default languages when lang attribute is absent', () => {
    const result = parse(`
      <template>
        <template><p>Hello</p></template>
        <style>body { color: red; }</style>
        <script>alert('hi');</script>
      </template>
    `);
    expect(result).toEqual({
      markup: { language: 'html', content: '<p>Hello</p>' },
      style: { language: 'css', content: 'body { color: red; }' },
      script: { language: 'javascript', content: "alert('hi');" },
    });
  });

  test('only uses the first element of each type', () => {
    const result = parse(`
      <template>
        <style lang="css">first</style>
        <style lang="scss">second</style>
      </template>
    `);
    expect(result).toEqual({
      style: { language: 'css', content: 'first' },
    });
  });

  test('active attribute sets activeEditor', () => {
    const result = parse(`
      <template>
        <template lang="html"><h1>Hello</h1></template>
        <style lang="css">body { color: blue; }</style>
        <script lang="ts" active>console.log('hi');</script>
      </template>
    `);
    expect(result?.activeEditor).toBe('script');
  });

  test('active attribute on markup sets activeEditor to markup', () => {
    const result = parse(`
      <template>
        <template lang="html" active><h1>Hello</h1></template>
        <style lang="css">body { color: blue; }</style>
      </template>
    `);
    expect(result?.activeEditor).toBe('markup');
  });
});

// ---------------------------------------------------------------------------
// Multi-file mode
// ---------------------------------------------------------------------------

describe('parseChildren – multi-file mode', () => {
  test('parses elements with filename into files array', () => {
    const result = parse(`
      <template>
        <template filename="index.html"><h1>Hello</h1></template>
        <style filename="styles.css">body { color: blue; }</style>
        <script filename="app.js">console.log('hi');</script>
      </template>
    `);
    expect(result).toEqual({
      files: [
        { filename: 'index.html', content: '<h1>Hello</h1>', language: 'html' },
        { filename: 'styles.css', content: 'body { color: blue; }', language: 'css' },
        { filename: 'app.js', content: "console.log('hi');", language: 'js' },
      ],
    });
  });

  test('infers language from filename extension', () => {
    const result = parse(`
      <template>
        <script filename="app.ts">const x: number = 1;</script>
      </template>
    `);
    expect(result?.files?.[0].language).toBe('ts');
  });

  test('lang attribute overrides inferred language from filename', () => {
    const result = parse(`
      <template>
        <script filename="app.js" lang="ts">const x: number = 1;</script>
      </template>
    `);
    expect(result?.files?.[0].language).toBe('ts');
  });

  test('active attribute sets activeEditor to the filename', () => {
    const result = parse(`
      <template>
        <template filename="index.html"><h1>Hello</h1></template>
        <script filename="app.ts" active>console.log('hi');</script>
      </template>
    `);
    expect(result?.activeEditor).toBe('app.ts');
  });

  test('multiple script files with different filenames', () => {
    const result = parse(`
      <template>
        <script filename="app.ts">import { greet } from './utils.ts';</script>
        <script filename="utils.ts">export const greet = (name: string) => name;</script>
      </template>
    `);
    expect(result?.files).toHaveLength(2);
    expect(result?.files?.[0].filename).toBe('app.ts');
    expect(result?.files?.[1].filename).toBe('utils.ts');
  });

  test('skips elements without filename in multi-file mode', () => {
    const result = parse(`
      <template>
        <template filename="index.html"><h1>Hello</h1></template>
        <style>this has no filename</style>
      </template>
    `);
    // Has a filename attribute → multi-file mode
    // The <style> without filename is skipped
    expect(result?.files).toHaveLength(1);
    expect(result?.files?.[0].filename).toBe('index.html');
  });

  test('handles files without extension', () => {
    const result = parse(`
      <template>
        <template filename="Dockerfile">FROM node:18</template>
      </template>
    `);
    expect(result?.files?.[0].language).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('parseChildren – edge cases', () => {
  test('empty content is preserved', () => {
    const result = parse(`
      <template>
        <style lang="css"></style>
      </template>
    `);
    expect(result).toEqual({
      style: { language: 'css', content: '' },
    });
  });

  test('content with special characters is preserved', () => {
    const result = parse(`
      <template>
        <template lang="html"><div class="test">&amp; &lt;hello&gt;</div></template>
      </template>
    `);
    // innerHTML serializes the content, preserving the original HTML structure.
    // Entities like &amp; and &lt; remain encoded in the serialized output.
    expect(result?.markup?.content).toContain('&amp;');
    expect(result?.markup?.content).toContain('&lt;hello&gt;');
    expect(result?.markup?.content).toContain('class="test"');
  });

  test('ignores non-code siblings in wrapper template', () => {
    const result = parse(`
      <template>
        <div>ignore me</div>
        <template lang="html"><h1>Hi</h1></template>
        <p>also ignore me</p>
      </template>
    `);
    expect(result).toEqual({
      markup: { language: 'html', content: '<h1>Hi</h1>' },
    });
  });
});

// ---------------------------------------------------------------------------
// Dedent (indentation stripping)
// ---------------------------------------------------------------------------

describe('parseChildren – dedent', () => {
  test('strips common leading indentation from multi-line template content', () => {
    const result = parse(`
      <template>
        <template lang="html">
          <h1>Hello World</h1>
          <p>Welcome to <strong>LiveCodes</strong></p>
        </template>
      </template>
    `);
    expect(result?.markup?.content).toBe(
      '<h1>Hello World</h1>\n<p>Welcome to <strong>LiveCodes</strong></p>',
    );
  });

  test('strips common leading indentation from multi-line style content', () => {
    const result = parse(`
      <template>
        <style lang="scss">
          body {
            font-family: sans-serif;
            h1 { color: royalblue; }
          }
        </style>
      </template>
    `);
    expect(result?.style?.content).toBe(
      'body {\n  font-family: sans-serif;\n  h1 { color: royalblue; }\n}',
    );
  });

  test('strips common leading indentation from multi-line script content', () => {
    const result = parse(`
      <template>
        <script lang="ts">
          const btn = document.querySelector('#btn');
          btn?.addEventListener('click', () => {
            btn.textContent = 'Clicked!';
          });
        </script>
      </template>
    `);
    expect(result?.script?.content).toBe(
      "const btn = document.querySelector('#btn');\n" +
        "btn?.addEventListener('click', () => {\n" +
        "  btn.textContent = 'Clicked!';\n" +
        '});',
    );
  });

  test('strips indentation from multi-file mode content', () => {
    const result = parse(`
      <template>
        <style filename="styles.css">
          body {
            color: blue;
          }
        </style>
      </template>
    `);
    expect(result?.files?.[0].content).toBe('body {\n  color: blue;\n}');
  });

  test('single-line content is not affected by dedent', () => {
    const result = parse(`
      <template>
        <template lang="html"><h1>Hello</h1></template>
      </template>
    `);
    expect(result?.markup?.content).toBe('<h1>Hello</h1>');
  });

  test('content with no common indentation is unchanged', () => {
    const result = parse(`
      <template>
        <script lang="js">line1
  line2
    line3</script>
      </template>
    `);
    expect(result?.script?.content).toBe('line1\n  line2\n    line3');
  });

  test('preserves intentional blank lines within content', () => {
    const result = parse(`
      <template>
        <script lang="js">
          const a = 1;

          const b = 2;
        </script>
      </template>
    `);
    expect(result?.script?.content).toBe('const a = 1;\n\nconst b = 2;');
  });

  test('preserves intentional blank line at start of content', () => {
    const result = parse(`
      <template>
        <script lang="js">

          const a = 1;
        </script>
      </template>
    `);
    expect(result?.script?.content).toBe('\nconst a = 1;');
  });

  test('preserves intentional blank line at end of content', () => {
    const result = parse(`
      <template>
        <script lang="js">
          const a = 1;

        </script>
      </template>
    `);
    expect(result?.script?.content).toBe('const a = 1;\n');
  });

  test('preserves multiple intentional blank lines', () => {
    const result = parse(`
      <template>
        <style lang="css">
          h1 { color: red; }


          h2 { color: blue; }
        </style>
      </template>
    `);
    expect(result?.style?.content).toBe('h1 { color: red; }\n\n\nh2 { color: blue; }');
  });
});
