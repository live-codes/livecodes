import { CssPreset } from '../models';
import { githubMarkdownCss, normalizeCssUrl, resetCssUrl, vendorsBaseUrl } from '../vendors';

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
  {
    id: 'github-markdown-css',
    name: 'github-markdown-css',
    url: githubMarkdownCss,
  },
  {
    id: 'asciidoctor.css',
    name: 'Asciidoctor CSS',
    url: vendorsBaseUrl + 'asciidoctor.css/asciidoctor.css',
  },
];
