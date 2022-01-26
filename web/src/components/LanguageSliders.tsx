import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link';
import styles from './LanguageSliders.module.css';

const getRandomItem = (list: any[]) => ({
  ...list[Math.floor(Math.random() * list.length)],
  id: Math.random(),
});

export default function Sliders() {
  const lists = {
    markup: [
      { name: 'html', title: 'HTML' },
      { name: 'markdown', title: 'Markdown' },
      { name: 'mdx', title: 'MDX' },
      { name: 'astro', title: 'Astro' },
      { name: 'pug', title: 'Pug' },
      { name: 'asciidoc', title: 'AsciiDoc' },
      { name: 'haml', title: 'Haml' },
      { name: 'handlebars', title: 'Handlebars' },
      { name: 'ejs', title: 'EJS' },
      { name: 'nunjucks', title: 'Nunjucks' },
      { name: 'liquid', title: 'Liquid' },
      { name: 'dot', title: 'doT' },
      { name: 'twig', title: 'Twig' },
      { name: 'graph', title: 'Graph' },
      { name: 'richtext', title: 'Rich Text' },
    ],
    style: [
      { name: 'css', title: 'CSS' },
      { name: 'scss', title: 'SCSS' },
      { name: 'sass', title: 'Sass' },
      { name: 'less', title: 'Less' },
      { name: 'stylus', title: 'Stylus' },
    ],
    script: [
      { name: 'javascript', title: 'JS' },
      { name: 'babel', title: 'Babel' },
      { name: 'typescript', title: 'Typescript' },
      { name: 'jsx', title: 'JSX' },
      { name: 'tsx', title: 'TSX' },
      { name: 'react-native', title: 'React Native' },
      { name: 'react-native-tsx', title: 'React Native (TSX)' },
      { name: 'vue', title: 'Vue 3' },
      { name: 'vue2', title: 'Vue 2' },
      { name: 'svelte', title: 'Svelte' },
      { name: 'stencil', title: 'Stencil' },
      { name: 'solid', title: 'Solid' },
      { name: 'solid.tsx', title: 'Solid (TS)' },
      { name: 'riot', title: 'Riot.js' },
      { name: 'malina', title: 'Malina.js' },
      { name: 'coffeescript', title: 'CoffeeScript' },
      { name: 'livescript', title: 'LiveScript' },
      { name: 'clio', title: 'Clio' },
      { name: 'rescript', title: 'ReScript' },
      { name: 'reason', title: 'Reason' },
      { name: 'ocaml', title: 'OCaml' },
      { name: 'python', title: 'Python' },
      { name: 'pyodide', title: 'Pyodide' },
      { name: 'ruby', title: 'Ruby' },
      { name: 'go', title: 'Go' },
      { name: 'php', title: 'PHP' },
      { name: 'cpp', title: 'C++' },
      { name: 'clang', title: 'C++ (Clang)' },
      { name: 'perl', title: 'Perl' },
      { name: 'lua', title: 'Lua' },
      { name: 'julia', title: 'Julia' },
      { name: 'scheme', title: 'Scheme' },
      { name: 'commonlisp', title: 'Lisp' },
      { name: 'tcl', title: 'Tcl' },
      { name: 'assemblyscript', title: 'AssemblyScript' },
      { name: 'wat', title: 'WAT' },
      { name: 'sql', title: 'SQL' },
      { name: 'prolog', title: 'Prolog' },
      { name: 'blockly', title: 'Blockly' },
    ],
  };
  const slides = ['markup', 'style', 'script'];
  const flipper = {};
  const slideLang = {
    markup: 'html',
    style: 'css',
    script: 'js',
  };

  const update = (slide: 'markup' | 'style' | 'script', lang: string) => {
    slideLang[slide] = lang;
  };

  const open = (random: boolean) => {
    const query = random
      ? getRandomItem(lists.markup).name +
        '&' +
        getRandomItem(lists.style).name +
        '&' +
        getRandomItem(lists.script).name
      : slideLang.markup + '&' + slideLang.style + '&' + slideLang.script;

    window.open(location.origin + '?' + query, '_blank');
  };

  setInterval(() => {
    const slide = slides[Math.floor(Math.random() * slides.length)];
    if (typeof flipper[slide] !== 'function') return;
    flipper[slide]();
  }, 2000);

  return (
    <div className={styles.sliders}>
      <Slider slide="markup" lists={lists} cb={update} flipper={flipper} />
      <span>+</span>
      <Slider slide="style" lists={lists} cb={update} flipper={flipper} />
      <span>+</span>
      <Slider slide="script" lists={lists} cb={update} flipper={flipper} />
      <div className={styles.buttons}>
        <Link
          className="button button--outline button--primary button--lg"
          onClick={() => open(false)}
        >
          Let's Code 🚀
        </Link>
        <Link
          className="button button--outline button--warning button--lg"
          onClick={() => open(true)}
        >
          Surprise me!
        </Link>
      </div>
    </div>
  );
}

function Slider(props: { lists: any; slide: any; cb: any; flipper: any }) {
  const { lists, slide, cb, flipper } = props;
  const list = lists[slide];

  const [langs, setLangs] = useState([
    getRandomItem(list.slice(1)),
    { ...list[0], id: Math.random() },
    getRandomItem(list.slice(1)),
  ]);

  useEffect(
    () => () => {
      setLangs([]);
    },
    [],
  );

  flipper[slide] = () => {
    setLangs([
      ...langs.slice(-2),
      getRandomItem(list.filter((item) => item.name !== langs[2].name)),
    ]);
    cb(slide, langs[2].name);
  };

  return (
    <div className={styles.slider}>
      {langs.map((item, index) => (
        <div
          key={item.id}
          className={
            index === langs.length - 1
              ? styles.hidden
              : index === langs.length - 2
              ? styles.current
              : ''
          }
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
