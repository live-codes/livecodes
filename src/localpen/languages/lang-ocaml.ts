import { LanguageSpecs } from '../models';

export const ocaml: LanguageSpecs = {
  name: 'ocaml',
  title: 'OCaml',
  info: `
  <h3>OCaml</h3>
  <div>OCaml is an industrial-strength programming language supporting functional, imperative and object-oriented styles.</div>
  <div>ReScript compiler is used here to compile OCaml to JavaScript.</div>
  <ul>
    <li><a href="https://ocaml.org/" target="_blank" rel="noopener">OCaml website</a></li>
    <li><a href="https://ocaml.org/docs/" target="_blank" rel="noopener">OCaml documentation</a></li>
    <li><a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a></li>
    <!-- <li><a href="#">OCaml usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: 'rescript',
  extensions: ['ml', 'mli'],
  editor: 'script',
  editorLanguage: 'javascript',
};
