// ../src/sdk/index.ts
var createPlayground = async (container, options = {}) => {
  const {
    appUrl = "https://livecodes.io/",
    params = {},
    config = {},
    import: importFrom,
    lite = false,
    loading = "lazy",
    template,
    view = "split"
  } = options;
  let containerElement;
  if (typeof container === "string") {
    containerElement = document.querySelector(container);
  } else {
    containerElement = container;
  }
  if (!container) {
    throw new Error("Container element is required.");
  }
  if (!containerElement) {
    throw new Error(`Cannot find element: "${container}"`);
  }
  let url3;
  try {
    url3 = new URL(appUrl);
  } catch {
    throw new Error(`"${appUrl}" is not a valid URL.`);
  }
  const origin = url3.origin;
  if (typeof params === "object") {
    Object.keys(params).forEach((param) => {
      url3.searchParams.set(param, String(params[param]));
    });
  }
  if (typeof config === "string") {
    url3.searchParams.set("config", config);
  } else if (typeof config === "object" && Object.keys(config).length > 0) {
    try {
      const encoded = btoa(JSON.stringify(config));
      url3.searchParams.set("config", "data:application/json;base64," + encoded);
    } catch {
      throw new Error("Invalid configuration object.");
    }
  }
  if (template) {
    url3.searchParams.set("template", template);
  }
  if (importFrom) {
    url3.searchParams.set("x", importFrom);
  }
  url3.searchParams.set(lite ? "lite" : "embed", "true");
  url3.searchParams.set("loading", loading);
  url3.searchParams.set("view", view);
  let livecodesReady = false;
  let destroyed = false;
  const alreadyDestroyedMessage = "Cannot call API methods after calling `destroy()`.";
  const createIframe = () => new Promise((resolve) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!containerElement)
      return;
    const height = containerElement.dataset.height || containerElement.style.height;
    if (height) {
      const cssHeight = isNaN(Number(height)) ? height : height + "px";
      containerElement.style.height = cssHeight;
    }
    if (containerElement.dataset.defaultStyles !== "false") {
      (_a = containerElement.style).backgroundColor || (_a.backgroundColor = "#fff");
      (_b = containerElement.style).border || (_b.border = "1px solid black");
      (_c = containerElement.style).borderRadius || (_c.borderRadius = "5px");
      (_d = containerElement.style).boxSizing || (_d.boxSizing = "border-box");
      (_e = containerElement.style).padding || (_e.padding = "0");
      (_f = containerElement.style).width || (_f.width = "100%");
      (_g = containerElement.style).height || (_g.height = containerElement.style.height || "300px");
      containerElement.style.minHeight = "200px";
      (_h = containerElement.style).overflow || (_h.overflow = "hidden");
      (_i = containerElement.style).resize || (_i.resize = "vertical");
    }
    const frame = document.createElement("iframe");
    frame.setAttribute(
      "allow",
      "accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
    );
    frame.setAttribute("allowtransparency", "true");
    frame.setAttribute("allowpaymentrequest", "true");
    frame.setAttribute("allowfullscreen", "true");
    frame.setAttribute(
      "sandbox",
      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"
    );
    const iframeLoading = loading === "eager" ? "eager" : "lazy";
    frame.setAttribute("loading", iframeLoading);
    frame.classList.add("livecodes");
    frame.style.height = "100%";
    frame.style.minHeight = "200px";
    frame.style.width = "100%";
    frame.style.margin = "0";
    frame.style.border = "0";
    frame.style.borderRadius = containerElement.style.borderRadius;
    frame.src = url3.href;
    frame.onload = () => {
      addEventListener(
        "message",
        function readyHandler(e) {
          if (e.source !== frame.contentWindow || e.origin !== origin)
            return;
          if (e.data?.type === "livecodes-ready") {
            removeEventListener("message", readyHandler);
            livecodesReady = true;
          }
        }
      );
      resolve(frame);
    };
    containerElement.innerHTML = "";
    containerElement.appendChild(frame);
  });
  const iframe = await createIframe();
  const delay = (duration = 100) => new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
  const loadLivecodes = () => destroyed ? Promise.reject(alreadyDestroyedMessage) : new Promise(async (resolve) => {
    const message = { type: "livecodes-load" };
    iframe.contentWindow?.postMessage(message, origin);
    while (!livecodesReady) {
      await delay();
    }
    resolve();
  });
  const callAPI = (method, args) => new Promise(async (resolve, reject) => {
    if (destroyed) {
      return reject(alreadyDestroyedMessage);
    }
    if (!livecodesReady) {
      await loadLivecodes();
    }
    addEventListener(
      "message",
      function handler(e) {
        if (e.source !== iframe.contentWindow || e.origin !== origin || e.data?.type !== "livecodes-api-response") {
          return;
        }
        if (e.data.method === method) {
          removeEventListener("message", handler);
          const payload = e.data.payload;
          if (payload?.error) {
            reject(payload.error);
          } else {
            resolve(payload);
          }
        }
      }
    );
    iframe.contentWindow?.postMessage({ method, args }, origin);
  });
  let watchers = [];
  const onChange = (fn) => {
    if (destroyed) {
      throw new Error(alreadyDestroyedMessage);
    }
    watchers.push(fn);
    return {
      remove: () => {
        watchers = watchers.filter((w) => w !== fn);
      }
    };
  };
  addEventListener(
    "message",
    async (e) => {
      if (e.source !== iframe.contentWindow || e.origin !== origin || e.data?.type !== "livecodes-change") {
        return;
      }
      const code = await callAPI("getCode");
      const config2 = await callAPI("getConfig");
      watchers.forEach((fn) => {
        fn({ code, config: config2 });
      });
    }
  );
  const destroy = () => {
    watchers.length = 0;
    if (containerElement) {
      containerElement.innerHTML = "";
    }
    destroyed = true;
  };
  if (loading === "lazy" && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer2) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadLivecodes();
            observer2.unobserve(containerElement);
          }
        });
      },
      { rootMargin: "150px" }
    );
    observer.observe(containerElement);
  }
  return {
    load: () => loadLivecodes(),
    run: () => callAPI("run"),
    format: (allEditors) => callAPI("format", [allEditors]),
    getShareUrl: (shortUrl) => callAPI("getShareUrl", [shortUrl]),
    getConfig: (contentOnly) => callAPI("getConfig", [contentOnly]),
    setConfig: (config2) => callAPI("setConfig", [config2]),
    getCode: () => callAPI("getCode"),
    show: (pane, options2) => callAPI("show", [pane, options2]),
    runTests: () => callAPI("runTests"),
    onChange: (fn) => onChange(fn),
    exec: (command, ...args) => callAPI("exec", [command, ...args]),
    destroy: () => {
      if (!livecodesReady) {
        if (destroyed) {
          return Promise.reject(alreadyDestroyedMessage);
        }
        destroy();
        return Promise.resolve();
      }
      return callAPI("destroy").then(destroy);
    }
  };
};
if (globalThis.document && // to escape SSG in docusaurus
document.currentScript && "prefill" in document.currentScript?.dataset) {
  window.addEventListener("load", () => {
    document.querySelectorAll(".livecodes").forEach((codeblock) => {
      let options;
      const optionsStr = codeblock.dataset.options;
      if (optionsStr) {
        try {
          options = JSON.parse(optionsStr);
        } catch {
        }
      }
      let config;
      const configStr = codeblock.dataset.config || codeblock.dataset.prefill;
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch {
        }
      }
      createPlayground(codeblock, {
        import: "dom/" + encodeURIComponent(codeblock.outerHTML),
        ...options,
        ...config ? { config } : {}
      });
    });
  });
}

// ../src/livecodes/config/default-config.ts
var defaultConfig = {
  title: "Untitled Project",
  description: "",
  tags: [],
  autoupdate: true,
  autosave: false,
  delay: 1500,
  formatOnsave: false,
  mode: "full",
  theme: "dark",
  recoverUnsaved: true,
  showSpacing: false,
  welcome: true,
  readonly: false,
  allowLangChange: true,
  activeEditor: void 0,
  languages: void 0,
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {},
  tests: {
    language: "typescript",
    content: ""
  },
  tools: {
    enabled: "all",
    active: "",
    status: ""
  },
  zoom: 1,
  processors: [],
  customSettings: {},
  editor: void 0,
  fontFamily: void 0,
  fontSize: void 0,
  useTabs: false,
  tabSize: 2,
  lineNumbers: true,
  wordWrap: false,
  closeBrackets: true,
  semicolons: true,
  singleQuote: false,
  trailingComma: true,
  emmet: true,
  editorMode: void 0,
  version: process.env.VERSION
};

