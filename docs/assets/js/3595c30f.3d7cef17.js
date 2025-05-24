"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7805"],{5955:function(e,t,s){s.r(t),s.d(t,{toc:()=>m,default:()=>g,frontMatter:()=>l,metadata:()=>n,assets:()=>c,libParams:()=>p,params:()=>u,micropipParams:()=>h,contentTitle:()=>d});var n=JSON.parse('{"id":"languages/python-wasm","title":"Python (Wasm)","description":"Pyodide is a Python distribution for the browser and Node.js based on WebAssembly.","source":"@site/docs/languages/python-wasm.mdx","sourceDirName":"languages","slug":"/languages/python-wasm","permalink":"/livecodes/docs/languages/python-wasm","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/python-wasm.mdx","tags":[],"version":"current","frontMatter":{"toc_max_heading_level":4},"sidebar":"docsSidebar","previous":{"title":"PurgeCSS","permalink":"/livecodes/docs/languages/purgecss"},"next":{"title":"Python","permalink":"/livecodes/docs/languages/python"}}'),r=s("5893"),i=s("65"),o=s("8500"),a=s("3365");let l={toc_max_heading_level:4},d="Python (Wasm)",c={},p={pyodide:`import snowballstemmer
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
`,languages:"pyodide",console:"full",compiled:"none"},m=[{value:"Usage",id:"usage",level:2},{value:"Loading Modules",id:"loading-modules",level:3},{value:"Standard Library",id:"standard-library",level:4},{value:"External Packages",id:"external-packages",level:4},{value:"JavaScript Interoperability",id:"javascript-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Live Reload",id:"live-reload",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function f(e){let t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"python-wasm",children:"Python (Wasm)"})}),"\n","\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})," is a ",(0,r.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})," distribution for the browser and Node.js based on ",(0,r.jsx)(t.a,{href:"https://webassembly.org/",children:"WebAssembly"}),"."]}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:["Pyodide makes it possible to install and run Python packages in the browser with ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),". Any pure Python package with a wheel available on PyPI is supported. Many packages with C extensions have also been ported for use with Pyodide. These include many general-purpose packages such as regex, pyyaml, lxml and scientific Python packages including numpy, pandas, scipy, matplotlib, and scikit-learn."]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"https://pyodide.org"})}),"\n"]}),"\n",(0,r.jsxs)(t.admonition,{title:"Note",type:"info",children:[(0,r.jsxs)(t.p,{children:["Pyodide is a port of ",(0,r.jsx)(t.a,{href:"https://github.com/python/cpython",children:"CPython"})," to WebAssembly/Emscripten. This matches the behavior of the official Python interpreter and allows importing many Python packages. However, the full Python interpreter compiled to WebAssembly needs to be downloaded in the result page."]}),(0,r.jsxs)(t.p,{children:["If you do not need to import external packages, you may want to use the lighter-weight ",(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Python interpreter written in JavaScript"}),"."]})]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(t.p,{children:["Using Pyodide allows running Python code in the browser. There is no server required to run the code and no need to install Python or explicitly install packages. Packages imported in code are automatically loaded using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["In addition, since the Python code is running on the client-side, it has access to the ",(0,r.jsx)(t.a,{href:"#javascript-interoperability",children:"JavaScript scope"}),", including the page DOM and browser APIs. See the ",(0,r.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,r.jsx)(t.h3,{id:"loading-modules",children:"Loading Modules"}),"\n",(0,r.jsx)(t.p,{children:"Most of the modules in the Python standard library and many external packages can be used directly without explicit installs."}),"\n",(0,r.jsx)(t.h4,{id:"standard-library",children:"Standard Library"}),"\n",(0,r.jsxs)(t.p,{children:["Most of the Python standard library is functional, except for the modules ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/wasm-constraints.html",children:"listed here"}),"."]}),"\n",(0,r.jsx)(t.h4,{id:"external-packages",children:"External Packages"}),"\n",(0,r.jsxs)(t.p,{children:["Pyodide allows using many external packages (all pure Python packages on PyPI and many general-purpose and scientific ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/packages-in-pyodide.html",children:"packages built in Pyodide"}),")."]}),"\n",(0,r.jsxs)(t.p,{children:["Most of the time, a ",(0,r.jsx)(t.a,{href:"https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/",children:"distribution package provides one single import package"})," (or non-package module), with a matching name. For example, ",(0,r.jsx)(t.code,{children:"pip install numpy"})," lets you ",(0,r.jsx)(t.code,{children:"import numpy"}),". In these cases, modules can just be imported in code without the need for any explicit installs. The modules are automatically loaded using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,r.jsx)(o.Z,{params:p,code:p.pyodide,language:"python",formatCode:!1}),"\n",(0,r.jsxs)(t.p,{children:["However, modules with different import names (e.g. ",(0,r.jsx)(t.code,{children:"pkg_resources"})," module from ",(0,r.jsx)(t.code,{children:"setuptools"})," package) need to be explicitly installed using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,r.jsx)(o.Z,{params:h,code:h.pyodide,language:"python",formatCode:!1}),"\n",(0,r.jsxs)(t.p,{children:["In addition, ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})," can be used to load external packages from custom URLs. See ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org/en/stable/project/usage.html#examples",children:"examples"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"javascript-interoperability",children:"JavaScript Interoperability"}),"\n",(0,r.jsxs)(t.p,{children:["The JavaScript scope can be accessed from Python using the ",(0,r.jsx)(t.code,{children:"js"})," module."]}),"\n",(0,r.jsxs)(t.p,{children:["See Pyodide documentations about ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/quickstart.html#accessing-javascript-scope-from-python",children:"accessing JavaScript scope from Python"})," and ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/type-conversions.html",children:"type translations"})," for more information."]}),"\n",(0,r.jsxs)(t.p,{children:["Check the ",(0,r.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,r.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,r.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"python-wasm"})}),"\n",(0,r.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:".py3"}),", ",(0,r.jsx)(t.code,{children:".wasm.py"})]}),"\n",(0,r.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"pyodide"}),", ",(0,r.jsx)(t.code,{children:"py-wasm"}),", ",(0,r.jsx)(t.code,{children:"pythonwasm"}),", ",(0,r.jsx)(t.code,{children:"pywasm"})]}),"\n",(0,r.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"script"})}),"\n",(0,r.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,r.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,r.jsx)(t.p,{children:"Pyodide v0.25.1, running Python v3.11.3"}),"\n",(0,r.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,r.jsx)(t.p,{children:"Not supported."}),"\n",(0,r.jsx)(t.h2,{id:"live-reload",children:"Live Reload"}),"\n",(0,r.jsx)(t.p,{children:"By default, when code is updated, the Pyodide environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload Pyodide and start a new environment, insert this comment in the code:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:"# __livecodes_reload__\n"})}),"\n",(0,r.jsx)(t.p,{children:"Think of this like restarting the kernel in Jupyter notebooks."}),"\n",(0,r.jsxs)(t.p,{children:["This comment can be added in the ",(0,r.jsxs)(t.a,{href:"/livecodes/docs/configuration/configuration-object#markup",children:[(0,r.jsx)(t.code,{children:"hiddenContent"})," property of the editor"]})," for embedded playgrounds."]}),"\n",(0,r.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,r.jsx)(a.Z,{params:u,height:"80vh"}),"\n",(0,r.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://livecodes.io/?template=python-wasm",children:"https://livecodes.io/?template=python-wasm"})}),"\n",(0,r.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Brython in LiveCodes"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(f,{...e})}):f(e)}},3365:function(e,t,s){s.d(t,{Z:()=>g});var n=s("5893"),r=s("4200"),i=s("7294"),o=s("8294");function a(e){let t=(0,i.useRef)(null),[s,r]=(0,i.useState)(e.className||""),[a,l]=(0,i.useState)(e.style||{}),[d,c]=(0,i.useState)(e.height),[p,h]=(0,i.useState)(),[u,m]=(0,i.useState)(JSON.stringify(e.config||"")),[f,g]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:i,sdkReady:a,config:d,...y}=e;if(r(s||""),l(n||{}),c(i),p&&f===JSON.stringify(y)){if(u===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{p?.setConfig(e)}):d&&p.setConfig(d)}else g(JSON.stringify(y)),p?.destroy(),(0,o.T)(t.current,{config:d,...y}).then(e=>{h(e),"function"==typeof a&&a(e)})},[e]),(0,i.useEffect)(()=>()=>{p?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:a,"data-height":d})}var l=s("1858"),d=s("3262"),c=s("1705"),p=s("7645"),h=s("8168"),u=s("8228"),m=s("5050");function f(e){let[t,s]=(0,i.useState)(e.js),[r,o]=(0,i.useState)(e.ts),[a,l]=(0,i.useState)(e.react),[f,g]=(0,i.useState)(e.vue),[y,x]=(0,i.useState)(e.svelte),v="3.7rem",[b,j]=(0,i.useState)(!0),[_,w]=(0,i.useState)(v),P=(0,i.useRef)(null),k=()=>{setTimeout(()=>{w(`calc(${P.current.offsetHeight}px + ${v})`)},5),setTimeout(()=>{w(`calc(${P.current.offsetHeight}px + ${v})`)},255)};return(0,i.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),o(e(r,"ts")),l(e(a,"jsx")),g(e(f,"html")),x(e(y,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${u.Z.details}`,"data-collapsed":b,style:{height:b?v:_,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{j(!b),k()},children:"show code"}),(0,n.jsx)("div",{ref:P,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:m.Z.collapsibleContent,children:(0,n.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,n.jsx)(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"js",children:t})}),(0,n.jsx)(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"ts",children:r})}),(0,n.jsx)(p.Z,{value:"react",label:"React",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"jsx",children:a})}),(0,n.jsx)(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:f})}),(0,n.jsx)(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:y})})]})})})]})}function g(e){let{className:t,style:s,showCode:i,height:o,...d}=e,{colorMode:c}=(0,r.I)(),p=e=>JSON.stringify(e,null,2),h=`
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

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:l.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(f,{js:h,ts:u,react:m,vue:g,svelte:y})]})}},8500:function(e,t,s){s.d(t,{Z:()=>d});var n=s("5893");s("7294");var r=s("6735");function i(e){let{children:t,fallback:s}=e;return(0,r.Z)()?(0,n.jsx)(n.Fragment,{children:t?.()}):s??null}var o=s("1705"),a=s("8294"),l=s("1858");function d(e){let{params:t,config:s,code:r,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:h=!0,linkText:u="Run in LiveCodes",style:m={},className:f=""}=e,g=(0,a.r)({appUrl:l.G,params:t,config:s});return(0,n.jsxs)("div",{style:{marginBottom:"30px",...m},className:f,children:[r&&(0,n.jsx)(i,{children:()=>(0,n.jsx)(o.Z,{language:d,title:c,showLineNumbers:p,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(r,d):r})}),(0,n.jsxs)("a",{href:g,target:"_blank",rel:"noreferrer",children:[u,(0,n.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,n.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},8294:function(e,t,s){s.d(t,{T:function(){return r},r:function(){return i}});var n=s(7728);async function r(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(t=e,e=null);let{config:s={},headless:n,loading:r="lazy",view:o}=t,a=n||"headless"===o,l=null,d=null;if("string"==typeof e)l=document.querySelector(e);else if(e instanceof HTMLElement)l=e;else if(!(a&&"object"==typeof e))throw Error("A valid container element is required.");if(!l){if(a)P(l=document.createElement("div")),document.body.appendChild(l);else throw Error(`Cannot find element: "${e}"`)}let c=new URL(i(t)),p=c.origin;c.searchParams.set("embed","true"),c.searchParams.set("loading",a?"eager":r),c.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&c.searchParams.set("config","sdk");let h=t.params;"object"==typeof h&&Object.keys(h).length>0&&JSON.stringify(h).length<1800&&Object.keys(h).forEach(e=>{c.searchParams.set(e,encodeURIComponent(String(h[e])))});let u=!1,m="Cannot call API methods after calling `destroy()`.",f=await new Promise(e=>{if(!l)return;let t=l.dataset.height||l.style.height;if(t&&!a){let e=isNaN(Number(t))?t:t+"px";l.style.height=e}"false"===l.dataset.defaultStyles||a||(l.style.backgroundColor||="#fff",l.style.border||="1px solid black",l.style.borderRadius||="8px",l.style.boxSizing||="border-box",l.style.padding||="0",l.style.width||="100%",l.style.height||=l.style.height||"300px",l.style.minHeight="200px",l.style.flexGrow="1",l.style.overflow||="hidden",l.style.resize||="vertical");let n="livecodes",i=l.querySelector(`iframe.${n}`),o=i||document.createElement("iframe");o.classList.add(n),o.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),o.setAttribute("allowtransparency","true"),o.setAttribute("allowpaymentrequest","true"),o.setAttribute("allowfullscreen","true"),o.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),o.setAttribute("loading","eager"===r?"eager":"lazy"),a?P(o):(o.style.height="100%",o.style.minHeight="200px",o.style.width="100%",o.style.margin="0",o.style.border="0",o.style.borderRadius=l.style.borderRadius),addEventListener("message",function e(t){t.source===o.contentWindow&&t.origin===p&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),d=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!d||d<46)&&addEventListener("message",function e(t){t.source===o.contentWindow&&t.origin===p&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),o.contentWindow?.postMessage({type:"livecodes-config",payload:s},p))}),o.onload=()=>{e(o)},o.src=c.href,i||l.appendChild(o)}),g=new Promise(e=>{addEventListener("message",function t(s){s.source===f.contentWindow&&s.origin===p&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),g.settled=!0)})}),y=()=>u?Promise.reject(m):new Promise(async e=>{g.settled&&e(),f.contentWindow?.postMessage({type:"livecodes-load"},p),await g,e()}),x=(e,t)=>new Promise(async(s,n)=>{if(u)return n(m);await y();let r=k();addEventListener("message",function t(i){if(i.source===f.contentWindow&&i.origin===p&&i.data?.type==="livecodes-api-response"&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?n(e.error):s(e)}}),f.contentWindow?.postMessage({method:e,id:r,args:t},p)}),v={},b=["load","ready","code","console","tests","destroy"],j=(e,t)=>{if(u)throw Error(m);return b.includes(e)?(x("watch",[e]),v[e]||(v[e]=[]),v[e]?.push(t),{remove:()=>{v[e]=v[e]?.filter(e=>e!==t),v[e]?.length===0&&x("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},_=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=_(e.data?.type??"");if(e.source!==f.contentWindow||e.origin!==p||!t||!v[t])return;let s=e.data?.payload;v[t]?.forEach(e=>{e(s)})});let w=()=>{Object.values(v).forEach(e=>{e.length=0}),f?.remove?.(),u=!0};function P(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===r&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await y(),t.unobserve(l))})},{rootMargin:"150px"}).observe(l);let k=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>x("run"),format:e=>x("format",[e]),getShareUrl:e=>x("getShareUrl",[e]),getConfig:e=>x("getConfig",[e]),setConfig:e=>x("setConfig",[e]),getCode:()=>x("getCode"),show:(e,t)=>x("show",[e,t]),runTests:()=>x("runTests"),onChange:e=>j("code",e),watch:j,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return x("exec",[e,...s])},destroy:()=>g.settled?x("destroy").then(w):u?Promise.reject(m):(w(),Promise.resolve())}}function i(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:s="https://livecodes.io",params:r={},config:i={},headless:o,import:a,lite:l,view:d,...c}=t;try{e=new URL(s)}catch{throw Error(`${s} is not a valid URL.`)}let p=new URLSearchParams;Object.entries(c).forEach(t=>{let[s,n]=t;void 0!==n&&e.searchParams.set(s,String(n))});let h="headless"===t.view||o;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==d?i.view=d:e.searchParams.set("view",d)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),p.set("config","code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(i))));if(r&&"object"==typeof r&&Object.keys(r).length>0)try{p.set("params",(0,n.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(r[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),h&&e.searchParams.set("headless","true"),e.hash=p.toString(),e.href}},65:function(e,t,s){s.d(t,{Z:function(){return a},a:function(){return o}});var n=s(7294);let r={},i=n.createContext(r);function o(e){let t=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);