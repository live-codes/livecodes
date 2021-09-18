export const modulesService = {
  getModuleUrl: (moduleName: string, CDN: 'skypack' | 'jsdelivr' | 'unpkg' = 'skypack') => {
    if (CDN === 'jsdelivr') {
      return 'https://esm.run/' + moduleName;
    }
    if (CDN === 'unpkg') {
      return 'https://unpkg.com/' + moduleName + '?module';
    }
    return 'https://cdn.skypack.dev/' + moduleName;
  },
};
