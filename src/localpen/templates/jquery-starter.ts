import { Template } from '../models';

export const jqueryStarter: Template = {
  title: 'jQuery Starter',
  thumbnail: 'assets/templates/jquery.svg',
  language: 'js',
  markup: {
    language: 'html',
    content: `
<div id="root">
  <h1>Hello, jQuery</h1>
  <img src="/localpen/assets/templates/jquery.svg" class="logo" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
#root,
#root button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 300px;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `
import $ from "jquery";

let count = 0;
$("#counter-button").click(() => {
  count += 1;
  $("#counter").text(count);
});
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
};
