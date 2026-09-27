import type { Template } from '../../models';

export const fanakStarter: Template = {
  name: 'fanak',
  title: window.deps.translateString('templates.starter.fanak', 'Fanak Starter'),
  thumbnail: 'assets/templates/fanak.png',
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
    const output = document.querySelector('#output');
    try {
      // wait till the compiler + program have run
      await livecodes.fanak.loaded;
      // Show the error even when the program printed nothing (e.g. a panic),
      // while keeping any partial output.
      const parts = [livecodes.fanak.output, livecodes.fanak.error].filter(Boolean);
      output.innerText = parts.join('\n');
    } catch (err) {
      output.innerText = 'Failed to load the Fanak compiler: ' + (err && err.message ? err.message : err);
    }
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
	runUnit(println("Hello, Fanak!"));
	int answer = 6 * 7;
	runUnit(println(answer));
}
`.trimStart(),
  },
};
