# Ruby (Wasm)

[Ruby](https://ruby-lang.org/) is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

LiveCodes uses [ruby.wasm](https://github.com/ruby/ruby.wasm) to run Ruby in the browser.

> ruby.wasm is a collection of [WebAssembly](https://webassembly.org/) ports of the [CRuby](https://github.com/ruby/ruby). It enables running Ruby application on browsers, WASI compatible WebAssembly runtimes, and Edge Computing platforms.
>
> [ruby.github.io/ruby.wasm/](https://ruby.github.io/ruby.wasm/)

:::info Note

LiveCodes also supports running Ruby using [Opal](https://opalrb.com/) which is a Ruby to JavaScript source-to-source compiler. Read documentation [here](./ruby.html.md).

:::

## Usage

LiveCodes runs Ruby in the browser, including the stdlib.

JavaScript interoperability and DOM access is achieved using [`"JS"` module](https://ruby.github.io/ruby.wasm/JS.html). See the [starter template](#starter-template) for an example.

## Language Info

### Name

`ruby-wasm`

### Extension

`.wasm.rb`

### Alias

`rubywasm`

### Editor

`script`

## Compiler

[ruby.wasm](https://github.com/ruby/ruby.wasm)

### Version

ruby.wasm v2.7.2, running Ruby v3.4

## Code Formatting

Not supported for Ruby.

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  'ruby-wasm': `class User\n  attr_accessor :name\n\n  def initialize(name)\n    @name = name\n  end\n\n  def admin?\n    @name == 'Admin'\n  end\nend\n\nuser = User.new('Bob')\n\n# the output will go to the console\nputs user\nputs user.admin?\n`,
  console: 'full',
};

<LiveCodes params={params} height="80vh"></LiveCodes>

This example demonstrates stdlib usage, JavaScript interoperability and DOM access:

<LiveCodes template="ruby-wasm" height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=ruby-wasm

## Links

- [Ruby](https://ruby-lang.org/)
- [Ruby documentation](https://ruby-lang.org/en/documentation/)
- [ruby.wasm](https://github.com/ruby/ruby.wasm)
- [Ruby using Opal](./ruby.html.md) in LiveCodes