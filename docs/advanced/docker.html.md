# Docker Setup

This guide makes it easy to set up a self-hosted instance of LiveCodes on a <acronym title="Virtual Private Server">VPS</acronym> using Docker.

## Why?

LiveCodes is a [client-side app](../why.html.md)#client-side). It can be easily self-hosted on any static file server or <acronym title="Content Delivery Network">CDN</acronym> (See [Self-Hosting guide](../features/self-hosting.html.md)).

All core functionalities (e.g. editors, compilers, formatters, code execution, etc) run in the browser.
However, some features require [external services](./services.html.md) which depend on server-side implementations (e.g. [sharing](../features/share.html.md) short URLs, [broadcast server](../features/broadcast.html.md), etc).
The docker setup described here provides out-of-the-box implementations for self-hosting these services.
See below for the list of provided [services](#services).

This allows self-hosted instances to have the same features as the hosted app ([livecodes.io](https://livecodes.io)).

:::warning Note
Most self-hosted instances will not require this setup. The static app should work just fine using other simpler [self-hosting methods](../features/self-hosting.html.md)#guide).
Only use the docker setup if you need to self-host [these services](#services).
:::

## Example

This is an example of a self-hosted instance deployed to a VPS using the included Docker setup:

https://vps.livecodes.io/

Setting it up can be as simple as running the following command:

```sh
HOST_NAME=vps.livecodes.io docker compose up --build -d
```

## Requirements

- Docker and Docker Compose ([installation guide](https://docs.docker.com/engine/install/))
- Git: optional - for pulling updates ([installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

<details>
<summary>
Example script to install Docker, Docker Compose and Git on Ubuntu
</summary>

```sh title="install_docker_ubuntu.sh"
#!/bin/bash

# Update package lists
sudo apt update

# Install Docker
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker # Apply group changes immediately

# Install Docker Compose
sudo apt install -y docker-compose

# Install Git
sudo apt install -y git
```

To use this script:

**Save**

Save the script to a file, for example: `install_docker_ubuntu.sh`.

**Make Executable**

Make the script executable with:

```sh
chmod +x install_docker_ubuntu.sh
```

**Run**

Execute the script using:
```sh
sudo ./install_docker_ubuntu.sh
```

**Verify**

Verify the installations with:

```sh
docker --version
docker compose version
git --version
```
</details>

## Getting Started

:::info note
When running in a non-local environment (e.g. VPS),
make sure your domain's A/AAAA DNS records properly point to the machine public IP **before** running the docker containers.
The hostname should be set using [environment variables](#environment-variables).
:::

Clone the repo:

```sh
git clone https://github.com/live-codes/livecodes.git
```

Enter the directory:

```sh
cd livecodes
```

Optionally, checkout a specific branch:

```sh
git checkout main
```

Run docker compose:

```sh
docker compose up -d
```

By default, the app is served at https://livecodes.localhost <br />
(Yes, `localhost` can be served over HTTPS and have subdomains!).

The hostname and many other options can be set using [environment variables](#environment-variables).

## Services

- Automatic HTTPS

  This is provided by [Caddy server](https://caddyserver.com), which automatically obtains and renews TLS certificates.
  Local addresses (e.g. `localhost`, `livecodes.localhost`) are served over HTTPS using locally-trusted certificates.

- [Open Graph meta tags](https://ogp.me/)

  Provide project-specific meta tags, for social media cards.

- [oEmbed](https://oembed.com/)

  Allows embedded representations on third party sites.

- Adding [headers](https://github.com/live-codes/livecodes/blob/develop/src/_headers)

  e.g. aggressive caching of static assets for improved performance.

- [Short-URL share service](../features/share.html.md)

  Generates a short URL that can be shared. The project config is stored in a [Valkey](https://valkey.io/) store (a Redis fork with a permissive open-source license).
  Data is persisted to disk every 60 seconds (See [Volumes](#volumes) section below).

- [Broadcast server](../features/broadcast.html.md)

  Broadcasts updates to connected clients.

- CORS proxy

  Allows [importing content](../features/import.html.md) from external URLs.

- Separate origin sandbox

  Runs code in a separate origin [sandboxed iframe](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) to prevent cross-site scripting.

- [404 page](https://livecodes.io/404)

  Custom 404 page for resources that are not found.

## Environment Variables

The app can be customized by setting different environment variables.


Environment variables can be defined in a `.env` file in the root of the repository (on the same level as `docker-compose.yml`).

```txt title=".env"
HOST_NAME=playground.website.com
```

Please note that some variables are used **during build**. So after setting environment variables, the app needs to be rebuilt. e.g.:

```sh
docker compose up --build -d
```

The following environment variables are supported:

| Variable | Description | Default |
| --- | --- | --- |
| `HOST_NAME` | Hostname of the app | `livecodes.localhost` |
| `PORT` | Port of the app | `443` |
| `SELF_HOSTED_SHARE` | Enable [share service](../features/share.html.md) | `true` |
| `SELF_HOSTED_BROADCAST` | Enable [broadcast server](../features/broadcast.html.md) | `true` |
| `BROADCAST_PORT` | Port of the broadcast server | `3030` |
| `BROADCAST_TOKENS` | Comma-separated list of broadcast [user tokens](../features/broadcast.html.md)#technical-details) | |
| `SANDBOX_HOST_NAME` | Hostname of the sandbox | `$HOST_NAME` |
| `SANDBOX_PORT` | Port of the sandbox | `8090` |
| `FIREBASE_CONFIG` | [Firebase config object](https://firebase.google.com/docs/web/learn-more#config-object) (JSON), used for [authentication](../features/github-integration.html.md) | |
| `DOCS_BASE_URL` | [Base URL](../features/self-hosting.html.md)#custom-build) of the documentation (e.g. `/docs/`) | `null` |
| `LOG_URL` | Full URL to send [server-side analytics](https://github.com/live-codes/livecodes/blob/develop/functions/index.ts) (e.g. `https://api.website.com/log`) | `null` |

:::info note
When running in a non-local environment (e.g. VPS),
setting the `HOST_NAME` environment variable is **required**. It should match the domain name set in [DNS records](#getting-started).
:::

## Volumes

The following docker [volumes](https://docs.docker.com/engine/storage/volumes/) are used:

- `./assets` - A [bind mount](https://docs.docker.com/engine/storage/bind-mounts/) for static assets that get served under the app URL (`/assets/`). This can be used to serve images, stylesheets, [custom modules](../features/module-resolution.html.md)#custom-module-resolution), [custom types](../features/intellisense.html.md)#custom-types), etc.
- `livecodes-share-data` - A [named volume](https://docs.docker.com/engine/storage/volumes/) where persistent data for the share service is saved. Make sure to **backup** this.

<details>
<summary>
Example scripts to backup and restore Docker named volumes
</summary>

```sh title="backup-volumes.sh"
#!/bin/bash

VOLUMES=("livecodes-share-data")
BACKUP_DIR="./backups"

mkdir -p $BACKUP_DIR

for VOLUME in "${VOLUMES[@]}"; do
  echo "Backing up $VOLUME..."
  docker run --rm \
    -v $VOLUME:/data \
    -v $(pwd)/$BACKUP_DIR:/backup \
    alpine \
    tar cvf /backup/$VOLUME.tar /data
done

echo "Backup complete. Files are in $BACKUP_DIR."
```

```sh title="restore-volumes.sh"
#!/bin/bash

VOLUMES=("livecodes-share-data")
BACKUP_DIR="./backups"

for VOLUME in "${VOLUMES[@]}"; do
  echo "Restoring $VOLUME..."
  docker volume create $VOLUME
  docker run --rm \
    -v $VOLUME:/data \
    -v $(pwd)/$BACKUP_DIR:/backup \
    alpine \
    tar xvf /backup/$VOLUME.tar -C /data --strip 1
done

echo "Restore complete."
```


</details>

## Deployment

For continuous deployment, you can use the included [GitHub Actions workflow](https://github.com/live-codes/livecodes/blob/develop/.github/workflows/docker-deploy.yml) to deploy to a VPS when a new commit is pushed (e.g. to the `main` branch).

This assumses that you have followed the [Getting Started](#getting-started) instructions and have cloned the repo to your VPS.

The workflow uses [secrets](https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions) and [variables](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables) from your GitHub repo settings for SSH access and setting required [environment variables](#environment-variables).