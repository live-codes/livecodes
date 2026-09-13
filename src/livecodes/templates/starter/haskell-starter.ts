import type { Template } from '../../models';

const heading = window.deps.translateString('templates.haskell.heading', 'Haskell in the browser');
const loading = window.deps.translateString('templates.haskell.loading', 'Loading GHC...');

export const haskellStarter: Template = {
  name: 'haskell',
  aliases: ['hs'],
  title: window.deps.translateString('templates.starter.haskell', 'Haskell Starter'),
  thumbnail: 'assets/templates/haskell.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `<h1>${heading}</h1>
<pre id="output">${loading}</pre>

<script>
  addEventListener('load', async () => {
    const output = document.querySelector('#output');
    try {
      await livecodes.haskell.loaded;
      output.textContent = livecodes.haskell.output;
    } catch (error) {
      output.textContent = livecodes.haskell.error;
    }
  });
</script>
`,
  },
  style: {
    language: 'css',
    content: `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  color: #453a62;
}

pre {
  padding: 1rem;
  background: #f4f1f8;
  white-space: pre-wrap;
}
`,
  },
  script: {
    language: 'haskell',
    content: `-- A lazy, infinite list of Fibonacci numbers.
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (drop 1 fibs)

main :: IO ()
main = do
  putStrLn "Hello, Haskell!"
  putStrLn "The first 10 Fibonacci numbers:"
  print (take 10 fibs)
`,
  },
};
