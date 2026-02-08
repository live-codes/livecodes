import type { Template } from '../../models';

export const d3Starter: Template = {
  name: 'd3',
  title: window.deps.translateString('templates.starter.d3', 'D3 Starter'),
  thumbnail: 'assets/templates/d3.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<div id="chart">Loading...</div>\n',
  },
  style: {
    language: 'css',
    content: `
.bar {
  fill: steelblue;
}

.bar:hover {
  fill: orange;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `
import * as d3 from "d3";

const data = [150, 230, 180, 90];

const svg = d3
  .select("#chart")
  .html('')
  .append("svg")
  .attr("width", 300)
  .attr("height", 200);

svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("width", (d) => d)
  .attr("height", 40)
  .attr("y", (d, i) => i * 50 + 10)
  .attr("x", 10);
`.trimStart(),
  },
};
