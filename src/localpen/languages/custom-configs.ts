import { CustomConfig } from '../models';
import { stringToValidJson } from '../utils';

export const customConfigTypes = ['autoprefixer-config', 'tailwind-config'] as const;

const createSelector = (types: typeof customConfigTypes) =>
  types.map((type) => `script[type="${type}"]`).join(',');

export const customConfigsApply = (
  html: string,
  fn: (script: HTMLScriptElement, dom: Document) => void,
  types: typeof customConfigTypes = customConfigTypes,
) => {
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(html, 'text/html');
  const selector = createSelector(types);
  const scripts = dom.querySelectorAll<HTMLScriptElement>(selector);
  scripts.forEach((script) => fn(script, dom));
  return dom.documentElement.outerHTML;
};

export const extractCustomConfigs = (html: string) => {
  const customConfigs: CustomConfig[] = [];
  customConfigsApply(html, (script) => {
    try {
      const jsonStr = stringToValidJson(script.innerHTML);
      const content = JSON.parse(jsonStr) || {};
      customConfigs.push({ type: script.type as CustomConfig['type'], content });
    } catch (err) {
      //
    }
  });
  return customConfigs;
};

export const removeCustomConfigs = (html: string) =>
  customConfigsApply(html, (script) => {
    script.remove();
  });

export const getCustomConfigs = (customConfigs: CustomConfig[], type: CustomConfig['type']) =>
  customConfigs
    .filter((conf) => conf.type === type)
    .map((custom) => custom.content)
    .reduce((acc, content) => ({ ...acc, ...content }), {});
