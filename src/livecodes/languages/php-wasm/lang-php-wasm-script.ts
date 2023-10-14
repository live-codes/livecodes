declare const phpWasm: any;

addEventListener('load', () => {
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/php-wasm"]');
  scripts.forEach((script) => {
    let src = script.innerHTML.trim();
    if (src.startsWith('<?php')) {
      src = src.replace('<?php', '/* <?php */');
    }
    code += src + '\n';
  });
  code = '<?php\n' + code;

  const php = new phpWasm.PHP();

  php.addEventListener('output', (event: CustomEvent) => {
    const output = event.detail.join?.(' ');
    if (output?.trim()) {
      // eslint-disable-next-line no-console
      console.log(output);
    }
  });

  php.addEventListener('ready', () => {
    php.run(code);
  });
});
