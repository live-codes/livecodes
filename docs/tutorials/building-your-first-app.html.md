import CodeBlock from '@theme/CodeBlock';
import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

export const colorGeneratorParams = {
  html: `<div class="container">
  <h1>Color Generator</h1>
  <div class="color-display" id="colorDisplay">
    <span id="colorCode">#3498db</span>
  </div>
  <button id="generateBtn">Generate Color</button>
  <p class="hint">Click the button to generate a random color!</p>
</div>
`,
  css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #3498db;
  transition: background 0.5s ease;
}

.container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
  margin: 0 0 30px 0;
  color: #333;
}

.color-display {
  background: #f0f0f0;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

#colorCode {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: #333;
}

#generateBtn {
  background: #333;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

#generateBtn:hover {
  transform: scale(1.05);
}

#generateBtn:active {
  transform: scale(0.95);
}

.hint {
  margin-top: 20px;
  color: #666;
  font-size: 0.9rem;
}
`,
  js: `const colorDisplay = document.getElementById('colorDisplay');
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateColor() {
  const newColor = getRandomColor();
  document.body.style.background = newColor;
  colorCode.textContent = newColor;
}

generateBtn.addEventListener('click', updateColor);

// Generate a color on page load
updateColor();
`,
};

# Building Your First App

Learn how to build a simple color generator app using LiveCodes. This app will let users click a button to generate random background colors.

Try the completed project below:

<RunInLiveCodes linkText="open it in a new tab" params={colorGeneratorParams}></RunInLiveCodes>.

<LiveCodes params={colorGeneratorParams}></LiveCodes>

## What We'll Build

A fun color generator with:
- Random color generation
- Display the color code
- Simple, clean interface

## Project Setup

1. Open [LiveCodes](https://livecodes.io)
2. We'll use HTML, CSS, and JavaScript

## Implementation

### HTML Structure

<CodeBlock language="html">{colorGeneratorParams.html}</CodeBlock>

### Styling

<CodeBlock language="css">{colorGeneratorParams.css}</CodeBlock>

### JavaScript Logic

<CodeBlock language="js">{colorGeneratorParams.js}</CodeBlock>

## How It Works

1. **HTML**: Creates a simple layout with a color display and button
2. **CSS**: Styles the interface and adds smooth transitions
3. **JavaScript**:
   - `getRandomColor()`: Generates a random hex color
   - `updateColor()`: Changes the background and displays the color code
   - Event listener: Triggers color change on button click

## Testing Your App

Try these features:
1. Click "Generate Color" multiple times
2. Watch the smooth color transitions
3. See the color code update
4. Notice the button hover and click effects

## Challenge: Enhance Your App

Try adding these features:
- Copy color code to clipboard when clicked
- Add a history of recent colors
- Let users save their favorite colors
- Add different color format options (RGB, HSL)

## Congratulations!

You've just built your color generator app with LiveCodes!

Compare your version with the completed project above. Did you add any personal touches?
<RunInLiveCodes linkText="View the completed project" params={colorGeneratorParams}></RunInLiveCodes>

## Next Steps

- [External Resources](../features/external-resources.html.md) - Add libraries like color manipulation tools
- [Getting Started Guide](./getting-started-guide.html.md) - Review the basics

## Complete Code Summary

**Concepts Covered**: DOM manipulation, events, random generation, CSS transitions

**Time to Build**: 10-15 minutes