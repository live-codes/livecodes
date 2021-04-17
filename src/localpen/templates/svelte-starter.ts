import { Template } from '../models';

export const svelteStarter: Template = {
  title: 'Svelte Starter',
  thumbnail: 'assets/templates/svelte.svg',
  language: 'svelte',
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'svelte',
    content: `
<script>
  let title = "Svelte";
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
  <img src="{{ __localpen_baseUrl__ }}assets/templates/svelte.svg" class="logo" />
  <p>You clicked {counter} times</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  modules: [],
};
