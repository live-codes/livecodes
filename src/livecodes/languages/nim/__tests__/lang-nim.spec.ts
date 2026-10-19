import type { Compiler, CompileResult, Config, Language } from '../../../models';
import { nim } from '../lang-nim';

const compiler = nim.compiler as Compiler;

const configWith = (customSettings: Config['customSettings']) =>
  ({ customSettings }) as unknown as Config;

type Configured<T> = T | ((options: { config: Config }) => T | undefined);

const resolveConfig = <T>(value: Configured<T> | undefined, config: Config): T | undefined =>
  typeof value === 'function'
    ? (value as (options: { config: Config }) => T | undefined)({ config })
    : value;

const scriptsFor = (config: Config) =>
  (
    compiler.scripts as (options: { compiled: string; baseUrl: string; config: Config }) => string[]
  )({ compiled: '', baseUrl: 'https://example.test/livecodes/', config });

describe('nim custom settings', () => {
  test('defaults to the JavaScript backend', () => {
    const config = configWith({});
    expect(resolveConfig<Language>(compiler.compiledCodeLanguage, config)).toBe('javascript');
    expect(resolveConfig(compiler.scriptType, config)).toBeUndefined();
    expect(scriptsFor(config)).toEqual([]);
  });

  test('selects C (Wasm) with target "c"', () => {
    const config = configWith({ nim: { target: 'c' } });
    expect(resolveConfig<Language>(compiler.compiledCodeLanguage, config)).toBe('c-wasm');
    expect(resolveConfig(compiler.scriptType, config)).toBe('text/c-wasm');
    expect(scriptsFor(config)).toEqual([
      'https://example.test/livecodes/{{hash:lang-clang-wasm-script.js}}',
    ]);
  });

  test('selects C++ (Wasm) with target "cpp"', () => {
    const config = configWith({ nim: { target: 'cpp' } });
    expect(resolveConfig<Language>(compiler.compiledCodeLanguage, config)).toBe('cpp-wasm');
    expect(resolveConfig(compiler.scriptType, config)).toBe('text/cpp-wasm');
    expect(scriptsFor(config)[0]).toContain('lang-clang-wasm-script.js');
  });
});

type Compile = (code: string, options: { config: Config }) => Promise<string | CompileResult>;

const createCompilerMock = () => {
  const calls: Array<Record<string, unknown>> = [];
  const globalObject = globalThis as unknown as Record<string, unknown>;
  if (globalObject.self == null) globalObject.self = globalObject;
  (globalObject.self as Record<string, unknown>).nimWasm = {
    createCompiler: (options: Record<string, unknown>) => {
      calls.push(options);
      return Promise.resolve({
        run: async () => ({ compiledCode: `compiled-${options.target}` }),
      });
    },
  };
  return calls;
};

const compilerFactory = async (): Promise<Compile> => {
  const factory = compiler.factory as unknown as (
    config: Config,
    baseUrl: string,
  ) => Promise<Compile>;
  return factory(configWith({}), '');
};

describe('nim compiler factory', () => {
  test('compiles with the configured target and requests one amalgamated file', async () => {
    const calls = createCompilerMock();
    const compile = await compilerFactory();
    const result = await compile('echo "hi"', {
      config: configWith({ nim: { target: 'c' } }),
    });

    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ target: 'c', emit: 'single' });
    expect(result).toEqual({ code: 'compiled-c', info: {} });
  });

  test('wraps the JavaScript program in its own scope', async () => {
    createCompilerMock();
    const compile = await compilerFactory();
    const result = await compile('echo "hi"', { config: configWith({}) });

    expect(result).toEqual({ code: '(() => {\ncompiled-js\n})();', info: {} });
  });

  test('keeps one compiler per target', async () => {
    const calls = createCompilerMock();
    const compile = await compilerFactory();
    const cpp = { config: configWith({ nim: { target: 'cpp' } }) };

    await compile('a', cpp);
    await compile('b', cpp);
    expect(calls).toHaveLength(1);

    await compile('c', { config: configWith({ nim: { target: 'c' } }) });
    expect(calls.map((call) => call.target)).toEqual(['cpp', 'c']);
  });
});
