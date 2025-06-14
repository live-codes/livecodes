/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { onRequest as index } from '../functions/index.ts';
import { onRequest as oembed } from '../functions/oembed.ts';
import { getDirname, handleRequest } from './utils.ts';

const dirname = getDirname(import.meta.url);
const app = express();
const hostname = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 8080;

app.use(cors());
app.disable('x-powered-by');

app.use('/oembed', async (req, res) => {
  handleRequest(oembed, req, res);
});

app.use('/', (req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    res.set('Content-Type', 'text/html');
    handleRequest(index, req, res);
    return;
  }
  next();
});

app.use(
  express.static(path.resolve(dirname, '../build/'), {
    setHeaders(res) {
      // match headers in: src/_headers
      const reqPath = res.req.path;
      if (reqPath.startsWith('/assets/')) {
        res.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
      }
      if (reqPath.startsWith('/livecodes/')) {
        if (reqPath.startsWith('/livecodes/assets/') || reqPath.endsWith('.map')) {
          res.set('Cache-Control', 'public, max-age=14400, must-revalidate');
        } else {
          res.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
        }
      }
    },
  }),
);

app.use((req, res) => {
  const file404 = req.path.startsWith('/docs/') ? 'docs/404.html' : '404.html';
  res.status(404).sendFile(path.resolve(dirname, '../build/', file404));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on https://${hostname}${port !== '443' ? ':' + port : ''}`);
});
