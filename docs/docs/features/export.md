# Export

## Exporting A Single Project

Project export can be accessed from app menu → Export.

![LiveCodes Export](../../static/img/screenshots/export.png)

Any project can be exported to:

- **Project (JSON):** a JSON file containing project [configuration object](../configuration/configuration-object.md). This can be used to later [import](./import.md#import-exported-livecodes-projects) that project on the same or a different device or to share a copy of the project with others.
- **Source (ZIP):** a zip file containing the project configuration file as JSON, in addition to the source code in separate files. This can be useful for opening the code in an external IDE.
- **Result (HTML):** [result page](./result.md) as a single html file. Can be used for the purpose of demo or deploy.
- **GitHub gist** (_requires login with [GitHub account](./github-integration.md)_): creates a **public** GitHub gist on the user's GitHub account containing the source code as separate files.
- **CodePen:** creates a [CodePen](https://codepen.io/) prefilled with the project code. If the used [languages/frameworks](./../languages/index.md) are not supported in CodePen (e.g. Astro, Svelte, Python, ...etc), the compiled code is exported so that it continues to work there. [Bare module imports](./module-resolution.md) are converted to esm imports, for example:
  ```js
  import React from 'react';
  ```
  becomes:
  ```js
  import React from 'https://cdn.skypack.dev/react';
  ```
- **JSFiddle:** creates a [JSFiddle](https://jsfiddle.net/) prefilled with the project code. Exported code may be modified like with CodePen (see above).

## Exporting Multiple Projects

Multiple projects can be exported in bulk from the [Saved Projects](./projects.md) screen (app menu → Open) using the button `Export All`.

![saved projects](../../static/img/screenshots/saved-projects.png)

This produces a JSON file containing an array of project configuration objects. They can be later imported in the same or a different device using the `Bulk Import` functionality in the [Import screen](./import.md#import-exported-livecodes-projects).

All the currently visible projects will be exported. If projects are filtered (e.g. by language, tag or search query), only the shown projects are exported.

## Related

- [Projects](./projects.md)
- [Import](./import.md)
- [Backup/Restore](./backup-restore.md)
- [Sync](./sync.md)
- [Share](./share.md)
