import type { Template } from '../../models';

export const ocamlStarter: Template = {
  name: 'ocaml',
  title: 'Ocaml Starter',
  thumbnail: 'assets/templates/ocaml.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<div id="app">Loading...</div>\n',
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
  width: 250px;
}
`.trimStart(),
  },
  script: {
    language: 'ocaml',
    content: `
module App =
  struct
    let make ~name  =
      let title = "Hello, " ^ name ^ "!" in

      let (count,setCount) = React.useState (fun ()  -> 0) in

      let times =
        match count with
        | 1 -> "once"
        | 2 -> "twice"
        | n -> (string_of_int n) ^ " times" in

      ((div ~className: "container"
          ~children:[((h1 ~children: [React.string title] ())[@JSX ]);
                    ((img ~className: "logo"
                        ~alt: "logo"
                        ~src: "{{ __livecodes_baseUrl__ }}assets/templates/ocaml.svg"
                        ~children:[] ())[@JSX ]);
                    ((p
                        ~children:[React.string ("You clicked "
                                                ^ times)] ())[@JSX ]);
                    ((button
                        ~onClick:(fun _  -> setCount (fun _  -> count + 1))
                        ~children:[React.string "Click me"] ())
                    [@JSX ])] ())[@JSX ])[@@react.component ]
  end

let _ =
  match ReactDOM.querySelector "#app" with
  | ((Some (app))[@explicit_arity ]) ->
      ReactDOM.render
        ((App.createElement
            ~name: "OCaml"
            ~children:[] ())[@JSX ]) app
  | None  -> ()

let _ = print_endline "Hello, OCaml!"
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
