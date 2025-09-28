/* eslint-disable import/order */
import type express from 'express';
import { customAlphabet } from 'nanoid';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Context, PgFunction } from '../../functions/utils.ts';

const getDirname = (metaUrl: string) => path.dirname(fileURLToPath(metaUrl));
export const dirname = getDirname(import.meta.url);
export const appDir = path.resolve(dirname, '../../build/');

const getFileContent = (fullUrl: string): Promise<string> => {
  let pathname: string;
  try {
    const url = new URL(fullUrl);
    pathname = url.pathname.split('/').filter(Boolean).join('/');
  } catch {
    pathname = fullUrl;
  }
  if (!pathname.trim()) {
    pathname = 'index.html';
  }
  let filePath = path.resolve(appDir, pathname);
  return fs.promises
    .readFile(filePath, 'utf8')
    .catch(() => fs.promises.readFile(path.resolve(appDir, '404.html'), 'utf8'));
};

const convertToWebRequest = (req: express.Request) => {
  const url = `https://${req.host}${req.originalUrl}`;
  const method = req.method;
  const headers = new Headers();

  for (const key of Object.keys(req.headers)) {
    let value = req.headers[key];
    if (value == null) continue;
    if (Array.isArray(value)) {
      value = value.join(', ');
    }
    headers.set(key, value);
  }

  let body = req.body;
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  return new Request(url, {
    method,
    headers,
    body,
  });
};

const mockCloudflareContext = (request: Request): Context => ({
  request,
  env: {
    ASSETS: {
      fetch: async (input: Request | URL | string) => {
        const url = typeof input === 'string' ? input : 'href' in input ? input.href : input.url;
        const content = await getFileContent(url);
        return new Response(content);
      },
    },
    API_TOKEN: '',
    ...process.env,
  },
  data: {},
  waitUntil: async (_promise: Promise<any>) => undefined,
  next: async () => new Response(),
  params: { id: '' },
});

const getWebResponse = async (fn: PgFunction, req: express.Request) => {
  const request = convertToWebRequest(req);
  const context = mockCloudflareContext(request);
  const response = await fn(context);
  return response;
};

const sendExpressResponse = async (res: express.Response, response: Response) => {
  const content = await response.text();
  for (const [key, value] of response.headers.entries()) {
    if (res.get(key)) continue;
    res.set(key, value);
  }
  res.status(response.status).send(content);
};

export const handleRequest = async (
  fn: PgFunction,
  req: express.Request,
  res: express.Response,
) => {
  const response = await getWebResponse(fn, req);
  sendExpressResponse(res, response);
};

export const generateId = (length = 11) => {
  const alphabet = '23456789abcdefghijkmnpqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};
