const fs=require("fs"),path=require("path"),jsdom=require("jsdom"),prettier=require("prettier"),babel=require("@babel/core"),parser=require("@babel/parser"),pkg=require("../package.json"),tmpOutDir=path.resolve("src/livecodes/i18n/locales/tmp"),enOutDir=path.resolve("src/livecodes/i18n/locales/en"),srcBaseDir=path.resolve("src/livecodes"),prettierConfig=pkg.prettier,autoGeneratedWarning="// ATTENTION: This file is auto-generated from source code. Do not edit manually!",trans={translation:{},"language-info":{}},structuredJSON={translation:{},"language-info":{}},sortedJSONify=(e,t=2)=>JSON.stringify(e,((e,t)=>t instanceof Object&&!(t instanceof Array)?Object.keys(t).sort().reduce(((e,r)=>(e[r]=t[r],e)),{}):t),t),writeTranslation=async(e,t)=>{const r="translation"===e?"translation":"languageInfo",a=`${autoGeneratedWarning}\n\n    import type { I18nTranslationTemplate } from '../models';\n\n    // This is used as a template for other translations.\n    // Other translations should be typed like this:\n    // const ${r}: ${"translation"===e?"I18nTranslation":"I18nLangInfoTranslation"} = { /* translation here */ };\n\n    // Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.\n    // In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.\n\n    const ${r} = ${sortedJSONify(trans[e])} as const satisfies I18nTranslationTemplate;\n\n    export default ${r};\n  `,n=await prettier.format(a,{parser:"typescript",...prettierConfig});structuredJSON[e].$comment=autoGeneratedWarning.substring(3);const s=t?tmpOutDir:enOutDir;fs.existsSync(s)||fs.mkdirSync(s,{recursive:!0}),await Promise.all([fs.promises.writeFile(path.join(s,e+".ts"),n),fs.promises.writeFile(path.join(s,e+".lokalise.json"),sortedJSONify(structuredJSON[e]).replace(/<(\/?)(\d+)>/g,"<$1tag-$2>"))]),console.log(`Generated namespace ${e} in ${s}.`)},addTranslation=(e,t,r,a)=>{const n=(e=e.split(":")).pop(),s=1===e.length?e.pop():"translation",i=n.split(".");let o=trans[s];i.forEach(((e,r)=>{o[e]?r===i.length-1&&o[e]!==t&&console.error(`Duplicate key: ${n}`):o[e]=r===i.length-1?t:{},o=o[e]})),a&&1!==a.length?a.forEach((e=>{structuredJSON[s][n+`#${e}`]={translation:t[e],notes:r[e]}})):structuredJSON[s][n]={translation:t,notes:r}},abstractifyHTML=e=>{const t=new jsdom.JSDOM(e).window.document,r=[];let a=0;const n=e=>{if(e.nodeType!==t.ELEMENT_NODE)return;e.childNodes.forEach((e=>{n(e)}));const s=e.tagName.toLowerCase();if("body"===s)return;const i=0===e.attributes.length?void 0:Array.from(e.attributes).reduce(((e,t)=>(e[t.name]=t.value,e)),{});r.push({name:s,attributes:i});const o=t.createElement(`tag-${a}`);for(;e.firstChild;)o.appendChild(e.firstChild);e.parentNode.replaceChild(o,e),a++};n(t.body);let s=1;const i=[];let o=t.body.innerHTML.replace(/tag-/g,"");const l=[];return o=o.replace(/<(\d+)>/g,((e,t)=>(l.push(r[t]),i.push({from:new RegExp(`</${t}>`,"g"),to:`<*/${s}>`}),`<${s++}>`))),i.forEach((({from:e,to:t})=>{o=o.replace(e,t)})),o=o.replace(/<\*\//g,"</"),{html:o,elements:l}},generateElementsNote=e=>e.map(((e,t)=>`### <${t+1}> ###\n<${e.name} ${e.attributes?Object.keys(e.attributes).map((t=>`${t}="${e.attributes[t]}"`)).join(" "):""} />\n\n`)).join(""),processHTML=async e=>{const t=(e,t)=>{if("innerHTML"===t){const{html:t,elements:r}=abstractifyHTML(e.innerHTML);return{value:t.trim(),desc:generateElementsNote(r)}}return{value:(t.startsWith("data-")?e.dataset[t.slice(5)]:e[t]||e.getAttribute(t)).trim(),desc:""}};addTranslation("translation:splash.loading","Loading LiveCodes\u2026","",["textContent"]),await Promise.all(e.map((async e=>{try{const r=(await fs.promises.readFile(e,"utf8")).replace(/\s+/g," ").trim();new jsdom.JSDOM(r).window.document.querySelectorAll("[data-i18n]").forEach((e=>{const r=e.getAttribute("data-i18n"),a=(e.getAttribute("data-i18n-prop")??"textContent").split(" "),{value:n,desc:s}=1===a.length?t(e,a[0]):a.reduce(((r,a)=>{const n=t(e,a);return r.value[a]=n.value,r.desc[a]=n.desc,r}),{value:{},desc:{}});addTranslation(r,n,s,a)}))}catch(r){console.error(r)}})))},processTS=async e=>{await Promise.all(e.map((async e=>{try{const t=await fs.promises.readFile(e,"utf8"),r=parser.parse(t,{sourceType:"module",plugins:["typescript"]});babel.traverse(r,{CallExpression(e){if("MemberExpression"===e.node.callee.type&&"Identifier"===e.node.callee.property.type&&"translateString"===e.node.callee.property.name&&e.node.arguments.length>=2&&"StringLiteral"===e.node.arguments[0].type&&"StringLiteral"===e.node.arguments[1].type)if(!e.node.arguments[2]||e.node.arguments[2].properties.every((e=>!e.key||!e.value||"isHTML"!==e.key.name||"isHTML"===e.key.name&&!0!==e.value.value)))addTranslation(e.node.arguments[0].value,e.node.arguments[1].value,"",void 0);else{const{html:t,elements:r}=abstractifyHTML(e.node.arguments[1].value);addTranslation(e.node.arguments[0].value,t.trim(),generateElementsNote(r),void 0)}}})}catch(t){console.error(t)}})))},walkSync=function(e,t=[]){return fs.readdirSync(e).forEach((function(r){const a=e+path.sep+r;fs.statSync(a).isDirectory()?t=walkSync(a,t):t.push(a)})),t},generateTranslation=async()=>{const e=process.argv.slice(2).filter((e=>!e.startsWith("-"))),t=process.argv.includes("--save-temp"),r=[],a=[];e.length||e.push(...walkSync(srcBaseDir)),r.push(...e.filter((e=>e.endsWith(".html")&&e.startsWith(path.resolve(srcBaseDir,`html${path.sep}`)))).map((e=>path.resolve(srcBaseDir,e)))),a.push(...e.filter((e=>e.endsWith(".ts"))).map((e=>path.resolve(srcBaseDir,e)))),await processHTML(r),await processTS(a),writeTranslation("translation",t),Object.keys(trans["language-info"]).length>0&&writeTranslation("language-info",t)};module.exports={generateTranslation:generateTranslation,sortedJSONify:sortedJSONify,prettierConfig:prettierConfig,autoGeneratedWarning:autoGeneratedWarning},require.main===module&&generateTranslation();