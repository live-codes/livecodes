import type { Template } from '../../models';

export const rippleStarter: Template = {
  name: 'ripple',
  title: window.deps.translateString('templates.starter.ripple', 'Ripple Starter'),
  thumbnail: 'assets/templates/ripple.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'ripple',
    content: `
import { track } from 'ripple';

component Counter(props: { name: string }) {
  <div class="container">
    <h1>{\`Hello, \${props.@name}!\`}</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ripple.png" />

    const count = track(0);
    <p>{\`You clicked \${@count} times.\`}</p>
    <button onClick={() => @count++}>{'Click me'}</button>
  </div>

  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 100px;
    }
  </style>
}

export default component App() {
  const name = track("World");
  setTimeout(() => @name = "Ripple", 2000);
  <Counter {name} />
}
`.trimStart(),
  },
};
