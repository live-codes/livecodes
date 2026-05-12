import type { Template } from '../../models';

export const pythonStarter: Template = {
  name: 'python',
  aliases: ['py'],
  title: window.deps.translateString('templates.starter.python', 'Python Starter'),
  thumbnail: 'assets/templates/python.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="header">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/python.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
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
    language: 'python',
    content: `
from browser import document
import time

title = 'Python'
document['header'].html = f"Hello, {title}!"

counter = 0

def increment(ev):
    global counter
    counter += 1
    document['counter'].html = str(counter)

document["counter-button"].bind("click", increment)

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
