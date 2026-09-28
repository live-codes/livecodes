import type { Template } from '../../models';

export const swiftWasmStarter: Template = {
  name: 'swift-wasm',
  aliases: ['swift'],
  title: window.deps.translateString('templates.starter.swift-wasm', 'Swift (Wasm) Starter'),
  thumbnail: 'assets/templates/swift.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/swift.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.swift.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    try {
      // wait till loaded
      await livecodes.swift.loaded;
    } catch (error) {
      // surface the boot error instead of crashing on a null output
      button.innerText = "Error";
      console.error(error);
      return;
    }

    // get initial output
    update(livecodes.swift.output);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output, error, exitCode } = await livecodes.swift.run(window.count);
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
    language: 'swift-wasm',
    content: `
// The current count arrives on standard input, so every run is a fresh process
// that prints the next value.
let current = Int(readLine() ?? "") ?? 0
print("Swift")
print(current + 1)

struct Greeting {
  let name: String
  var message: String { "Hello, \\(name)!" }
}

for name in ["World", "LiveCodes", "Swift"] {
  print(Greeting(name: name).message)
}
`.trimStart(),
  },
};
