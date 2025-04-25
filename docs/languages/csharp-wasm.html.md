# C# (Wasm)

C# is a high-level, general-purpose, object-oriented programming language developed by Microsoft.

In LiveCodes, C# runs in the browser using Blazor WebAssembly with a WebAssembly-based .NET runtime.

## Usage

Demo:


import LiveCodes from '../../src/components/LiveCodes.tsx';
export const csharpConfig = {
  activeEditor: 'script',
  script: {
    language: 'csharp-wasm',
    content: `using System;

public class Program
{
    public static void Main()
    {
        int[] sortedArray = { 1, 3, 5, 7, 9, 11, 13, 15 };
        int itemToSearch = 7;

        int result = BinarySearch(sortedArray, 0, sortedArray.Length - 1, itemToSearch);

        if (result == -1)
        {
            Console.WriteLine("Result: Item not found in the array.");
        }
        else
        {
            Console.WriteLine($"Result: Item found at index -> {result}");
        }
    }

    public static int BinarySearch(int[] arr, int left, int right, int item)
    {
        if (right >= left)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] == item)
            {
                return mid;
            }

            if (arr[mid] > item)
            {
                return BinarySearch(arr, left, mid - 1, item);
            }

            return BinarySearch(arr, mid + 1, right, item);
        }
        return -1;
    }
}`,
  },
  mode: 'simple',
  editor: 'auto',
  tools: {
    status: 'full',
  },
};

<LiveCodes config={csharpConfig}></LiveCodes>


### Communication with JavaScript

The C# code runs in the context of the result page. A few helper properties and methods are available in the browser global `livecodes.csharp` object:

- `livecodes.csharp.input`: The initial standard input passed to the C# code.
- `livecodes.csharp.loaded`: A promise that resolves when the C# environment (Blazor WebAssembly) is fully loaded. Other helpers should be used after this promise resolves.
- `livecodes.csharp.output`: The standard output from the C# code execution.
- `livecodes.csharp.run`: A function that runs the C# code with new input. This function takes a string as input and returns a promise that resolves with an object containing the `output`, `error`, and `exitCode` properties.

Example:


<LiveCodes template="csharp-wasm" params={{ activeEditor: 'markup' }} height="80vh"></LiveCodes>


## Language Info

### Name

`csharp-wasm`

### Aliases / Extensions

`cs`, `csharp`, `wasm.cs`, `cs-wasm`

### Editor

`script`

## Compiler

Blazor WebAssembly with .NET WebAssembly runtime.

### Version

.NET 9.0

## Code Formatting

using [Prettier](https://prettier.io/)

## Live Reload

By default, new code changes are sent to the result page for re-evaluation without a full page reload, avoiding the need to reinitialize the Blazor environment. This behavior can be disabled by adding the code comment `// __livecodes_reload__` to the C# code, which forces a full page reload.

This comment can be added in the `hiddenContent` property of the editor for embedded playgrounds.

## Example Usage

```csharp
using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Hello, LiveCodes C#!");
    }
}
```

## Starter Template

https://livecodes.io/?template=csharp-wasm

## Links

- [C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [Blazor WebAssembly](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)