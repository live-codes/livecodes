import type { Template } from '../../models';

export const zigWasmStarter: Template = {
  name: 'zig-wasm',
  title: 'Zig (Wasm) Starter',
  thumbnail: 'assets/templates/zig.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="http://127.0.0.1:8080/livecodes/assets/templates/zig.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.zig.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.zig.loaded;

    // get initial output
    const initialOutput = livecodes.zig.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.zig.run(window.count);
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
    language: 'zig-wasm',
    content: `
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    const stdin = std.io.getStdIn().reader();

    const title = "Zig";
    try stdout.print("{s}\\n", .{title});

    var buf: [100]u8 = undefined;
    const input = try stdin.readUntilDelimiterOrEof(&buf, '\\n');
    const count = try std.fmt.parseInt(i32, input.?, 10);
    try stdout.print("{}\\n", .{count + 1});

}
`.trimStart(),
  },
};
