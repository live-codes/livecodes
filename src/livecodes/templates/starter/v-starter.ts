import { Template } from '../../models';

export const vStarter: Template = {
  name: 'v',
  title: 'V Starter',
  thumbnail: 'assets/templates/v.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/v.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  addEventListener('load', () => {
    const title = document.querySelector('#title');
    const counter = document.querySelector('#counter');
    const button = document.querySelector('#counter-button');
    let count = 0;

    livecodes.v.run(exports => {
      const getTitle = exports.get_title;
      title.innerText = getTitle();
    });

    button.addEventListener('click', () => {
      livecodes.v.run(exports => {
        const increment = exports.increment;
        count = increment(count);
        counter.innerText = count;
      });
    });
  });
</script>`.trimStart(),
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
    language: 'v',
    content: `
pub fn get_title() string {
  return "Hello V!"
}

pub fn increment(num int) int {
  return num + 1
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
