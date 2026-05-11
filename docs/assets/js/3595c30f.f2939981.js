"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7805"],{5955:function(e,t,r){r.r(t),r.d(t,{toc:()=>m,default:()=>g,frontMatter:()=>l,metadata:()=>n,assets:()=>c,libParams:()=>p,params:()=>u,micropipParams:()=>h,contentTitle:()=>d});var n=JSON.parse('{"id":"languages/python-wasm","title":"Python (Wasm)","description":"Pyodide is a Python distribution for the browser and Node.js based on WebAssembly.","source":"@site/docs/languages/python-wasm.mdx","sourceDirName":"languages","slug":"/languages/python-wasm","permalink":"/livecodes/docs/languages/python-wasm","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/python-wasm.mdx","tags":[],"version":"current","frontMatter":{"toc_max_heading_level":4},"sidebar":"docsSidebar","previous":{"title":"PurgeCSS","permalink":"/livecodes/docs/languages/purgecss"},"next":{"title":"Python","permalink":"/livecodes/docs/languages/python"}}'),s=r("85893"),i=r("50065"),o=r("58500"),a=r("65899");let l={toc_max_heading_level:4},d="Python (Wasm)",c={},p={pyodide:`import snowballstemmer
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
`,languages:"pyodide",console:"full",compiled:"none"},m=[{value:"Usage",id:"usage",level:2},{value:"Loading Modules",id:"loading-modules",level:3},{value:"Standard Library",id:"standard-library",level:4},{value:"External Packages",id:"external-packages",level:4},{value:"JavaScript Interoperability",id:"javascript-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Live Reload",id:"live-reload",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function f(e){let t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"python-wasm",children:"Python (Wasm)"})}),"\n","\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})," is a ",(0,s.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})," distribution for the browser and Node.js based on ",(0,s.jsx)(t.a,{href:"https://webassembly.org/",children:"WebAssembly"}),"."]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:["Pyodide makes it possible to install and run Python packages in the browser with ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),". Any pure Python package with a wheel available on PyPI is supported. Many packages with C extensions have also been ported for use with Pyodide. These include many general-purpose packages such as regex, pyyaml, lxml and scientific Python packages including numpy, pandas, scipy, matplotlib, and scikit-learn."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://pyodide.org",children:"https://pyodide.org"})}),"\n"]}),"\n",(0,s.jsxs)(t.admonition,{title:"Note",type:"info",children:[(0,s.jsxs)(t.p,{children:["Pyodide is a port of ",(0,s.jsx)(t.a,{href:"https://github.com/python/cpython",children:"CPython"})," to WebAssembly/Emscripten. This matches the behavior of the official Python interpreter and allows importing many Python packages. However, the full Python interpreter compiled to WebAssembly needs to be downloaded in the result page."]}),(0,s.jsxs)(t.p,{children:["If you do not need to import external packages, you may want to use the lighter-weight ",(0,s.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Python interpreter written in JavaScript"}),"."]})]}),"\n",(0,s.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsxs)(t.p,{children:["Using Pyodide allows running Python code in the browser. There is no server required to run the code and no need to install Python or explicitly install packages. Packages imported in code are automatically loaded using ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["In addition, since the Python code is running on the client-side, it has access to the ",(0,s.jsx)(t.a,{href:"#javascript-interoperability",children:"JavaScript scope"}),", including the page DOM and browser APIs. See the ",(0,s.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,s.jsx)(t.h3,{id:"loading-modules",children:"Loading Modules"}),"\n",(0,s.jsx)(t.p,{children:"Most of the modules in the Python standard library and many external packages can be used directly without explicit installs."}),"\n",(0,s.jsx)(t.h4,{id:"standard-library",children:"Standard Library"}),"\n",(0,s.jsxs)(t.p,{children:["Most of the Python standard library is functional, except for the modules ",(0,s.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/wasm-constraints.html",children:"listed here"}),"."]}),"\n",(0,s.jsx)(t.h4,{id:"external-packages",children:"External Packages"}),"\n",(0,s.jsxs)(t.p,{children:["Pyodide allows using many external packages (all pure Python packages on PyPI and many general-purpose and scientific ",(0,s.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/packages-in-pyodide.html",children:"packages built in Pyodide"}),")."]}),"\n",(0,s.jsxs)(t.p,{children:["Most of the time, a ",(0,s.jsx)(t.a,{href:"https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/",children:"distribution package provides one single import package"})," (or non-package module), with a matching name. For example, ",(0,s.jsx)(t.code,{children:"pip install numpy"})," lets you ",(0,s.jsx)(t.code,{children:"import numpy"}),". In these cases, modules can just be imported in code without the need for any explicit installs. The modules are automatically loaded using ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,s.jsx)(o.Z,{params:p,code:p.pyodide,language:"python",formatCode:!1}),"\n",(0,s.jsxs)(t.p,{children:["However, modules with different import names (e.g. ",(0,s.jsx)(t.code,{children:"pkg_resources"})," module from ",(0,s.jsx)(t.code,{children:"setuptools"})," package) need to be explicitly installed using ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,s.jsx)(o.Z,{params:h,code:h.pyodide,language:"python",formatCode:!1}),"\n",(0,s.jsxs)(t.p,{children:["In addition, ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})," can be used to load external packages from custom URLs. See ",(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org/en/stable/project/usage.html#examples",children:"examples"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"javascript-interoperability",children:"JavaScript Interoperability"}),"\n",(0,s.jsxs)(t.p,{children:["The JavaScript scope can be accessed from Python using the ",(0,s.jsx)(t.code,{children:"js"})," module."]}),"\n",(0,s.jsxs)(t.p,{children:["See Pyodide documentations about ",(0,s.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/quickstart.html#accessing-javascript-scope-from-python",children:"accessing JavaScript scope from Python"})," and ",(0,s.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/type-conversions.html",children:"type translations"})," for more information."]}),"\n",(0,s.jsxs)(t.p,{children:["Check the ",(0,s.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,s.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,s.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:"python-wasm"})}),"\n",(0,s.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:".py3"}),", ",(0,s.jsx)(t.code,{children:".wasm.py"})]}),"\n",(0,s.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"pyodide"}),", ",(0,s.jsx)(t.code,{children:"py-wasm"}),", ",(0,s.jsx)(t.code,{children:"pythonwasm"}),", ",(0,s.jsx)(t.code,{children:"pywasm"})]}),"\n",(0,s.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:"script"})}),"\n",(0,s.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,s.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,s.jsx)(t.p,{children:"Pyodide v0.29.0, running Python v3.13.2"}),"\n",(0,s.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,s.jsx)(t.p,{children:"Not supported."}),"\n",(0,s.jsx)(t.h2,{id:"live-reload",children:"Live Reload"}),"\n",(0,s.jsx)(t.p,{children:"By default, when code is updated, the Pyodide environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload Pyodide and start a new environment, insert this comment in the code:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-python",children:"# __livecodes_reload__\n"})}),"\n",(0,s.jsx)(t.p,{children:"Think of this like restarting the kernel in Jupyter notebooks."}),"\n",(0,s.jsxs)(t.p,{children:["This comment can be added in the ",(0,s.jsxs)(t.a,{href:"/livecodes/docs/configuration/configuration-object#markup",children:[(0,s.jsx)(t.code,{children:"hiddenContent"})," property of the editor"]})," for embedded playgrounds."]}),"\n",(0,s.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,s.jsx)(a.Z,{params:u,height:"80vh"}),"\n",(0,s.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://livecodes.io/?template=python-wasm",children:"https://livecodes.io/?template=python-wasm"})}),"\n",(0,s.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Brython in LiveCodes"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(f,{...e})}):f(e)}},65899:function(e,t,r){r.d(t,{Z:()=>y});var n=r("85893"),s=r("79207"),i=r("67294"),o=r("88711");let a=function(e){let{useEffect:t,useRef:r}=e;return function(e){let n=r(null),s=r(void 0),i=r(""),a=r(""),l=r(0),d=r(!1),c=e.className||"",p=e.style||{},h=e.height&&Number(e.height)?`${e.height}px`:e.height;return t(()=>{if(!n.current)return;let{className:t,style:r,height:c,sdkReady:p,config:h,...u}=e,m=++l.current,f=()=>l.current!==m||d.current,g=JSON.stringify(u);if(s.current&&a.current===g){let e=JSON.stringify(h);if(i.current===e)return;i.current=e,h&&s.current.setConfig(h)}else a.current=g,i.current=JSON.stringify(h),s.current?.destroy(),s.current=void 0,(0,o.TH)(n.current,{config:h,...u}).then(e=>{if(f()){e.destroy();return}s.current=e,"function"==typeof p&&p(e)})},[e]),t(()=>()=>{d.current=!0,s.current?.destroy(),s.current=void 0},[]),{containerRef:n,className:c,style:p,height:h}}}({useEffect:i.useEffect,useRef:i.useRef});function l(e){let{containerRef:t,className:r,style:s,height:i}=a(e);return(0,n.jsx)("div",{ref:t,className:r,style:{...s,...i?{height:i}:{}},"data-height":i})}var d=r("21858"),c=r("33262"),p=r("31705"),h=r("97645"),u=r("58168"),m=r("98228"),f=r("45050");function g(e){let[t,r]=(0,i.useState)(e.js),[s,o]=(0,i.useState)(e.ts),[a,l]=(0,i.useState)(e.react),[d,g]=(0,i.useState)(e.vue),[y,x]=(0,i.useState)(e.svelte),[v,b]=(0,i.useState)(e.solid),[j,w]=(0,i.useState)(e.preact),[_,P]=(0,i.useState)(e.webComponents),k="3.7rem",[S,C]=(0,i.useState)(!0),[E,T]=(0,i.useState)(k),L=(0,i.useRef)(null),N=()=>{setTimeout(()=>{T(`calc(${L.current.offsetHeight}px + ${k})`)},5),setTimeout(()=>{T(`calc(${L.current.offsetHeight}px + ${k})`)},255)};return(0,i.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};r(e(t,"js")),o(e(s,"ts")),l(e(a,"jsx")),g(e(d,"html")),x(e(y,"html")),b(e(v,"tsx")),w(e(j,"jsx")),P(e(_,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${f.Z.details} ${m.Z.details}`,"data-collapsed":S,style:{height:S?k:E,overflow:"hidden",willChange:"height",transition:`height ${S?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{C(!S),N()},children:"show code"}),(0,n.jsx)("div",{ref:L,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:f.Z.collapsibleContent,children:(0,n.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,n.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"js",children:t})}),(0,n.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"ts",children:s})}),(0,n.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"jsx",children:a})}),(0,n.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"html",children:d})}),(0,n.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"html",children:y})}),(0,n.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"tsx",children:v})}),(0,n.jsx)(h.Z,{value:"preact",label:"Preact",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"jsx",children:j})}),(0,n.jsx)(h.Z,{value:"web-components",label:"Web Components",attributes:{onMouseDown:N},children:(0,n.jsx)(p.Z,{language:"html",children:_})})]})})})]})}function y(e){let{className:t,style:r,showCode:i,height:o,...a}=e,{colorMode:c}=(0,s.I)(),p=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${p(a)};
createPlayground('#container', options);

`.trimStart(),u=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${p(a)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${p(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${p(a)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,y=`
<script>
import LiveCodes from 'livecodes/svelte';

const options = ${p(a)};
</script>

<LiveCodes {...options} />

`.trimStart(),x=`
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${p(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),v=`
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${p(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),b=(e=>{let{config:t,params:r,...n}=e,s=Object.entries(n).filter(e=>{let[,t]=e;return null!=t}).map(e=>{let[t,r]=e,n=t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`);return"boolean"==typeof r?r?n:null:`${n}="${r}"`}).filter(Boolean),i=s.length>0?"\n  "+s.join("\n  "):"",o=[];t&&o.push(`playground.config = ${JSON.stringify(t,null,2).split("\n").join("\n  ")};`),r&&o.push(`playground.params = ${JSON.stringify(r,null,2).split("\n").join("\n  ")};`);let a=o.length>0?`

  const playground = document.querySelector("live-codes");
  ${o.join("\n  ")}`:"";return`
<live-codes${i}></live-codes>

<script type="module">
  import "livecodes/web-components";${a}
</script>
`.trimStart()})(a);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:h,ts:u,react:m,vue:f,svelte:y,solid:x,preact:v,webComponents:b})]})}},58500:function(e,t,r){r.d(t,{Z:()=>d});var n=r("85893");r("67294");var s=r("6735");function i(e){let{children:t,fallback:r}=e;return(0,s.Z)()?(0,n.jsx)(n.Fragment,{children:t?.()}):r??null}var o=r("31705"),a=r("88711"),l=r("21858");function d(e){let{params:t,config:r,code:s,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:h=!0,linkText:u="Run in LiveCodes",style:m={},className:f=""}=e,g=(0,a.rP)({appUrl:l.G,params:t,config:r});return(0,n.jsxs)("div",{style:{marginBottom:"30px",...m},className:f,children:[s&&(0,n.jsx)(i,{children:()=>(0,n.jsx)(o.Z,{language:d,title:c,showLineNumbers:p,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(s,d):s})}),(0,n.jsxs)("a",{href:g,target:"_blank",rel:"noreferrer",children:[u,(0,n.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,n.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},88711:function(e,t,r){r.d(t,{rP:()=>l,TH:()=>a});var n=r("17728");let s={chrome:["accelerometer","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","geolocation","gyroscope","language-detector","language-model","local-network-access","microphone","midi","proofreader","rewriter","serial","summarizer","translator","web-share","writer","window-placement","xr-spatial-tracking"],firefox:["camera","display-capture","geolocation","microphone","web-share"],default:["accelerometer","ambient-light-sensor","camera","display-capture","encrypted-media","geolocation","gyroscope","microphone","midi","payment","serial","vr","web-share","xr-spatial-tracking"]},i=()=>{if("undefined"==typeof navigator)return"default";let e=navigator.userAgent;return/Firefox\//i.test(e)?"firefox":/Chrome\//i.test(e)?"chrome":"default"},o=()=>s[i()].filter(e=>{let t=globalThis.document?.featurePolicy?.features?.();return!t||t.includes(e)}).join("; ");async function a(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(r=e,e=null);let{config:n={},headless:s,loading:i="lazy",view:a}=r,d=s||"headless"===a,c=null,p=null,h=e=>{e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"};if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(d&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(d)h(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let u=new URL(l(r)),m=u.origin;u.searchParams.set("embed","true"),u.searchParams.set("loading",d?"eager":i),u.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof n&&Object.keys(n).length>0&&u.searchParams.set("config","sdk");let f=r.params;"object"==typeof f&&Object.keys(f).length>0&&JSON.stringify(f).length<1800&&Object.keys(f).forEach(e=>{u.searchParams.set(e,encodeURIComponent(String(f[e])))});let g=!1,y="Cannot call API methods after calling `destroy()`.",x=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),x.push(e)},b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";removeEventListener(t,e);let r=x.indexOf(e);r>-1&&x.splice(r,1)},j=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!d){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||d||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical","inline"!==getComputedStyle(c).getPropertyValue("display")||(c.style.display="block"));let r="livecodes",s=c.querySelector(`iframe.${r}`),a=s||document.createElement("iframe");a.classList.add(r),a.setAttribute("allow",o()),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),a.setAttribute("loading","eager"===i?"eager":"lazy"),d?h(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=c.style.borderRadius),v(function e(t){t.source===a.contentWindow&&t.origin===m&&t.data?.type==="livecodes-init"&&(b(e),p=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!p||p<46)&&v(function e(t){t.source===a.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(b(e),a.contentWindow?.postMessage({type:"livecodes-config",payload:n},m))}),a.onload=()=>{e(a)},a.src=u.href,s||c.appendChild(a)}),w=new Promise(e=>{v(function t(r){r.source===j.contentWindow&&r.origin===m&&r.data?.type==="livecodes-ready"&&(b(t),e(),w.settled=!0)})}),_=()=>g?Promise.reject(y):new Promise(async e=>{w.settled&&e(),j.contentWindow?.postMessage({type:"livecodes-load"},m),await w,e()}),P=(e,t)=>new Promise(async(r,n)=>{if(g)return n(y);await _();let s=L(),i=setTimeout(()=>{b(o),n(Error(`SDK call "${e}" timed out after 60000ms.`))},6e4);function o(t){if(t.source===j.contentWindow&&t.origin===m&&t.data?.type==="livecodes-api-response"&&t.data?.id===s&&t.data.method===e){clearTimeout(i),b(o);let e=t.data.payload;e?.error?n(e.error):r(e)}}v(o),j.contentWindow?.postMessage({method:e,id:s,args:t},m)}),k={},S=["load","ready","code","console","tests","destroy"],C=(e,t)=>{if(g)throw Error(y);return S.includes(e)?(P("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter(e=>e!==t),k[e]?.length===0&&P("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},E=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=E(e.data?.type??"");if(e.source!==j.contentWindow||e.origin!==m||!t||!k[t])return;let r=e.data?.payload;k[t]?.forEach(e=>{e(r)})});let T=()=>{j?.remove?.(),Object.values(k).forEach(e=>{e.length=0}),x.forEach(e=>removeEventListener("message",e)),x.length=0,t&&c&&t.unobserve(c),g=!0};"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await _(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>_(),run:()=>P("run"),format:e=>P("format",[e]),getShareUrl:e=>P("getShareUrl",[e]),getConfig:e=>P("getConfig",[e]),setConfig:e=>P("setConfig",[e]),getCode:()=>P("getCode"),show:(e,t)=>P("show",[e,t]),runTests:()=>P("runTests"),onChange:e=>C("code",e),watch:C,exec:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return P("exec",[e,...r])},destroy:()=>g?Promise.reject(y):(T(),Promise.resolve())}}function l(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:r="https://livecodes.io",params:s={},config:i={},headless:o,import:a,lite:l,view:d,...c}=t;try{e=new URL(r)}catch{throw Error(`${r} is not a valid URL.`)}let p=new URLSearchParams;Object.entries(c).forEach(t=>{let[r,n]=t;void 0!==n&&e.searchParams.set(r,String(n))});let h="headless"===t.view||o;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==d?i.view=d:e.searchParams.set("view",d)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),p.set("config","code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(i))));if(s&&"object"==typeof s&&Object.keys(s).length>0)try{p.set("params",(0,n.compressToEncodedURIComponent)(JSON.stringify(s)))}catch{Object.keys(s).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(s[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),h&&e.searchParams.set("headless","true"),p.toString().length>0&&(e.hash=p.toString()),e.href}},50065:function(e,t,r){r.d(t,{Z:function(){return a},a:function(){return o}});var n=r(67294);let s={},i=n.createContext(s);function o(e){let t=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);