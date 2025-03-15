"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["8477"],{4144:function(e,t,s){s.r(t),s.d(t,{importsDemo:()=>g,multiFiles:()=>v,frontMatter:()=>a,customRoot:()=>y,metadata:()=>o,cssModulesDemo:()=>p,assets:()=>d,scopedCssDemo:()=>u,toc:()=>b,importExternalWithImportMap:()=>j,contentTitle:()=>c,multi:()=>f,importExternal:()=>x,jsxDemo:()=>m,processorsDemo:()=>h,default:()=>S});var o=JSON.parse('{"id":"languages/vue","title":"Vue SFC","description":"Vue.js, The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces.","source":"@site/docs/languages/vue.mdx","sourceDirName":"languages","slug":"/languages/vue","permalink":"/livecodes/docs/languages/vue","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/vue.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Vento","permalink":"/livecodes/docs/languages/vento"},"next":{"title":"Vue 2 SFC","permalink":"/livecodes/docs/languages/vue2"}}'),n=s("5893"),r=s("65"),i=s("3365"),l=s("8500");let a={},c="Vue SFC",d={},u={vue:`<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>`},p={vue:`<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>`},h={vue:`<template lang="pug">
h1 {{ msg }}
</template>

<script lang="ts" setup>
  const msg: string = 'Hello!'
</script>

<style lang="scss">
  $primary-color: #666;
  body {
    color: $primary-color;
  }
</style>
`},m={vue:`<script>
  export default {
    data() {
      return {
        counter: 0,
        align: "center",
      };
    },
    methods: {
      increment() {
        this.counter += 1;
      },
    },
    render() {
      return (
        <div class="container">
          <h1>Hello, Vue!</h1>
          <p>You clicked {this.counter} times.</p>
          <button onClick={this.increment}>Click me</button>
        </div>
      );
    },
  };
</script>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>`},g={vue:`<script setup>
   import { ref } from 'vue';
   import confetti from 'canvas-confetti';
   import "bootstrap/dist/css/bootstrap.css"

   const count = ref(0);
   function increment() {
     count.value++;
     confetti();
   }
</script>

<template>
  <div class="m-5 text-center">
    <p>You clicked {{ count }} times.</p>
    <button @click="increment()">Click me</button>
  </div>
</template>
`},f={markup:{language:"vue",content:`<script setup>
import Counter from './Counter.vue';
</script>

<template>
  <div class="w-full text-center">
    <Counter start="5" />
  </div>
</template>
`},script:{language:"vue",content:`<script setup lang="ts">
  import { ref } from "vue";
  const props = defineProps({
    start: {
      type: Number,
      default: 0,
    },
  });
  const count = ref(props.start);
</script>

<template>
  <div class="mt-8">
    <span ref="counter" class="text-3xl font-bold">{{ count }}</span>
  </div>
  <div class="mt-4 space-x-4">
    <button title="-" @click="count--" class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">-</button>
    <button title="+" @click="count++" class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">+</button>
  </div>
  <div class="mt-4 space-x-4">
    <button @click="count = props.start" class="text-md font-medium bg-red-500 hover:bg-red-600 transition py-1 px-4 text-white rounded drop-shadow-xl">Reset</button>
  </div>
</template>
`},style:{language:"css",content:'@import "tailwindcss";\n'},processors:["tailwindcss"]},v={...f,markup:{...f.markup,title:"App.vue"},script:{...f.script,title:"Counter.vue"},style:{...f.style,title:"styles.css",order:3}},x={activeEditor:"script",script:{language:"vue",content:`<script setup>
import Counter from 'https://raw.githubusercontent.com/hatemhosny/simple-vue-counter/main/src/App.vue';
</script>

<template>
  <Counter />
</template>
`},style:{language:"css",content:'@import "tailwindcss";\n'},processors:["tailwindcss"]},j={activeEditor:"script",script:{language:"vue",content:`<script setup>
import App from 'https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/App.vue';
</script>

