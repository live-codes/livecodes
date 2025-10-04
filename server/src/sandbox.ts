/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { dirname } from './utils.ts';

export const sandbox = async ({ hostname, port }: { hostname: string; port: number }) => {
  const app = express();

  app.use(cors());
  app.disable('x-powered-by');

  const sandboxDir = path.resolve(dirname, 'sandbox');
  const dirs = await fs.promises.readdir(sandboxDir);
  const version =
    dirs
      .filter((v) => v.startsWith('v'))
      .map((v) => Number(v.slice(1)))
      .filter((v) => !Number.isNaN(v))
      .sort((a, b) => b - a)
      .map((v) => 'v' + v)
      .pop() || '';
  const sandboxVersionDir = path.resolve(sandboxDir, version);

  app.use('/', (req, res) => {
    if (req.path === '/') {
      res.set('Content-Type', 'text/html');
      res.status(200).sendFile(path.resolve(sandboxVersionDir, 'index.html'));
      return;
    }
    let reqPath = req.path.endsWith('/')
      ? req.path + 'index.html'
      : !req.path.split('/').pop()?.includes('.')
        ? req.path + '.html'
        : req.path;
    if (reqPath.startsWith('/')) {
      reqPath = reqPath.slice(1);
    }
    const filePath = path.resolve(sandboxDir, reqPath);
    const onError = (_err: unknown) => {
      if (res.headersSent) return;
      res.status(404).sendFile(path.resolve(sandboxVersionDir, 'index.html'));
    };
    res.set('Content-Type', 'text/html');
    res.status(200).sendFile(filePath, onError);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Sandbox is running on https://${hostname}${port !== 443 ? ':' + port : ''}`);
  });
};
