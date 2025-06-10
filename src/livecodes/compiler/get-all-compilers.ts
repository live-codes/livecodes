import { languageIsEnabled } from '../languages';
import type {
  Compiler,
  Compilers,
  Config,
  Language,
  LanguageSpecs,
  ProcessorSpecs,
} from '../models';
import { isRelativeUrl } from '../utils';

export const getAllCompilers = (
  languages: Array<LanguageSpecs | ProcessorSpecs>,
  config: Config,
  baseUrl: string,
) =>
  languages
    .filter(
      (language) =>
        window.deps.processors.includes(language as ProcessorSpecs) ||
        languageIsEnabled((language as LanguageSpecs).name, config),
    )
    .reduce((compilers, language) => {
      if (language.compiler && !compilers[language.name]) {
        if (typeof language.compiler === 'string') {
          const compiler = languages.find((lang) => lang.name === (language.compiler as Language))
            ?.compiler as Compiler;
          compilers[language.name] = {
            ...compiler,
            url: getCompilerUrl(compiler.url, baseUrl),
            aliasTo: language.compiler,
          } as Compiler;
        } else {
          compilers[language.name] = {
            ...language.compiler,
            url: getCompilerUrl(language.compiler.url, baseUrl),
          } as Compiler;
        }
      }
      return compilers;
    }, {} as Compilers);

const getCompilerUrl = (url: string | undefined, baseUrl: string) =>
  !url ? '' : isRelativeUrl(url) ? baseUrl + url : url;
