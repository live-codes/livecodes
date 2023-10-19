import type { Template } from '../../models';

export const phpWasmStarter: Template = {
  name: 'php-wasm',
  title: 'PHP (Wasm) Starter',
  thumbnail: 'assets/templates/php.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<p>
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
</p>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
body {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'php-wasm',
    content: `
<?php
$title = 'PHP';
vrzno_eval('document.getElementById("title").innerText = "' . $title . '"');

$time = date('H');
if ($time < 12) {
  $greeting = 'Good morning!';
} elseif ($time < 17) {
  $greeting = 'Good afternoon!';
} elseif ($time < 20) {
  $greeting = 'Good evening!';
} else {
  $greeting = 'Good night!';
}

$date = date('l jS \\of F, Y');

echo $greeting . '<br>Today is:<br>' . $date;
`.trimStart(),
  },
};
