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
  <h1>Rust (Wasm)</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rust.svg" />
  <pre id="rust-output">Loading...</pre>
</div>

<script>
  addEventListener('load', async () => {
    // wait till the interpreter has loaded and the first run finished
    await livecodes.rust.loaded;
    document.querySelector("#rust-output").innerText = livecodes.rust.output;
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
  width: 150px;
}
#rust-output {
  text-align: left;
  display: inline-block;
}
`.trimStart(),
  },
  script: {
    language: 'rust-wasm',
    content: `
fn main() {
    let name = "Rust";
    println!("Hello, {name}!");

    let mut fib = (0u64, 1u64);
    let mut fibs = Vec::new();
    for _ in 0..10 {
        fibs.push(fib.0);
        fib = (fib.1, fib.0 + fib.1);
    }

    println!("fibonacci = {fibs:?}");
    println!("sum = {}", fibs.iter().sum::<u64>());
}
`.trimStart(),
  },
};
