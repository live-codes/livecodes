import type { Template } from '../../models';

export const adaWasmStarter: Template = {
  name: 'ada-wasm',
  aliases: ['ada'],
  title: window.deps.translateString('templates.starter.ada-wasm', 'Ada (Wasm) Starter'),
  thumbnail: 'assets/templates/ada.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ada.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.ada.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      // wait till loaded
      await livecodes.ada.loaded;
    } catch (error) {
      // surface the boot error instead of crashing on a null output
      button.innerText = "Error";
      console.error(error);
      return;
    }

    // get initial output
    update(livecodes.ada.output);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.ada.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n').map(s => s.trim());

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
    language: 'ada-wasm',
    content: `
with HAT; use HAT;

procedure Ada_Demo is
  Current : Integer;
begin
  -- The current count arrives on standard input, so every run is a fresh
  -- program that prints the next value.
  Get (Current);
  Put_Line ("Ada");
  -- The second argument is the field width; 1 avoids the default padding.
  Put_Line (Current + 1, 1);
end Ada_Demo;
`.trimStart(),
  },
};
