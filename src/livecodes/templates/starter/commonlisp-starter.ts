import type { Template } from '../../models';

export const commonlispStarter: Template = {
  name: 'commonlisp',
  aliases: ['lisp'],
  title: window.deps.translateString('templates.starter.commonlisp', 'Common Lisp Starter'),
  thumbnail: 'assets/templates/commonlisp.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/commonlisp.svg" />
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
    language: 'commonlisp',
    content: `
(defun set-attribute (&key selector attribute value)
  (let ((node
         (#j:document:querySelector selector)))
    (setf (jscl::oget node attribute) value)
    node))

(let ((title "Common Lisp"))
  (set-attribute :selector "#title" :attribute "innerHTML"
      :value (format nil "Hello, ~A!" title)))

(let ((counter 0))
  (set-attribute :selector "#counter-button" :attribute "onclick"
    :value #'(lambda (ev)
              (setf counter (+ counter 1))
              (set-attribute :selector "#counter" :attribute "innerHTML"
               :value counter))))

(#j:console:clear)
(write "Hello, Common Lisp!")
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
