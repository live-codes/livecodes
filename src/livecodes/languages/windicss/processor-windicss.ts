import type { ProcessorSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const windicss: ProcessorSpecs = {
  name: 'windicss',
  title: 'Windi CSS',
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + 'windicss/windicss.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-windicss-compiler.js}}');
      return (self as any).createWindicssCompiler();
    },
  },
  editor: 'style',
};
