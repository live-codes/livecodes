import type { CompilerFunction, LanguageFormatter, LanguageSpecs } from '../../models';

declare const importScripts: (...args: string[]) => void;

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, language }) => {
  const { rescriptCompiler } = await import(baseUrl + '{{hash:lang-rescript-compiler-esm.js}}');
  return rescriptCompiler(code, { baseUrl, language });
};

export const formatterFactory: LanguageFormatter['factory'] = (baseUrl, language) => {
  importScripts(baseUrl + '{{hash:lang-rescript-formatter.js}}');
  return (self as any).createRescriptFormatter(baseUrl, language);
};

export const rescript: LanguageSpecs = {
  name: 'rescript',
  title: 'ReScript',
  formatter: {
    factory: formatterFactory,
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    scriptType: 'module',
  },
  extensions: ['res', 'resi'],
  editor: 'script',
  editorLanguage: 'javascript',
};
