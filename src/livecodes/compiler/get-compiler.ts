import type { Language, Config, EventsManager } from '../models';
import { createCompiler } from './create-compiler';
import type { Compiler, LanguageOrProcessor } from './models';
import { getCompileResult } from './utils';

export const getCompiler = (options: {
  config: Config;
  baseUrl: string;
  eventsManager: EventsManager;
}): Promise<Compiler> => {
  const mode = options.config.mode;
  if (mode === 'codeblock' || mode === 'editor') {
    return createFakeCompiler();
  } else {
    return createCompiler(options);
  }
};

async function createFakeCompiler(): Promise<Compiler> {
  return {
    load: (_languages: LanguageOrProcessor[], _config: Config) => Promise.resolve(['do nothing']),
    compile: (content: string, _language: Language, _config: Config) =>
      Promise.resolve(getCompileResult(content)),
    clearCache: () => undefined,
  };
}
