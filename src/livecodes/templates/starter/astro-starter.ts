import { Template } from '../../models';

export const astroStarter: Template = {
  name: 'astro',
  title: 'Astro Starter',
  thumbnail: 'assets/templates/astro.svg',
  activeEditor: 'markup',
  markup: {
    language: 'astro',
    content: `
---
const title = "Astro";
const url = "https://astro.build/";
const items = ["Dog", "Cat", "Platipus"];
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
  </style>
</head>

<body>
  <div class="container">
    <h1>Hello, {title}!</h1>
    <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/astro.svg" />
    <p>You clicked <span id="counter">0</span> times.</p>
    <button id="counter-button">Click me</button>
  </div>
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  <script>
    const button = document.querySelector("#counter-button");
    const counter = document.querySelector("#counter");
    let count = 0
    button.addEventListener("click", () => {
        count += 1;
        counter.textContent = count;
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
