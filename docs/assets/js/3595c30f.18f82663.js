"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7805"],{5955:function(e,t,n){n.r(t),n.d(t,{toc:()=>m,default:()=>g,frontMatter:()=>l,metadata:()=>s,assets:()=>c,libParams:()=>p,params:()=>u,micropipParams:()=>h,contentTitle:()=>d});var s=JSON.parse('{"id":"languages/python-wasm","title":"Python (Wasm)","description":"Pyodide is a Python distribution for the browser and Node.js based on WebAssembly.","source":"@site/docs/languages/python-wasm.mdx","sourceDirName":"languages","slug":"/languages/python-wasm","permalink":"/livecodes/docs/languages/python-wasm","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/python-wasm.mdx","tags":[],"version":"current","frontMatter":{"toc_max_heading_level":4},"sidebar":"docsSidebar","previous":{"title":"PurgeCSS","permalink":"/livecodes/docs/languages/purgecss"},"next":{"title":"Python","permalink":"/livecodes/docs/languages/python"}}'),r=n("85893"),i=n("50065"),o=n("58500"),a=n("13365");let l={toc_max_heading_level:4},d="Python (Wasm)",c={},p={pyodide:`import snowballstemmer
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
`,languages:"pyodide",console:"full",compiled:"none"},m=[{value:"Usage",id:"usage",level:2},{value:"Loading Modules",id:"loading-modules",level:3},{value:"Standard Library",id:"standard-library",level:4},{value:"External Packages",id:"external-packages",level:4},{value:"JavaScript Interoperability",id:"javascript-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Live Reload",id:"live-reload",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function f(e){let t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"python-wasm",children:"Python (Wasm)"})}),"\n","\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})," is a ",(0,r.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})," distribution for the browser and Node.js based on ",(0,r.jsx)(t.a,{href:"https://webassembly.org/",children:"WebAssembly"}),"."]}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:["Pyodide makes it possible to install and run Python packages in the browser with ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),". Any pure Python package with a wheel available on PyPI is supported. Many packages with C extensions have also been ported for use with Pyodide. These include many general-purpose packages such as regex, pyyaml, lxml and scientific Python packages including numpy, pandas, scipy, matplotlib, and scikit-learn."]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"https://pyodide.org"})}),"\n"]}),"\n",(0,r.jsxs)(t.admonition,{title:"Note",type:"info",children:[(0,r.jsxs)(t.p,{children:["Pyodide is a port of ",(0,r.jsx)(t.a,{href:"https://github.com/python/cpython",children:"CPython"})," to WebAssembly/Emscripten. This matches the behavior of the official Python interpreter and allows importing many Python packages. However, the full Python interpreter compiled to WebAssembly needs to be downloaded in the result page."]}),(0,r.jsxs)(t.p,{children:["If you do not need to import external packages, you may want to use the lighter-weight ",(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Python interpreter written in JavaScript"}),"."]})]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(t.p,{children:["Using Pyodide allows running Python code in the browser. There is no server required to run the code and no need to install Python or explicitly install packages. Packages imported in code are automatically loaded using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["In addition, since the Python code is running on the client-side, it has access to the ",(0,r.jsx)(t.a,{href:"#javascript-interoperability",children:"JavaScript scope"}),", including the page DOM and browser APIs. See the ",(0,r.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,r.jsx)(t.h3,{id:"loading-modules",children:"Loading Modules"}),"\n",(0,r.jsx)(t.p,{children:"Most of the modules in the Python standard library and many external packages can be used directly without explicit installs."}),"\n",(0,r.jsx)(t.h4,{id:"standard-library",children:"Standard Library"}),"\n",(0,r.jsxs)(t.p,{children:["Most of the Python standard library is functional, except for the modules ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/wasm-constraints.html",children:"listed here"}),"."]}),"\n",(0,r.jsx)(t.h4,{id:"external-packages",children:"External Packages"}),"\n",(0,r.jsxs)(t.p,{children:["Pyodide allows using many external packages (all pure Python packages on PyPI and many general-purpose and scientific ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/packages-in-pyodide.html",children:"packages built in Pyodide"}),")."]}),"\n",(0,r.jsxs)(t.p,{children:["Most of the time, a ",(0,r.jsx)(t.a,{href:"https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/",children:"distribution package provides one single import package"})," (or non-package module), with a matching name. For example, ",(0,r.jsx)(t.code,{children:"pip install numpy"})," lets you ",(0,r.jsx)(t.code,{children:"import numpy"}),". In these cases, modules can just be imported in code without the need for any explicit installs. The modules are automatically loaded using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,r.jsx)(o.Z,{params:p,code:p.pyodide,language:"python",formatCode:!1}),"\n",(0,r.jsxs)(t.p,{children:["However, modules with different import names (e.g. ",(0,r.jsx)(t.code,{children:"pkg_resources"})," module from ",(0,r.jsx)(t.code,{children:"setuptools"})," package) need to be explicitly installed using ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,r.jsx)(o.Z,{params:h,code:h.pyodide,language:"python",formatCode:!1}),"\n",(0,r.jsxs)(t.p,{children:["In addition, ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})," can be used to load external packages from custom URLs. See ",(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org/en/stable/project/usage.html#examples",children:"examples"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"javascript-interoperability",children:"JavaScript Interoperability"}),"\n",(0,r.jsxs)(t.p,{children:["The JavaScript scope can be accessed from Python using the ",(0,r.jsx)(t.code,{children:"js"})," module."]}),"\n",(0,r.jsxs)(t.p,{children:["See Pyodide documentations about ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/quickstart.html#accessing-javascript-scope-from-python",children:"accessing JavaScript scope from Python"})," and ",(0,r.jsx)(t.a,{href:"https://pyodide.org/en/stable/usage/type-conversions.html",children:"type translations"})," for more information."]}),"\n",(0,r.jsxs)(t.p,{children:["Check the ",(0,r.jsx)(t.a,{href:"#starter-template",children:"starter template"})," for an example."]}),"\n",(0,r.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,r.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"python-wasm"})}),"\n",(0,r.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:".py3"}),", ",(0,r.jsx)(t.code,{children:".wasm.py"})]}),"\n",(0,r.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"pyodide"}),", ",(0,r.jsx)(t.code,{children:"py-wasm"}),", ",(0,r.jsx)(t.code,{children:"pythonwasm"}),", ",(0,r.jsx)(t.code,{children:"pywasm"})]}),"\n",(0,r.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"script"})}),"\n",(0,r.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,r.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,r.jsx)(t.p,{children:"Pyodide v0.29.0, running Python v3.13.2"}),"\n",(0,r.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,r.jsx)(t.p,{children:"Not supported."}),"\n",(0,r.jsx)(t.h2,{id:"live-reload",children:"Live Reload"}),"\n",(0,r.jsx)(t.p,{children:"By default, when code is updated, the Pyodide environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload Pyodide and start a new environment, insert this comment in the code:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:"# __livecodes_reload__\n"})}),"\n",(0,r.jsx)(t.p,{children:"Think of this like restarting the kernel in Jupyter notebooks."}),"\n",(0,r.jsxs)(t.p,{children:["This comment can be added in the ",(0,r.jsxs)(t.a,{href:"/livecodes/docs/configuration/configuration-object#markup",children:[(0,r.jsx)(t.code,{children:"hiddenContent"})," property of the editor"]})," for embedded playgrounds."]}),"\n",(0,r.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,r.jsx)(a.Z,{params:u,height:"80vh"}),"\n",(0,r.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://livecodes.io/?template=python-wasm",children:"https://livecodes.io/?template=python-wasm"})}),"\n",(0,r.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.python.org/",children:"Python"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://pyodide.org",children:"Pyodide"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://micropip.pyodide.org",children:"micropip"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/python",children:"Brython in LiveCodes"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(f,{...e})}):f(e)}},13365:function(e,t,n){n.d(t,{Z:()=>g});var s=n("85893"),r=n("79207"),i=n("67294"),o=n("38294");function a(e){let t=(0,i.useRef)(null),[n,r]=(0,i.useState)(e.className||""),[a,l]=(0,i.useState)(e.style||{}),[d,c]=(0,i.useState)(e.height),[p,h]=(0,i.useState)(),[u,m]=(0,i.useState)(JSON.stringify(e.config||"")),[f,g]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:n,style:s,height:i,sdkReady:a,config:d,...y}=e;if(r(n||""),l(s||{}),c(i),p&&f===JSON.stringify(y)){if(u===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{p?.setConfig(e)}):d&&p.setConfig(d)}else g(JSON.stringify(y)),p?.destroy(),(0,o.T)(t.current,{config:d,...y}).then(e=>{h(e),"function"==typeof a&&a(e)})},[e]),(0,i.useEffect)(()=>()=>{p?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:n,style:a,"data-height":d})}var l=n("21858"),d=n("33262"),c=n("31705"),p=n("97645"),h=n("58168"),u=n("98228"),m=n("45050");function f(e){let[t,n]=(0,i.useState)(e.js),[r,o]=(0,i.useState)(e.ts),[a,l]=(0,i.useState)(e.react),[f,g]=(0,i.useState)(e.vue),[y,x]=(0,i.useState)(e.svelte),[v,b]=(0,i.useState)(e.solid),j="3.7rem",[w,_]=(0,i.useState)(!0),[P,k]=(0,i.useState)(j),S=(0,i.useRef)(null),E=()=>{setTimeout(()=>{k(`calc(${S.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{k(`calc(${S.current.offsetHeight}px + ${j})`)},255)};return(0,i.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(r,"ts")),l(e(a,"jsx")),g(e(f,"html")),x(e(y,"html")),b(e(v,"tsx"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${u.Z.details}`,"data-collapsed":w,style:{height:w?j:P,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{_(!w),E()},children:"show code"}),(0,s.jsx)("div",{ref:S,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:m.Z.collapsibleContent,children:(0,s.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,s.jsx)(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"ts",children:r})}),(0,s.jsx)(p.Z,{value:"react",label:"React",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"jsx",children:a})}),(0,s.jsx)(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"html",children:f})}),(0,s.jsx)(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"html",children:y})}),(0,s.jsx)(p.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"tsx",children:v})})]})})})]})}function g(e){let{className:t,style:n,showCode:i,height:o,...d}=e,{colorMode:c}=(0,r.I)(),p=e=>JSON.stringify(e,null,2),h=`
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

`.trimStart(),x=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${p(d)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:l.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(f,{js:h,ts:u,react:m,vue:g,svelte:y,solid:x})]})}},58500:function(e,t,n){n.d(t,{Z:()=>d});var s=n("85893");n("67294");var r=n("6735");function i(e){let{children:t,fallback:n}=e;return(0,r.Z)()?(0,s.jsx)(s.Fragment,{children:t?.()}):n??null}var o=n("31705"),a=n("38294"),l=n("21858");function d(e){let{params:t,config:n,code:r,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:h=!0,linkText:u="Run in LiveCodes",style:m={},className:f=""}=e,g=(0,a.r)({appUrl:l.G,params:t,config:n});return(0,s.jsxs)("div",{style:{marginBottom:"30px",...m},className:f,children:[r&&(0,s.jsx)(i,{children:()=>(0,s.jsx)(o.Z,{language:d,title:c,showLineNumbers:p,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(r,d):r})}),(0,s.jsxs)("a",{href:g,target:"_blank",rel:"noreferrer",children:[u,(0,s.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,s.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},38294:function(e,t,n){n.d(t,{T:function(){return r},r:function(){return i}});var s=n(17728);async function r(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:s={},headless:r,loading:o="lazy",view:a}=n,l=r||"headless"===a,d=null,c=null;if("string"==typeof e)d=document.querySelector(e);else if(e instanceof HTMLElement)d=e;else if(!(l&&"object"==typeof e))throw Error("A valid container element is required.");if(!d){if(l)E(d=document.createElement("div")),document.body.appendChild(d);else throw Error(`Cannot find element: "${e}"`)}let p=new URL(i(n)),h=p.origin;p.searchParams.set("embed","true"),p.searchParams.set("loading",l?"eager":o),p.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&p.searchParams.set("config","sdk");let u=n.params;"object"==typeof u&&Object.keys(u).length>0&&JSON.stringify(u).length<1800&&Object.keys(u).forEach(e=>{p.searchParams.set(e,encodeURIComponent(String(u[e])))});let m=!1,f="Cannot call API methods after calling `destroy()`.",g=[],y=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),g.push(e)},x=await new Promise(e=>{if(!d)return;let t=d.dataset.height||d.style.height;if(t&&!l){let e=isNaN(Number(t))?t:t+"px";d.style.height=e}"false"===d.dataset.defaultStyles||l||(d.style.backgroundColor||="#fff",d.style.border||="1px solid black",d.style.borderRadius||="8px",d.style.boxSizing||="border-box",d.style.padding||="0",d.style.width||="100%",d.style.height||=d.style.height||"300px",d.style.minHeight="200px",d.style.flexGrow="1",d.style.overflow||="hidden",d.style.resize||="vertical");let n="livecodes",r=d.querySelector(`iframe.${n}`),i=r||document.createElement("iframe");i.classList.add(n),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===o?"eager":"lazy"),l?E(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=d.style.borderRadius),y(function e(t){t.source===i.contentWindow&&t.origin===h&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),c=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!c||c<46)&&y(function e(t){t.source===i.contentWindow&&t.origin===h&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:s},h))}),i.onload=()=>{e(i)},i.src=p.href,r||d.appendChild(i)}),v=new Promise(e=>{y(function t(n){n.source===x.contentWindow&&n.origin===h&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),v.settled=!0)})}),b=()=>m?Promise.reject(f):new Promise(async e=>{v.settled&&e(),x.contentWindow?.postMessage({type:"livecodes-load"},h),await v,e()}),j=(e,t)=>new Promise(async(n,s)=>{if(m)return s(f);await b();let r=C();y(function t(i){if(i.source===x.contentWindow&&i.origin===h&&i.data?.type==="livecodes-api-response"&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?s(e.error):n(e)}}),x.contentWindow?.postMessage({method:e,id:r,args:t},h)}),w={},_=["load","ready","code","console","tests","destroy"],P=(e,t)=>{if(m)throw Error(f);return _.includes(e)?(j("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&j("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},k=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];y(async function(e){let t=k(e.data?.type??"");if(e.source!==x.contentWindow||e.origin!==h||!t||!w[t])return;let n=e.data?.payload;w[t]?.forEach(e=>{e(n)})});let S=()=>{x?.remove?.(),Object.values(w).forEach(e=>{e.length=0}),g.forEach(e=>removeEventListener("message",e)),g.length=0,t&&d&&t.unobserve(d),m=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===o&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await b(),t.unobserve(d))})},{rootMargin:"150px"})).observe(d);let C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>j("run"),format:e=>j("format",[e]),getShareUrl:e=>j("getShareUrl",[e]),getConfig:e=>j("getConfig",[e]),setConfig:e=>j("setConfig",[e]),getCode:()=>j("getCode"),show:(e,t)=>j("show",[e,t]),runTests:()=>j("runTests"),onChange:e=>P("code",e),watch:P,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return j("exec",[e,...n])},destroy:()=>m?Promise.reject(f):(S(),Promise.resolve())}}function i(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:r={},config:i={},headless:o,import:a,lite:l,view:d,...c}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let p=new URLSearchParams;Object.entries(c).forEach(t=>{let[n,s]=t;void 0!==s&&e.searchParams.set(n,String(s))});let h="headless"===t.view||o;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==d?i.view=d:e.searchParams.set("view",d)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),p.set("config","code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(i))));if(r&&"object"==typeof r&&Object.keys(r).length>0)try{p.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(r[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),h&&e.searchParams.set("headless","true"),p.toString().length>0&&(e.hash=p.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return o}});var s=n(67294);let r={},i=s.createContext(r);function o(e){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);