import type { CompileOptions, Compiler, Config } from '../../../models';
import { assemblyWasm } from '../lang-assembly-wasm';

describe('assembly-wasm', () => {
  const compiler = assemblyWasm.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(assemblyWasm.name).toBe('assembly-wasm');
    expect(assemblyWasm.title).toBe('Assembly (Wasm)');
    expect(assemblyWasm.extensions).toEqual(
      expect.arrayContaining(['asm', 'assembly', 'x86', 'x86-64', 'nasm', 'wasm.asm']),
    );
  });

  test('uses the script editor with the text/assembly script type', () => {
    expect(assemblyWasm.editor).toBe('script');
    expect(compiler.scriptType).toBe('text/assembly');
    expect(compiler.compiledCodeLanguage).toBe('assembly-wasm');
    expect(compiler.liveReload).toBe(true);
  });

  test('loads only the runner script on the page (the runtimes live in a worker)', () => {
    const scripts =
      typeof compiler.scripts === 'function'
        ? compiler.scripts({ baseUrl: 'base/', config: {} as Config, compiled: '' })
        : compiler.scripts;
    expect(scripts).toEqual(['base/{{hash:lang-assembly-wasm-script.js}}']);
  });

  test('compiler factory is the identity (assembly happens in the runner)', async () => {
    const fn = await compiler.factory({} as Config, '');
    const code = 'mov rax, 60\nxor rdi, rdi\nsyscall';
    expect(await fn(code, {} as CompileOptions as any)).toBe(code);
  });

  test('advertises editor support for x86 assembly', () => {
    expect(assemblyWasm.editorSupport?.monaco?.language).toBe('asm');
    expect(assemblyWasm.editorSupport?.codejar?.language).toBe('nasm');
  });
});
