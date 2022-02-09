import { Template } from '../../models';

export const vueStarter: Template = {
  name: 'vue2',
  title: 'Vue 2 Starter',
  thumbnail: 'assets/templates/vue.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="app">
  <h1>Hello, Vue!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
  <p>You clicked {{ counter }} times.</p>
  <button @click="increment()">Click me</button>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
#app,
#app button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `
new Vue({
  el: "#app",
  data: {
    counter: 0,
  },
  methods: {
    increment() {
      this.counter += 1;
    },
  },
});
`.trimStart(),
  },
  stylesheets: [],
  scripts: ['https://cdn.jsdelivr.net/npm/vue@2'],
  cssPreset: '',
  imports: {},
  types: {},
};
