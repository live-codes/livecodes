export const modulesService = {
  getModuleUrl: (moduleName: string) => {
    if (moduleName.startsWith('jsdelivr:')) {
      return (
        'https://cdn.jsdelivr.net/npm/' + encodeURIComponent(moduleName.replace('jsdelivr:', ''))
      );
    }
    if (moduleName.startsWith('esm.run:')) {
      return 'https://esm.run/' + encodeURIComponent(moduleName.replace('esm.run:', ''));
    }
    if (moduleName.startsWith('esm.sh:')) {
      return 'https://esm.sh/' + encodeURIComponent(moduleName.replace('esm.sh:', ''));
    }
    if (moduleName.startsWith('unpkg:')) {
      return (
        'https://unpkg.com/' + encodeURIComponent(moduleName.replace('unpkg:', '')) + '?module'
      );
    }
    if (moduleName.startsWith('skypack:')) {
      return 'https://cdn.skypack.dev/' + encodeURIComponent(moduleName.replace('skypack:', ''));
    }
    // default
    return 'https://cdn.skypack.dev/' + encodeURIComponent(moduleName);
  },

  getModuleInfoUrl: (moduleName: string) =>
    `https://api.npms.io/v2/search?q=${encodeURIComponent(moduleName)}&size=30`,
};
