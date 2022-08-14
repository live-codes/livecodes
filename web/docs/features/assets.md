# Assets

Adding local assets (e.g. images, fonts, stylesheets, scripts) that are not hosted online is such a common need that a UI was developed to allow easily adding them.

Assets are either:

- Encoded as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
- Uploaded to a [GitHub Pages](https://pages.github.com/). This requires logging in by a GitHub account (allowing access to repos). A public repo called `livecodes-assets` is created if not present. The assets are pushed to `gh-pages` branch. They can then be accessed by URLs like:

  https://{your-account}.github.io/livecodes-assets/assets/...

Clicking on an asset item causes the URL to be copied to clipboard. The URL can then be used in your projects.

The assets are available across projects (i.e the same image can be used in different projects without having to add it multiple times).

![Assets](/img/screenshots/assets.jpg)
