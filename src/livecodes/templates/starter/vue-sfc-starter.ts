import type { Template } from '../../models';

export const vueSfcStarter: Template = {
  name: 'vue',
  title: window.deps.translateString('templates.starter.vue', 'Vue SFC Starter'),
  thumbnail: 'assets/templates/vue.svg',
  activeEditor: 'script',
  markup: {
    language: 'vue',
    content: `
<script setup lang="tsx">
import Counter from './Component.vue';
</script>

<template>
  <Counter name="Vue" />
</template>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'vue',
    content: `
<script setup lang="tsx">
  import { ref } from 'vue';

  interface Props {
    name?: string
  }
  const props = defineProps<Props>();
  const count = ref(0);
  const align = 'center';

  // define inline component
  function Greeting(props: Props) {
    return <h1>Hello, { props.name || 'World' }!</h1>
  }
</script>

<template>
  <div class="container">
    <Greeting :name="props.name" />
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
    <p>You clicked {{ count }} times.</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
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
