import type { Template } from '../../models';

/**
 * The Fortran starter: the smallest program that shows the compiler working, with the
 * `livecodes.fortran` API used from the markup so the output is visible without opening the console.
 */
export const fortranWasmStarter: Template = {
  name: 'fortran-wasm',
  title: window.deps.translateString('templates.starter.fortran-wasm', 'Fortran Starter'),
  thumbnail: 'assets/templates/fortran.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Fortran</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fortran.svg" />
  <p>Program output:</p>
  <pre id="output">Loading the compiler…</pre>
</div>

<script>
  addEventListener('load', async () => {
    const output = document.querySelector('#output');
    // The compiler is ~19 MB compressed and is downloaded once, the first time the language runs.
    // The loaded promise resolves when that has happened; run then resolves with this run's output,
    // so the pane does not depend on which run finished last.
    await livecodes.fortran.loaded;
    const { output: text, error } = await livecodes.fortran.run();
    output.innerText = text || error || '(no output)';
  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 120px;
}
pre {
  text-align: left;
  background: #f4f4f4;
  padding: 1em;
  border-radius: 6px;
  white-space: pre-wrap;
}
`.trimStart(),
  },
  script: {
    language: 'fortran',
    content: `
program hello
implicit none
real :: x(5)
x = [1.0, 2.0, 3.0, 4.0, 5.0]
print *, 'Hello, World!'
print *, 'sum  = ', sum(x)
print *, 'mean = ', sum(x) / size(x)
end program
`.trimStart(),
  },
};
