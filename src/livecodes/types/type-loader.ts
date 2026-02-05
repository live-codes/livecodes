import { getImports, hasUrlImportsOrExports } from '../compiler/import-map';
import type { EditorLibrary, Types } from '../models';
import { typesService } from '../services/types';
import { objectFilter } from '../utils/utils';

export const createTypeLoader = (baseUrl: string) => {
  let loadedTypes: Types = {};
  const libs: EditorLibrary[] = [];

  /**
   * Retrieves the contents of a type from a provided URL.
   * If other types are imported, they are fetched and bundled.
   *
   * @param {Types} type - The type to retrieve the content for.
   * @param {((type: EditorLibrary) => void) | undefined} callback - An optional callback function to handle the retrieved content.
   * @return {Promise<EditorLibrary>} A promise that resolves with the EditorLibrary object containing the content of the type.
   */
  const getTypeContents = async (
    type: Types,
    callback: ((type: EditorLibrary) => void) | undefined,
  ): Promise<EditorLibrary> => {
    let content = '';
    const name = Object.keys(type)[0];
    const value = Object.values(type)[0];
    const url = typeof value === 'string' ? value : value.url;
    if (loadedTypes[name]) {
      return { filename: '', content: '' };
    }
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
          typeof value !== 'string' && value.declareAsModule === false
            ? false
            : !dts.includes('declare module') ||
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
    if (content.trim() === '') {
      loadedTypes = prevTypes;
      return { filename: '', content: '' };
    }
    loadedTypes = { ...prevTypes, ...type };
    const lib = {
      filename: `/node_modules/${name}/index.d.ts`,
      content,
    };
    if (typeof callback === 'function') {
      callback(lib);
    }
    libs.push(lib);
    return lib;
  };

  /**
   * Retrieves types from TypeScript Automatic Type Acquisition (ATA) module,
   * which fetches types from jsDelivr.
   * The ATA module runs in the compiler worker to re-use the TypeScript compiler.
   *
   * @param {string} code - The code to retrieve types from.
   * @param {((type: EditorLibrary) => void) | undefined} callback - An optional callback function to handle the retrieved types.
   * @return {Promise<EditorLibrary[]>} A promise that resolves with an array of EditorLibrary objects.
   */
  const getTypesFromAta = async (
    code: string,
    callback: ((type: EditorLibrary) => void) | undefined,
  ): Promise<EditorLibrary[]> => {
    if (!code?.trim()) {
      return [];
    }
    const types: EditorLibrary[] =
      (await (window as any).compiler?.typescriptFeatures?.({
        feature: 'ata',
        payload: code,
      })) ?? [];
    libs.push(...types);
    if (typeof callback === 'function') {
      types.forEach((type) => {
        callback(type);
      });
    }
    return types;
  };

  const loadTypes = async (types: Types, callback: ((type: EditorLibrary) => void) | undefined) => {
    const typesWithUrls = objectFilter(types, (value) => value !== '');
    const typesWithoutUrls = objectFilter(types, (value) => value === '');
    return [
      ...(await Promise.all(
        Object.keys(typesWithUrls).map((t) => getTypeContents({ [t]: typesWithUrls[t] }, callback)),
      )),
      ...(await getTypesFromAta(
        typesService.getTypesAsImports(Object.keys(typesWithoutUrls)),
        callback,
      )),
    ];
  };

  let isRunning = false;

  const load = async (
    code: string,
    configTypes: Types,
    loadAll = false,
    forceLoad = false,
    callback?: (type: EditorLibrary) => void,
  ) => {
    if (isRunning) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return load(code, configTypes, loadAll, forceLoad, callback);
    }
    isRunning = true;

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

    const typesToGet = Object.keys(codeTypes).filter(
      (key) => codeTypes[key] === '' && !loadedTypes[key],
    );

    // mark as loaded to avoid re-fetching
    loadedTypes = {
      ...loadedTypes,
      ...typesToGet.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {}),
    };

    const fetchedTypes = typesToGet.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
    // const fetchedTypes = await typesService.getTypeUrls(typesToGet);

    const autoloadTypes: Types = objectFilter(
      configTypes,
      (value, key) =>
        (!Object.keys(loadedTypes).includes(key) || forceLoad) &&
        typeof value !== 'string' &&
        value.autoload === true,
    );

    const newLibs = await loadTypes({ ...codeTypes, ...fetchedTypes, ...autoloadTypes }, callback);

    isRunning = false;
    return loadAll ? libs : newLibs;
  };

  return {
    load,
  };
};
