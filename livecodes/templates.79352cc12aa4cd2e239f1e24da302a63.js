var p={name:"angular",title:"Angular Starter",thumbnail:"assets/templates/angular.svg",activeEditor:"script",markup:{language:"html",content:`<app>Loading...</app>
`},style:{language:"css",content:""},script:{language:"typescript",content:`
import { Component, Input, NgModule, enableProdMode } from '@angular/core@12.2.13';
import { CommonModule } from '@angular/common@12.2.13';
import { BrowserModule } from '@angular/platform-browser@12.2.13';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic@12.2.13';
import 'zone.js@0.12.0/dist/zone';

// app.component.ts
@Component({
  selector: "app",
  styles: [
    \`
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
  \`,
  ],
  template: \`
    <div class="container">
      <heading name="{{name}}"></heading>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/angular.svg" />
      <p>You clicked {{count}} times.</p>
      <button type="button" (click)="increment()">Click me</button>
    </div>
  \`,
})
class AppComponent {
  count = 0;
  name = "Angular";

  constructor() {}

  increment() {
    this.count += 1;
  }
}

// heading.component.ts
@Component({
  selector: "heading",
  template: "<h1>{{title}}</h1>",
})
class HeadingComponent {
  @Input() name: string;
  title: string;

  ngOnInit() {
    this.title = \`Hello, \${this.name}!\`;
  }
}

// app.module.ts
@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, HeadingComponent],
  bootstrap: [AppComponent],
  providers: [],
})
class AppModule {}

// main.ts
// enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: Error) => console.error(err));
`.trimStart()},customSettings:{typescript:{experimentalDecorators:!0}}};var u={name:"assemblyscript",title:"AssemblyScript Starter",thumbnail:"assets/templates/assemblyscript.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/assemblyscript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>loading...</button>
</div>

<script>
  (async() => {
    // The \`loadWasm\` method of \`livecodes\` global object
    // optionally takes an import object and
    // returns a promise which resolves to an object
    // exposing the compiled wasm module, wasm text and wasm binary
    const { wasmModule, text, binary } = await livecodes.loadWasm();
    const { __getString, getTitle, increment } = wasmModule.exports;

    const title = document.querySelector('#title');
    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    title.innerHTML = __getString(getTitle());
    button.innerText = 'Click me';
    button.disabled = false;

    button.addEventListener("click", () => {
      count = increment(count);
      counter.innerText = count;
    }, false);

  })();
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"assemblyscript",content:`
export function getTitle(): string {
  return "AssemblyScript";
}
export function increment(num: i32): i32 {
  return num + 1;
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var d={name:"astro",title:"Astro Starter",thumbnail:"assets/templates/astro.svg",activeEditor:"markup",markup:{language:"astro",content:`
---
import {format} from 'date-fns';

const title = "Astro";

const builtAt: Date = new Date();
const builtAtFormatted = format(builtAt, 'MMMM dd, yyyy -- H:mm:ss.SSS');
---
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Welcome to Astro</title>
  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .note {
      margin: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #E4E5E6;
      border: 1px solid #BBB;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Hello, {title}!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/astro.svg" />
    <p>You clicked <span id="counter">0</span> times.</p>
    <button id="counter-button">Click me</button>
    <p class="note">
      <strong>RENDERED AT:</strong><br/>
      {builtAtFormatted}
    </p>
  </div>
  <script>
    let count = 0
    document
      .querySelector("#counter-button")
      .addEventListener("click", () => {
        count += 1;
        document.querySelector("#counter").innerText = count;
    });
  <\/script>
</body>

</html>
`.trimStart()},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var g={name:"backbone",title:"Backbone Starter",thumbnail:"assets/templates/backbone.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/backbone.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"javascript",content:`
var Counter = Backbone.Model.extend({
  defaults: {
    value: 0,
    title: 'Backbone'
  },
  increment: function() {
    this.set({ value: this.get('value') + 1 });
  }
});
var counter = new Counter();

var AppView = Backbone.View.extend({
  el:'.container',
  render: function() {
    this.$('#counter').html(this.model.get('value'));
    this.$('#title').html(this.model.get('title'));
  },
  events:{
    'click #counter-button': 'addOne',
  },
  initialize: function() {
    this.model.on('change', this.render, this);
    this.render();
  },
  addOne: function() {
    this.model.increment();
    this.render();
  }
});
var view = new AppView({ model: counter });
`.trimStart()},stylesheets:[],scripts:["https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js","https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"],cssPreset:"",imports:{},types:{}};var h={name:"blank",title:"Blank Project",thumbnail:"assets/templates/blank.svg",activeEditor:"markup",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var b={name:"blockly",title:"Blockly Starter",thumbnail:"assets/templates/blockly.svg",activeEditor:"script",markup:{language:"html",content:`
<xml
  data-src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.1.0/src/dom-blocks.xml"
  data-type="blockly/xml"
  style="display: none"
></xml>
<script
  src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.1.0/src/dom-blocks.js"
  type="blockly/script"
><\/script>

<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/blockly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"blockly",content:`
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="?\`Dl!ysD-zLY64Lpe)c(">count</variable>
  </variables>
  <block type="dom_set_property" id="sr4sLpCoHdr%yw}lz]{u" x="35" y="35">
    <value name="element">
      <shadow type="dom_element_selector" id="8q6b-NxGim%yU^KHWg+M">
        <value name="selector">
          <shadow type="text" id="8MF#)_03uL#%YWyCDgM^">
            <field name="TEXT">

            </field>
          </shadow>
        </value>
      </shadow>
      <block type="dom_element_by_id" id="hXkkuwcC=n!.Z6H?$ROO">
        <value name="id">
          <shadow type="text" id="q=C\`rbb\`[ki-OOw7GiYK">
            <field name="TEXT">title</field>
          </shadow>
        </value>
      </block>
    </value>
    <value name="property">
      <shadow type="dom_element_properties" id="AHLrrpzt[m1Yx/4?2U-{">
        <field name="property">innerText</field>
      </shadow>
    </value>
    <value name="value">
      <shadow type="text" id="M8W]wK^:#Db^F_bIEad3">
        <field name="TEXT">Blockly</field>
      </shadow>
    </value>
    <next>
      <block type="variables_set" id="Ecm7Dkj.nJmeV{jTL8Y_">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="VALUE">
          <block type="math_number" id="D%LW6COR3l5[Z9MCjx/L">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>
    </next>
  </block>
  <block type="dom_handle_event" id="K,_92]w;quNkxuUv*s9n" x="35" y="270">
    <value name="element">
      <shadow type="dom_element_selector" id="QV~_0VyIy(*b{r\`yJWy1">
        <value name="selector">
          <shadow type="text" id="iYe)MS{x+-J}5Kph!n7M">
            <field name="TEXT">button</field>
          </shadow>
        </value>
      </shadow>
    </value>
    <value name="event">
      <shadow type="dom_events" id="Dfnt}40u]T$?:p:S}irM">
        <field name="event">click</field>
      </shadow>
    </value>
    <statement name="event_handler">
      <block type="math_change" id="dxKITU6a]\`3w(sSIus2K">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="DELTA">
          <shadow type="math_number" id="_exnsV4gci%)lqM3#)2A">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <next>
          <block type="dom_set_property" id="c]gWo#)7YgY8eszx.]fO">
            <value name="element">
              <shadow type="dom_element_selector" id="\`p]W.N%K-bP39x)tC,j0">
                <value name="selector">
                  <shadow type="text" id="}uE=/^7ZJn-xR4v1Oumn">
                    <field name="TEXT">

                    </field>
                  </shadow>
                </value>
              </shadow>
              <block type="dom_element_by_id" id="PWFAw[cc{xg0qf}Frlw|">
                <value name="id">
                  <shadow type="text" id="}0V..:dc(=V;hNFV53R[">
                    <field name="TEXT">counter</field>
                  </shadow>
                </value>
              </block>
            </value>
            <value name="property">
              <shadow type="dom_element_properties" id=")K$1i925QSZjn/w:{j[Z">
                <field name="property">innerText</field>
              </shadow>
            </value>
            <value name="value">
              <shadow type="text" id="gu4kA*Ig3*6\`sGaI*P6C">
                <field name="TEXT">

                </field>
              </shadow>
              <block type="variables_get" id="LmiNr+~z9=zAWH]H8gqm">
                <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var f={name:"bootstrap",title:"Bootstrap Starter",thumbnail:"assets/templates/bootstrap.svg",activeEditor:"markup",markup:{language:"html",content:`
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item active">
          <a class="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            >Disabled</a
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown01"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >Dropdown</a
          >
          <ul class="dropdown-menu" aria-labelledby="dropdown01">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<main class="container">
  <div class="starter-template text-center py-5 px-3">
    <h1>Bootstrap starter template</h1>
    <p class="lead">
      Use this document as a way to quickly start any new project.<br />
      All you get is this text and a mostly barebones HTML document.
    </p>
  </div>
</main>
`.trimStart()},style:{language:"css",content:`
body {
  padding-top: 5rem;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
`.trimStart()},script:{language:"javascript",content:""},stylesheets:["{{ __CDN_URL__ }}bootstrap@5.3.0/dist/css/bootstrap.min.css"],scripts:["{{ __CDN_URL__ }}bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"],cssPreset:"",imports:{},types:{}};var v={name:"coffeescript",title:"CoffeeScript Starter",thumbnail:"assets/templates/coffeescript.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/coffeescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"coffeescript",content:`
titleElement = document.getElementById 'title'
counterElement = document.getElementById 'counter'
button = document.getElementById 'counter-button'

title = 'CoffeeScript'
titleElement.innerText = title

counter = (count) -> -> count += 1
increment = counter 0

button.addEventListener('click',
  -> counterElement.innerText = increment())
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var y={name:"go",title:"Go Starter",thumbnail:"assets/templates/go.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()},script:{language:"go",content:`
package main

import (
	"fmt"
	"syscall/js"
	"time"
)

func main() {
	title := querySelector("#title")
	title.Set("innerHTML", "Golang")

	registerCounter()

	// yes, you can use goroutines (check the console)
	go greet()
  fmt.Println("Hello!")
}

func querySelector(id string) js.Value {
	return js.Global().Get("document").Call("querySelector", id)
}

func registerCounter() {
	btn := querySelector("#counter-button")
	counter := querySelector("#counter")
	count := 0

	var cb js.Func
	cb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		count += 1
		counter.Set("innerHTML", count)
		return nil
	})
	btn.Call("addEventListener", "click", cb)
}

func greet() {
	if hours, _, _ := time.Now().Clock(); hours < 12 {
		fmt.Println("Good morning")
	} else if hours < 18 {
		fmt.Println("Good afternoon")
	} else {
		fmt.Println("Good evening")
	}
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var x={name:"jquery",title:"jQuery Starter",thumbnail:"assets/templates/jquery.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jquery.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 300px;
}
`.trimStart()},script:{language:"javascript",content:`
import $ from "jquery";

$("#title").text('jQuery');

let count = 0;
$("#counter-button").click(() => {
  count += 1;
  $("#counter").text(count);
});
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var S={name:"knockout",title:"Knockout Starter",thumbnail:"assets/templates/knockout.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span data-bind="text: title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/knockout.svg" />
  <p>You clicked <span data-bind="text: numberOfClicks">0</span> times.</p>
  <button data-bind="click: registerClick">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()},script:{language:"javascript",content:`
import ko from "knockout";

class ClickCounterViewModel {
  constructor() {
    this.title = 'Knockout';
    this.numberOfClicks = ko.observable(0);

    this.registerClick = function () {
      this.numberOfClicks(this.numberOfClicks() + 1);
    };
  }
}

ko.applyBindings(new ClickCounterViewModel());
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var k={name:"livescript",title:"LiveScript Starter",thumbnail:"assets/templates/livescript.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/livescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"livescript",content:`
{ capitalize, join, map, words } = require 'prelude-ls'

title = 'live script'
|> words
|> map capitalize
|> join ''

(document.getElementById \\title).innerText = title

increment = (count) -> -> count += 1
counter = increment 0

counter-element = document.getElementById \\counter
button = document.getElementById \\counter-button

button.addEventListener \\click,
  -> counter-element.innerText = counter!
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var w={name:"lua",title:"Lua Starter",thumbnail:"assets/templates/lua.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lua.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"lua",content:`
js = require "js"
window = js.global
document = window.document

document:getElementById("title").innerHTML = "Lua"

Counter = {count = 0}
function Counter:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function Counter:increment ()
  self.count = self.count + 1
end
function Counter:show ()
  local counter_el = document:getElementById("counter")
  counter_el.innerHTML = ("You clicked %d times."):format(self.count)
end

counter = Counter:new(nil)
button = document:querySelector("#counter-button")
button:addEventListener("click", function()
  counter:increment()
  counter:show()
end)

-- check console
time = os.date("*t").hour
if time < 12 then
  print ("Good morning")
elseif time >= 12 and time < 18 then
  print ("Good afternoon")
else
  print ("Good evening")
end
`.trimStart()}};var _={name:"mdx",title:"MDX Starter",thumbnail:"assets/templates/mdx.svg",activeEditor:"markup",markup:{language:"mdx",content:`
import { Greeting, Counter } from './script';

<Greeting name="MDX" />

![MDX Logo]({{ __livecodes_baseUrl__ }}assets/templates/mdx.svg)

<Counter />
`.trimStart()},style:{language:"css",content:`
body,
body button {
  text-align: center;
  font: 1em sans-serif;
}
img {
  width: 150px;
}
`.trimStart()},script:{language:"jsx",content:`
import { useState } from "react";

export const Greeting = (props) => <h1>Hello, {props.name || "World"}!</h1>;

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trimStart()}};var j={name:"perl",title:"Perl Starter",thumbnail:"assets/templates/perl.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/perl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"perl",content:`
use strict;

my $title = 'Perl';
JS::inline('document.getElementById("title").innerHTML') = $title;

{
package Counter;
  sub new {
    my $class = shift;
    my $self = {count => 0};
    return bless $self, $class;
  }
  sub count {
    my $self = shift;
    return $self->{count};
  }
  sub increment {
    my $self = shift;
    $self->{count}++;
  }
}

my $counter = Counter->new;

sub onClick {
    $counter->increment;
    JS::inline('document.getElementById("counter").innerHTML') =
    $counter->count;
}

JS::inline('document.getElementById("counter-button").onclick') = \\&onClick;

# check console
my ($sec,$min,$hour) = localtime(time);
if ($hour < 12) {
  print "Good morning";
} elsif ($hour >= 12 && $hour < 18) {
  print "Good afternoon";
} else {
  print "Good evening";
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var T={name:"php",title:"PHP Starter",thumbnail:"assets/templates/php.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"php",content:`
<?php
$title = 'PHP';
$document->getElementById('title')->innerText = $title;

$count = 0;

$document
  ->getElementById('counter-button')
  ->addEventListener('click', function () use (&$count, $document) {
      $count += 1;
      $document->getElementById('counter')->innerText = $count;
      echo "count: $count";
  });
`.trimStart()}};var C={name:"preact",title:"Preact Starter",thumbnail:"assets/templates/preact.svg",activeEditor:"script",markup:{language:"html",content:`<div id="app"></div>
`},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"jsx",content:`
/** @jsx h */
import { h, render } from 'preact';
import { useSignal } from "@preact/signals?deps=preact";

function App(props) {
  const count = useSignal(0);
  return (
    <div class="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/preact.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => count.value++}>Click me</button>
    </div>
  );
}

render(<App name="Preact" />, document.body);
`.trimStart()}};var U={name:"python-wasm",aliases:["pyodide"],title:"Python (Wasm) Starter",thumbnail:"assets/templates/python.svg",activeEditor:"script",markup:{language:"html",content:`
<h1 id="title">Hello, World!</h1>
<div id="plot">Loading...</div>
`.trimStart()},style:{language:"css",content:`h1 {
  text-align: center;
}
`.trimStart()},script:{language:"python-wasm",content:`
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
  el = document.querySelector(selector)
  el.innerHTML = ''
  document.pyodideMplTarget = el
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
`.trimStart()}};var E={name:"python",title:"Python Starter",thumbnail:"assets/templates/python.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1 id="header">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/python.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"python",content:`
from browser import document
import time

title = 'Python'
document['header'].html = f"Hello, {title}!"

counter = 0

def increment(ev):
    global counter
    counter += 1
    document['counter'].html = str(counter)

document["counter-button"].bind("click", increment)

# check console
current_time = int(time.strftime('%H'))
if current_time < 12 :
      print('Good morning')
elif 12 <= current_time < 18:
      print('Good afternoon')
else:
      print('Good evening')
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var q={name:"react-native",title:"React Native Starter",thumbnail:"assets/templates/react.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"react-native",content:`
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const logoUri = \`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" /><circle cx="420.9" cy="296.5" r="45.7" /><path d="M520.5 78.1z" /></g></svg>\`;

function Link(props) {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={StyleSheet.compose(styles.link, props.style)}
    />
  );
}

function Counter(props) {
  const [count, setCount] = useState(props.initialCount);
  return (
    <View>
      <Text style={styles.text}>You clicked {count} times.</Text>
      <Button onPress={() => setCount(count + 1)} title="Click me" />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="React logo"
          source={{ uri: logoUri }}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>React Native for Web</Text>
      </View>
      <Text style={styles.text}>
        This is an example app built with{" "}
        <Link href="https://necolas.github.io/react-native-web/">
          React Native for Web
        </Link>
      </Text>
      <Counter initialCount={0}></Counter>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    marginVertical: 20,
    maxWidth: 500,
  },
  logo: {
    height: 150,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "0.5em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "0.5em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
});
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var L={name:"react",title:"React Starter",thumbnail:"assets/templates/react.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"jsx",content:`
import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/react.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default function App() {
  return <Counter name="React" />;
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var $={name:"markdown",title:"Markdown Starter",thumbnail:"assets/templates/markdown.svg",activeEditor:"markup",markup:{language:"markdown",content:`
# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

\`\`\`
Give examples
\`\`\`

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

\`\`\`
Give the example
\`\`\`

And repeat

\`\`\`
until finished
\`\`\`

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

\`\`\`
Give an example
\`\`\`

### And coding style tests

Explain what these tests test and why

\`\`\`
Give an example
\`\`\`

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


Source: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
`.trimStart()},style:{language:"css",content:`
@import "github-markdown-css";

body {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px;
  margin: 20px !important;
}
`.trimStart()},script:{language:"javascript",content:`document.body.classList.add('markdown-body');
`},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var M={name:"rescript",title:"ReScript Starter",thumbnail:"assets/templates/rescript.png",activeEditor:"script",markup:{language:"html",content:`<div id="app">Loading...</div>
`},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"rescript",content:`
// import npm modules
@module("leftpad") external leftpad: int => int => string = "default"

module App = {
  @react.component
  let make = (~name: string) => {
    let title = "Hello, " ++ name ++ "!"

    let (count, setCount) = React.useState(_ => 0)
    let onClick = _evt => {
      setCount(_prev => _prev + 1)
    }

    let times = switch count {
    | 1 => "once"
    | 2 => "twice"
    | (n) if n < 6 =>
        Belt.Int.toString(n) ++ " times"
    | n => leftpad(n, 3) ++ " times"
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

Js.log("Hello, ReScript!")
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var B={name:"reason",title:"Reason Starter",thumbnail:"assets/templates/reason.svg",activeEditor:"script",markup:{language:"html",content:`<div id="app">Loading...</div>
`},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"reason",content:`
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
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var R={name:"ocaml",title:"Ocaml Starter",thumbnail:"assets/templates/ocaml.svg",activeEditor:"script",markup:{language:"html",content:`<div id="app">Loading...</div>
`},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()},script:{language:"ocaml",content:`
module App =
  struct
    let make ~name  =
      let title = "Hello, " ^ name ^ "!" in

      let (count,setCount) = React.useState (fun ()  -> 0) in

      let times =
        match count with
        | 1 -> "once"
        | 2 -> "twice"
        | n -> (string_of_int n) ^ " times" in

      ((div ~className: "container"
          ~children:[((h1 ~children: [React.string title] ())[@JSX ]);
                    ((img ~className: "logo"
                        ~alt: "logo"
                        ~src: "{{ __livecodes_baseUrl__ }}assets/templates/ocaml.svg"
                        ~children:[] ())[@JSX ]);
                    ((p
                        ~children:[React.string ("You clicked "
                                                ^ times)] ())[@JSX ]);
                    ((button
                        ~onClick:(fun _  -> setCount (fun _  -> count + 1))
                        ~children:[React.string "Click me"] ())
                    [@JSX ])] ())[@JSX ])[@@react.component ]
  end

let _ =
  match ReactDOM.querySelector "#app" with
  | ((Some (app))[@explicit_arity ]) ->
      ReactDOM.render
        ((App.createElement
            ~name: "OCaml"
            ~children:[] ())[@JSX ]) app
  | None  -> ()

let _ = print_endline "Hello, OCaml!"
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var H={name:"riot",title:"Riot.js Starter",thumbnail:"assets/templates/riot.svg",activeEditor:"script",markup:{language:"html",content:`
<counter title="Riot.js"></counter>

<script>
  livecodes.templateData = {
    url: 'https://riot.js.org/'
  }
<\/script>
`.trimStart()},style:{language:"css",content:""},script:{language:"riot",content:`
<counter>
  <div class="container">
    <h1>Hello, { props.title }!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/riot.svg" />
    <p>You clicked { state.count } times.</p>
    <button onclick="{ increment }">Click me</button>
    <div class="footer">
      <a href="{ props.url }" target="_blank">Riot.js Website</a>
    </div>
  </div>

  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .footer {
      font: 0.8em sans-serif;
      margin: 1.5em;
    }
  </style>

  <script>
    export default {
      onBeforeMount(props, state) {
        this.state = {
          count: 0,
        };
      },
      increment(e) {
        e.preventDefault();
        this.update({
          count: this.state.count + 1,
        });
      },
    };
  <\/script>
</counter>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var P={name:"ruby",title:"Ruby Starter",thumbnail:"assets/templates/ruby.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ruby.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"ruby",content:`
require "date"
require "native"

title = "Ruby"
$$.document.querySelector("#title").innerHTML = title

$counter = 0
$counter_element = $$.document.querySelector "#counter"

def increment
    $counter += 1
    $counter_element.innerHTML = "You clicked %d times." % [$counter]
end

button = $$.document.querySelector "button"
button.onclick = -> {increment}

# check console
current_time = Time.now.hour
msg = Date.today.strftime "happy %A!"
if current_time < 12
    puts "Good morning, " + msg
elsif current_time < 18
    puts "Good afternoon, " + msg
else
    puts "Good evening, " + msg
end
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var N={name:"scheme",title:"Scheme Starter",thumbnail:"assets/templates/scheme.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/scheme.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"scheme",content:`
(let ((title "Scheme"))
  (set-content! "#title" title))

(let ((counter 0))
  (add-handler! "#counter-button" "click"
    (lambda (ev)
      (set! counter (+ counter 1))
      (set-content! "#counter" (number->string counter)))))

; check console
(let ((time-now (date-hour (current-date))))
  (console-log
    (cond ((< time-now 12) "Good morning")
          ((< time-now 18) "Good afternoon")
          (else "Good evening"))))
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var Y={name:"solid",title:"Solid Starter",thumbnail:"assets/templates/solid.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"solid.tsx",content:`
import { createSignal } from "solid-js";

function Counter(props: { name: string }) {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/solid.svg" />
      <p>You clicked {count()} times.</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

export default function App() {
  return <Counter name="Solid" />;
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var D={name:"sql",title:"SQL Starter",thumbnail:"assets/templates/sqlite.svg",activeEditor:"script",markup:{language:"html",content:`
<div id="output">
  <details open>
    <summary>Tables</summary>
    <div id="tables"></div>
  </details>
  <details open>
    <summary>Result</summary>
    <pre><code id="result"></code></pre>
  </details>
  <details open>
    <summary>Result as objects</summary>
    <pre><code id="obj-result"></code></pre>
  </details>
</div>

<script>
  livecodes.sql.render('#tables');

  livecodes.sql.getResult().then((result) => {
    console.log(result)
    document.querySelector('#result').innerHTML =  JSON.stringify(result, null, 2);
  }).catch(console.error);


  livecodes.sql.getResultAsObjects().then((results) => {
    results.forEach(console.table);
    document.querySelector('#obj-result').innerHTML = JSON.stringify(results, null, 2);
  }).catch(console.error);
<\/script>
`.trimStart()},style:{language:"css",content:`
#output {
  color: #3d3d3d;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#output summary {
  cursor: pointer;
}

#output table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 5px;
  border-spacing: 0;
  font-size: 0.9em;
  margin: 1em;
  width: 95%;
}

#output th,
#output td {
  padding: 0.5em;
}

#output tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#output pre {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  margin: 1em;
  min-width: 95%;
  padding: 1em;
}
`.trimStart()},script:{language:"sql",content:`
-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int NOT NULL,
  rev int NOT NULL,
  quote varchar(200) NOT NULL,
  PRIMARY KEY (id, rev)
);

INSERT INTO quotes (id, rev, quote) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. \u2013 Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. \u2013 Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. \u2013 T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. \u2013 Walt Disney');

SELECT a.id, a.rev, a.quote
FROM quotes a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM quotes
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM quotes a
LEFT OUTER JOIN quotes b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM quotes) a
  WHERE a.rank = 1;
`.trimStart()}};var W={name:"stencil",title:"Stencil Starter",thumbnail:"assets/templates/stencil.png",activeEditor:"script",markup:{language:"html",content:`<my-app title="Stencil"></my-app>
`},style:{language:"css",content:""},script:{language:"stencil",content:`
import { Component, Prop, h, State } from "@stencil/core";

@Component({
  tag: "my-app",
  styles: \`
    my-app,
    button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`,
})
export class App {
  @Prop() title: string;
  @State() count = 0;

  increment = () => {
    this.count += 1;
  };

  render() {
    return (
      <div class="container">
        <h1>Hello, {this.title}!</h1>
        <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/stencil.png" />
        <p>You clicked {this.count} times.</p>
        <button onClick={this.increment}>Click me</button>
      </div>
    );
  }
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var O={name:"svelte",title:"Svelte Starter",thumbnail:"assets/templates/svelte.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"svelte",content:`
<script>
  let title = "Svelte";
  let counter = 0;
  function increment() {
    counter += 1;
  }
<\/script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/svelte.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var A={name:"tailwindcss",title:"Tailwind CSS Starter",thumbnail:"assets/templates/tailwindcss.svg",activeEditor:"markup",markup:{language:"html",content:`
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="back-card"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div class="max-w-md mx-auto">
        <div>
          <img src="{{ __livecodes_baseUrl__ }}assets/templates/tailwindplay.svg" class="h-7 sm:h-8" />
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p class="prose md:prose-xl">A template based on <a href="https://play.tailwindcss.com/" class="text-cyan-600 hover:text-cyan-700" target="_blank">Tailwind CSS playground</a>. Here you can do things like:</p>
            <ul class="list-disc space-y-2">
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">
                  Customizing configuration in
                  <code class="text-sm font-bold text-gray-900">menu \u2192 Custom Settings</code>
                </p>
              </li>
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">
                  Extracting classes with
                  <code class="text-sm font-bold text-gray-900">@apply</code>
                </p>
              </li>
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">Viewing generated CSS code (in <code class="text-sm font-bold text-gray-900">Compiled</code> pane below)</p>
              </li>
            </ul>
            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
          </div>
          <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>Want to dig deeper into Tailwind?</p>
            <p>
              <a href="https://tailwindcss.com/docs" class="text-cyan-600 hover:text-cyan-700" target="_blank"> Read the docs &rarr; </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`.trimStart()},style:{language:"css",content:`
@tailwind base;
@tailwind components;
@tailwind utilities;

.back-card {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl;
}
`.trimStart()},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",processors:["tailwindcss"],imports:{},types:{},customSettings:{tailwindcss:{plugins:["@tailwindcss/forms","@tailwindcss/typography","@tailwindcss/aspect-ratio","@tailwindcss/line-clamp"],theme:{extend:{colors:{sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63"}}}}}}};var I={name:"typescript",title:"TypeScript Starter",thumbnail:"assets/templates/typescript.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/typescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"typescript",content:`
class Counter {
  private count: number;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
  }
  getValue() {
    return this.count;
  }
}

const title = document.querySelector<HTMLElement>("#title")!;
const count = document.querySelector<HTMLElement>("#counter")!;
const button = document.querySelector<HTMLElement>("#counter-button")!;

title.innerText = "TypeScript";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.innerText = String(counter.getValue());
  },
  false
);
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var z={name:"vue",title:"Vue 3 SFC Starter",thumbnail:"assets/templates/vue.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"vue",content:`
<script setup lang="tsx">
  import { ref } from 'vue';

  const name = 'Vue';
  const count = ref(0);
  const align = 'center';

  // define inline component
  function Greeting(props: {name: string}) {
    return <h1>Hello, { props.name }!</h1>
  }
<\/script>

<template>
  <div class="container">
    <Greeting :name="name" />
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
    <p>You clicked {{ count }} times.</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var V={name:"vue2",title:"Vue 2 Starter",thumbnail:"assets/templates/vue.svg",activeEditor:"script",markup:{language:"html",content:`
<div id="app">
  <h1>Hello, Vue!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
  <p>You clicked {{ counter }} times.</p>
  <button @click="increment()">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
#app,
#app button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"javascript",content:`
new Vue({
  el: "#app",
  data: {
    counter: 0,
  },
  methods: {
    increment() {
      this.counter += 1;
    },
  },
});
`.trimStart()},stylesheets:[],scripts:["{{ __CDN_URL__ }}vue@2"],cssPreset:"",imports:{},types:{}};var X={name:"wat",title:"WebAssembly Text Starter",thumbnail:"assets/templates/webassembly.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/webassembly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  (async () => {
    const importObject = {
      title: {
        change: changeTitle,
      },
    };

    // The \`loadWasm\` method of \`livecodes\` global object
    // optionally takes an import object and
    // returns a promise which resolves to an object
    // exposing the compiled wasm module and wasm binary
    const { wasmModule, binary } = await livecodes.loadWasm(importObject);
    const { memory, setTitle, increment } = wasmModule.exports;

    function changeTitle(offset, length) {
      const bytes = new Uint8Array(memory.buffer, offset, length);
      const title = new TextDecoder("utf8").decode(bytes);
      document.querySelector("#title").innerText = title;
    }
    setTitle();

    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    button.addEventListener(
      "click",
      () => {
        count = increment(count);
        counter.innerText = count;
      },
      false
    );
  })();
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"wat",content:`
(module
  (import "title" "change" (func $changeTitle (param i32) (param i32)))
  (export "memory" (memory $0))
  (export "setTitle" (func $setTitle))
  (export "increment" (func $increment))
  (memory $0 1)
  (data 0 (i32.const 0) "WebAssembly Text")
  (func $setTitle
    (call $changeTitle (i32.const 0) (i32.const 16))
  )
  (func $increment (param $0 i32) (result i32)
    (i32.add (local.get $0) (i32.const 1))
  )
)
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var G={name:"malina",title:"Malina.js Starter",thumbnail:"assets/templates/malina.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"malina",content:`
<script>
  let title = "Malina.js";
  let counter = 0;
  function increment() {
    counter += 1;
  }
<\/script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/malina.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var F={name:"commonlisp",title:"Common Lisp Starter",thumbnail:"assets/templates/commonlisp.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/commonlisp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"commonlisp",content:`
(defun set-attribute (&key selector attribute value)
  (let ((node
         (#j:document:querySelector selector)))
    (setf (jscl::oget node attribute) value)
    node))

(let ((title "Common Lisp"))
  (set-attribute :selector "#title" :attribute "innerHTML"
      :value (format nil "Hello, ~A!" title)))

(let ((counter 0))
  (set-attribute :selector "#counter-button" :attribute "onclick"
    :value #'(lambda (ev)
              (setf counter (+ counter 1))
              (set-attribute :selector "#counter" :attribute "innerHTML"
               :value counter))))

(#j:console:clear)
(write "Hello, Common Lisp!")
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var J={name:"cpp",title:"C++ Starter",thumbnail:"assets/templates/cpp.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  // set initial input
  livecodes.cpp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.cpp.loaded;

    // get initial output
    const initialOutput = livecodes.cpp.output;
    update(initialOutput);

    button.onclick = async () => {
      // run with new input
      const {output, error, exitCode} = await livecodes.cpp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"cpp",content:`
#include <iostream>
using namespace std;

int main() {
    char title[] = "C++";
    cout << title << endl;

    int count;
    cin >> count;
    count += 1;
    cout << count << endl;

    return 0;
}
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var Z={name:"julia",title:"Julia Starter",thumbnail:"assets/templates/julia.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/julia.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.julia.input = "";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.julia.loaded;

    // get initial output
    const initialOutput = livecodes.julia.output;
    update(initialOutput);

    button.innerText = "Click me";
    button.disabled = false;
    button.onclick = async () => {
      // run with new input
      const output = await livecodes.julia.run(window.count);
      update(output);
    };

    function parseOutput(output) {
      return output.replace(/"/g, '').split('\\n');
    }

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = parseOutput(output);

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"julia",content:`
function increment(x)
    if x == ""
        return 0
    else
        num = parse(Int, x)
        num + 1
    end
end

function getTitle()
    "Julia"
end

function formatOutput(args...)
    join(map(x -> string(x), args), "\\n")
end

formatOutput(getTitle(), increment(livecodesInput))
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var K={name:"cpp-wasm",aliases:["clang"],title:"C++ (Wasm) Starter",thumbnail:"assets/templates/cpp.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.cpp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.cpp.loaded;

    // get initial output
    const initialOutput = livecodes.cpp.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.cpp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"cpp-wasm",content:`
#include <iostream>
using namespace std;

int main() {
    char title[] = "C++";
    cout << title << endl;

    int count;
    cin >> count;
    count += 1;
    cout << count << endl;

    return 0;
}
`.trimStart()}};var Q={name:"tcl",title:"Tcl Starter",thumbnail:"assets/templates/tcl.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tcl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set input
  livecodes.tcl.input = "-1";

  addEventListener("load", async () => {
    const button = document.querySelector("#counter-button");
    // wait till loaded
    await livecodes.tcl.loaded;
    button.innerText = "Click me";
    button.disabled = false;

    button.onclick = async () => {
      const {output, error} = await livecodes.tcl.run();
    };
  });
<\/script>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"tcl",content:`
set title "Tcl"
::wacl::dom attr "#name" innerText $title

set input [gets stdin]
if {[info exists count]} {
  incr count
} else {
  set count [expr $input + 1]
}
::wacl::dom attr "#counter" innerText $count
puts $count
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var tt={name:"prolog",title:"Prolog Starter",thumbnail:"assets/templates/tau-prolog.svg",activeEditor:"script",markup:{language:"html",content:`
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
<\/script>
`.trimStart()},style:{language:"css",content:`
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
}`.trimStart()},script:{language:"prolog",content:`
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
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var et={name:"clio",title:"Clio Starter",thumbnail:"assets/templates/clio.png",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/clio.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"clio",content:`
fn capitalize str:
  (str.charAt 0 -> .toUpperCase) + (str.slice 1 -> .toLowerCase)

fn greet name:
  f"Hello, {name}!"

fn setTitle name:
  title = document.querySelector "#title"
  title.innerText = name -> capitalize -> greet

fn increment value:
  (Number value) + 1

fn activateBtn btn:
  btn.disabled = false
  btn.innerText = "Click me"
  btn

fn onBtnClick:
  counter = document.querySelector "#counter"
  counter.innerText = increment counter.innerText

export fn main argv:
  setTitle "clio"
  document.querySelector "#counter-button"
    -> activateBtn
    -> .addEventListener "click" onBtnClick
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var st={name:"diagrams",title:"Diagrams Starter",thumbnail:"assets/templates/diagrams.svg",activeEditor:"markup",markup:{language:"diagrams",contentUrl:"{{ __livecodes_baseUrl__ }}assets/templates/diagrams-starter.html"},style:{language:"css",content:`
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container div {
  width: 100%;
  text-align: center;
}

.container img {
  width: 80%;
  max-width: 600px;
}

.container h3:not(:nth-child(1)) {
  margin-top: 3em;
}
`.trimStart()},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var ot={name:"imba",title:"Imba Starter",thumbnail:"assets/templates/imba.svg",activeEditor:"script",markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"imba",content:`
tag app-counter
	prop name = "Imba"
	prop count = 0

	css self
		text-align: center
		font: 1em sans-serif

	css .btn h:2em	w:10em	fs:1em

	<self>
		<h1> "Hello, {name}!"
		<img[h:100px] alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/imba.svg">
		<p> "You clicked {count} times."
		<button.btn @click=count++> "Click me"

imba.mount <app-counter>
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var nt={name:"jest",title:"Jest Starter",thumbnail:"assets/templates/jest.svg",autotest:!0,activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
  <p class="info">Run tests in the "Tests" panel below.</p>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
.info {
  color: #404040;
  font-size: 0.9em;
  margin: 2em;
}
`.trimStart()},script:{language:"javascript",content:`
export class Counter {
  count;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
  }
  getValue() {
    return this.count;
  }
}

const title = document.querySelector("#title");
const count = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "Jest";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.innerText = counter.getValue();
  },
  false
);
`.trimStart()},tests:{language:"tsx",content:`
import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { assert } from "chai";
import { Counter } from "./script";

describe("Counter Class", () => {
  test("Should initialize count with zero", () => {
    const counter = new Counter();
    expect(counter.getValue()).toBe(0);
  });

  test("Should increment", () => {
    const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.increment();
    assert.equal(counter.getValue(), 3);
  });})

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('jest.svg');
  });

  test("Should increment counter on button click", async () => {
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`.trimStart()},tools:{enabled:"all",active:"tests",status:"open"}};var rt={name:"jest-react",title:"Jest/React Starter",thumbnail:"assets/templates/jest.svg",activeEditor:"script",autotest:!0,markup:{language:"html",content:""},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
.info {
  color: #404040;
  font-size: 0.9em;
  margin: 2em;
}
`.trimStart()},script:{language:"jsx",content:`
import { useState } from "react";

export const increment = (count) => (count ?? 0) + 1;

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(increment(count))}>Click me</button>
      <p className="info">Run tests in the "Tests" panel below.</p>
    </div>
  );
}

export default function App() {
  return <Counter name="Jest with React" />;
}
`.trimStart()},tests:{language:"tsx",content:`
import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { assert } from "chai";
import App, { increment } from "./script";

const renderComponent = () => {
  cleanup();
  return waitFor(() => {
    return render(<App />, {
      container: document.querySelector('#app')
    });
  });
}

beforeEach(renderComponent);

afterAll(renderComponent);

describe("Increment", () => {
  test("should increment count", () => {
    expect(increment(3)).toBe(4);
  });

  test("should return 1 if no count was supplied", () => {
    assert.equal(increment(), 1);
  });
});

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest with React!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('jest.svg');
  });

  test("Should increment counter on button click", async () => {
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`.trimStart()},tools:{enabled:"all",active:"tests",status:"open"}};var at={name:"javascript",title:"JavaScript Starter",thumbnail:"assets/templates/javascript.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/javascript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"javascript",content:`
const title = document.querySelector("#title");
const counter = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "JavaScript";
let count = 0;

button.addEventListener("click", () => {
  count++;
  counter.innerText = count;
});
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var it={name:"r",title:"R Starter",thumbnail:"assets/templates/r.svg",activeEditor:"script",markup:{language:"html",content:`
<div id="output">Loading...</div>

<script>
  // livecodes.r.config = {
  //   container: '#output',
  //   canvasHeight: 309,
  //   canvasWidth: 500,
  //   canvasPointSize: 12,
  //   canvasBackground: 'transparent',
  // };
<\/script>
`.trimStart()},style:{language:"css",content:""},script:{language:"r",content:`
head(iris)

PW <- iris$Petal.Width
PL <- iris$Petal.Length
species <- iris$Species
speciesID <- as.numeric(iris$Species)

fit <- lm(PW ~ PL)
summary(fit)

plot(PL, PW,
     pch = speciesID,
     col = speciesID,
     main = "Petal Width vs Length",
     xlab = "Petal Length",
     ylab = "Petal Width")
legend("topleft",
       levels(species),
       pch = 1:3,
       col = 1:3)


# This will take some time to load the packages

# library(dplyr)
# library(ggplot2)

# head(diamonds)

# diamonds %>%
#   filter(depth > 60) %>%
#   group_by(cut) %>%
#   summarize(mean_price = mean(price)) %>%
#   ggplot(aes(x = cut, y = mean_price, fill = cut)) +
#       geom_bar(stat = "identity")
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var lt={name:"civet",title:"Civet Starter",thumbnail:"assets/templates/civet.png",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/civet.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"civet",content:`
titleElement := document.getElementById 'title'
counterElement := document.getElementById 'counter'
button := document.getElementById 'counter-button'

title := 'Civet'
titleElement.innerText = title

counter := (count: number) => => count += 1
increment := counter 0
function handleClick: void counterElement.innerText = increment()

button.addEventListener 'click', handleClick
`.trimStart()},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{}};var ct={name:"fennel",title:"Fennel Starter",thumbnail:"assets/templates/fennel.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fennel.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"fennel",content:`
(global js (require :js))
(global window js.global)
(global document window.document)
(tset (document:getElementById :title) :innerHTML :Fennel)
(global Counter {:count 0})
(fn Counter.new [self o]
  (set-forcibly! o (or o {}))
  (setmetatable o self)
  (set self.__index self)
  o)
(fn Counter.increment [self] (set self.count (+ self.count 1)))
(fn Counter.show [self]
  (let [counter-el (document:getElementById :counter)]
    (set counter-el.innerHTML (: "You clicked %d times." :format self.count))))
(global counter (Counter:new nil))
(global button (document:querySelector "#counter-button"))
(button:addEventListener :click (fn [] (counter:increment) (counter:show)))
`.trimStart()}};var mt={name:"teal",title:"Teal Starter",thumbnail:"assets/templates/teal.png",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/teal.png" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"teal",content:`
global record Js
  record global
    record document
      querySelector: function(self: document, string): Element
    end
  end
end

global record Element
  innerHTML: string
  addEventListener: function(self: Element, string, function): nil
end

global js: Js = require "js"
global window = js.global
global document = window.document

global title = document:querySelector("#title")
global button = document:querySelector("#counter-button")
global counter_el = document:querySelector("#counter")

title.innerHTML = "Teal"

global count = 0
global function increment (current: integer): integer
  return current + 1
end

button:addEventListener("click", function()
  count = increment(count)
  counter_el.innerHTML = ("You clicked %d times."):format(count)
end)
`.trimStart()}};var pt={name:"clojurescript",title:"ClojureScript Starter",thumbnail:"assets/templates/cljs.svg",activeEditor:"script",markup:{language:"html",content:`
<div id="app">Loading...</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"clojurescript",content:`
(ns react.component
  (:require
    ;; you may use npm packages
    ["canvas-confetti$default" :as confetti]
    ["react$default" :as React]
    ["react" :refer [useState]]
    ["react-dom/client" :refer [createRoot]]))

(defn Counter [^:js {:keys [name]}]
  (let [[counter setCount] (useState 0)]
    #jsx [:div
            {:className "container"}
            [:h1 (str "Hello, " name "!")]
            [:img
              {:className "logo"
              :alt "logo"
              :src "{{ __livecodes_baseUrl__ }}assets/templates/cljs.svg"}]
            [:p "You clicked" counter "times."]
            [:button
              {:onClick (fn []
                          (if (= (mod counter 3) 0) (confetti))
                          (setCount (inc counter)))}
              "Click me"]]))

(def title "ClojureScript")
(print (str "Hello, " title "!"))
(defonce root (createRoot (js/document.querySelector "#app")))
(.render root #jsx [Counter #js {:name title}])
`.trimStart()}};var ut={name:"ruby-wasm",title:"Ruby (Wasm) Starter",thumbnail:"assets/templates/ruby.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ruby.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"ruby-wasm",content:`
require "js"
require "date"

document = JS.global[:document]

title = "Ruby"
document.querySelector("#title")[:innerHTML] = title

counter = 0

button = document.querySelector "button"
button.addEventListener "click" do |e|
    counter += 1
    counter_element = document.querySelector "#counter"
    counter_element[:innerHTML] = "You clicked %d times." % [counter]
end

# check console
current_time = Time.now.hour
msg = Date.today.strftime "happy %A!"
if current_time < 12
    puts "Good morning, " + msg
elsif current_time < 18
    puts "Good afternoon, " + msg
else
    puts "Good evening, " + msg
end
`.trimStart()}};var dt={name:"lua-wasm",title:"Lua (Wasm) Starter",thumbnail:"assets/templates/lua.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lua.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"lua-wasm",content:`
document = window.document
document:getElementById("title").innerHTML = "Lua"

Counter = {count = 0}
function Counter:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function Counter:increment ()
  self.count = self.count + 1
end
function Counter:show ()
  local counter_el = document:getElementById("counter")
  counter_el.innerHTML = ("You clicked %d times."):format(self.count)
end

counter = Counter:new(nil)
button = document:querySelector("#counter-button")
button:addEventListener("click", function()
  counter:increment()
  counter:show()
end)

-- check console
time = os.date("*t").hour
if time < 12 then
  print ("Good morning")
elseif time >= 12 and time < 18 then
  print ("Good afternoon")
else
  print ("Good evening")
end
`.trimStart()}};var gt={name:"php-wasm",title:"PHP (Wasm) Starter",thumbnail:"assets/templates/php.svg",activeEditor:"script",markup:{language:"html",content:`
<p>
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
</p>
`.trimStart()},style:{language:"css",content:`
body {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"php-wasm",content:`
<?php
$title = 'PHP';
vrzno_eval('document.getElementById("title").innerText = "' . $title . '"');

$time = date('H');
if ($time < 12) {
  $greeting = 'Good morning!';
} elseif ($time < 17) {
  $greeting = 'Good afternoon!';
} elseif ($time < 20) {
  $greeting = 'Good evening!';
} else {
  $greeting = 'Good night!';
}

$date = date('l jS \\of F, Y');

echo $greeting . '<br>Today is:<br>' . $date;
`.trimStart()}};var ht={name:"lit",title:"Lit Starter",thumbnail:"assets/templates/lit.svg",activeEditor:"script",markup:{language:"html",content:`
<my-counter name="Lit"></my-counter>
`.trimStart()},style:{language:"css",content:""},script:{language:"typescript",content:`
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SignalWatcher, signal } from "@lit-labs/preact-signals";

@customElement("my-counter")
export class SignalExample extends SignalWatcher(LitElement) {
  @property()
  name = "World";

  count = signal(0);

  private _onClick() {
    this.count.value = this.count.value + 1;
  }

  render() {
    return html\`
      <h1>Hello, \${this.name}!</h1>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lit.svg" />
      <p>You clicked \${this.count.value} times.</p>
      <button @click=\${this._onClick}>Click me</button>
    \`;
  }

  static styles = css\`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    :host, button {
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`;
}
`.trimStart()},customSettings:{typescript:{experimentalDecorators:!0,useDefineForClassFields:!1}}};var bt={name:"postgresql",title:"PostgreSQL Starter",thumbnail:"assets/templates/postgresql.svg",activeEditor:"script",markup:{language:"html",content:`
<div id="output">
  <details open>
    <summary>Tables</summary>
    <div id="tables"></div>
  </details>
  <details open>
    <summary>Result</summary>
    <pre><code id="result"></code></pre>
  </details>
  <details open>
    <summary>Result as objects</summary>
    <pre><code id="obj-result"></code></pre>
  </details>
</div>

<script>
  livecodes.sql.render('#tables');

  livecodes.sql.getResult().then((result) => {
    console.log(result)
    document.querySelector('#result').innerHTML =  JSON.stringify(result, null, 2);
  }).catch(console.error);


  livecodes.sql.getResultAsObjects().then((results) => {
    results.forEach(console.table);
    document.querySelector('#obj-result').innerHTML = JSON.stringify(results, null, 2);
  }).catch(console.error);
<\/script>
`.trimStart()},style:{language:"css",content:`
#output {
  color: #3d3d3d;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#output summary {
  cursor: pointer;
}

#output table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 5px;
  border-spacing: 0;
  font-size: 0.9em;
  margin: 1em;
  width: 95%;
}

#output th,
#output td {
  padding: 0.5em;
}

#output tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#output pre {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  margin: 1em;
  min-width: 95%;
  padding: 1em;
}
`.trimStart()},script:{language:"postgresql",content:`
-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int NOT NULL,
  rev int NOT NULL,
  quote varchar(200) NOT NULL,
  PRIMARY KEY (id, rev)
);

INSERT INTO quotes (id, rev, quote) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. \u2013 Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. \u2013 Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. \u2013 T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. \u2013 Walt Disney');

SELECT a.id, a.rev, a.quote
FROM quotes a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM quotes
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM quotes a
LEFT OUTER JOIN quotes b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM quotes) a
  WHERE a.rank = 1;
`.trimStart()}};var vt=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],yt=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],xt=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],o={getModuleUrl:(t,{isModule:e=!0,defaultCDN:n="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let s=ft(t,e,n);return s||(e?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:ft(t,!1,e||_t())||t,cdnLists:{npm:yt,module:vt,gh:xt},checkCDNs:async(t,e)=>{let n=[e,...o.cdnLists.npm].filter(Boolean);for(let s of n)try{if((await fetch(o.getUrl(t,s),{method:"HEAD"})).ok)return s}catch{}return o.cdnLists.npm[0]}},_t=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||o.cdnLists.npm[0]}catch{return o.cdnLists.npm[0]}},ft=(t,e,n)=>{let s=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",xt[0]):t.includes(":")||(t=(n||(e?vt[0]:yt[0]))+":"+t);for(let a of jt){let[m,wt]=a;if(m.test(t))return t.replace(m,wt)+s}return null},jt=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:i,getModuleUrl:Re}=o,St="5.5.2";var r=i("gh:live-codes/gleam-precompiled@v0.3.0/");var Tt="0.6.64",He=i(`malinajs@${Tt}/malina.js`);var Pe=`https://typescript.azureedge.net/cdn/${St}/monaco/min/vs`;var Ne=i(`typescript@${St}/lib/typescript.js`);var l=r+"build/packages/plinth/src/plinth/",c=r+"build/dev/javascript/plinth/plinth/",kt={name:"gleam",title:"Gleam Starter",thumbnail:"assets/templates/gleam.svg",activeEditor:"script",markup:{language:"html",content:`
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/gleam.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

`.trimStart()},style:{language:"css",content:`
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()},script:{language:"gleam",content:`
import gleam/int
import gleam/io
import gleam/result
import plinth/browser/document
import plinth/browser/element
import plinth/browser/event
// see docs for using custom modules:
// https://livecodes.io/docs/languages/gleam

pub fn main() {
  say_hello()
  counter()
}

fn say_hello() {
  let greeting = hello("Gleam")
  let assert Ok(title) = document.query_selector("#title")
  element.set_inner_html(title, greeting)
  io.println(cowsay(greeting))
}

fn counter() {
  document.add_event_listener("click", fn(ev) {
    let target = event.target(ev)
    case element.get_attribute(target, "id") {
        Ok("counter-button") -> increment()
        _ -> Nil
    }
  })
}

fn increment() {
  let assert Ok(el) = document.query_selector("#counter")
  let assert Ok(_) = el
  |> element.inner_text
  |> int.parse
  |> result.map(fn(n) { n + 1 })
  |> result.map(int.to_string)
  |> result.map(element.set_inner_html(el, _))
  Nil
}

// custom module
@external(javascript, "my_pkg/greet.js", "hello")
pub fn hello(str: String) -> String

// npm module
@external(javascript, "npm:cowsay2", "say")
pub fn cowsay(str: String) -> String
`.trimStart()},customSettings:{imports:{"my_pkg/greet.js":r+"demo/greet.js"},gleam:{modules:{"plinth/browser/document":{srcUrl:l+"browser/document.gleam",compiledUrl:c+"browser/document.mjs"},"plinth/browser/element":{srcUrl:l+"browser/element.gleam",compiledUrl:c+"browser/element.mjs"},"plinth/browser/event":{srcUrl:l+"browser/event.gleam",compiledUrl:c+"browser/event.mjs"}}}}};var Fs=[h,at,I,L,q,z,V,p,C,O,Y,ht,W,_,d,H,G,x,g,S,nt,rt,f,A,v,k,lt,et,ot,M,B,R,E,U,it,P,ut,y,T,gt,J,K,j,w,dt,mt,ct,Z,N,F,pt,kt,Q,$,u,X,D,bt,tt,b,st];export{Fs as starterTemplates};
