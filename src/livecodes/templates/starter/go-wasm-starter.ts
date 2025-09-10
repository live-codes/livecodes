import type { Template } from '../../models';

export const goWasmStarter: Template = {
  name: 'go-wasm',
  title: 'Go (Wasm) Starter',
  thumbnail: 'assets/templates/go.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Go WebAssembly Demo</h1>
  <img class="logo" alt="Go logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />
  
  <div class="demo-section">
    <h2>Interactive Counter</h2>
    <p>Current count: <span id="counter">0</span></p>
    <button id="increment-btn" disabled>Loading...</button>
  </div>

  <div class="demo-section">
    <h2>Stdin Input Demo</h2>
    <p>Enter your name:</p>
    <input type="text" id="name-input" placeholder="Your name" />
    <button id="greet-btn" disabled>Loading...</button>
    <p id="greeting"></p>
  </div>


</div>

<script>
  addEventListener('load', async () => {
    // Wait for Go WASM to load
    await livecodes.goWasm.loaded;

    const incrementBtn = document.querySelector("#increment-btn");
    const greetBtn = document.querySelector("#greet-btn");

    // Enable buttons and update text
    incrementBtn.disabled = false;
    incrementBtn.textContent = "Increment";
    greetBtn.disabled = false;
    greetBtn.textContent = "Greet";

    // Counter demo
    incrementBtn.onclick = async () => {
      const currentCount = parseInt(document.querySelector("#counter").textContent);
      
      const {output, error} = await livecodes.goWasm.run(currentCount.toString());
      if (error) {
        console.error('Error:', error);
      } else {
        document.querySelector("#counter").textContent = output.trim();
      }
    };

    // Greeting demo
    greetBtn.onclick = async () => {
      const name = document.querySelector("#name-input").value;
      if (!name) {
        alert('Please enter your name');
        return;
      }
      
      const {output, error} = await livecodes.goWasm.run(name);
      if (error) {
        console.error('Error:', error);
      } else {
        document.querySelector("#greeting").textContent = output.trim();
      }
    };

  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.logo {
  width: 150px;
  display: block;
  margin: 20px auto;
}

.demo-section {
  background: #f5f5f5;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border-left: 4px solid #00add8;
}

.demo-section h2 {
  margin-top: 0;
  color: #333;
}

button {
  background: #00add8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 5px;
}

button:hover:not(:disabled) {
  background: #0099c7;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

input[type="text"], input[type="number"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin: 5px;
  width: 200px;
}

#counter {
  font-weight: bold;
  color: #00add8;
  font-size: 24px;
}

#greeting, #result {
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}
`.trimStart(),
  },
  script: {
    language: 'go-wasm',
    content: `
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    // Read input from stdin
    scanner := bufio.NewScanner(os.Stdin)
    
    if scanner.Scan() {
        input := strings.TrimSpace(scanner.Text())
        
        // Try to parse as number (for counter demo)
        if count, err := strconv.Atoi(input); err == nil {
            // Counter demo - increment and return the new number
            newCount := count + 1
            fmt.Println(newCount)
            return
        }
        
       
        
        // Greeting demo - treat as name
        fmt.Printf("Hello, %s! Welcome to Go WebAssembly!\\n", input)
        fmt.Println("This is running in your browser using Go compiled to WebAssembly.")
    } else {
        // No input provided
        fmt.Println("Hello from Go WebAssembly!")
        fmt.Println("This program demonstrates stdin handling in Go WASM.")
    }
}
`.trimStart(),
  },
};
