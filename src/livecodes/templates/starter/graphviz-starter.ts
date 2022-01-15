import { Template } from '../../models';

export const graphvizStarter: Template = {
  name: 'graphviz',
  title: 'Graphviz Starter',
  thumbnail: 'assets/templates/graphviz.png',
  activeEditor: 'markup',
  markup: {
    language: 'graph',
    content: `
<div class="container">
  <img data-src="flow-chart.svg" />
  <img data-src="ER.svg" />
  <img data-src="radial.svg" />
</div>

<script type="application/graph-graphviz" data-output="flow-chart.svg">
  digraph G {
      node [shape=rect];

      subgraph cluster_0 {
          style=filled;
          color=lightgrey;
          node [style=filled,color=white];
          a0 -> a1 -> a2 -> a3;
          label = "Hello";
      }

      subgraph cluster_1 {
          node [style=filled];
          b0 -> b1 -> b2 -> b3;
          label = "World!";
          color=blue
      }

      start -> a0;
      start -> b0;
      a1 -> b3;
      b2 -> a3;
      a3 -> a0;
      a3 -> end;
      b3 -> end;

      start [shape=Mdiamond];
      end [shape=Msquare];
  }
</script>

<script
  type="application/graph-graphviz"
  data-layout="neato"
  data-output="ER.svg"
>
  graph ER {
      node [shape=box]; course; institute; student;
      node [shape=ellipse]; {node [label="name"] name0; name1; name2;}
          code; grade; number;
      node [shape=diamond,style=filled,color=lightgrey]; "C-I"; "S-C"; "S-I";

      name0 -- course;
      code -- course;
      course -- "C-I" [label="n",len=1.00];
      "C-I" -- institute [label="1",len=1.00];
      institute -- name1;
      institute -- "S-I" [label="1",len=1.00];
      "S-I" -- student [label="n",len=1.00];
      student -- grade;
      student -- name2;
      student -- number;
      student -- "S-C" [label="m",len=1.00];
      "S-C" -- course [label="n",len=1.00];
  }
</script>

<script
  type="application/graph-graphviz"
  data-layout="twopi"
  data-output="radial.svg"
  src="https://graphviz.org/Gallery/twopi/twopi2.gv.txt"
></script>
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
  max-height: 500px;
  margin: 2em;
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
