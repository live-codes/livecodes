import type { StoryDef } from '../common';

const storyDef: StoryDef = {
  Introduction: {
    props: {
      config: {
        markup: {
          language: 'markdown',
          content: `
# 👋 Welcome to LiveCodes

> An open-source, **client-side** code playground that runs entirely in your browser.

---

### 📝 Markup

HTML, Markdown, Pug, and more

### 🎨 Styling

CSS, SCSS, Tailwind, and more

### ⚡ Logic

JS, TS, React, Vue, Python, PHP, and more

---

Supports [**90+ languages/frameworks**](https://livecodes.io/docs/languages)!

[App](https://livecodes.io) · [Docs](https://livecodes.io/docs/overview) · [SDK](https://livecodes.io/docs/sdk) · [GitHub](https://github.com/live-codes/livecodes)
`.trimStart(),
        },
        style: {
          language: 'css',
          content: `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  color: #1a1a2e;
  background: linear-gradient(135deg, #f0f4ff 0%, #fef6ff 100%);
  padding: 2rem;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

blockquote {
  border-left: 4px solid #667eea;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 0 8px 8px 0;
  font-size: 1.05rem;
  color: #444;
}

blockquote p {
  margin: 0;
}

hr {
  border: none;
  height: 1px;
  background: linear-gradient(to right, #667eea, #764ba2, transparent);
  margin: 1.5rem 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.18);
}

.card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.card p {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

p {
  margin: 0.75rem 0;
  line-height: 1.6;
}

a {
  color: #667eea;
  text-decoration: none;
}

a strong {
  color: #764ba2;
}

.links {
  text-align: center;
  margin: 1.5rem 0;
}

.links a {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  margin: 0.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.links a:hover {
  opacity: 0.88;
  transform: translateY(-2px);
}

#status {
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  margin-top: 1.5rem;
}
`.trimStart(),
        },
        script: {
          language: 'javascript',
          content: `
document.querySelectorAll("a").forEach((link) => {
  link.target = "_blank";
});

const headings = document.querySelectorAll("h3");
if (headings.length) {
  const grid = document.createElement("div");
  grid.className = "features";

  headings.forEach((h3) => {
    const p = h3.nextElementSibling;
    const card = document.createElement("div");
    card.className = "card";
    h3.parentNode.insertBefore(card, h3);
    card.appendChild(h3);
    if (p && p.tagName === "P") {
      card.appendChild(p);
    }
    grid.appendChild(card);
  });

  const secondHr = document.querySelectorAll("hr")[1];
  if (secondHr) {
    secondHr.parentNode.insertBefore(grid, secondHr);
  }
}

const paragraphs = document.querySelectorAll("p");
const lastP = paragraphs[paragraphs.length - 1];
if (lastP && lastP.querySelectorAll("a").length >= 3) {
  lastP.className = "links";
}

document.querySelectorAll(".card").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  setTimeout(() => {
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 200 + i * 150);
});

const status = document.createElement("p");
status.id = "status";
status.textContent = \`✨ Rendered client-side at \${new Date().toLocaleTimeString()}\`;
document.body.appendChild(status);

console.log("🚀 LiveCodes is ready!");
`.trimStart(),
        },
      },
      height: '80vh',
    },
  },
  Default: { props: {} },
  ReactTemplate: {
    props: {
      template: 'react',
    },
  },
  SimpleMode: {
    props: {
      config: {
        mode: 'simple',
        activeEditor: 'script',
        script: {
          language: 'vue',
          content: `<script setup lang="tsx">
  import { ref } from 'vue';

  interface Props {
    name?: string
  }
  const props = defineProps<Props>();
  const count = ref(0);
  const align = 'center';

  // define inline component
  function Greeting(props: Props) {
    return <h1>Hello, { props.name || 'World' }!</h1>
  }
</script>

<template>
  <div class="container">
    <Greeting :name="props.name" />
    <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/vue.svg" />
    <p>You clicked {{ count }} times.</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`,
        },
      },
    },
  },
  Theme: {
    props: {
      config: {
        theme: 'light',
        themeColor: '#F63C00',
        activeEditor: 'script',
        markup: { language: 'html', hideTitle: true },
        style: { language: 'css', hideTitle: true },
        script: {
          title: 'App.svelte',
          language: 'svelte',
          content: `<script>
  let { title = "World" } = $props();
  let counter = $state(0);
  function increment() {
    counter += 1;
  }
</script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/svelte.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click={increment}>Click me</button>
</div>
`,
        },
      },
      height: '450',
    },
  },
};

export default storyDef;
