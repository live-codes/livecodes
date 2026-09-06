---
name: livecodes/gh-action
description: >
  Use the "Preview in LiveCodes" GitHub Action to generate preview playground links 
  for pull request code changes. Automates playground creation and PR comments.
type: composition
library: livecodes
library_version: 0.13.0
requires: []
sources:
  - live-codes/preview-in-livecodes:README.md
  - live-codes/livecodes:docs/docs/gh-action.mdx
---

# LiveCodes — GitHub Action: Preview in LiveCodes

The [Preview in LiveCodes](https://github.com/live-codes/preview-in-livecodes) GitHub Action generates preview links to LiveCodes playgrounds for code changes in pull requests and posts them as PR comments.

**Use case:** Library authors can preview changes in the playground before merging PRs.

## How It Works

1. PR is created or updated
2. Action optionally installs dependencies and builds the project
3. Action scans `.livecodes/` folder for playground configurations
4. Generates playground URLs with your new code
5. Posts comment with preview links to the PR

## Setup

### Two Required Workflow Files

The action requires two workflow files that must be merged to the default branch first.

**1. Trigger workflow `.github/workflows/livecodes-preview.yml`:**

```yaml
name: livecodes

on: [pull_request]

jobs:
  build_and_prepare:
    runs-on: ubuntu-latest
    name: Generate Playgrounds
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Build and generate
        uses: live-codes/preview-in-livecodes@v1
        with:
          # Optional: install-command: "npm install"
          # Optional: build-command: "npm run build"
          # Optional: base-url: "https://{{LC::REF}}.my-project.pages.dev"
```

**2. Comment workflow `.github/workflows/livecodes-post-comment.yml`:**

```yaml
name: comment

on:
  workflow_run:
    workflows: ['livecodes']
    types:
      - completed

jobs:
  upload:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    if: >
      github.event.workflow_run.event == 'pull_request' &&
      github.event.workflow_run.conclusion == 'success'
    steps:
      - uses: live-codes/pr-comment-from-artifact@v1
        with:
          GITHUB_TOKEN: ${{ github.token }}
```

Two separate workflows are needed because each runs in a different security context. See [GitHub security article](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/) for details.

## Action Inputs

| Input             | Required | Description                                            |
| ----------------- | -------- | ------------------------------------------------------ |
| `install-command` | No       | Install command (e.g., `npm install`)                  |
| `build-command`   | No       | Build command (e.g., `npm run build`)                  |
| `base-url`        | No       | Base URL for deployed assets. Supports dynamic values. |
| `artifact`        | No       | Artifact name (default: `pr`)                          |
| `GITHUB_TOKEN`    | No       | GitHub token (default: `${{ github.token }}`)          |

## Action Outputs

| Output    | Description                                        |
| --------- | -------------------------------------------------- |
| `message` | Markdown message with preview links for PR comment |

## Configure Playgrounds

Create JSON files in `.livecodes/` folder. Each file becomes a playground link.

### Example Configure Project JSON

**`.livecodes/hello-world.json`:**

```json
{
  "title": "JavaScript Starter",
  "markup": {
    "language": "html",
    "content": "<h1>Hello, World!</h1>"
  },
  "script": {
    "language": "javascript",
    "content": "import { demo } from 'my-lib';\n\ndemo();"
  },
  "imports": {
    "my-lib": "{{LC::TO_DATA_URL(./index.js)}}"
  }
}
```

The `title` property becomes the playground name in the message. If omitted, filename is used.

## Dynamic Values

Use these placeholders in project JSON and `base-url`:

| Placeholder         | Description                    |
| ------------------- | ------------------------------ |
| `{{LC::REF}}`       | Branch or tag name of PR head  |
| `{{LC::SHA}}`       | Full commit SHA                |
| `{{LC::SHORT_SHA}}` | Short SHA (first 7 characters) |
| `{{LC::PR}}`        | Pull request number            |
| `{{LC::REPO}}`      | Repository name                |

### File Placeholders (project JSON only)

| Placeholder                      | Description                                  |
| -------------------------------- | -------------------------------------------- |
| `{{LC::TO_URL(./file.js)}}`      | URL of file with `base-url` prepended        |
| `{{LC::TO_DATA_URL(./file.js)}}` | File converted to data URL (for small files) |

## Using Newly Added Code in Playgrounds

Three strategies to make PR code available to playgrounds:

### 1. Deploy to Preview URL (Recommended)

Use Cloudflare Pages or Netlify for automatic preview deployments.

```yaml
# workflow
base-url: 'https://{{LC::REF}}.my-project.pages.dev'
```

In project JSON:

```json
{
  "imports": {
    "my-lib": "{{LC::TO_URL(./dist/index.js)}}"
  }
}
```

### 2. Use CDN Mirroring GitHub

Link to files via jsDelivr or similar:

```yaml
# workflow
base-url: 'https://cdn.jsdelivr.net/gh/{{LC::REPO}}@{{LC::SHA}}/'
```

### 3. Data URLs (Small Files Only)

Encode files directly. Stored at dpaste.com (limit: 1M chars, expires after 365 days).

```json
{
  "imports": {
    "my-lib": "{{LC::TO_DATA_URL(./index.js)}}"
  }
}
```

## Common Mistakes

### HIGH Workflow files not on default branch

The workflow files must be merged to the default branch (e.g., `main`) before the action can be triggered by PRs.

Wrong:

```yaml
# Creating PR with workflow files
# Action won't run until merged to default branch
```

Correct:

```bash
# First merge workflow files to default branch
git checkout main
git merge feature/add-gh-action
git push

# Now PRs can trigger the action
```

Source: GitHub Actions documentation on workflow_run event

### MEDIUM Missing permissions for PR comments

The comment workflow needs `pull-requests: write` permission.

```yaml
jobs:
  upload:
    permissions:
      pull-requests: write # Required!
```

### MEDIUM Using data URLs for large files

Data URLs are limited to ~1M characters at dpaste.com. Large builds will fail.

Wrong:

```json
{
  "imports": {
    "my-lib": "{{LC::TO_DATA_URL(./dist/bundle.js)}}" // Too large!
  }
}
```

Correct:

```yaml
# Use base-url and TO_URL for large files
base-url: 'https://{{LC::REF}}.my-project.pages.dev'
```

## Example PR Comment Output

```markdown
## Preview in LiveCodes

**Latest commit:** abc1234  
**Last updated:** Jan 15, 2024 3pm (UTC)

|   Playground   | Link                                                               |
| :------------: | ------------------------------------------------------------------ |
| **JavaScript** | [https://livecodes.io?x=code/...](https://livecodes.io?x=code/...) |
|   **React**    | [https://livecodes.io?x=code/...](https://livecodes.io?x=code/...) |

See [documentations](https://github.com/live-codes/preview-in-livecodes) for usage instructions.
```

## Related Skills

- **import-export** - Understanding project configuration objects
- **self-hosting** - Using custom `appUrl` for self-hosted playgrounds
