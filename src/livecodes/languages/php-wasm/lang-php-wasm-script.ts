// based on https://github.com/seanmorris/php-wasm/blob/master/source/PhpWeb.js

declare const phpWasm: any;

const runPhpScript = (element: HTMLElement) => {
  const inlineCode = element?.innerText?.trim();
  if (!inlineCode) return;

  const output = document.createElement('div');
  element.parentNode?.insertBefore(output, element.nextSibling);
  let buffer = '';

  const php = new phpWasm.PHP();

  php.addEventListener('output', (event: CustomEvent) => (buffer += event.detail));

  php.addEventListener('ready', () => {
    php.run(inlineCode).then(() => {
      output.innerHTML = buffer;
    });
  });

  php.addEventListener('error', (event: CustomEvent) => {
    event.detail.forEach((error: string) => {
      error = error.trim();
      // eslint-disable-next-line no-console
      if (error) console.log(error);
    });
  });
};

addEventListener('load', () => {
  const phpSelector = 'script[type="text/php-wasm"]';
  const phpNodes = document.querySelectorAll<HTMLElement>(phpSelector);
  for (const phpNode of phpNodes) {
    runPhpScript(phpNode);
  }
});
