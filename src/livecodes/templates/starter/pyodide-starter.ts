import { Template } from '../../models';

export const pyodideStarter: Template = {
  name: 'pyodide',
  title: 'Python (pyodide) Starter',
  thumbnail: 'assets/templates/python.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<h1 id="title">Hello, World!</h1>
<div id="plot">Loading...</div>
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
    language: 'pyodide',
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
    if x == 'setosa':
        return 0
    elif x == 'versicolor':
        return 1
    return 2

  df = dataframe.copy()
  df['species_id'] = df['species'].apply(add_species_id)
  return df


def showPlot(figure, selector):
  iconStyles = document.createElement('link')
  iconStyles.rel = 'stylesheet'
  iconStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
  document.head.appendChild(iconStyles)

  def create_root_element(self):
    el = document.querySelector(selector)
    el.innerHTML = ''
    return el

  figure.canvas.create_root_element = type(figure.canvas.create_root_element)(
    create_root_element, figure.canvas.__class__)
  figure.canvas.show()


df = pd.read_csv(load_data("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"))
df = prepare_data(df)

formatter = plt.FuncFormatter(lambda i, *args: df['species'].unique()[int(i)])
fig = plt.figure(figsize=(6, 4))
plt.scatter(df[df.columns[0]], df[df.columns[1]], c=df['species_id'])
plt.colorbar(ticks=[0, 1, 2], format=formatter)
plt.xlabel(df.columns[0])
plt.ylabel(df.columns[1])
plt.title('Iris dataset')
plt.tight_layout()
showPlot(fig, '#plot')

title = document.getElementById('title')
name = 'Python'
title.innerHTML = f"Hello, {name}!"
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
