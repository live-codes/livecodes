import type { Template } from '../../models';

export const erlangWasmStarter: Template = {
  name: 'erlang-wasm',
  title: window.deps.translateString('templates.starter.erlang-wasm', 'Erlang Starter'),
  thumbnail: 'assets/templates/erlang.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="Erlang logo" src="{{ __livecodes_baseUrl__ }}assets/templates/erlang.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  livecodes.erlang.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      await livecodes.erlang.loaded;
    } catch (error) {
      button.innerText = "Error";
      console.error(error);
      return;
    }

    update(livecodes.erlang.output);

    button.onclick = async () => {
      button.disabled = true;
      try {
        const { output } = await livecodes.erlang.run(window.count);
        update(output);
      } finally {
        button.disabled = false;
      }
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
    language: 'erlang-wasm',
    content: `
Count =
  case io:get_line("") of
    eof -> 0;
    Value -> binary_to_integer(binary:replace(Value, <<"\\n">>, <<>>, [global]))
  end,
io:format("Erlang~n"),
io:format("~p~n", [Count + 1]).
`.trimStart(),
  },
};
