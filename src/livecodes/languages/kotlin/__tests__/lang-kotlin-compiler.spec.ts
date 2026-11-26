// The compiler script runs in the compile worker; this drives it with a mock of
// the package's `createCompiler` so the mapping to CompileResult is covered
// without downloading the image.
//
// `createCompiler` - not `createInWorkerCompiler` - is what the script uses: it
// starts a worker per target, because one worker cannot host two GraalVM images.
type CompileOutcome = {
  ok: boolean;
  compileMs: number;
  errors: string[];
  files: { name: string; content: string; encoding: 'utf8' | 'base64' }[];
};

/** Installs a mock package on `self`; `compile` receives the source text. */
const installMock = (compile: (source: string) => CompileOutcome, calls: unknown[] = []) => {
  const globalObject = globalThis as unknown as Record<string, unknown>;
  if (globalObject.self == null) globalObject.self = globalObject;
  const self = globalObject.self as Record<string, unknown>;

  self.importScripts = () => undefined;
  self.kotlinWasm = {
    createCompiler: async (options: Record<string, unknown>) => {
      calls.push(options);
      return { compile: async (source: string) => compile(source) };
    },
  };
  return calls;
};

const createInWorkerCompilerMock = (outcome: CompileOutcome, calls: unknown[] = []) =>
  installMock(() => outcome, calls);

const loadCompiler = async (): Promise<(code: string, config?: any) => Promise<any>> => {
  // The script installs itself on `self`, which is what the language factory
  // calls. A fresh module each time also resets the memoised compiler.
  await import('../lang-kotlin-compiler');
  const compile = (globalThis as any).self.createKotlinCompiler();
  // The compiler reads `customSettings.kotlin`, so every call needs a config;
  // the default here is the js target, as in the app.
  return (code: string, config: any = { customSettings: {} }) =>
    compile(code, { config, language: 'kotlin', baseUrl: '/', options: {} });
};

