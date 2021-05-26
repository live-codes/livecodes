import { getImports } from '../compiler';
import { Pen, Types } from '../models';
import { objectFilter } from '../utils';

export const detectTypes = (code: string, config: Pen): Types => {
  if (!config.types || Object.keys(config.types).length === 0) return {};
  const imports = getImports(code);
  return objectFilter(config.types, (_url, lib) => imports.find((mod) => mod.startsWith(lib)));
};
