import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { getPlaygroundUrl } from '../index';
import type { Config, EmbedOptions, UrlQueryParams } from '../models';

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

test('invalid appUrl throws', () => {
  expect(() => getPlaygroundUrl({ appUrl: 'not a url' })).toThrow('is not a valid URL');
});

test('config as URL string is stored in searchParams', () => {
  const configUrl = 'https://example.com/config.json';
  const url = new URL(getPlaygroundUrl({ config: configUrl }));

  expect(url.searchParams.get('config')).toBe(encodeURIComponent(configUrl));
  // Should NOT be in hash
  const hashParams = new URLSearchParams(url.hash.slice(1));
  expect(hashParams.get('config')).toBeNull();
});

test('config as invalid URL string throws', () => {
  expect(() => getPlaygroundUrl({ config: 'not-a-url' })).toThrow(
    '"config" is not a valid URL or configuration object.',
  );
});

test('config with title adds title to searchParams', () => {
  const config: Partial<Config> = {
    title: 'My Project',
    markup: { language: 'html', content: '<p>hi</p>' },
  };
  const url = new URL(getPlaygroundUrl({ config }));

  expect(url.searchParams.get('title')).toBe('My Project');
});

test('config with "Untitled Project" title does NOT add title to searchParams', () => {
  const config: Partial<Config> = {
    title: 'Untitled Project',
    markup: { language: 'html', content: '<p>hi</p>' },
  };
  const url = new URL(getPlaygroundUrl({ config }));

  expect(url.searchParams.get('title')).toBeNull();
});

test('config with description adds description to searchParams', () => {
  const config: Partial<Config> = {
    description: 'A cool project',
    markup: { language: 'html', content: '' },
  };
  const url = new URL(getPlaygroundUrl({ config }));

  expect(url.searchParams.get('description')).toBe('A cool project');
});

test('config with empty description does NOT add description to searchParams', () => {
  const config: Partial<Config> = {
    description: '',
    markup: { language: 'html', content: '<p>hi</p>' },
  };
  const url = new URL(getPlaygroundUrl({ config }));

  expect(url.searchParams.get('description')).toBeNull();
});

test('import option is stored as "x" searchParam', () => {
  const url = new URL(getPlaygroundUrl({ import: 'https://gist.github.com/abc' }));

  expect(url.searchParams.get('x')).toBe(encodeURIComponent('https://gist.github.com/abc'));
});

test('view: "headless" sets headless searchParam', () => {
  const url = new URL(getPlaygroundUrl({ view: 'headless' }));

  expect(url.searchParams.get('headless')).toBe('true');
});

test('default appUrl is https://livecodes.io', () => {
  const url = new URL(getPlaygroundUrl());

  expect(url.origin).toBe('https://livecodes.io');
});

test('appUrl with trailing path is preserved', () => {
  const url = new URL(getPlaygroundUrl({ appUrl: 'https://example.com/playground/' }));

  expect(url.pathname).toBe('/playground/');
});

test('lite option with config as string falls back to searchParam', () => {
  const url = new URL(getPlaygroundUrl({ lite: true, config: 'https://example.com/config.json' }));

  // When config is a string, lite can't be merged into config object,
  // so it falls back to searchParam
  expect(url.searchParams.get('lite')).toBe('true');
});

test('view option with config that already has view falls back to searchParam', () => {
  const url = new URL(getPlaygroundUrl({ view: 'editor', config: { view: 'result' } }));

  // config.view is already set, so view falls back to searchParam
  expect(url.searchParams.get('view')).toBe('editor');
});

test('lite does not override existing config.mode', () => {
  const config: Partial<Config> = { mode: 'full' };
  const url = new URL(getPlaygroundUrl({ lite: true, config }));

  // config already has mode set, so lite falls back to searchParam
  expect(url.searchParams.get('lite')).toBe('true');

  // config.mode should remain 'full' in the hash-stored config
  const hashParams = new URLSearchParams(url.hash.slice(1));
  const configParam = hashParams.get('config');
  expect(configParam).toBeTruthy();

  const decompressed = decompressFromEncodedURIComponent(configParam!.replace('code/', ''));
  const storedConfig = JSON.parse(decompressed!);
  expect(storedConfig.mode).toBe('full');
});

test('preserves existing appUrl hash if no hashParams needed', () => {
  const url = getPlaygroundUrl({ appUrl: 'https://example.com/#existing', template: 'react' });
  const parsed = new URL(url);

  // template goes to searchParams, no hashParams needed, so existing hash is preserved
  expect(parsed.hash).toBe('#existing');
  expect(parsed.searchParams.get('template')).toBe('react');
});

test('appUrl existing hash is overridden when hashParams are added', () => {
  const url = getPlaygroundUrl({
    appUrl: 'https://example.com/#existing',
    config: { view: 'split' },
  });
  const parsed = new URL(url);

  // config goes to hashParams, overriding the existing hash
  const hashParams = new URLSearchParams(parsed.hash.slice(1));
  expect(hashParams.get('config')).toBeTruthy();
  expect(parsed.hash).not.toBe('#existing');
});
