import { LanguageSpecs } from '../models';

export const sass: LanguageSpecs = {
  name: 'sass',
  title: 'Sass',
  info: `
  <h3>Sass</h3>
  <div>Syntactically Awesome Style Sheets.</div>
  <ul>
    <li><a href="https://sass-lang.com/" target="_blank">Sass official website</a></li>
    <li><a href="https://sass-lang.com/documentation" target="_blank">Sass documentation</a></li>
    <li><a href="https://sass-lang.com/documentation/syntax#the-indented-syntax" target="_blank">Sass (the indented) syntax</a></li>
    <!-- <li><a href="#">Sass usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: 'scss',
  extensions: ['sass'],
  editor: 'style',
};
