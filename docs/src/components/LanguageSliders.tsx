/* eslint-disable import/no-unresolved */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Link from '@docusaurus/Link';
import { useEffect, useState } from 'react';
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
      { name: 'mustache', title: 'Mustache' },
      { name: 'handlebars', title: 'Handlebars' },
      { name: 'ejs', title: 'EJS' },
      { name: 'eta', title: 'Eta' },
      { name: 'nunjucks', title: 'Nunjucks' },
      { name: 'liquid', title: 'Liquid' },
      { name: 'dot', title: 'doT' },
      { name: 'twig', title: 'Twig' },
      { name: 'vento', title: 'Vento' },
      { name: 'art-template', title: 'art-template' },
      { name: 'jinja', title: 'Jinja' },
      { name: 'bbcode', title: 'BBCode' },
      { name: 'mjml', title: 'MJML' },
      { name: 'diagrams', title: 'Diagrams' },
      { name: 'richtext', title: 'Rich Text' },
    ],
    style: [
      { name: 'css', title: 'CSS' },
      { name: 'scss', title: 'SCSS' },
      { name: 'sass', title: 'Sass' },
      { name: 'less', title: 'Less' },
      { name: 'stylus', title: 'Stylus' },
      { name: 'stylis', title: 'Stylis' },
      { name: 'tailwindcss', title: 'Tailwind CSS', processor: true },
      { name: 'windicss', title: 'Windi CSS', processor: true },
      { name: 'unocss', title: 'UnoCSS', processor: true },
      { name: 'tokencss', title: 'Token CSS', processor: true },
      { name: 'lightningcss', title: 'Lightning CSS', processor: true },
      { name: 'cssmodules', title: 'CSS Modules', processor: true },
    ],
    script: [
      { name: 'javascript', title: 'JS' },
      { name: 'typescript', title: 'Typescript' },
      { name: 'flow', title: 'Flow' },
      { name: 'babel', title: 'Babel' },
      { name: 'sucrase', title: 'Sucrase' },
      { name: 'jsx', title: 'JSX' },
      { name: 'tsx', title: 'TSX' },
      { name: 'react', title: 'React' },
      { name: 'react-tsx', title: 'React (TSX)' },
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
      { name: 'civet', title: 'Civet' },
      { name: 'clio', title: 'Clio' },
      { name: 'imba', title: 'Imba' },
      { name: 'rescript', title: 'ReScript' },
      { name: 'reason', title: 'Reason' },
      { name: 'ocaml', title: 'OCaml' },
      { name: 'python', title: 'Python' },
      { name: 'python-wasm', title: 'Python (Wasm)' },
      { name: 'r', title: 'R' },
      { name: 'ruby', title: 'Ruby' },
      { name: 'ruby-wasm', title: 'Ruby (Wasm)' },
      { name: 'go', title: 'Go' },
      { name: 'go-wasm', title: 'Go (Wasm)' },
      { name: 'php', title: 'PHP' },
      { name: 'php-wasm', title: 'PHP (Wasm)' },
      { name: 'cpp', title: 'C++' },
      { name: 'cpp-wasm', title: 'C++ (Wasm)' },
      { name: 'java', title: 'Java' },
      { name: 'csharp-wasm', title: 'C# (Wasm)' },
      { name: 'perl', title: 'Perl' },
      { name: 'lua', title: 'Lua' },
      { name: 'lua-wasm', title: 'Lua (Wasm)' },
      { name: 'teal', title: 'Teal' },
      { name: 'fennel', title: 'Fennel' },
      { name: 'julia', title: 'Julia' },
      { name: 'scheme', title: 'Scheme' },
      { name: 'commonlisp', title: 'Lisp' },
      { name: 'clojurescript', title: 'CLJS' },
      { name: 'gleam', title: 'Gleam' },
      { name: 'tcl', title: 'Tcl' },
      { name: 'assemblyscript', title: 'AssemblyScript' },
      { name: 'wat', title: 'WAT' },
      { name: 'sql', title: 'SQL' },
      { name: 'postgresql', title: 'PostgreSQL' },
      { name: 'prolog', title: 'Prolog' },
      { name: 'minizinc', title: 'MiniZinc' },
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
    const selectedStyle = random ? getRandomItem(lists.style).name : slideLang.style;
    const isProcessor = lists.style.find((item) => item.name === selectedStyle).processor;

    const query = random
      ? getRandomItem(lists.markup).name +
        '&' +
        (isProcessor ? 'css' : selectedStyle) +
        '&' +
        getRandomItem(lists.script).name
      : slideLang.markup + '&' + (isProcessor ? 'css' : selectedStyle) + '&' + slideLang.script;

    const processor = isProcessor ? '&processors=' + selectedStyle : '';

    window.open(location.origin + '?' + query + processor, '_blank');
  };

  if (ExecutionEnvironment.canUseDOM) {
    // only run this in the browser to allow the build to exit
    setInterval(() => {
      const slide = slides[Math.floor(Math.random() * slides.length)];
      if (typeof flipper[slide] !== 'function') return;
      flipper[slide]();
    }, 2000);
  }

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
          Looks Good 🚀
        </Link>
        <Link
          className="button button--outline button--warning button--lg"
          onClick={() => open(true)}
        >
          Surprise me 🎁
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
