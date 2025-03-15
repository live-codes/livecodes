# User Management

Generally, LiveCodes can be used anonymously without any accounts. This includes creating/saving [projects](./projects.html.md) and [importing](./import.html.md) code from GitHub gists or public repos.

However, some features do require login with a GitHub account and giving [specific permissions](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes) to make use of GitHub services (e.g. [import](./import.html.md) from private repos, [export](./export.html.md) to gist, [deploy](./deploy.html.md), [assets](./assets.html.md) and [sync](./sync.html.md)).

Please see the section about [GitHub Integration](./github-integration.html.md) for permissions required and how to change them.

:::caution cookies

User authentication is handled using [Firebase Authentication](https://firebase.google.com/products/auth) which **may use cookies**. By logging in, you agree that cookies may be stored on your device.

:::

:::info note

GitHub user permissions for LiveCodes app are set the first time the user logs in. Any subsequent login will use the first permissions, even if they are set differently.

Please see the section about [GitHub Integration](./github-integration.html.md)#setting-permissions) for how to change/revoke permissions .

:::

## User Data

User data includes [saved projects](./projects.html.md), [code snippets](./snippets.html.md), [assets](./assets.html.md) and [user settings](./user-settings.html.md). This data is saved in the browser linked to the logged in user account. When a user first logs in, data that was previously saved anonymously is linked to that user account.

If the user logs off, the data is cleared from the app, but is kept in the browser storage. This allows another user to use the same device without the data leaking. When the user, logs in again, the previously stored data (under that account) is reloaded to the app.

## Login/Logout

Login/Logout links are accessible at the top right corner of the app.

:::info note

All user management features, including ability to login/logout, access to user data, and [GitHub services](./github-integration.html.md) that require account, are not available in [embedded playgrounds](./embeds.html.md).

:::