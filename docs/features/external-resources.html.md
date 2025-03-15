# External Resources

## Stylesheets and Scripts

URLs to external CSS stylesheets and JS scripts can be added to the page from the UI using the Project menu → External Resources. In addition, there is a button to the External Resources in the toolbar below the editors.

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{ screen: 'resources' }} linkText="direct link" />

URLs to stylesheets/scripts should be added each in a separate line.

Stylesheets and scripts are loaded in the [result page](./result.html.md) before editor codes. Thus, CSS properties defined in external stylesheets can be overridden in the style editor. Global javascript variables defined in external scripts are available to code in the script editor.

![External Resources](/img/screenshots/resources.jpg)

Importing and Exporting code to other services (e.g. Codepen and Github gists) takes into consiedration the external resources.

## Search for NPM Packages

Package search allows finding NPM Packages and adding URLs to default scripts/stylesheets (hosted by [jsDelivr](https://www.jsdelivr.com/)). Specific package version can be specified.

Examples for search terms:

```
jque

jquery

jquery@3

jquery@3.6

jquery@3.6.3

```

![External Resources Search](/img/screenshots/resources-search.jpg)

## Fonts

Fonts can be added from [Google fonts](https://fonts.google.com/).

## CSS Presets

CSS presets currently include [Normalize.css](https://necolas.github.io/normalize.css/) and [Reset CSS](https://meyerweb.com/eric/tools/css/reset/).

## Related

- [Module resolution](./module-resolution.html.md)
- [Assets](./assets.html.md)