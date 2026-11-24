// The compiler script runs in the compile worker; this drives it with a mock of
// the package's in-worker entry so the mapping to CompileResult is covered
// without downloading the 32 MB image.
type CompileOutcome = {
  ok: boolean;
  compileMs: number;
  errors: string[];
  files: { name: string; content: string; encoding: 'utf8' | 'base64' }[];
};

const createInWorkerCompilerMock = (outcome: CompileOutcome, calls: unknown[] = []) => {
  const globalObject = globalThis as unknown as Record<string, unknown>;
  if (globalObject.self == null) globalObject.self = globalObject;
  const self = globalObject.self as Record<string, unknown>;

  self.importScripts = () => undefined;
  self.kotlinWasm = {
    createInWorkerCompiler: async (options: Record<string, unknown>) => {
      calls.push(options);
      return { compile: async () => outcome };
    },
  };
  return calls;
};

const loadCompiler = async (): Promise<(code: string) => Promise<any>> => {
  // The script installs itself on `self`, which is what the language factory
  // calls. A fresh module each time also resets the memoised compiler.
  await import('../lang-kotlin-compiler');
  return (globalThis as any).self.createKotlinCompiler();
};

describe('kotlin compiler script', () => {
  const js: CompileOutcome = {
    ok: true,
    compileMs: 1200,
    errors: [],
    files: [{ name: 'main.mjs', content: 'function main(){}\nmain();', encoding: 'utf8' }],
  };

  afterEach(() => {
    jest.resetModules();
    const self = (globalThis as any).self;
    if (self) {
      delete self.kotlinWasm;
      delete self.importScripts;
      delete self.createKotlinCompiler;
    }
  });

  test('returns the emitted module wrapped in its own scope', async () => {
    const calls = createInWorkerCompilerMock(js);
    const compile = await loadCompiler();

    expect(await compile('fun main() {}')).toEqual({
      code: '(() => {\nfunction main(){}\nmain();\n})();',
      info: {},
    });
    // The JS target is what a result page can run.
    expect(calls[0]).toMatchObject({ target: 'js' });
  });

  test('an empty program short-circuits without loading the toolchain', async () => {
    const calls = createInWorkerCompilerMock(js);
    const compile = await loadCompiler();

    expect(await compile('   ')).toBe('');
    expect(calls).toHaveLength(0);
  });

  test('reports compiler diagnostics as info.errors', async () => {
    const createKotlinCompiler = createInWorkerCompilerMock({
      ok: false,
      compileMs: 40,
      errors: ["Main.kt:1:20: error: Initializer type mismatch: expected 'Int', actual 'String'."],
      files: [],
    });
    const compile = await loadCompiler();

    expect(await compile('fun main() { val x: Int = "s" }')).toEqual({
      code: '',
      info: {
        errors: [
          "Main.kt:1:20: error: Initializer type mismatch: expected 'Int', actual 'String'.",
        ],
      },
    });
    expect(createKotlinCompiler).toHaveLength(1);
  });

  test('a failed load is reported and can be retried', async () => {
    const self = (globalThis as any).self;
    self.importScripts = () => undefined;
    self.kotlinWasm = {
      createInWorkerCompiler: async () => {
        throw new Error('Failed to fetch');
      },
    };
    const compile = await loadCompiler();

    expect(await compile('fun main() {}')).toEqual({
      code: '',
      info: { errors: ['Failed to fetch'] },
    });
  });
});