// ../src/livecodes/templates/starter/angular-starter.ts
var angularStarter = {
  name: "angular",
  title: "Angular Starter",
  thumbnail: "assets/templates/angular.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: "<app>Loading...</app>\n"
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "typescript",
    content: `
import { Component, Input, NgModule, enableProdMode } from '@angular/core@12.2.13';
import { CommonModule } from '@angular/common@12.2.13';
import { BrowserModule } from '@angular/platform-browser@12.2.13';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic@12.2.13';
import 'zone.js/dist/zone';

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
      <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/angular.svg" />
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {
    "zone.js/dist/zone": ""
  }
};

// ../src/livecodes/templates/starter/assemblyscript-starter.ts
var assemblyscriptStarter = {
  name: "assemblyscript",
  title: "AssemblyScript Starter",
  thumbnail: "assets/templates/assemblyscript.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/assemblyscript.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "assemblyscript",
    content: `
export function getTitle(): string {
  return "AssemblyScript";
}
export function increment(num: i32): i32 {
  return num + 1;
}
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/astro-starter.ts
var astroStarter = {
  name: "astro",
  title: "Astro Starter",
  thumbnail: "assets/templates/astro.svg",
  activeEditor: "markup",
  markup: {
    language: "astro",
    content: `
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
    <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/astro.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/backbone-starter.ts
var backboneStarter = {
  name: "backbone",
  title: "Backbone Starter",
  thumbnail: "assets/templates/backbone.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/backbone.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [
    "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"
  ],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/blank.ts
var blank = {
  name: "blank",
  title: "Blank Project",
  thumbnail: "assets/templates/blank.svg",
  activeEditor: "markup",
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/blockly-starter.ts
var blocklyStarter = {
  name: "blockly",
  title: "Blockly Starter",
  thumbnail: "assets/templates/blockly.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<xml
  data-src="https://cdn.jsdelivr.net/npm/@live-codes/blockly-utils@0.1.0/src/dom-blocks.xml"
  data-type="blockly/xml"
  style="display: none"
></xml>
<script
  src="https://cdn.jsdelivr.net/npm/@live-codes/blockly-utils@0.1.0/src/dom-blocks.js"
  type="blockly/script"
><\/script>

<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/blockly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "blockly",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/bootstrap-starter.ts
var bootstrapStarter = {
  name: "bootstrap",
  title: "Bootstrap Starter",
  thumbnail: "assets/templates/bootstrap.svg",
  activeEditor: "markup",
  markup: {
    language: "html",
    content: `
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
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
`.trimStart()
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: ["https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"],
  scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/coffeescript-starter.ts
var coffeescriptStarter = {
  name: "coffeescript",
  title: "CoffeeScript Starter",
  thumbnail: "assets/templates/coffeescript.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/coffeescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "coffeescript",
    content: `
titleElement = document.getElementById 'title'
counterElement = document.getElementById 'counter'
button = document.getElementById 'counter-button'

title = 'CoffeeScript'
titleElement.innerText = title

counter = (count) -> -> count += 1
increment = counter 0

button.addEventListener('click',
  -> counterElement.innerText = increment())
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/go-starter.ts
var goStarter = {
  name: "go",
  title: "Go Starter",
  thumbnail: "assets/templates/go.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()
  },
  script: {
    language: "go",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/jquery-starter.ts
var jqueryStarter = {
  name: "jquery",
  title: "jQuery Starter",
  thumbnail: "assets/templates/jquery.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jquery.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 300px;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
import $ from "jquery";

$("#title").text('jQuery');

let count = 0;
$("#counter-button").click(() => {
  count += 1;
  $("#counter").text(count);
});
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/knockout-starter.ts
var knockoutStarter = {
  name: "knockout",
  title: "Knockout Starter",
  thumbnail: "assets/templates/knockout.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span data-bind="text: title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/knockout.svg" />
  <p>You clicked <span data-bind="text: numberOfClicks">0</span> times.</p>
  <button data-bind="click: registerClick">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/livescript-starter.ts
var livescriptStarter = {
  name: "livescript",
  title: "LiveScript Starter",
  thumbnail: "assets/templates/livescript.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/livescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "livescript",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/lua-starter.ts
var luaStarter = {
  name: "lua",
  title: "Lua Starter",
  thumbnail: "assets/templates/lua.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lua.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "lua",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/mdx-starter.ts
var mdxStarter = {
  name: "mdx",
  title: "MDX Starter",
  thumbnail: "assets/templates/mdx.svg",
  activeEditor: "markup",
  markup: {
    language: "mdx",
    content: `
import Paper from '@material-ui/core/Paper';
import { Hello, Counter } from './script';

<Paper>
  <Hello title="MDX" />
</Paper>

![MDX Logo]({{ __livecodes_baseUrl__ }}assets/templates/mdx.svg)

<Counter variant="outlined" color="primary" />
`.trimStart()
  },
  style: {
    language: "css",
    content: `
body,
body button {
  text-align: center;
  font: 1em sans-serif;
}
img {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "jsx",
    content: `
import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export const Hello = (props) => <h1>Hello, {props.title || "World"}!</h1>;

export function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <Button
        variant={props.variant}
        color={props.color}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </Button>
    </div>
  );
}
`.trimStart()
  },
  customSettings: { defaultCDN: "skypack" }
};

// ../src/livecodes/templates/starter/perl-starter.ts
var perlStarter = {
  name: "perl",
  title: "Perl Starter",
  thumbnail: "assets/templates/perl.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/perl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "perl",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/php-starter.ts
var phpStarter = {
  name: "php",
  title: "PHP Starter",
  thumbnail: "assets/templates/php.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "php",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/preact-starter.ts
var preactStarter = {
  name: "preact",
  title: "Preact Starter",
  thumbnail: "assets/templates/preact.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app"></div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "jsx",
    content: `
/** @jsx h */
import { h, render } from 'preact';
import { useSignal } from "@preact/signals";

function App(props) {
  const count = useSignal(0);
  return (
    <div class="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/preact.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => count.value++}>Click me</button>
    </div>
  );
}

render(<App name="Preact" />, document.body);
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/pyodide-starter.ts
var pyodideStarter = {
  name: "pyodide",
  title: "Python (pyodide) Starter",
  thumbnail: "assets/templates/python.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<h1 id="title">Hello, World!</h1>
<div id="plot">Loading...</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `h1 {
  text-align: center;
}
`.trimStart()
  },
  script: {
    language: "pyodide",
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/python-starter.ts
var pythonStarter = {
  name: "python",
  title: "Python Starter",
  thumbnail: "assets/templates/python.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1 id="header">Hello, World!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/python.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "python",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/react-native-starter.ts
var reactNativeStarter = {
  name: "react-native",
  title: "React Native Starter",
  thumbnail: "assets/templates/react.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app">Loading...</div>\n'
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "react-native",
    content: `
import React, { useState } from "react";
import { AppRegistry, Button, Image, StyleSheet, Text, View } from "react-native";

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

function App() {
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

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("app"),
});
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/react-starter.ts
var reactStarter = {
  name: "react",
  title: "React Starter",
  thumbnail: "assets/templates/react.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app">Loading...</div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "jsx",
    content: `
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/react.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App name="React" />);
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/markdown-starter.ts
var markdownStarter = {
  name: "markdown",
  title: "Markdown Starter",
  thumbnail: "assets/templates/markdown.svg",
  activeEditor: "markup",
  markup: {
    language: "markdown",
    content: `
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
@import "github-markdown-css";

body {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px;
  margin: 20px !important;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `document.body.classList.add('markdown-body');
`
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/rescript-starter.ts
var rescriptStarter = {
  name: "rescript",
  title: "ReScript Starter",
  thumbnail: "assets/templates/rescript.png",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app">Loading...</div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "rescript",
    content: `
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
      <img
        className="logo"
        src="{{ __livecodes_baseUrl__ }}assets/templates/rescript.png"
      />
      <p> {React.string("You clicked " ++ times)} </p>
      <button onClick> {React.string("Click me")} </button>
    </div>
  }
}

switch ReactDOM.querySelector("#app") {
| Some(app) => ReactDOM.render(<App name="ReScript React" />, app)
| None => () // do nothing
}

Js.log("Hello, ReScript!")
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/reason-starter.ts
var reasonStarter = {
  name: "reason",
  title: "Reason Starter",
  thumbnail: "assets/templates/reason.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app">Loading...</div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "reason",
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
      <img
        className="logo"
        src="{{ __livecodes_baseUrl__ }}assets/templates/reason.svg"
      />
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/ocaml-starter.ts
var ocamlStarter = {
  name: "ocaml",
  title: "Ocaml Starter",
  thumbnail: "assets/templates/ocaml.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app">Loading...</div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`.trimStart()
  },
  script: {
    language: "ocaml",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/riot-starter.ts
var riotStarter = {
  name: "riot",
  title: "Riot.js Starter",
  thumbnail: "assets/templates/riot.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<counter title="Riot.js"></counter>

<script>
  livecodes.templateData = {
    url: 'https://riot.js.org/'
  }
<\/script>
`.trimStart()
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "riot",
    content: `
<counter>
  <div class="container">
    <h1>Hello, { props.title }!</h1>
    <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/riot.svg" />
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/ruby-starter.ts
var rubyStarter = {
  name: "ruby",
  title: "Ruby Starter",
  thumbnail: "assets/templates/ruby.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ruby.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "ruby",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/scheme-starter.ts
var schemeStarter = {
  name: "scheme",
  title: "Scheme Starter",
  thumbnail: "assets/templates/scheme.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/scheme.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "scheme",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/solid-starter.ts
var solidStarter = {
  name: "solid",
  title: "Solid Starter",
  thumbnail: "assets/templates/solid.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<div id="app"></div>\n'
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "solid.tsx",
    content: `
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

type Props = {
  title: string;
}

function App(props: Props) {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  return (
    <div className="container">
      <h1>Hello, {props.title}!</h1>
      <img className="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/solid.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

render(() => <App title="Solid" />, document.getElementById("app"));
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/sql-starter.ts
var sqlStarter = {
  name: "sql",
  title: "SQL Starter",
  thumbnail: "assets/templates/sqlite.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
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
`.trimStart()
  },
  script: {
    language: "sql",
    content: `
-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int(6) NOT NULL,
  rev int(3) NOT NULL,
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/stencil-starter.ts
var stencilStarter = {
  name: "stencil",
  title: "Stencil Starter",
  thumbnail: "assets/templates/stencil.png",
  activeEditor: "script",
  markup: {
    language: "html",
    content: '<my-app title="Stencil"></my-app>\n'
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "stencil",
    content: `
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
        <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/stencil.png" />
        <p>You clicked {this.count} times.</p>
        <button onClick={this.increment}>Click me</button>
      </div>
    );
  }
}
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/svelte-starter.ts
var svelteStarter = {
  name: "svelte",
  title: "Svelte Starter",
  thumbnail: "assets/templates/svelte.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "svelte",
    content: `
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
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/svelte.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/tailwindcss-starter.ts
var tailwindcssStarter = {
  name: "tailwindcss",
  title: "Tailwind CSS Starter",
  thumbnail: "assets/templates/tailwindcss.svg",
  activeEditor: "markup",
  markup: {
    language: "html",
    content: `
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
            <p>A template based on <a href="https://play.tailwindcss.com/" class="text-cyan-600 hover:text-cyan-700" target="_blank">Tailwind CSS playground</a>. Here you can do things like:</p>
            <ul class="list-disc space-y-2">
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">
                  Customizing configuration in
                  <code class="text-sm font-bold text-gray-900">custom settings</code>
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
                <p class="ml-2">Viewing generated CSS code</p>
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
@tailwind base;
@tailwind components;
@tailwind utilities;

.back-card {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  processors: ["tailwindcss"],
  imports: {},
  types: {},
  customSettings: {
    tailwindcss: {
      theme: {
        extend: {
          colors: {
            sky: {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e"
            },
            cyan: {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63"
            }
          }
        }
      }
    }
  }
};

// ../src/livecodes/templates/starter/typescript-starter.ts
var typescriptStarter = {
  name: "typescript",
  title: "TypeScript Starter",
  thumbnail: "assets/templates/typescript.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/typescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "typescript",
    content: `
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

const title = document.querySelector<HTMLElement>("#title");
const count = document.querySelector<HTMLElement>("#counter");
const button = document.querySelector<HTMLElement>("#counter-button");

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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/vue-sfc-starter.ts
var vueSfcStarter = {
  name: "vue",
  title: "Vue 3 Starter",
  thumbnail: "assets/templates/vue.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "vue",
    content: `
<template>
  <div class="container">
    <h1>Hello, Vue!</h1>
    <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
    <p>You clicked {{ counter }} times.</p>
    <button v-on:click="increment">Click me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
        align: 'center',
      };
    },
    methods: {
      increment() {
        this.counter += 1;
      },
    },
  };
<\/script>

<style scoped>
  .container,
  .container button {
    text-align: v-bind('align');
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/vue-starter.ts
var vueStarter = {
  name: "vue2",
  title: "Vue 2 Starter",
  thumbnail: "assets/templates/vue.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div id="app">
  <h1>Hello, Vue!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
  <p>You clicked {{ counter }} times.</p>
  <button @click="increment()">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
#app,
#app button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: ["https://cdn.jsdelivr.net/npm/vue@2"],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/wat-starter.ts
var watStarter = {
  name: "wat",
  title: "WebAssembly Text Starter",
  thumbnail: "assets/templates/webassembly.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img
    class="logo"
    src="{{ __livecodes_baseUrl__ }}assets/templates/webassembly.svg"
  />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "wat",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/malina-starter.ts
var malinaStarter = {
  name: "malina",
  title: "Malina.js Starter",
  thumbnail: "assets/templates/malina.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "malina",
    content: `
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
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/malina.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click="{increment}">Click me</button>
</div>
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/commonlisp-starter.ts
var commonlispStarter = {
  name: "commonlisp",
  title: "Common Lisp Starter",
  thumbnail: "assets/templates/commonlisp.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/commonlisp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "commonlisp",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/cpp-starter.ts
var cppStarter = {
  name: "cpp",
  title: "C++ Starter",
  thumbnail: "assets/templates/cpp.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "cpp",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/julia-starter.ts
var juliaStarter = {
  name: "julia",
  title: "Julia Starter",
  thumbnail: "assets/templates/julia.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/julia.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "julia",
    content: `
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

formatOutput(getTitle(), increment(livescodesInput))
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/clang-starter.ts
var clangStarter = {
  name: "clang",
  title: "C++ (Clang) Starter",
  thumbnail: "assets/templates/cpp.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "clang",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/tcl-starter.ts
var tclStarter = {
  name: "tcl",
  title: "Tcl Starter",
  thumbnail: "assets/templates/tcl.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tcl.svg" />
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
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "tcl",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/prolog-starter.ts
var prologStarter = {
  name: "prolog",
  title: "Prolog Starter",
  thumbnail: "assets/templates/tau-prolog.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tau-prolog.svg" title="Tau Prolog" />
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
`.trimStart()
  },
  style: {
    language: "css",
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
}`.trimStart()
  },
  script: {
    language: "prolog",
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/clio-starter.ts
var clioStarter = {
  name: "clio",
  title: "Clio Starter",
  thumbnail: "assets/templates/clio.png",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/clio.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "clio",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/diagrams-starter.ts
var diagramsStarter = {
  name: "diagrams",
  title: "Diagrams Starter",
  thumbnail: "assets/templates/diagrams.svg",
  activeEditor: "markup",
  markup: {
    language: "diagrams",
    contentUrl: "{{ __livecodes_baseUrl__ }}assets/templates/diagrams-starter.html"
  },
  style: {
    language: "css",
    content: `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container img {
  width: 80%;
  max-width: 600px;
}

.container h3:not(:nth-child(1)) {
  margin-top: 3em;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/imba-starter.ts
var imbaStarter = {
  name: "imba",
  title: "Imba Starter",
  thumbnail: "assets/templates/imba.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "imba",
    content: `
tag app-counter
	prop name = "Imba"
	prop count = 0

	css self
		text-align: center
		font: 1em sans-serif

	css .btn h:2em	w:10em	fs:1em

	<self>
		<h1> "Hello, {name}!"
		<img[h:100px] src="{{ __livecodes_baseUrl__ }}assets/templates/imba.svg">
		<p> "You clicked {count} times."
		<button.btn @click=count++> "Click me"

imba.mount <app-counter>
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/jest-starter.ts
var jestStarter = {
  name: "jest",
  title: "Jest Starter",
  thumbnail: "assets/templates/jest.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
  <p class="info">Run tests in the "Tests" panel below.</p>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
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
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {},
  tests: {
    language: "tsx",
    content: `
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
`.trimStart()
  }
};

// ../src/livecodes/templates/starter/jest-react-starter.ts
var jestReactStarter = {
  name: "jest-react",
  title: "Jest/React Starter",
  thumbnail: "assets/templates/jest.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div id="app">Loading...</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
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
`.trimStart()
  },
  script: {
    language: "jsx",
    content: `
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

export const increment = (count) => (count ?? 0) + 1;

export default function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(increment(count))}>Click me</button>
      <p className="info">Run tests in the "Tests" panel below.</p>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App name="Jest with React" />);
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {},
  tests: {
    language: "tsx",
    content: `
import React from "react";
import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { assert } from "chai";
import App, { increment } from "./script";

const renderComponent = () => {
  cleanup();
  return waitFor(() => {
    return render(<App name="Jest with React" />, {
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
`.trimStart()
  }
};

// ../src/livecodes/templates/starter/javascript-starter.ts
var javascriptStarter = {
  name: "javascript",
  title: "JavaScript Starter",
  thumbnail: "assets/templates/javascript.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/javascript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "javascript",
    content: `
const title = document.querySelector("#title");
const counter = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "JavaScript";
let count = 0;

button.addEventListener("click", () => {
  count++;
  counter.innerText = count;
});
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/r-starter.ts
var rStarter = {
  name: "r",
  title: "R Starter",
  thumbnail: "assets/templates/r.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div id="output">Loading...</div>

<script>
  livecodes.r.config = {
    container: '#output',
    canvasHeight: 309,
    canvasWidth: 500,
  };
<\/script>
`.trimStart()
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "r",
    content: `
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
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/civet-starter.ts
var civetStarter = {
  name: "civet",
  title: "Civet Starter",
  thumbnail: "assets/templates/civet.png",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/civet.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "civet",
    content: `
titleElement := document.getElementById 'title'
counterElement := document.getElementById 'counter'
button := document.getElementById 'counter-button'

title := 'Civet'
titleElement.innerText = title

counter := (count: number) => => count += 1
increment := counter 0
function handleClick: void counterElement.innerText = increment()

button.addEventListener 'click', handleClick
`.trimStart()
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {}
};

// ../src/livecodes/templates/starter/fennel-starter.ts
var fennelStarter = {
  name: "fennel",
  title: "Fennel Starter",
  thumbnail: "assets/templates/fennel.svg",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fennel.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "fennel",
    // generated from lua by https://fennel-lang.org/see (antifennel)
    content: `
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
`.trimStart()
  }
};

// ../src/livecodes/templates/starter/teal-starter.ts
var tealStarter = {
  name: "teal",
  title: "Teal Starter",
  thumbnail: "assets/templates/teal.png",
  activeEditor: "script",
  markup: {
    language: "html",
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/teal.png" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart()
  },
  style: {
    language: "css",
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart()
  },
  script: {
    language: "teal",
    content: `
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
`.trimStart()
  }
};

// ../src/livecodes/templates/starter/index.ts
var starterTemplates = [
  blank,
  javascriptStarter,
  typescriptStarter,
  reactStarter,
  reactNativeStarter,
  vueStarter,
  vueSfcStarter,
  angularStarter,
  preactStarter,
  svelteStarter,
  stencilStarter,
  solidStarter,
  mdxStarter,
  astroStarter,
  riotStarter,
  malinaStarter,
  jqueryStarter,
  backboneStarter,
  knockoutStarter,
  jestStarter,
  jestReactStarter,
  bootstrapStarter,
  tailwindcssStarter,
  coffeescriptStarter,
  livescriptStarter,
  civetStarter,
  clioStarter,
  imbaStarter,
  rescriptStarter,
  reasonStarter,
  ocamlStarter,
  pythonStarter,
  pyodideStarter,
  rStarter,
  rubyStarter,
  goStarter,
  phpStarter,
  cppStarter,
  clangStarter,
  perlStarter,
  luaStarter,
  tealStarter,
  fennelStarter,
  juliaStarter,
  schemeStarter,
  commonlispStarter,
  tclStarter,
  markdownStarter,
  assemblyscriptStarter,
  watStarter,
  sqlStarter,
  prologStarter,
  blocklyStarter,
  diagramsStarter
];

// ../src/livecodes/vendors.ts
var vendorsBaseUrl = "https://cdn.jsdelivr.net/npm/@live-codes/browser-compilers@0.6.4/dist/";
var artTemplateUrl = "https://cdn.jsdelivr.net/npm/art-template@4.13.2/lib/template-web.js";
var asciidocUrl = "https://cdn.jsdelivr.net/npm/@asciidoctor/core@2.2.5/dist/browser/asciidoctor.min.js";
var assemblyscriptLoaderUrl = "https://cdn.jsdelivr.net/npm/@assemblyscript/loader@0.19.22/umd/index.js";
var astroBaseUrl = "https://cdn.jsdelivr.net/npm/@hatemhosny/astro-internal@0.0.4/";
var babelUrl = "https://cdn.jsdelivr.net/npm/@babel/standalone@7.17.2/babel.min.js";
var biwaschemeUrl = "https://cdn.jsdelivr.net/npm/biwascheme@0.7.4/release/biwascheme-min.js";
var brythonBaseUrl = "https://cdn.jsdelivr.net/npm/brython@3.10.4/";
var clioBaseUrl = "https://cdn.jsdelivr.net/npm/@live-codes/clio-browser-compiler@0.0.3/public/build/";
var coffeeScriptUrl = "https://cdn.jsdelivr.net/npm/coffeescript@2.6.1/lib/coffeescript-browser-compiler-legacy/coffeescript.js";
var dotUrl = "https://cdn.jsdelivr.net/npm/dot@1.1.3/doT.min.js";
var ejsUrl = "https://cdn.jsdelivr.net/npm/ejs@3.1.6/ejs.min.js";
var go2jsBaseUrl = "https://cdn.jsdelivr.net/npm/@live-codes/go2js@0.3.0/build";
var handlebarsBaseUrl = "https://cdn.jsdelivr.net/npm/handlebars@4.7.7/dist/";
var imbaBaseUrl = "https://cdn.jsdelivr.net/npm/imba@2.0.0-alpha.201/dist/";
var jsclUrl = "https://cdn.jsdelivr.net/npm/jscl@0.8.2/jscl.min.js";
var liquidJsUrl = "https://cdn.jsdelivr.net/npm/liquidjs@9.34.0/dist/liquid.browser.min.js";
var luaUrl = "https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.min.js";
var markedUrl = "https://cdn.jsdelivr.net/npm/marked@4.0.12/marked.min.js";
var mjmlUrl = "https://cdn.jsdelivr.net/npm/mjml-browser@4.14.1/lib/index.min.js";
var mustacheUrl = "https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js";
var nunjucksBaseUrl = "https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/";
var opalBaseUrl = "https://cdn.opalrb.com/opal/1.4.1/";
var parinferUrl = "https://cdn.jsdelivr.net/npm/@chrisoakman/parinfer@3.13.1/parinfer.min.js";
var postcssImportUrlUrl = "https://cdn.jsdelivr.net/npm/@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js";
var prettierBaseUrl = "https://cdn.jsdelivr.net/npm/prettier@2.5.1/";
var prettierPhpUrl = "https://cdn.jsdelivr.net/npm/@prettier/plugin-php@0.18.0/standalone.js";
var requireUrl = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js";
var riotBaseUrl = "https://cdn.jsdelivr.net/npm/riot@6.1.2/";
var sqlFormatterUrl = "https://cdn.jsdelivr.net/npm/sql-formatter@4.0.2/dist/sql-formatter.min.js";
var sqljsBaseUrl = "https://cdn.jsdelivr.net/npm/sql.js@1.6.2/dist/";
var stencilUrl = "https://cdn.jsdelivr.net/npm/@stencil/core@2.13.0/compiler/stencil.min.js";
var stylisUrl = "https://cdn.jsdelivr.net/npm/stylis@4.1.3/dist/umd/stylis.min.js";
var tailwindcssUrl = "https://cdn.jsdelivr.net/npm/@live-codes/tailwindcss-browser-plugin@0.3.2/dist/tailwindcss.umd.min.js";
var tauPrologBaseUrl = "https://cdn.jsdelivr.net/npm/tau-prolog@0.3.2/modules/";
var twigUrl = "https://cdn.jsdelivr.net/npm/twig@1.15.4/twig.min.js";
var typescriptUrl = "https://cdn.jsdelivr.net/npm/typescript@4.5.5/lib/typescript.min.js";
var uniterUrl = "https://cdn.jsdelivr.net/npm/uniter@2.17.0/dist/uniter.js";
var vueSfcLoaderCdnBaseUrl = "https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.8.4/dist/";
var wabtjsUrl = "https://cdn.jsdelivr.net/npm/wabt@1.0.26/index.js";

// ../src/livecodes/utils/utils.ts
var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
var getLanguageCustomSettings = (language, config) => ({
  ...config.customSettings[language]
});

// ../src/livecodes/languages/lightningcss/processor-lightningcss.ts
var lightningcss = {
  name: "lightningcss",
  title: "Lightning CSS",
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + "lightningcss/lightningcss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:processor-lightningcss-compiler.js}}");
      return self.createLightningcssCompiler();
    }
  },
  editor: "style"
};

// ../src/livecodes/languages/postcss/processor-postcss.ts
var postcss = {
  name: "postcss",
  title: "Processors:",
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + "postcss/postcss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:processor-postcss-compiler.js}}");
      return self.createPostcssCompiler();
    }
  },
  editor: "style",
  hidden: true
};

// ../src/livecodes/languages/postcss/postcss-plugins.ts
var autoprefixer = {
  name: "autoprefixer",
  title: "Autoprefixer",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "autoprefixer/autoprefixer.js",
    factory: (config) => self.autoprefixer.autoprefixer({
      ...getLanguageCustomSettings("autoprefixer", config)
    })
  },
  editor: "style"
};
var cssnano = {
  name: "cssnano",
  title: "cssnano",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "cssnano/cssnano.js",
    factory: () => {
      const nanoPlugins = self.cssnano.cssnanoPresetDefault().plugins;
      const postcssPlugins = [];
      for (const plugin of nanoPlugins) {
        const [processor, opts] = plugin;
        if (typeof opts === "undefined" || typeof opts === "object" && !opts.exclude || typeof opts === "boolean" && opts === true) {
          postcssPlugins.push(processor(opts));
        }
      }
      return postcssPlugins;
    }
  },
  editor: "style"
};
var postcssImportUrl = {
  name: "postcssImportUrl",
  title: "Import Url",
  isPostcssPlugin: true,
  compiler: {
    url: postcssImportUrlUrl,
    factory: (config) => self.postcssImportUrl({
      ...getLanguageCustomSettings("postcssImportUrl", config)
    })
  },
  editor: "style",
  hidden: true
};
var postcssPresetEnv = {
  name: "postcssPresetEnv",
  title: "Preset Env",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "postcss-preset-env/postcss-preset-env.js",
    factory: (config) => self.postcssPresetEnv.postcssPresetEnv({
      autoprefixer: false,
      ...getLanguageCustomSettings("postcssPresetEnv", config)
    })
  },
  editor: "style"
};
var purgecss = {
  name: "purgecss",
  title: "PurgeCSS",
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "purgecss/purgecss.js",
    factory: (config, _baseUrl, options) => self.purgecss.purgecss({
      ...getLanguageCustomSettings("purgecss", config),
      content: [
        {
          raw: `<template>${options.html}
<script>${config.script.content}<\/script></template>`,
          extension: "html"
        }
      ]
    })
  },
  editor: "style"
};
var tailwindcss = {
  name: "tailwindcss",
  title: "Tailwind CSS",
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: tailwindcssUrl,
    factory: (config, _baseUrl, options) => self.tailwindcss.tailwindcss({
      ...self.tailwindcss.defaultConfig,
      ...getLanguageCustomSettings("tailwindcss", config),
      content: [
        {
          raw: `<template>${options.html}
<script>${config.script.content}<\/script></template>`,
          extension: "html"
        }
      ]
    })
  },
  editor: "style"
};
var tokencss = {
  name: "tokencss",
  title: "Token CSS",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "tokencss/tokencss.js",
    factory: (config) => {
      const customSettings = getLanguageCustomSettings("tokencss", config);
      if (Object.keys(customSettings).length === 0) {
        customSettings.$schema = "https://tokencss.com/schema@0.0.1";
        customSettings.extends = "@tokencss/core/preset";
      }
      const extendTokens = (base, tokens) => {
        const result = JSON.parse(JSON.stringify(base));
        Object.keys(tokens).forEach((key) => {
          result[key] = typeof tokens[key] !== "object" || Array.isArray(tokens[key]) ? tokens[key] : {
            ...result[key],
            ...tokens[key]
          };
        });
        return result;
      };
      const tokensConfig = customSettings.extends?.includes("@tokencss/core/preset") ? extendTokens(self.tokencss.preset, customSettings) : customSettings;
      return self.tokencss.tokencss({ config: tokensConfig });
    }
  },
  editor: "style"
};
var cssModules = {
  name: "cssmodules",
  title: "CSS Modules",
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "postcss-modules/postcss-modules.js",
    factory: (config, _baseUrl, options) => {
      const customSettings = getLanguageCustomSettings("cssmodules", config);
      return self.postcssModules.postcssModules({
        localsConvention: "camelCase",
        ...customSettings,
        getJSON(_cssFileName, json, _outputFileName) {
          const addClasses = customSettings.addClassesToHTML !== false;
          const removeClasses = customSettings.removeOriginalClasses === true;
          if (addClasses) {
            options.html = self.postcssModules.addClassesToHtml(
              options.html,
              json,
              removeClasses
            );
          }
          options.compileInfo = {
            ...options.compileInfo,
            cssModules: json,
            ...addClasses ? { modifiedHTML: options.html } : {}
          };
        }
      });
    }
  },
  editor: "style"
};

// ../src/livecodes/languages/unocss/processor-unocss.ts
var unocss = {
  name: "unocss",
  title: "UnoCSS",
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "unocss/unocss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:processor-unocss-compiler.js}}");
      return self.createUnocssCompiler();
    }
  },
  editor: "style"
};

// ../src/livecodes/languages/windicss/processor-windicss.ts
var windicss = {
  name: "windicss",
  title: "Windi CSS",
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "windicss/windicss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:processor-windicss-compiler.js}}");
      return self.createWindicssCompiler();
    }
  },
  editor: "style"
};

// ../src/livecodes/languages/processors.ts
var processors = [
  ...[
    tailwindcss,
    windicss,
    unocss,
    tokencss,
    purgecss,
    postcssImportUrl,
    autoprefixer,
    postcssPresetEnv,
    lightningcss,
    cssnano,
    cssModules
  ],
  // keep postcss as last processor
  postcss
];

// ../src/livecodes/languages/asciidoc/lang-asciidoc.ts
var asciidoc = {
  name: "asciidoc",
  title: "AsciiDoc",
  compiler: {
    url: asciidocUrl,
    factory: () => {
      const asciidoctor = window.Asciidoctor();
      return async (code, { config }) => asciidoctor.convert(code, {
        ...getLanguageCustomSettings("asciidoc", config)
      });
    }
  },
  extensions: ["adoc", "asciidoc", "asc"],
  editor: "markup"
};

// ../src/livecodes/languages/prettier.ts
var prettierUrl = prettierBaseUrl + "standalone.min.js";
var parserPlugins = {
  babel: prettierBaseUrl + "parser-babel.js",
  glimmer: prettierBaseUrl + "parser-glimmer.js",
  html: prettierBaseUrl + "parser-html.js",
  markdown: prettierBaseUrl + "parser-markdown.js",
  postcss: prettierBaseUrl + "parser-postcss.js",
  php: prettierPhpUrl,
  pug: vendorsBaseUrl + "prettier/parser-pug.js"
};

// ../src/livecodes/languages/babel/lang-babel.ts
var babel = {
  name: "babel",
  title: "Babel",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: babelUrl,
    factory: () => async (code, { config }) => window.Babel.transform(code, {
      filename: "script.tsx",
      presets: [["env", { modules: false }], "typescript", "react"],
      ...getLanguageCustomSettings("babel", config)
    }).code
  },
  extensions: ["es", "babel"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/css/lang-css.ts
var css = {
  name: "css",
  title: "CSS",
  info: false,
  parser: {
    name: "css",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["css"],
  editor: "style"
};

// ../src/livecodes/languages/haml/lang-haml.ts
var haml = {
  name: "haml",
  title: "Haml",
  compiler: {
    url: vendorsBaseUrl + "clientside-haml-js/haml.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-haml-compiler.js}}");
      return self.createHamlCompiler();
    }
  },
  extensions: ["haml"],
  editor: "markup"
};

// ../src/livecodes/languages/html/lang-html.ts
var html = {
  name: "html",
  title: "HTML",
  info: false,
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["html", "htm"],
  editor: "markup"
};

// ../src/livecodes/languages/javascript/lang-javascript.ts
var javascript = {
  name: "javascript",
  title: "JS",
  longTitle: "JavaScript",
  info: false,
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["js"],
  editor: "script"
};

// ../src/livecodes/languages/jsx/lang-jsx.ts
var jsx = {
  name: "jsx",
  title: "JSX",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "typescript",
  extensions: ["jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/jsx/lang-tsx.ts
var tsx = {
  name: "tsx",
  title: "TSX",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "typescript",
  extensions: ["tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/less/lang-less.ts
var less = {
  name: "less",
  title: "Less",
  parser: {
    name: "less",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    url: vendorsBaseUrl + "less/less.js",
    factory: () => async (code, { config }) => (await window.less.render(code, {
      ...getLanguageCustomSettings("less", config)
    })).css
  },
  extensions: ["less"],
  editor: "style"
};

// ../src/livecodes/languages/markdown/lang-markdown.ts
var markdown = {
  name: "markdown",
  title: "Markdown",
  parser: {
    name: "markdown",
    pluginUrls: [parserPlugins.markdown, parserPlugins.html]
  },
  compiler: {
    url: markedUrl,
    factory: () => async (code, { config }) => window.marked.parse(code, {
      ...getLanguageCustomSettings("markdown", config)
    })
  },
  extensions: ["md", "markdown", "mdown", "mkdn"],
  editor: "markup"
};

// ../src/livecodes/compiler/compile-in-compiler.ts
var compileInCompiler = async (content, language, config, options = {}, worker = self) => new Promise((resolve) => {
  if (!content || !language || !config) {
    return resolve(content || "");
  }
  const handler = async function(ev) {
    const message = ev.data.payload;
    if (ev.data.trigger === "compileInCompiler" && message?.content === content && message?.language === language) {
      worker.removeEventListener("message", handler);
      resolve(message.compiled);
    }
  };
  worker.addEventListener("message", handler);
  worker.postMessage({
    type: "compileInCompiler",
    payload: { content, language, config, options }
  });
});

// ../src/livecodes/languages/mdx/lang-mdx.ts
var runOutsideWorker = async (code, { config, worker }) => new Promise(async (resolve) => {
  if (!code)
    return resolve("");
  const [mdx2, { default: remarkGfm }] = await Promise.all([
    import(vendorsBaseUrl + "mdx/mdx.js"),
    import(vendorsBaseUrl + "remark-gfm/remark-gfm.js")
  ]);
  const compiled = (await mdx2.compile(code, {
    remarkPlugins: [remarkGfm],
    ...getLanguageCustomSettings("mdx", config)
  })).value;
  const removeComponentDeclaration = (str) => str.replace(/, {[^}]*} = _components/g, "").replace(/const {[^:]*} = props.components[^;]*;/g, "");
  const jsx2 = removeComponentDeclaration(compiled);
  const result = `import React from "react";
import ReactDOM from "react-dom";
${escapeCode(jsx2, false)}
ReactDOM.render(<MDXContent />, document.body);
`;
  const js = await compileInCompiler(result, "jsx", config, {}, worker);
  resolve(`<script type="module">${js}<\/script>`);
});
var mdx = {
  name: "mdx",
  title: "MDX",
  parser: {
    name: "markdown",
    pluginUrls: [parserPlugins.markdown, parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    compiledCodeLanguage: "javascript",
    imports: {
      "react/jsx-runtime": "https://esm.sh/react/jsx-runtime"
    }
  },
  extensions: ["mdx"],
  editor: "markup",
  editorLanguage: "markdown"
};

// ../src/livecodes/languages/pug/lang-pug.ts
var pug = {
  name: "pug",
  title: "Pug",
  parser: {
    name: "pug",
    pluginUrls: [parserPlugins.pug]
  },
  compiler: {
    url: vendorsBaseUrl + "pug/pug.min.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-pug-compiler.js}}");
      return self.createPugCompiler();
    }
  },
  extensions: ["pug", "jade"],
  editor: "markup"
};

// ../src/livecodes/languages/scss/lang-scss.ts
var scss = {
  name: "scss",
  title: "SCSS",
  parser: {
    name: "scss",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    url: vendorsBaseUrl + "sass/sass.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-scss-compiler.js}}");
      return self.createScssCompiler();
    }
  },
  extensions: ["scss"],
  editor: "style"
};

// ../src/livecodes/languages/scss/lang-sass.ts
var sass = {
  name: "sass",
  title: "Sass",
  compiler: "scss",
  extensions: ["sass"],
  editor: "style"
};

// ../src/livecodes/languages/svelte/lang-svelte.ts
var svelte = {
  name: "svelte",
  title: "Svelte",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: vendorsBaseUrl + "svelte/svelte-compiler.min.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-svelte-compiler.js}}");
      return self.createSvelteCompiler();
    }
  },
  extensions: ["svelte"],
  editor: "script",
  editorLanguage: "html"
};

// ../src/livecodes/languages/stylus/lang-stylus.ts
var stylus = {
  name: "stylus",
  title: "Stylus",
  compiler: {
    url: vendorsBaseUrl + "stylus/stylus.min.js",
    factory: () => async (code) => window.stylus.render(code)
  },
  extensions: ["styl"],
  editor: "style"
};

// ../src/livecodes/languages/typescript/lang-typescript.ts
var typescriptOptions = {
  target: "es2015",
  jsx: "react",
  allowUmdGlobalAccess: true,
  esModuleInterop: true
};
var typescript = {
  name: "typescript",
  title: "TS",
  longTitle: "TypeScript",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: typescriptUrl,
    factory: () => async (code, { config, language }) => window.ts.transpile(code, {
      ...typescriptOptions,
      ...getLanguageCustomSettings("typescript", config),
      ...getLanguageCustomSettings(language, config)
    })
  },
  extensions: ["ts", "typescript"],
  editor: "script"
};

// ../src/livecodes/languages/vue/lang-vue.ts
var loaderCdnUrl = vueSfcLoaderCdnBaseUrl + "vue3-sfc-loader.min.js";
var vueCdnUrl = "https://cdn.jsdelivr.net/npm/vue@3";
var vue = {
  name: "vue",
  title: "Vue 3",
  longTitle: "Vue 3 SFC",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-vue-compiler.js}}");
      return self.createVueCompiler();
    },
    scripts: [vueCdnUrl, loaderCdnUrl],
    imports: {
      vue: vueCdnUrl + "/dist/vue.runtime.esm-browser.prod.js"
    }
  },
  extensions: ["vue", "vue3"],
  editor: "script",
  editorLanguage: "html"
};

// ../src/livecodes/languages/vue/lang-vue2.ts
var loaderCdnUrl2 = vueSfcLoaderCdnBaseUrl + "vue2-sfc-loader.js";
var vueCdnUrl2 = "https://cdn.jsdelivr.net/npm/vue@2";
var vue2 = {
  name: "vue2",
  title: "Vue 2",
  longTitle: "Vue 2 SFC",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-vue-compiler.js}}");
      return self.createVue2Compiler();
    },
    scripts: [vueCdnUrl2, loaderCdnUrl2],
    imports: {
      vue: vueCdnUrl2 + "/dist/vue.runtime.esm-browser.prod.js"
    }
  },
  extensions: ["vue2"],
  editor: "script",
  editorLanguage: "html"
};

