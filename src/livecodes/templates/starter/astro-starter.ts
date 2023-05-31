import type { Template } from '../../models';

export const astroStarter: Template = {
  name: 'astro',
  title: 'Astro Starter',
  thumbnail: 'assets/templates/astro.svg',
  activeEditor: 'markup',
  markup: {
    language: 'astro',
    content: `
---
import {format} from 'date-fns';

const title = "Astro";

const builtAt: Date = new Date();
const builtAtFormatted = format(builtAt, 'MMMM dd, yyyy -- H:mm:ss.SSS');
---
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Welcome to Astro</title>
  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .note {
      margin: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #E4E5E6;
      border: 1px solid #BBB;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Hello, {title}!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/astro.svg" />
    <p>You clicked <span id="counter">0</span> times.</p>
    <button id="counter-button">Click me</button>
    <p class="note">
      <strong>RENDERED AT:</strong><br/>
      {builtAtFormatted}
    </p>
  </div>
  <script>
    let count = 0
    document
      .querySelector("#counter-button")
      .addEventListener("click", () => {
        count += 1;
        document.querySelector("#counter").innerText = count;
    });
  </script>
</body>

</html>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'javascript',
    content: '',
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
