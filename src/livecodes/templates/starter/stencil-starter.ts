import type { Template } from '../../models';

export const stencilStarter: Template = {
  name: 'stencil',
  title: 'Stencil Starter',
  thumbnail: 'assets/templates/stencil.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<my-app title="Stencil"></my-app>\n',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'stencil',
    content: `
import { Component, Prop, h, State } from "@stencil/core";

@Component({
  tag: "my-app",
  styles: \`
    my-app,
    button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`,
})
export class App {
  @Prop() title: string;
  @State() count = 0;

  increment = () => {
    this.count += 1;
  };

  render() {
    return (
      <div class="container">
        <h1>Hello, {this.title}!</h1>
        <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/stencil.png" />
        <p>You clicked {this.count} times.</p>
        <button onClick={this.increment}>Click me</button>
      </div>
    );
  }
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
