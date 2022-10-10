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
} from './postcss';
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
  ],
  // keep postcss as last processor
  postcss,
];