// ../src/livecodes/languages/stencil/lang-stencil.ts
var stencil = {
  name: "stencil",
  title: "Stencil",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: stencilUrl,
    factory: () => async (code, { config }) => {
      const result = await window.stencil.transpile(code, {
        // TranspileOptions interface
        // https://github.com/ionic-team/stencil/blob/1b8b7ec21f2622d05c9aafa417b2abdd4f2597a4/src/declarations/stencil-public-compiler.ts#L2311
        sourceMap: false,
        target: "es2019",
        ...getLanguageCustomSettings("stencil", config)
      });
      return result.code;
    },
    types: {
      "@stencil/core": {
        url: vendorsBaseUrl + "types/stencil-core.d.ts",
        declareAsModule: false
      }
    }
  },
  extensions: ["stencil.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/coffeescript/lang-coffeescript.ts
var coffeescript = {
  name: "coffeescript",
  title: "Coffee",
  longTitle: "CoffeeScript",
  compiler: {
    url: coffeeScriptUrl,
    factory: () => async (code, { config }) => window.CoffeeScript.compile(code, {
      bare: true,
      ...getLanguageCustomSettings("coffeescript", config)
    })
  },
  extensions: ["coffee"],
  editor: "script"
};

// ../src/livecodes/languages/livescript/lang-livescript.ts
var livescript = {
  name: "livescript",
  title: "LiveScript",
  compiler: {
    url: vendorsBaseUrl + "livescript/livescript-min.js",
    factory: () => async (code, { config }) => window.require("livescript").compile(code, {
      bare: true,
      ...getLanguageCustomSettings("livescript", config)
    }),
    scripts: [vendorsBaseUrl + "livescript/prelude-browser-min.js"]
  },
  extensions: ["ls"],
  editor: "script"
};

// ../src/livecodes/languages/assemblyscript/lang-assemblyscript.ts
var assemblyscript = {
  name: "assemblyscript",
  title: "AS",
  longTitle: "AssemblyScript",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-assemblyscript-compiler.js}}");
      return self.createAssemblyscriptCompiler();
    },
    scripts: ({ baseUrl }) => [
      assemblyscriptLoaderUrl,
      baseUrl + "{{hash:lang-assemblyscript-script.js}}"
    ],
    scriptType: "application/wasm-uint8",
    compiledCodeLanguage: "wat",
    types: {
      assemblyscript: {
        url: vendorsBaseUrl + "types/assemblyscript.d.ts",
        declareAsModule: false,
        autoload: true
      }
    }
  },
  extensions: ["as", "ts"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/python/lang-python.ts
var brythonUrl = brythonBaseUrl + "brython.min.js";
var stdlibUrl = brythonBaseUrl + "brython_stdlib.js";
var python = {
  name: "python",
  title: "Python",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, ...options } = getLanguageCustomSettings("python", config);
      const importsPattern = /^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm;
      const stdlib = autoloadStdlib !== false && compiled.match(importsPattern) ? [stdlibUrl] : [];
      const loader = `window.addEventListener("load", () => {brython(${JSON.stringify(options)})})`;
      const loaderUrl = "data:text/plain;base64," + btoa(loader);
      const compiledCode = `window.addEventListener("load", () => {
        const content = __BRYTHON__.python_to_js(\`${escapeCode(compiled)}\`);
        parent.postMessage({type: "compiled", payload: {language: "python", content}}, "*");
      });`;
      const compiledCodeUrl = "data:text/plain;base64," + btoa(compiledCode);
      return [brythonUrl, ...stdlib, loaderUrl, compiledCodeUrl];
    },
    scriptType: "text/python"
  },
  extensions: ["py"],
  editor: "script"
};

