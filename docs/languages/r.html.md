# R

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';
import LiveCodes from '../../src/components/LiveCodes.tsx';

LiveCodes runs [R](https://www.r-project.org/) statistical programming language in the browser using [WebR](https://docs.r-wasm.org/webr/latest/).

> WebR is a version of the statistical language [R](https://www.r-project.org/) compiled for the browser and [Node.js](https://nodejs.org/en/) using [WebAssembly](https://webassembly.org/), via [Emscripten](https://emscripten.org/).

> WebR makes it possible to run R code in the browser without the need for an R server to execute the code: the R interpreter runs directly on the user’s machine. Several R packages have also been ported for use with webR, and can be loaded in the usual way.
>
> https://docs.r-wasm.org/webr/

## Usage

Check the [starter template](#starter-template) for an example.

### Loading Packages

[Supported packages](https://repo.r-wasm.org/) can just be loaded in code, using the `library()` function, without the need for any explicit installs. Packages are publicly hosted via a CDN in a CRAN-like repository with URL, https://repo.r-wasm.org/

Example:

<!-- prettier-ignore -->
export const libParams = { r: `library(dplyr)\n\nstarwars %>% \n  filter(species == "Droid")\n`, languages: 'r', console: 'open', compiled: 'none' };

<RunInLiveCodes params={libParams} code={libParams.r} language="r" formatCode={false}></RunInLiveCodes>

### Output Rendering

By default, the R code is evaluated and the output is rendered in the `document.body` of the result page, followed by the plots (rendered as HTML canvas elements).

The evaluation and rendering behavior can be configured by adding a `script` element in the HTML (markup editor) and setting `livecodes.r.config`.

Example:

```html title="HTML"
<div id="output"></div>

<script>
  livecodes.r.config = {
    container: document.querySelector('#output'),
    // other options
  };
</script>
```

The following configurations are supported:

- `container`: CSS selector of the element in which the R code is rendered. If not specified, the output is rendered in `document.body`. If set to `null`, the output is not rendered automatically, and can then be accessed via `livecodes.r.output` (see below).
- `canvasHeight`: a number representing the height of the output canvas in pixels. Defaults to `309`.
- `canvasWidth`: a number representing the width of the output canvas in pixels. Defaults to `500`.
- `canvasPointSize`: a number representing the plots point size. Defaults to `12`.
- `canvasBackground`: a string representing the plots background color. Defaults to `"transparent"`.
- `autoEvaluate`: a boolean indicating whether the R code is evaluated automatically. Defaults to `true`.

In addition, detecting and triggering evaluation can be controlled using:

- `livecodes.r.evaluated`: a promise that can be awaited to denote when the R code has been evaluated when `livecodes.r.config.autoEvaluate` is set to `true`.
- `livecodes.r.run()`: an async method that triggers the evaluation of the R code. This is useful when `livecodes.r.config.autoEvaluate` is set to `false`. It may take an optional parameter representing the config object (see above)

The output and plots can be accessed via:

- `livecodes.r.output`: a string representing the output of the R code.
- `livecodes.r.plots`: an array of HTML canvas elements representing the plots.

These are available after the promise `livecodes.r.evaluated` or that returned by `livecodes.r.run()` is resolved

### Examples

This example shows how to specify the container (for output and plots):

```html title="HTML"
<div id="container"></div>

<script>
  livecodes.r.config = {
    container: document.querySelector('#container'),
  };
</script>
```

This example shows how to specify different containers for output and plots:

```html title="HTML"
<h2>Output</h2>
<div id="output"></div>
<h2>Plots</h2>
<div id="plots"></div>

<script type="module">
  livecodes.r.config = {
    container: null,
  };

  await livecodes.r.evaluated;

  const pre = document.createElement('pre');
  pre.innerHTML = livecodes.r.output;
  document.querySelector('#output').appendChild(pre);

  document.querySelector('#plots').appendChild(...livecodes.r.plots);
</script>
```

This example shows how to control when to trigger evaluation of the R code.:

```html title="HTML"
<h2>Output</h2>
<div id="output"></div>
<h2>Plots</h2>
<div id="plots"></div>

<script type="module">
  livecodes.r.config = {
    container: null,
    autoEvaluate: false,
  };

  await livecodes.r.run();

  const pre = document.createElement('pre');
  pre.innerHTML = livecodes.r.output;
  document.querySelector('#output').appendChild(pre);

  document.querySelector('#plots').appendChild(...livecodes.r.plots);
</script>
```

## Demo

<!-- prettier-ignore -->
export const params = {r: `head(iris)\n\nPW <- iris$Petal.Width\nPL <- iris$Petal.Length\nspecies <- iris$Species\nspeciesID <- as.numeric(species)\n\nplot(PL, PW,\n     pch = speciesID,\n     col = speciesID,\n     main = "Petal Width vs Length",\n     xlab = "Petal Length",\n     ylab = "Petal Width")\nlegend("topleft",\n       levels(species),\n       pch = 1:3,\n       col = 1:3)\n`, html: `<h2>Output</h2>\n<div id="output"></div>\n<h2>Plots</h2>\n<div id="plots"></div>\n\n\x3Cscript type="module">\n  livecodes.r.config = {\n    container: null,\n  };\n\n  await livecodes.r.evaluated;\n\n  const pre = document.createElement('pre');\n  pre.innerHTML = livecodes.r.output;\n  document.querySelector('#output').appendChild(pre);\n\n  document.querySelector('#plots').appendChild(...livecodes.r.plots);\n\x3C/script>\n`, activeEditor: 'script'};

<LiveCodes params={params} height="80vh"></LiveCodes>

## Language Info

### Name

`r`

### Extension

`.r`

### Aliases

`rlang`, `rstats`, `r-wasm`

### Editor

`script`

## Compiler

[WebR](https://docs.r-wasm.org/webr/latest/)

### Version

WebR v0.4.0, running R v4.4.1

## Code Formatting

Not supported.

## Live Reload

By default, when code is updated, the WebR environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload WebR and start a new environment, insert this comment in the code:

```r
# __livecodes_reload__
```

Think of this like restarting the kernel in Jupyter notebooks.

## Starter Template

https://livecodes.io/?template=r

## Links

- [R](https://www.r-project.org/)
- [WebR](https://docs.r-wasm.org/webr/latest/)
- [Supported packages](https://repo.r-wasm.org/)