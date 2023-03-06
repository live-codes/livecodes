import { Template } from '../../models';

export const vueSfcStarter: Template = {
  name: 'vue',
  title: 'Vue 3 Starter',
  thumbnail: 'assets/templates/vue.svg',
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
    language: 'vue',
    content: `
<template>
  <div class="container">
    <h1>Hello, Vue!</h1>
    <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
    <p>You clicked {{ counter }} times.</p>
    <button v-on:click="increment">Click me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
        align: 'center',
      };
    },
    methods: {
      increment() {
        this.counter += 1;
      },
    },
  };
</script>

<style scoped>
  .container,
  .container button {
    text-align: v-bind('align');
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
