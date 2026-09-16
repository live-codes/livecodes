import type { Template } from '../../models';

export const vbWasmStarter: Template = {
  name: 'vb-wasm',
  aliases: ['vb.net-wasm', 'vb'],
  title: window.deps.translateString('templates.starter.vb-wasm', 'VB.NET (Wasm) Starter'),
  thumbnail: 'assets/templates/vb.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vb.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.vb.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.vb.loaded;

    // get initial output
    const initialOutput = livecodes.vb.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.vb.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

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
    language: 'vb-wasm',
    content: `
Imports System

Module Program
    Sub Main()
        Dim title As String = "VB.NET"
        Console.WriteLine(title)

        Dim input As String = Console.ReadLine()
        Dim count As Integer = Integer.Parse(input)
        count += 1
        Console.WriteLine(count)
    End Sub
End Module
`.trimStart(),
  },
};
