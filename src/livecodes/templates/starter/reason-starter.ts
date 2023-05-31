import type { Template } from '../../models';

export const reasonStarter: Template = {
  name: 'reason',
  title: 'Reason Starter',
  thumbnail: 'assets/templates/reason.svg',
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
    language: 'reason',
    content: `
module App = {
  [@react.component]
  let make = (~name) => {
    let title = "Hello, " ++ name ++ "!"

    let (count, setCount) = React.useState(() => 0);

    let times = switch (count) {
    | 1 => "once"
    | 2 => "twice"
    | n => string_of_int(n) ++ " times"
    };

    <div className="container">
      <h1> {React.string(title)} </h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/reason.svg" />
      <p> {React.string("You clicked " ++ times)} </p>
      <button onClick={_ => setCount(_ => count + 1)}>
        {React.string("Click me")}
      </button>
    </div>
  };
};

switch (ReactDOM.querySelector("#app")) {
| Some(app) => ReactDOM.render(<App name="ReasonReact" />, app)
| None => ()
}

Js.log("Hello, Reason!");
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
