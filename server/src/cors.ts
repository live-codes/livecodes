import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const corsProxy = (req: ExpressRequest, res: ExpressResponse) => {
  const origin = req.get('Origin');
  const hostname = process.env.HOST_NAME || 'localhost';

  if ((origin && !origin.includes(hostname)) || !['GET', 'POST'].includes(req.method)) {
    res.status(403).send('Forbidden!');
    return;
  }

  const url: string = req.body?.url || req.query?.url;
  if (!url) {
    res.status(400).send('Bad Request!');
    return;
  }

  fetch(url, {
    method: req.method,
    ...(req.method === 'POST'
      ? {
          body:
            req.get('Content-Type') === 'application/json' ? JSON.stringify(req.body) : req.body,
        }
      : {}),
    ...(req.get('Content-Type')
      ? {
          headers: {
            'Content-Type': req.get('Content-Type') || '',
          },
        }
      : {}),
  })
    .then((r) => {
      if (!r.ok) {
        res.status(r.status);
        throw new Error(r.statusText);
      }
      const contentType = r.headers.get('Content-Type') || '';
      res.setHeader('Content-Type', contentType);
      if (contentType === 'application/json') {
        return r.json();
      }
      if (
        ['application/zip', 'application/octet-stream'].includes(contentType) ||
        contentType.startsWith('image/')
      ) {
        return r.arrayBuffer();
      }
      return r.text();
    })
    .then((body) => res.status(200).send(body))
    .catch((statusText) => {
      res.send(statusText);
    });
};
