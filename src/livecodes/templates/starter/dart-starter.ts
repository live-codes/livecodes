import type { Template } from '../../models';

export const dartStarter: Template = {
  name: 'dart',
  aliases: ['dartlang'],
  title: window.deps.translateString('templates.starter.dart', 'Dart Starter'),
  thumbnail: 'assets/templates/dart.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/dart.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
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
    language: 'dart',
    content: `
import 'dart:js_interop';

@JS('document')
external Document get document;

extension type Document(JSObject _) implements JSObject {
  external Element? querySelector(String selectors);
}

extension type Element(JSObject _) implements JSObject {
  external set textContent(String value);
  external set disabled(bool value);
  external set onclick(JSFunction? value);
}

void main() {
  document.querySelector('#name')?.textContent = 'Dart';

  final counter = document.querySelector('#counter');
  final button = document.querySelector('#counter-button');
  if (counter == null || button == null) return;

  var count = 0;
  button.disabled = false;
  button.textContent = 'Click me';
  button.onclick = (JSAny? _) {
    count++;
    counter.textContent = '\$count';
  }.toJS;
}
`.trimStart(),
  },
};
