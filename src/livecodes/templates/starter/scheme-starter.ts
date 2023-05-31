import type { Template } from '../../models';

export const schemeStarter: Template = {
  name: 'scheme',
  title: 'Scheme Starter',
  thumbnail: 'assets/templates/scheme.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/scheme.svg" />
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
    language: 'scheme',
    content: `
(let ((title "Scheme"))
  (set-content! "#title" title))

(let ((counter 0))
  (add-handler! "#counter-button" "click"
    (lambda (ev)
      (set! counter (+ counter 1))
      (set-content! "#counter" (number->string counter)))))

; check console
(let ((time-now (date-hour (current-date))))
  (console-log
    (cond ((< time-now 12) "Good morning")
          ((< time-now 18) "Good afternoon")
          (else "Good evening"))))
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
