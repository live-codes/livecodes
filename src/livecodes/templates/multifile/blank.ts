import type { Template } from '../../models';

export const blank: Template = {
  name: 'multifile-blank',
  title: window.deps.translateString('templates.multifile.blank', 'Blank Template'),
  thumbnail: 'assets/templates/blank.svg',
  mainFile: 'index.html',
  activeEditor: 'index.html',
  files: [
    {
      filename: 'index.html',
      language: 'html',
      content: '',
    },
  ],
};