// ../src/livecodes/languages/ruby/lang-ruby.ts
var getImports = (code, requireMap = {}) => Array.from(
  new Set(
    [...code.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map((arr) => arr[1]).map((mod) => mod.split("/")[0]).filter((mod) => requireMap.hasOwnProperty(mod) || mod !== "opal").map((mod) => requireMap[mod] || `${opalBaseUrl + mod}.min.js`)
  )
);
var ruby = {
  name: "ruby",
  title: "Ruby",
  compiler: {
    url: opalBaseUrl + "opal.min.js",
    factory: () => {
      importScripts(opalBaseUrl + "opal-parser.min.js");
      self.Opal.config.unsupported_features_severity = "ignore";
      self.Opal.load("opal-parser");
      return async (code, { config }) => {
        const { autoloadStdlib, requireMap, ...options } = getLanguageCustomSettings(
          "ruby",
          config
        );
        return self.Opal.compile(code, options);
      };
    },
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, requireMap } = getLanguageCustomSettings("ruby", config);
      const imports = getImports(compiled, requireMap);
      const stdlib = autoloadStdlib !== false ? imports : [];
      return [opalBaseUrl + "opal.min.js", ...stdlib];
    }
  },
  extensions: ["rb"],
  editor: "script"
};

// ../src/livecodes/languages/php/lang-php.ts
var php = {
  name: "php",
  title: "PHP",
  parser: {
    name: "php",
    pluginUrls: [parserPlugins.php]
  },
  compiler: {
    factory: () => async (code) => {
      code = code.trim();
      if (code.startsWith("<?php")) {
        code = code.replace("<?php", "/* <?php */");
        if (code.endsWith("?>")) {
          code = code.replace("?>", "/* ?> */");
        }
      }
      return code;
    },
    scripts: [uniterUrl],
    deferScripts: true,
    scriptType: "text/x-uniter-php",
    compiledCodeLanguage: "php"
  },
  extensions: ["php"],
  editor: "script"
};

