import type { Template } from '../../models';

export const knockoutStarter: Template = {
  name: 'knockout',
  title: 'Knockout Starter',
  thumbnail: 'assets/templates/knockout.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span data-bind="text: title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/knockout.svg" />
  <p>You clicked <span data-bind="text: numberOfClicks">0</span> times.</p>
  <button data-bind="click: registerClick">Click me</button>
</div>
`.trimStart(),
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
  width: 250px;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `
import ko from "knockout";

class ClickCounterViewModel {
  constructor() {
    this.title = 'Knockout';
    this.numberOfClicks = ko.observable(0);

    this.registerClick = function () {
      this.numberOfClicks(this.numberOfClicks() + 1);
    };
  }
}

ko.applyBindings(new ClickCounterViewModel());
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
