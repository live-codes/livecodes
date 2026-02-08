# Astro

Astro is a modern static site builder focused on delivering fast, content-driven websites. It uses a “zero JavaScript by default” approach and supports multiple frameworks like React, Vue, and Svelte through an islands architecture.

## Usage

There are **two primary modes** for building and rendering Astro pages:

### Static (Default)

In this mode, pages are fully pre-rendered at build time.
All data must be available during the build process and can be supplied through **frontmatter**, **data fetching functions**, or **integrations**.

**Example:** Provide data to a page using frontmatter.

```astro
---
const name = "LiveCodes";
---
<h1>Hello {name}!</h1>
```

---

### Dynamic

To enable runtime rendering, configure the page as a server-rendered route or use an Astro server adapter (e.g., Node, Deno, or Vercel).

In this mode, values can be provided dynamically during request handling.

**Example:** Create a server-side API endpoint:

```js
export async function GET() {
  return new Response(JSON.stringify({ name: 'LiveCodes' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Then fetch and render it dynamically in Astro:

```astro
---
const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
const data = await res.json();
---
<h1>Hello {data.name}!</h1>
```

---

## Language Info

### Name

`astro`

### Extension

`astro`

## Editor

`markup`

## Compiler

Astro compiler

### Version

`@astrojs/compiler`: `v2.2.8`

## Code Formatting

Using [Prettier](https://prettier.io/).

---

## Example Usage

### Static Example

```astro
---
const message = "Hello from Astro!";
---
<p>{message}</p>
```

### Dynamic Example

```astro
---
const res = await fetch('https://api.example.com/data');
const data = await res.json();
---
<p>{data.title}</p>
```

## Links

- [Astro Documentation](https://docs.astro.build)
- [Astro Starter Template](https://livecodes.io/?template=astro)