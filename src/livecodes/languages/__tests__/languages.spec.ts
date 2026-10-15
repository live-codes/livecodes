import {
  getLanguageByAlias,
  getLanguageEditorId,
  getLanguageExtension,
  languageIsEnabled,
  mapLanguage,
} from '..';

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
    expect(mapLanguage('vue2')).toBe('html');
    expect(mapLanguage('mdx')).toBe('markdown');
    expect(mapLanguage('pyodide')).toBe('python');
    expect(mapLanguage('javascript')).toBe('javascript');
    expect(mapLanguage('ruby')).toBe('ruby');
    expect(mapLanguage('html')).toBe('html');
  });

  describe('deprecation warnings', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      (window as any).deps.loggedDeprecations = [];
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {
        //
      });
    });

    afterEach(() => {
      warn.mockRestore();
    });

    test('warns when a deprecated language name is used', () => {
      expect(getLanguageByAlias('ocaml')).toBe('ocaml');
      expect(warn).toHaveBeenCalled();
    });

    test('does not warn while enumerating languages', () => {
      languageIsEnabled('ocaml', { languages: undefined } as any);
      languageIsEnabled('ocaml', { languages: ['html', 'css', 'javascript'] } as any);
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
