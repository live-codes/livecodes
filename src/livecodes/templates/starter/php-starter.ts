import type { Template } from '../../models';

export const phpStarter: Template = {
  name: 'php',
  title: 'PHP Starter',
  thumbnail: 'assets/templates/php.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
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
    language: 'php',
    content: `
<?php
$title = 'PHP';
$document->getElementById('title')->innerText = $title;

$count = 0;

$document
  ->getElementById('counter-button')
  ->addEventListener('click', function () use (&$count, $document) {
      $count += 1;
      $document->getElementById('counter')->innerText = $count;
      echo "count: $count";
  });
`.trimStart(),
  },
};
