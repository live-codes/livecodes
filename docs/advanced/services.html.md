# Services

LiveCodes (being a [client-side](../why.html.md)#client-side) app) uses multiple services (for example for short-URL [sharing](../features/share.html.md), [broadcast server](../features/broadcast.html.md), authentication, module resolution, etc).

Some of these services are not supported on _static_ [self-hosted](../features/self-hosting.html.md) deploys and are either replaced by other compatible services or require you to provide alternative ones.

Examples:

- The [share](../features/share.html.md) service in [self-hosted](../features/self-hosting.html.md) apps uses [dpaste](https://dpaste.com/) for short URLs, which are [**deleted after 365 days**](https://dpaste.com/help).
- [Firebase configuration](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services/firebase.ts) for authentication.

Demo for a static self-hosted app (on GitHub Pages): https://live-codes.github.io/livecodes

Most likely, you will not need to provide these services yourself, and the app will work just fine using the other compatible services (e.g. dpaste).
However, if you do need to provide them, you may wish to use the included [docker setup](../advanced/docker.html.md) which provides a self-hosted implementation for these services, very similar to the official [hosted app](https://livecodes.io).
You can find the list of provided services [here](../advanced/docker.html.md)#services).

Demo for a self-hosted app that uses the [docker setup](../advanced/docker.html.md) (on a VPS): https://vps.livecodes.io

:::info

LiveCodes [sponsors](../sponsor.html.md) (Bronze sponsors and above) get access to a hosted [docker setup](../advanced/docker.html.md) with managed [services](../advanced/docker.html.md)#services).

:::