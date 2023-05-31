import type { Template } from '../../models';

export const malinaStarter: Template = {
  name: 'malina',
  title: 'Malina.js Starter',
  thumbnail: 'assets/templates/malina.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'malina',
    content: `
<script>
  let title = "Malina.js";
  let counter = 0;
  function increment() {
    counter += 1;
  }
</script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/malina.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
