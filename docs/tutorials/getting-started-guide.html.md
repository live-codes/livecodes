import CodeBlock from '@theme/CodeBlock';
import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

export const gettingStartedParams = {
  html: `<div class="container">
  <h1 id="greeting">Hello, World!</h1>
  <input type="text" id="nameInput" placeholder="Enter your name">
  <button id="greetBtn">Greet Me!</button>
</div>
`,
  css: `.container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #007bff;
  font-size: 2.5rem;
}

input {
  padding: 10px;
  font-size: 1rem;
  margin: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
`,
  js: `const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const greetBtn = document.getElementById('greetBtn');

greetBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    greeting.textContent = \`Hello, \${name}!\`;
  } else {
    greeting.textContent = 'Hello, World!';
  }
});
`,
};

# Getting Started Guide

This guide will walk you through creating your first project in LiveCodes.

Try the completed project below:

<RunInLiveCodes linkText="open it in a new tab" params={gettingStartedParams}></RunInLiveCodes>.

<LiveCodes params={gettingStartedParams}></LiveCodes>

## Prerequisites

- A web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of HTML, CSS, and JavaScript

## Step 1: Open LiveCodes

1. Navigate to [livecodes.io](https://livecodes.io)
2. You'll see the editor interface with three panels:
   - **HTML**
   - **CSS**
   - **JavaScript**

## Step 2: Create a Simple Page

Let's create a simple interactive greeting card.

### HTML Panel

<CodeBlock language="html">{gettingStartedParams.html}</CodeBlock>

### CSS Panel

<CodeBlock language="css">{gettingStartedParams.css}</CodeBlock>

### JavaScript Panel

<CodeBlock language="js">{gettingStartedParams.js}</CodeBlock>

## Step 3: See Your Results

The result panel automatically updates as you type. Try:
- Entering your name in the input field
- Clicking the "Greet Me!" button
- Modifying the colors in the CSS

## Step 4: Save Your Project

1. Click on the "**Project**" menu button in the toolbar
2. Click "**Save**" to save the project (on this device)
3. You can open it later from "**Project menu > Open**"
4. Use "**Project menu > Share**" to get a permanent URL to your project that you can share

## Congratulations!

You've just built your first interactive app with LiveCodes!

Compare your version with the completed project above. Did you add any personal touches?

<RunInLiveCodes linkText="View the completed project" params={gettingStartedParams}></RunInLiveCodes>

## Next Steps

Now that you've created your first project, explore:
- [Building Your First App](building-your-first-app) - Create more complex applications
- [Features](../features/index.html.md) - Learn about all LiveCodes features
- [Templates](../features/templates.html.md) - Use pre-built templates
- [External Resources](../features/external-resources.html.md) - Add libraries to your projects

## Tips

- Use **Ctrl/Cmd + S** to manually save
- Press **Ctrl/Cmd + Alt + S** to open share panel
- Press **Ctrl/Cmd + K** to open the command menu
- Enable **Auto-save** in user settings for automatic saving