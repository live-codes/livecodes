import { EditorLibrary, Module } from './models';

const getTypes = async (module: Module): Promise<EditorLibrary> => {
  let content = '';
  if (module.typesUrl) {
    try {
      const res = await fetch(module.typesUrl);
      content = await res.text();
    } catch {
      // error
    }
  }
  return {
    filename: `file:///node_modules/${module.name}/index.d.ts`,
    content,
  };
};

export const loadTypes = (modules: Module[]) => Promise.all(modules.map(getTypes));
