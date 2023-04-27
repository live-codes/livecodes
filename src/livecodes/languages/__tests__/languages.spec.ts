import { getLanguageByAlias, getLanguageEditorId, getLanguageExtension, mapLanguage } from '..';

describe('languages', () => {
  test('getLanguageByAlias', () => {
    expect(getLanguageByAlias('html')).toBe('html');
    expect(getLanguageByAlias('HTML')).toBe('html');
    expect(getLanguageByAlias('htm')).toBe('html');
    expect(getLanguageByAlias('js')).toBe('javascript');
    expect(getLanguageByAlias('Javascript')).toBe('javascript');
  });

  test('getLanguageEditorId', () => {
    expect(getLanguageEditorId('html')).toBe('markup');
    expect(getLanguageEditorId('css')).toBe('style');
    expect(getLanguageEditorId('js')).toBe('script');
  });

  test('getLanguageExtension', () => {
    expect(getLanguageExtension('markdown')).toBe('md');
    expect(getLanguageExtension('typescript')).toBe('ts');
  });

  test('mapLanguage', () => {
    expect(mapLanguage('babel')).toBe('typescript');
    expect(mapLanguage('jsx')).toBe('javascript');
    expect(mapLanguage('solid')).toBe('javascript');
    expect(mapLanguage('tsx')).toBe('typescript');
    expect(mapLanguage('stencil')).toBe('typescript');
    expect(mapLanguage('solid.tsx')).toBe('typescript');
    expect(mapLanguage('assemblyscript')).toBe('typescript');
    expect(mapLanguage('vue')).toBe('html');
    expect(mapLanguage('vue2')).toBe('html');
    expect(mapLanguage('svelte')).toBe('html');
    expect(mapLanguage('mdx')).toBe('markdown');
    expect(mapLanguage('pyodide')).toBe('python');
    expect(mapLanguage('javascript')).toBe('javascript');
    expect(mapLanguage('ruby')).toBe('ruby');
    expect(mapLanguage('html')).toBe('html');
  });
});
