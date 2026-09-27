import type { Template } from '../../models';

export const cljsSelfHostedStarter: Template = {
  name: 'clojurescript-selfhosted',
  aliases: ['cljs-selfhosted'],
  title: window.deps.translateString(
    'templates.starter.cljs-selfhosted',
    'CLJS (self-hosted) Starter',
  ),
  thumbnail: 'assets/templates/cljs.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cljs.svg" />
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
    language: 'clojurescript-selfhosted',
    content: `
(ns starter.core)

;; macros are evaluated at compile time
(defmacro unless
  "Evaluates body unless test is truthy."
  [test & body]
  \`(when-not ~test ~@body))

(defn set-text! [selector text]
  (set! (.-innerText (js/document.querySelector selector)) text))

(def title "ClojureScript")

(set-text! "#title" title)

(def counter (atom 0))

;; you can use JS interop to wire up DOM events
(.addEventListener
  (js/document.querySelector "#counter-button")
  "click"
  (fn [_]
    (swap! counter inc)
    (set-text! "#counter" (str @counter))))

;; check console
(unless (empty? title)
  (js/console.log (str "Hello, " title "!")))
`.trimStart(),
  },
};
