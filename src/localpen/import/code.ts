import { Pen } from '../models';
import { decompress } from '../utils';

export const isCompressedCode = (url: string) => url.startsWith('code/');

export const importCompressedCode = (url: string) => {
  const code = url.slice(5);
  let config: Partial<Pen>;
  try {
    config = JSON.parse(decompress(code) || '{}');
  } catch (error) {
    config = {};
  }
  return config;
};
