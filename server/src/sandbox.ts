/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { sandboxVersion } from '../../src/livecodes/html/sandbox/index.ts';
import { dirname } from './utils.ts';

export const sandbox = async ({ hostname, port }: { hostname: string; port: number }) => {
  const app = express();

  app.use(cors());
  app.disable('x-powered-by');

  const sandboxDir = path.resolve(dirname, 'sandbox');
  let sandboxVersionDir = path.resolve(sandboxDir, sandboxVersion);
  const dirs = await fs.promises.readdir(sandboxDir);
  for (const v of dirs) {
    if ((await fs.promises.stat(path.resolve(sandboxDir, v))).isDirectory()) {
      sandboxVersionDir = path.resolve(sandboxDir, v);
    }
  }

  app.use('/', (req, res) => {
    if (req.path === '/') {
      res.set('Content-Type', 'text/html');
      res.status(200).sendFile(path.resolve(sandboxVersionDir, 'index.html'));
      return;
    }
    const reqPath = req.path.endsWith('/')
      ? req.path + 'index.html'
      : !req.path.split('/').pop()?.includes('.')
        ? req.path + '.html'
        : req.path;
    res.set('Content-Type', 'text/html');
    const filePath = path.resolve(dirname, 'sandbox' + reqPath);
    const onError = () => res.status(404).sendFile(path.resolve(sandboxVersionDir, 'index.html'));
    res.status(200).sendFile(filePath, onError);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Sandbox is running on https://${hostname}${port !== 443 ? ':' + port : ''}`);
  });
};
