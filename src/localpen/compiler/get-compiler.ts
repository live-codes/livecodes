import { Language, Pen } from '../models';
import { createCompiler } from './create-compiler';
import { Compiler, LanguageOrProcessor } from './models';

export const getCompiler = (config: Pen, baseUrl: string): Compiler => {
  const { mode } = config;
  if (mode === 'codeblock' || mode === 'editor') {
    return createFakeCompiler();
  } else {
    return createCompiler(config, baseUrl);
  }
};

function createFakeCompiler(): Compiler {
  return {
    load: (_languages: LanguageOrProcessor[], _config: Pen) => Promise.resolve(['do nothing']),
    compile: (content: string, _language: Language, _config: Pen) => Promise.resolve(content),
  };
}
