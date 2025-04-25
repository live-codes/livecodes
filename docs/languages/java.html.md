# Java

Java is a high-level, general-purpose, memory-safe, object-oriented programming language.

In LiveCodes, Java runs in the browser using [DoppioJVM](https://github.com/plasma-umass/doppio).

## Usage

Demo:

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const javaConfig = {
  activeEditor: 'script',
  script: {
    language: 'java',
    content: `public class BinarySearchSnippet {
  /**
   * Search an item with binarySearch algorithm.
   *
   * @param arr sorted array to search
   * @param item an item to search
   * @return if item is found, return the index position of the array item otherwise return -1
   */

  public static int binarySearch(int[] arr, int left, int right, int item) {
    if (right >= left) {
      int mid = left + (right - left) / 2;
      if (arr[mid] == item) {
        return mid;
      }

      if (arr[mid] > item) {
        return binarySearch(arr, left, mid - 1, item);
      }

      return binarySearch(arr, mid + 1, right, item);
    }
    return -1;
  }

  public static void main(String[] args) {
    int[] sortedArray = {1, 3, 5, 7, 9, 11, 13, 15};
    int itemToSearch = 7;

    int result = binarySearch(sortedArray, 0, sortedArray.length - 1, itemToSearch);

    if (result == -1) {
      System.out.println("Result: Item not found in the array.");
    } else {
      System.out.println("Result: Item found at index -> " + result);
    }
  }
}
`,
  },
  mode: 'simple',
  editor: 'auto',
  tools: {
    status: 'full',
},
};

<LiveCodes config={javaConfig}></LiveCodes>

### Communication with JavaScript

The Java code runs in the context of the [result page](../features/result.html.md).
A few helper properties and methods are available in the browser global `livecodes.java` object:

- `livecodes.java.input`: the initial standard input that is passed to the Java code.
- `livecodes.java.loaded`: A promise that resolves when the Java environment is loaded. Any other helpers should be used after this promise resolves.
- `livecodes.java.output`: the standard output.
- `livecodes.java.error`: the standard error.
- `livecodes.java.exitCode`: the exit code.
- `livecodes.java.run`: a function that runs the Java code with new input. This function takes a string as input and returns a promise that resolves when the Java code is done running. The promise resolves with an object containing the `input`, `output`, `error`, and `exitCode` properties.

Example:

<LiveCodes template="java" params={{ activeEditor: 'markup' }} height="80vh"></LiveCodes>

## Language Info

### Name

`java`

### Extension

`.java`

### Editor

`script`

## Compiler

[DoppioJVM](https://github.com/plasma-umass/doppio)

### Version

`DoppioJVM`: v0.5.0, which runs Java 8 JDK.

## Code Formatting

Using [Prettier](https://prettier.io) with the [Prettier Java plugin](https://github.com/jhipster/prettier-java).

## Live Reload

By default, new code changes are sent to the result page for re-evaluation without a full page reload, to avoid the need to reload the Java environment.

This behavior can be disabled by adding the code comment `// __livecodes_reload__` to the code, which will force a full page reload.
This comment can be added in the [`hiddenContent` property of the editor](../configuration/configuration-object.html.md)#markup) for embedded playgrounds.

## Starter Template

https://livecodes.io/?template=java

## Links

- [Java](https://www.java.com/)
- [DoppioJVM](https://github.com/plasma-umass/doppio)