/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 9000;

app.use(cors());

app.use('/oembed', (req, res) => {
  res.send('Hello World!');
});

app.use('/', (req, res, next) => {
  next();
});

app.use(
  express.static(path.resolve(__dirname, '../build/'), {
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
  res.status(404).sendFile(path.resolve(__dirname, '../build/', file404));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
