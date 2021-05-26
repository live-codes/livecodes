import { Template } from '../../models';

export const angularStarter: Template = {
  name: 'angular',
  title: 'Angular Starter',
  thumbnail: 'assets/templates/angular.svg',
  activeEditor: 'script',
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
import { Component, Input, NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
      <img src="{{ __localpen_baseUrl__ }}assets/templates/angular.svg" class="logo" />
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
    this.title = "Hello, " + this.name;
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
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {
    '@angular/core': '{{ __localpen_baseUrl__ }}types/ng-core.d.ts',
    '@angular/common': '{{ __localpen_baseUrl__ }}types/ng-common.d.ts',
    '@angular/platform-browser': '{{ __localpen_baseUrl__ }}types/ng-platform-browser.d.ts',
    '@angular/platform-browser-dynamic':
      '{{ __localpen_baseUrl__ }}types/ng-platform-browser-dynamic.d.ts',
    '@angular/forms': '{{ __localpen_baseUrl__ }}types/ng-forms.d.ts',
    '@angular/animations': '{{ __localpen_baseUrl__ }}types/ng-animations.d.ts',
  },
};
