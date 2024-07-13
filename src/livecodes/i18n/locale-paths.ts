// ATTENTION: This file is auto-generated. Do not edit manually!

export const pathLoader = (baseUrl: string) => (lngs: string[], nss: string[]) => {
  const lng = lngs[0];
  const ns = nss[0];
  if (lng === 'ar' && ns === 'language-info') {
    return baseUrl + '{{hash:translation-ar-language-info.json}}';
  }
  if (lng === 'ar' && ns === 'translation') {
    return baseUrl + '{{hash:translation-ar-translation.json}}';
  }
  if (lng === 'en' && ns === 'language-info') {
    return baseUrl + '{{hash:translation-en-language-info.json}}';
  }
  if (lng === 'en' && ns === 'translation') {
    return baseUrl + '{{hash:translation-en-translation.json}}';
  }
  if (lng === 'zh-CN' && ns === 'language-info') {
    return baseUrl + '{{hash:translation-zh-CN-language-info.json}}';
  }
  if (lng === 'zh-CN' && ns === 'translation') {
    return baseUrl + '{{hash:translation-zh-CN-translation.json}}';
  }
  return false;
};
