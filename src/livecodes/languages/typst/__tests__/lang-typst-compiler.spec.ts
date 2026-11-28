import { formatTypstError } from '../lang-typst-compiler';

describe('typst compiler', () => {
  test('extracts readable messages from the Rust debug diagnostics', () => {
    const error = new Error(
      '[SourceDiagnostic { severity: Error, span: Span(123), message: "expected expression" }]',
    );
    expect(formatTypstError(error)).toBe('expected expression');
  });

  test('joins multiple messages and unescapes new lines', () => {
    const error = new Error(
      '[SourceDiagnostic { message: "unknown variable: x" }, SourceDiagnostic { message: "line 1\\nline 2" }]',
    );
    expect(formatTypstError(error)).toBe('unknown variable: x\nline 1\nline 2');
  });

  test('falls back to the error message when no diagnostics are found', () => {
    expect(formatTypstError(new Error('Failed to load the Typst compiler.'))).toBe(
      'Failed to load the Typst compiler.',
    );
  });
});
