import type { Template } from '../../models';

/**
 * The Fortran starter, matching the other Wasm starters: the markup drives the program through the
 * `livecodes.fortran` API. The program's first line names the language — which is what the heading
 * shows — and the second is a counter the button increments by re-running with new input.
 *
 * The program deliberately avoids `print *` inside a loop: that is a live upstream codegen bug (see the
 * package README), and a starter is the wrong place to trip over it.
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
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fortran.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.fortran.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.fortran.loaded;

    // get initial output
    const initialOutput = livecodes.fortran.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.fortran.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = (output || '').split('\\n');

      if (!isNaN(Number(count))) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'fortran',
    content: `
program counter
implicit none
integer :: count

print *, 'Fortran'

read *, count
count = count + 1
print *, count
end program
`.trimStart(),
  },
};