<template>
<App />
</template>
`},imports:{"https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList":"https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList.js","https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition":"https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition.js"}},y={markup:{language:"html",content:`<h1>Custom Root Element</h1>
<div id="livecodes-app"></div>
<p>...other page content</p>
`},script:{language:"vue",content:"<template>I'm a Vue SFC</template>"}},b=[{value:"Usage",id:"usage",level:2},{value:"Demo",id:"demo",level:3},{value:"Scoped CSS",id:"scoped-css",level:3},{value:"CSS Modules",id:"css-modules",level:3},{value:"CSS Frameworks",id:"css-frameworks",level:3},{value:"Languages and Pre-Processors",id:"languages-and-pre-processors",level:3},{value:"JSX",id:"jsx",level:3},{value:"<code>src</code> Imports",id:"src-imports",level:3},{value:"Module Imports",id:"module-imports",level:3},{value:"Multiple Components",id:"multiple-components",level:3},{value:"Importing External SFCs",id:"importing-external-sfcs",level:3},{value:"Root Element",id:"root-element",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Limitations",id:"limitations",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function w(e){let t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"vue-sfc",children:"Vue SFC"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://vuejs.org/",children:"Vue.js"}),", The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces."]}),"\n",(0,n.jsxs)(t.p,{children:["This is the documentation for LiveCodes language support for Vue ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-spec.html",children:"Single-File Component (SFC)"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["The support for Vue 2 SFC (the older, EOL version) is ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/vue2",children:"documented separately"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.p,{children:["Vue SFC can be used as documented in the ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-spec.html",children:"specs"}),", including support for ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-css-features.html#scoped-css",children:"Scoped CSS"}),", ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-css-features.html#css-modules",children:"CSS Modules"}),", ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-spec.html#pre-processors",children:"pre-processors"}),", ",(0,n.jsx)(t.a,{href:"https://vuejs.org/guide/extras/render-function.html#jsx-tsx",children:"JSX"})," and ",(0,n.jsxs)(t.a,{href:"https://vuejs.org/api/sfc-spec.html#src-imports",children:[(0,n.jsx)(t.code,{children:"src"})," imports"]}),". See below for usage."]}),"\n",(0,n.jsx)(t.h3,{id:"demo",children:"Demo"}),"\n","\n",(0,n.jsx)(i.Z,{template:"vue",height:"400"}),"\n",(0,n.jsx)(t.h3,{id:"scoped-css",children:"Scoped CSS"}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["When a ",(0,n.jsx)(t.code,{children:"<style>"})," tag has the scoped attribute, its CSS will apply to elements of the current component only."]}),"\n",(0,n.jsxs)(t.p,{children:["\u2014 ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-css-features.html#scoped-css",children:"docs"})]}),"\n"]}),"\n","\n",(0,n.jsx)(l.Z,{params:u,code:u.vue,language:"html",formatCode:!1}),"\n",(0,n.jsx)(t.h3,{id:"css-modules",children:"CSS Modules"}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["A ",(0,n.jsx)(t.code,{children:"<style module>"})," tag is compiled as CSS Modules and exposes the resulting CSS classes to the component as an object under the key of ",(0,n.jsx)(t.code,{children:"$style"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["\u2014 ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-css-features.html#css-modules",children:"docs"})]}),"\n"]}),"\n","\n",(0,n.jsx)(l.Z,{params:p,code:p.vue,language:"html",formatCode:!1}),"\n",(0,n.jsx)(t.h3,{id:"css-frameworks",children:"CSS Frameworks"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/livecodes/docs/features/css#css-processors",children:"CSS Frameworks"})," supported in LiveCodes (e.g. ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/tailwindcss",children:"Tailwind CSS"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/unocss",children:"UnoCSS"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/windicss",children:"WindiCSS"}),") can detect class names added in Vue SFCs. Make sure that the required utility is enabled (from style editor menu or in ",(0,n.jsx)(t.code,{children:"processors"})," property of ",(0,n.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object#processors",children:"configuration object"}),")."]}),"\n",(0,n.jsxs)(t.p,{children:["See ",(0,n.jsx)(t.a,{href:"#multiple-components",children:"example below"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Please note that the SFC style block can use any of the supported languages that compile to CSS (e.g. SCSS, Stylus, etc),\nbut currently is not processed by ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/css#css-processors",children:"CSS processors"})," (e.g. Tailwind CSS, Autoprefixer, etc).\nSee ",(0,n.jsx)(t.a,{href:"#limitations",children:"limitations"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"languages-and-pre-processors",children:"Languages and Pre-Processors"}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["Blocks can declare pre-processor languages using the ",(0,n.jsx)(t.code,{children:"lang"})," attribute."]}),"\n",(0,n.jsxs)(t.p,{children:["\u2014 ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-spec.html#pre-processors",children:"docs"})]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Many of the ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/",children:"languages supported in LiveCodes"})," can be used. The value of ",(0,n.jsx)(t.code,{children:"lang"})," attribute can be the language name (specified in its documentation page) or any of its aliases (extensions)."]}),"\n","\n",(0,n.jsx)(l.Z,{params:h,code:h.vue,language:"html",formatCode:!1}),"\n",(0,n.jsx)(t.h3,{id:"jsx",children:"JSX"}),"\n",(0,n.jsx)(t.p,{children:"JSX can be used in render functions without needing any configuration."}),"\n","\n",(0,n.jsx)(l.Z,{params:m,code:m.vue,language:"html",formatCode:!1}),"\n",(0,n.jsxs)(t.h3,{id:"src-imports",children:[(0,n.jsx)(t.code,{children:"src"})," Imports"]}),"\n",(0,n.jsx)(t.p,{children:"The src attribute can be used to import an external file for a language block:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-html",children:'<template src="https://my-website.com/template.html"></template>\n<style src="https://my-website.com/style.css"></style>\n<script src="https://my-website.com/script.js"><\/script>\n'})}),"\n",(0,n.jsxs)(t.p,{children:["The value of ",(0,n.jsx)(t.code,{children:"src"})," attribute can be either:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Absolute URL (e.g. ",(0,n.jsx)(t.code,{children:"https://unpkg.com/todomvc-app-css/index.css"}),")"]}),"\n",(0,n.jsxs)(t.li,{children:["Path in npm package (e.g. ",(0,n.jsx)(t.code,{children:"todomvc-app-css/index.css"}),")"]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Relative paths (e.g. ",(0,n.jsx)(t.code,{children:"./my-styles.css"}),") cannot be used (because there is no file system in LiveCodes)."]}),"\n",(0,n.jsxs)(t.p,{children:["The imported sources can use any of the supported languages/pre-processors (identified by the file extension or can be specified by ",(0,n.jsx)(t.code,{children:"lang"})," attribute)."]}),"\n",(0,n.jsx)(t.h3,{id:"module-imports",children:"Module Imports"}),"\n",(0,n.jsxs)(t.p,{children:["npm modules can be imported as described in the section about ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution",children:"module resolution"}),", including bare module imports and importing from different CDNs. Stylesheets imported in the ",(0,n.jsx)(t.code,{children:"script"})," block are added as ",(0,n.jsx)(t.code,{children:'<link rel="stylesheet">'})," tags in the page ",(0,n.jsx)(t.code,{children:"head"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,n.jsx)(l.Z,{params:g,code:g.vue,language:"html",formatCode:!1}),"\n",(0,n.jsxs)(t.p,{children:["Module imports can be customized using import maps as described in ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#custom-module-resolution",children:"module resolution"})," documentations."]}),"\n",(0,n.jsx)(t.h3,{id:"multiple-components",children:"Multiple Components"}),"\n",(0,n.jsxs)(t.p,{children:["Vue is supported in both ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/projects#markup-editor",children:"markup"})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/projects#script-editor",children:"script"})," editors."]}),"\n",(0,n.jsx)(t.p,{children:"This allows having a component in the markup editor that imports (and passes props to) a component in the script editor. The opposite is not supported."}),"\n",(0,n.jsxs)(t.p,{children:["This can be done using relative import of a file name in the same directory. Any file name will resolve to the component in the script editor,\ne.g. ",(0,n.jsx)(t.code,{children:"./script.vue"}),", ",(0,n.jsx)(t.code,{children:"./Component.vue"}),", ",(0,n.jsx)(t.code,{children:"./Counter.vue"}),", etc."]}),"\n","\n",(0,n.jsx)(i.Z,{config:f}),"\n",(0,n.jsxs)(t.p,{children:["Please note that LiveCodes ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/projects",children:"does not have the concept of a file system"}),". However, you can configure ",(0,n.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object#markup",children:"editor options"})," like ",(0,n.jsx)(t.code,{children:"title"}),", ",(0,n.jsx)(t.code,{children:"order"})," and ",(0,n.jsx)(t.code,{children:"hideTitle"})," to simulate multiple files, change editor order or even hide editors."]}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,n.jsx)(i.Z,{config:v}),"\n",(0,n.jsxs)(t.p,{children:["When both markup and script editors use Vue, the component in the markup editor is used as the main component rendered in the ",(0,n.jsx)(t.a,{href:"#root-element",children:"root element"}),".\nTo render the component in the script editor, it has to be imported and used by the main component."]}),"\n",(0,n.jsx)(t.h3,{id:"importing-external-sfcs",children:"Importing External SFCs"}),"\n",(0,n.jsxs)(t.p,{children:["External Vue SFCs can be imported. The import URL has to be an absolute URL ending with ",(0,n.jsx)(t.code,{children:".vue"})," extension. Any bare or relative imports in the imported files are resolved and compiled recursively."]}),"\n",(0,n.jsx)(t.p,{children:"This is an example of importing a Vue SFC, which in turn imports other Vue SFCs (the imported components use Tailwind CSS, which is enabled in this project as a CSS preprocessor):"}),"\n","\n",(0,n.jsxs)("div",{style:{marginBottom:"2em"},children:[(0,n.jsx)(l.Z,{config:x,style:{display:"inline"}})," - ",(0,n.jsx)("a",{href:"https://github.com/hatemhosny/simple-vue-counter",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(n.Fragment,{children:"view source on GitHub"})})]}),"\n",(0,n.jsx)(i.Z,{config:x}),"\n",(0,n.jsxs)(t.p,{children:["Please note that extensionless imports are not supported. However, you may customize the import URL using import maps as described in ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#custom-module-resolution",children:"module resolution"})," section."]}),"\n",(0,n.jsx)(t.p,{children:"This is an example of importing a Vue SFC, which in turn imports other Vue SFCs and extensionless imports, that are customized using importmap:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "imports": {\n    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList.js",\n    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition.js"\n  }\n}\n'})}),"\n","\n",(0,n.jsxs)("div",{style:{marginBottom:"2em"},children:[(0,n.jsx)(l.Z,{config:j,style:{display:"inline"}})," "," - ",(0,n.jsx)("a",{href:"https://github.com/hatemhosny/vue3-samples",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(n.Fragment,{children:"view source on GitHub"})})]}),"\n",(0,n.jsx)(i.Z,{config:j}),"\n",(0,n.jsx)(t.h3,{id:"root-element",children:"Root Element"}),"\n",(0,n.jsxs)(t.p,{children:["To ",(0,n.jsx)(t.a,{href:"https://vuejs.org/api/application.html#app-mount",children:"mount"})," the application instance to a specific DOM element use ",(0,n.jsx)(t.code,{children:'"livecodes-app"'})," as the element ",(0,n.jsx)(t.code,{children:"id"})," in the HTML. Otherwise, if that element is not found, a new ",(0,n.jsx)(t.code,{children:"div"})," element is added to ",(0,n.jsx)(t.code,{children:"document.body"})," and is used to mount the instance."]}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,n.jsx)(i.Z,{config:y}),"\n",(0,n.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,n.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"vue"})}),"\n",(0,n.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:".vue"}),", ",(0,n.jsx)(t.code,{children:".vue3"})]}),"\n",(0,n.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"script"}),", ",(0,n.jsx)(t.code,{children:"markup"})]}),"\n",(0,n.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,n.jsxs)(t.p,{children:["The official ",(0,n.jsx)(t.a,{href:"https://github.com/vuejs/core/tree/main/packages/compiler-sfc",children:"@vue/compiler-sfc"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"@vue/compiler-sfc"}),": v3.4.31"]}),"\n",(0,n.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,n.jsxs)(t.p,{children:["Using ",(0,n.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"limitations",children:"Limitations"}),"\n",(0,n.jsx)(t.p,{children:"Currently, Vue support has the following limitations:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"SSR is not supported."}),"\n",(0,n.jsxs)(t.li,{children:["The ",(0,n.jsx)(t.a,{href:"https://vuejs.org/guide/components/props#props-declaration",children:(0,n.jsx)(t.code,{children:"defineProps()"})})," macro cannot infer props from TypeScript types. Props have to be explicitly declared."]}),"\n",(0,n.jsxs)(t.li,{children:["Code in style blocks are not currently processed by enabled ",(0,n.jsx)(t.a,{href:"/livecodes/docs/features/css#css-processors",children:"CSS processors"}),". This is already ",(0,n.jsx)(t.a,{href:"https://tailwindcss.com/docs/compatibility#vue-svelte-and-astro",children:"discouraged by Tailwind CSS"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/live-codes/livecodes/issues/757",children:"PRs are welcome"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://livecodes.io/?template=vue",children:"https://livecodes.io/?template=vue"})}),"\n",(0,n.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://vuejs.org/",children:"Vue.js"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://vuejs.org/api/sfc-spec.html",children:"Vue SFC specs"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/css-modules/css-modules",children:"CSS Modules"})}),"\n"]})]})}function S(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(w,{...e})}):w(e)}},3365:function(e,t,s){s.d(t,{Z:()=>f});var o=s("5893"),n=s("4200"),r=s("7294"),i=s("8294");function l(e){let t=(0,r.useRef)(null),[s,n]=(0,r.useState)(e.className||""),[l,a]=(0,r.useState)(e.style||{}),[c,d]=(0,r.useState)(e.height),[u,p]=(0,r.useState)(),[h,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:s,style:o,height:r,sdkReady:l,config:c,...v}=e;if(n(s||""),a(o||{}),d(r),u&&g===JSON.stringify(v)){if(h===JSON.stringify(c))return;m(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else f(JSON.stringify(v)),u?.destroy(),(0,i.T)(t.current,{config:c,...v}).then(e=>{p(e),"function"==typeof l&&l(e)})},[e]),(0,r.useEffect)(()=>()=>{u?.destroy()},[]),(0,o.jsx)("div",{ref:t,className:s,style:l,"data-height":c})}var a=s("1858"),c=s("3262"),d=s("1705"),u=s("8168"),p=s("7645"),h=s("5050"),m=s("8228");function g(e){let[t,s]=(0,r.useState)(e.js),[n,i]=(0,r.useState)(e.ts),[l,a]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[v,x]=(0,r.useState)(e.svelte),j="3.7rem",[y,b]=(0,r.useState)(!0),[w,S]=(0,r.useState)(j),C=(0,r.useRef)(null),k=()=>{setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${j})`)},255)};return(0,r.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),i(e(n,"ts")),a(e(l,"jsx")),f(e(g,"html")),x(e(v,"html"))}},[]),(0,o.jsxs)("details",{className:`alert alert--info ${h.Z.details} ${m.Z.details}`,"data-collapsed":y,style:{height:y?j:w,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,o.jsx)("summary",{onClick:()=>{b(!y),k()},children:"show code"}),(0,o.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,o.jsx)("div",{className:h.Z.collapsibleContent,children:(0,o.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,o.jsx)(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:k},children:(0,o.jsx)(d.Z,{language:"js",children:t})}),(0,o.jsx)(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:k},children:(0,o.jsx)(d.Z,{language:"ts",children:n})}),(0,o.jsx)(p.Z,{value:"react",label:"React",attributes:{onMouseDown:k},children:(0,o.jsx)(d.Z,{language:"jsx",children:l})}),(0,o.jsx)(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:k},children:(0,o.jsx)(d.Z,{language:"html",children:g})}),(0,o.jsx)(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:k},children:(0,o.jsx)(d.Z,{language:"html",children:v})})]})})})]})}function f(e){let{className:t,style:s,showCode:r,height:i,...c}=e,{colorMode:d}=(0,n.I)(),u=e=>JSON.stringify(e,null,2),p=`
import { createPlayground } from 'livecodes';

const options = ${u(c)};
createPlayground('#container', options);

`.trimStart(),h=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${u(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,o.jsx)(g,{js:p,ts:h,react:m,vue:f,svelte:v})]})}},8500:function(e,t,s){s.d(t,{Z:()=>c});var o=s("5893");s("7294");var n=s("6735");function r(e){let{children:t,fallback:s}=e;return(0,n.Z)()?(0,o.jsx)(o.Fragment,{children:t?.()}):s??null}var i=s("1705"),l=s("8294"),a=s("1858");function c(e){let{params:t,config:s,code:n,language:c="js",codeTitle:d="",showLineNumbers:u=!1,formatCode:p=!0,linkText:h="Run in LiveCodes",style:m={},className:g=""}=e,f=(0,l.r)({appUrl:a.G,params:t,config:s});return(0,o.jsxs)("div",{style:{marginBottom:"30px",...m},className:g,children:[n&&(0,o.jsx)(r,{children:()=>(0,o.jsx)(i.Z,{language:c,title:d,showLineNumbers:u,children:p?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(n,c):n})}),(0,o.jsxs)("a",{href:f,target:"_blank",rel:"noreferrer",children:[h,(0,o.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},8294:function(e,t,s){s.d(t,{T:function(){return n},r:function(){return r}});var o=s(7728);async function n(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:o="https://livecodes.io/",params:n={},config:r={},import:i,headless:l,lite:a,loading:c="lazy",template:d,view:u}=s,p=l||"headless"===u,h=null;if("string"==typeof e)h=document.querySelector(e);else if(e instanceof HTMLElement)h=e;else if(!(p&&"object"==typeof e))throw Error("A valid container element is required.");if(!h){if(p)L(h=document.createElement("div")),document.body.appendChild(h);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(o)}catch{throw Error(`"${o}" is not a valid URL.`)}let m=t.origin;if("object"==typeof n&&Object.keys(n).forEach(e=>{t.searchParams.set(e,String(n[e]))}),d&&t.searchParams.set("template",d),i&&t.searchParams.set("x",i),p&&t.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":t.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==u?r.view=u:t.searchParams.set("view",u)),"string"==typeof r)try{new URL(r),t.searchParams.set("config",r)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof r)Object.keys(r).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",p?"eager":c);let g=!1,f="Cannot call API methods after calling `destroy()`.",v=await new Promise(e=>{if(!h)return;let s=h.dataset.height||h.style.height;if(s&&!p){let e=isNaN(Number(s))?s:s+"px";h.style.height=e}"false"===h.dataset.defaultStyles||p||(h.style.backgroundColor||="#fff",h.style.border||="1px solid black",h.style.borderRadius||="8px",h.style.boxSizing||="border-box",h.style.padding||="0",h.style.width||="100%",h.style.height||=h.style.height||"300px",h.style.minHeight="200px",h.style.flexGrow="1",h.style.overflow||="hidden",h.style.resize||="vertical");let o="livecodes",n=h.querySelector(`iframe.${o}`),i=n||document.createElement("iframe");i.classList.add(o),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===c?"eager":"lazy"),p?L(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=h.style.borderRadius),addEventListener("message",function e(t){t.source===i.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))}),i.onload=()=>{e(i)},i.src=t.href,n||h.appendChild(i)}),x=new Promise(e=>{addEventListener("message",function t(s){s.source===v.contentWindow&&s.origin===m&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),j=()=>g?Promise.reject(f):new Promise(async e=>{x.settled&&e(),v.contentWindow?.postMessage({type:"livecodes-load"},m),await x,e()}),y=(e,t)=>new Promise(async(s,o)=>{if(g)return o(f);await j();let n=E();addEventListener("message",function t(r){if(r.source===v.contentWindow&&r.origin===m&&r.data?.type==="livecodes-api-response"&&r.data?.id===n&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?o(e.error):s(e)}}),v.contentWindow?.postMessage({method:e,id:n,args:t},m)}),b={},w=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return w.includes(e)?(y("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&y("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==v.contentWindow||e.origin!==m||!t||!b[t])return;let s=e.data?.payload;b[t]?.forEach(e=>{e(s)})});let k=()=>{Object.values(b).forEach(e=>{e.length=0}),v?.remove?.(),g=!0};function L(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await j(),t.unobserve(h))})},{rootMargin:"150px"}).observe(h);let E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>j(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),o=1;o<t;o++)s[o-1]=arguments[o];return y("exec",[e,...s])},destroy:()=>x.settled?y("destroy").then(k):g?Promise.reject(f):(k(),Promise.resolve())}}function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:n,import:r,...i}=e,l="string"==typeof n?{config:n}:"object"==typeof n?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(n))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...i,...s,x:r,...l}))).toString();return(t||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let o=e.dataset.options;if(o)try{t=JSON.parse(o)}catch{}let r=e.dataset.config||e.dataset.prefill;if(r)try{s=JSON.parse(r)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",n(e,{import:"dom/"+i,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return l},a:function(){return i}});var o=s(7294);let n={},r=o.createContext(n);function i(e){let t=o.useContext(r);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);