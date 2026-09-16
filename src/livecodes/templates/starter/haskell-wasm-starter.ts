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
  <pre id="output">Loading GHC...</pre>
  <button id="run-button" disabled>Loading...</button>
</div>

<script>
  addEventListener('load', async () => {
    const output = document.querySelector('#output');
    const button = document.querySelector('#run-button');

    try {
      // wait till the compiler is downloaded and the code has run
      await livecodes.haskellWasm.loaded;
      output.textContent = livecodes.haskellWasm.output;
    } catch (error) {
      output.textContent = livecodes.haskellWasm.error;
    }

    button.innerText = 'Run again';
    button.disabled = false;

    button.onclick = async () => {
      button.disabled = true;
      const { output: result, error } = await livecodes.haskellWasm.run();
      output.textContent = error || result;
      button.disabled = false;
    };
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
pre {
  padding: 1rem;
  background: #f4f1f8;
  text-align: left;
  white-space: pre-wrap;
}
`.trimStart(),
  },
  script: {
    language: 'haskell-wasm',
    content: `
-- A lazy, infinite list of Fibonacci numbers.
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (drop 1 fibs)

main :: IO ()
main = do
  putStrLn "Hello, Haskell!"
  putStrLn "The first 10 Fibonacci numbers:"
  print (take 10 fibs)
`.trimStart(),
  },
};
