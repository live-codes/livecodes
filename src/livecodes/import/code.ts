import type { SDKConfig } from '../models';
import { decompress } from '../utils/compression';
import { isCompressedCode } from './check-src';

export const importCompressedCode = (url: string) => {
  if (!isCompressedCode(url)) return {};
  const code = url.slice('code/'.length);
  let config: Partial<SDKConfig>;
  try {
    config = JSON.parse(decompress(code) || '{}');
  } catch (error) {
    config = {};
  }
  return config;
};
