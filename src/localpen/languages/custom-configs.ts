import { CustomConfig } from '../models';
import { stringToValidJson } from '../utils';

export const markupConfigTypes = ['marked-config', 'mdx-config'] as const;
export const styleConfigTypes = ['autoprefixer-config', 'sass-config', 'tailwind-config'] as const;
export const scriptConfigTypes = ['babel-config', 'typescript-config'] as const;
export const customConfigTypes = [
  ...markupConfigTypes,
  ...styleConfigTypes,
  ...scriptConfigTypes,
] as const;

const createSelector = (types: typeof customConfigTypes) =>
  types.map((type) => `script[type="${type}"]`).join(',');

const customConfigsApply = (
  html: string,
  fn: (script: HTMLScriptElement) => void,
  types: typeof customConfigTypes = customConfigTypes,
) => {
  const container = document.createElement('div');
  container.style.display = 'none';
  container.innerHTML = html;
  const selector = createSelector(types);
  const scripts = container.querySelectorAll<HTMLScriptElement>(selector);
  scripts.forEach((script) => fn(script));
  const result = container.innerHTML;
  container.remove();
  return result;
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

export const getCustomConfig = (
  type: CustomConfig['type'],
  customConfigs: CustomConfig[] | undefined = [],
) =>
  customConfigs
    .filter((conf) => conf.type === type)
    .map((custom) => custom.content)
    .reduce((acc, content) => ({ ...acc, ...content }), {});
