import { Processors } from '../models';

export const postProcessors: Processors[] = [
  {
    name: 'autoprefixer',
    compiler: {
      url: 'vendor/autoprefixer/autoprefixer.js',
      factory: () => {
        const { postcss, autoprefixer } = (window as any).autoprefixer;
        const postcss1 = postcss([autoprefixer({ overrideBrowserslist: ['last 4 version'] })]);
        return postcss1.process.bind(postcss1);
      },
      umd: true,
    },
    editors: ['style'],
  },
];
