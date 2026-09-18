import type { Language, Template } from '../../models';

interface ClangWasmStarterOptions {
  name: Template['name'];
  language: Language;
  /** Name of the `livecodes` global this language's runner API is exposed as. */
  api: string;
  title: string;
  thumbnail: string;
  code: string;
}

const createClangWasmStarter = ({
  name,
  language,
  api,
  title,
  thumbnail,
  code,
}: ClangWasmStarterOptions): Template => ({
  name,
  title,
  thumbnail,
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}${thumbnail}" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.${api}.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.${api}.loaded;

    // get initial output
    const initialOutput = livecodes.${api}.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.${api}.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (!isNaN(Number(count))) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
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
    language,
    content: code,
  },
});

export const cWasmStarter: Template = createClangWasmStarter({
  name: 'c-wasm',
  language: 'c-wasm',
  api: 'c',
  title: window.deps.translateString('templates.starter.c-wasm', 'C (Wasm) Starter'),
  thumbnail: 'assets/templates/c.svg',
  code: `
#include <stdio.h>

int main(void) {
    char title[] = "C";
    printf("%s\\n", title);

    int count;
    scanf("%d", &count);
    count += 1;
    printf("%d\\n", count);

    return 0;
}
`.trimStart(),
});

export const cppWasmStarter: Template = {
  ...createClangWasmStarter({
    name: 'cpp-wasm',
    language: 'cpp-wasm',
    api: 'cpp',
    title: window.deps.translateString('templates.starter.cpp-wasm', 'C++ (Wasm) Starter'),
    thumbnail: 'assets/templates/cpp.svg',
    code: `
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
  }),
  aliases: ['clang', 'c++-wasm'],
};

export const objcWasmStarter: Template = createClangWasmStarter({
  name: 'objc-wasm',
  language: 'objc-wasm',
  api: 'objc',
  title: window.deps.translateString('templates.starter.objc-wasm', 'Objective-C (Wasm) Starter'),
  thumbnail: 'assets/templates/objective-c.svg',
  code: `
#import <stdio.h>
#import <objc/runtime.h>

__attribute__((objc_root_class))
@interface Counter {
    Class isa;
    int _count;
}
- (id)initWithCount:(int)count;
- (int)increment;
@end

@implementation Counter
- (id)initWithCount:(int)count {
    _count = count;
    return self;
}
- (int)increment {
    return ++_count;
}
@end

int main(void) {
    char title[] = "Objective-C";
    printf("%s\\n", title);

    int count;
    scanf("%d", &count);

    Counter *counter = class_createInstance(objc_getClass("Counter"), 0);
    counter = [counter initWithCount:count];
    printf("%d\\n", [counter increment]);

    return 0;
}
`.trimStart(),
});
