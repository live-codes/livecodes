import { readFileSync } from 'fs';
import { resolve } from 'path';
import { erlangWasm } from '../lang-erlang-wasm';

const readSource = (file: string) => readFileSync(resolve(__dirname, '..', file), 'utf8');

describe('Erlang (Wasm) language spec', () => {
  test('is registered as erlang-wasm, with the wasm compiler script', () => {
    expect(erlangWasm.name).toBe('erlang-wasm');
    expect(erlangWasm.title).toBe('Erlang (Wasm)');
    expect(erlangWasm.compiler).toMatchObject({
      scriptType: 'text/erlang-wasm',
      compiledCodeLanguage: 'erlang',
      liveReload: true,
    });
  });

  test('accepts the common Erlang extensions', () => {
    expect(erlangWasm.extensions).toEqual(
      expect.arrayContaining(['erl', 'erlang', 'erlang-wasm', 'wasm.erl']),
    );
  });

  test('warns that the first run is a large download', () => {
    expect(erlangWasm.largeDownload).toBe(true);
  });

  test('uses a code editor with Erlang support', () => {
    expect(erlangWasm.editor).toBe('script');
    expect(erlangWasm.editorSupport?.monaco?.language).toBe('erlang');
    expect(erlangWasm.editorSupport?.codejar?.language).toBe('erlang');
  });
});

describe('Erlang (Wasm) runtime', () => {
  const script = readSource('lang-erlang-wasm-script.ts');

  test('reuses the shared beam runtime', () => {
    expect(script).toContain("from '../beam-wasm/runtime'");
    expect(script).toContain("from '../beam-wasm/prelude'");
    expect(script).toContain("apiKey: 'erlang'");
    expect(script).toContain("apiAlias: 'erlang-wasm'");
  });

  test('wraps expressions and compiles modules', () => {
    expect(script).toContain("'eval_erlang_module'");
    expect(script).toContain('wrapErlang');
    expect(script).toContain('stripTrailingDot');
    expect(script).toContain("replace(/\\berlang:halt\\(/g, 'livecodes_io:halt(')");
  });

  test('keeps the Erlang output newline and inspected result text', () => {
    expect(script).toContain('stripTrailingNewline: false');
    expect(script).toContain('normalizeResult: (data) =>');
  });
});
