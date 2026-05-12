import type { Template } from '../../models';

export const bootstrapStarter: Template = {
  name: 'bootstrap',
  aliases: ['bs'],
  title: window.deps.translateString('templates.starter.bootstrap', 'Bootstrap Starter'),
  thumbnail: 'assets/templates/bootstrap.svg',
  activeEditor: 'markup',
  markup: {
    language: 'html',
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
`.trimStart(),
  },
  style: {
    language: 'css',
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
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: '',
  },
  stylesheets: ['{{ __CDN_URL__ }}bootstrap@5.3.0/dist/css/bootstrap.min.css'],
  scripts: ['{{ __CDN_URL__ }}bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'],
  cssPreset: '',
  imports: {},
  types: {},
};
