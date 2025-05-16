import { compressToEncodedURIComponent } from 'lz-string';
import { getPlaygroundUrl } from '../index';
import type { Config, UrlQueryParams } from '../models';

test('empty options object', () => {
  const url = new URL(getPlaygroundUrl());
  const searchParams = url.search;
  expect(searchParams.toString()).toBe('');

  const hashParams = url.hash;
  expect(hashParams).toBe('');
});

test('passing some params, they should be stored in hash params', () => {
  const params = {
    param1: 1,
    param2: 2,
  };
  const url = new URL(getPlaygroundUrl({ params: params as UrlQueryParams }));
  const searchParams = url.searchParams;
  const receivedParams = searchParams.get('params');
  expect(receivedParams).toBeNull();

  const hashParams = new URLSearchParams(url.hash.slice(1));
  expect(hashParams).not.toBeNull();
  expect(hashParams.get('params')).toBe(compressToEncodedURIComponent(JSON.stringify(params)));
});

test('appUrl', () => {
  const url = getPlaygroundUrl({ appUrl: 'https://example.com' });
  expect(url).toBe(new URL(url).href);
});

test('headless and appUrl', () => {
  const appUrl = 'https://example.com';
  const url = getPlaygroundUrl({ appUrl, headless: true });
  expect(url).toMatch(`${new URL(appUrl).href}`);
  expect(new URL(url).searchParams.get('headless')).toBe('true');
});

test('template', () => {
  const url = getPlaygroundUrl({
    template: 'react',
  });
  expect(new URL(url).searchParams.get('template')).toBe('react');
});

test('empty config object should return appUrl', () => {
  const appUrl = 'https://example.com';
  const url = new URL(
    getPlaygroundUrl({
      appUrl,
      config: {},
    }),
  );
  expect(url.href).toMatch(`${new URL(appUrl).href}`);
  const hashParams = url.hash;
  expect(hashParams).toBe('');
});

test('non-empty config object stores compressed config in config hashParam', () => {
  const config: Partial<Config> = {
    view: 'split',
  };
  const appUrl = 'https://example.com';
  const url = new URL(
    getPlaygroundUrl({
      appUrl,
      config,
    }),
  );
  expect(url.href).toMatch(`${new URL(appUrl).href}`);
  const hashParams = url.hash;
  expect(hashParams).not.toBe('');
  expect(new URLSearchParams(hashParams.slice(1)).get('config')).toBe(
    'code/' + compressToEncodedURIComponent(JSON.stringify(config)),
  );
});

test('deprecated options like lite and view update the config object stored in hash', () => {
  const url = new URL(getPlaygroundUrl({ lite: true, view: 'result' }));
  const searchParams = url.searchParams;
  expect(searchParams.get('lite')).toBeNull();
  expect(searchParams.get('view')).toBeNull();

  const hashParams = new URLSearchParams(url.hash.slice(1));
  expect(hashParams.get('config')).toBe(
    'code/' + compressToEncodedURIComponent(JSON.stringify({ mode: 'lite', view: 'result' })),
  );
});
