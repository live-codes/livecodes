import { LanguageSpecs } from '../models';
import { formatterFactory as rescriptFormatterFactory } from './lang-rescript';

export const reason: LanguageSpecs = {
  name: 'reason',
  title: 'Reason',
  info: `
  <h3>Reason</h3>
  <div>Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.</div>
  <div>ReScript compiler is used here to compile Reason to JavaScript.</div>
  <ul>
    <li><a href="https://reasonml.github.io/" target="_blank" rel="noopener">Reason website</a></li>
    <li><a href="https://reasonml.github.io/docs/en/what-and-why" target="_blank" rel="noopener">Reason documentation</a></li>
    <li><a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a></li>
    <!-- <li><a href="#">Reason usage in LocalPen</a></li> -->
  </ul>
  `,
  formatter: {
    factory: rescriptFormatterFactory,
  },
  compiler: 'rescript',
  extensions: ['re', 'rei'],
  editor: 'script',
  editorLanguage: 'javascript',
};
