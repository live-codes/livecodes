import { getLanguageByAlias } from '../languages';
import { Config, Template } from '../models';
import { getAbsoluteUrl, objectMap } from '../utils';

const mapBaseUrl = (content: any, baseUrl: string) => {
  const replaceUrl = (url: any) =>
    url.replace(/{{ __livecodes_baseUrl__ }}/g, getAbsoluteUrl(baseUrl));
  if (typeof content === 'string') {
    return replaceUrl(content);
  } else {
    return {
      ...content,
      url: replaceUrl(content.url),
    };
  }
};

const loadTemplates = async (baseUrl: string): Promise<Template[]> =>
  (await import(baseUrl + '{{hash:templates.js}}')).starterTemplates;

/**
 * get starter templates with languages that are enabled in the current config
 */
export const getStarterTemplates = async (config: Config, baseUrl: string): Promise<Template[]> =>
  (await loadTemplates(baseUrl))
    .filter((template) => {
      const enabledLanguages = config.languages?.map(getLanguageByAlias).filter(Boolean);
      if (!enabledLanguages) return true;
      if (template.title === 'Blank Project') return true;

      const templateLanguages = [
        template.markup.language,
        template.style.language,
        template.script.language,
      ];
      for (const language of templateLanguages) {
        const lang = getLanguageByAlias(language);
        if (!lang || !enabledLanguages.includes(lang)) return false;
      }
      return true;
    })
    .map((template) => ({
      ...template,
      markup: {
        ...template.markup,
        content: mapBaseUrl(template.markup.content || '', baseUrl),
      },
      style: {
        ...template.style,
        content: mapBaseUrl(template.style.content || '', baseUrl),
      },
      script: {
        ...template.script,
        content: mapBaseUrl(template.script.content || '', baseUrl),
      },
      imports: objectMap(template.imports, (url) => mapBaseUrl(url || '', baseUrl)),
      types: objectMap(template.types, (url) => mapBaseUrl(url || '', baseUrl)),
    }));

export const getTemplate = async (name: string, config: Config, baseUrl: string) =>
  (await getStarterTemplates(config, baseUrl)).filter(
    (template) => template.name.toLowerCase() === name.toLowerCase(),
  )[0];