// ../src/livecodes/languages/perl/lang-perl.ts
var perl = {
  name: "perl",
  title: "Perl",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      vendorsBaseUrl + "perlito/perlito5.min.js",
      baseUrl + "{{hash:lang-perl-script.js}}"
    ],
    scriptType: "text/perl"
  },
  extensions: ["pl", "pm"],
  editor: "script"
};

// ../src/livecodes/languages/lua/lang-lua.ts
var luaFmtUrl = vendorsBaseUrl + "lua-fmt/lua-fmt.js";
var luaFormatter = {
  factory: () => {
    self.importScripts(luaFmtUrl);
    return async (code, cursorOffset) => ({
      formatted: self.luaFmt.formatText(code),
      cursorOffset
    });
  }
};
var lua = {
  name: "lua",
  title: "Lua",
  formatter: luaFormatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["lua"],
  editor: "script"
};

// ../src/livecodes/languages/commonlisp/lang-commonlisp.ts
var parenFormatter = () => {
  const url3 = parinferUrl;
  self.importScripts(url3);
  return async (value) => ({
    formatted: window.parinfer.parenMode(value).text,
    cursorOffset: 0
  });
};
var commonlisp = {
  name: "commonlisp",
  title: "Lisp",
  longTitle: "Common Lisp",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [jsclUrl, baseUrl + "{{hash:lang-commonlisp-script.js}}"],
    scriptType: "text/commonlisp",
    compiledCodeLanguage: "commonlisp",
    inlineScript: `

    `
  },
  extensions: ["lisp", "common-lisp"],
  editor: "script",
  editorLanguage: "scheme"
};

