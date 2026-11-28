import type { Compiler } from '../../../models';
import { latex } from '../lang-latex';
import { formatLatexError } from '../lang-latex-compiler';
import { registerLatexMonaco } from '../lang-latex-monaco';

describe('latex', () => {
  const compiler = latex.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(latex.name).toBe('latex');
    expect(latex.title).toBe('LaTeX');
    expect(latex.extensions).toEqual(['tex', 'latex', 'ltx']);
    expect(latex.editor).toBe('markup');
  });

  test('compiles outside the compiler worker and does not add a result-page runtime', () => {
    expect(typeof compiler.runOutsideWorker).toBe('function');
    expect(compiler.factory).toBeDefined();
    expect(compiler.liveReload).toBeUndefined();
    expect(compiler.scriptType).toBeUndefined();
    expect(compiler.compiledCodeLanguage).toBe('html');
  });

  test('loads the LaTeX.js helper script in the result page', () => {
    expect(compiler.scripts).toEqual([
      expect.stringMatching(/\/latex\.js@[\d.]+\/dist\/js\/base\.js$/u),
    ]);
  });

  test('uses LaTeX editor support in all editors', () => {
    expect(latex.editorSupport?.monaco?.language).toBe('latex');
    expect(latex.editorSupport?.codemirror?.language).toBe('latex');
    expect(latex.editorSupport?.codejar?.language).toBe('latex');
  });
});

describe('latex monaco support', () => {
  test('registers a LaTeX language with configuration and tokenizer', () => {
    const monaco = {
      languages: {
        register: jest.fn(),
        setLanguageConfiguration: jest.fn(),
        setMonarchTokensProvider: jest.fn(),
      },
    };

    registerLatexMonaco(monaco);

    expect(monaco.languages.register).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'latex' }),
    );
    expect(monaco.languages.setLanguageConfiguration).toHaveBeenCalledWith(
      'latex',
      expect.objectContaining({ comments: { lineComment: '%' } }),
    );
    expect(monaco.languages.setMonarchTokensProvider).toHaveBeenCalledWith(
      'latex',
      expect.objectContaining({ tokenizer: expect.any(Object) }),
    );
  });
});

describe('formatLatexError', () => {
  test('adds the parser location to the message', () => {
    const error = new Error('Expected "}" but "{" found.');
    Object.assign(error, { location: { start: { line: 4, column: 12 } } });
    expect(formatLatexError(error)).toBe('Expected "}" but "{" found. (line 4, column 12)');
  });

  test('falls back to the error message without a location', () => {
    expect(formatLatexError(new Error('Failed to load LaTeX.js.'))).toBe(
      'Failed to load LaTeX.js.',
    );
  });
});
