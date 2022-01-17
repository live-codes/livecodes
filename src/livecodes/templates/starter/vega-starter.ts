import { Template } from '../../models';

export const vegaStarter: Template = {
  name: 'vega',
  title: 'Vega Starter',
  thumbnail: 'assets/templates/vega.svg',
  activeEditor: 'markup',
  markup: {
    language: 'graph',
    content: `
<div class="container">
  <div data-src="vega.svg"></div>
  <img data-src="vega-from-url.svg" />
  <img data-src="vega-lite.svg" />
  <div data-src="vega-lite-from-url.svg"></div>
</div>

<script type="application/graph-vega" data-output="vega.svg">
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A basic bar chart example, with value labels shown upon mouse hover.",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
      ]
    }
  ],

  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "datum === tooltip", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
}
</script>

<script
  type="application/graph-vega"
  data-output="vega-from-url.svg"
  src="https://vega.github.io/vega/examples/stacked-bar-chart.vg.json"
></script>

<script type="application/graph-vega-lite" data-output="vega-lite.svg">
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Stock prices of 5 Tech Companies over Time.",
  "data": {"url": "https://vega.github.io/vega-lite/examples/data/stocks.csv"},
  "mark": {
    "type": "line",
    "point": true
  },
  "encoding": {
    "x": {"timeUnit": "year", "field": "date"},
    "y": {"aggregate":"mean", "field": "price", "type": "quantitative"},
    "color": {"field": "symbol", "type": "nominal"}
  }
}</script>

<script
  type="application/graph-vega-lite"
  data-output="vega-lite-from-url.svg"
  src="https://vega.github.io/vega-lite/examples/sequence_line_fold.vl.json"
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
