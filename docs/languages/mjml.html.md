# MJML

[MJML](https://mjml.io/) is a markup language designed to reduce the pain of coding a responsive email.

## Language Info

### Name

`mjml`

### Extension

`.mjml`

### Editor

`markup`

## Compiler

The [browser build](https://www.npmjs.com/package/mjml-browser) of the official [MJML compiler](https://github.com/mjmlio/mjml).

### Version

`mjml-browser`: v4.15.3

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `mjml` are passed as a JSON object to the mjml compiler. Please check the [documentation](https://documentation.mjml.io/#inside-node-js) for full reference.

**Example:**

```json
{
  "mjml": {
    "keepComments": false,
    "minify": true
  }
}
```

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  mjml: '<mjml>\n\t<mj-body>\n\t\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-text>\n\t\t\t\t\tHello World!\n\t\t\t\t</mj-text>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t</mj-body>\n</mjml>\n',
};

<LiveCodes params={params}></LiveCodes>

This playground loads a template from the official MJML [email templates](https://github.com/mjmlio/email-templates):

<LiveCodes
  import="https://github.com/mjmlio/email-templates/blob/master/templates/onepage.mjml"
  height="400"
></LiveCodes>

## Links

- [MJML official website](https://mjml.io/)

- [MJML documentation](https://documentation.mjml.io/)

- [MJML GitHub repo](https://github.com/mjmlio/mjml)

- [Official email templates](https://mjml.io/templates)