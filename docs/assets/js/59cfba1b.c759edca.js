"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4004"],{726:function(e,n,s){s.r(n),s.d(n,{default:()=>h,frontMatter:()=>t,metadata:()=>r,assets:()=>c,toc:()=>a,contentTitle:()=>o});var r=JSON.parse('{"id":"contribution/release","title":"Release","description":"To start a new release:","source":"@site/docs/contribution/release.mdx","sourceDirName":"contribution","slug":"/contribution/release","permalink":"/livecodes/docs/contribution/release","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/contribution/release.mdx","tags":[],"version":"current","frontMatter":{}}'),i=s("5893"),l=s("65");let t={},o="Release",c={},a=[];function d(e){let n={admonition:"admonition",br:"br",code:"code",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"release",children:"Release"})}),"\n",(0,i.jsx)(n.p,{children:"To start a new release:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Checkout the branch ",(0,i.jsx)(n.code,{children:"develop"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"Make sure there are no uncommitted changes."}),"\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"npm run start-release"})," and answer the prompts. This will:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Increment the version number:",(0,i.jsx)(n.br,{}),"\n",'App -> "./package.json" (',(0,i.jsx)(n.code,{children:"appVersion"}),")",(0,i.jsx)(n.br,{}),"\n",'SDK -> "./src/sdk/package.sdk.json" (',(0,i.jsx)(n.code,{children:"version"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Generate changelog."}),"\n",(0,i.jsxs)(n.li,{children:["Create a release branch (",(0,i.jsx)(n.code,{children:"releases/v{version}"})," | ",(0,i.jsx)(n.code,{children:"releases/sdk-v{version}"}),") and commit changes."]}),"\n",(0,i.jsx)(n.li,{children:"Push the branch to GitHub (which triggers a preview deploy)."}),"\n",(0,i.jsxs)(n.li,{children:["Create a pull request to ",(0,i.jsx)(n.code,{children:"develop"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Once the pull request is merged a GitHub action workflow runs, which will:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Build the app."}),"\n",(0,i.jsxs)(n.li,{children:["Create and push a release tag:",(0,i.jsx)(n.br,{}),"\n","App -> v{version}",(0,i.jsx)(n.br,{}),"\n","SDK -> sdk-v{version}"]}),"\n",(0,i.jsx)(n.li,{children:"Compress the build directory to zip and tar files."}),"\n",(0,i.jsxs)(n.li,{children:["Create a release:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Use changelog as release notes."}),"\n",(0,i.jsx)(n.li,{children:"Upload compressed files as release artifacts."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Create a pull request to ",(0,i.jsx)(n.code,{children:"main"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"If App release -> create a permanent URL (v{version}.livecodes.io) which is a proxy to preview deploy."}),"\n",(0,i.jsx)(n.li,{children:"If SDK release -> publish to npm."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["App versions are numeric e.g. ",(0,i.jsx)(n.code,{children:"v20"}),(0,i.jsx)(n.br,{}),"\n","SDK versions are semver e.g. ",(0,i.jsx)(n.code,{children:"v1.2.3"})]})})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},65:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return t}});var r=s(7294);let i={},l=r.createContext(i);function t(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);