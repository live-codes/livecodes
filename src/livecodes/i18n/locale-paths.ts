// ATTENTION: This file is auto-generated. Do not edit manually!

export const pathLoader = (baseUrl: string) => (lngs: string[], nss: string[]) => {
  const lng = lngs[0];
  const ns = nss[0];
  if (lng === 'ar' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-ar-language-info.json}}';
  }
  if (lng === 'ar' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-ar-translation.json}}';
  }
  if (lng === 'en' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-en-language-info.json}}';
  }
  if (lng === 'en' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-en-translation.json}}';
  }
  if (lng === 'es' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-es-language-info.json}}';
  }
  if (lng === 'es' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-es-translation.json}}';
  }
  if (lng === 'fr' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-fr-language-info.json}}';
  }
  if (lng === 'fr' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-fr-translation.json}}';
  }
  if (lng === 'it' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-it-language-info.json}}';
  }
  if (lng === 'it' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-it-translation.json}}';
  }
  if (lng === 'ja' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-ja-language-info.json}}';
  }
  if (lng === 'ja' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-ja-translation.json}}';
  }
  if (lng === 'pt' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-pt-language-info.json}}';
  }
  if (lng === 'pt' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-pt-translation.json}}';
  }
  if (lng === 'ru' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-ru-language-info.json}}';
  }
  if (lng === 'ru' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-ru-translation.json}}';
  }
  if (lng === 'zh-CN' && ns === 'language-info') {
    return baseUrl + '{{hash:i18n-zh-CN-language-info.json}}';
  }
  if (lng === 'zh-CN' && ns === 'translation') {
    return baseUrl + '{{hash:i18n-zh-CN-translation.json}}';
  }
  return false;
};
