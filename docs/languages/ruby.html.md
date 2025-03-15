# Ruby

[Ruby](https://ruby-lang.org/) is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

LiveCodes runs Ruby in the browser using [Opal](https://opalrb.com/).

> Opal is a Ruby to JavaScript source-to-source compiler.
> It comes packed with the Ruby corelib you know and love.
> It is both fast as a runtime and small in its footprint.
>
> [opalrb.com](https://opalrb.com/)

:::info Note

LiveCodes also supports running Ruby using [ruby.wasm](https://github.com/ruby/ruby.wasm) which is a collection of WebAssembly ports of the official [CRuby](https://github.com/ruby/ruby). Read documentation [here](./ruby-wasm.html.md)

:::

## Usage

LiveCodes runs Ruby in the browser, including [corelib](https://opalrb.com/docs/api/v1.7.3/corelib/index.html) and the supported [stdlib](https://opalrb.com/docs/api/v1.7.3/stdlib/index.html).

JavaScript interoperability and DOM access is achieved using [`"Native"` module](https://opalrb.com/docs/api/v1.7.3/stdlib/Native). See the [starter template](#starter-template) for an example.

## Language Info

### Name

`ruby`

### Extension

`.rb`

### Editor

`script`

## Compiler

[Opal](https://opalrb.com/)

### Version

Opal v1.8.2

## Code Formatting

Not supported for Ruby.

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  ruby: `class User\n  attr_accessor :name\n\n  def initialize(name)\n    @name = name\n  end\n\n  def admin?\n    @name == 'Admin'\n  end\nend\n\nuser = User.new('Bob')\n\n# the output will go to the console\nputs user\nputs user.admin?\n`,
  console: 'full',
};

<LiveCodes params={params} height="80vh"></LiveCodes>

This example demonstrates stdlib usage, JavaScript interoperability and DOM access:

<LiveCodes template="ruby" height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=ruby

## Links

- [Ruby](https://ruby-lang.org/)
- [Ruby documentation](https://ruby-lang.org/en/documentation/)
- [Opal](https://opalrb.com/)
- [ruby.wasm](./ruby-wasm.html.md) in LiveCodes