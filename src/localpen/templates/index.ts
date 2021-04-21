import { getLanguageByAlias } from '../languages';
import { Pen } from '../models';
import { getAbsoluteUrl } from '../utils';
import { angularStarter } from './angular-starter';
import { blank } from './blank';
import { bootstrapStarter } from './bootstrap-starter';
import { d3Starter } from './d3-starter';
import { jqueryStarter } from './jquery-starter';
import { luaStarter } from './lua-starter';
import { mdxStarter } from './mdx-starter';
import { phpStarter } from './php-starter';
import { polymerStarter } from './polymer-starter';
import { preactStarter } from './preact-starter';
import { pythonStarter } from './python-starter';
import { reactStarter } from './react-starter';
import { readmeTemplate } from './readme-template';
import { rubyStarter } from './ruby-starter';
import { schemeStarter } from './scheme-starter';
import { stencilStarter } from './stencil-starter';
import { svelteStarter } from './svelte-starter';
import { tailwindcssStarter } from './tailwindcss-starter';
import { typescriptStarter } from './typescript-starter';
import { vueSfcStarter } from './vue-sfc-starter';
import { vueStarter } from './vue-starter';

const starterTemplates = [
  blank,
  typescriptStarter,
  reactStarter,
  vueStarter,
  vueSfcStarter,
  angularStarter,
  preactStarter,
  svelteStarter,
  stencilStarter,
  polymerStarter,
  jqueryStarter,
  mdxStarter,
  bootstrapStarter,
  tailwindcssStarter,
  d3Starter,
  pythonStarter,
  rubyStarter,
  phpStarter,
  luaStarter,
  schemeStarter,
  readmeTemplate,
];

const mapBaseUrl = (content: string, baseUrl: string) =>
  content.replace(/{{ __localpen_baseUrl__ }}/g, getAbsoluteUrl(baseUrl));

/**
 * get starter templates with languages that are enabled in the current config
 */
export const getStarterTemplates = (config: Pen) =>
  starterTemplates
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
        content: mapBaseUrl(template.markup.content || '', config.baseUrl),
      },
      style: {
        ...template.style,
        content: mapBaseUrl(template.style.content || '', config.baseUrl),
      },
      script: {
        ...template.script,
        content: mapBaseUrl(template.script.content || '', config.baseUrl),
      },
      modules: template.modules.map((module) => ({
        ...module,
        url: mapBaseUrl(module.url || '', config.baseUrl),
        typesUrl: mapBaseUrl(module.typesUrl || '', config.baseUrl),
      })),
    }));
