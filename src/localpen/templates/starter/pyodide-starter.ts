import { Template } from '../../models';

export const pyodideStarter: Template = {
  name: 'pyodide',
  title: 'Python (pyodide) Starter',
  thumbnail: 'assets/templates/python.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" src="{{ __localpen_baseUrl__ }}assets/templates/python.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
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
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'pyodide',
    content: `
import time
from js import document

title = document.getElementById('title')
counter = document.getElementById('counter')
button = document.getElementById('counter-button')

name = 'Python!'
title.innerHTML = f"Hello, {name}"

count = 0
def increment(ev):
    global count
    count += 1
    counter.innerHTML = str(count)

button.addEventListener("click", increment)
button.innerHTML = 'Click me'
button.disabled = False

# check console
current_time = int(time.strftime('%H'))
if current_time < 12 :
      print('Good morning')
elif 12 <= current_time < 18:
      print('Good afternoon')
else:
      print('Good evening')
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
