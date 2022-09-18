import type { ProcessorSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const unocss: ProcessorSpecs = {
  name: 'unocss',
  title: 'UnoCSS',
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + 'unocss/unocss.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-unocss-compiler.js}}');
      return (self as any).createUnocssCompiler();
    },
  },
  editor: 'style',
};
