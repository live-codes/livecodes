import type { Template } from '../../models';

export const elixirWasmStarter: Template = {
  name: 'elixir-wasm',
  title: window.deps.translateString('templates.starter.elixir-wasm', 'Elixir Starter'),
  thumbnail: 'assets/templates/elixir.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="Elixir logo" src="{{ __livecodes_baseUrl__ }}assets/templates/elixir.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  livecodes.elixir.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      await livecodes.elixir.loaded;
    } catch (error) {
      button.innerText = "Error";
      console.error(error);
      return;
    }

    update(livecodes.elixir.output);

    button.onclick = async () => {
      button.disabled = true;
      const { output } = await livecodes.elixir.run(window.count);
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
    language: 'elixir-wasm',
    content: `
count =
  case livecodes_input do
    "" -> 0
    value -> String.to_integer(String.trim(value))
  end

IO.puts("Elixir")
IO.puts(count + 1)
`.trimStart(),
  },
};
