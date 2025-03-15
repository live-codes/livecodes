# Deploy

The result page (of any number of projects) can be deployed and hosted at [GitHub Pages](https://pages.github.com/) (a free service from GitHub for hosting static websites). This requires login with a [GitHub account](./github-integration.html.md).

The `Deploy` screen can be accessed from the Project menu → Deploy.

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{ screen: 'deploy' }} linkText="direct link" />

![LiveCodes Deploy](../../static/img/screenshots/deploy-1.jpg)

The result page (and optionally the source code) is pushed to `gh-pages` branch of a **public** GitHub repo (new or existing). The page, shortly, becomes available on `https://{user}.github.io/{repo}/`.

If an existing repo is selected, the content of the `gh-pages` branch (if existing) is replaced by the deployed content.

If the option `Commit source code` is enabled, the source code will be deployed to the directory `/src`.

The code for the result page (and source code) is deployed as separate files for markup (`/index.html`), styles (`style.css`) and script (`script.js`). This allows re-use of these resources in other projects. Of course, multiple projects can be deloyed and linked to each other to act like a multi-page website.

The LiveCodes app will remember the repo used to deploy each project, so that later updates to the project can be deployed to the same repo.

## Related

- [Export](./export.html.md)
- [Share](./share.html.md)
- [Broadcast](./broadcast.html.md)
- [GitHub integration](./github-integration.html.md)