import { getLanguageSelectors } from '../dom';

describe('getLanguageSelectors', () => {
  test('defaults first', () => {
    const params = {
      js: '#js-code',
      ts: '#ts-code',
      html: '#html-code',
      pug: '#pug-code',
    };
    const selectors = getLanguageSelectors(params);
    const expectedSelectors = {
      markup: { language: 'html', selector: '#html-code' },
      script: { language: 'javascript', selector: '#js-code' },
    };
    expect(selectors).toEqual(expectedSelectors);
  });
  test('non defaults first', () => {
    const params = {
      ts: '#ts-code',
      js: '#js-code',
      html: '#html-code',
      pug: '#pug-code',
    };
    const selectors = getLanguageSelectors(params);
    const expectedSelectors = {
      markup: { language: 'html', selector: '#html-code' },
      script: { language: 'typescript', selector: '#ts-code' },
    };
    expect(selectors).toEqual(expectedSelectors);
  });
});
