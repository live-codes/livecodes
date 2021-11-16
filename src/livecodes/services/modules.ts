export const modulesService = {
  getModuleUrl: (moduleName: string, isModule = true) => {
    if (moduleName.startsWith('jsdelivr:')) {
      return 'https://cdn.jsdelivr.net/npm/' + moduleName.replace('jsdelivr:', '');
    }
    if (moduleName.startsWith('esm.run:')) {
      return 'https://esm.run/' + moduleName.replace('esm.run:', '');
    }
    if (moduleName.startsWith('esm.sh:')) {
      return 'https://esm.sh/' + moduleName.replace('esm.sh:', '');
    }
    if (moduleName.startsWith('bundle.run:')) {
      return 'https://bundle.run/' + moduleName.replace('bundle.run:', '');
    }
    if (moduleName.startsWith('unpkg:')) {
      return 'https://unpkg.com/' + moduleName.replace('unpkg:', '') + (isModule ? '?module' : '');
    }
    if (moduleName.startsWith('skypack:')) {
      return 'https://cdn.skypack.dev/' + moduleName.replace('skypack:', '');
    }
    // default
    return isModule
      ? 'https://cdn.skypack.dev/' + moduleName
      : 'https://cdn.jsdelivr.net/npm/' + moduleName;
  },

  getModuleInfoUrl: (moduleName: string) => `https://api.npms.io/v2/search?q=${moduleName}&size=30`,
};
