import type { Template } from '../../models';

export const rescriptStarter: Template = {
  name: 'rescript',
  title: 'ReScript Starter',
  thumbnail: 'assets/templates/rescript.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '<div id="app">Loading...</div>\n',
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'rescript',
    content: `
// import npm modules
@module("canvas-confetti") external confetti: () => unit = "default"

confetti()

module App = {
  @react.component
  let make = (~name: string) => {
    let title = "Hello, " ++ name ++ "!"

    let (count, setCount) = React.useState(_ => 0)
    let onClick = _evt => {
      if (mod(count + 1, 5) == 0) {
        confetti()
      }
      setCount(_prev => _prev + 1)
    }

    let times = switch count {
    | 1 => "once"
    | 2 => "twice"
    | n => String.make(n) ++ " times"
    }

    <div className="container">
      <h1> {title->React.string} </h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rescript.png" />
      <p> {React.string("You clicked " ++ times)} </p>
      <button onClick> {React.string("Click me")} </button>
    </div>
  }
}

switch ReactDOM.querySelector("#app") {
| Some(rootElement) => {
    let root = ReactDOM.Client.createRoot(rootElement)
    ReactDOM.Client.Root.render(root, <App name="ReScript React" />)
  }
| None => () // do nothing
}

Console.log("Hello, ReScript!")
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
