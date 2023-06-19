# Services

LiveCodes (being a client-side app) uses multiple services (for example for authentication, sharing, module resolution, etc).

These services are [defined here](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services).

Some of the services are not supported on [self-hosted](../features/self-hosting.md) deploys and are either replaced by other compatible services (e.g. the [share](../features/share.md) service uses [dpaste](https://dpaste.com/) instead of LiveCodes share service) or require you to provide an alternative service (e.g. [Firebase configuration](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services/firebase.ts) for authentication).

If you [self-host](../features/self-hosting.md) your app and need to change any of these services, start by following the [guide described there](../features/self-hosting.md).

Then, edit the services you want (in `src/livecodes/services`). The used services need to have the same interface.

The app then needs to be re-built using the command:

```shell
npm run build
```

The built app is in `build` directory. This can be hosted on any static file server.
