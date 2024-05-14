/* eslint-disable import/no-internal-modules */
import type TS from 'typescript';

import type { EditorLibrary, Types } from '../models';
import { getImports, hasUrlImportsOrExports } from '../compiler/import-map';
import { typesService } from '../services/types';
import { loadScript, objectFilter, safeName } from '../utils/utils';
import { typescriptAtaUrl, typescriptUrl } from '../vendors';

export const createTypeLoader = (baseUrl: string) => {
  let ts: typeof TS;
  let ata: any;
  let loadedTypes: Types = {};
  const libs: EditorLibrary[] = [];

  const getTypeContents = async (type: Types): Promise<EditorLibrary> => {
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
      filename: `/node_modules/${safeName(name)}/index.d.ts`,
      content,
    };
    libs.push(lib);
    return lib;
  };

  const getTypesFromAta = async (code: string) =>
    new Promise<EditorLibrary[]>(async (resolve) => {
      if (!code?.trim()) {
        resolve([]);
        return;
      }
      ts = ts || ((await loadScript(typescriptUrl, 'ts')) as typeof TS);
      const ataModule = await import(typescriptAtaUrl);
      const { setupTypeAcquisition } = ataModule;
      const ataTypes: EditorLibrary[] = [];
      ata =
        ata ||
        setupTypeAcquisition({
          projectName: 'Playground',
          typescript: ts,
          logger: {
            log: () => undefined,
            error: () => undefined,
            groupCollapsed: () => undefined,
            groupEnd: () => undefined,
          },
          delegate: {
            receivedFile: (code: string, path: string) => {
              ataTypes.push({ content: code, filename: path });
            },
            progress: (_downloaded: number, _total: number) => {
              // console.log({ _downloaded, _total })
            },
            started: () => {
              // console.log("ATA start")
            },
            finished: (_files: Map<string, string>) => {
              libs.push(...ataTypes);
              resolve(ataTypes);
            },
          },
        });
      ata(code);
    });

  const loadTypes = async (types: Types) => {
    const typesWithUrls = objectFilter(types, (value) => value !== '');
    const typesWithoutUrls = objectFilter(types, (value) => value === '');
    return [
      ...(await Promise.all(
        Object.keys(typesWithUrls).map((t) => getTypeContents({ [t]: typesWithUrls[t] })),
      )),
      ...(await getTypesFromAta(typesService.getTypesAsImports(Object.keys(typesWithoutUrls)))),
    ];
  };

  const load = async (code: string, configTypes: Types, loadAll = false, forceLoad = false) => {
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

    const fetchedTypes = typesToGet.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});

    const autoloadTypes: Types = objectFilter(
      configTypes,
      (value, key) =>
        (!Object.keys(loadedTypes).includes(key) || forceLoad) &&
        typeof value !== 'string' &&
        value.autoload === true,
    );

    const newLibs = await loadTypes({ ...codeTypes, ...fetchedTypes, ...autoloadTypes });

    return loadAll ? libs : newLibs;
  };

  return {
    load,
  };
};
