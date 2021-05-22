export * from './default-config';
export * from './load-config';
import { Pen } from '../models';
import { upgradeConfig } from './upgrade-config';
import { validateConfig } from './validate-config';

export const upgradeAndValidate = (config: Partial<Pen>) =>
  validateConfig(upgradeConfig(config as any));

let config: Pen;

// get a fresh immatuable copy of config
export const getConfig = (): Pen => JSON.parse(JSON.stringify(config));

export const setConfig = (newConfig: Pen) => {
  config = JSON.parse(JSON.stringify(newConfig));
};
