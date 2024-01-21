/* eslint-disable import/no-internal-modules */
import type { EditorLibrary, Types } from '../models';
import { getImports, hasUrlImportsOrExports } from '../compiler/import-map';
import { typesService } from '../services/types';
import { objectFilter, removeDuplicates, safeName } from '../utils/utils';

export const createTypeLoader = (baseUrl: string) => {
  let loadedTypes: Types = {};

  const getTypeContents = async (type: Types): Promise<EditorLibrary> => {
    let content = '';
    const name = Object.keys(type)[0];
    const value = Object.values(type)[0];
    const url = typeof value === 'string' ? value : value.url;

    if (url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed fetching: ' + url);
        let dts = await res.text();

        if (hasUrlImportsOrExports(dts)) {
          const dtsBundleModule: typeof import('./bundle-types') = await import(
            baseUrl + '{{hash:bundle-types.js}}'
          );
          dts = await dtsBundleModule.bundle({ name, main: url });
        }

        const declareAsModule =
          !dts.includes('declare module') ||
          (typeof value !== 'string' && value.declareAsModule === true);
        const declareAsGlobal = typeof value !== 'string' && value.declareAsGlobal === true;

        content = declareAsModule && !declareAsGlobal ? `declare module '${name}' {${dts}}` : dts;
      } catch {
        content = `declare module '${name}': any`;
      }
    }
    // remove empty entries
    const prevTypes = Object.keys(loadedTypes)
      .filter((k) => loadedTypes[k] !== '')
      .reduce(
        (acc, k) => ({
          ...acc,
          [k]: loadedTypes[k],
        }),
        {},
      );
    loadedTypes = { ...prevTypes, ...type };
    return {
      filename: `file:///node_modules/${safeName(name)}/index.d.ts`,
      content,
    };
  };

  const loadTypes = (types: Types) =>
    Promise.all(
      removeDuplicates(Object.keys(types)).map((t) => getTypeContents({ [t]: types[t] })),
    );

  const load = async (code: string, configTypes: Types, forceLoad = false) => {
    const imports = getImports(code);

    const codeTypes: Types = imports.reduce((accTypes, lib) => {
      let currentType: Types;
      const loaded =
        Object.keys(loadedTypes).find((t) => lib === t) ||
        (Object.keys(loadedTypes).find((t) => lib.startsWith(t + '/')) &&
          !Object.keys(configTypes).find((t) => lib === t));
      const fromConfig =
        Object.keys(configTypes).find((t) => lib === t) ||
        Object.keys(configTypes).find((t) => lib.startsWith(t + '/'));
      if (loaded && !forceLoad) {
        currentType = {};
      } else if (fromConfig) {
        currentType = { [fromConfig]: configTypes[fromConfig] };
      } else {
        currentType = { [lib]: '' };
      }
      return {
        ...accTypes,
        ...currentType,
      };
    }, {} as Types);

    const typesToGet = Object.keys(codeTypes).filter((key) => codeTypes[key] === '');

    // mark as loaded to avoid re-fetching
    loadedTypes = {
      ...loadedTypes,
      ...typesToGet.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {}),
    };

    const fetchedTypes = await typesService.getTypeUrls(typesToGet);

    const autoloadTypes: Types = objectFilter(
      configTypes,
      (value, key) =>
        (!Object.keys(loadedTypes).includes(key) || forceLoad) &&
        typeof value !== 'string' &&
        value.autoload === true,
    );

    return loadTypes({ ...codeTypes, ...fetchedTypes, ...autoloadTypes });
  };

  return {
    load,
  };
};
