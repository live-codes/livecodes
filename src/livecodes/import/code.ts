import type { Config } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { decompress } from '../utils/compression';

export const importCompressedCode = (url: string) => {
  const code = url.slice(5);
  let config: Partial<Config>;
  try {
    config = JSON.parse(decompress(code) || '{}');
  } catch (error) {
    config = {};
  }
  return config;
};
