import type { ProcessorSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const lightningcss: ProcessorSpecs = {
  name: 'lightningcss',
  title: 'Lightning CSS',
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + 'lightningcss/lightningcss.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-lightningcss-compiler.js}}');
      return (self as any).createLightningcssCompiler();
    },
  },
  editor: 'style',
};
