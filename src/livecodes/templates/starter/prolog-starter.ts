import type { Template } from '../../models';

export const prologStarter: Template = {
  name: 'prolog',
  title: 'Prolog Starter',
  thumbnail: 'assets/templates/tau-prolog.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tau-prolog.svg" title="Tau Prolog" />
	<form id="query-form" onsubmit="runQuery(); return false;">
		<input type="text" id="query" value="father(X, jack)." placeholder="Enter a query" />
		<input type="submit" value="Run query" id="button" />
		<pre id="result"></pre>
	</form>
</div>

<script>
  async function getTitle() {
    const session = await livecodes.prolog.createSession();
    session.query('title(X).');
    session.answer(function(answer) {
      document.getElementById("title").innerText = answer.lookup('X');
    });
  }

  async function runQuery() {
    const query = document.getElementById("query").value;
    const result = document.getElementById("result");

    const session = await livecodes.prolog.createSession({limit: 1000});
    session.promiseQuery(query).then(async () => {
      result.innerText = "";
      for await (let answer of session.promiseAnswers()) {
        if(pl.type.is_substitution(answer)) {
          console.log(session.format_answer(answer));
          result.innerText += session.format_answer(answer) + '\\n';
        }
      }
      if (result.innerText == "") {
        result.innerText = "false.";
      }
      result.classList.remove('error');
    }).catch((err) => {
      result.innerText = err;
      result.classList.add('error');
    })
  }

  getTitle();
  runQuery();
</script>
`.trimStart(),
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
#query {
  width: 20em;
}
#result {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  color: #3d3d3d;
  margin: 1em;
  padding: 1em;
  text-align: left;
}
#result.error {
  color: red;
}`.trimStart(),
  },
  script: {
    language: 'prolog',
    content: `
title('Prolog').

male(john).
male(oliver).
male(ali).
male(james).
male(jack).
male(harry).
female(helen).
female(sophie).
female(mary).
female(sue).

parent(john, mary).
parent(john, sue).
parent(helen, mary).
parent(helen, sue).
parent(oliver, james).
parent(sophie, james).
parent(mary, jack).
parent(ali, jack).
parent(sue, harry).
parent(james, harry).

father(X, Y):- male(X),
    parent(X, Y).

mother(X, Y):- female(X),
    parent(X, Y).

grandfather(X, Y):- male(X),
    parent(X, Z),
    parent(Z, Y).

grandmother(X, Y):- female(X),
    parent(X, Z),
    parent(Z, Y).

sister(X, Y):- female(X),
    father(F, Y),
    father(F, X),
    X \\= Y.
sister(X, Y):- female(X),
    mother(M, Y),
    mother(M, X),
    X \\= Y.

brother(X, Y):- male(X),
    father(F, Y),
    father(F, X),
    X \\= Y.
brother(X, Y):- male(X),
    mother(M, Y),
    mother(M, X),
    X \\= Y.

uncle(X, Y):- parent(Z, Y),
    brother(Z, X).

aunt(X, Y):- parent(Z, Y),
    sister(Z, X).

ancestor(X, Y):- parent(X, Y).
ancestor(X, Y):- parent(X, Z),
    ancestor(Z, Y).
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
