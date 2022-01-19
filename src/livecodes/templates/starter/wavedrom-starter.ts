import { Template } from '../../models';

export const wavedromStarter: Template = {
  name: 'wavedrom',
  title: 'WaveDrom Starter',
  thumbnail: 'assets/templates/wavedrom.svg',
  activeEditor: 'markup',
  markup: {
    language: 'graph',
    content: `
<div class="container">
  <div data-src="diagram.svg"></div>
</div>

<script type="application/graph-wavedrom" data-output="diagram.svg">
{ signal : [
  { name: "clk",  wave: "p......" },
  { name: "bus",  wave: "x.34.5x",   data: "head body tail" },
  { name: "wire", wave: "0.1..0." },
]}
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
