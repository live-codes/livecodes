import type { Compiler, Config } from '../../../models';
import { nimWasm } from '../lang-nim-wasm';

const getInlineScript = async (config: Config) => {
  const inlineScript = (nimWasm.compiler as Compiler).inlineScript;
  if (typeof inlineScript !== 'function') {
    throw new Error('expected a function inlineScript for nim-wasm');
  }
  return inlineScript({ baseUrl: '', config });
};

const configWith = (customSettings: Config['customSettings']) =>
  ({ customSettings }) as unknown as Config;

describe('nim-wasm custom settings', () => {
  test('exposes an inlineScript', () => {
    expect(typeof (nimWasm.compiler as Compiler).inlineScript).toBe('function');
  });

  test('emits the settings under the language name', async () => {
    const settings = { compileArgs: ['--define:release2'], args: ['--name', 'LiveCodes'] };
    const script = await getInlineScript(configWith({ 'nim-wasm': settings }));
    expect(script).toContain('window.livecodes.nimWasm.settings');
    expect(script).toContain('"nim-wasm"');
    expect(script).toContain(JSON.stringify(settings));
  });

  test('escapes a closing script tag in a setting', async () => {
    const script = await getInlineScript(
      configWith({ 'nim-wasm': { compileArgs: ['</script>'] } }),
    );
    expect(script).not.toContain('</script>');
    expect(script).toContain('\\u003c/script>');
  });

  test('replaces previous settings so a removed setting does not linger', async () => {
    const script = await getInlineScript(configWith({}));
    expect(script).toContain('{ "nim-wasm": {} }');
  });
});
