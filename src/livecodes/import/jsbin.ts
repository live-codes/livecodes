import { getLanguageByAlias } from '../languages';
import type { Config } from '../models';
import { corsService } from '../services';
import { hostPatterns } from './check-src';

export const importFromJsbin = async (url: string): Promise<Partial<Config>> => {
  const binId = new RegExp(hostPatterns.jsbin).exec(url)?.[1];
  if (!binId) return {};
  const binUrl = `https://jsbin.com/api/${binId}`;

  try {
    const bin = await corsService.fetch(binUrl).then((res) => res.json());
    return {
      markup: {
        language: getLanguageByAlias(bin.settings?.processors?.html) || 'html',
        content: bin.html || '',
      },
      style: {
        language: getLanguageByAlias(bin.settings?.processors?.css) || 'css',
        content: bin.css || '',
      },
      script: {
        language: getLanguageByAlias(bin.settings?.processors?.javascript) || 'javascript',
        content: bin.javascript || '',
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch: ' + binUrl);
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};
