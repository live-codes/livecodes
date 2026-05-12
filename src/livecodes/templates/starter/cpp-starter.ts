import type { Template } from '../../models';

export const cppStarter: Template = {
  name: 'cpp',
  aliases: ['c++'],
  title: window.deps.translateString('templates.starter.cpp', 'C++ Starter'),
  thumbnail: 'assets/templates/cpp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  // set initial input
  livecodes.cpp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.cpp.loaded;

    // get initial output
    const initialOutput = livecodes.cpp.output;
    update(initialOutput);

    button.onclick = async () => {
      // run with new input
      const {output, error, exitCode} = await livecodes.cpp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
</script>
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
    language: 'cpp',
    content: `
#include <iostream>
using namespace std;

int main() {
    char title[] = "C++";
    cout << title << endl;

    int count;
    cin >> count;
    count += 1;
    cout << count << endl;

    return 0;
}
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
