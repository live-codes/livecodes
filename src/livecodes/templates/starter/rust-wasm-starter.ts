import type { Template } from '../../models';

export const rustWasmStarter: Template = {
  name: 'rust-wasm',
  aliases: ['rust', 'rs'],
  title: window.deps.translateString('templates.starter.rust-wasm', 'Rust (Wasm) Starter'),
  thumbnail: 'assets/templates/rust.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rust.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.rust.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.rust.loaded;

    // get initial output
    update(livecodes.rust.output);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.rust.run(window.count);
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
    language: 'rust-wasm',
    content: `
use std::io::BufRead;

fn main() {
    let title = "Rust";
    println!("{title}");

    let mut input = String::new();
    let bytes = std::io::stdin().lock().read_line(&mut input).unwrap();
    let count: i64 = if bytes == 0 {
        0
    } else {
        input.trim().parse().unwrap_or(0)
    };

    println!("{}", count + 1);
}
`.trimStart(),
  },
};
