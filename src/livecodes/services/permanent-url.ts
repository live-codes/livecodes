import { modulesService } from './modules';

type SDKFile =
  | 'esm'
  | 'umd'
  | 'preact'
  | 'react'
  | 'solid'
  | 'svelte'
  | 'vue'
  | 'webComponents'
  | 'types';

const sdkFiles: Record<SDKFile, string> = {
  esm: 'livecodes.js',
  umd: 'livecodes.umd.js',
  preact: 'preact.js',
  react: 'react.js',
  solid: 'solid.js',
  svelte: 'svelte.js',
  vue: 'vue.js',
  webComponents: 'web-components.js',
  types: 'types/index.d.ts',
};

export const permanentUrlService = {
  getAppUrl: () =>
    process.env.SELF_HOSTED === 'true'
      ? `${location.origin}/`
      : `https://v${process.env.VERSION}.livecodes.io/`,
  getSDKUrl: (file: SDKFile = 'esm') =>
    modulesService.getUrl(`livecodes@${process.env.SDK_VERSION}/${sdkFiles[file]}`),
};
