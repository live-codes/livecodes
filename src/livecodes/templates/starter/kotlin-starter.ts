import type { Template } from '../../models';

export const kotlinStarter: Template = {
  name: 'kotlin',
  title: window.deps.translateString('templates.starter.kotlin', 'Kotlin Starter'),
  thumbnail: 'assets/templates/kotlin.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/kotlin.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'kotlin',
    content: `
import kotlinx.browser.document

fun main() {
    var count = 0

    fun render() {
        document.getElementById("name")?.textContent = "Kotlin"
        document.getElementById("counter")?.textContent = count.toString()
    }

    document.getElementById("counter-button")?.addEventListener("click", {
        count += 1
        render()
    })
    render()

    println("Hello from Kotlin!")
}
`.trimStart(),
  },
};
