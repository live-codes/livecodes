import { Template } from '../../models';

export const mermaidStarter: Template = {
  name: 'mermaid',
  title: 'Mermaid Starter',
  thumbnail: 'assets/templates/mermaid.svg',
  activeEditor: 'markup',
  markup: {
    language: 'graph',
    content: `
<div class="container">
  <div data-src="chart.svg"></div>
</div>

<script type="application/graph-mermaid" data-output="chart.svg">
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container img {
  width: 80%;
  max-width: 600px;
}`.trimStart(),
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
