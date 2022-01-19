import { Template } from '../../models';

export const mermaidStarter: Template = {
  name: 'mermaid',
  title: 'Mermaid Starter',
  thumbnail: 'assets/templates/mermaid.png',
  activeEditor: 'markup',
  markup: {
    language: 'graph',
    content: `
<div class="container">
  <div data-src="flow-chart.svg"></div>
  <div data-src="class-diagram.svg"></div>
  <img data-src="journey.svg"></div>
</div>

<script type="application/graph-mermaid" data-output="flow-chart.svg">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</script>

<script type="application/graph-mermaid" data-output="class-diagram.svg">
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
</script>

<script type="application/graph-mermaid" data-output="journey.svg">
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
  max-width: min(600px, 90%);
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
