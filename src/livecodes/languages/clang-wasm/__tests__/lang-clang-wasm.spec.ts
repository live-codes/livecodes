import type { Compiler, Config, LanguageSpecs } from '../../../models';
import { cWasm, cppWasm, objcWasm, objcppWasm } from '../lang-clang-wasm';

const getInlineScript = async (language: LanguageSpecs, config: Config) => {
  const inlineScript = (language.compiler as Compiler).inlineScript;
  if (typeof inlineScript !== 'function') {
    throw new Error(`expected a function inlineScript for ${language.name}`);
  }
  return inlineScript({ baseUrl: '', config });
};

const configWith = (customSettings: Config['customSettings']) =>
  ({ customSettings }) as unknown as Config;

describe('clang-wasm custom settings', () => {
  const languages = [cWasm, cppWasm, objcWasm, objcppWasm];

  test('exposes an inlineScript for every Clang language', () => {
    languages.forEach((language) => {
      expect(typeof (language.compiler as Compiler).inlineScript).toBe('function');
    });
  });

  test('emits the settings under the language name', async () => {
    const settings = {
      std: 'gnu17',
      compileArgs: ['-Wall', '-O2'],
      args: ['--name', 'LiveCodes'],
    };
    const script = await getInlineScript(cWasm, configWith({ 'c-wasm': settings }));
    expect(script).toContain('window.livecodes.clangWasm.settings');
    expect(script).toContain('"c-wasm"');
    expect(script).toContain(JSON.stringify(settings));
  });

  test('escapes a closing script tag in a setting', async () => {
    const script = await getInlineScript(
      cppWasm,
      configWith({ 'cpp-wasm': { compileArgs: ['</script>'] } }),
    );
    expect(script).not.toContain('</script>');
    expect(script).toContain('\\u003c/script>');
  });

  test('replaces previous settings so a removed setting does not linger', async () => {
    const script = await getInlineScript(objcWasm, configWith({}));
    expect(script).toContain('{ "objc-wasm": {} }');
  });
});
