import type { APIError, CDNService, PkgInfo } from '../models';
import { removeCDNPrefix, removeSpecifier } from './utils';

// see: https://github.com/jsdelivr/www.jsdelivr.com/blob/master/src/public/js/utils/search.js
// info: https://github.com/jsdelivr/data.jsdelivr.com/issues/6

const getSearchApiUrl = (query: string) =>
  `https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/${encodeURIComponent(
    query,
  )}?x-algolia-agent=Browser`;

const algoliaHeaders = {
  'X-Algolia-Application-Id': 'OFCNCOG2CU',
  'X-Algolia-API-Key': 'f54e21fa3a2a0160595bb058179bfb1e',
};
const attributesToRetrieve = ['name', 'description', 'homepage', 'repository.url', 'version'];

const apiEndpoint = 'https://data.jsdelivr.com/v1';

const jsDelivrHeaders = {
  'User-Agent': 'https://livecodes.io',
};

interface APIPkgFiles {
  default: string;
  files: Array<{ name: string }>;
}

interface EntryPoints {
  js?: {
    file: string;
    guessed: boolean;
  };
  css?: {
    file: string;
    guessed: boolean;
  };
}

const splitNameVersion = (nameVersion: string) => {
  const scoped = nameVersion.startsWith('@');
  const str = scoped ? nameVersion.slice(1) : nameVersion;
  const [name, version] = str.split('@');
  return [(scoped ? '@' : '') + name, version];
};

const search = async (query: string, limit = 10): Promise<PkgInfo[] | APIError> => {
  const options = {
    page: 0,
    hitsPerPage: limit,
    attributesToHighlight: [],
    attributesToRetrieve,
    analyticsTags: ['jsdelivr'],
  };

  const [name, version] = splitNameVersion(query);
  let exactVersion: string | undefined;
  if (version) {
    const versioned = await addPkgVersion(query);
    if (typeof versioned === 'string') {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }

  const data: { hits: PkgInfo[] } | APIError = await fetch(getSearchApiUrl('query'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      ...algoliaHeaders,
    },
    body: JSON.stringify({
      query: name,
      ...options,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('failed to fetch');
      return res;
    })
    .then((res) => res.json())
    .catch((err) => ({
      error: true,
      message: err.mesage || String(err),
    }));

  if ('error' in data) {
    return data;
  }

  const results: PkgInfo[] = data.hits.map((pkg) => {
    if (pkg.name === name && exactVersion) {
      pkg.version = exactVersion;
    }
    if (pkg.repository?.url) {
      pkg.repo = pkg.repository?.url;
    }
    return pkg;
  });
  // An exact match should always come first.
  results.sort((a, b) => (a.name === name ? -1 : b.name === name ? 1 : 0));

  return results;
};

const addPkgVersion = async (pkgName: string): Promise<string | APIError> => {
  const url = `${apiEndpoint}/package/resolve/npm/${pkgName}`;
  const data: PkgInfo | APIError = await fetch(url, { headers: jsDelivrHeaders })
    .then((res) => {
      if (!res.ok) throw new Error('failed to fetch');
      return res;
    })
    .then((res) => res.json())
    .catch((err) => ({
      error: true,
      message: err.mesage || String(err),
    }));

  if ('error' in data) {
    return data;
  }
  const name = splitNameVersion(pkgName)[0];
  const version = data.version;
  return version ? `${name}@${version}` : name;
};

const getPkgInfo = async (pkgName: string): Promise<PkgInfo | APIError> => {
  const [name, version] = splitNameVersion(removeSpecifier(removeCDNPrefix(pkgName)));

  let exactVersion: string | undefined;
  if (version) {
    const versioned = await addPkgVersion(pkgName);
    if (typeof versioned === 'string') {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }

  const url = getSearchApiUrl(name) + '&attributesToRetrieve=' + attributesToRetrieve.join(',');
  const data: PkgInfo | APIError = await fetch(url, {
    method: 'GET',
    headers: algoliaHeaders,
  })
    .then((res) => {
      if (!res.ok) throw new Error('failed to fetch');
      return res;
    })
    .then((res) => res.json())
    .catch((err) => ({
      error: true,
      message: err.mesage || String(err),
    }));

  if ('error' in data) {
    return data;
  }

  if (exactVersion) {
    data.version = exactVersion;
  }
  if (data.repository?.url) {
    data.repo = data.repository?.url;
  }

  return data;
};

const getPkgFiles = async (
  pkgName: string,
): Promise<{ default?: string; files: string[] } | APIError> => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/flat`;
  const data: APIPkgFiles | APIError = await fetch(url, { headers: jsDelivrHeaders })
    .then((res) => {
      if (!res.ok) throw new Error('failed to fetch');
      return res;
    })
    .then((res) => res.json())
    .catch((err) => ({
      error: true,
      message: err.mesage || String(err),
    }));

  if ('error' in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...(data.default ? { default: basePath + data.default } : {}),
    files: data.files.map((f: { name: string }) => basePath + f.name),
  };
};

const getPkgDefaultFiles = async (
  pkgName: string,
): Promise<{ js?: string; css?: string } | APIError> => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/entrypoints`;
  const data: EntryPoints | APIError = await fetch(url, { headers: jsDelivrHeaders })
    .then((res) => {
      if (!res.ok) throw new Error('failed to fetch');
      return res;
    })
    .then((res) => res.json())
    .catch((err) => ({
      error: true,
      message: err.mesage || String(err),
    }));

  if ('error' in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...(data.js?.file ? { js: basePath + data.js?.file } : {}),
    ...(data.css?.file ? { css: basePath + data.css?.file } : {}),
  };
};

export const pkgInfoService: CDNService = {
  search,
  getPkgInfo,
  getPkgFiles,
  getPkgDefaultFiles,
};
