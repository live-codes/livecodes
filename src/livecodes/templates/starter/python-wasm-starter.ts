import type { Template } from '../../models';

export const pythonWasmStarter: Template = {
  name: 'python-wasm',
  aliases: ['pyodide', 'py-wasm'],
  title: window.deps.translateString('templates.starter.python-wasm', 'Python (Wasm) Starter'),
  thumbnail: 'assets/templates/python.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<h1 id="title">Hello, World!</h1>
<div id="loading">Loading...</div>
<div id="plots"></div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `h1 {
  text-align: center;
}
`.trimStart(),
  },
  script: {
    language: 'python-wasm',
    content: `
from js import document, XMLHttpRequest
import pandas as pd
import matplotlib.pyplot as plt
from io import StringIO


def load_data(url):
  req = XMLHttpRequest.new()
  req.open("GET", url, False)
  req.send()
  res = req.response
  return StringIO(f"""{res}""")


def prepare_data(dataframe):
  def add_species_id(x):
    if x == "setosa":
      return 0
    elif x == "versicolor":
      return 1
    return 2

  df = dataframe.copy()
  df["species_id"] = df["species"].apply(add_species_id)
  return df


data = load_data("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv")
df = pd.read_csv(data)
df = prepare_data(df)

formatter = plt.FuncFormatter(lambda i, *args: df["species"].unique()[int(i)])
fig = plt.figure(figsize=(6, 4))
plt.scatter(df[df.columns[0]], df[df.columns[1]], c=df["species_id"])
plt.colorbar(ticks=[0, 1, 2], format=formatter)
plt.xlabel(df.columns[0])
plt.ylabel(df.columns[1])
plt.title("Iris dataset")
plt.tight_layout()

# render plots in a specific DOM element
# plots = document.querySelector("#plots")
# document.pyodideMplTarget = plots

plt.show()

title = document.getElementById("title")
name = "Python"
title.innerHTML = f"Hello, {name}!"

loading = document.getElementById("loading")
loading.innerHTML = ""

# avoid leaving figures open
plt.close("all")
`.trimStart(),
  },
};
