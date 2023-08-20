# Templates

import TemplateList from '../../src/components/TemplateList';

A new project can be based on any of the provided [starter templates](#starter-templates) or [user templates](#user-templates).

A new project (from template) can be started from:

- App menu → New
- [Welcome Screen](./welcome.md) → New
- Direct URL: https://livecodes.io?new

## Starter Templates

A Large number of starter templates are available. They act as starting points and example usage for the [languages](../languages/index.md) available in LiveCodes.

A direct link for a starter template has the following format:

`?template={template_name}` (e.g. https://livecodes.io/?template=react)

The list of template names are documented [here](../api/modules/internal.md#templatename).

### Template List

The following list of starter templates are available:

<TemplateList />

## User Templates

Any project loaded in LiveCodes can be saved as a user template, to be used later as a starting point for new projects.

A project can be saved as a user template from app menu → Save as → Template.

It can then be accessed from app menu → New ... → My Templates.

A user template can be set as [default template](./default-template-language.md) to be automatically loaded when loading the app.

User templates are scoped to the currently [logged-in user](./user-management.md). They can be [backed up/restored](./backup-restore.md) and [synced](./sync.md) the same as other user data.

## Related

- [Default Template/Language](./default-template-language.md)
- [Project](./projects.md)
- [Code Snippets](./snippets.md)
- [User management](./user-management.md)
- [Backup/Restore](./backup-restore.md)
- [Sync](./sync.md)
- [Languages](../languages/index.md)
