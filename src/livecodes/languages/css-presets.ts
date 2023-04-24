import type { CssPreset } from '../models';
import { normalizeCssUrl, resetCssUrl } from '../vendors';

export const cssPresets: CssPreset[] = [
  {
    id: 'normalize.css',
    name: 'Normalize.css',
    url: normalizeCssUrl,
  },
  {
    id: 'reset-css',
    name: 'CSS reset',
    url: resetCssUrl,
  },
];
