import { modulesService } from './modules';

type SDKFile = 'esm' | 'umd' | 'react' | 'vue' | 'types';

const sdkFiles: Record<SDKFile, string> = {
  esm: 'livecodes.js',
  umd: 'livecodes.umd.js',
  react: 'react.js',
  vue: 'vue.js',
  types: 'index.d.ts',
};

export const permanentUrlService = {
  getAppUrl: () => `https://v${process.env.VERSION}.livecodes.io/`,
  getSDKUrl: (file: SDKFile = 'esm') =>
    modulesService.getUrl(`livecodes@${process.env.SDK_VERSION}/${sdkFiles[file]}`),
};
