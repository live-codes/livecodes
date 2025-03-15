# Headless Mode

import LiveCodes from '../../src/components/LiveCodes.tsx';

The LiveCodes [SDK](../sdk/index.html.md) can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all [SDK methods](../sdk/js-ts.html.md)#sdk-methods) are accessible (e.g. for [updating code](./js-ts.html.md)#setconfig), [getting compiled code](./js-ts.html.md)#getcode), console output, [result HTML](./js-ts.html.md)#getcode), [shareable URLs](./js-ts.html.md)#getshareurl), [formatting code](./js-ts.html.md)#format), [running tests](./js-ts.html.md)#runtests), etc).

This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI.

## Usage

To create a headless playground, set the [embed option](./js-ts.html.md)#embed-options) [`headless`](../sdk/js-ts.html.md)#headless) to `true`.

Please note that in headless mode, the first parameter (`container`) of the function [`createPlayground`](../sdk/js-ts.html.md)#createplayground) is optional and can be omitted.

<div style={{ clear: 'both' }}></div>

Example:

```js
import { createPlayground } from 'livecodes';

createPlayground({
  view: 'headless',
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
}).then(async (playground) => {
  const code = await playground.getCode();
  console.log(code.markup.compiled); // "<h1>Hello World!</h1>"
  console.log(code.result); // (result page HTML)
});
```

## Examples

The following examples show how to use the headless mode to make a Markdown editor, an MDX editor and a Python interpreter.

:::tip

You may want to view the following playgrounds in full screen (using the full screen button in the top right of each playground).

:::

### Markdown Editor

In this demo, code changes are watched using the SDK method [`watch('code', callback)`](./js-ts.html.md)#watch). The callback function accepts an argument which is an object with the properties `code` and `config` (see [`getCode`](./js-ts.html.md)#getcode) and [`getConfig`](./js-ts.html.md)#getconfig)). The compiled code is obtained as `code.markup.compiled`.

<!-- prettier-ignore -->
export const mdDemo = { markup: { language: 'html', content: `<textarea id="editor" style="display: none;"></textarea>\n<div id="output">Loading...</div>\n\n\x3Cscript type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = "# Hello, LiveCodes!\\n\\n";\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "markdown",\n  });\n  editor.setSize("100%", 200);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const compile = async () => {\n    await livecodes.setConfig({\n      autoupdate: false,\n      markup: {\n        language: "markdown",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(compile, 1000));\n  livecodes.watch("code", ({ code, config }) => {\n    createSandbox(document.querySelector("#output"), code.markup.compiled);\n  });\n\n  await compile();\n\n  // create a sandbox for safe execution of compiled code\n  function createSandbox (container, html) {\n    const iframe = document.createElement("iframe");\n    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";\n    iframe.sandbox =\n      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";\n    iframe.onload = () => {\n      iframe.contentWindow.postMessage({ html }, "*");\n    };\n    container.innerHTML = "";\n    container.appendChild(iframe);\n    return iframe;\n  };\n\x3C/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js">\x3C/script>\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js">\x3C/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n` }}

<LiveCodes config={mdDemo} height="80vh"></LiveCodes>

### MDX Editor

In this demo, code changes are watched using the SDK method [`watch('code', callback)`](./js-ts.html.md)#watch). The callback function accepts an argument which is an object with the properties `code` and `config` (see [`getCode`](./js-ts.html.md)#getcode) and [`getConfig`](./js-ts.html.md)#getconfig)). The result HTML is obtained as `code.result`.

:::tip

If you do not want to run the result page in the headless playground and only want to get the generated result HTML, you can set the configuration option [`autoupdate](../configuration/configuration-object.html.md)#autoupdate) to `false`.

:::

<!-- prettier-ignore -->
export const mdxDemo = { markup: { language: 'html', content: `<textarea id="editor" style="display: none;"></textarea>\n<div id="output">Loading...</div>\n\n\x3Cscript type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = \`import { useState, useEffect } from 'react';\n\nexport const Hello = ({name}) => {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <h1>Hello, {name}!</h1>\n      <p>You clicked {count} times.</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </>\n  );\n};\n\n<Hello name="LiveCodes"></Hello>\n\n## MDX in short\n\n- ❤️ Powerful\n- 💻 Everything is a component\n- 🔧 Customizable\n- 📚 Markdown-based\n- 🔥 Blazingly blazing fast\n\n> from [mdxjs.com](https://mdxjs.com/)\n\`;\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "markdown",\n  });\n  editor.setSize("100%", 200);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n    config: { autoupdate: false },\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const compile = async () => {\n    await livecodes.setConfig({\n      autoupdate: false,\n      markup: {\n        language: "mdx",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(compile, 1000));\n  livecodes.watch("code", ({ code, config }) => {\n    createSandbox(document.querySelector("#output"), code.result);\n  });\n\n  await compile();\n\n  // create a sandbox for safe execution of compiled code\n  function createSandbox (container, html) {\n    const iframe = document.createElement("iframe");\n    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";\n    iframe.sandbox =\n      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";\n    iframe.onload = () => {\n      iframe.contentWindow.postMessage({ html }, "*");\n    };\n    container.innerHTML = "";\n    container.appendChild(iframe);\n    return iframe;\n  };\n\x3C/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js">\x3C/script>\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js">\x3C/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n` }}

<LiveCodes config={mdxDemo} height="80vh"></LiveCodes>

### Python Interpreter

In this demo, console output is obtained using the SDK method [`watch('code', callback)`](./js-ts.html.md)#watch). The callback function accepts an argument which is an object with the properties `method` and `args` indicating the console method and the arguments that were passed (as an array).

<!-- prettier-ignore -->
export const pyDemo = { markup: { language: 'html', content: `<textarea id="editor" style="display: none"></textarea>\n<div id="output">Loading...</div>\n\n\x3Cscript type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = \`def say_hello(name):\n  return f"Hello, {name}!"\n\nprint(say_hello("LiveCodes"))\n\`;\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "python",\n  });\n  editor.setSize("100%", 250);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const run = async () => {\n    await livecodes.setConfig({\n      autoupdate: true,\n      script: {\n        language: "python",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(run, 1000));\n  livecodes.watch("console", ({ method, args }) => {\n    const output = document.querySelector("#output");\n    output.innerHTML = args.join("\\n");\n    if (method === "error") {\n      output.style.color = "red";\n    } else {\n      output.style.color = "unset";\n    }\n  });\n\n  await run();\n\x3C/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js">\x3C/script>\n\x3Cscript src="https://unpkg.com/codemirror@5.65.15/mode/python/python.js">\x3C/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n    margin: 1em;\n    white-space: pre;\n    font-family: monospace;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n` }}

<LiveCodes config={pyDemo} height="80vh"></LiveCodes>