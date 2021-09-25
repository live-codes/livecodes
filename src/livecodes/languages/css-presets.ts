import { CssPreset } from '../models';
import { vendorsBaseUrl } from '../vendors';

export const cssPresets: CssPreset[] = [
  {
    id: 'normalize.css',
    name: 'Normalize.css',
    url: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css',
  },
  {
    id: 'reset-css',
    name: 'CSS reset',
    url: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css',
  },
  {
    id: 'github-markdown-css',
    name: 'github-markdown-css',
    url: 'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css',
  },
  {
    id: 'asciidoctor.css',
    name: 'Asciidoctor CSS',
    url: vendorsBaseUrl + 'asciidoctor.css/asciidoctor.css',
  },
];
