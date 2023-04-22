import { ProcessorSpecs } from '../models';
import { lightningcss } from './lightningcss';
import {
  postcss,
  autoprefixer,
  postcssPresetEnv,
  tailwindcss,
  postcssImportUrl,
  tokencss,
  purgecss,
  cssnano,
  cssModules,
} from './postcss';
import { unocss } from './unocss';
import { windicss } from './windicss';

export const processors: ProcessorSpecs[] = [
  ...[
    tailwindcss,
    windicss,
    unocss,
    tokencss,
    cssModules,
    purgecss,
    postcssImportUrl,
    autoprefixer,
    postcssPresetEnv,
    lightningcss,
    cssnano,
  ],
  // keep postcss as last processor
  postcss,
];
