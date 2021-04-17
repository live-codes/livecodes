import { Template } from '../models';

export const vueSfcStarter: Template = {
  title: 'Vue 3 SFC Starter',
  thumbnail: 'assets/templates/vue.svg',
  language: 'vue',
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
    <h1>Hello, Vue</h1>
    <img src="{{ __localpen_baseUrl__ }}assets/templates/vue.svg" class="logo" />
    <p>You clicked {{ counter }} times</p>
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
  modules: [],
};
