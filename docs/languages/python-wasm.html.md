# Python (Wasm)

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';
import LiveCodes from '../../src/components/LiveCodes.tsx';

[Pyodide](https://pyodide.org) is a [Python](https://www.python.org/) distribution for the browser and Node.js based on [WebAssembly](https://webassembly.org/).

> Pyodide makes it possible to install and run Python packages in the browser with [micropip](https://micropip.pyodide.org). Any pure Python package with a wheel available on PyPI is supported. Many packages with C extensions have also been ported for use with Pyodide. These include many general-purpose packages such as regex, pyyaml, lxml and scientific Python packages including numpy, pandas, scipy, matplotlib, and scikit-learn.
>
> https://pyodide.org

:::info Note

Pyodide is a port of [CPython](https://github.com/python/cpython) to WebAssembly/Emscripten. This matches the behavior of the official Python interpreter and allows importing many Python packages. However, the full Python interpreter compiled to WebAssembly needs to be downloaded in the result page.

If you do not need to import external packages, you may want to use the lighter-weight [Python interpreter written in JavaScript](./python.html.md).

:::

## Usage

Using Pyodide allows running Python code in the browser. There is no server required to run the code and no need to install Python or explicitly install packages. Packages imported in code are automatically loaded using [micropip](https://micropip.pyodide.org).

In addition, since the Python code is running on the client-side, it has access to the [JavaScript scope](#javascript-interoperability), including the page DOM and browser APIs. See the [starter template](#starter-template) for an example.

### Loading Modules

Most of the modules in the Python standard library and many external packages can be used directly without explicit installs.

#### Standard Library

Most of the Python standard library is functional, except for the modules [listed here](https://pyodide.org/en/stable/usage/wasm-constraints.html).

#### External Packages

Pyodide allows using many external packages (all pure Python packages on PyPI and many general-purpose and scientific [packages built in Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)).

Most of the time, a [distribution package provides one single import package](https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/) (or non-package module), with a matching name. For example, `pip install numpy` lets you `import numpy`. In these cases, modules can just be imported in code without the need for any explicit installs. The modules are automatically loaded using [micropip](https://micropip.pyodide.org).

Example:

<!-- prettier-ignore -->
export const libParams = { pyodide: `import snowballstemmer\nstemmer = snowballstemmer.stemmer('english')\nprint(stemmer.stemWords('go goes going gone'.split()))\n`, languages: 'pyodide', console: 'full', compiled: 'none' };

<RunInLiveCodes
  params={libParams}
  code={libParams.pyodide}
  language="python"
  formatCode={false}
></RunInLiveCodes>

However, modules with different import names (e.g. `pkg_resources` module from `setuptools` package) need to be explicitly installed using [micropip](https://micropip.pyodide.org).

Example:

<!-- prettier-ignore -->
export const micropipParams = { pyodide: `import micropip\nawait micropip.install("setuptools")\n\nimport pkg_resources\nprint(pkg_resources.get_distribution("setuptools").version)\n`, languages: 'pyodide', console: 'full', compiled: 'none' };

<RunInLiveCodes
  params={micropipParams}
  code={micropipParams.pyodide}
  language="python"
  formatCode={false}
></RunInLiveCodes>

In addition, [micropip](https://micropip.pyodide.org) can be used to load external packages from custom URLs. See [examples](https://micropip.pyodide.org/en/stable/project/usage.html#examples).

### JavaScript Interoperability

The JavaScript scope can be accessed from Python using the `js` module.

See Pyodide documentations about [accessing JavaScript scope from Python](https://pyodide.org/en/stable/usage/quickstart.html#accessing-javascript-scope-from-python) and [type translations](https://pyodide.org/en/stable/usage/type-conversions.html) for more information.

Check the [starter template](#starter-template) for an example.

## Language Info

### Name

`python-wasm`

### Extensions

`.py3`, `.wasm.py`

### Aliases

`pyodide`, `py-wasm`, `pythonwasm`, `pywasm`

### Editor

`script`

## Compiler

[Pyodide](https://pyodide.org)

### Version

Pyodide v0.29.0, running Python v3.13.2

## Code Formatting

Not supported.

## Live Reload

By default, when code is updated, the Pyodide environment is re-used while the global variables are reset. This behavior is used for performance reasons. However, in order to fully reload Pyodide and start a new environment, insert this comment in the code:

```python
# __livecodes_reload__
```

Think of this like restarting the kernel in Jupyter notebooks.

This comment can be added in the [`hiddenContent` property of the editor](../configuration/configuration-object.html.md)#markup) for embedded playgrounds.

## Example Usage

<!-- prettier-ignore -->
export const params = {"python-wasm": `# From: https://github.com/TheAlgorithms/Python\n# License: https://github.com/TheAlgorithms/Python/blob/master/LICENSE.html.md)\n\n"""\nImplementation of a basic regression decision tree.\nInput data set: The input data set must be 1-dimensional with continuous labels.\nOutput: The decision tree maps a real number input to a real number output.\n"""\nimport numpy as np\n\n\nclass DecisionTree:\n    def __init__(self, depth=5, min_leaf_size=5):\n        self.depth = depth\n        self.decision_boundary = 0\n        self.left = None\n        self.right = None\n        self.min_leaf_size = min_leaf_size\n        self.prediction = None\n\n    def mean_squared_error(self, labels, prediction):\n        """\n        mean_squared_error:\n        @param labels: a one dimensional numpy array\n        @param prediction: a floating point value\n        return value: mean_squared_error calculates the error if prediction is used to\n            estimate the labels\n        >>> tester = DecisionTree()\n        >>> test_labels = np.array([1,2,3,4,5,6,7,8,9,10])\n        >>> test_prediction = float(6)\n        >>> tester.mean_squared_error(test_labels, test_prediction) == (\n        ...     TestDecisionTree.helper_mean_squared_error_test(test_labels,\n        ...         test_prediction))\n        True\n        >>> test_labels = np.array([1,2,3])\n        >>> test_prediction = float(2)\n        >>> tester.mean_squared_error(test_labels, test_prediction) == (\n        ...     TestDecisionTree.helper_mean_squared_error_test(test_labels,\n        ...         test_prediction))\n        True\n        """\n        if labels.ndim != 1:\n            print("Error: Input labels must be one dimensional")\n\n        return np.mean((labels - prediction) ** 2)\n\n    def train(self, x, y):\n        """\n        train:\n        @param x: a one dimensional numpy array\n        @param y: a one dimensional numpy array.\n        The contents of y are the labels for the corresponding X values\n\n        train does not have a return value\n        """\n\n        """\n        this section is to check that the inputs conform to our dimensionality\n        constraints\n        """\n        if x.ndim != 1:\n            print("Error: Input data set must be one dimensional")\n            return\n        if len(x) != len(y):\n            print("Error: X and y have different lengths")\n            return\n        if y.ndim != 1:\n            print("Error: Data set labels must be one dimensional")\n            return\n\n        if len(x) < 2 * self.min_leaf_size:\n            self.prediction = np.mean(y)\n            return\n\n        if self.depth == 1:\n            self.prediction = np.mean(y)\n            return\n\n        best_split = 0\n        min_error = self.mean_squared_error(x, np.mean(y)) * 2\n\n        """\n        loop over all possible splits for the decision tree. find the best split.\n        if no split exists that is less than 2 * error for the entire array\n        then the data set is not split and the average for the entire array is used as\n        the predictor\n        """\n        for i in range(len(x)):\n            if len(x[:i]) < self.min_leaf_size:\n                continue\n            elif len(x[i:]) < self.min_leaf_size:\n                continue\n            else:\n                error_left = self.mean_squared_error(x[:i], np.mean(y[:i]))\n                error_right = self.mean_squared_error(x[i:], np.mean(y[i:]))\n                error = error_left + error_right\n                if error < min_error:\n                    best_split = i\n                    min_error = error\n\n        if best_split != 0:\n            left_x = x[:best_split]\n            left_y = y[:best_split]\n            right_x = x[best_split:]\n            right_y = y[best_split:]\n\n            self.decision_boundary = x[best_split]\n            self.left = DecisionTree(\n                depth=self.depth - 1, min_leaf_size=self.min_leaf_size\n            )\n            self.right = DecisionTree(\n                depth=self.depth - 1, min_leaf_size=self.min_leaf_size\n            )\n            self.left.train(left_x, left_y)\n            self.right.train(right_x, right_y)\n        else:\n            self.prediction = np.mean(y)\n\n        return\n\n    def predict(self, x):\n        """\n        predict:\n        @param x: a floating point value to predict the label of\n        the prediction function works by recursively calling the predict function\n        of the appropriate subtrees based on the tree's decision boundary\n        """\n        if self.prediction is not None:\n            return self.prediction\n        elif self.left or self.right is not None:\n            if x >= self.decision_boundary:\n                return self.right.predict(x)\n            else:\n                return self.left.predict(x)\n        else:\n            print("Error: Decision tree not yet trained")\n            return None\n\n\nclass TestDecisionTree:\n    """Decision Tres test class"""\n\n    @staticmethod\n    def helper_mean_squared_error_test(labels, prediction):\n        """\n        helper_mean_squared_error_test:\n        @param labels: a one dimensional numpy array\n        @param prediction: a floating point value\n        return value: helper_mean_squared_error_test calculates the mean squared error\n        """\n        squared_error_sum = float(0)\n        for label in labels:\n            squared_error_sum += (label - prediction) ** 2\n\n        return float(squared_error_sum / labels.size)\n\n\ndef main():\n    """\n    In this demonstration we're generating a sample data set from the sin function in\n    numpy.  We then train a decision tree on the data set and use the decision tree to\n    predict the label of 10 different test values. Then the mean squared error over\n    this test is displayed.\n    """\n    x = np.arange(-1.0, 1.0, 0.005)\n    y = np.sin(x)\n\n    tree = DecisionTree(depth=10, min_leaf_size=10)\n    tree.train(x, y)\n\n    test_cases = (np.random.rand(10) * 2) - 1\n    predictions = np.array([tree.predict(x) for x in test_cases])\n    avg_error = np.mean((predictions - test_cases) ** 2)\n\n    print("Test values: " + str(test_cases))\n    print("Predictions: " + str(predictions))\n    print("Average error: " + str(avg_error))\n\n\nif __name__ == "__main__":\n    main()\n    import doctest\n    doctest.testmod(name="mean_squarred_error", verbose=True)\n`, languages: 'pyodide', console: 'full', compiled: 'none'};

<LiveCodes params={params} height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=python-wasm

## Links

- [Python](https://www.python.org/)
- [Pyodide](https://pyodide.org)
- [micropip](https://micropip.pyodide.org)
- [Brython in LiveCodes](./python.html.md)