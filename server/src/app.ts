/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { onRequest as index } from '../../functions/index.ts';
import { onRequest as oembed } from '../../functions/oembed.ts';
import { broadcast } from './broadcast/index.ts';
import { corsProxy } from './cors.ts';
import { sandbox } from './sandbox.ts';
import { share } from './share.ts';
import { appDir, handleRequest } from './utils.ts';

export const app = express();
const hostname = process.env.HOST_NAME || 'localhost';
const port = Number(process.env.PORT) || 443;
const appUrl = `https://${hostname}${port !== 443 ? ':' + port : ''}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use('/oembed', async (req, res) => {
  handleRequest(oembed, req, res);
});
app.use('/api/cors', corsProxy);
app.use('/api/share', share);

app.use('/', (req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    res.set('Content-Type', 'text/html');
    handleRequest(index, req, res);
    return;
  }
  next();
});

app.use(
  express.static(appDir, {
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
  res.status(404).sendFile(path.resolve(appDir, file404));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on ${appUrl}`);
});

// sandbox - needs to be on a different origin
sandbox({
  hostname: process.env.SANDBOX_HOST_NAME || 'localhost',
  port: Number(process.env.SANDBOX_PORT) || 8090,
});

// broadcast
if (process.env.SELF_HOSTED_BROADCAST === 'true') {
  broadcast({
    hostname,
    port: Number(process.env.BROADCAST_PORT) || 3030,
    appUrl,
    userTokens: process.env.BROADCAST_TOKENS || '',
  });
}
