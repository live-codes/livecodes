import type { Template } from '../../models';

export const odinWasmStarter: Template = {
  name: 'odin-wasm',
  aliases: ['odin'],
  title: window.deps.translateString('templates.starter.odin-wasm', 'Odin Starter'),
  thumbnail: 'assets/templates/odin.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/odin.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.odinWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.odinWasm.loaded;

    // get initial output
    const initialOutput = livecodes.odinWasm.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.odinWasm.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = (output || '').split('\\n');

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
    language: 'odin',
    content: `
package main

import "core:bufio"
import "core:fmt"
import "core:os"
import "core:strconv"
import "core:strings"

main :: proc() {
	reader: bufio.Reader
	bufio.reader_init(&reader, os.to_reader(os.stdin))
	defer bufio.reader_destroy(&reader)

	fmt.println("Odin")

	count := -1
	for {
		line, err := bufio.reader_read_string(&reader, '\\n')
		// The last line may have no trailing newline, and that comes back as an
		// error together with the data — read the data first, then stop.
		if len(line) == 0 {
			break
		}
		if value, ok := strconv.parse_int(strings.trim_space(line)); ok {
			count = value
		}
		if err != nil {
			break
		}
	}
	fmt.println(count + 1)
}
`.trimStart(),
  },
};
