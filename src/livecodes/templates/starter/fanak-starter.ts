import type { Template } from '../../models';

export const fanakStarter: Template = {
  name: 'fanak',
  title: window.deps.translateString('templates.starter.fanak', 'Fanak Starter'),
  thumbnail: 'assets/templates/csharp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Fanak</h1>
  <pre id="output">Loading...</pre>
</div>

<script>
  addEventListener('load', async () => {
    // wait till the compiler + program have run
    await livecodes.fanak.loaded;
    document.querySelector('#output').innerText =
      livecodes.fanak.output ?? livecodes.fanak.error ?? '';
  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container {
  font: 1em sans-serif;
}
#output {
  background: #f4f4f4;
  padding: 1em;
  border-radius: 4px;
}
`.trimStart(),
  },
  script: {
    language: 'fanak',
    content: `
Unit main() {
	println("Hello, Fanak!");
	int answer = 6 * 7;
	println(answer);
}
`.trimStart(),
  },
};
