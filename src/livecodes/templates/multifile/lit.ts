import type { Template } from '../../models';

export const lit: Template = {
  name: 'multifile-lit',
  title: window.deps.translateString('templates.multifile.lit', 'Lit Starter'),
  thumbnail: 'assets/templates/lit.svg',
  mainFile: 'index.html',
  activeEditor: 'src/my-element.js',
  files: [
    {
      filename: 'index.html',
      language: 'html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lit</title>
    <link rel="stylesheet" href="./src/index.css" />
    <script type="module" src="src/my-element.js"></script>
  </head>
  <body>
    <my-element>
      <h1>Lit</h1>
    </my-element>
  </body>
</html>
`,
    },
    {
      filename: 'src/index.css',
      language: 'css',
      content: `:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
}
`,
    },
    {
      filename: 'src/my-element.js',
      language: 'javascript',
      content: `import { LitElement, css, html } from "lit";
import litLogo from "./assets/lit.svg";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.docsHint = "Click on the Lit logo to learn more";
    this.count = 0;
  }

  render() {
    return html\`
      <div>
        <a href="https://lit.dev" target="_blank">
          <img src=\${litLogo} class="logo" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=\${this._onClick} part="button">
          count is \${this.count}
        </button>
      </div>
      <p class="read-the-docs">\${this.docsHint}</p>
    \`;
  }

  _onClick() {
    this.count++;
  }

  static get styles() {
    return css\`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    \`;
  }
}

window.customElements.define("my-element", MyElement);
`,
    },
    {
      filename: 'src/assets/lit.svg',
      language: 'svg',
      content: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="25.6" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 320"><path fill="#00E8FF" d="m64 192l25.926-44.727l38.233-19.114l63.974 63.974l10.833 61.754L192 320l-64-64l-38.074-25.615z"></path><path fill="#283198" d="M128 256V128l64-64v128l-64 64ZM0 256l64 64l9.202-60.602L64 192l-37.542 23.71L0 256Z"></path><path fill="#324FFF" d="M64 192V64l64-64v128l-64 64Zm128 128V192l64-64v128l-64 64ZM0 256V128l64 64l-64 64Z"></path><path fill="#0FF" d="M64 320V192l64 64z"></path></svg>
`,
    },
  ],
};
