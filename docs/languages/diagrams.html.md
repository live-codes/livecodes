# Diagrams

import OpenCode from '../../src/components/OpenCode.tsx';

## Overview

Diagrams-as-code.

Allows using syntax for multiple visualization libraries inside HTML to produce diagrams.
The rendered diagrams are added to the [result page](../features/result.html.md) as either:

- SVG elements (which you can style with CSS or manipulate with JavaScript)
- HTML images (which you can right-click and save or open in a new window)

Diagrams from multiple libraries can be used in the same page. Only the libraries used will be loaded in the LiveCodes playground. The result page will have no libraries (only the output SVG or images).

<OpenCode template="diagrams">Open starter template in LiveCodes</OpenCode>

## Usage

This code: (<OpenCode id="2m8u9hgeiq4"></OpenCode>)

```html
<div data-src="my-diagram"></div>

<script type="application/diagram-mermaid" data-output="my-diagram">
  graph TD
    A-->B
    A-->C
    B-->D
    C-->D
</script>
```

produces this output:

![flow-chart](./img/flow-chart.svg)

<h3>Steps</h3>

#### 1. Add a diagram target:

The target element should have a `data-src` attribute.

It can be an HTML element (the SVG of the diagram will be embedded as a child element)

```html
<div data-src="my-diagram"></div>
```

becomes

```html
<div data-src="my-diagram"><svg ...>...</svg></div>
```

or an HTML image element (the diagram will be added to its `src` attribute as a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs))

```html
<img data-src="my-diagram" />
```

becomes

```html
<img data-src="my-diagram" src="data:image/svg+xml;base64,..." />
```

There can be more that one target element for the same diagram if they have the same `data-src` attribute.

```html
<div data-src="my-diagram"></div>
<img data-src="my-diagram" />
```

#### 2. Add a script element with the diagram syntax:

It should have:

- an attribute `type="application/diagram-{diagram type}"` that specifies the diagram type (e.g. `type="application/diagram-mermaid"`).
- a `data-output` attribute that matches the `data-src` attribute of the target element.
- the syntax of the diagram is the content of the script element or the content of a file linked by the `src` attribute.

```html
<script type="application/diagram-mermaid" data-output="my-diagram">
  graph TD
    A-->B
    A-->C
    B-->D
    C-->D
</script>

<script
  type="application/diagram-mermaid"
  data-output="second-diagram"
  src="/url/to/diagram/syntax"
></script>
```

## Supported Libraries

### [Cytoscape](https://js.cytoscape.org/)