// ../src/livecodes/languages/scheme/lang-scheme.ts
var scheme = {
  name: "scheme",
  title: "Scheme",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [biwaschemeUrl],
    scriptType: "text/biwascheme",
    compiledCodeLanguage: "scheme"
  },
  extensions: ["scm"],
  editor: "script"
};

// ../src/livecodes/languages/solid/lang-solid.ts
var solid = {
  name: "solid",
  title: "Solid",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["babel"],
    url: vendorsBaseUrl + "babel-preset-solid/babel-preset-solid.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-solid-compiler.js}}");
      return self.createSolidCompiler();
    },
    types: {
      "solid-js": {
        url: vendorsBaseUrl + "types/solid-js.d.ts",
        declareAsModule: false
      }
    }
  },
  extensions: ["solid.jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/solid/lang-solid-tsx.ts
var solidTsx = {
  name: "solid.tsx",
  title: "Solid (TS)",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "solid",
  extensions: ["solid.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/python-pyodide/lang-python-pyodide.ts
var pyodide = {
  name: "pyodide",
  title: "Pyodide",
  longTitle: "Python (Pyodide)",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-python-pyodide-script.js}}"],
    liveReload: true,
    scriptType: "text/python",
    compiledCodeLanguage: "python"
  },
  extensions: ["py3"],
  editor: "script",
  editorLanguage: "python",
  largeDownload: true
};

