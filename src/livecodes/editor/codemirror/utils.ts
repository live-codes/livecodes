export const codemirrorLegacy = async (parser: any) => {
  const { LanguageSupport, StreamLanguage } = await import(codemirrorImports.language);
  return new LanguageSupport(StreamLanguage.define(parser));
};

export const codemirrorImports = {
  html: '@codemirror/lang-html',
  css: '@codemirror/lang-css',
  javascript: '@codemirror/lang-javascript',
  json: '@codemirror/lang-json',
  language: '@codemirror/language',
};
