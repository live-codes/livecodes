# Services

LiveCodes (being a client-side app) uses multiple services (for example for authentication, sharing, module resolution, etc).

These services are [defined here](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services).

If you [self-host](../getting-started.md#self-hosted) your app and need to change any of these services, start by following the [guide described there](../getting-started.md#self-hosted).

Then, edit the services you want (in `src/livecodes/services`). The used services need to have the same API.

The app then needs to be re-built using the command:

```sh
npm run build
```

The built app is in `build` directory. This can be hosted on any static file server. It needs to be served from the root of the domain/subdomain.
