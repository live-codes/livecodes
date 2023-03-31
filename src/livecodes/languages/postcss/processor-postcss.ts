import type { ProcessorSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const postcss: ProcessorSpecs = {
  name: 'postcss',
  title: 'Processors:',
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + 'postcss/postcss.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-postcss-compiler.js}}');
      return (self as any).createPostcssCompiler();
    },
  },
  editor: 'style',
  hidden: true,
};
