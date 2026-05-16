// AUTO-GENERATED — do not edit

/* eslint-disable */
import { defaultMeta, livecodesStory, type LiveCodes, type Meta } from '#src';

export default {
  ...defaultMeta,
  title: 'Basic',
} satisfies Meta<typeof LiveCodes>;

export const Introduction = livecodesStory({
  config: {
    markup: {
      language: 'markdown',
      content:
        '# 👋 Welcome to LiveCodes\n\n> An open-source, **client-side** code playground that runs entirely in your browser.\n\n---\n\n### 📝 Markup\n\nHTML, Markdown, Pug, and more\n\n### 🎨 Styling\n\nCSS, SCSS, Tailwind, and more\n\n### ⚡ Logic\n\nJS, TS, React, Vue, Python, PHP, and more\n\n---\n\nSupports [**90+ languages/frameworks**](https://livecodes.io/docs/languages)!\n\n[App](https://livecodes.io) · [Docs](https://livecodes.io/docs/overview) · [SDK](https://livecodes.io/docs/sdk) · [GitHub](https://github.com/live-codes/livecodes)\n',
    },
    style: {
      language: 'css',
      content:
        '* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;\n  color: #1a1a2e;\n  background: linear-gradient(135deg, #f0f4ff 0%, #fef6ff 100%);\n  padding: 2rem;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 2rem;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin-bottom: 0.5rem;\n}\n\nblockquote {\n  border-left: 4px solid #667eea;\n  padding: 0.75rem 1rem;\n  margin: 1rem 0;\n  background: rgba(102, 126, 234, 0.08);\n  border-radius: 0 8px 8px 0;\n  font-size: 1.05rem;\n  color: #444;\n}\n\nblockquote p {\n  margin: 0;\n}\n\nhr {\n  border: none;\n  height: 1px;\n  background: linear-gradient(to right, #667eea, #764ba2, transparent);\n  margin: 1.5rem 0;\n}\n\n.features {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n  margin: 1.5rem 0;\n}\n\n.card {\n  background: white;\n  border-radius: 12px;\n  padding: 1.25rem;\n  text-align: center;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);\n  border: 1px solid rgba(102, 126, 234, 0.15);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  cursor: default;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.18);\n}\n\n.card h3 {\n  font-size: 1.1rem;\n  margin-bottom: 0.25rem;\n}\n\n.card p {\n  font-size: 0.85rem;\n  color: #666;\n  margin: 0;\n}\n\np {\n  margin: 0.75rem 0;\n  line-height: 1.6;\n}\n\na {\n  color: #667eea;\n  text-decoration: none;\n}\n\na strong {\n  color: #764ba2;\n}\n\n.links {\n  text-align: center;\n  margin: 1.5rem 0;\n}\n\n.links a {\n  display: inline-block;\n  padding: 0.5rem 1.25rem;\n  margin: 0.25rem;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n\n.links a:hover {\n  opacity: 0.88;\n  transform: translateY(-2px);\n}\n\n#status {\n  text-align: center;\n  font-size: 0.85rem;\n  color: #999;\n  margin-top: 1.5rem;\n}\n',
    },
    script: {
      language: 'javascript',
      content:
        'document.querySelectorAll("a").forEach((link) => {\n  link.target = "_blank";\n});\n\nconst headings = document.querySelectorAll("h3");\nif (headings.length) {\n  const grid = document.createElement("div");\n  grid.className = "features";\n\n  headings.forEach((h3) => {\n    const p = h3.nextElementSibling;\n    const card = document.createElement("div");\n    card.className = "card";\n    h3.parentNode.insertBefore(card, h3);\n    card.appendChild(h3);\n    if (p && p.tagName === "P") {\n      card.appendChild(p);\n    }\n    grid.appendChild(card);\n  });\n\n  const secondHr = document.querySelectorAll("hr")[1];\n  if (secondHr) {\n    secondHr.parentNode.insertBefore(grid, secondHr);\n  }\n}\n\nconst paragraphs = document.querySelectorAll("p");\nconst lastP = paragraphs[paragraphs.length - 1];\nif (lastP && lastP.querySelectorAll("a").length >= 3) {\n  lastP.className = "links";\n}\n\ndocument.querySelectorAll(".card").forEach((card, i) => {\n  card.style.opacity = "0";\n  card.style.transform = "translateY(20px)";\n  setTimeout(() => {\n    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";\n    card.style.opacity = "1";\n    card.style.transform = "translateY(0)";\n  }, 200 + i * 150);\n});\n\nconst status = document.createElement("p");\nstatus.id = "status";\nstatus.textContent = `✨ Rendered client-side at ${new Date().toLocaleTimeString()}`;\ndocument.body.appendChild(status);\n\nconsole.log("🚀 LiveCodes is ready!");\n',
    },
  },
  height: '80vh',
});
export const Default = livecodesStory({});
export const ReactTemplate = livecodesStory({ template: 'react' });
export const SimpleMode = livecodesStory({
  config: {
    mode: 'simple',
    activeEditor: 'script',
    script: {
      language: 'vue',
      content:
        '<script setup lang="tsx">\n  import { ref } from \'vue\';\n\n  interface Props {\n    name?: string\n  }\n  const props = defineProps<Props>();\n  const count = ref(0);\n  const align = \'center\';\n\n  // define inline component\n  function Greeting(props: Props) {\n    return <h1>Hello, { props.name || \'World\' }!</h1>\n  }\n</script>\n\n<template>\n  <div class="container">\n    <Greeting :name="props.name" />\n    <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/vue.svg" />\n    <p>You clicked {{ count }} times.</p>\n    <button @click="count++">Click me</button>\n  </div>\n</template>\n\n<style scoped>\n  .container,\n  .container button {\n    text-align: v-bind("align");\n    font: 1em sans-serif;\n  }\n  .logo {\n    width: 150px;\n  }\n</style>\n',
    },
  },
});
export const Theme = livecodesStory({
  config: {
    theme: 'light',
    themeColor: '#F63C00',
    activeEditor: 'script',
    markup: { language: 'html', hideTitle: true },
    style: { language: 'css', hideTitle: true },
    script: {
      title: 'App.svelte',
      language: 'svelte',
      content:
        '<script>\n  let { title = "World" } = $props();\n  let counter = $state(0);\n  function increment() {\n    counter += 1;\n  }\n</script>\n\n<style>\n  .container,\n  .container button {\n    text-align: center;\n    font: 1em sans-serif;\n  }\n  .logo {\n    width: 150px;\n  }\n</style>\n\n<div class="container">\n  <h1>Hello, {title}!</h1>\n  <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/svelte.svg" />\n  <p>You clicked {counter} times.</p>\n  <button on:click={increment}>Click me</button>\n</div>\n',
    },
  },
  height: '450',
});
