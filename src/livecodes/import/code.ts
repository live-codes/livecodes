import type { Config } from '../models';
import { decompress } from '../utils/compression';
import { isCompressedCode } from './check-src';

export const importCompressedCode = (url: string) => {
  if (!isCompressedCode(url)) return {};
  const code = url.slice('code/'.length);
  let config: Partial<Config>;
  try {
    config = JSON.parse(decompress(code) || '{}');
  } catch (error) {
    config = {};
  }
  return config;
};