The diagram syntax is JSON representing [Cytoscape options](https://js.cytoscape.org/#getting-started/specifying-basic-options).

Please note that reference to JavaScript objects cannot be used.<br /> e.g. do not use `{container: document.getElementById('cy')}`.

Example: (<OpenCode id="nq6954cuvgs"></OpenCode>)

```html
<div data-src="cytoscape.svg"></div>
<script type="application/diagram-cytoscape" data-output="cytoscape.svg">
  {
    "elements": [
      {
        "data": { "id": "a" }},
      {
        "data": { "id": "b" }},
      {
        "data": { "id": "ab", "source": "a", "target": "b" }}],

    "style": [
      {
        "selector": "node",
        "style": {
          "background-color": "#666",
          "label": "data(id)"}
      },

      {
        "selector": "edge",
        "style": {
          "width": 3,
          "line-color": "#ccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier"
        }
      }
    ],

    "layout": {
      "name": "grid",
      "rows": 1
    }

  }
</script>
```

### [ELK](https://www.eclipse.org/elk/)

Diagram layout is produced using [elkjs](https://github.com/kieler/elkjs) and rendered using [elkjs-svg](https://github.com/EmilStenstrom/elkjs-svg).

The syntax used is [ELK JSON](https://www.eclipse.org/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html) format. <br />ELK text format is not supported! (You may use [this tool](https://rtsys.informatik.uni-kiel.de/elklive/conversion.html) to convert formats)

Example: (<OpenCode id="49cbr5k3z69"></OpenCode>)

```html
<div data-src="elk.svg"></div>
<script type="application/diagram-elk" data-output="elk.svg">
  {
    "id": "root",
    "layoutOptions": {
      "elk.algorithm": "layered"
    },
    "children": [
      {"id": "n1", "width": 70, "height": 70},
      {"id": "n2", "width": 70, "height": 70},
      {"id": "n3", "width": 70, "height": 70},
      {"id": "n4", "width": 70, "height": 70},
      {"id": "n5", "width": 70, "height": 70},
      {"id": "n6", "width": 70, "height": 70}
    ],
    "edges": [
      {"id": "e1", "sources": ["n1"], "targets": ["n2"]},
      {"id": "e2", "sources": ["n1"], "targets": ["n3"]},
      {"id": "e3", "sources": ["n2"], "targets": ["n4"]},
      {"id": "e4", "sources": ["n3"], "targets": ["n5"]},
      {"id": "e5", "sources": ["n5"], "targets": ["n6"]},
      {"id": "e6", "sources": ["n4"], "targets": ["n6"]}
    ]
  }
</script>
```

### [Gnuplot](http://www.gnuplot.info/)

using [gnuplot-JS](https://github.com/chhu/gnuplot-JS)

Instead of using `data-output` attribute in the [script element](#2-add-a-script-element-with-the-diagram-syntax), the statement `set output` is used in the diagram syntax (see highlighted lines below).

Data files are also specified in the diagram syntax (see highlighted lines below).
They are defined in script elements with the attribute `type="application/diagram-gnuplot-file"`. The file name is specified in `data-file` attribute and either have inline content or linked to with a `src` attribute.

Example: (<OpenCode id="45tardc2qaz"></OpenCode>)

```html {4,22}
<div data-src="contour.svg"></div>
<script type="application/diagram-gnuplot">
  set terminal svg size 600,400 enhanced fname 'arial' fsize 10 butt solid
  set output 'contour.svg'
  set view 60, 30, 0.85, 1.1
  set samples 25, 25
  set isosamples 26, 26
  set contour base
  set cntrparam bspline
  set cntrparam levels auto 10
  set style data lines
  set title "3D gnuplot demo - contour of data grid plotting"
  set xlabel "X axis"
  set xrange [ 0.00000 : 15.0000 ] noreverse nowriteback
  set ylabel "Y axis"
  set yrange [ 0.00000 : 15.0000 ] noreverse nowriteback
  set zlabel "Z axis"
  set zlabel  offset character 1, 0, 0 font "" textcolor lt -1 norotate
  set zrange [ -1.20000 : 1.20000 ] noreverse nowriteback

  # "glass.dat" is defined below
  splot "glass.dat" using 1
</script>

<!--  data file -->
<script
  type="application/diagram-gnuplot-file"
  data-file="glass.dat"
  src="https://raw.githubusercontent.com/gnuplot/gnuplot/master/demo/glass.dat"
></script>

<!--  or inline data in a script block -->
<script type="application/diagram-gnuplot-file" data-file="another-file.dat">
  0.568000   0.000000  -0.911000
  0.518894   0.231026  -0.911000
  0.380066   0.422106  -0.911000
  0.175522   0.540200  -0.911000
  -0.059372   0.564888  -0.911000
</script>
```

### [Graphviz](https://graphviz.org/)

using [@hpcc-js/wasm](https://github.com/hpcc-systems/hpcc-js-wasm)

The following [layout engines](https://graphviz.org/docs/layouts/) are supported:

- dot
- neato
- fdp
- sfdp
- circo
- twopi
- osage
- patchwork

By default, the `dot` layout engine is used. To use a different engine add the attribute `data-layout` to the [script element](#2-add-a-script-element-with-the-diagram-syntax) with the value of the required engine name, like this:

```html
<script type="application/diagram-graphviz" data-layout="fdp" data-output="my-diagram">
  ...
</script>
```

Example: (<OpenCode id="ms2c6jc4vnj"></OpenCode>)

```html
<div data-src="flow-chart.svg"></div>
<script type="application/diagram-graphviz" data-output="flow-chart.svg">
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
```

### [Mermaid](https://mermaid-js.github.io/mermaid/)

Example: (<OpenCode id="r9y3ubytquj"></OpenCode>)

```html
<div data-src="class-diagram.svg"></div>
<script type="application/diagram-mermaid" data-output="class-diagram.svg">
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
```

### [Nomnoml](https://nomnoml.com/)

Example: (<OpenCode id="8x45vzfnxw5"></OpenCode>)

```html
<div data-src="nomnoml.svg"></div>
<script type="application/diagram-nomnoml" data-output="nomnoml.svg">
  [Pirate|eyeCount: Int|raid();pillage()|
    [beard]--[parrot]
    [beard]-:>[foul mouth]
  ]

  [<table>mischief | bawl | sing || yell | drink]

  [<abstract>Marauder]<:--[Pirate]
  [Pirate]- 0..7[mischief]
  [jollyness]->[Pirate]
  [jollyness]->[rum]
  [jollyness]->[singing]
  [Pirate]-> *[rum|tastiness: Int|swig()]
  [Pirate]->[singing]
  [singing]<->[rum]
</script>
```

### [Pintora](https://pintorajs.vercel.app/)

[Pintora config](https://pintorajs.vercel.app/docs/configuration/config) object can be specified in [custom settings](../advanced/custom-settings.html.md), under the key `pintora`.

Example Custom Settings:

```json
{
  "pintora": {
    "themeConfig": {
      "theme": "dark"
    }
  }
}
```

Example: (<OpenCode id="9ygd8w4jfai"></OpenCode>)

```html
<div data-src="pintora.svg"></div>
<script type="application/diagram-pintora" data-output="pintora.svg">
  sequenceDiagram
    Frida-->>Georgia: Flowers are beautiful
    @note over Frida,Georgia: Painters
    @note right of Georgia: Right
    @note left of Georgia
    multiline
    note
    @end_note
</script>
```

### [Plotly](https://plotly.com/graphing-libraries/)

The diagram syntax is a JSON object with `data` and `layout` properties (see [Plotly reference](https://plotly.com/javascript/reference/index/)).

Please note that the output is a non-interactive SVG element or image. The plotly library is not loaded in the result page, so any JavaScript functionality is not available.

Example: (<OpenCode id="c9teuatsfk6"></OpenCode>)

```html
<div data-src="plotly.svg"></div>
<script type="application/diagram-plotly" data-output="plotly.svg">
  {
    "data": [
      {
        "y": [
          0.2,
          0.2,
          0.6,
          1,
          0.5,
          0.4,
          0.2,
          0.7,
          0.9,
          0.1,
          0.5,
          0.3
        ],
        "x": [
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2"
        ],
        "name": "kale",
        "marker": {
          "color": "#3D9970"
        },
        "type": "box"
      },
      {
        "y": [
          0.6,
          0.7,
          0.3,
          0.6,
          0,
          0.5,
          0.7,
          0.9,
          0.5,
          0.8,
          0.7,
          0.2
        ],
        "x": [
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2"
        ],
        "name": "radishes",
        "marker": {
          "color": "#FF4136"
        },
        "type": "box"
      },
      {
        "y": [
          0.1,
          0.3,
          0.1,
          0.9,
          0.6,
          0.6,
          0.9,
          1,
          0.3,
          0.6,
          0.8,
          0.5
        ],
        "x": [
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 1",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2",
          "day 2"
        ],
        "name": "carrots",
        "marker": {
          "color": "#FF851B"
        },
        "type": "box"
      }
    ],
    "layout": {
      "yaxis": {
        "title": "normalized moisture",
        "zeroline": false
      },
      "boxmode": "group"
    }
  }
</script>
```

### [Svgbob](https://github.com/ivanceras/svgbob)

Example: (<OpenCode id="fqe7devefsm"></OpenCode>)

```html
<div data-src="svgbob.svg"></div>
<script type="application/diagram-svgbob" data-output="svgbob.svg">
  o-> Graphics Diagram

     0       3                          P *
      *-------*      +y                    \
   1 /|    2 /|       ^                     \
    *-+-----* |       |                v0    \       v3
    | |4    | |7      | ◄╮               *----\-----*
    | *-----|-*     ⤹ +-----> +x        /      v X   \
    |/      |/       / ⤴               /        o     \
    *-------*       v                 /                \
   5       6      +z              v1 *------------------* v2
</script>
```

### [Vega](https://vega.github.io/vega/)

The diagram syntax is [Vega JSON specification](https://vega.github.io/vega/docs/#specification).

Please note that the output is a non-interactive SVG element or image. The Vega library is not loaded in the result page, so any JavaScript functionality is not available.

Example: (<OpenCode id="m8ynr8vj7b2"></OpenCode>)

```html
<div data-src="vega.svg"></div>
<script
  type="application/diagram-vega"
  data-output="vega.svg"
  src="https://vega.github.io/vega/examples/stacked-bar-chart.vg.json"
></script>
```

### [VegaLite](https://vega.github.io/vega-lite/)

The diagram syntax is [Vega-Lite View JSON Specification](https://vega.github.io/vega-lite/docs/spec.html).

Please note that the output is a non-interactive SVG element or image. The Vega-Lite library is not loaded in the result page, so any JavaScript functionality is not available.

Example: (<OpenCode id="sui8eux6siv"></OpenCode>)

```html
<div data-src="vega-lite.svg"></div>
<script
  type="application/diagram-vega-lite"
  data-output="vega-lite.svg"
  src="https://vega.github.io/vega-lite/examples/sequence_line_fold.vl.json"
></script>
```

### [WaveDrom](https://wavedrom.com/)

The diagram syntax is [WaveJSON](https://wavedrom.com/tutorial.html) format.

Example: (<OpenCode id="ey74x6q6cq3"></OpenCode>)

```html
<div data-src="wavedrom.svg"></div>
<script type="application/diagram-wavedrom" data-output="wavedrom.svg">
  { signal : [
    { name: "clk",  wave: "p......" },
    { name: "bus",  wave: "x.34.5x",   data: "head body tail" },
    { name: "wire", wave: "0.1..0." },
  ]}
</script>
```