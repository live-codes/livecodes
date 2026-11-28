import type { Compiler, Config } from '../../../models';
import { typst } from '../lang-typst';

describe('typst', () => {
  const compiler = typst.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(typst.name).toBe('typst');
    expect(typst.title).toBe('Typst');
    expect(typst.extensions).toEqual(['typ']);
  });

  test('does not use the result-page runtime or live reload', () => {
    expect(compiler.scripts).toBeUndefined();
    expect(compiler.scriptType).toBeUndefined();
    expect(compiler.inlineScript).toBeUndefined();
    expect(compiler.compiledCodeLanguage).toBeUndefined();
    expect(compiler.liveReload).toBeUndefined();
  });

  test('loads the compiler script in the compiler worker', async () => {
    const importScripts = jest.fn();
    const compile = jest.fn();
    const createTypstCompiler = jest.fn(() => compile);
    const global = globalThis as any;
    global.importScripts = importScripts;
    global.createTypstCompiler = createTypstCompiler;

    try {
      const fn = await compiler.factory({} as Config, 'base/');
      expect(importScripts).toHaveBeenCalledWith('base/{{hash:lang-typst-compiler.js}}');
      expect(createTypstCompiler).toHaveBeenCalled();
      expect(fn).toBe(compile);
    } finally {
      delete global.importScripts;
      delete global.createTypstCompiler;
    }
  });
});
