"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7805"],{5955:function(e,t,r){r.r(t),r.d(t,{toc:()=>m,default:()=>g,frontMatter:()=>l,metadata:()=>s,assets:()=>c,libParams:()=>p,params:()=>u,micropipParams:()=>h,contentTitle:()=>d});var s=JSON.parse('{"id":"languages/python-wasm","title":"Python (Wasm)","description":"Pyodide is a Python distribution for the browser and Node.js based on WebAssembly.","source":"@site/docs/languages/python-wasm.mdx","sourceDirName":"languages","slug":"/languages/python-wasm","permalink":"/livecodes/docs/languages/python-wasm","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/python-wasm.mdx","tags":[],"version":"current","frontMatter":{"toc_max_heading_level":4},"sidebar":"docsSidebar","previous":{"title":"PurgeCSS","permalink":"/livecodes/docs/languages/purgecss"},"next":{"title":"Python","permalink":"/livecodes/docs/languages/python"}}'),n=r("5893"),i=r("65"),o=r("8500"),a=r("3365");let l={toc_max_heading_level:4},d="Python (Wasm)",c={},p={pyodide:`import snowballstemmer
stemmer = snowballstemmer.stemmer('english')
print(stemmer.stemWords('go goes going gone'.split()))
`,languages:"pyodide",console:"full",compiled:"none"},h={pyodide:`import micropip
await micropip.install("setuptools")

import pkg_resources
print(pkg_resources.get_distribution("setuptools").version)
`,languages:"pyodide",console:"full",compiled:"none"},u={"python-wasm":`# From: https://github.com/TheAlgorithms/Python
# License: https://github.com/TheAlgorithms/Python/blob/master/LICENSE.mdx

"""
Implementation of a basic regression decision tree.
Input data set: The input data set must be 1-dimensional with continuous labels.
Output: The decision tree maps a real number input to a real number output.
"""
import numpy as np


class DecisionTree:
    def __init__(self, depth=5, min_leaf_size=5):
        self.depth = depth
        self.decision_boundary = 0
        self.left = None
        self.right = None
        self.min_leaf_size = min_leaf_size
        self.prediction = None

    def mean_squared_error(self, labels, prediction):
        """
        mean_squared_error:
        @param labels: a one dimensional numpy array
        @param prediction: a floating point value
        return value: mean_squared_error calculates the error if prediction is used to
            estimate the labels
        >>> tester = DecisionTree()
        >>> test_labels = np.array([1,2,3,4,5,6,7,8,9,10])
        >>> test_prediction = float(6)
        >>> tester.mean_squared_error(test_labels, test_prediction) == (
        ...     TestDecisionTree.helper_mean_squared_error_test(test_labels,
        ...         test_prediction))
        True
        >>> test_labels = np.array([1,2,3])
        >>> test_prediction = float(2)
        >>> tester.mean_squared_error(test_labels, test_prediction) == (
        ...     TestDecisionTree.helper_mean_squared_error_test(test_labels,
        ...         test_prediction))
        True
        """
        if labels.ndim != 1:
            print("Error: Input labels must be one dimensional")

        return np.mean((labels - prediction) ** 2)

    def train(self, x, y):
        """
        train:
        @param x: a one dimensional numpy array
        @param y: a one dimensional numpy array.
        The contents of y are the labels for the corresponding X values

        train does not have a return value
        """

        """
        this section is to check that the inputs conform to our dimensionality
        constraints
        """
        if x.ndim != 1:
            print("Error: Input data set must be one dimensional")
            return
        if len(x) != len(y):
            print("Error: X and y have different lengths")
            return
        if y.ndim != 1:
            print("Error: Data set labels must be one dimensional")
            return

        if len(x) < 2 * self.min_leaf_size:
            self.prediction = np.mean(y)
            return

        if self.depth == 1:
            self.prediction = np.mean(y)
            return

        best_split = 0
        min_error = self.mean_squared_error(x, np.mean(y)) * 2

        """
        loop over all possible splits for the decision tree. find the best split.
        if no split exists that is less than 2 * error for the entire array
        then the data set is not split and the average for the entire array is used as
        the predictor
        """
        for i in range(len(x)):
            if len(x[:i]) < self.min_leaf_size:
                continue
            elif len(x[i:]) < self.min_leaf_size:
                continue
            else:
                error_left = self.mean_squared_error(x[:i], np.mean(y[:i]))
                error_right = self.mean_squared_error(x[i:], np.mean(y[i:]))
                error = error_left + error_right
                if error < min_error:
                    best_split = i
                    min_error = error

        if best_split != 0:
            left_x = x[:best_split]
            left_y = y[:best_split]
            right_x = x[best_split:]
            right_y = y[best_split:]

            self.decision_boundary = x[best_split]
            self.left = DecisionTree(
                depth=self.depth - 1, min_leaf_size=self.min_leaf_size
            )
            self.right = DecisionTree(
                depth=self.depth - 1, min_leaf_size=self.min_leaf_size
            )
            self.left.train(left_x, left_y)
            self.right.train(right_x, right_y)
        else:
            self.prediction = np.mean(y)

        return

    def predict(self, x):
        """
        predict:
        @param x: a floating point value to predict the label of
        the prediction function works by recursively calling the predict function
        of the appropriate subtrees based on the tree's decision boundary
        """
        if self.prediction is not None:
            return self.prediction
        elif self.left or self.right is not None:
            if x >= self.decision_boundary:
                return self.right.predict(x)
            else:
                return self.left.predict(x)
        else:
            print("Error: Decision tree not yet trained")
            return None


class TestDecisionTree:
    """Decision Tres test class"""

    @staticmethod
    def helper_mean_squared_error_test(labels, prediction):
        """
        helper_mean_squared_error_test:
        @param labels: a one dimensional numpy array
        @param prediction: a floating point value
        return value: helper_mean_squared_error_test calculates the mean squared error
        """
        squared_error_sum = float(0)
        for label in labels:
            squared_error_sum += (label - prediction) ** 2

        return float(squared_error_sum / labels.size)


def main():
    """
    In this demonstration we're generating a sample data set from the sin function in
    numpy.  We then train a decision tree on the data set and use the decision tree to
    predict the label of 10 different test values. Then the mean squared error over
    this test is displayed.
    """
    x = np.arange(-1.0, 1.0, 0.005)
    y = np.sin(x)

    tree = DecisionTree(depth=10, min_leaf_size=10)
    tree.train(x, y)

    test_cases = (np.random.rand(10) * 2) - 1
    predictions = np.array([tree.predict(x) for x in test_cases])
    avg_error = np.mean((predictions - test_cases) ** 2)

    print("Test values: " + str(test_cases))
    print("Predictions: " + str(predictions))
    print("Average error: " + str(avg_error))


if __name__ == "__main__":
    main()
    import doctest
    doctest.testmod(name="mean_squarred_error", verbose=True)
`,languages:"pyodide",console:"full",compiled:"none"},m=[{value:"Usage",id:"usage",level:2},{value:"Loading Modules",id:"loading-modules",level:3},{value:"Standard Library",id:"standard-library",level:4},{value:"External Packages",id:"external-packages",level:4},{value:"JavaScript Interoperability",id:"javascript-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Live Reload",id:"live-reload",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function f(e){let t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"python-wasm",children:"Python (Wasm)"})}),"\n","\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})," is a ",(0,n.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})," distribution for the browser and Node.js based on ",(0,n.jsx)(t.a,{href:"https://webassembly.org/",children:"WebAssembly"}),"."]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["Pyodide makes it possible to install and run Python packages in the browser with ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),". Any pure Python package with a wheel available on PyPI is supported. Many packages with C extensions have also been ported for use with Pyodide. These include many general-purpose packages such as regex, pyyaml, lxml and scientific Python packages including numpy, pandas, scipy, matplotlib, and scikit-learn."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://pyodide.org",children:"https://pyodide.org"})}),"\n"]}),"\n",(0,n.jsxs)(t.admonition,{title:"Note",type:"info",children:[(0,n.jsxs)(t.p,{children:["Pyodide is a port of ",(0,n.jsx)(t.a,{href:"https://github.com/python/cpython",children:"CPython"})," to WebAssembly/Emscripten. This matches the behavior of the official Python interpreter and allows importing many Python packages. However, the full Python interpreter compiled to WebAssembly needs to be downloaded in the result page."]}),(0,n.jsxs)(t.p,{children:["If you do not need to import external packages, you may want to use the lighter-weight ",(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Python interpreter written in JavaScript"}),"."]})]}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.p,{children:["Using Pyodide allows running Python code in the browser. There is no server required to run the code and no need to install Python or explicitly install packages. Packages imported in code are automatically loaded using ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["In addition, since the Python code is running on the client-side, it has access to the ",(0,n.jsx)(t.a,{href:"#javascript-interoperability",children:"JavaScript scope"}),", including the page DOM and browser APIs. See the ",(0,n.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,n.jsx)(t.h3,{id:"loading-modules",children:"Loading Modules"}),"\n",(0,n.jsx)(t.p,{children:"Most of the modules in the Python standard library and many external packages can be used directly without explicit installs."}),"\n",(0,n.jsx)(t.h4,{id:"standard-library",children:"Standard Library"}),"\n",(0,n.jsxs)(t.p,{children:["Most of the Python standard library is functional, except for the modules ",(0,n.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/wasm-constraints.html",children:"listed here"}),"."]}),"\n",(0,n.jsx)(t.h4,{id:"external-packages",children:"External Packages"}),"\n",(0,n.jsxs)(t.p,{children:["Pyodide allows using many external packages (all pure Python packages on PyPI and many general-purpose and scientific ",(0,n.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/packages-in-pyodide.html",children:"packages built in Pyodide"}),")."]}),"\n",(0,n.jsxs)(t.p,{children:["Most of the time, a ",(0,n.jsx)(t.a,{href:"https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/",children:"distribution package provides one single import package"})," (or non-package module), with a matching name. For example, ",(0,n.jsx)(t.code,{children:"pip install numpy"})," lets you ",(0,n.jsx)(t.code,{children:"import numpy"}),". In these cases, modules can just be imported in code without the need for any explicit installs. The modules are automatically loaded using ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,n.jsx)(o.Z,{params:p,code:p.pyodide,language:"python",formatCode:!1}),"\n",(0,n.jsxs)(t.p,{children:["However, modules with different import names (e.g. ",(0,n.jsx)(t.code,{children:"pkg_resources"})," module from ",(0,n.jsx)(t.code,{children:"setuptools"})," package) need to be explicitly installed using ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,n.jsx)(o.Z,{params:h,code:h.pyodide,language:"python",formatCode:!1}),"\n",(0,n.jsxs)(t.p,{children:["In addition, ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})," can be used to load external packages from custom URLs. See ",(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org/en/stable/project/usage.html#examples",children:"examples"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"javascript-interoperability",children:"JavaScript Interoperability"}),"\n",(0,n.jsxs)(t.p,{children:["The JavaScript scope can be accessed from Python using the ",(0,n.jsx)(t.code,{children:"js"})," module."]}),"\n",(0,n.jsxs)(t.p,{children:["See Pyodide documentations about ",(0,n.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/quickstart.html#accessing-javascript-scope-from-python",children:"accessing JavaScript scope from Python"})," and ",(0,n.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/type-conversions.html",children:"type translations"})," for more information."]}),"\n",(0,n.jsxs)(t.p,{children:["Check the ",(0,n.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,n.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,n.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"python-wasm"})}),"\n",(0,n.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:".py3"}),", ",(0,n.jsx)(t.code,{children:".wasm.py"})]}),"\n",(0,n.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"pyodide"}),", ",(0,n.jsx)(t.code,{children:"py-wasm"}),", ",(0,n.jsx)(t.code,{children:"pythonwasm"}),", ",(0,n.jsx)(t.code,{children:"pywasm"})]}),"\n",(0,n.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"script"})}),"\n",(0,n.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,n.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,n.jsx)(t.p,{children:"Pyodide v0.25.1, running Python v3.11.3"}),"\n",(0,n.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,n.jsx)(t.p,{children:"Not supported."}),"\n",(0,n.jsx)(t.h2,{id:"live-reload",children:"Live Reload"}),"\n",(0,n.jsx)(t.p,{children:"By default, when code is updated, the Pyodide environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload Pyodide and start a new environment, insert this comment in the code:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"# __livecodes_reload__\n"})}),"\n",(0,n.jsx)(t.p,{children:"Think of this like restarting the kernel in Jupyter notebooks."}),"\n",(0,n.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,n.jsx)(a.Z,{params:u,height:"80vh"}),"\n",(0,n.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://livecodes.io/?template=python-wasm",children:"https://livecodes.io/?template=python-wasm"})}),"\n",(0,n.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Brython in LiveCodes"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(f,{...e})}):f(e)}},3365:function(e,t,r){r.d(t,{Z:()=>g});var s=r("5893"),n=r("4200"),i=r("7294"),o=r("8294");function a(e){let t=(0,i.useRef)(null),[r,n]=(0,i.useState)(e.className||""),[a,l]=(0,i.useState)(e.style||{}),[d,c]=(0,i.useState)(e.height),[p,h]=(0,i.useState)(),[u,m]=(0,i.useState)(JSON.stringify(e.config||"")),[f,g]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:r,style:s,height:i,sdkReady:a,config:d,...y}=e;if(n(r||""),l(s||{}),c(i),p&&f===JSON.stringify(y)){if(u===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{p?.setConfig(e)}):d&&p.setConfig(d)}else g(JSON.stringify(y)),p?.destroy(),(0,o.T)(t.current,{config:d,...y}).then(e=>{h(e),"function"==typeof a&&a(e)})},[e]),(0,i.useEffect)(()=>()=>{p?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:r,style:a,"data-height":d})}var l=r("1858"),d=r("3262"),c=r("1705"),p=r("8168"),h=r("7645"),u=r("5050"),m=r("8228");function f(e){let[t,r]=(0,i.useState)(e.js),[n,o]=(0,i.useState)(e.ts),[a,l]=(0,i.useState)(e.react),[f,g]=(0,i.useState)(e.vue),[y,x]=(0,i.useState)(e.svelte),v="3.7rem",[b,j]=(0,i.useState)(!0),[w,_]=(0,i.useState)(v),P=(0,i.useRef)(null),k=()=>{setTimeout(()=>{_(`calc(${P.current.offsetHeight}px + ${v})`)},5),setTimeout(()=>{_(`calc(${P.current.offsetHeight}px + ${v})`)},255)};return(0,i.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};r(e(t,"js")),o(e(n,"ts")),l(e(a,"jsx")),g(e(f,"html")),x(e(y,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:w,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{j(!b),k()},children:"show code"}),(0,s.jsx)("div",{ref:P,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:u.Z.collapsibleContent,children:(0,s.jsxs)(p.Z,{groupId:"sdk-code",children:[(0,s.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:k},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:k},children:(0,s.jsx)(c.Z,{language:"ts",children:n})}),(0,s.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:k},children:(0,s.jsx)(c.Z,{language:"jsx",children:a})}),(0,s.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:k},children:(0,s.jsx)(c.Z,{language:"html",children:f})}),(0,s.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:k},children:(0,s.jsx)(c.Z,{language:"html",children:y})})]})})})]})}function g(e){let{className:t,style:r,showCode:i,height:o,...d}=e,{colorMode:c}=(0,n.I)(),p=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${p(d)};
createPlayground('#container', options);

`.trimStart(),u=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${p(d)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${p(d)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),g=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${p(d)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,y=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${p(d)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:l.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(f,{js:h,ts:u,react:m,vue:g,svelte:y})]})}},8500:function(e,t,r){r.d(t,{Z:()=>d});var s=r("5893");r("7294");var n=r("6735");function i(e){let{children:t,fallback:r}=e;return(0,n.Z)()?(0,s.jsx)(s.Fragment,{children:t?.()}):r??null}var o=r("1705"),a=r("8294"),l=r("1858");function d(e){let{params:t,config:r,code:n,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:h=!0,linkText:u="Run in LiveCodes",style:m={},className:f=""}=e,g=(0,a.r)({appUrl:l.G,params:t,config:r});return(0,s.jsxs)("div",{style:{marginBottom:"30px",...m},className:f,children:[n&&(0,s.jsx)(i,{children:()=>(0,s.jsx)(o.Z,{language:d,title:c,showLineNumbers:p,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(n,d):n})}),(0,s.jsxs)("a",{href:g,target:"_blank",rel:"noreferrer",children:[u,(0,s.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,s.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},8294:function(e,t,r){r.d(t,{T:function(){return n},r:function(){return i}});var s=r(7728);async function n(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(r=e,e=null);let{appUrl:s="https://livecodes.io/",params:n={},config:i={},import:o,headless:a,lite:l,loading:d="lazy",template:c,view:p}=r,h=a||"headless"===p,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!(h&&"object"==typeof e))throw Error("A valid container element is required.");if(!u){if(h)S(u=document.createElement("div")),document.body.appendChild(u);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(s)}catch{throw Error(`"${s}" is not a valid URL.`)}let m=t.origin;if("object"==typeof n&&Object.keys(n).forEach(e=>{t.searchParams.set(e,String(n[e]))}),c&&t.searchParams.set("template",c),o&&t.searchParams.set("x",o),h&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":t.searchParams.set("lite","true")),p&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==p?i.view=p:t.searchParams.set("view",p)),"string"==typeof i)try{new URL(i),t.searchParams.set("config",i)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof i)Object.keys(i).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",h?"eager":d);let f=!1,g="Cannot call API methods after calling `destroy()`.",y=await new Promise(e=>{if(!u)return;let r=u.dataset.height||u.style.height;if(r&&!h){let e=isNaN(Number(r))?r:r+"px";u.style.height=e}"false"===u.dataset.defaultStyles||h||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");let s="livecodes",n=u.querySelector(`iframe.${s}`),o=n||document.createElement("iframe");o.classList.add(s),o.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),o.setAttribute("allowtransparency","true"),o.setAttribute("allowpaymentrequest","true"),o.setAttribute("allowfullscreen","true"),o.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),o.setAttribute("loading","eager"===d?"eager":"lazy"),h?S(o):(o.style.height="100%",o.style.minHeight="200px",o.style.width="100%",o.style.margin="0",o.style.border="0",o.style.borderRadius=u.style.borderRadius),addEventListener("message",function e(t){t.source===o.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),o.contentWindow?.postMessage({type:"livecodes-config",payload:i},m))}),o.onload=()=>{e(o)},o.src=t.href,n||u.appendChild(o)}),x=new Promise(e=>{addEventListener("message",function t(r){r.source===y.contentWindow&&r.origin===m&&r.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),v=()=>f?Promise.reject(g):new Promise(async e=>{x.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},m),await x,e()}),b=(e,t)=>new Promise(async(r,s)=>{if(f)return s(g);await v();let n=E();addEventListener("message",function t(i){if(i.source===y.contentWindow&&i.origin===m&&i.data?.type==="livecodes-api-response"&&i.data?.id===n&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?s(e.error):r(e)}}),y.contentWindow?.postMessage({method:e,id:n,args:t},m)}),j={},w=["load","ready","code","console","tests","destroy"],_=(e,t)=>{if(f)throw Error(g);return w.includes(e)?(b("watch",[e]),j[e]||(j[e]=[]),j[e]?.push(t),{remove:()=>{j[e]=j[e]?.filter(e=>e!==t),j[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},P=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=P(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==m||!t||!j[t])return;let r=e.data?.payload;j[t]?.forEach(e=>{e(r)})});let k=()=>{Object.values(j).forEach(e=>{e.length=0}),y?.remove?.(),f=!0};function S(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===d&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await v(),t.unobserve(u))})},{rootMargin:"150px"}).observe(u);let E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>_("code",e),watch:_,exec:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),s=1;s<t;s++)r[s-1]=arguments[s];return b("exec",[e,...r])},destroy:()=>x.settled?b("destroy").then(k):f?Promise.reject(g):(k(),Promise.resolve())}}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:r,config:n,import:i,...o}=e,a="string"==typeof n?{config:n}:"object"==typeof n?{x:"code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(n))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...o,...r,x:i,...a}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,r;let s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let i=e.dataset.config||e.dataset.prefill;if(i)try{r=JSON.parse(i)}catch{}let o=encodeURIComponent(e.outerHTML);e.innerHTML="",n(e,{import:"dom/"+o,...t,...r?{config:r}:{}})})})},65:function(e,t,r){r.d(t,{Z:function(){return a},a:function(){return o}});var s=r(7294);let n={},i=s.createContext(n);function o(e){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);