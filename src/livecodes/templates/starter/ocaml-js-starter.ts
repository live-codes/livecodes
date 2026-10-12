import type { Template } from '../../models';

export const ocamlJsStarter: Template = {
  name: 'ocaml-js',
  title: window.deps.translateString('templates.starter.ocaml-js', 'OCaml (JS) Starter'),
  thumbnail: 'assets/templates/ocaml.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ocaml.svg" />
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
    language: 'ocaml-js',
    content: `
open Js_of_ocaml

let () =
  let select id =
    Js.Unsafe.meth_call Dom_html.document "querySelector"
      [| Js.Unsafe.inject (Js.string ("#" ^ id)) |]
  in
  let title = select "title" in
  let counter = select "counter" in
  let button = select "counter-button" in

  Js.Unsafe.set title "innerText" (Js.string "OCaml");
  let count = ref 0 in

  ignore
    (Js.Unsafe.meth_call button "addEventListener"
       [|
         Js.Unsafe.inject (Js.string "click");
         Js.Unsafe.inject
           (Js.wrap_callback (fun _ ->
                incr count;
                Js.Unsafe.set counter "innerText"
                  (Js.string (string_of_int !count))));
       |])
`.trimStart(),
  },
};
