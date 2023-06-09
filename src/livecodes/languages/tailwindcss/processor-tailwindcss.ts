import type { ProcessorSpecs } from '../../models';
import { tailwindcssUrl } from '../../vendors';

export const tailwindcss: ProcessorSpecs = {
  name: 'tailwindcss',
  title: 'Tailwind CSS',
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: tailwindcssUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-tailwindcss-compiler.js}}');
      return (self as any).createTailwindcssCompiler();
    },
  },
  editor: 'style',
};
