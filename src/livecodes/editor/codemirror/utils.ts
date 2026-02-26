export const codemirrorLegacy = async (parser: any) => {
  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
  const { LanguageSupport, StreamLanguage } = await import('@codemirror/language');
  return new LanguageSupport(StreamLanguage.define(parser));
};
