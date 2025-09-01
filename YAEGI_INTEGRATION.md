# Yaegi WebAssembly Integration

This document describes the integration of Yaegi (Go interpreter) compiled to WebAssembly into LiveCodes.

## Overview

Yaegi is a Go interpreter that can be compiled to WebAssembly, allowing Go code to run directly in the browser. This integration provides a new language option in LiveCodes called "Go (Wasm)" that uses Yaegi to execute Go code.

## Files Added/Modified

### New Files

- `src/livecodes/languages/go-wasm/lang-go-wasm.ts` - Language specification
- `src/livecodes/languages/go-wasm/lang-go-wasm-script.ts` - WebAssembly implementation
- `src/livecodes/languages/go-wasm/index.ts` - Module exports

### Modified Files

- `src/livecodes/vendors.ts` - Added `yaegiWasmBaseUrl`
- `src/livecodes/languages/languages.ts` - Registered the new language
- `src/sdk/models.ts` - Added language types and script type
- `scripts/build.js` - Added script to build process
- `e2e/specs/compilers.spec.ts` - Added test case

## Configuration

The integration uses the following CDN URLs:

- WASM file: `https://cdn.jsdelivr.net/npm/yaegi-wasm@1.0.1/src/yaegi-browser.wasm`
- Support script: `https://cdn.jsdelivr.net/npm/yaegi-wasm@1.0.1/src/wasm_exec.js`

## Usage

### In LiveCodes Editor

1. Select "Go (Wasm)" from the language dropdown
2. Write Go code in the editor
3. The code will be executed using Yaegi WebAssembly

### Example Go Code

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Yaegi!")

    // Simple calculations
    x := 10
    y := 20
    fmt.Printf("Sum: %d\n", x+y)

    // Loops
    for i := 0; i < 5; i++ {
        fmt.Printf("Count: %d\n", i)
    }
}
```

### Supported File Extensions

- `.wasm.go`
- `.yaegi`
- `.go-wasm`
- `.gowasm`
- `.goyae`

## Implementation Details

### WebAssembly Worker

The implementation uses a Web Worker to load and execute Yaegi WebAssembly code. The worker:

1. Loads the Go WebAssembly support script (`wasm_exec.js`)
2. Initializes Yaegi by loading the WASM file
3. Executes Go code and captures output

### Code Execution

The Go code is executed in a WebAssembly environment that provides:

- Standard Go runtime features
- Console output capture
- Input/output redirection

## Testing

A test case has been added to `e2e/specs/compilers.spec.ts` that verifies:

- The language is available in the UI
- Go code can be written and executed
- Output is correctly displayed

## Limitations

1. **Standard Library**: Not all Go standard library packages may be available in the WebAssembly version.

2. **Performance**: WebAssembly execution may be slower than native Go execution.

## Future Improvements

1. **Better Error Handling**: Implement error messages and debugging capabilities.

## Troubleshooting

### Common Issues

1. **Yaegi not loading**: Check that the CDN URLs are accessible and the WASM file is properly loaded.

2. **Output not appearing**: Check the browser console for any JavaScript errors.

### Debug Mode

Enable browser developer tools to see detailed error messages and debug the WebAssembly execution.

## Contributing

To improve this integration:

1. Test with various Go code examples
2. Report issues with specific Go features
3. Contribute improvements to error handling
4. Add support for additional Go packages
