import type { Template } from '../../models';

export const diagramsStarter: Template = {
  name: 'diagrams',
  title: 'Diagrams Starter',
  thumbnail: 'assets/templates/diagrams.svg',
  activeEditor: 'markup',
  markup: {
    language: 'diagrams',
    contentUrl: '{{ __livecodes_baseUrl__ }}assets/templates/diagrams-starter.html',
  },
  style: {
    language: 'css',
    content: `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container div {
  width: 100%;
  text-align: center;
}

.container img {
  width: 80%;
  max-width: 600px;
}

.container h3:not(:nth-child(1)) {
  margin-top: 3em;
}
`.trimStart(),
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
