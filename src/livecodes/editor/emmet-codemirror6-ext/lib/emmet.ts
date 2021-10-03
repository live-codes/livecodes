/* eslint-disable */
// @ts-nocheck
import expandAbbreviation, {
  UserConfig,
  Options,
  MarkupAbbreviation,
  StylesheetAbbreviation,
} from 'emmet';
import { field } from './output';

/**
 * Cache for storing internal Emmet data.
 * TODO reset whenever user settings are changed
 */
let cache = {};

export const JSX_PREFIX = '<';

/**
 * Expands given abbreviation into code snippet
 */
export function expand(
  abbr: string | MarkupAbbreviation | StylesheetAbbreviation,
  config?: UserConfig,
) {
  let opt: UserConfig = { cache };
  const outputOpt: Partial<Options> = {
    'output.field': field(),
    'output.format': !config || !config['inline'],
  };

  if (config) {
    Object.assign(opt, config);
    if (config.options) {
      Object.assign(outputOpt, config.options);
    }
  }

  opt.options = outputOpt;

  return expandAbbreviation(abbr as string, opt);
}
