import type { Template } from '../../models';

export const latexStarter: Template = {
  name: 'latex',
  aliases: ['tex'],
  title: window.deps.translateString('templates.starter.latex', 'LaTeX Starter'),
  thumbnail: 'assets/templates/latex.svg',
  activeEditor: 'markup',
  markup: {
    language: 'latex',
    contentUrl: '{{ __livecodes_baseUrl__ }}assets/templates/latex-starter.tex',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'javascript',
    content: '',
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
