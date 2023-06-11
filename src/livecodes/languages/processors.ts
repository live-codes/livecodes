import type { ProcessorSpecs } from '../models';
import { lightningcss } from './lightningcss';
import {
  postcss,
  autoprefixer,
  postcssPresetEnv,
  postcssImportUrl,
  tokencss,
  purgecss,
  cssnano,
  cssModules,
} from './postcss';
import { tailwindcss } from './tailwindcss';
import { unocss } from './unocss';
import { windicss } from './windicss';

export const processors: ProcessorSpecs[] = [
  ...[
    tailwindcss,
    windicss,
    unocss,
    tokencss,
    purgecss,
    postcssImportUrl,
    autoprefixer,
    postcssPresetEnv,
    lightningcss,
    cssnano,
    cssModules,
  ],
  // keep postcss as last processor
  postcss,
];
