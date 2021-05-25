import { EditorLibrary, Types } from '../models';

const getTypes = async (type: { [key: string]: string }): Promise<EditorLibrary> => {
  let content = '';
  const name = Object.keys(type)[0];
  const url = Object.values(type)[0];
  if (url) {
    try {
      const res = await fetch(url);
      content = await res.text();
    } catch {
      content = `declare module '${name}': any`;
    }
  }
  return {
    filename: `file:///node_modules/${name}/index.d.ts`,
    content,
  };
};

export const loadTypes = (types: Types) =>
  Promise.all(Object.keys(types).map((t) => getTypes({ [t]: types[t] })));
