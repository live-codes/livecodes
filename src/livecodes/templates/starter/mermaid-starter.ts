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
  <img data-src="flow-chart.svg" />
  <div data-src="gantt-diagram.svg"></div>
</div>

<script type="application/graph-mermaid" data-output="flow-chart.svg">
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
</script>

<script type="application/graph-mermaid" data-output="gantt-diagram.svg">
  gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram to mermaid
  excludes weekdays 2014-01-10

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2               :         des4, after des3, 5d
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
