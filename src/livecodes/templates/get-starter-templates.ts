import { getLanguageByAlias } from '../languages';
import type { Config, Template, TemplateName } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { modulesService } from '../services/modules';
import { getAbsoluteUrl, objectMap } from '../utils';

const mapBaseUrl = (content: any, baseUrl: string) => {
  const replaceUrl = (url: any) =>
    url
      .replace(/{{ __livecodes_baseUrl__ }}/g, getAbsoluteUrl(baseUrl))
      .replace(/{{ __CDN_URL__ }}/g, modulesService.getUrl('~').replace('~', ''));

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
        template.markup?.language,
        template.style?.language,
        template.script?.language,
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
        language: template.markup?.language || 'html',
        content: mapBaseUrl(template.markup?.content || '', baseUrl),
        ...(template.markup?.contentUrl
          ? { contentUrl: mapBaseUrl(template.markup?.contentUrl || '', baseUrl) }
          : {}),
      },
      style: {
        ...template.style,
        language: template.style?.language || 'css',
        content: mapBaseUrl(template.style?.content || '', baseUrl),
        ...(template.style?.contentUrl
          ? { contentUrl: mapBaseUrl(template.style?.contentUrl || '', baseUrl) }
          : {}),
      },
      script: {
        ...template.script,
        language: template.script?.language || 'javascript',
        content: mapBaseUrl(template.script?.content || '', baseUrl),
        ...(template.script?.contentUrl
          ? { contentUrl: mapBaseUrl(template.script?.contentUrl || '', baseUrl) }
          : {}),
      },
      imports: objectMap(template.imports || {}, (url) => mapBaseUrl(url || '', baseUrl)),
      types: objectMap(template.types || {}, (url) => mapBaseUrl(url || '', baseUrl)),
      stylesheets: template.stylesheets?.map((url) => mapBaseUrl(url || '', baseUrl)),
      scripts: template.scripts?.map((url) => mapBaseUrl(url || '', baseUrl)),
    }));

export const getTemplate = async (name: string, config: Config, baseUrl: string) =>
  (await getStarterTemplates(config, baseUrl)).filter(
    (template) =>
      template.name.toLowerCase() === name.toLowerCase() ||
      template.aliases?.map((a) => a.toLowerCase()).includes(name.toLowerCase() as TemplateName),
  )[0];
