import fs from 'fs';
import path from 'path';
import { dirname } from './utils.ts';

export const saveCache = async () => {
  const srcDir = path.resolve(dirname, '../../tmp/');
  const dstDir = path.resolve(dirname, '../../.cache/');

  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(dstDir, { recursive: true });
    await fs.promises.cp(srcDir, dstDir, { recursive: true });
  }
};