// ../src/livecodes/languages/liquid/lang-liquid.ts
var liquid = {
  name: "liquid",
  title: "Liquid",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: liquidJsUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-liquid-compiler.js}}");
      return self.createLiquidCompiler();
    }
  },
  extensions: ["liquid", "liquidjs"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/ejs/lang-ejs.ts
var ejs = {
  name: "ejs",
  title: "EJS",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: ejsUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-ejs-compiler.js}}");
      return self.createEjsCompiler();
    }
  },
  extensions: ["ejs"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/handlebars/lang-handlebars.ts
var url = handlebarsBaseUrl + "handlebars.min.js";
var runtimeUrl = handlebarsBaseUrl + "handlebars.runtime.min.js";
var handlebars = {
  name: "handlebars",
  title: "Handlebars",
  parser: {
    name: "glimmer",
    pluginUrls: [parserPlugins.glimmer]
  },
  compiler: {
    url,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-handlebars-compiler.js}}");
      return self.createHandlebarsCompiler();
    }
  },
  extensions: ["hbs", "handlebars"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/dot/lang-dot.ts
var dot = {
  name: "dot",
  title: "doT",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: dotUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-dot-compiler.js}}");
      return self.createDotCompiler();
    }
  },
  extensions: ["dot"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/nunjucks/lang-nunjucks.ts
var url2 = nunjucksBaseUrl + "nunjucks.min.js";
var runtimeUrl2 = nunjucksBaseUrl + "nunjucks-slim.min.js";
var nunjucks = {
  name: "nunjucks",
  title: "Nunjucks",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: url2,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-nunjucks-compiler.js}}");
      return self.createNunjucksCompiler();
    }
  },
  extensions: ["njk"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/go/lang-go.ts
var go = {
  name: "go",
  title: "Go",
  formatter: {
    factory: () => {
      const url3 = go2jsBaseUrl + "/index.js";
      importScripts(url3);
      return async (value) => ({
        formatted: await window.go2js.format(value, go2jsBaseUrl),
        cursorOffset: 0
      });
    }
  },
  compiler: {
    url: go2jsBaseUrl + "/index.js",
    factory: () => async (code) => {
      if (!code)
        return "";
      try {
        const jsCode = await window.go2js.compile(code, go2jsBaseUrl);
        return jsCode;
      } catch (err) {
        console.error(err);
        return "";
      }
    }
  },
  extensions: ["go", "golang"],
  editor: "script"
};

// ../src/livecodes/languages/rescript/lang-rescript.ts
var runOutsideWorker2 = async (code, { baseUrl, language }) => {
  const { rescriptCompiler } = await import(baseUrl + "{{hash:lang-rescript-compiler-esm.js}}");
  return rescriptCompiler(code, { baseUrl, language });
};
var formatterFactory = (baseUrl, language) => {
  importScripts(baseUrl + "{{hash:lang-rescript-formatter.js}}");
  return self.createRescriptFormatter(baseUrl, language);
};
var rescript = {
  name: "rescript",
  title: "ReScript",
  formatter: {
    factory: formatterFactory
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker: runOutsideWorker2,
    scriptType: "module"
  },
  extensions: ["res", "resi"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/reason/lang-reason.ts
var reason = {
  name: "reason",
  title: "Reason",
  formatter: {
    factory: formatterFactory
  },
  compiler: "rescript",
  extensions: ["re", "rei"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/ocaml/lang-ocaml.ts
var ocaml = {
  name: "ocaml",
  title: "OCaml",
  compiler: "rescript",
  extensions: ["ml", "mli"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/wat/lang-wat.ts
var formatterUrl = vendorsBaseUrl + "wast-refmt/wast-refmt.js";
var scriptType = "application/wasm-uint8";
var wat = {
  name: "wat",
  title: "WAT",
  longTitle: "WebAssembly Text",
  formatter: {
    factory: () => {
      importScripts(formatterUrl);
      return async (value) => {
        let formatted = value;
        try {
          formatted = self.wastRefmt.format(value);
        } catch (error) {
          console.warn("failed parsing WAT", error);
        }
        return {
          formatted,
          cursorOffset: 0
        };
      };
    }
  },
  compiler: {
    url: wabtjsUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-wat-compiler.js}}");
      return self.createWatCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-wat-script.js}}"],
    scriptType,
    compiledCodeLanguage: "Binary"
  },
  extensions: ["wat", "wast", "webassembly", "wasm"],
  editor: "script"
};

// ../src/livecodes/languages/riot/lang-riot.ts
var compilerCdnUrl = riotBaseUrl + "riot+compiler.min.js";
var cdnUrl = riotBaseUrl + "riot.min.js";
var riot = {
  name: "riot",
  title: "Riot.js",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: compilerCdnUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-riot-compiler.js}}");
      return self.createRiotCompiler();
    },
    scripts: [cdnUrl],
    scriptType: "module"
  },
  extensions: ["riot", "riotjs"],
  editor: "script",
  editorLanguage: "html"
};

// ../src/livecodes/languages/sql/lang-sql.ts
var scriptType2 = "application/json";
var sql = {
  name: "sql",
  title: "SQL",
  formatter: {
    factory: () => {
      importScripts(sqlFormatterUrl);
      return async (value) => ({
        formatted: await self.sqlFormatter.format(value, { linesBetweenQueries: 2 }),
        cursorOffset: 0
      });
    }
  },
  compiler: {
    url: sqljsBaseUrl + "sql-wasm.min.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-sql-compiler.js}}");
      return self.createSqlCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-sql-script.js}}"],
    scriptType: scriptType2,
    compiledCodeLanguage: "json"
  },
  extensions: ["sql", "sqlite", "sqlite3"],
  editor: "script"
};

// ../src/livecodes/languages/react-native/lang-react-native.ts
var reactNativeWebUrl = vendorsBaseUrl + "react-native-web/react-native-web.js";
var reactNative = {
  name: "react-native",
  title: "RN",
  longTitle: "React Native",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["typescript"],
    factory: () => async (code, { config, language }) => window.ts.transpile(code, {
      ...typescriptOptions,
      ...getLanguageCustomSettings("typescript", config),
      ...getLanguageCustomSettings(language, config)
    }),
    imports: {
      react: reactNativeWebUrl,
      "react-native": reactNativeWebUrl
    }
  },
  extensions: ["react-native.jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// ../src/livecodes/languages/react-native/lang-react-native-tsx.ts
var reactNativeTsx = {
  name: "react-native-tsx",
  title: "RN (TSX)",
  longTitle: "React Native (TSX)",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["typescript"],
    factory: () => async (code, { config, language }) => window.ts.transpile(code, {
      ...typescriptOptions,
      ...getLanguageCustomSettings("typescript", config),
      ...getLanguageCustomSettings(language, config)
    }),
    imports: {
      react: reactNativeWebUrl,
      "react-native": reactNativeWebUrl
    }
  },
  extensions: ["react-native.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/blockly/lang-blockly.ts
var blockly = {
  name: "blockly",
  title: "Blockly",
  compiler: {
    factory: () => async (_code, { options }) => options?.blockly?.js || ""
  },
  extensions: ["blockly.xml", "xml"],
  editor: "script",
  editorLanguage: "xml"
};

// ../src/livecodes/languages/twig/lang-twig.ts
var twig = {
  name: "twig",
  title: "Twig",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: twigUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-twig-compiler.js}}");
      return self.createTwigCompiler();
    }
  },
  extensions: ["twig"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/astro/lang-astro.ts
var compilerURL = astroBaseUrl + "compiler.min.js";
var astro = {
  name: "astro",
  title: "Astro",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: compilerURL,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-astro-compiler.js}}");
      return self.createAstroCompiler();
    }
  },
  extensions: ["astro"],
  editor: "markup"
};

