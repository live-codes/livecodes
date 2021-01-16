import { Template } from '../models';

export const angularStarter: Template = {
  title: 'Angular Starter',
  thumbnail: 'assets/templates/angular.svg',
  language: 'ts',
  markup: {
    language: 'html',
    content: '<app>Loading...</app>\n',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'ts',
    content: `
declare var ng: any;

// app.component.ts
const { Component } = ng.core;

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
      <img src="/localpen/assets/templates/angular.svg" class="logo" />
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
const { Input } = ng.core;

@Component({
  selector: "heading",
  template: "<h1>{{title}}</h1>",
})
class HeadingComponent {
  @Input() name: string;
  title: string;

  ngOnInit() {
    this.title = "Hello, " + this.name;
  }
}

// app.module.ts
const { BrowserModule } = ng.platformBrowser;
const { NgModule } = ng.core;
const { CommonModule } = ng.common;

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, HeadingComponent],
  bootstrap: [AppComponent],
  providers: [],
})
class AppModule {}

// main.ts
const { enableProdMode } = ng.core;
const { platformBrowserDynamic } = ng.platformBrowserDynamic;

// enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: Error) => console.error(err));
`.trimStart(),
  },
  stylesheets: [],
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.3/rxjs.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js',
    'https://unpkg.com/@angular/core@11.0.5/bundles/core.umd.js',
    'https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.10.3/zone.min.js',
    'https://unpkg.com/@angular/common@11.0.5/bundles/common.umd.js',
    'https://unpkg.com/@angular/compiler@11.0.5/bundles/compiler.umd.js',
    'https://unpkg.com/@angular/platform-browser@11.0.5/bundles/platform-browser.umd.js',
    'https://unpkg.com/@angular/platform-browser-dynamic@11.0.5/bundles/platform-browser-dynamic.umd.js',
  ],
  cssPreset: null,
  modules: [],
};
