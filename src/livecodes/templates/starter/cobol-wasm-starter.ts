import type { Template } from '../../models';

/**
 * The COBOL starter, matching the other Wasm starters: the markup drives the program through the
 * `livecodes.cobol` API. The program's first line names the language — which is what the heading
 * shows — and the second is a counter the button increments by re-running with new input.
 */
export const cobolWasmStarter: Template = {
  name: 'cobol-wasm',
  title: window.deps.translateString('templates.starter.cobol-wasm', 'COBOL Starter'),
  thumbnail: 'assets/templates/cobol.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cobol.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.cobol.input = "0";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      // wait till loaded
      await livecodes.cobol.loaded;
    } catch (error) {
      // surface the boot error instead of crashing on a null output
      button.innerText = "Error";
      console.error(error);
      return;
    }

    // get initial output
    const initialOutput = livecodes.cobol.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.cobol.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = (output || '').split('\\n');

      if (!isNaN(Number(count))) {
        window.count = Number(count);
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
    language: 'cobol',
    content: `
IDENTIFICATION DIVISION.
PROGRAM-ID. COUNTER.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-COUNT PIC 9(3).
PROCEDURE DIVISION.
    DISPLAY "COBOL"
    ACCEPT WS-COUNT
    ADD 1 TO WS-COUNT
    DISPLAY WS-COUNT
    STOP RUN.
`.trimStart(),
  },
};
