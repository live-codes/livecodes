import { ProcessorSpecs } from '../models';
import { lightningcss } from './lightningcss';
import {
  postcss,
  autoprefixer,
  postcssPresetEnv,
  tailwindcss,
  postcssImportUrl,
  tokencss,
} from './postcss';
import { unocss } from './unocss';
import { windicss } from './windicss';

export const processors: ProcessorSpecs[] = [
  tailwindcss,
  windicss,
  unocss,
  tokencss,
  lightningcss,
  postcssImportUrl,
  autoprefixer,
  postcssPresetEnv,
  postcss,
]
  // keep postcss as last processor
  .sort((a, b) => (a.name === 'postcss' ? 1 : b.name === 'postcss' ? -1 : 0));
