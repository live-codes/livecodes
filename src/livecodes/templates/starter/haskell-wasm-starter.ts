import type { Template } from '../../models';

export const haskellWasmStarter: Template = {
  name: 'haskell-wasm',
  aliases: ['hs-wasm'],
  title: window.deps.translateString('templates.starter.haskell-wasm', 'Haskell (Wasm) Starter'),
  thumbnail: 'assets/templates/haskell.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">Haskell</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/haskell.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.haskellWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till the compiler is downloaded and the code has run
    await livecodes.haskellWasm.loaded;

    // get initial output
    update(livecodes.haskellWasm.output);

    button.onclick = async () => {
      button.disabled = true;
      // run again, passing the new input
      const { output, error } = await livecodes.haskellWasm.run(window.count);
      if (error) {
        console.error(error);
      }
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = String(output ?? '').split('\\n');

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
  width: 100px;
}
`.trimStart(),
  },
  script: {
    language: 'haskell-wasm',
    content: `
main :: IO ()
main = do
  putStrLn "Haskell"
  input <- getLine
  let count = case reads input of
        [(n, "")] -> n + 1
        _ -> 0
  print (count :: Int)
`.trimStart(),
  },
};
