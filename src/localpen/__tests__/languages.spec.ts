import { getLanguageByAlias, getLanguageEditorId, getLanguageExtension } from '../languages';

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
});
