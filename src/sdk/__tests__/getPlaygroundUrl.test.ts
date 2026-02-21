import { compressToEncodedURIComponent } from 'lz-string';
import { getPlaygroundUrl, type Config, type EmbedOptions } from '../index';

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
  const url = new URL(getPlaygroundUrl({ params: params as EmbedOptions['params'] }));
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

test('all non-deprecated fields defined', () => {
  const options: EmbedOptions = {
    appUrl: 'https://example.com',
    params: { title: 'example title', description: 'this is a project description' },
    config: {
      tags: ['tag1', 'tag2'],
      markup: {
        language: 'markdown',
        content: '#this is md code',
      },
      activeEditor: 'markup',
    },
    headless: true,
    import: 'id/8k6vbxitvb9',
    loading: 'eager',
    template: 'blank',
  };
  const url = new URL(getPlaygroundUrl(options));

  // Check base URL
  expect(url.href).toMatch(`${new URL(options.appUrl!).href}`);

  // Check search params
  expect(url.searchParams.get('headless')).toBe('true');
  expect(url.searchParams.get('loading')).toBe('eager');
  expect(url.searchParams.get('template')).toBe('blank');
  expect(url.searchParams.get('x')).toBe(encodeURIComponent('id/8k6vbxitvb9'));

  // Check hash params
  const hashParams = new URLSearchParams(url.hash.slice(1));
  expect(hashParams.get('params')).toBe(
    compressToEncodedURIComponent(JSON.stringify(options.params)),
  );
  expect(hashParams.get('config')).toBe(
    'code/' + compressToEncodedURIComponent(JSON.stringify(options.config)),
  );
});
