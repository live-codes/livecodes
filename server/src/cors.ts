import dns from 'node:dns/promises';
import http from 'node:http';
import https, { type RequestOptions } from 'node:https';
import net from 'node:net';
// prettier-ignore
import type { Request as ExpressRequest,Response as ExpressResponse } from 'express';

const MAX_REDIRECTS = 3;
// total budget for one proxy request, including DNS and every redirect hop
const PROXY_TIMEOUT_MS = 30000;
// the app itself allows imports up to 100 MB, so the proxy must not be stricter
const MAX_RESPONSE_BYTES = 100 * 1024 * 1024;

const blockedRanges: Array<[string, number, 'ipv4' | 'ipv6']> = [
  ['0.0.0.0', 8, 'ipv4'],
  ['10.0.0.0', 8, 'ipv4'],
  ['100.64.0.0', 10, 'ipv4'],
  ['127.0.0.0', 8, 'ipv4'],
  ['169.254.0.0', 16, 'ipv4'],
  ['172.16.0.0', 12, 'ipv4'],
  ['192.0.0.0', 24, 'ipv4'],
  ['192.0.2.0', 24, 'ipv4'],
  ['192.88.99.0', 24, 'ipv4'],
  ['192.168.0.0', 16, 'ipv4'],
  ['198.18.0.0', 15, 'ipv4'],
  ['198.51.100.0', 24, 'ipv4'],
  ['203.0.113.0', 24, 'ipv4'],
  ['224.0.0.0', 4, 'ipv4'],
  ['240.0.0.0', 4, 'ipv4'],
  ['::', 96, 'ipv6'],
  ['64:ff9b::', 96, 'ipv6'],
  ['64:ff9b:1::', 48, 'ipv6'],
  ['100::', 64, 'ipv6'],
  ['2001::', 32, 'ipv6'],
  ['2001:db8::', 32, 'ipv6'],
  ['2002::', 16, 'ipv6'],
  ['fc00::', 7, 'ipv6'],
  ['fec0::', 10, 'ipv6'],
  ['fe80::', 10, 'ipv6'],
  ['ff00::', 8, 'ipv6'],
];

const blockList = new net.BlockList();
for (const [address, prefix, family] of blockedRanges) {
  blockList.addSubnet(address, prefix, family);
}

const isBlockedAddress = (address: string) => {
  const family = net.isIP(address);
  if (family === 4) return blockList.check(address, 'ipv4');
  if (family === 6) return blockList.check(address, 'ipv6');
  return true;
};

interface Target {
  url: URL;
  address: string;
  family: number;
}

const stripBrackets = (hostname: string) => hostname.replace(/^\[|\]$/g, '');

const getTarget = async (rawUrl: string, timeout: number): Promise<Target | null> => {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const hostname = stripBrackets(url.hostname);
  if (!hostname) return null;

  const literalFamily = net.isIP(hostname);
  let addresses: Array<{ address: string; family: number }>;
  if (literalFamily) {
    addresses = [{ address: hostname, family: literalFamily }];
  } else {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      // resolution must stay within the remaining budget of the request
      addresses = await Promise.race([
        dns.lookup(hostname, { all: true, verbatim: true }),
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => reject(proxyError('timeout')), timeout);
        }),
      ]);
    } catch (error) {
      // surface a timeout so the handler can answer 504 instead of 400
      if ((error as { code?: string })?.code === 'timeout') throw error;
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  if (addresses.length === 0) return null;
  if (addresses.some(({ address }) => isBlockedAddress(address))) return null;

  const chosen = addresses.find(({ family }) => family === 4) ?? addresses[0];
  return { url, address: chosen.address, family: chosen.family };
};

interface ProxyResponse {
  status: number;
  statusText: string;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
}

const proxyError = (code: 'too-large' | 'timeout') => Object.assign(new Error(code), { code });

const requestUrl = (
  target: Target,
  method: string,
  body: string | null,
  contentType: string,
  timeout: number,
): Promise<ProxyResponse> =>
  new Promise((resolve, reject) => {
    const { url, address, family } = target;
    const headers: Record<string, string | number> = {};
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    if (body !== null) {
      headers['Content-Length'] = Buffer.byteLength(body);
    }
    const options: RequestOptions = {
      method,
      headers,
      lookup: (_hostname, lookupOptions, callback) => {
        if ((lookupOptions as { all?: boolean }).all) {
          (callback as any)(null, [{ address, family }]);
        } else {
          callback(null, address, family);
        }
      },
    };
    const transport = url.protocol === 'https:' ? https : http;
    const req = transport.request(url, options, (res) => {
      const chunks: Buffer[] = [];
      let received = 0;
      let settled = false;
      const fail = (error: Error) => {
        if (settled) return;
        settled = true;
        req.destroy();
        reject(error);
      };
      res.on('data', (chunk: Buffer) => {
        received += chunk.length;
        if (received > MAX_RESPONSE_BYTES) {
          fail(proxyError('too-large'));
          return;
        }
        chunks.push(chunk);
      });
      res.on('error', fail);
      res.on('end', () => {
        if (settled) return;
        settled = true;
        resolve({
          status: res.statusCode ?? 0,
          statusText: res.statusMessage ?? '',
          headers: res.headers,
          body: Buffer.concat(chunks),
        });
      });
    });
    // a plain timer is a total deadline; req.setTimeout only guards socket idle
    const timer = setTimeout(() => req.destroy(proxyError('timeout')), timeout);
    req.on('close', () => clearTimeout(timer));
    req.on('error', reject);
    if (body !== null) {
      req.write(body);
    }
    req.end();
  });

