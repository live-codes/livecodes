import type { LanguageSpecs } from '../../models';

export const binary: LanguageSpecs = {
  name: 'binary',
  title: 'Binary',
  info: false,
  compiler: {
    factory: () => {
      const getBinaryMimeType = (extension: string) => {
        let type = 'image';
        if (extension === 'ico') return `${type}/x-icon`;
        if (extension === 'jpg') return `${type}/jpeg`;
        if (extension === 'tif') return `${type}/tiff`;
        if (['ttf', 'otf', 'woff', 'woff2'].includes(extension)) type = 'font';
        return `${type}/${extension}`;
      };

      return async (code, { options: { filename } }) => {
        const extension = filename.split('.').pop() || '';
        return code.startsWith('data:')
          ? code
          : `data:${getBinaryMimeType(extension)};base64,${code}`;
      };
    },
  },
  extensions: [
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'bmp',
    'tif',
    'tiff',
    'ico',
    'ttf',
    'otf',
    'woff',
    'woff2',
  ],
  editor: '',
  multiFileSupport: true,
};
