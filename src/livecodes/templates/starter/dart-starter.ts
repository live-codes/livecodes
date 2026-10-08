import type { Template } from '../../models';

/**
 * The Dart starter. The code is compiled to JavaScript in the compile worker and the bundle runs
 * in the result page, so the markup and styles are just the page around it; what the program
 * prints goes to the console.
 */
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
  <h1>Hello from Dart</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/dart.svg" />
  <p>This program is compiled to JavaScript and run in this page.</p>
  <p>Open the console to see its output.</p>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container {
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
void main() {
  print('Hello from Dart!');

  final fibonacci = <int>[0, 1];
  while (fibonacci.length < 10) {
    fibonacci.add(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
  }
  print('Fibonacci: \$fibonacci');

  final squares = {for (var i = 1; i <= 5; i++) i: i * i};
  for (final entry in squares.entries) {
    print('\${entry.key}² = \${entry.value}');
  }
}
`.trimStart(),
  },
  tools: {
    enabled: 'all',
    active: 'console',
    status: 'open',
  },
};
