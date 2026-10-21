import type { Template } from '../../models';

export const scalaStarter: Template = {
  name: 'scala',
  title: window.deps.translateString('templates.starter.scala', 'Scala Starter'),
  thumbnail: 'assets/templates/scala.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/scala.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>
<script>
  // set initial input
  livecodes.scala.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.scala.loaded;

    // get initial output
    const initialOutput = livecodes.scala.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.scala.run(window.count);
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
    language: 'scala-wasm',
    content: `
@main def counter(): Unit =
  val title = "Scala"
  println(title)
  val line = scala.io.StdIn.readLine()
  val count = line.trim.toInt + 1
  println(count)
`.trimStart(),
  },
};
