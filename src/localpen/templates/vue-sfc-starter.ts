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
  <div class="centered">
    <h1>Hello, Vue</h1>
    <img src="/localpen/assets/templates/vue.svg" class="logo" />
    <p>You clicked {{ counter }} times</p>
    <button v-on:click="increment">Click me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
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
  .centered,
  button {
    text-align: center;
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
