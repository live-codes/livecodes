import { Template } from '../../models';

export const cppStarter: Template = {
  name: 'cpp',
  title: 'C++ Starter',
  thumbnail: 'assets/templates/cpp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  // you can set initial input
  // livecodes.cpp.input = 10;

  const name = document.querySelector("#name");
  const counter = document.querySelector("#counter");
  const button = document.querySelector("#counter-button");
  let count;
  let title;

  (async () => {
    // wait till loaded
    await livecodes.cpp.loaded;

    const getOutput = () => {
      [title, count] = livecodes.cpp.output.split('\\n');
      counter.textContent = count;
      name.textContent = title;
    }

    getOutput();

    button.addEventListener("click", async () => {
      // run with new input
      const {output, exitCode, error} = await livecodes.cpp.run(count);
      getOutput();
      console.log('Exit code: ' + exitCode);
    });
  })();
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
    if (count == (int)count) {
        count += 1;
    } else {
        count = 0;
    }
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
