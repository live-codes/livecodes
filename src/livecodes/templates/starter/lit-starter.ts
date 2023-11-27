import type { Template } from '../../models';

export const litStarter: Template = {
  name: 'lit',
  title: 'Lit Starter',
  thumbnail: 'assets/templates/lit.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<my-counter name="Lit"></my-counter>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'typescript',
    content: `
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SignalWatcher, signal } from "@lit-labs/preact-signals";

@customElement("my-counter")
export class SignalExample extends SignalWatcher(LitElement) {
  @property()
  name = "World";

  count = signal(0);

  private _onClick() {
    this.count.value = this.count.value + 1;
  }

  render() {
    return html\`
      <h1>Hello, \${this.name}!</h1>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lit.svg" />
      <p>You clicked \${this.count.value} times.</p>
      <button @click=\${this._onClick}>Click me</button>
    \`;
  }

  static styles = css\`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    :host, button {
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`;
}
`.trimStart(),
  },
  customSettings: {
    typescript: {
      experimentalDecorators: true,
      useDefineForClassFields: false,
    },
  },
};
