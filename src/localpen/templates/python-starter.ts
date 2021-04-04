import { Template } from '../models';

export const pythonStarter: Template = {
  title: 'Python Starter',
  thumbnail: 'assets/templates/python.svg',
  language: 'python',
  markup: {
    language: 'html',
    content: `
<div id="root">
  <h1 id="header">Hello, World!</h1>
  <img src="/localpen/assets/templates/python.svg" class="logo" />
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
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'python',
    content: `
from browser import document
import time

title = 'Python!'
document['header'].html = f"Hello, {title}"

counter = 0

def increment(ev):
    global counter
    counter += 1
    document['counter'].html = str(counter)

document["counter-button"].bind("click", increment)

# check console
currentTime = int(time.strftime('%H'))
if currentTime < 12 :
      print('Good morning')
elif 12 <= currentTime < 18:
      print('Good afternoon')
else:
      print('Good evening')
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  modules: [],
};
