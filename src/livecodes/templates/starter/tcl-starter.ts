import type { Template } from '../../models';

export const tclStarter: Template = {
  name: 'tcl',
  title: 'Tcl Starter',
  thumbnail: 'assets/templates/tcl.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tcl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set input
  livecodes.tcl.input = "-1";

  addEventListener("load", async () => {
    const button = document.querySelector("#counter-button");
    // wait till loaded
    await livecodes.tcl.loaded;
    button.innerText = "Click me";
    button.disabled = false;

    button.onclick = async () => {
      const {output, error} = await livecodes.tcl.run();
    };
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
    language: 'tcl',
    content: `
set title "Tcl"
::wacl::dom attr "#name" innerText $title

set input [gets stdin]
if {[info exists count]} {
  incr count
} else {
  set count [expr $input + 1]
}
::wacl::dom attr "#counter" innerText $count
puts $count
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