// ../src/livecodes/languages/malina/lang-malina.ts
var malina = {
  name: "malina",
  title: "Malina.js",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-malina-compiler.js}}");
      return self.createMalinaCompiler();
    }
  },
  extensions: ["xht"],
  editor: "script",
  editorLanguage: "html"
};

// ../src/livecodes/languages/cpp/lang-cpp.ts
var cdnUrl2 = vendorsBaseUrl + "jscpp/JSCPP.es5.min.js";
var cpp = {
  name: "cpp",
  title: "C++",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [cdnUrl2, baseUrl + "{{hash:lang-cpp-script.js}}"],
    scriptType: "text/cpp",
    compiledCodeLanguage: "cpp"
  },
  extensions: ["cpp", "c", "C", "cp", "cxx", "c++", "cppm", "ixx", "ii", "hpp", "h"],
  editor: "script"
};

// ../src/livecodes/languages/julia/lang-julia.ts
var julia = {
  name: "julia",
  title: "Julia",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-julia-script.js}}"],
    liveReload: true,
    scriptType: "text/julia",
    compiledCodeLanguage: "julia"
  },
  extensions: ["jl"],
  editor: "script",
  largeDownload: true
};

// ../src/livecodes/languages/cpp-clang/lang-cpp-clang.ts
var clang = {
  name: "clang",
  title: "Clang",
  longTitle: "C/C++ (Clang)",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-cpp-clang-script.js}}"],
    scriptType: "text/cpp",
    compiledCodeLanguage: "cpp",
    liveReload: true
  },
  extensions: [
    "clang.cpp",
    "clang",
    "cpp",
    "c",
    "C",
    "cp",
    "cxx",
    "c++",
    "cppm",
    "ixx",
    "ii",
    "hpp",
    "h"
  ],
  editor: "script",
  editorLanguage: "cpp",
  largeDownload: true
};

// ../src/livecodes/languages/tcl/lang-tcl.ts
var tcl = {
  name: "tcl",
  title: "Tcl",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [requireUrl, baseUrl + "{{hash:lang-tcl-script.js}}"],
    scriptType: "text/tcl",
    compiledCodeLanguage: "tcl"
  },
  extensions: ["tcl"],
  editor: "script"
};

// ../src/livecodes/languages/prolog/lang-prolog.ts
var prolog = {
  name: "prolog",
  title: "Prolog",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      tauPrologBaseUrl + "core.js",
      tauPrologBaseUrl + "charsio.js",
      tauPrologBaseUrl + "dom.js",
      tauPrologBaseUrl + "format.js",
      tauPrologBaseUrl + "js.js",
      tauPrologBaseUrl + "lists.js",
      tauPrologBaseUrl + "os.js",
      tauPrologBaseUrl + "promises.js",
      tauPrologBaseUrl + "random.js",
      tauPrologBaseUrl + "statistics.js",
      baseUrl + "{{hash:lang-prolog-script.js}}"
    ],
    scriptType: "text/prolog",
    compiledCodeLanguage: "prolog"
  },
  extensions: ["prolog.pl", "prolog"],
  editor: "script"
};

// ../src/livecodes/languages/clio/lang-clio.ts
var clio = {
  name: "clio",
  title: "Clio",
  compiler: {
    url: clioBaseUrl + "compile.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-clio-compiler.js}}");
      return self.createClioCompiler();
    },
    scripts: [clioBaseUrl + "exec.js"]
  },
  extensions: ["clio"],
  editor: "script",
  editorLanguage: "coffeescript"
};

// ../src/livecodes/languages/richtext/lang-richtext.ts
var richtext = {
  name: "richtext",
  title: "Rich Text",
  longTitle: "Rich Text Editor",
  compiler: {
    factory: () => async (_code, { config }) => config.markup.content || "",
    styles: ["{{hash:quill.css}}"]
  },
  extensions: ["rte", "rte.html", "rich"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/diagrams/lang-diagrams.ts
var runOutsideWorker3 = async (code, { baseUrl, config }) => {
  const { diagramsCompiler } = await import(baseUrl + "{{hash:lang-diagrams-compiler-esm.js}}");
  return diagramsCompiler(code, { config });
};
var diagrams = {
  name: "diagrams",
  title: "Diagrams",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code || "",
    runOutsideWorker: runOutsideWorker3
  },
  extensions: ["diagrams", "diagram", "graph", "plt"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/imba/lang-imba.ts
var imba = {
  name: "imba",
  title: "Imba",
  compiler: {
    url: imbaBaseUrl + "compiler.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-imba-compiler.js}}");
      return self.createImbaCompiler();
    },
    imports: {
      imba: imbaBaseUrl + "imba.mjs"
    }
  },
  extensions: ["imba"],
  editor: "script"
};

// ../src/livecodes/languages/mustache/lang-mustache.ts
var mustache = {
  name: "mustache",
  title: "Mustache",
  parser: {
    name: "glimmer",
    pluginUrls: [parserPlugins.glimmer]
  },
  compiler: {
    url: mustacheUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-mustache-compiler.js}}");
      return self.createMustacheCompiler();
    }
  },
  extensions: ["mustache"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/art-template/lang-art-template.ts
var artTemplate = {
  name: "art-template",
  title: "art",
  longTitle: "art-template",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: artTemplateUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-art-template-compiler.js}}");
      return self.createArtTemplateCompiler();
    }
  },
  extensions: ["art", "art-template"],
  editor: "markup",
  editorLanguage: "html"
};

// ../src/livecodes/languages/r/lang-r.ts
var r = {
  name: "r",
  title: "R",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "{{hash:lang-r-script-esm.js}}"],
    inlineScript: `
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,
    liveReload: true,
    scriptType: "text/r",
    compiledCodeLanguage: "r"
  },
  extensions: ["r", "rlang", "rstats"],
  editor: "script",
  largeDownload: true
};

// ../src/livecodes/languages/civet/lang-civet.ts
var civetUrl = vendorsBaseUrl + "civet/civet.js";
var civet = {
  name: "civet",
  title: "Civet",
  compiler: {
    url: civetUrl,
    factory: () => async (code) => window.civet.compile(code, { js: true })
  },
  extensions: ["civet"],
  editor: "script",
  editorLanguage: "coffeescript"
};

// ../src/livecodes/languages/fennel/lang-fennel.ts
var fennel = {
  name: "fennel",
  title: "Fennel",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-fennel-compiler.js}}");
      return self.createFennelCompiler();
    },
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["fnl"],
  editor: "script",
  editorLanguage: "scheme"
};

// ../src/livecodes/languages/teal/lang-teal.ts
var teal = {
  name: "teal",
  title: "Teal",
  formatter: luaFormatter,
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "{{hash:lang-teal-compiler.js}}");
      return self.createTealCompiler();
    },
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["tl"],
  editor: "script",
  editorLanguage: "lua"
};

// ../src/livecodes/languages/stylis/lang-stylis.ts
var stylis = {
  name: "stylis",
  title: "Stylis",
  compiler: {
    url: stylisUrl,
    factory: () => async (code) => {
      const { compile, serialize, stringify, middleware, prefixer } = window.stylis;
      return serialize(compile(code), middleware([prefixer, stringify]));
    }
  },
  extensions: ["stylis"],
  editor: "style",
  editorLanguage: "scss"
};

// ../src/livecodes/languages/flow/lang-flow.ts
var flow = {
  name: "flow",
  title: "Flow",
  parser: {
    name: "babel-flow",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: vendorsBaseUrl + "flow-remove-types/flow-remove-types.js",
    factory: () => async (code, { config }) => window.flowRemoveTypes.transpile(code, {
      all: true,
      ...getLanguageCustomSettings("flow", config)
    }).toString()
  },
  extensions: ["flow"],
  editor: "script",
  editorLanguage: "typescript"
};

// ../src/livecodes/languages/mjml/lang-mjml.ts
var mjml = {
  name: "mjml",
  title: "MJML",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: mjmlUrl,
    factory: () => async (code, { config }) => {
      if (!code.trim())
        return "";
      const { html: html2, errors } = self.mjml(
        code,
        getLanguageCustomSettings("mjml", config)
      );
      errors?.forEach(
        (err) => {
          console.warn(err.formattedMessage);
        }
      );
      return html2;
    }
  },
  extensions: ["mjml"],
  editor: "markup",
  editorLanguage: "xml"
};

// ../src/livecodes/languages/languages.ts
var languages = [
  html,
  markdown,
  mdx,
  astro,
  pug,
  asciidoc,
  haml,
  mustache,
  handlebars,
  ejs,
  nunjucks,
  liquid,
  dot,
  twig,
  artTemplate,
  mjml,
  diagrams,
  richtext,
  css,
  scss,
  sass,
  less,
  stylus,
  stylis,
  javascript,
  babel,
  typescript,
  flow,
  jsx,
  tsx,
  reactNative,
  reactNativeTsx,
  vue,
  vue2,
  svelte,
  stencil,
  solid,
  solidTsx,
  riot,
  malina,
  coffeescript,
  livescript,
  civet,
  clio,
  imba,
  rescript,
  reason,
  ocaml,
  python,
  pyodide,
  r,
  ruby,
  go,
  php,
  cpp,
  clang,
  perl,
  lua,
  teal,
  fennel,
  julia,
  scheme,
  commonlisp,
  tcl,
  assemblyscript,
  wat,
  sql,
  prolog,
  blockly
];
export {
  createPlayground,
  defaultConfig,
  languages,
  starterTemplates
};
