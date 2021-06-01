import { getImports } from '../compiler';
import { EditorLibrary, Types, TypeValue } from '../models';
import { objectFilter } from '../utils';

export const createTypeLoader = () => {
  let loadedTypes: Types = {};

  const getTypeContents = async (type: Types): Promise<EditorLibrary> => {
    let content = '';
    const name = Object.keys(type)[0];
    const value = Object.values(type)[0];
    const url = typeof value === 'string' ? value : value.url;
    const declareAsModule = typeof value === 'string' || value.declareAsModule === true;
    if (url) {
      try {
        const res = await fetch(url);
        const dts = await res.text();
        content = declareAsModule ? `declare module '${name}' {${dts}}` : dts;
      } catch {
        content = `declare module '${name}': any`;
      }
    }
    loadedTypes = { ...loadedTypes, ...type };
    return {
      filename: `file:///node_modules/${name}/index.d.ts`,
      content,
    };
  };

  const loadTypes = (types: Types) =>
    Promise.all(Object.keys(types).map((t) => getTypeContents({ [t]: types[t] })));

  const load = async (code: string, configTypes: Types) => {
    const imports = getImports(code);
    const libs: string[] = [];

    const codeTypes: Types = imports.reduce((accTypes, lib) => {
      let currentType: Types;
      const loaded = Object.keys(loadedTypes).find((t) => lib === t || lib.startsWith(t + '/'));
      const fromConfig = Object.keys(configTypes).find((t) => lib === t || lib.startsWith(t + '/'));
      if (loaded) {
        currentType = {};
      } else if (fromConfig) {
        currentType = { [fromConfig]: configTypes[fromConfig] };
      } else {
        libs.push(lib);
        currentType = { [lib]: '' };
      }
      return {
        ...accTypes,
        ...currentType,
      };
    }, {} as Types);

    const typesToGet = Object.keys(codeTypes).filter((key) => codeTypes[key] === '');
    let fetchedTypes: Types = {};
    if (typesToGet.length > 0) {
      try {
        const api = 'https://api.localpen.io/types';
        const res = await fetch(api, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ types: typesToGet }),
        });
        fetchedTypes = await res.json();
      } catch {
        //
      }
    }

    const autoloadTypes: Types = objectFilter(
      configTypes,
      (value: TypeValue, key: string) =>
        !Object.keys(loadedTypes).includes(key) &&
        typeof value !== 'string' &&
        value.autoload === true,
    );

    const typeContents = await loadTypes({ ...codeTypes, ...fetchedTypes, ...autoloadTypes });
    return typeContents;
  };

  return {
    load,
  };
};
