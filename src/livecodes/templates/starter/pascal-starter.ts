import type { Template } from '../../models';

export const pascalStarter: Template = {
  name: 'pascal',
  title: window.deps.translateString('templates.starter.pascal', 'Pascal Starter'),
  thumbnail: 'assets/templates/pascal.png',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/pascal.png" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
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
`.trimStart(),
  },
  script: {
    language: 'pascal',
    content: `
program app;

{$mode objfpc}{$H+}

uses
  web, sysutils;

var
  Count: Integer = 0;

function HandleClick(Event: TJSEvent): boolean;
var
  Counter: TJSElement;
begin
  Count := Count + 1;
  Counter := document.getElementById('counter');
  if (Counter <> nil) then
    Counter.innerHTML := 'You clicked ' + IntToStr(Count) + ' times.';
end;

var
  Title: TJSElement;
  Button: TJSElement;
begin
  Writeln('Hello from Pascal!');

  Title := document.getElementById('title');
  if (Title <> nil) then
    Title.innerHTML := 'Pascal';

  Button := document.getElementById('counter-button');
  if (Button <> nil) then
    Button.addEventListener('click', @HandleClick);
end.
`.trimStart(),
  },
};
