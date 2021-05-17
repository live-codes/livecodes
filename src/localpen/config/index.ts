export * from './default-config';
export * from './load-config';
import { Pen } from '../models';
import { upgradeConfig } from './upgrade-config';
import { validateConfig } from './validate-config';

export const upgradeAndValidate = (config: Partial<Pen>) =>
  validateConfig(upgradeConfig(config as any));
