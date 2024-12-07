import e from"fs";import r from"path";import o from"@babel/core";import t from"@babel/parser";import{autoGeneratedWarning as s,sortedJSONify as n}from"./i18n-export.js";const a=(e,r="")=>Object.keys(e).reduce(((o,t)=>{const s=e[t];return"object"==typeof s?{...o,...a(s,`${r}${t}.`)}:{...o,[`${r}${t}`]:s}}),{}),i=e=>{if(!e)throw new Error("Node is undefined or null");const r={};return e.properties.forEach((e=>{const o=e.key.name||e.key.value;r[o]=c(e.value)})),r},c=e=>{switch(e.type){case"ObjectExpression":return i(e);case"ArrayExpression":return e.elements.map(c);case"StringLiteral":case"NumericLiteral":case"BooleanLiteral":return e.value;case"NullLiteral":return null;default:throw new Error(`Unsupported node type: ${e.type}`)}};(async()=>{const c=process.argv[2],l=r.resolve("src/livecodes/i18n/locales/"+c);if(!e.existsSync(l))return void console.error(`Language ${l} does not exist.`);const p=e.readdirSync(l).filter((e=>e.endsWith(".ts"))).map((e=>r.resolve(l,e)));await Promise.all(p.map((async p=>{try{console.log(`Generating Lokalise JSON for ${p} in language ${c}...`);const u=await e.promises.readFile(p,"utf8"),m=t.parse(u,{sourceType:"module",plugins:["typescript"]});let d;o.traverse(m,{ObjectExpression(e){d=i(e.node),e.stop()}});const f={$comment:s.substring(3)};for(const[e,r]of Object.entries(a(d)))f[e]={translation:r};const y=r.resolve(l,p.replace(".ts",".lokalise.json"));await e.promises.writeFile(y,n(f).replace(/<(\/?)(\d+)>/g,"<$1tag-$2>"))}catch(u){console.error(u)}})))})();