const fetchSafely = async (
  rawUrl: string,
  method: string,
  body: string | null,
  contentType: string,
  timeout: number,
): Promise<ProxyResponse | null> => {
  let currentUrl = rawUrl;
  let currentMethod = method;
  let currentBody = body;
  let currentContentType = contentType;
  // one deadline covers DNS resolution and every redirect hop, so a slow
  // resolver or a chain of redirects cannot multiply the total request time
  const deadline = Date.now() + timeout;

  for (let redirects = 0; ; redirects++) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw proxyError('timeout');

    const target = await getTarget(currentUrl, remaining);
    if (!target) return null;

    // resolution may have used up the budget; never start a request without time
    const requestTimeout = deadline - Date.now();
    if (requestTimeout <= 0) throw proxyError('timeout');

    const response = await requestUrl(
      target,
      currentMethod,
      currentBody,
      currentContentType,
      requestTimeout,
    );
    const location = response.headers.location;
    const isRedirect = [301, 302, 303, 307, 308].includes(response.status) && Boolean(location);
    if (!isRedirect) return response;

    if (redirects >= MAX_REDIRECTS) {
      return { status: 502, statusText: 'Too Many Redirects!', headers: {}, body: Buffer.alloc(0) };
    }
    try {
      currentUrl = new URL(String(location), target.url).href;
    } catch {
      return null;
    }
    const switchesToGet =
      response.status === 303 ||
      ((response.status === 301 || response.status === 302) && currentMethod === 'POST');
    if (switchesToGet) {
      currentMethod = 'GET';
      currentBody = null;
      currentContentType = '';
    }
  }
};

const matchesDomain = (host: string, domain: string) =>
  host === domain || host.endsWith('.' + domain);

const isAllowedOrigin = (value: string | undefined) => {
  if (!value) return true; // same-origin fetches do not send an Origin header
  let host: string;
  try {
    host = new URL(value).hostname.toLowerCase();
  } catch {
    return false;
  }
  return (
    matchesDomain(host, (process.env.HOST_NAME || 'localhost').toLowerCase()) ||
    matchesDomain(host, 'livecodes.io') ||
    matchesDomain(host, 'livecodes.pages.dev') ||
    matchesDomain(host, 'localpen.pages.dev') ||
    matchesDomain(host, 'localhost') ||
    host === '127.0.0.1' ||
    host.endsWith('.test')
  );
};

export const corsProxy = async (req: ExpressRequest, res: ExpressResponse) => {
  const origin = req.get('Origin');

  if (!isAllowedOrigin(origin) || !['GET', 'POST'].includes(req.method)) {
    res.status(403).send('Forbidden!');
    return;
  }

  const url: string = req.body?.url || req.query?.url;
  if (!url) {
    res.status(400).send('Bad Request!');
    return;
  }

  const contentType = req.get('Content-Type') || '';
  let body: string | null = null;
  if (req.method === 'POST') {
    if (contentType === 'application/json') {
      body = JSON.stringify(req.body);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      body = new URLSearchParams(req.body).toString();
    } else {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }
  }

  let response: ProxyResponse | null;
  try {
    response = await fetchSafely(String(url), req.method, body, contentType, PROXY_TIMEOUT_MS);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === 'too-large') {
      res.status(413).send('Payload Too Large!');
      return;
    }
    if (code === 'timeout') {
      res.status(504).send('Gateway Timeout!');
      return;
    }
    // the OS can time out a connect before our deadline fires
    if (code === 'ETIMEDOUT' || code === 'ESOCKETTIMEDOUT') {
      res.status(504).send('Gateway Timeout!');
      return;
    }
    response = null;
  }

  if (!response) {
    res.status(400).type('text/plain').send('Bad Request!');
    return;
  }

  // headers must be set for every proxy response, not just successful ones,
  // because proxied content can never be trusted on this origin
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "sandbox; default-src 'none'");
  res.setHeader('Content-Disposition', 'attachment');

  if (response.status < 200 || response.status >= 300) {
    // the upstream reason phrase is attacker-controlled, so never echo it
    const status = response.status >= 400 && response.status < 600 ? response.status : 502;
    res.status(status).type('text/plain').send('Upstream request failed.');
    return;
  }

  const responseContentType = response.headers['content-type'];
  if (responseContentType) {
    res.setHeader('Content-Type', responseContentType);
  }
  res.status(200).send(response.body);
};
