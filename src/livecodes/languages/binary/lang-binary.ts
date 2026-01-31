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
        if (['mp4', 'mpeg', 'webm', 'ogg'].includes(extension)) type = 'video';
        if (['midi', 'wav'].includes(extension)) type = 'audio';
        if (extension === 'ogv') return 'video/ogg';
        if (extension === 'mov') return 'video/quicktime';
        if (extension === 'oga') return 'audio/ogg';
        if (extension === 'mp3') return 'audio/mpeg';
        if (extension === 'mid') return 'audio/midi';
        if (extension === 'm4a') return 'audio/mp4';
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

    'mp4',
    'mpeg',
    'webm',
    'ogv',
    'ogg',
    'mov',

    'mp3',
    'm4a',
    'wav',
    'oga',
    'mid',
    'midi',
  ],
  editor: '',
  multiFileSupport: true,
};
