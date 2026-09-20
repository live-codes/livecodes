import { defaultConfig } from '../../config/default-config';
import type { Cache, CompileInfo, Config, Language } from '../../models';
import { createResultPage } from '../result-page';

const createPage = async (language: Language, customSettings: Config['customSettings']) => {
  const config = {
    ...defaultConfig,
    customSettings,
    script: { ...defaultConfig.script, language },
  } as Config;
  const code = {
    markup: { language: 'html', content: '', compiled: '' },
    style: { language: 'css', content: '', compiled: '' },
    script: { language, content: '', compiled: 'int main(void) { return 0; }' },
    tests: { language: 'typescript', content: '', compiled: '' },
  } as unknown as Cache;
  return createResultPage({
    code,
    config,
    forExport: false,
    template: '<!doctype html><html><head></head><body></body></html>',
    baseUrl: 'http://localhost/',
    singleFile: true,
    runTests: false,
    compileInfo: {} as CompileInfo,
  });
};

describe('clang-wasm custom settings in the result page', () => {
  test('hands the custom settings to the runner script', async () => {
    const html = await createPage('c-wasm', {
      'c-wasm': { std: 'gnu17', compileArgs: ['-Wall'] },
    });
    expect(html).toContain('window.livecodes.clangWasm.settings');
    expect(html).toContain('"c-wasm"');
    expect(html).toContain('"std":"gnu17"');
    expect(html).toContain('"compileArgs":["-Wall"]');
  });

  test('is not injected for other languages', async () => {
    const html = await createPage('javascript', {});
    expect(html).not.toContain('clangWasm.settings');
  });
});
