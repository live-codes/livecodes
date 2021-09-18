export * from './build-config';
export * from './default-config';
export * from './utils';

import { Config } from '../models';
import { upgradeConfig } from './upgrade-config';
import { validateConfig } from './validate-config';

export const upgradeAndValidate = (config: Partial<Config>) =>
  validateConfig(upgradeConfig(config as any));

let appConfig: Config;

// get a fresh immatuable copy of config
export const getConfig = (): Config => JSON.parse(JSON.stringify(appConfig));

export const setConfig = (newConfig: Config) => {
  appConfig = JSON.parse(JSON.stringify(newConfig));
};
