# Sync

LiveCodes local data can be synchronized to a GitHub repo. This can be used as a cloud backup, and to synchronize multiple devices.

A GitHub account is required. The user must give access to [(Private Repos) while logging in](./github-integration.html.md).

The Sync screen can be accessed from the Settings menu → Sync.

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<RunInLiveCodes params={{ screen: 'sync' }} linkText="direct link" />

![LiveCodes Sync](../../static/img/screenshots/sync.jpg)

Data can be synchronized to a new (**private**) or existing repo.

The data is synchronized with the `main` branch in a directory named `livecodes-data`.

If `Auto sync` is selected, the sync will be attempted every 5 minutes. Remote files are downloaded only when changed (e.g. sync from another device).

`Auto sync` can be turned off and on by the switch on the Settings menu.

The sync can be manually triggered at any time from the Sync UI. Information regarding the last sync time and repo are displayed on the UI screen.

## Related

- [Backup / restore](./backup-restore.html.md)
- [Export](./export.html.md)