describe('kotlin compiler script', () => {
  // Shaped like real Kotlin/JS output: a main function and the compiler's own
  // top-level call, which is where the output buffer gets flushed.
  const js: CompileOutcome = {
    ok: true,
    compileMs: 1200,
    errors: [],
    files: [
      {
        name: 'main.mjs',
        content: 'function main(){}\nfunction mainWrapper() {\n  main();\n}\nmainWrapper();',
        encoding: 'utf8',
      },
    ],
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

  test('returns the emitted module wrapped in its own scope, flushing the output buffer', async () => {
    const calls = createInWorkerCompilerMock(js);
    const compile = await loadCompiler();

    const result: any = await compile('fun main() {}');
    expect(result.info).toEqual({});
    // Wrapped, so the module's declarations stay off the page's global scope.
    expect(result.code.startsWith('(() => {\n')).toBe(true);
    expect(result.code.endsWith('\n})();')).toBe(true);
    // Kotlin/JS buffers stdout; `print` would be lost without this flush.
    expect(result.code).toContain('mainWrapper();');
    expect(result.code).toContain('get_output().flush_shahbo_k$()');
    // The JS target is what a result page can run.
    expect(calls[0]).toMatchObject({ target: 'js' });
  });

  test('a module with no main wrapper is passed through unchanged', async () => {
    // Not every program produces mainWrapper(); nothing should be invented.
    createInWorkerCompilerMock({
      ...js,
      files: [{ name: 'main.mjs', content: 'var x = 1;', encoding: 'utf8' }],
    });
    const compile = await loadCompiler();

    const result: any = await compile('fun helper() {}');
    expect(result.code).toBe('(() => {\nvar x = 1;\n})();');
    expect(result.code).not.toContain('flush_shahbo_k$');
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
      createCompiler: async () => {
        throw new Error('Failed to fetch');
      },
    };
    const compile = await loadCompiler();

    expect(await compile('fun main() {}')).toEqual({
      code: '',
      info: { errors: ['Failed to fetch'] },
    });
  });

  describe('target: wasm', () => {
    const wasmConfig = { customSettings: { kotlin: { target: 'wasm' } } };

    const wasm: CompileOutcome = {
      ok: true,
      compileMs: 2000,
      errors: [],
      files: [
        { name: 'main.mjs', content: 'export const _start = 1;', encoding: 'base64' },
        { name: 'main.import-object.mjs', content: 'export const x = 1;', encoding: 'base64' },
        { name: 'main.js-builtins.mjs', content: 'export const y = 1;', encoding: 'base64' },
        { name: 'main.wasm', content: 'AGFzbQ==', encoding: 'base64' },
      ],
    };

    test('passes the target to the package and returns every emitted file as JSON', async () => {
      const calls = createInWorkerCompilerMock(wasm);
      const compile = await loadCompiler();

      const result = await compile('fun main() {}', wasmConfig);

      // The package compiles against the wasm image, not the JS one.
      expect(calls[0]).toMatchObject({ target: 'wasm' });
      // One payload: the result page cannot load sibling modules.
      const payload = JSON.parse(result.code);
      expect(payload.map((file: any) => file.name)).toEqual([
        'main.mjs',
        'main.import-object.mjs',
        'main.js-builtins.mjs',
        'main.wasm',
      ]);
      expect(result.info.errors).toBeUndefined();
    });

    test('the payload cannot close the script element it is embedded in', async () => {
      const calls = createInWorkerCompilerMock(wasm);
      const compile = await loadCompiler();
      await compile('fun main() {}', wasmConfig);

      // Any `<` would allow `</script>` to appear inside the JSON.
      const result = await compile('fun main() {}', wasmConfig);
      expect(result.code).not.toContain('<');
      expect(calls.length).toBeGreaterThan(0);
    });

    test('reports a missing output file instead of producing an unrunnable payload', async () => {
      createInWorkerCompilerMock({
        ...wasm,
        files: wasm.files.filter((file) => file.name !== 'main.wasm'),
      });
      const compile = await loadCompiler();

      const result = await compile('fun main() {}', wasmConfig);
      expect(result.code).toBe('');
      expect(result.info.errors?.[0]).toContain('main.wasm');
    });

    test('injects the line readers the wasm stdlib is missing', async () => {
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return wasm;
      });
      const compile = await loadCompiler();

      await compile('fun main() { println(readLine()) }', wasmConfig);

      // `readLine` is unresolved on the wasm target, so it must be supplied.
      expect(sources[0]).toContain('fun readLine()');
      expect(sources[0]).toContain('__livecodesKotlinWasmReadLine');
    });

    test('does not redefine a reader the program declares itself', async () => {
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return wasm;
      });
      const compile = await loadCompiler();

      await compile(
        'fun readLine(): String? = "mine"\nfun main() { println(readLine()) }',
        wasmConfig,
      );

      expect(sources[0].match(/fun readLine\(/g)).toHaveLength(1);
    });

    test('the prelude is appended, so user line numbers do not move', async () => {
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return wasm;
      });
      const compile = await loadCompiler();

      const code = 'fun main() {\n  println(1)\n}';
      await compile(code, wasmConfig);

      expect(sources[0].startsWith(code)).toBe(true);
    });

    test('the js target does not get the wasm line readers', async () => {
      // Each target gets only its own shims: the wasm prelude's `@JsFun` stdin
      // hook is meaningless on js, where the readers already exist.
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return js;
      });
      const compile = await loadCompiler();

      await compile('fun main() { println(readLine()) }');

      expect(sources[0]).not.toContain('__livecodesKotlinStdin');
      expect(sources[0].startsWith('fun main() { println(readLine()) }')).toBe(true);
    });

    test('the js target gets the timing shims for System and Thread', async () => {
      // Tutorials call System.currentTimeMillis() and Thread.currentThread(),
      // neither of which Kotlin/JS provides.
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return js;
      });
      const compile = await loadCompiler();

      const code = 'fun main() { println(System.currentTimeMillis()) }';
      await compile(code);

      expect(sources[0].startsWith(code)).toBe(true);
      expect(sources[0]).toContain('fun System.currentTimeMillis(): Long');
      expect(sources[0]).toContain('class Thread');
    });

    test('the timing shims are skipped when the program declares its own', async () => {
      const sources: string[] = [];
      installMock((source) => {
        sources.push(source);
        return js;
      });
      const compile = await loadCompiler();

      const code = [
        'class Thread private constructor(val name: String) {',
        '    companion object { fun currentThread(): Thread = Thread("custom") }',
        '}',
        'fun System.currentTimeMillis(): Long = 0L',
      ].join('\n');
      await compile(code);

      expect(sources[0].match(/class Thread/g)).toHaveLength(1);
      expect(sources[0].match(/fun System\.currentTimeMillis\(/g)).toHaveLength(1);
    });
  });

  describe('switching target at run time', () => {
    test('each target gets its own compiler instead of sharing one image', async () => {
      // A GraalVM image installs itself on the worker's global and cannot be
      // replaced, so sharing one makes a target switch compile with the wrong
      // stdlib ("Missing stdlib class"). One compiler per target avoids it.
      const created: any[] = [];
      installMock(() => js, created);
      const compile = await loadCompiler();

      await compile('fun main() {}', { customSettings: {} });
      await compile('fun main() {}', { customSettings: { kotlin: { target: 'wasm' } } });
      // Switching back must reuse the first compiler, not start a third.
      await compile('fun main() {}', { customSettings: { kotlin: { target: 'js' } } });

      expect(created.map((options) => options.target).sort()).toEqual(['js', 'wasm']);
      // The in-worker entry would load the image into this shared global.
      expect(created.every((options) => options.warm === false)).toBe(true);
    });

    test('the js target compiles with the js image, so libraries stay available', async () => {
      // Only the js image ships `libraries/` and implements `addLibraries`.
      // Compiling js with the wasm image loses both, and every
      // `import kotlinx.browser.document` fails with "Unresolved reference".
      const created: any[] = [];
      installMock(() => js, created);
      const compile = await loadCompiler();

      await compile('import kotlinx.browser.document\nfun main() {}', { customSettings: {} });

      expect(created).toHaveLength(1);
      expect(created[0].target).toBe('js');
    });
  });
});
