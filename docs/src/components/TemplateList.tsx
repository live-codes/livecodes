import { appUrl } from '../utils';
import styles from './TemplateList.module.css';

const templates = [
  { name: 'blank', title: 'Blank Project', thumbnail: 'blank.svg' },
  { name: 'javascript', title: 'JavaScript Starter', thumbnail: 'javascript.svg' },
  { name: 'typescript', title: 'TypeScript Starter', thumbnail: 'typescript.svg' },
  { name: 'react', title: 'React Starter', thumbnail: 'react.svg' },
  { name: 'react-native', title: 'React Native Starter', thumbnail: 'react.svg' },
  { name: 'vue', title: 'Vue 3 SFC Starter', thumbnail: 'vue.svg' },
  { name: 'vue2', title: 'Vue 2 Starter', thumbnail: 'vue.svg' },
  { name: 'angular', title: 'Angular Starter', thumbnail: 'angular.svg' },
  { name: 'preact', title: 'Preact Starter', thumbnail: 'preact.svg' },
  { name: 'svelte', title: 'Svelte Starter', thumbnail: 'svelte.svg' },
  { name: 'solid', title: 'Solid Starter', thumbnail: 'solid.svg' },
  { name: 'lit', title: 'Lit Starter', thumbnail: 'lit.svg' },
  { name: 'stencil', title: 'Stencil Starter', thumbnail: 'stencil.png' },
  { name: 'mdx', title: 'MDX Starter', thumbnail: 'mdx.svg' },
  { name: 'tailwindcss', title: 'Tailwind CSS Starter', thumbnail: 'tailwindcss.svg' },
  { name: 'shadcn-ui', title: 'shadcn/ui Starter', thumbnail: 'shadcn-ui.svg' },
  { name: 'daisyui', title: 'daisyUI Starter', thumbnail: 'daisyui.svg' },
  { name: 'bootstrap', title: 'Bootstrap Starter', thumbnail: 'bootstrap.svg' },
  { name: 'astro', title: 'Astro Starter', thumbnail: 'astro.svg' },
  { name: 'riot', title: 'Riot.js Starter', thumbnail: 'riot.svg' },
  { name: 'malina', title: 'Malina.js Starter', thumbnail: 'malina.svg' },
  { name: 'jquery', title: 'jQuery Starter', thumbnail: 'jquery.svg' },
  { name: 'backbone', title: 'Backbone Starter', thumbnail: 'backbone.svg' },
  { name: 'knockout', title: 'Knockout Starter', thumbnail: 'knockout.svg' },
  { name: 'jest', title: 'Jest Starter', thumbnail: 'jest.svg' },
  { name: 'jest-react', title: 'Jest/React Starter', thumbnail: 'jest.svg' },
  { name: 'coffeescript', title: 'CoffeeScript Starter', thumbnail: 'coffeescript.svg' },
  { name: 'livescript', title: 'LiveScript Starter', thumbnail: 'livescript.svg' },
  { name: 'civet', title: 'Civet Starter', thumbnail: 'civet.png' },
  { name: 'clio', title: 'Clio Starter', thumbnail: 'clio.png' },
  { name: 'imba', title: 'Imba Starter', thumbnail: 'imba.svg' },
  { name: 'rescript', title: 'ReScript Starter', thumbnail: 'rescript.png' },
  { name: 'reason', title: 'Reason Starter', thumbnail: 'reason.svg' },
  { name: 'ocaml', title: 'Ocaml Starter', thumbnail: 'ocaml.svg' },
  { name: 'python', title: 'Python Starter', thumbnail: 'python.svg' },
  { name: 'python-wasm', title: 'Python (Wasm) Starter', thumbnail: 'python.svg' },
  { name: 'r', title: 'R Starter', thumbnail: 'r.svg' },
  { name: 'ruby', title: 'Ruby Starter', thumbnail: 'ruby.svg' },
  { name: 'ruby-wasm', title: 'Ruby (Wasm) Starter', thumbnail: 'ruby.svg' },
  { name: 'go', title: 'Go Starter', thumbnail: 'go.svg' },
  { name: 'go-wasm', title: 'Go (Wasm) Starter', thumbnail: 'go.svg' },
  { name: 'php', title: 'PHP Starter', thumbnail: 'php.svg' },
  { name: 'php-wasm', title: 'PHP (Wasm) Starter', thumbnail: 'php.svg' },
  { name: 'cpp', title: 'C++ Starter', thumbnail: 'cpp.svg' },
  { name: 'cpp-wasm', title: 'C++ (Wasm) Starter', thumbnail: 'cpp.svg' },
  { name: 'java', title: 'Java Starter', thumbnail: 'java.svg' },
  { name: 'csharp-wasm', title: 'C# (Wasm)', thumbnail: 'csharp.svg' },
  { name: 'perl', title: 'Perl Starter', thumbnail: 'perl.svg' },
  { name: 'lua', title: 'Lua Starter', thumbnail: 'lua.svg' },
  { name: 'lua-wasm', title: 'Lua (wasm) Starter', thumbnail: 'lua.svg' },
  { name: 'teal', title: 'Teal Starter', thumbnail: 'teal.png' },
  { name: 'fennel', title: 'Fennel Starter', thumbnail: 'fennel.svg' },
  { name: 'julia', title: 'Julia Starter', thumbnail: 'julia.svg' },
  { name: 'scheme', title: 'Scheme Starter', thumbnail: 'scheme.svg' },
  { name: 'commonlisp', title: 'Common Lisp Starter', thumbnail: 'commonlisp.svg' },
  { name: 'clojurescript', title: 'ClojureScript Starter', thumbnail: 'cljs.svg' },
  { name: 'gleam', title: 'Gleam Starter', thumbnail: 'gleam.svg' },
  { name: 'tcl', title: 'Tcl Starter', thumbnail: 'tcl.svg' },
  { name: 'markdown', title: 'Markdown Starter', thumbnail: 'markdown.svg' },
  { name: 'assemblyscript', title: 'AssemblyScript Starter', thumbnail: 'assemblyscript.svg' },
  { name: 'wat', title: 'WebAssembly Text Starter', thumbnail: 'webassembly.svg' },
  { name: 'sql', title: 'SQL Starter', thumbnail: 'sqlite.svg' },
  { name: 'postgresql', title: 'PostgreSQL Starter', thumbnail: 'postgresql.svg' },
  { name: 'prolog', title: 'Prolog Starter', thumbnail: 'tau-prolog.svg' },
  { name: 'minizinc', title: 'MiniZinc Starter', thumbnail: 'minizinc.png' },
  { name: 'blockly', title: 'Blockly Starter', thumbnail: 'blockly.svg' },
  { name: 'diagrams', title: 'Diagrams Starter', thumbnail: 'diagrams.svg' },
];

export default function TemplateList() {
  return (
    <ul className={styles.list}>
      {templates.map((t) => (
        <li key={t.name}>
          <a href={appUrl + '/?template=' + t.name} target="_blank">
            <img src={appUrl + '/livecodes/assets/templates/' + t.thumbnail} />
            <div>{t.title}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}
