# Assets

Adding local assets (e.g. images, fonts, stylesheets, scripts) that are not hosted online is such a common need that a UI was developed to allow easily adding them.

The assets are saved locally on the user's device and are available across projects (i.e the same image can be used in different projects without having to add it multiple times).

In addition, assets are supported in [sync](./sync.html.md), [backup](./backup-restore.html.md)#backup) and [restore](./backup-restore.html.md)#restore).

The `Assets` screen can be accessed from Settings menu → Assets

![Assets](/img/screenshots/assets-1.jpg)

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{ screen: 'assets' }} linkText="direct link" />

Assets are either:

- Encoded as [data URLs](./data-urls.html.md).
- Uploaded to a [GitHub Pages](https://pages.github.com/). This requires login with a [GitHub account](./github-integration.html.md) (allowing access to repos). A **public** repo called `livecodes-assets` is created if not present. The assets are pushed to `gh-pages` branch. They can then be accessed by URLs like:

  https://\{user\}.github.io/livecodes-assets/assets/...

When an asset item is clicked, the URL is copied to clipboard. The URL can then be used in projects.

![Assets](/img/screenshots/assets-2.jpg)