import type { Template } from '../../models';

export const riotStarter: Template = {
  name: 'riot',
  title: 'Riot.js Starter',
  thumbnail: 'assets/templates/riot.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<counter title="Riot.js"></counter>

<script>
  livecodes.templateData = {
    url: 'https://riot.js.org/'
  }
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'riot',
    content: `
<counter>
  <div class="container">
    <h1>Hello, { props.title }!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/riot.svg" />
    <p>You clicked { state.count } times.</p>
    <button onclick="{ increment }">Click me</button>
    <div class="footer">
      <a href="{ props.url }" target="_blank">Riot.js Website</a>
    </div>
  </div>

  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .footer {
      font: 0.8em sans-serif;
      margin: 1.5em;
    }
  </style>

  <script>
    export default {
      onBeforeMount(props, state) {
        this.state = {
          count: 0,
        };
      },
      increment(e) {
        e.preventDefault();
        this.update({
          count: this.state.count + 1,
        });
      },
    };
  </script>
</counter>
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
