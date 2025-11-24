// from https://github.com/trueadm/ripple/blob/main/packages/ripple-vscode-plugin/syntaxes/ripple.tmLanguage.json
// and https://github.com/trueadm/ripple/blob/main/packages/ripple-vscode-plugin/language-configuration.json
// and 'https://cdn.jsdelivr.net/gh/zikaari/monaco-textmate-languages@master/grammars/css/css.tmLanguage.json'
// Config onEnterRules cause errors - currently disabled

export default {
  syntax: {
    information_for_contributors: [
      'This file has been converted from https://github.com/microsoft/TypeScript-TmLanguage/blob/master/TypeScriptReact.tmLanguage',
      'If you want to provide a fix or improvement, please create a pull request against the original repository.',
      'Once accepted there, we are happy to receive an update request.',
    ],
    version:
      'https://github.com/microsoft/TypeScript-TmLanguage/commit/48f608692aa6d6ad7bd65b478187906c798234a8',
    name: 'Ripple',
    scopeName: 'source.ripple',
    patterns: [
      {
        include: '#directives',
      },
      {
        include: '#statements',
      },
      {
        include: '#shebang',
      },
    ],
    repository: {
      shebang: {
        name: 'comment.line.shebang.js',
        match: '\\A(#!).*(?=$)',
        captures: {
          '1': {
            name: 'punctuation.definition.comment.js',
          },
        },
      },
      statements: {
        patterns: [
          {
            include: '#declaration',
          },
          {
            include: '#control-statement',
          },
          {
            include: '#after-operator-block-as-object-literal',
          },
          {
            include: '#decl-block',
          },
          {
            include: '#label',
          },
          {
            include: '#expression',
          },
          {
            include: '#punctuation-semicolon',
          },
          {
            include: '#string',
          },
          {
            include: '#comment',
          },
        ],
      },
      'component-statements': {
        patterns: [
          {
            include: '#jsx',
          },
          {
            include: '#declaration',
          },
          {
            include: '#component-control-statement',
          },
          {
            include: '#component-decl-block',
          },
          {
            include: '#label',
          },
          {
            include: '#expression',
          },
          {
            include: '#punctuation-semicolon',
          },
          {
            include: '#string',
          },
          {
            include: '#comment',
          },
        ],
      },
      declaration: {
        patterns: [
          {
            include: '#decorator',
          },
          {
            include: '#var-expr',
          },
          {
            include: '#server-block',
          },
          {
            include: '#component-declaration',
          },
          {
            include: '#fragment-declaration',
          },
          {
            include: '#function-declaration',
          },
          {
            include: '#class-declaration',
          },
          {
            include: '#interface-declaration',
          },
          {
            include: '#enum-declaration',
          },
          {
            include: '#namespace-declaration',
          },
          {
            include: '#type-alias-declaration',
          },
          {
            include: '#import-equals-declaration',
          },
          {
            include: '#import-declaration',
          },
          {
            include: '#export-declaration',
          },
          {
            name: 'storage.modifier.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(declare|export)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      'control-statement': {
        patterns: [
          {
            include: '#switch-statement',
          },
          {
            include: '#for-loop',
          },
          {
            name: 'keyword.control.trycatch.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(catch|finally|throw|try)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|goto)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            captures: {
              '1': {
                name: 'keyword.control.loop.js',
              },
              '2': {
                name: 'entity.name.label.js',
              },
            },
          },
          {
            name: 'keyword.control.loop.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|do|goto|while)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            beginCaptures: {
              '0': {
                name: 'keyword.control.flow.js',
              },
            },
            end: '(?=[;}]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'keyword.control.switch.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default|switch)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            include: '#if-statement',
          },
          {
            name: 'keyword.control.conditional.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.control.with.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(with)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.control.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(package)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.other.debugger.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(debugger)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      'component-control-statement': {
        patterns: [
          {
            include: '#component-switch-statement',
          },
          {
            include: '#for-loop',
          },
          {
            name: 'keyword.control.trycatch.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(catch|finally|pending|throw|try)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|goto)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            captures: {
              '1': {
                name: 'keyword.control.loop.js',
              },
              '2': {
                name: 'entity.name.label.js',
              },
            },
          },
          {
            name: 'keyword.control.loop.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|do|goto|while)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            beginCaptures: {
              '0': {
                name: 'keyword.control.flow.js',
              },
            },
            end: '(?=[;}]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'keyword.control.switch.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default|switch)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            include: '#component-if-statement',
          },
          {
            name: 'keyword.control.conditional.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.control.with.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(with)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.control.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(package)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.other.debugger.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(debugger)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      label: {
        patterns: [
          {
            begin: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)(?=\\s*\\{)',
            beginCaptures: {
              '1': {
                name: 'entity.name.label.js',
              },
              '2': {
                name: 'punctuation.separator.label.js',
              },
            },
            end: '(?<=\\})',
            patterns: [
              {
                include: '#decl-block',
              },
            ],
          },
          {
            match: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)',
            captures: {
              '1': {
                name: 'entity.name.label.js',
              },
              '2': {
                name: 'punctuation.separator.label.js',
              },
            },
          },
        ],
      },
      expression: {
        patterns: [
          {
            name: 'meta.identifier.tracked.js',
            match: '(@)([_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'punctuation.section.embedded.begin.js',
              },
              '2': {
                name: 'variable.other.js',
              },
            },
          },
          {
            include: '#server-member-expression',
          },
          {
            include: '#jsx-ref-modifier',
          },
          {
            include: '#expressionWithoutIdentifiers',
          },
          {
            include: '#identifiers',
          },
          {
            include: '#expressionPunctuations',
          },
        ],
      },
      expressionWithoutIdentifiers: {
        patterns: [
          {
            include: '#string',
          },
          {
            include: '#regex',
          },
          {
            include: '#comment',
          },
          {
            include: '#function-expression',
          },
          {
            include: '#eval-expression',
          },
          {
            include: '#class-expression',
          },
          {
            include: '#arrow-function',
          },
          {
            include: '#paren-expression-possibly-arrow',
          },
          {
            include: '#cast',
          },
          {
            include: '#ternary-expression',
          },
          {
            include: '#new-expr',
          },
          {
            include: '#instanceof-expr',
          },
          {
            include: '#object-literal',
          },
          {
            include: '#tuple-literal',
          },
          {
            include: '#record-literal',
          },
          {
            include: '#expression-operators',
          },
          {
            include: '#function-call',
          },
          {
            include: '#literal',
          },
          {
            include: '#support-objects',
          },
          {
            include: '#paren-expression',
          },
        ],
      },
      expressionPunctuations: {
        patterns: [
          {
            include: '#punctuation-comma',
          },
          {
            include: '#punctuation-accessor',
          },
        ],
      },
      decorator: {
        patterns: [
          {
            name: 'meta.identifier.tracked.js',
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(@)([_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'punctuation.section.embedded.begin.js',
              },
              '2': {
                name: 'variable.other.js',
              },
            },
          },
          {
            name: 'meta.decorator.js',
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\@(?![_$[:alpha:]])',
            beginCaptures: {
              '0': {
                name: 'punctuation.decorator.js',
              },
            },
            end: '(?=\\s)',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
        ],
      },
      'var-expr': {
        patterns: [
          {
            name: 'meta.var.expr.js',
            begin:
              '(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))',
            end: '(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=^|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?=\\s*$))',
            patterns: [
              {
                begin:
                  '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.export.js',
                  },
                  '2': {
                    name: 'storage.modifier.js',
                  },
                  '3': {
                    name: 'storage.type.js',
                  },
                },
                end: '(?=\\S)',
              },
              {
                include: '#destructuring-variable',
              },
              {
                include: '#var-single-variable',
              },
              {
                include: '#variable-initializer',
              },
              {
                include: '#comment',
              },
              {
                begin: '(,)\\s*(?=$|\\/\\/)',
                beginCaptures: {
                  '1': {
                    name: 'punctuation.separator.comma.js',
                  },
                },
                end: '(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))',
                patterns: [
                  {
                    include: '#single-line-comment-consuming-line-ending',
                  },
                  {
                    include: '#comment',
                  },
                  {
                    include: '#destructuring-variable',
                  },
                  {
                    include: '#var-single-variable',
                  },
                  {
                    include: '#punctuation-comma',
                  },
                ],
              },
              {
                include: '#punctuation-comma',
              },
            ],
          },
          {
            name: 'meta.var.expr.js',
            begin:
              '(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'storage.type.js',
              },
            },
            end: '(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=^|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?=\\s*$))',
            patterns: [
              {
                begin:
                  '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.export.js',
                  },
                  '2': {
                    name: 'storage.modifier.js',
                  },
                  '3': {
                    name: 'storage.type.js',
                  },
                },
                end: '(?=\\S)',
              },
              {
                include: '#destructuring-const',
              },
              {
                include: '#var-single-const',
              },
              {
                include: '#variable-initializer',
              },
              {
                include: '#comment',
              },
              {
                begin: '(,)\\s*(?=$|\\/\\/)',
                beginCaptures: {
                  '1': {
                    name: 'punctuation.separator.comma.js',
                  },
                },
                end: '(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))',
                patterns: [
                  {
                    include: '#single-line-comment-consuming-line-ending',
                  },
                  {
                    include: '#comment',
                  },
                  {
                    include: '#destructuring-const',
                  },
                  {
                    include: '#var-single-const',
                  },
                  {
                    include: '#punctuation-comma',
                  },
                ],
              },
              {
                include: '#punctuation-comma',
              },
            ],
          },
          {
            name: 'meta.var.expr.js',
            begin:
              '(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'storage.type.js',
              },
            },
            end: '(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?=\\s*$))',
            patterns: [
              {
                begin:
                  '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.export.js',
                  },
                  '2': {
                    name: 'storage.modifier.js',
                  },
                  '3': {
                    name: 'storage.type.js',
                  },
                },
                end: '(?=\\S)',
              },
              {
                include: '#var-single-const',
              },
              {
                include: '#variable-initializer',
              },
              {
                include: '#comment',
              },
              {
                begin: '(,)\\s*((?!\\S)|(?=\\/\\/))',
                beginCaptures: {
                  '1': {
                    name: 'punctuation.separator.comma.js',
                  },
                },
                end: '(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))',
                patterns: [
                  {
                    include: '#single-line-comment-consuming-line-ending',
                  },
                  {
                    include: '#comment',
                  },
                  {
                    include: '#var-single-const',
                  },
                  {
                    include: '#punctuation-comma',
                  },
                ],
              },
              {
                include: '#punctuation-comma',
              },
            ],
          },
        ],
      },
      'var-single-variable': {
        patterns: [
          {
            name: 'meta.var-single-variable.expr.js',
            begin:
              '(?x)([_$[:alpha:]][_$[:alnum:]]*)(\\!)?(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            beginCaptures: {
              '1': {
                name: 'meta.definition.variable.js entity.name.function.js',
              },
              '2': {
                name: 'keyword.operator.definiteassignment.js',
              },
            },
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            patterns: [
              {
                include: '#var-single-variable-type-annotation',
              },
            ],
          },
          {
            name: 'meta.var-single-variable.expr.js',
            begin: '([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])(\\!)?',
            beginCaptures: {
              '1': {
                name: 'meta.definition.variable.js variable.other.constant.js',
              },
              '2': {
                name: 'keyword.operator.definiteassignment.js',
              },
            },
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            patterns: [
              {
                include: '#var-single-variable-type-annotation',
              },
            ],
          },
          {
            name: 'meta.var-single-variable.expr.js',
            begin: '([_$[:alpha:]][_$[:alnum:]]*)(\\!)?',
            beginCaptures: {
              '1': {
                name: 'meta.definition.variable.js variable.other.readwrite.js',
              },
              '2': {
                name: 'keyword.operator.definiteassignment.js',
              },
            },
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            patterns: [
              {
                include: '#var-single-variable-type-annotation',
              },
            ],
          },
        ],
      },
      'var-single-const': {
        patterns: [
          {
            name: 'meta.var-single-variable.expr.js',
            begin:
              '(?x)([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            beginCaptures: {
              '1': {
                name: 'meta.definition.variable.js variable.other.constant.js entity.name.function.js',
              },
            },
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            patterns: [
              {
                include: '#var-single-variable-type-annotation',
              },
            ],
          },
          {
            name: 'meta.var-single-variable.expr.js',
            begin: '([_$[:alpha:]][_$[:alnum:]]*)',
            beginCaptures: {
              '1': {
                name: 'meta.definition.variable.js variable.other.constant.js',
              },
            },
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            patterns: [
              {
                include: '#var-single-variable-type-annotation',
              },
            ],
          },
        ],
      },
      'var-single-variable-type-annotation': {
        patterns: [
          {
            include: '#type-annotation',
          },
          {
            include: '#string',
          },
          {
            include: '#comment',
          },
        ],
      },
      'destructuring-variable': {
        patterns: [
          {
            name: 'meta.object-binding-pattern-variable.js',
            begin: '(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)',
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))',
            patterns: [
              {
                include: '#object-binding-pattern',
              },
              {
                include: '#type-annotation',
              },
              {
                include: '#comment',
              },
            ],
          },
          {
            name: 'meta.array-binding-pattern-variable.js',
            begin: '(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)',
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))',
            patterns: [
              {
                include: '#array-binding-pattern',
              },
              {
                include: '#type-annotation',
              },
              {
                include: '#comment',
              },
            ],
          },
        ],
      },
      'destructuring-const': {
        patterns: [
          {
            name: 'meta.object-binding-pattern-variable.js',
            begin: '(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)',
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))',
            patterns: [
              {
                include: '#object-binding-pattern-const',
              },
              {
                include: '#type-annotation',
              },
              {
                include: '#comment',
              },
            ],
          },
          {
            name: 'meta.array-binding-pattern-variable.js',
            begin: '(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)',
            end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))',
            patterns: [
              {
                include: '#array-binding-pattern-const',
              },
              {
                include: '#type-annotation',
              },
              {
                include: '#comment',
              },
            ],
          },
        ],
      },
      'object-binding-element': {
        patterns: [
          {
            include: '#comment',
          },
          {
            begin:
              '(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))',
            end: '(?=,|\\})',
            patterns: [
              {
                include: '#object-binding-element-propertyName',
              },
              {
                include: '#binding-element',
              },
            ],
          },
          {
            include: '#object-binding-pattern',
          },
          {
            include: '#destructuring-variable-rest',
          },
          {
            include: '#variable-initializer',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'object-binding-element-const': {
        patterns: [
          {
            include: '#comment',
          },
          {
            begin:
              '(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))',
            end: '(?=,|\\})',
            patterns: [
              {
                include: '#object-binding-element-propertyName',
              },
              {
                include: '#binding-element-const',
              },
            ],
          },
          {
            include: '#object-binding-pattern-const',
          },
          {
            include: '#destructuring-variable-rest-const',
          },
          {
            include: '#variable-initializer',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'object-binding-element-propertyName': {
        begin:
          '(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))',
        end: '(:)',
        endCaptures: {
          '0': {
            name: 'punctuation.destructuring.js',
          },
        },
        patterns: [
          {
            include: '#string',
          },
          {
            include: '#array-literal',
          },
          {
            include: '#tuple-literal',
          },
          {
            include: '#numeric-literal',
          },
          {
            name: 'variable.object.property.js',
            match: '([_$[:alpha:]][_$[:alnum:]]*)',
          },
        ],
      },
      'binding-element': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#numeric-literal',
          },
          {
            include: '#regex',
          },
          {
            include: '#object-binding-pattern',
          },
          {
            include: '#array-binding-pattern',
          },
          {
            include: '#destructuring-variable-rest',
          },
          {
            include: '#variable-initializer',
          },
        ],
      },
      'binding-element-const': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#numeric-literal',
          },
          {
            include: '#regex',
          },
          {
            include: '#object-binding-pattern-const',
          },
          {
            include: '#array-binding-pattern-const',
          },
          {
            include: '#destructuring-variable-rest-const',
          },
          {
            include: '#variable-initializer',
          },
        ],
      },
      'destructuring-variable-rest': {
        match: '(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)',
        captures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'meta.definition.variable.js variable.other.readwrite.js',
          },
        },
      },
      'destructuring-variable-rest-const': {
        match: '(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)',
        captures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'meta.definition.variable.js variable.other.constant.js',
          },
        },
      },
      'object-binding-pattern': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        patterns: [
          {
            include: '#object-binding-element',
          },
        ],
      },
      'object-binding-pattern-const': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        patterns: [
          {
            include: '#object-binding-element-const',
          },
        ],
      },
      'array-binding-pattern': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\[)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        patterns: [
          {
            include: '#binding-element',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'array-binding-pattern-const': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\[)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        patterns: [
          {
            include: '#binding-element-const',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'parameter-name': {
        patterns: [
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
            },
          },
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'entity.name.function.js variable.language.this.js',
              },
              '4': {
                name: 'entity.name.function.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'variable.parameter.js variable.language.this.js',
              },
              '4': {
                name: 'variable.parameter.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
        ],
      },
      'destructuring-parameter': {
        patterns: [
          {
            name: 'meta.parameter.object-binding-pattern.js',
            begin: '(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\{)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.rest.js',
              },
              '2': {
                name: 'punctuation.definition.binding-pattern.object.js',
              },
            },
            end: '\\}',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.binding-pattern.object.js',
              },
            },
            patterns: [
              {
                include: '#parameter-object-binding-element',
              },
            ],
          },
          {
            name: 'meta.parameter.array-binding-pattern.js',
            begin: '(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\[)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.rest.js',
              },
              '2': {
                name: 'punctuation.definition.binding-pattern.array.js',
              },
            },
            end: '\\]',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.binding-pattern.array.js',
              },
            },
            patterns: [
              {
                include: '#parameter-binding-element',
              },
              {
                include: '#punctuation-comma',
              },
            ],
          },
        ],
      },
      'parameter-object-binding-element': {
        patterns: [
          {
            include: '#comment',
          },
          {
            begin:
              '(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))',
            end: '(?=,|\\})',
            patterns: [
              {
                include: '#object-binding-element-propertyName',
              },
              {
                include: '#parameter-binding-element',
              },
              {
                include: '#paren-expression',
              },
            ],
          },
          {
            include: '#parameter-object-binding-pattern',
          },
          {
            include: '#destructuring-parameter-rest',
          },
          {
            include: '#variable-initializer',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'parameter-binding-element': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#numeric-literal',
          },
          {
            include: '#regex',
          },
          {
            include: '#parameter-object-binding-pattern',
          },
          {
            include: '#parameter-array-binding-pattern',
          },
          {
            include: '#destructuring-parameter-rest',
          },
          {
            include: '#variable-initializer',
          },
        ],
      },
      'destructuring-parameter-rest': {
        match: '(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)',
        captures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'variable.parameter.js',
          },
        },
      },
      'parameter-object-binding-pattern': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.object.js',
          },
        },
        patterns: [
          {
            include: '#parameter-object-binding-element',
          },
        ],
      },
      'parameter-array-binding-pattern': {
        begin: '(?:(\\.\\.\\.)\\s*)?(\\[)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.rest.js',
          },
          '2': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.binding-pattern.array.js',
          },
        },
        patterns: [
          {
            include: '#parameter-binding-element',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'field-declaration': {
        name: 'meta.field.declaration.js',
        begin:
          '(?x)(?<!\\()(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s+)?(?=\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|\\}|$))',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.js',
          },
        },
        end: '(?x)(?=\\}|;|,|$|(^(?!\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|$))))|(?<=\\})',
        patterns: [
          {
            include: '#variable-initializer',
          },
          {
            include: '#type-annotation',
          },
          {
            include: '#string',
          },
          {
            include: '#array-literal',
          },
          {
            include: '#tuple-literal',
          },
          {
            include: '#numeric-literal',
          },
          {
            include: '#comment',
          },
          {
            match:
              '(?x)(\\#?[_$[:alpha:]][_$[:alnum:]]*)(?:(\\?)|(\\!))?(?=\\s*\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            captures: {
              '1': {
                name: 'meta.definition.property.js entity.name.function.js',
              },
              '2': {
                name: 'keyword.operator.optional.js',
              },
              '3': {
                name: 'keyword.operator.definiteassignment.js',
              },
            },
          },
          {
            name: 'meta.definition.property.js variable.object.property.js',
            match: '\\#?[_$[:alpha:]][_$[:alnum:]]*',
          },
          {
            name: 'keyword.operator.optional.js',
            match: '\\?',
          },
          {
            name: 'keyword.operator.definiteassignment.js',
            match: '\\!',
          },
        ],
      },
      'variable-initializer': {
        patterns: [
          {
            begin: '(?<!=|!)(=)(?!=)(?=\\s*\\S)(?!\\s*.*=>\\s*$)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.assignment.js',
              },
            },
            end: '(?=$|^|[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            begin: '(?<!=|!)(=)(?!=)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.assignment.js',
              },
            },
            end: '(?=[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))|(?=^\\s*$)|(?<![\\|\\&\\+\\-\\*\\/])(?<=\\S)(?<!=)(?=\\s*$)',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
        ],
      },
      'component-declaration': {
        name: 'meta.function.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdefault)\\s+)?(?:(\\bdeclare)\\s+)?(component\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'keyword.control.default.js',
          },
          '3': {
            name: 'storage.modifier.js',
          },
          '4': {
            name: 'storage.type.function.js',
          },
          '5': {
            name: 'keyword.generator.asterisk.js',
          },
          '6': {
            name: 'meta.definition.function.js entity.name.function.js',
          },
        },
        end: '(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?<=\\})',
        patterns: [
          {
            include: '#function-name',
          },
          {
            include: '#component-body',
          },
        ],
      },
      'fragment-declaration': {
        name: 'meta.function.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdefault)\\s+)?(?:(\\bdeclare)\\s+)?(fragment\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'keyword.control.default.js',
          },
          '3': {
            name: 'storage.modifier.js',
          },
          '4': {
            name: 'storage.type.function.js',
          },
          '5': {
            name: 'keyword.generator.asterisk.js',
          },
          '6': {
            name: 'meta.definition.function.js entity.name.function.js',
          },
        },
        end: '(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?<=\\})',
        patterns: [
          {
            include: '#function-name',
          },
          {
            include: '#component-body',
          },
        ],
      },
      'function-declaration': {
        name: 'meta.function.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.modifier.async.js',
          },
          '4': {
            name: 'storage.type.function.js',
          },
          '5': {
            name: 'keyword.generator.asterisk.js',
          },
          '6': {
            name: 'meta.definition.function.js entity.name.function.js',
          },
        },
        end: '(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?<=\\})',
        patterns: [
          {
            include: '#function-name',
          },
          {
            include: '#function-body',
          },
        ],
      },
      'function-expression': {
        name: 'meta.function.expression.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.async.js',
          },
          '2': {
            name: 'storage.type.function.js',
          },
          '3': {
            name: 'keyword.generator.asterisk.js',
          },
          '4': {
            name: 'meta.definition.function.js entity.name.function.js',
          },
        },
        end: '(?=;)|(?<=\\})',
        patterns: [
          {
            include: '#function-name',
          },
          {
            include: '#single-line-comment-consuming-line-ending',
          },
          {
            include: '#function-body',
          },
        ],
      },
      'function-name': {
        name: 'meta.definition.function.js entity.name.function.js',
        match: '[_$[:alpha:]][_$[:alnum:]]*',
      },
      'function-body': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#function-parameters',
          },
          {
            include: '#return-type',
          },
          {
            include: '#type-function-return-type',
          },
          {
            include: '#decl-block',
          },
          {
            name: 'keyword.generator.asterisk.js',
            match: '\\*',
          },
        ],
      },
      'component-body': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#function-parameters',
          },
          {
            include: '#return-type',
          },
          {
            include: '#type-function-return-type',
          },
          {
            include: '#component-decl-block',
          },
          {
            name: 'keyword.generator.asterisk.js',
            match: '\\*',
          },
        ],
      },
      'method-declaration': {
        patterns: [
          {
            name: 'meta.method.declaration.js',
            begin:
              '(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?\\s*\\b(constructor)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'storage.modifier.js',
              },
              '4': {
                name: 'storage.modifier.async.js',
              },
              '5': {
                name: 'storage.type.js',
              },
            },
            end: '(?=\\}|;|,|$)|(?<=\\})',
            patterns: [
              {
                include: '#method-declaration-name',
              },
              {
                include: '#function-body',
              },
            ],
          },
          {
            name: 'meta.method.declaration.js',
            begin:
              '(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:(?:\\s*\\b(new)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|(?:(\\*)\\s*)?)(?=\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'storage.modifier.js',
              },
              '4': {
                name: 'storage.modifier.async.js',
              },
              '5': {
                name: 'keyword.operator.new.js',
              },
              '6': {
                name: 'keyword.generator.asterisk.js',
              },
            },
            end: '(?=\\}|;|,|$)|(?<=\\})',
            patterns: [
              {
                include: '#method-declaration-name',
              },
              {
                include: '#function-body',
              },
            ],
          },
          {
            name: 'meta.method.declaration.js',
            begin:
              '(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'storage.modifier.js',
              },
              '4': {
                name: 'storage.modifier.async.js',
              },
              '5': {
                name: 'storage.type.property.js',
              },
              '6': {
                name: 'keyword.generator.asterisk.js',
              },
            },
            end: '(?=\\}|;|,|$)|(?<=\\})',
            patterns: [
              {
                include: '#method-declaration-name',
              },
              {
                include: '#function-body',
              },
            ],
          },
        ],
      },
      'object-literal-method-declaration': {
        name: 'meta.method.declaration.js',
        begin:
          '(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.async.js',
          },
          '2': {
            name: 'storage.type.property.js',
          },
          '3': {
            name: 'keyword.generator.asterisk.js',
          },
        },
        end: '(?=\\}|;|,)|(?<=\\})',
        patterns: [
          {
            include: '#method-declaration-name',
          },
          {
            include: '#function-body',
          },
          {
            begin:
              '(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.async.js',
              },
              '2': {
                name: 'storage.type.property.js',
              },
              '3': {
                name: 'keyword.generator.asterisk.js',
              },
            },
            end: '(?=\\(|\\<)',
            patterns: [
              {
                include: '#method-declaration-name',
              },
            ],
          },
        ],
      },
      'method-declaration-name': {
        begin:
          '(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??)\\s*[\\(\\<])',
        end: '(?=\\(|\\<)',
        patterns: [
          {
            include: '#string',
          },
          {
            include: '#array-literal',
          },
          {
            include: '#tuple-literal',
          },
          {
            include: '#numeric-literal',
          },
          {
            name: 'meta.definition.method.js entity.name.function.js',
            match: '[_$[:alpha:]][_$[:alnum:]]*',
          },
          {
            name: 'keyword.operator.optional.js',
            match: '\\?',
          },
        ],
      },
      'arrow-function': {
        patterns: [
          {
            name: 'meta.arrow.js',
            match:
              '(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)\\s*(?==>)',
            captures: {
              '1': {
                name: 'storage.modifier.async.js',
              },
              '2': {
                name: 'variable.parameter.js',
              },
            },
          },
          {
            name: 'meta.arrow.js',
            begin:
              '(?x) (?:\n  (?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\n)? ((?<![})!\\]])\\s*\n  (?=\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  )\n)',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.async.js',
              },
            },
            end: '(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#type-parameters',
              },
              {
                include: '#function-parameters',
              },
              {
                include: '#arrow-return-type',
              },
              {
                include: '#possibly-arrow-return-type',
              },
            ],
          },
          {
            name: 'meta.arrow.js',
            begin: '=>',
            beginCaptures: {
              '0': {
                name: 'storage.type.function.arrow.js',
              },
            },
            end: '((?<=\\}|\\S)(?<!=>)|((?!\\{)(?=\\S)))(?!\\/[\\/\\*])',
            patterns: [
              {
                include: '#single-line-comment-consuming-line-ending',
              },
              {
                include: '#decl-block',
              },
              {
                include: '#expression',
              },
            ],
          },
        ],
      },
      'indexer-declaration': {
        name: 'meta.indexer.declaration.js',
        begin:
          '(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=:)',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.js',
          },
          '2': {
            name: 'meta.brace.square.js',
          },
          '3': {
            name: 'variable.parameter.js',
          },
        },
        end: '(\\])\\s*(\\?\\s*)?|$',
        endCaptures: {
          '1': {
            name: 'meta.brace.square.js',
          },
          '2': {
            name: 'keyword.operator.optional.js',
          },
        },
        patterns: [
          {
            include: '#type-annotation',
          },
        ],
      },
      'indexer-mapped-type-declaration': {
        name: 'meta.indexer.mappedtype.declaration.js',
        begin:
          '(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([+-])?(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s+(in)\\s+',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.type.modifier.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'meta.brace.square.js',
          },
          '4': {
            name: 'entity.name.type.js',
          },
          '5': {
            name: 'keyword.operator.expression.in.js',
          },
        },
        end: '(\\])([+-])?\\s*(\\?\\s*)?|$',
        endCaptures: {
          '1': {
            name: 'meta.brace.square.js',
          },
          '2': {
            name: 'keyword.operator.type.modifier.js',
          },
          '3': {
            name: 'keyword.operator.optional.js',
          },
        },
        patterns: [
          {
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+',
            captures: {
              '1': {
                name: 'keyword.control.as.js',
              },
            },
          },
          {
            include: '#type',
          },
        ],
      },
      'function-parameters': {
        name: 'meta.parameters.js',
        begin: '\\(',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.parameters.begin.js',
          },
        },
        end: '\\)',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.parameters.end.js',
          },
        },
        patterns: [
          {
            include: '#function-parameters-body',
          },
        ],
      },
      'function-parameters-body': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#decorator',
          },
          {
            include: '#destructuring-parameter',
          },
          {
            include: '#parameter-name',
          },
          {
            include: '#parameter-type-annotation',
          },
          {
            include: '#variable-initializer',
          },
          {
            name: 'punctuation.separator.parameter.js',
            match: ',',
          },
        ],
      },
      'class-declaration': {
        name: 'meta.class.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(class)\\b(?=\\s+|/[/*])',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.modifier.js',
          },
          '4': {
            name: 'storage.type.class.js',
          },
        },
        end: '(?<=\\})',
        patterns: [
          {
            include: '#class-declaration-or-expression-patterns',
          },
        ],
      },
      'class-expression': {
        name: 'meta.class.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(class)\\b(?=\\s+|[<{]|\\/[\\/*])',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.js',
          },
          '2': {
            name: 'storage.type.class.js',
          },
        },
        end: '(?<=\\})',
        patterns: [
          {
            include: '#class-declaration-or-expression-patterns',
          },
        ],
      },
      'eval-expression': {
        name: 'meta.eval.expression.js',
        begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(eval)\\s*(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.eval.js',
          },
          '2': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        contentName: 'string.unquoted.eval-content.js',
      },
      'class-declaration-or-expression-patterns': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#class-or-interface-heritage',
          },
          {
            match: '[_$[:alpha:]][_$[:alnum:]]*',
            captures: {
              '0': {
                name: 'entity.name.type.class.js',
              },
            },
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#class-or-interface-body',
          },
        ],
      },
      'interface-declaration': {
        name: 'meta.interface.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(interface)\\b(?=\\s+|/[/*])',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.modifier.js',
          },
          '4': {
            name: 'storage.type.interface.js',
          },
        },
        end: '(?<=\\})',
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#class-or-interface-heritage',
          },
          {
            match: '[_$[:alpha:]][_$[:alnum:]]*',
            captures: {
              '0': {
                name: 'entity.name.type.interface.js',
              },
            },
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#class-or-interface-body',
          },
        ],
      },
      'class-or-interface-heritage': {
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(extends|implements)\\b)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
        beginCaptures: {
          '1': {
            name: 'storage.modifier.js',
          },
        },
        end: '(?=\\{)',
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#class-or-interface-heritage',
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#expressionWithoutIdentifiers',
          },
          {
            match:
              '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s*\\??\\.\\s*[_$[:alpha:]][_$[:alnum:]]*)*\\s*)',
            captures: {
              '1': {
                name: 'entity.name.type.module.js',
              },
              '2': {
                name: 'punctuation.accessor.js',
              },
              '3': {
                name: 'punctuation.accessor.optional.js',
              },
            },
          },
          {
            match: '([_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'entity.other.inherited-class.js',
              },
            },
          },
          {
            include: '#expressionPunctuations',
          },
        ],
      },
      'class-or-interface-body': {
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#decorator',
          },
          {
            begin: '(?<=:)\\s*',
            end: '(?=\\s|[;),}\\]:\\-\\+]|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            include: '#method-declaration',
          },
          {
            include: '#indexer-declaration',
          },
          {
            include: '#field-declaration',
          },
          {
            include: '#string',
          },
          {
            include: '#type-annotation',
          },
          {
            include: '#variable-initializer',
          },
          {
            include: '#access-modifier',
          },
          {
            include: '#property-accessor',
          },
          {
            include: '#async-modifier',
          },
          {
            include: '#after-operator-block-as-object-literal',
          },
          {
            include: '#decl-block',
          },
          {
            include: '#expression',
          },
          {
            include: '#punctuation-comma',
          },
          {
            include: '#punctuation-semicolon',
          },
        ],
      },
      'access-modifier': {
        name: 'storage.modifier.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(abstract|declare|override|public|protected|private|readonly|static)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'property-accessor': {
        name: 'storage.type.property.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(accessor|get|set)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'async-modifier': {
        name: 'storage.modifier.async.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(async)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'enum-declaration': {
        name: 'meta.enum.declaration.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:\\b(const)\\s+)?\\b(enum)\\s+([_$[:alpha:]][_$[:alnum:]]*)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.modifier.js',
          },
          '4': {
            name: 'storage.type.enum.js',
          },
          '5': {
            name: 'entity.name.type.enum.js',
          },
        },
        end: '(?<=\\})',
        patterns: [
          {
            include: '#comment',
          },
          {
            begin: '\\{',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.block.js',
              },
            },
            end: '\\}',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.block.js',
              },
            },
            patterns: [
              {
                include: '#comment',
              },
              {
                begin: '([_$[:alpha:]][_$[:alnum:]]*)',
                beginCaptures: {
                  '0': {
                    name: 'variable.other.enummember.js',
                  },
                },
                end: '(?=,|\\}|$)',
                patterns: [
                  {
                    include: '#comment',
                  },
                  {
                    include: '#variable-initializer',
                  },
                ],
              },
              {
                begin:
                  '(?=((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\])))',
                end: '(?=,|\\}|$)',
                patterns: [
                  {
                    include: '#string',
                  },
                  {
                    include: '#array-literal',
                  },
                  {
                    include: '#tuple-literal',
                  },
                  {
                    include: '#comment',
                  },
                  {
                    include: '#variable-initializer',
                  },
                ],
              },
              {
                include: '#punctuation-comma',
              },
            ],
          },
        ],
      },
      'namespace-declaration': {
        name: 'meta.namespace.declaration.js',
        begin:
          '(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(namespace|module)\\s+(?=[_$[:alpha:]"\'`]))',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.type.namespace.js',
          },
        },
        end: '(?<=\\})|(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            name: 'entity.name.type.module.js',
            match: '([_$[:alpha:]][_$[:alnum:]]*)',
          },
          {
            include: '#punctuation-accessor',
          },
          {
            include: '#decl-block',
          },
        ],
      },
      'type-alias-declaration': {
        name: 'meta.type.declaration.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(type)\\b\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'storage.type.type.js',
          },
          '4': {
            name: 'entity.name.type.alias.js',
          },
        },
        end: '(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#type-parameters',
          },
          {
            begin: '(=)\\s*(intrinsic)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.assignment.js',
              },
              '2': {
                name: 'keyword.control.intrinsic.js',
              },
            },
            end: '(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
          {
            begin: '(=)\\s*',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.assignment.js',
              },
            },
            end: '(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
        ],
      },
      'import-equals-declaration': {
        patterns: [
          {
            name: 'meta.import-equals.external.js',
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(require)\\s*(\\()',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'keyword.control.import.js',
              },
              '4': {
                name: 'keyword.control.type.js',
              },
              '5': {
                name: 'variable.other.readwrite.alias.js',
              },
              '6': {
                name: 'keyword.operator.assignment.js',
              },
              '7': {
                name: 'keyword.control.require.js',
              },
              '8': {
                name: 'meta.brace.round.js',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#string',
              },
            ],
          },
          {
            name: 'meta.import-equals.internal.js',
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(?!require\\b)',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
              '3': {
                name: 'keyword.control.import.js',
              },
              '4': {
                name: 'keyword.control.type.js',
              },
              '5': {
                name: 'variable.other.readwrite.alias.js',
              },
              '6': {
                name: 'keyword.operator.assignment.js',
              },
            },
            end: '(?=;|$|^)',
            patterns: [
              {
                include: '#single-line-comment-consuming-line-ending',
              },
              {
                include: '#comment',
              },
              {
                match: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))',
                captures: {
                  '1': {
                    name: 'entity.name.type.module.js',
                  },
                  '2': {
                    name: 'punctuation.accessor.js',
                  },
                  '3': {
                    name: 'punctuation.accessor.optional.js',
                  },
                },
              },
              {
                name: 'variable.other.readwrite.js',
                match: '([_$[:alpha:]][_$[:alnum:]]*)',
              },
            ],
          },
        ],
      },
      'import-declaration': {
        name: 'meta.import.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type)(?!\\s+from))?(?!\\s*[:\\(])(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
        beginCaptures: {
          '1': {
            name: 'keyword.control.export.js',
          },
          '2': {
            name: 'storage.modifier.js',
          },
          '3': {
            name: 'keyword.control.import.js',
          },
          '4': {
            name: 'keyword.control.type.js',
          },
        },
        end: '(?<!^import|[^\\._$[:alnum:]]import)(?=;|$|^)',
        patterns: [
          {
            include: '#single-line-comment-consuming-line-ending',
          },
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            begin: '(?<=^import|[^\\._$[:alnum:]]import)(?!\\s*["\'])',
            end: '\\bfrom\\b',
            endCaptures: {
              '0': {
                name: 'keyword.control.from.js',
              },
            },
            patterns: [
              {
                include: '#import-export-declaration',
              },
            ],
          },
          {
            include: '#import-export-declaration',
          },
        ],
      },
      'export-declaration': {
        patterns: [
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)\\s+(as)\\s+(namespace)\\s+([_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'keyword.control.as.js',
              },
              '3': {
                name: 'storage.type.namespace.js',
              },
              '4': {
                name: 'entity.name.type.module.js',
              },
            },
          },
          {
            name: 'meta.export.default.js',
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?(?:(?:\\s*(=))|(?:\\s+(default)(?=\\s+)))',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'keyword.control.type.js',
              },
              '3': {
                name: 'keyword.operator.assignment.js',
              },
              '4': {
                name: 'keyword.control.default.js',
              },
            },
            end: '(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#interface-declaration',
              },
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'meta.export.js',
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?\\b(?!(\\$)|(\\s*:))((?=\\s*[\\{*])|((?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s|,))(?!\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))',
            beginCaptures: {
              '1': {
                name: 'keyword.control.export.js',
              },
              '2': {
                name: 'keyword.control.type.js',
              },
            },
            end: '(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
            patterns: [
              {
                include: '#import-export-declaration',
              },
            ],
          },
        ],
      },
      'import-export-declaration': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#import-export-block',
          },
          {
            name: 'keyword.control.from.js',
            match: '\\bfrom\\b',
          },
          {
            include: '#import-export-assert-clause',
          },
          {
            include: '#import-export-clause',
          },
        ],
      },
      'import-export-assert-clause': {
        begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(with)|(assert))\\s*(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.with.js',
          },
          '2': {
            name: 'keyword.control.assert.js',
          },
          '3': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            name: 'meta.object-literal.key.js',
            match:
              '(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)',
          },
          {
            name: 'punctuation.separator.key-value.js',
            match: ':',
          },
        ],
      },
      'import-export-block': {
        name: 'meta.block.js',
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#import-export-clause',
          },
        ],
      },
      'import-export-clause': {
        patterns: [
          {
            include: '#comment',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(?:(\\btype)\\s+)?(?:(\\bdefault)|(\\*)|(\\b[_$[:alpha:]][_$[:alnum:]]*)|((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))))\\s+(as)\\s+(?:(default(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|([_$[:alpha:]][_$[:alnum:]]*)|((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))',
            captures: {
              '1': {
                name: 'keyword.control.type.js',
              },
              '2': {
                name: 'keyword.control.default.js',
              },
              '3': {
                name: 'constant.language.import-export-all.js',
              },
              '4': {
                name: 'variable.other.readwrite.js',
              },
              '5': {
                name: 'string.quoted.alias.js',
              },
              '12': {
                name: 'keyword.control.as.js',
              },
              '13': {
                name: 'keyword.control.default.js',
              },
              '14': {
                name: 'variable.other.readwrite.alias.js',
              },
              '15': {
                name: 'string.quoted.alias.js',
              },
            },
          },
          {
            include: '#punctuation-comma',
          },
          {
            name: 'constant.language.import-export-all.js',
            match: '\\*',
          },
          {
            name: 'keyword.control.default.js',
            match: '\\b(default)\\b',
          },
          {
            match:
              '(?:(\\btype)\\s+)?(?:([_$[:alpha:]][_$[:alnum:]]*)|((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))',
            captures: {
              '1': {
                name: 'keyword.control.type.js',
              },
              '2': {
                name: 'variable.other.readwrite.alias.js',
              },
              '3': {
                name: 'string.quoted.alias.js',
              },
            },
          },
        ],
      },
      'switch-statement': {
        name: 'switch-statement.expr.js',
        begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bswitch\\s*\\()',
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            name: 'switch-expression.expr.js',
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(switch)\\s*(\\()',
            beginCaptures: {
              '1': {
                name: 'keyword.control.switch.js',
              },
              '2': {
                name: 'meta.brace.round.js',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'switch-block.expr.js',
            begin: '\\{',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.block.js',
              },
            },
            end: '(?=\\})',
            patterns: [
              {
                name: 'case-clause.expr.js',
                begin:
                  '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default(?=:))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.switch.js',
                  },
                },
                end: '(?=:)',
                patterns: [
                  {
                    include: '#expression',
                  },
                ],
              },
              {
                begin: '(:)\\s*(\\{)',
                beginCaptures: {
                  '1': {
                    name: 'case-clause.expr.js punctuation.definition.section.case-statement.js',
                  },
                  '2': {
                    name: 'meta.block.js punctuation.definition.block.js',
                  },
                },
                end: '\\}',
                endCaptures: {
                  '0': {
                    name: 'meta.block.js punctuation.definition.block.js',
                  },
                },
                contentName: 'meta.block.js',
                patterns: [
                  {
                    include: '#statements',
                  },
                ],
              },
              {
                match: '(:)',
                captures: {
                  '0': {
                    name: 'case-clause.expr.js punctuation.definition.section.case-statement.js',
                  },
                },
              },
              {
                include: '#statements',
              },
            ],
          },
        ],
      },
      'component-switch-statement': {
        name: 'switch-statement.expr.js',
        begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bswitch\\s*\\()',
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            name: 'switch-expression.expr.js',
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(switch)\\s*(\\()',
            beginCaptures: {
              '1': {
                name: 'keyword.control.switch.js',
              },
              '2': {
                name: 'meta.brace.round.js',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'switch-block.expr.js',
            begin: '\\{',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.block.js',
              },
            },
            end: '(?=\\})',
            patterns: [
              {
                name: 'case-clause.expr.js',
                begin:
                  '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default(?=:))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.switch.js',
                  },
                },
                end: '(?=:)',
                patterns: [
                  {
                    include: '#expression',
                  },
                ],
              },
              {
                begin: '(:)\\s*(\\{)',
                beginCaptures: {
                  '1': {
                    name: 'case-clause.expr.js punctuation.definition.section.case-statement.js',
                  },
                  '2': {
                    name: 'meta.block.js punctuation.definition.block.js',
                  },
                },
                end: '\\}',
                endCaptures: {
                  '0': {
                    name: 'meta.block.js punctuation.definition.block.js',
                  },
                },
                contentName: 'meta.block.js',
                patterns: [
                  {
                    include: '#statements',
                  },
                ],
              },
              {
                match: '(:)',
                captures: {
                  '0': {
                    name: 'case-clause.expr.js punctuation.definition.section.case-statement.js',
                  },
                },
              },
              {
                include: '#component-statements',
              },
            ],
          },
        ],
      },
      'for-loop': {
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))for(?=((\\s+|(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*))await)?\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)?(\\())',
        beginCaptures: {
          '0': {
            name: 'keyword.control.loop.js',
          },
        },
        end: '(?<=\\))',
        patterns: [
          {
            include: '#comment',
          },
          {
            name: 'keyword.control.loop.js',
            match: 'await',
          },
          {
            name: 'meta.for-of-with-index.ripple',
            match:
              '\\(\\s*(let|const|var)\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s+(of)\\s+([^;]+)\\s*;\\s*(index)\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*\\)',
            captures: {
              '1': {
                name: 'storage.type.js',
              },
              '2': {
                name: 'variable.other.readwrite.js',
              },
              '3': {
                name: 'keyword.operator.of.js',
              },
              '4': {
                name: 'variable.other.object.js',
              },
              '5': {
                name: 'keyword.keyword.index.ripple',
              },
              '6': {
                name: 'variable.other.readwrite.js',
              },
            },
          },
          {
            begin: '\\(',
            beginCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            patterns: [
              {
                include: '#var-expr',
              },
              {
                include: '#expression',
              },
              {
                include: '#punctuation-semicolon',
              },
            ],
          },
        ],
      },
      'if-statement': {
        patterns: [
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bif\\s*(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))\\s*(?!\\{))',
            end: '(?=;|$|\\})',
            patterns: [
              {
                include: '#comment',
              },
              {
                begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(if)\\s*(\\()',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.conditional.js',
                  },
                  '2': {
                    name: 'meta.brace.round.js',
                  },
                },
                end: '\\)',
                endCaptures: {
                  '0': {
                    name: 'meta.brace.round.js',
                  },
                },
                patterns: [
                  {
                    include: '#expression',
                  },
                ],
              },
              {
                name: 'string.regexp.js',
                begin:
                  '(?<=\\))\\s*\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.begin.js',
                  },
                },
                end: '(/)([dgimsuvy]*)',
                endCaptures: {
                  '1': {
                    name: 'punctuation.definition.string.end.js',
                  },
                  '2': {
                    name: 'keyword.other.js',
                  },
                },
                patterns: [
                  {
                    include: '#regexp',
                  },
                ],
              },
              {
                include: '#statements',
              },
            ],
          },
        ],
      },
      'component-if-statement': {
        patterns: [
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bif\\s*(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))\\s*(?!\\{))',
            end: '(?=;|$|\\})',
            patterns: [
              {
                include: '#comment',
              },
              {
                begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(if)\\s*(\\()',
                beginCaptures: {
                  '1': {
                    name: 'keyword.control.conditional.js',
                  },
                  '2': {
                    name: 'meta.brace.round.js',
                  },
                },
                end: '\\)',
                endCaptures: {
                  '0': {
                    name: 'meta.brace.round.js',
                  },
                },
                patterns: [
                  {
                    include: '#expression',
                  },
                ],
              },
              {
                name: 'string.regexp.js',
                begin:
                  '(?<=\\))\\s*\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.begin.js',
                  },
                },
                end: '(/)([dgimsuvy]*)',
                endCaptures: {
                  '1': {
                    name: 'punctuation.definition.string.end.js',
                  },
                  '2': {
                    name: 'keyword.other.js',
                  },
                },
                patterns: [
                  {
                    include: '#regexp',
                  },
                ],
              },
              {
                include: '#component-statements',
              },
            ],
          },
        ],
      },
      'decl-block': {
        name: 'meta.block.js',
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#statements',
          },
        ],
      },
      'component-decl-block': {
        name: 'meta.block.js',
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#component-statements',
          },
        ],
      },
      'after-operator-block-as-object-literal': {
        name: 'meta.objectliteral.js',
        begin:
          '(?<!\\+\\+|--)(?<=[:=(,\\[?+!>]|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^yield|[^\\._$[:alnum:]]yield|^throw|[^\\._$[:alnum:]]throw|^in|[^\\._$[:alnum:]]in|^of|[^\\._$[:alnum:]]of|^typeof|[^\\._$[:alnum:]]typeof|&&|\\|\\||\\*)\\s*(\\{)',
        beginCaptures: {
          '1': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#object-member',
          },
        ],
      },
      'object-literal': {
        name: 'meta.objectliteral.js',
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#object-member',
          },
        ],
      },
      'object-member': {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#object-literal-method-declaration',
          },
          {
            name: 'meta.object.member.js meta.object-literal.key.js',
            begin: '(?=\\[)',
            end: '(?=:)|((?<=[\\]])(?=\\s*[\\(\\<]))',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#array-literal',
              },
              {
                include: '#tuple-literal',
              },
            ],
          },
          {
            name: 'meta.object.member.js meta.object-literal.key.js',
            begin: '(?=[\\\'\\"\\`])',
            end: '(?=:)|((?<=[\\\'\\"\\`])(?=((\\s*[\\(\\<,}])|(\\s+(as|satisfies)\\s+))))',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#string',
              },
            ],
          },
          {
            name: 'meta.object.member.js meta.object-literal.key.js',
            begin:
              '(?x)(?=(\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)))',
            end: '(?=:)|(?=\\s*([\\(\\<,}])|(\\s+as|satisfies\\s+))',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#numeric-literal',
              },
            ],
          },
          {
            name: 'meta.method.declaration.js',
            begin: '(?<=[\\]\\\'\\"\\`])(?=\\s*[\\(\\<])',
            end: '(?=\\}|;|,)|(?<=\\})',
            patterns: [
              {
                include: '#function-body',
              },
            ],
          },
          {
            name: 'meta.object.member.js',
            match:
              '(?![_$[:alpha:]])([[:digit:]]+)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)',
            captures: {
              '0': {
                name: 'meta.object-literal.key.js',
              },
              '1': {
                name: 'constant.numeric.decimal.js',
              },
            },
          },
          {
            name: 'meta.object.member.js',
            match:
              '(?x)(?:([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/)*\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            captures: {
              '0': {
                name: 'meta.object-literal.key.js',
              },
              '1': {
                name: 'entity.name.function.js',
              },
            },
          },
          {
            name: 'meta.object.member.js',
            match:
              '(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)',
            captures: {
              '0': {
                name: 'meta.object-literal.key.js',
              },
            },
          },
          {
            name: 'meta.object.member.js',
            begin: '\\.\\.\\.',
            beginCaptures: {
              '0': {
                name: 'keyword.operator.spread.js',
              },
            },
            end: '(?=,|\\})',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'meta.object.member.js',
            match: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=,|\\}|$|\\/\\/|\\/\\*)',
            captures: {
              '1': {
                name: 'variable.other.readwrite.js',
              },
            },
          },
          {
            name: 'meta.object.member.js',
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*([,}]|$))',
            captures: {
              '1': {
                name: 'keyword.control.as.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
            },
          },
          {
            name: 'meta.object.member.js',
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+',
            beginCaptures: {
              '1': {
                name: 'keyword.control.as.js',
              },
              '2': {
                name: 'keyword.control.satisfies.js',
              },
            },
            end: '(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|^|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisfies)\\s+))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
          {
            name: 'meta.object.member.js',
            begin: '(?=[_$[:alpha:]][_$[:alnum:]]*\\s*=)',
            end: '(?=,|\\}|$|\\/\\/|\\/\\*)',
            patterns: [
              {
                include: '#expression',
              },
            ],
          },
          {
            name: 'meta.object.member.js',
            begin: ':',
            beginCaptures: {
              '0': {
                name: 'meta.object-literal.key.js punctuation.separator.key-value.js',
              },
            },
            end: '(?=,|\\})',
            patterns: [
              {
                begin:
                  '(?<=:)\\s*(async)?(?=\\s*(<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))',
                beginCaptures: {
                  '1': {
                    name: 'storage.modifier.async.js',
                  },
                },
                end: '(?<=\\))',
                patterns: [
                  {
                    include: '#type-parameters',
                  },
                  {
                    begin: '\\(',
                    beginCaptures: {
                      '0': {
                        name: 'meta.brace.round.js',
                      },
                    },
                    end: '\\)',
                    endCaptures: {
                      '0': {
                        name: 'meta.brace.round.js',
                      },
                    },
                    patterns: [
                      {
                        include: '#expression-inside-possibly-arrow-parens',
                      },
                    ],
                  },
                ],
              },
              {
                begin:
                  '(?<=:)\\s*(async)?\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))',
                beginCaptures: {
                  '1': {
                    name: 'storage.modifier.async.js',
                  },
                  '2': {
                    name: 'meta.brace.round.js',
                  },
                },
                end: '\\)',
                endCaptures: {
                  '0': {
                    name: 'meta.brace.round.js',
                  },
                },
                patterns: [
                  {
                    include: '#expression-inside-possibly-arrow-parens',
                  },
                ],
              },
              {
                begin: '(?<=:)\\s*(async)?\\s*(?=\\<\\s*$)',
                beginCaptures: {
                  '1': {
                    name: 'storage.modifier.async.js',
                  },
                },
                end: '(?<=\\>)',
                patterns: [
                  {
                    include: '#type-parameters',
                  },
                ],
              },
              {
                begin:
                  '(?<=\\>)\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))',
                beginCaptures: {
                  '1': {
                    name: 'meta.brace.round.js',
                  },
                },
                end: '\\)',
                endCaptures: {
                  '0': {
                    name: 'meta.brace.round.js',
                  },
                },
                patterns: [
                  {
                    include: '#expression-inside-possibly-arrow-parens',
                  },
                ],
              },
              {
                include: '#possibly-arrow-return-type',
              },
              {
                include: '#expression',
              },
            ],
          },
          {
            include: '#punctuation-comma',
          },
          {
            include: '#decl-block',
          },
        ],
      },
      'ternary-expression': {
        begin: '(?!\\?\\.\\s*[^[:digit:]])(\\?)(?!\\?)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.ternary.js',
          },
        },
        end: '\\s*(:)',
        endCaptures: {
          '1': {
            name: 'keyword.operator.ternary.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
        ],
      },
      'function-call': {
        patterns: [
          {
            begin:
              '(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())',
            end: '(?<=\\))(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())',
            patterns: [
              {
                name: 'meta.function-call.js',
                begin:
                  '(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))',
                end: '(?=\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())',
                patterns: [
                  {
                    include: '#function-call-target',
                  },
                ],
              },
              {
                include: '#comment',
              },
              {
                include: '#function-call-optionals',
              },
              {
                include: '#type-arguments',
              },
              {
                include: '#paren-expression',
              },
            ],
          },
          {
            begin:
              '(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))',
            end: '(?<=\\>)(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))',
            patterns: [
              {
                name: 'meta.function-call.js',
                begin:
                  '(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))',
                end: '(?=(<\\s*[\\{\\[\\(]\\s*$))',
                patterns: [
                  {
                    include: '#function-call-target',
                  },
                ],
              },
              {
                include: '#comment',
              },
              {
                include: '#function-call-optionals',
              },
              {
                include: '#type-arguments',
              },
            ],
          },
        ],
      },
      'function-call-target': {
        patterns: [
          {
            include: '#support-function-call-identifiers',
          },
          {
            name: 'entity.name.function.js',
            match: '(\\#?[_$[:alpha:]][_$[:alnum:]]*)',
          },
        ],
      },
      'function-call-optionals': {
        patterns: [
          {
            name: 'meta.function-call.js punctuation.accessor.optional.js',
            match: '\\?\\.',
          },
          {
            name: 'meta.function-call.js keyword.operator.definiteassignment.js',
            match: '\\!',
          },
        ],
      },
      'support-function-call-identifiers': {
        patterns: [
          {
            include: '#literal',
          },
          {
            include: '#support-objects',
          },
          {
            include: '#object-identifiers',
          },
          {
            include: '#punctuation-accessor',
          },
          {
            name: 'keyword.operator.expression.import.js',
            match:
              '(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*[\\(]\\s*[\\"\\\'\\`]))',
          },
        ],
      },
      'new-expr': {
        name: 'new.expr.js',
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.new.js',
          },
        },
        end: '(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))',
        patterns: [
          {
            include: '#expression',
          },
        ],
      },
      'instanceof-expr': {
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(instanceof)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.expression.instanceof.js',
          },
        },
        end: '(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|(===|!==|==|!=)|(([\\&\\~\\^\\|]\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s+instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))',
        patterns: [
          {
            include: '#type',
          },
        ],
      },
      'paren-expression-possibly-arrow': {
        patterns: [
          {
            begin:
              '(?<=[(=,])\\s*(async)?(?=\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.async.js',
              },
            },
            end: '(?<=\\))',
            patterns: [
              {
                include: '#paren-expression-possibly-arrow-with-typeparameters',
              },
            ],
          },
          {
            begin:
              '(?<=[(=,]|=>|^return|[^\\._$[:alnum:]]return)\\s*(async)?(?=\\s*((((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\()|(<)|((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)))\\s*$)',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.async.js',
              },
            },
            end: '(?<=\\))',
            patterns: [
              {
                include: '#paren-expression-possibly-arrow-with-typeparameters',
              },
            ],
          },
          {
            include: '#possibly-arrow-return-type',
          },
        ],
      },
      'paren-expression-possibly-arrow-with-typeparameters': {
        patterns: [
          {
            include: '#type-parameters',
          },
          {
            begin: '\\(',
            beginCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'meta.brace.round.js',
              },
            },
            patterns: [
              {
                include: '#expression-inside-possibly-arrow-parens',
              },
            ],
          },
        ],
      },
      'expression-inside-possibly-arrow-parens': {
        patterns: [
          {
            include: '#expressionWithoutIdentifiers',
          },
          {
            include: '#comment',
          },
          {
            include: '#string',
          },
          {
            include: '#decorator',
          },
          {
            include: '#destructuring-parameter',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
            },
          },
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'entity.name.function.js variable.language.this.js',
              },
              '4': {
                name: 'entity.name.function.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*[:,]|$)',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'variable.parameter.js variable.language.this.js',
              },
              '4': {
                name: 'variable.parameter.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
          {
            include: '#type-annotation',
          },
          {
            include: '#variable-initializer',
          },
          {
            name: 'punctuation.separator.parameter.js',
            match: ',',
          },
          {
            include: '#identifiers',
          },
          {
            include: '#expressionPunctuations',
          },
        ],
      },
      'paren-expression': {
        begin: '\\(',
        beginCaptures: {
          '0': {
            name: 'meta.brace.round.js',
          },
        },
        end: '\\)',
        endCaptures: {
          '0': {
            name: 'meta.brace.round.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
        ],
      },

      'expression-operators': {
        patterns: [
          {
            name: 'keyword.control.flow.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(await)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?=\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*\\*)',
            beginCaptures: {
              '1': {
                name: 'keyword.control.flow.js',
              },
            },
            end: '\\*',
            endCaptures: {
              '0': {
                name: 'keyword.generator.asterisk.js',
              },
            },
            patterns: [
              {
                include: '#comment',
              },
            ],
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s*(\\*))?',
            captures: {
              '1': {
                name: 'keyword.control.flow.js',
              },
              '2': {
                name: 'keyword.generator.asterisk.js',
              },
            },
          },
          {
            name: 'keyword.operator.expression.delete.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))delete(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.operator.expression.in.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))in(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()',
          },
          {
            name: 'keyword.operator.expression.of.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))of(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()',
          },
          {
            name: 'keyword.operator.expression.instanceof.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.operator.new.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            include: '#typeof-operator',
          },
          {
            name: 'keyword.operator.expression.void.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))void(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*($|[;,:})\\]]))',
            captures: {
              '1': {
                name: 'keyword.control.as.js',
              },
              '2': {
                name: 'storage.modifier.js',
              },
            },
          },
          {
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+',
            beginCaptures: {
              '1': {
                name: 'keyword.control.as.js',
              },
              '2': {
                name: 'keyword.control.satisfies.js',
              },
            },
            end: '(?=^|[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisfies)\\s+)|(\\s+\\<))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
          {
            name: 'keyword.operator.spread.js',
            match: '\\.\\.\\.',
          },
          {
            name: 'keyword.operator.assignment.compound.js',
            match: '\\*=|(?<!\\()/=|%=|\\+=|\\-=',
          },
          {
            name: 'keyword.operator.assignment.compound.bitwise.js',
            match: '\\&=|\\^=|<<=|>>=|>>>=|\\|=',
          },
          {
            name: 'keyword.operator.bitwise.shift.js',
            match: '<<|>>>|>>',
          },
          {
            name: 'keyword.operator.comparison.js',
            match: '===|!==|==|!=',
          },
          {
            name: 'keyword.operator.relational.js operator.relational.ripple-force entity.name.operator.relational.ripple',
            match: '<=|>=|<>|<|>',
          },
          {
            match: '(?<=[_$[:alnum:]])(\\!)\\s*(?:(/=)|(?:(/)(?![/*])))',
            captures: {
              '1': {
                name: 'keyword.operator.logical.js',
              },
              '2': {
                name: 'keyword.operator.assignment.compound.js',
              },
              '3': {
                name: 'keyword.operator.arithmetic.js',
              },
            },
          },
          {
            name: 'keyword.operator.logical.js',
            match: '\\!|&&|\\|\\||\\?\\?',
          },
          {
            name: 'keyword.operator.bitwise.js',
            match: '\\&|~|\\^|\\|',
          },
          {
            name: 'keyword.operator.assignment.js',
            match: '\\=',
          },
          {
            name: 'keyword.operator.decrement.js',
            match: '--',
          },
          {
            name: 'keyword.operator.increment.js',
            match: '\\+\\+',
          },
          {
            name: 'keyword.operator.arithmetic.js',
            match: '%|\\*|/|-|\\+',
          },
          {
            begin:
              '(?<=[_$[:alnum:])\\]])\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)+(?:(/=)|(?:(/)(?![/*]))))',
            end: '(?:(/=)|(?:(/)(?!\\*([^\\*]|(\\*[^\\/]))*\\*\\/)))',
            endCaptures: {
              '1': {
                name: 'keyword.operator.assignment.compound.js',
              },
              '2': {
                name: 'keyword.operator.arithmetic.js',
              },
            },
            patterns: [
              {
                include: '#comment',
              },
            ],
          },
          {
            match: '(?<=[_$[:alnum:])\\]])\\s*(?:(/=)|(?:(/)(?![/*])))',
            captures: {
              '1': {
                name: 'keyword.operator.assignment.compound.js',
              },
              '2': {
                name: 'keyword.operator.arithmetic.js',
              },
            },
          },
        ],
      },
      'typeof-operator': {
        begin:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))typeof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
        beginCaptures: {
          '0': {
            name: 'keyword.operator.expression.typeof.js',
          },
        },
        end: '(?=[,);}\\]=>:&|{\\?]|(extends\\s+)|$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))',
        patterns: [
          {
            include: '#type-arguments',
          },
          {
            include: '#expression',
          },
        ],
      },
      literal: {
        patterns: [
          {
            include: '#numeric-literal',
          },
          {
            include: '#boolean-literal',
          },
          {
            include: '#null-literal',
          },
          {
            include: '#undefined-literal',
          },
          {
            include: '#numericConstant-literal',
          },
          {
            include: '#array-literal',
          },
          {
            include: '#tuple-literal',
          },
          {
            include: '#record-literal',
          },
          {
            include: '#this-literal',
          },
          {
            include: '#super-literal',
          },
        ],
      },
      'array-literal': {
        name: 'meta.array.literal.js',
        begin: '\\s*(\\[)',
        beginCaptures: {
          '1': {
            name: 'meta.brace.square.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'meta.brace.square.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'tuple-literal': {
        name: 'meta.tuple.literal.js',
        begin: '(#)(\\[)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.tuple.js',
          },
          '2': {
            name: 'meta.brace.square.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'meta.brace.square.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'record-literal': {
        name: 'meta.record.literal.js',
        begin: '(#)(\\{)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.record.js',
          },
          '2': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#object-member',
          },
        ],
      },
      'numeric-literal': {
        patterns: [
          {
            name: 'constant.numeric.hex.js',
            match: '\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$)',
            captures: {
              '1': {
                name: 'storage.type.numeric.bigint.js',
              },
            },
          },
          {
            name: 'constant.numeric.binary.js',
            match: '\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$)',
            captures: {
              '1': {
                name: 'storage.type.numeric.bigint.js',
              },
            },
          },
          {
            name: 'constant.numeric.octal.js',
            match: '\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$)',
            captures: {
              '1': {
                name: 'storage.type.numeric.bigint.js',
              },
            },
          },
          {
            match:
              '(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)',
            captures: {
              '0': {
                name: 'constant.numeric.decimal.js',
              },
              '1': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '2': {
                name: 'storage.type.numeric.bigint.js',
              },
              '3': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '4': {
                name: 'storage.type.numeric.bigint.js',
              },
              '5': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '6': {
                name: 'storage.type.numeric.bigint.js',
              },
              '7': {
                name: 'storage.type.numeric.bigint.js',
              },
              '8': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '9': {
                name: 'storage.type.numeric.bigint.js',
              },
              '10': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '11': {
                name: 'storage.type.numeric.bigint.js',
              },
              '12': {
                name: 'meta.delimiter.decimal.period.js',
              },
              '13': {
                name: 'storage.type.numeric.bigint.js',
              },
              '14': {
                name: 'storage.type.numeric.bigint.js',
              },
            },
          },
        ],
      },
      'boolean-literal': {
        patterns: [
          {
            name: 'constant.language.boolean.true.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))true(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'constant.language.boolean.false.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))false(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      'null-literal': {
        name: 'constant.language.null.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))null(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'this-literal': {
        name: 'variable.language.this.js',
        match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))this\\b(?!\\$)',
      },
      'super-literal': {
        name: 'variable.language.super.js',
        match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))super\\b(?!\\$)',
      },
      'undefined-literal': {
        name: 'constant.language.undefined.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))undefined(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'numericConstant-literal': {
        patterns: [
          {
            name: 'constant.language.nan.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))NaN(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'constant.language.infinity.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Infinity(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      'support-objects': {
        patterns: [
          {
            name: 'variable.language.arguments.js',
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(arguments)\\b(?!\\$)',
          },
          {
            name: 'support.class.promise.js',
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(Promise)\\b(?!\\$)',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(import)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(meta)\\b(?!\\$)',
            captures: {
              '1': {
                name: 'keyword.control.import.js',
              },
              '2': {
                name: 'punctuation.accessor.js',
              },
              '3': {
                name: 'punctuation.accessor.optional.js',
              },
              '4': {
                name: 'support.variable.property.importmeta.js',
              },
            },
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(target)\\b(?!\\$)',
            captures: {
              '1': {
                name: 'keyword.operator.new.js',
              },
              '2': {
                name: 'punctuation.accessor.js',
              },
              '3': {
                name: 'punctuation.accessor.optional.js',
              },
              '4': {
                name: 'support.variable.property.target.js',
              },
            },
          },
          {
            match:
              '(?x) (?:(\\.)|(\\?\\.(?!\\s*[[:digit:]]))) \\s* (?:\n  (?:(constructor|length|prototype|__proto__)\\b(?!\\$|\\s*(<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\\())\n  |\n  (?:(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\\b(?!\\$)))',
            captures: {
              '1': {
                name: 'punctuation.accessor.js',
              },
              '2': {
                name: 'punctuation.accessor.optional.js',
              },
              '3': {
                name: 'support.variable.property.js',
              },
              '4': {
                name: 'support.constant.js',
              },
            },
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(exports)|(module)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(exports|id|filename|loaded|parent|children))?)\\b(?!\\$)',
            captures: {
              '1': {
                name: 'support.type.object.module.js',
              },
              '2': {
                name: 'support.type.object.module.js',
              },
              '3': {
                name: 'punctuation.accessor.js',
              },
              '4': {
                name: 'punctuation.accessor.optional.js',
              },
              '5': {
                name: 'support.type.object.module.js',
              },
            },
          },
        ],
      },
      identifiers: {
        patterns: [
          {
            include: '#object-identifiers',
          },
          {
            match:
              '(?x)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*)?([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n))',
            captures: {
              '1': {
                name: 'punctuation.accessor.js',
              },
              '2': {
                name: 'punctuation.accessor.optional.js',
              },
              '3': {
                name: 'entity.name.function.js',
              },
            },
          },
          {
            match:
              '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])',
            captures: {
              '1': {
                name: 'punctuation.accessor.js',
              },
              '2': {
                name: 'punctuation.accessor.optional.js',
              },
              '3': {
                name: 'variable.other.constant.property.js',
              },
            },
          },
          {
            match: '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'punctuation.accessor.js',
              },
              '2': {
                name: 'punctuation.accessor.optional.js',
              },
              '3': {
                name: 'variable.other.property.js',
              },
            },
          },
          {
            name: 'variable.other.constant.js',
            match: '([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])',
          },
          {
            name: 'variable.other.readwrite.js',
            match: '[_$[:alpha:]][_$[:alnum:]]*',
          },
        ],
      },
      'object-identifiers': {
        patterns: [
          {
            name: 'support.class.js',
            match: '([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\\??\\.\\s*prototype\\b(?!\\$))',
          },
          {
            match:
              '(?x)(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(?:\n  (\\#?[[:upper:]][_$[:digit:][:upper:]]*) |\n  (\\#?[_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'punctuation.accessor.js',
              },
              '2': {
                name: 'punctuation.accessor.optional.js',
              },
              '3': {
                name: 'variable.other.constant.object.property.js',
              },
              '4': {
                name: 'variable.other.object.property.js',
              },
            },
          },
          {
            match:
              '(?x)(?:\n  ([[:upper:]][_$[:digit:][:upper:]]*) |\n  ([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)',
            captures: {
              '1': {
                name: 'variable.other.constant.object.js',
              },
              '2': {
                name: 'variable.other.object.js',
              },
            },
          },
        ],
      },
      'type-annotation': {
        patterns: [
          {
            name: 'meta.type.annotation.js',
            begin: '(:)(?=\\s*\\S)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.type.annotation.js',
              },
            },
            end: '(?<![:|&])(?!\\s*[|&]\\s+)((?=^|[,);\\}\\]]|//)|(?==[^>])|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
          {
            name: 'meta.type.annotation.js',
            begin: '(:)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.type.annotation.js',
              },
            },
            end: '(?<![:|&])((?=[,);\\}\\]]|\\/\\/)|(?==[^>])|(?=^\\s*$)|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
        ],
      },
      'parameter-type-annotation': {
        patterns: [
          {
            name: 'meta.type.annotation.js',
            begin: '(:)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.type.annotation.js',
              },
            },
            end: '(?=[,)])|(?==[^>])',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
        ],
      },
      'return-type': {
        patterns: [
          {
            name: 'meta.return.type.js',
            begin: '(?<=\\))\\s*(:)(?=\\s*\\S)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.type.annotation.js',
              },
            },
            end: '(?<![:|&])(?=$|^|[{};,]|//)',
            patterns: [
              {
                include: '#return-type-core',
              },
            ],
          },
          {
            name: 'meta.return.type.js',
            begin: '(?<=\\))\\s*(:)',
            beginCaptures: {
              '1': {
                name: 'keyword.operator.type.annotation.js',
              },
            },
            end: '(?<![:|&])((?=[{};,]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))',
            patterns: [
              {
                include: '#return-type-core',
              },
            ],
          },
        ],
      },
      'return-type-core': {
        patterns: [
          {
            include: '#comment',
          },
          {
            begin: '(?<=[:|&])(?=\\s*\\{)',
            end: '(?<=\\})',
            patterns: [
              {
                include: '#type-object',
              },
            ],
          },
          {
            include: '#type-predicate-operator',
          },
          {
            include: '#type',
          },
        ],
      },
      'arrow-return-type': {
        name: 'meta.return.type.arrow.js',
        begin: '(?<=\\))\\s*(:)',
        beginCaptures: {
          '1': {
            name: 'keyword.operator.type.annotation.js',
          },
        },
        end: '(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))',
        patterns: [
          {
            include: '#arrow-return-type-body',
          },
        ],
      },
      'possibly-arrow-return-type': {
        begin:
          '(?<=\\)|^)\\s*(:)(?=\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*=>)',
        beginCaptures: {
          '1': {
            name: 'meta.arrow.js meta.return.type.arrow.js keyword.operator.type.annotation.js',
          },
        },
        end: '(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))',
        contentName: 'meta.arrow.js meta.return.type.arrow.js',
        patterns: [
          {
            include: '#arrow-return-type-body',
          },
        ],
      },
      'arrow-return-type-body': {
        patterns: [
          {
            begin: '(?<=[:])(?=\\s*\\{)',
            end: '(?<=\\})',
            patterns: [
              {
                include: '#type-object',
              },
            ],
          },
          {
            include: '#type-predicate-operator',
          },
          {
            include: '#type',
          },
        ],
      },
      'type-parameters': {
        name: 'meta.type.parameters.js',
        begin: '(<)',
        beginCaptures: {
          '1': {
            name: 'punctuation.definition.typeparameters.begin.js',
          },
        },
        end: '(>)',
        endCaptures: {
          '1': {
            name: 'punctuation.definition.typeparameters.end.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            name: 'storage.modifier.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends|in|out|const)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            include: '#type',
          },
          {
            include: '#punctuation-comma',
          },
          {
            name: 'keyword.operator.assignment.js',
            match: '(=)(?!>)',
          },
        ],
      },
      'type-arguments': {
        name: 'meta.type.parameters.js',
        begin: '\\<',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.typeparameters.begin.js',
          },
        },
        end: '\\>',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.typeparameters.end.js',
          },
        },
        patterns: [
          {
            include: '#type-arguments-body',
          },
        ],
      },
      'type-arguments-body': {
        patterns: [
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(_)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            captures: {
              '0': {
                name: 'keyword.operator.type.js',
              },
            },
          },
          {
            include: '#type',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      type: {
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#type-string',
          },
          {
            include: '#numeric-literal',
          },
          {
            include: '#type-primitive',
          },
          {
            include: '#type-builtin-literals',
          },
          {
            include: '#type-parameters',
          },
          {
            include: '#type-tuple',
          },
          {
            include: '#type-object',
          },
          {
            include: '#type-operators',
          },
          {
            include: '#type-conditional',
          },
          {
            include: '#type-fn-type-parameters',
          },
          {
            include: '#type-paren-or-function-parameters',
          },
          {
            include: '#type-function-return-type',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
            },
          },
          {
            include: '#type-name',
          },
        ],
      },
      'type-primitive': {
        name: 'support.type.primitive.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(string|number|bigint|boolean|symbol|any|void|never|unknown)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'type-builtin-literals': {
        name: 'support.type.builtin.js',
        match:
          '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(this|true|false|undefined|null|object)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
      },
      'type-tuple': {
        name: 'meta.type.tuple.js',
        begin: '\\[',
        beginCaptures: {
          '0': {
            name: 'meta.brace.square.js',
          },
        },
        end: '\\]',
        endCaptures: {
          '0': {
            name: 'meta.brace.square.js',
          },
        },
        patterns: [
          {
            name: 'keyword.operator.rest.js',
            match: '\\.\\.\\.',
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\?)?\\s*(:)',
            captures: {
              '1': {
                name: 'entity.name.label.js',
              },
              '2': {
                name: 'keyword.operator.optional.js',
              },
              '3': {
                name: 'punctuation.separator.label.js',
              },
            },
          },
          {
            include: '#type',
          },
          {
            include: '#punctuation-comma',
          },
        ],
      },
      'type-object': {
        name: 'meta.object.type.js',
        begin: '\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#method-declaration',
          },
          {
            include: '#indexer-declaration',
          },
          {
            include: '#indexer-mapped-type-declaration',
          },
          {
            include: '#field-declaration',
          },
          {
            include: '#type-annotation',
          },
          {
            begin: '\\.\\.\\.',
            beginCaptures: {
              '0': {
                name: 'keyword.operator.spread.js',
              },
            },
            end: '(?=\\}|;|,|$)|(?<=\\})',
            patterns: [
              {
                include: '#type',
              },
            ],
          },
          {
            include: '#punctuation-comma',
          },
          {
            include: '#punctuation-semicolon',
          },
          {
            include: '#type',
          },
        ],
      },
      'type-conditional': {
        patterns: [
          {
            begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends)\\s+',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.js',
              },
            },
            end: '(?<=:)',
            patterns: [
              {
                begin: '\\?',
                beginCaptures: {
                  '0': {
                    name: 'keyword.operator.ternary.js',
                  },
                },
                end: ':',
                endCaptures: {
                  '0': {
                    name: 'keyword.operator.ternary.js',
                  },
                },
                patterns: [
                  {
                    include: '#type',
                  },
                ],
              },
              {
                include: '#type',
              },
            ],
          },
        ],
      },
      'type-paren-or-function-parameters': {
        name: 'meta.type.paren.cover.js',
        begin: '\\(',
        beginCaptures: {
          '0': {
            name: 'meta.brace.round.js',
          },
        },
        end: '\\)',
        endCaptures: {
          '0': {
            name: 'meta.brace.round.js',
          },
        },
        patterns: [
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=\\s*(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))))',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'entity.name.function.js variable.language.this.js',
              },
              '4': {
                name: 'entity.name.function.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
          {
            match:
              '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=:)',
            captures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.operator.rest.js',
              },
              '3': {
                name: 'variable.parameter.js variable.language.this.js',
              },
              '4': {
                name: 'variable.parameter.js',
              },
              '5': {
                name: 'keyword.operator.optional.js',
              },
            },
          },
          {
            include: '#type-annotation',
          },
          {
            name: 'punctuation.separator.parameter.js',
            match: ',',
          },
          {
            include: '#type',
          },
        ],
      },
      'type-fn-type-parameters': {
        patterns: [
          {
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b(?=\\s*\\<)',
            beginCaptures: {
              '1': {
                name: 'meta.type.constructor.js storage.modifier.js',
              },
              '2': {
                name: 'meta.type.constructor.js keyword.control.new.js',
              },
            },
            end: '(?<=>)',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#type-parameters',
              },
            ],
          },
          {
            name: 'meta.type.constructor.js',
            begin:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b\\s*(?=\\()',
            beginCaptures: {
              '1': {
                name: 'storage.modifier.js',
              },
              '2': {
                name: 'keyword.control.new.js',
              },
            },
            end: '(?<=\\))',
            patterns: [
              {
                include: '#function-parameters',
              },
            ],
          },
          {
            name: 'meta.type.function.js',
            begin:
              '(?x)(\n  (?=\n    [(]\\s*(\n      ([)]) |\n      (\\.\\.\\.) |\n      ([_$[:alnum:]]+\\s*(\n        ([:,?=])|\n        ([)]\\s*=>)\n      ))\n    )\n  )\n)',
            end: '(?<=\\))',
            patterns: [
              {
                include: '#function-parameters',
              },
            ],
          },
        ],
      },
      'type-function-return-type': {
        patterns: [
          {
            name: 'meta.type.function.return.js',
            begin: '(=>)(?=\\s*\\S)',
            beginCaptures: {
              '1': {
                name: 'storage.type.function.arrow.js',
              },
            },
            end: '(?<!=>)(?<![|&])(?=[,\\]\\)\\{\\}=;>:\\?]|//|$)',
            patterns: [
              {
                include: '#type-function-return-type-core',
              },
            ],
          },
          {
            name: 'meta.type.function.return.js',
            begin: '=>',
            beginCaptures: {
              '0': {
                name: 'storage.type.function.arrow.js',
              },
            },
            end: '(?<!=>)(?<![|&])((?=[,\\]\\)\\{\\}=;:\\?>]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))',
            patterns: [
              {
                include: '#type-function-return-type-core',
              },
            ],
          },
        ],
      },
      'type-function-return-type-core': {
        patterns: [
          {
            include: '#comment',
          },
          {
            begin: '(?<==>)(?=\\s*\\{)',
            end: '(?<=\\})',
            patterns: [
              {
                include: '#type-object',
              },
            ],
          },
          {
            include: '#type-predicate-operator',
          },
          {
            include: '#type',
          },
        ],
      },
      'type-operators': {
        patterns: [
          {
            include: '#typeof-operator',
          },
          {
            include: '#type-infer',
          },
          {
            begin: '([&|])(?=\\s*\\{)',
            beginCaptures: {
              '0': {
                name: 'keyword.operator.type.js',
              },
            },
            end: '(?<=\\})',
            patterns: [
              {
                include: '#type-object',
              },
            ],
          },
          {
            begin: '[&|]',
            beginCaptures: {
              '0': {
                name: 'keyword.operator.type.js',
              },
            },
            end: '(?=\\S)',
          },
          {
            name: 'keyword.operator.expression.keyof.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))keyof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.operator.ternary.js',
            match: '(\\?|\\:)',
          },
          {
            name: 'keyword.operator.expression.import.js',
            match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*\\()',
          },
        ],
      },
      'type-infer': {
        patterns: [
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(infer)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s+(extends)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))?',
            name: 'meta.type.infer.js',
            captures: {
              '1': {
                name: 'keyword.operator.expression.infer.js',
              },
              '2': {
                name: 'entity.name.type.js',
              },
              '3': {
                name: 'keyword.operator.expression.extends.js',
              },
            },
          },
        ],
      },
      'type-predicate-operator': {
        patterns: [
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(asserts)\\s+)?(?!asserts)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s(is)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            captures: {
              '1': {
                name: 'keyword.operator.type.asserts.js',
              },
              '2': {
                name: 'variable.parameter.js variable.language.this.js',
              },
              '3': {
                name: 'variable.parameter.js',
              },
              '4': {
                name: 'keyword.operator.expression.is.js',
              },
            },
          },
          {
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(asserts)\\s+(?!is)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
            captures: {
              '1': {
                name: 'keyword.operator.type.asserts.js',
              },
              '2': {
                name: 'variable.parameter.js variable.language.this.js',
              },
              '3': {
                name: 'variable.parameter.js',
              },
            },
          },
          {
            name: 'keyword.operator.type.asserts.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))asserts(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
          {
            name: 'keyword.operator.expression.is.js',
            match:
              '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))is(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          },
        ],
      },
      'type-name': {
        patterns: [
          {
            begin: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(<)',
            captures: {
              '1': {
                name: 'entity.name.type.module.js',
              },
              '2': {
                name: 'punctuation.accessor.js',
              },
              '3': {
                name: 'punctuation.accessor.optional.js',
              },
              '4': {
                name: 'meta.type.parameters.js punctuation.definition.typeparameters.begin.js',
              },
            },
            end: '(>)',
            endCaptures: {
              '1': {
                name: 'meta.type.parameters.js punctuation.definition.typeparameters.end.js',
              },
            },
            contentName: 'meta.type.parameters.js',
            patterns: [
              {
                include: '#type-arguments-body',
              },
            ],
          },
          {
            begin: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(<)',
            beginCaptures: {
              '1': {
                name: 'entity.name.type.js',
              },
              '2': {
                name: 'meta.type.parameters.js punctuation.definition.typeparameters.begin.js',
              },
            },
            end: '(>)',
            endCaptures: {
              '1': {
                name: 'meta.type.parameters.js punctuation.definition.typeparameters.end.js',
              },
            },
            contentName: 'meta.type.parameters.js',
            patterns: [
              {
                include: '#type-arguments-body',
              },
            ],
          },
          {
            match: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))',
            captures: {
              '1': {
                name: 'entity.name.type.module.js',
              },
              '2': {
                name: 'punctuation.accessor.js',
              },
              '3': {
                name: 'punctuation.accessor.optional.js',
              },
            },
          },
          {
            name: 'entity.name.type.js',
            match: '[_$[:alpha:]][_$[:alnum:]]*',
          },
        ],
      },
      'punctuation-comma': {
        name: 'punctuation.separator.comma.js',
        match: ',',
      },
      'punctuation-semicolon': {
        name: 'punctuation.terminator.statement.js',
        match: ';',
      },
      'punctuation-accessor': {
        match: '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))',
        captures: {
          '1': {
            name: 'punctuation.accessor.js',
          },
          '2': {
            name: 'punctuation.accessor.optional.js',
          },
        },
      },
      string: {
        patterns: [
          {
            include: '#qstring-single',
          },
          {
            include: '#qstring-double',
          },
          {
            include: '#template',
          },
        ],
      },
      'qstring-double': {
        name: 'string.quoted.double.js',
        begin: '"',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.string.begin.js',
          },
        },
        end: '(")|((?:[^\\\\\\n])$)',
        endCaptures: {
          '1': {
            name: 'punctuation.definition.string.end.js',
          },
          '2': {
            name: 'invalid.illegal.newline.js',
          },
        },
        patterns: [
          {
            include: '#string-character-escape',
          },
        ],
      },
      'qstring-single': {
        name: 'string.quoted.single.js',
        begin: "'",
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.string.begin.js',
          },
        },
        end: "(\\')|((?:[^\\\\\\n])$)",
        endCaptures: {
          '1': {
            name: 'punctuation.definition.string.end.js',
          },
          '2': {
            name: 'invalid.illegal.newline.js',
          },
        },
        patterns: [
          {
            include: '#string-character-escape',
          },
        ],
      },
      'string-character-escape': {
        name: 'constant.character.escape.js',
        match:
          '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|u\\{[0-9A-Fa-f]+\\}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)',
      },
      template: {
        patterns: [
          {
            include: '#template-call',
          },
          {
            contentName: 'string.template.js',
            begin: '([_$[:alpha:]][_$[:alnum:]]*)?(`)',
            beginCaptures: {
              '1': {
                name: 'entity.name.function.tagged-template.js',
              },
              '2': {
                name: 'string.template.js punctuation.definition.string.template.begin.js',
              },
            },
            end: '`',
            endCaptures: {
              '0': {
                name: 'string.template.js punctuation.definition.string.template.end.js',
              },
            },
            patterns: [
              {
                include: '#template-substitution-element',
              },
              {
                include: '#string-character-escape',
              },
            ],
          },
        ],
      },
      'template-call': {
        patterns: [
          {
            begin:
              '(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*)(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)',
            end: '(?=`)',
            patterns: [
              {
                begin:
                  '(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*))',
                end: '(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)',
                patterns: [
                  {
                    include: '#support-function-call-identifiers',
                  },
                  {
                    name: 'entity.name.function.tagged-template.js',
                    match: '([_$[:alpha:]][_$[:alnum:]]*)',
                  },
                ],
              },
              {
                include: '#type-arguments',
              },
            ],
          },
          {
            begin:
              '([_$[:alpha:]][_$[:alnum:]]*)?\\s*(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)`)',
            beginCaptures: {
              '1': {
                name: 'entity.name.function.tagged-template.js',
              },
            },
            end: '(?=`)',
            patterns: [
              {
                include: '#type-arguments',
              },
            ],
          },
        ],
      },
      'template-substitution-element': {
        name: 'meta.template.expression.js',
        begin: '\\$\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.template-expression.begin.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.template-expression.end.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
        ],
        contentName: 'meta.embedded.line.js',
      },
      'type-string': {
        patterns: [
          {
            include: '#qstring-single',
          },
          {
            include: '#qstring-double',
          },
          {
            include: '#template-type',
          },
        ],
      },
      'template-type': {
        patterns: [
          {
            include: '#template-call',
          },
          {
            contentName: 'string.template.js',
            begin: '([_$[:alpha:]][_$[:alnum:]]*)?(`)',
            beginCaptures: {
              '1': {
                name: 'entity.name.function.tagged-template.js',
              },
              '2': {
                name: 'string.template.js punctuation.definition.string.template.begin.js',
              },
            },
            end: '`',
            endCaptures: {
              '0': {
                name: 'string.template.js punctuation.definition.string.template.end.js',
              },
            },
            patterns: [
              {
                include: '#template-type-substitution-element',
              },
              {
                include: '#string-character-escape',
              },
            ],
          },
        ],
      },
      'template-type-substitution-element': {
        name: 'meta.template.expression.js',
        begin: '\\$\\{',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.template-expression.begin.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.template-expression.end.js',
          },
        },
        patterns: [
          {
            include: '#type',
          },
        ],
        contentName: 'meta.embedded.line.js',
      },
      regex: {
        patterns: [
          {
            name: 'string.regexp.js',
            begin:
              '(?<!\\+\\+|--|})(?<=[=(:,\\[?+!]|^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case|=>|&&|\\|\\||\\*\\/)\\s*(\\/)(?![\\/*])(?=(?:[^\\/\\\\\\[\\()]|\\\\.|\\[([^\\]\\\\]|\\\\.)+\\]|\\(([^\\)\\\\]|\\\\.)+\\))+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.string.begin.js',
              },
            },
            end: '(/)([dgimsuvy]*)',
            endCaptures: {
              '1': {
                name: 'punctuation.definition.string.end.js',
              },
              '2': {
                name: 'keyword.other.js',
              },
            },
            patterns: [
              {
                include: '#regexp',
              },
            ],
          },
          {
            name: 'string.regexp.js',
            begin:
              '((?<![_$[:alnum:])\\]]|\\+\\+|--|}|\\*\\/)|((?<=^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case))\\s*)\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.string.begin.js',
              },
            },
            end: '(/)([dgimsuvy]*)',
            endCaptures: {
              '1': {
                name: 'punctuation.definition.string.end.js',
              },
              '2': {
                name: 'keyword.other.js',
              },
            },
            patterns: [
              {
                include: '#regexp',
              },
            ],
          },
        ],
      },
      regexp: {
        patterns: [
          {
            name: 'keyword.control.anchor.regexp',
            match: '\\\\[bB]|\\^|\\$',
          },
          {
            match: '\\\\[1-9]\\d*|\\\\k<([a-zA-Z_$][\\w$]*)>',
            captures: {
              '0': {
                name: 'keyword.other.back-reference.regexp',
              },
              '1': {
                name: 'variable.other.regexp',
              },
            },
          },
          {
            name: 'keyword.operator.quantifier.regexp',
            match: '[?+*]|\\{(\\d+,\\d+|\\d+,|,\\d+|\\d+)\\}\\??',
          },
          {
            name: 'keyword.operator.or.regexp',
            match: '\\|',
          },
          {
            name: 'meta.group.assertion.regexp',
            begin: '(\\()((\\?=)|(\\?!)|(\\?<=)|(\\?<!))',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.group.regexp',
              },
              '2': {
                name: 'punctuation.definition.group.assertion.regexp',
              },
              '3': {
                name: 'meta.assertion.look-ahead.regexp',
              },
              '4': {
                name: 'meta.assertion.negative-look-ahead.regexp',
              },
              '5': {
                name: 'meta.assertion.look-behind.regexp',
              },
              '6': {
                name: 'meta.assertion.negative-look-behind.regexp',
              },
            },
            end: '(\\))',
            endCaptures: {
              '1': {
                name: 'punctuation.definition.group.regexp',
              },
            },
            patterns: [
              {
                include: '#regexp',
              },
            ],
          },
          {
            name: 'meta.group.regexp',
            begin: '\\((?:(\\?:)|(?:\\?<([a-zA-Z_$][\\w$]*)>))?',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.group.regexp',
              },
              '1': {
                name: 'punctuation.definition.group.no-capture.regexp',
              },
              '2': {
                name: 'variable.other.regexp',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.group.regexp',
              },
            },
            patterns: [
              {
                include: '#regexp',
              },
            ],
          },
          {
            name: 'constant.other.character-class.set.regexp',
            begin: '(\\[)(\\^)?',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.character-class.regexp',
              },
              '2': {
                name: 'keyword.operator.negation.regexp',
              },
            },
            end: '(\\])',
            endCaptures: {
              '1': {
                name: 'punctuation.definition.character-class.regexp',
              },
            },
            patterns: [
              {
                name: 'constant.other.character-class.range.regexp',
                match:
                  '(?:.|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))\\-(?:[^\\]\\\\]|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))',
                captures: {
                  '1': {
                    name: 'constant.character.numeric.regexp',
                  },
                  '2': {
                    name: 'constant.character.control.regexp',
                  },
                  '3': {
                    name: 'constant.character.escape.backslash.regexp',
                  },
                  '4': {
                    name: 'constant.character.numeric.regexp',
                  },
                  '5': {
                    name: 'constant.character.control.regexp',
                  },
                  '6': {
                    name: 'constant.character.escape.backslash.regexp',
                  },
                },
              },
              {
                include: '#regex-character-class',
              },
            ],
          },
          {
            include: '#regex-character-class',
          },
        ],
      },
      'regex-character-class': {
        patterns: [
          {
            name: 'constant.other.character-class.regexp',
            match: '\\\\[wWsSdDtrnvf]|\\.',
          },
          {
            name: 'constant.character.numeric.regexp',
            match: '\\\\([0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})',
          },
          {
            name: 'constant.character.control.regexp',
            match: '\\\\c[A-Z]',
          },
          {
            name: 'constant.character.escape.backslash.regexp',
            match: '\\\\.',
          },
        ],
      },
      comment: {
        patterns: [
          {
            name: 'comment.block.documentation.js',
            begin: '/\\*\\*(?!/)',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.comment.js',
              },
            },
            end: '\\*/',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.comment.js',
              },
            },
            patterns: [
              {
                include: '#docblock',
              },
            ],
          },
          {
            name: 'comment.block.js',
            begin: '(/\\*)(?:\\s*((@)internal)(?=\\s|(\\*/)))?',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.comment.js',
              },
              '2': {
                name: 'storage.type.internaldeclaration.js',
              },
              '3': {
                name: 'punctuation.decorator.internaldeclaration.js',
              },
            },
            end: '\\*/',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.comment.js',
              },
            },
          },
          {
            begin: '(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)',
            beginCaptures: {
              '1': {
                name: 'punctuation.whitespace.comment.leading.js',
              },
              '2': {
                name: 'comment.line.double-slash.js',
              },
              '3': {
                name: 'punctuation.definition.comment.js',
              },
              '4': {
                name: 'storage.type.internaldeclaration.js',
              },
              '5': {
                name: 'punctuation.decorator.internaldeclaration.js',
              },
            },
            end: '(?=$)',
            contentName: 'comment.line.double-slash.js',
          },
        ],
      },
      'single-line-comment-consuming-line-ending': {
        begin: '(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)',
        beginCaptures: {
          '1': {
            name: 'punctuation.whitespace.comment.leading.js',
          },
          '2': {
            name: 'comment.line.double-slash.js',
          },
          '3': {
            name: 'punctuation.definition.comment.js',
          },
          '4': {
            name: 'storage.type.internaldeclaration.js',
          },
          '5': {
            name: 'punctuation.decorator.internaldeclaration.js',
          },
        },
        end: '(?=^)',
        contentName: 'comment.line.double-slash.js',
      },
      directives: {
        name: 'comment.line.triple-slash.directive.js',
        begin:
          '^(///)\\s*(?=<(reference|amd-dependency|amd-module)(\\s+(path|types|no-default-lib|lib|name|resolution-mode)\\s*=\\s*((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))+\\s*/>\\s*$)',
        beginCaptures: {
          '1': {
            name: 'punctuation.definition.comment.js',
          },
        },
        end: '(?=$)',
        patterns: [
          {
            name: 'meta.tag.js',
            begin: '(<)(reference|amd-dependency|amd-module)',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.tag.directive.js',
              },
              '2': {
                name: 'entity.name.tag.directive.js',
              },
            },
            end: '/>',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.tag.directive.js',
              },
            },
            patterns: [
              {
                name: 'entity.other.attribute-name.directive.js',
                match: 'path|types|no-default-lib|lib|name|resolution-mode',
              },
              {
                name: 'keyword.operator.assignment.js',
                match: '=',
              },
              {
                include: '#string',
              },
            ],
          },
        ],
      },
      docblock: {
        patterns: [
          {
            match: '(?x)\n((@)(?:access|api))\n\\s+\n(private|protected|public)\n\\b',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'constant.language.access-type.jsdoc',
              },
            },
          },
          {
            match:
              '(?x)\n((@)author)\n\\s+\n(\n  [^@\\s<>*/]\n  (?:[^@<>*/]|\\*[^/])*\n)\n(?:\n  \\s*\n  (<)\n  ([^>\\s]+)\n  (>)\n)?',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'entity.name.type.instance.jsdoc',
              },
              '4': {
                name: 'punctuation.definition.bracket.angle.begin.jsdoc',
              },
              '5': {
                name: 'constant.other.email.link.underline.jsdoc',
              },
              '6': {
                name: 'punctuation.definition.bracket.angle.end.jsdoc',
              },
            },
          },
          {
            match:
              '(?x)\n((@)borrows) \\s+\n((?:[^@\\s*/]|\\*[^/])+)    # <that namepath>\n\\s+ (as) \\s+              # as\n((?:[^@\\s*/]|\\*[^/])+)    # <this namepath>',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'entity.name.type.instance.jsdoc',
              },
              '4': {
                name: 'keyword.operator.control.jsdoc',
              },
              '5': {
                name: 'entity.name.type.instance.jsdoc',
              },
            },
          },
          {
            name: 'meta.example.jsdoc',
            begin: '((@)example)\\s+',
            end: '(?=@|\\*/)',
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
            patterns: [
              {
                match: '^\\s\\*\\s+',
              },
              {
                contentName: 'constant.other.description.jsdoc',
                begin: '\\G(<)caption(>)',
                beginCaptures: {
                  '0': {
                    name: 'entity.name.tag.inline.jsdoc',
                  },
                  '1': {
                    name: 'punctuation.definition.bracket.angle.begin.jsdoc',
                  },
                  '2': {
                    name: 'punctuation.definition.bracket.angle.end.jsdoc',
                  },
                },
                end: '(</)caption(>)|(?=\\*/)',
                endCaptures: {
                  '0': {
                    name: 'entity.name.tag.inline.jsdoc',
                  },
                  '1': {
                    name: 'punctuation.definition.bracket.angle.begin.jsdoc',
                  },
                  '2': {
                    name: 'punctuation.definition.bracket.angle.end.jsdoc',
                  },
                },
              },
              {
                match: '[^\\s@*](?:[^*]|\\*[^/])*',
                captures: {
                  '0': {
                    name: 'source.embedded.js',
                  },
                },
              },
            ],
          },
          {
            match:
              '(?x) ((@)kind) \\s+ (class|constant|event|external|file|function|member|mixin|module|namespace|typedef) \\b',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'constant.language.symbol-type.jsdoc',
              },
            },
          },
          {
            match:
              '(?x)\n((@)see)\n\\s+\n(?:\n  # URL\n  (\n    (?=https?://)\n    (?:[^\\s*]|\\*[^/])+\n  )\n  |\n  # JSDoc namepath\n  (\n    (?!\n      # Avoid matching bare URIs (also acceptable as links)\n      https?://\n      |\n      # Avoid matching {@inline tags}; we match those below\n      (?:\\[[^\\[\\]]*\\])? # Possible description [preceding]{@tag}\n      {@(?:link|linkcode|linkplain|tutorial)\\b\n    )\n    # Matched namepath\n    (?:[^@\\s*/]|\\*[^/])+\n  )\n)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'variable.other.link.underline.jsdoc',
              },
              '4': {
                name: 'entity.name.type.instance.jsdoc',
              },
            },
          },
          {
            match:
              '(?x)\n((@)template)\n\\s+\n# One or more valid identifiers\n(\n  [A-Za-z_$]         # First character: non-numeric word character\n  [\\w$.\\[\\]]*        # Rest of identifier\n  (?:                # Possible list of additional identifiers\n    \\s* , \\s*\n    [A-Za-z_$]\n    [\\w$.\\[\\]]*\n  )*\n)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'variable.other.jsdoc',
              },
            },
          },
          {
            begin: '(?x)((@)template)\\s+(?={)',
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
            end: '(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])',
            patterns: [
              {
                include: '#jsdoctype',
              },
              {
                name: 'variable.other.jsdoc',
                match: '([A-Za-z_$][\\w$.\\[\\]]*)',
              },
            ],
          },
          {
            match:
              '(?x)\n(\n  (@)\n  (?:arg|argument|const|constant|member|namespace|param|var)\n)\n\\s+\n(\n  [A-Za-z_$]\n  [\\w$.\\[\\]]*\n)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'variable.other.jsdoc',
              },
            },
          },
          {
            begin: '((@)typedef)\\s+(?={)',
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
            end: '(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])',
            patterns: [
              {
                include: '#jsdoctype',
              },
              {
                name: 'entity.name.type.instance.jsdoc',
                match: '(?:[^@\\s*/]|\\*[^/])+',
              },
            ],
          },
          {
            begin:
              '((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\\s+(?={)',
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
            end: '(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])',
            patterns: [
              {
                include: '#jsdoctype',
              },
              {
                name: 'variable.other.jsdoc',
                match: '([A-Za-z_$][\\w$.\\[\\]]*)',
              },
              {
                name: 'variable.other.jsdoc',
                match:
                  '(?x)\n(\\[)\\s*\n[\\w$]+\n(?:\n  (?:\\[\\])?                                        # Foo[ ].bar properties within an array\n  \\.                                                # Foo.Bar namespaced parameter\n  [\\w$]+\n)*\n(?:\n  \\s*\n  (=)                                                # [foo=bar] Default parameter value\n  \\s*\n  (\n    # The inner regexes are to stop the match early at */ and to not stop at escaped quotes\n    (?>\n      "(?:(?:\\*(?!/))|(?:\\\\(?!"))|[^*\\\\])*?" |                      # [foo="bar"] Double-quoted\n      \'(?:(?:\\*(?!/))|(?:\\\\(?!\'))|[^*\\\\])*?\' |                      # [foo=\'bar\'] Single-quoted\n      \\[ (?:(?:\\*(?!/))|[^*])*? \\] |                                # [foo=[1,2]] Array literal\n      (?:(?:\\*(?!/))|\\s(?!\\s*\\])|\\[.*?(?:\\]|(?=\\*/))|[^*\\s\\[\\]])*   # Everything else\n    )*\n  )\n)?\n\\s*(?:(\\])((?:[^*\\s]|\\*[^\\s/])+)?|(?=\\*/))',
                captures: {
                  '1': {
                    name: 'punctuation.definition.optional-value.begin.bracket.square.jsdoc',
                  },
                  '2': {
                    name: 'keyword.operator.assignment.jsdoc',
                  },
                  '3': {
                    name: 'source.embedded.js',
                  },
                  '4': {
                    name: 'punctuation.definition.optional-value.end.bracket.square.jsdoc',
                  },
                  '5': {
                    name: 'invalid.illegal.syntax.jsdoc',
                  },
                },
              },
            ],
          },
          {
            begin:
              '(?x)\n(\n  (@)\n  (?:define|enum|exception|export|extends|lends|implements|modifies\n  |namespace|private|protected|returns?|satisfies|suppress|this|throws|type\n  |yields?)\n)\n\\s+(?={)',
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
            end: '(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])',
            patterns: [
              {
                include: '#jsdoctype',
              },
            ],
          },
          {
            match:
              '(?x)\n(\n  (@)\n  (?:alias|augments|callback|constructs|emits|event|fires|exports?\n  |extends|external|function|func|host|lends|listens|interface|memberof!?\n  |method|module|mixes|mixin|name|requires|see|this|typedef|uses)\n)\n\\s+\n(\n  (?:\n    [^{}@\\s*] | \\*[^/]\n  )+\n)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'entity.name.type.instance.jsdoc',
              },
            },
          },
          {
            contentName: 'variable.other.jsdoc',
            begin: "((@)(?:default(?:value)?|license|version))\\s+(([''\"]))",
            beginCaptures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'variable.other.jsdoc',
              },
              '4': {
                name: 'punctuation.definition.string.begin.jsdoc',
              },
            },
            end: '(\\3)|(?=$|\\*/)',
            endCaptures: {
              '0': {
                name: 'variable.other.jsdoc',
              },
              '1': {
                name: 'punctuation.definition.string.end.jsdoc',
              },
            },
          },
          {
            match: '((@)(?:default(?:value)?|license|tutorial|variation|version))\\s+([^\\s*]+)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
              '3': {
                name: 'variable.other.jsdoc',
              },
            },
          },
          {
            name: 'storage.type.class.jsdoc',
            match:
              '(?x) (@) (?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles |callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright |default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception |exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func |function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc |inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method |mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects |override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected |public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary |suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation |version|virtual|writeOnce|yields?) \\b',
            captures: {
              '1': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
          },
          {
            include: '#inline-tags',
          },
          {
            match: '((@)(?:[_$[:alpha:]][_$[:alnum:]]*))(?=\\s+)',
            captures: {
              '1': {
                name: 'storage.type.class.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.block.tag.jsdoc',
              },
            },
          },
        ],
      },
      brackets: {
        patterns: [
          {
            begin: '{',
            end: '}|(?=\\*/)',
            patterns: [
              {
                include: '#brackets',
              },
            ],
          },
          {
            begin: '\\[',
            end: '\\]|(?=\\*/)',
            patterns: [
              {
                include: '#brackets',
              },
            ],
          },
        ],
      },
      'inline-tags': {
        patterns: [
          {
            name: 'constant.other.description.jsdoc',
            match: '(\\[)[^\\]]+(\\])(?={@(?:link|linkcode|linkplain|tutorial))',
            captures: {
              '1': {
                name: 'punctuation.definition.bracket.square.begin.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.bracket.square.end.jsdoc',
              },
            },
          },
          {
            name: 'entity.name.type.instance.jsdoc',
            begin: '({)((@)(?:link(?:code|plain)?|tutorial))\\s*',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.bracket.curly.begin.jsdoc',
              },
              '2': {
                name: 'storage.type.class.jsdoc',
              },
              '3': {
                name: 'punctuation.definition.inline.tag.jsdoc',
              },
            },
            end: '}|(?=\\*/)',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.bracket.curly.end.jsdoc',
              },
            },
            patterns: [
              {
                match: '\\G((?=https?://)(?:[^|}\\s*]|\\*[/])+)(\\|)?',
                captures: {
                  '1': {
                    name: 'variable.other.link.underline.jsdoc',
                  },
                  '2': {
                    name: 'punctuation.separator.pipe.jsdoc',
                  },
                },
              },
              {
                match: '\\G((?:[^{}@\\s|*]|\\*[^/])+)(\\|)?',
                captures: {
                  '1': {
                    name: 'variable.other.description.jsdoc',
                  },
                  '2': {
                    name: 'punctuation.separator.pipe.jsdoc',
                  },
                },
              },
            ],
          },
        ],
      },
      jsdoctype: {
        patterns: [
          {
            contentName: 'entity.name.type.instance.jsdoc',
            begin: '\\G({)',
            beginCaptures: {
              '0': {
                name: 'entity.name.type.instance.jsdoc',
              },
              '1': {
                name: 'punctuation.definition.bracket.curly.begin.jsdoc',
              },
            },
            end: '((}))\\s*|(?=\\*/)',
            endCaptures: {
              '1': {
                name: 'entity.name.type.instance.jsdoc',
              },
              '2': {
                name: 'punctuation.definition.bracket.curly.end.jsdoc',
              },
            },
            patterns: [
              {
                include: '#brackets',
              },
            ],
          },
        ],
      },
      jsx: {
        patterns: [
          {
            include: '#jsx-tag-style',
          },
          {
            include: '#jsx-tag-without-attributes',
          },
          {
            include: '#jsx-tag',
          },
        ],
      },
      'jsx-tag-without-attributes-in-expression': {
        begin:
          '(?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?![sS][tT][yY][lL][eE]\\b)(?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))?\\s*(>))',
        end: '(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?![sS][tT][yY][lL][eE]\\b)(?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))?\\s*(>))',
        patterns: [
          {
            include: '#jsx-tag-without-attributes',
          },
        ],
      },
      'jsx-tag-without-attributes': {
        name: 'meta.tag.without-attributes.js',
        begin:
          '(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))?\\s*(>)',
        end: '(</)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))?\\s*(>)',
        beginCaptures: {
          '1': {
            name: 'punctuation.definition.tag.begin.js',
          },
          '2': {
            name: 'entity.name.tag.namespace.js',
          },
          '3': {
            name: 'punctuation.separator.namespace.js',
          },
          '4': {
            name: 'entity.name.tag.js',
          },
          '5': {
            name: 'support.class.component.js',
          },
          '6': {
            name: 'punctuation.definition.tag.end.js',
          },
        },
        endCaptures: {
          '1': {
            name: 'punctuation.definition.tag.begin.js',
          },
          '2': {
            name: 'entity.name.tag.namespace.js',
          },
          '3': {
            name: 'punctuation.separator.namespace.js',
          },
          '4': {
            name: 'entity.name.tag.js',
          },
          '5': {
            name: 'support.class.component.js',
          },
          '6': {
            name: 'punctuation.definition.tag.end.js',
          },
        },
        contentName: 'meta.jsx.children.js',
        patterns: [
          {
            include: '#jsx-children',
          },
        ],
      },
      'jsx-tag-in-expression': {
        begin:
          '(?x)\n  (?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*\n  (?!<\\s*[_$[:alpha:]][_$[:alnum:]]*((\\s+extends\\s+[^=>])|,)) # look ahead is not type parameter of arrow\n  (?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?![sS][tT][yY][lL][eE]\\b)(?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))',
        end: '(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?![sS][tT][yY][lL][eE]\\b)(?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))',
        patterns: [
          {
            include: '#jsx-tag',
          },
        ],
      },
      'jsx-tag-style': {
        name: 'style.tag.js',
        begin: '(<)\\s*(style)\\b(?![^>]*/>)(?=[^>]*>)',
        beginCaptures: {
          '1': {
            name: 'punctuation.definition.tag.begin.js',
          },
          '2': {
            name: 'entity.name.tag.js',
          },
        },
        end: '(</)(style)(>)',
        endCaptures: {
          '1': {
            name: 'punctuation.definition.tag.begin.js',
          },
          '2': {
            name: 'entity.name.tag.js',
          },
          '3': {
            name: 'punctuation.definition.tag.end.js',
          },
        },
        patterns: [
          {
            begin: '(>)',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.tag.end.js',
              },
            },
            end: '(?=</style>)',
            contentName: 'source.css',
            patterns: [
              {
                include: 'source.css',
              },
            ],
          },
          {
            begin: '(?<=<style)(?![^>]*/>)',
            end: '(?=>)',
            patterns: [
              {
                include: '#jsx-tag-attributes',
              },
            ],
          },
        ],
      },
      'jsx-tag': {
        name: 'meta.tag.js',
        begin:
          '(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))',
        end: '(/>)|(?:(</)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))?\\s*(>))',
        endCaptures: {
          '1': {
            name: 'punctuation.definition.tag.end.js',
          },
          '2': {
            name: 'punctuation.definition.tag.begin.js',
          },
          '3': {
            name: 'entity.name.tag.namespace.js',
          },
          '4': {
            name: 'punctuation.separator.namespace.js',
          },
          '5': {
            name: 'entity.name.tag.js',
          },
          '6': {
            name: 'support.class.component.js',
          },
          '7': {
            name: 'punctuation.definition.tag.end.js',
          },
        },
        patterns: [
          {
            begin:
              '(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:(?!children)[a-z][a-z0-9]*|(?:children|(@?[_$[:alpha:]][-_$[:alnum:]]*(?:\\.@?[_$[:alpha:]][-_$[:alnum:]]*)*)))(?<!-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>)',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.tag.begin.js',
              },
              '2': {
                name: 'entity.name.tag.namespace.js',
              },
              '3': {
                name: 'punctuation.separator.namespace.js',
              },
              '4': {
                name: 'entity.name.tag.js',
              },
              '5': {
                name: 'support.class.component.js',
              },
            },
            end: '(?=[/]?>)',
            patterns: [
              {
                include: '#comment',
              },
              {
                include: '#type-arguments',
              },
              {
                include: '#jsx-tag-attributes',
              },
            ],
          },
          {
            begin: '(>)',
            beginCaptures: {
              '1': {
                name: 'punctuation.definition.tag.end.js',
              },
            },
            end: '(?=</)',
            contentName: 'meta.jsx.children.js',
            patterns: [
              {
                include: '#jsx-children',
              },
            ],
          },
        ],
      },
      'jsx-children': {
        patterns: [
          {
            include: '#jsx-evaluated-code',
          },
          {
            include: '#jsx-tag-style',
          },
          {
            include: '#jsx-children-statements',
          },
          {
            include: '#jsx-tag-without-attributes',
          },
          {
            include: '#jsx-tag',
          },
          {
            include: '#jsx-entities',
          },
        ],
      },
      'jsx-children-statements': {
        patterns: [
          {
            begin: '(?=\\w|\\$|//|/\\*)',
            end: '(?=<[a-zA-Z]|</)',
            beginCaptures: {
              '0': {
                name: 'punctuation.section.embedded.begin.ripple-js',
              },
            },
            endCaptures: {
              '0': {
                name: 'punctuation.section.embedded.end.ripple-js',
              },
            },
            contentName: 'source.js.embedded.ripple-isolated',
            patterns: [
              {
                include: '#component-statements',
              },
            ],
          },
        ],
      },
      'jsx-evaluated-code': {
        contentName: 'meta.embedded.expression.js source.js.embedded.ripple',
        begin: '\\{',
        end: '\\}',
        beginCaptures: {
          '0': {
            name: 'punctuation.section.embedded.begin.js',
          },
        },
        endCaptures: {
          '0': {
            name: 'punctuation.section.embedded.end.js',
          },
        },
        patterns: [
          {
            include: '#expression',
          },
        ],
      },
      'jsx-entities': {
        patterns: [
          {
            name: 'constant.character.entity.js',
            match: '(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)',
            captures: {
              '1': {
                name: 'punctuation.definition.entity.js',
              },
              '3': {
                name: 'punctuation.definition.entity.js',
              },
            },
          },
        ],
      },
      'jsx-tag-attributes': {
        name: 'meta.tag.attributes.js',
        begin: '\\s+',
        end: '(?=[/]?>)',
        patterns: [
          {
            include: '#comment',
          },
          {
            include: '#jsx-tag-attribute-name',
          },
          {
            include: '#jsx-tag-attribute-assignment',
          },
          {
            include: '#jsx-string-double-quoted',
          },
          {
            include: '#jsx-string-single-quoted',
          },
          {
            include: '#jsx-evaluated-code',
          },
          {
            include: '#jsx-tag-attributes-illegal',
          },
        ],
      },
      'jsx-tag-attribute-name': {
        match:
          '(?x)\n  \\s*\n  (?:([_$[:alpha:]][-_$[:alnum:].]*)(:))?\n  ([_$[:alpha:]][-_$[:alnum:]]*)\n  (?=\\s|=|/?>|/\\*|//)',
        captures: {
          '1': {
            name: 'entity.other.attribute-name.namespace.js',
          },
          '2': {
            name: 'punctuation.separator.namespace.js',
          },
          '3': {
            name: 'entity.other.attribute-name.js',
          },
        },
      },
      'jsx-tag-attribute-assignment': {
        name: 'keyword.operator.assignment.js',
        match: '=(?=\\s*(?:\'|"|{|/\\*|//|\\n))',
      },
      'jsx-string-double-quoted': {
        name: 'string.quoted.double.js',
        begin: '"',
        end: '"',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.string.begin.js',
          },
        },
        endCaptures: {
          '0': {
            name: 'punctuation.definition.string.end.js',
          },
        },
        patterns: [
          {
            include: '#jsx-entities',
          },
        ],
      },
      'jsx-string-single-quoted': {
        name: 'string.quoted.single.js',
        begin: "'",
        end: "'",
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.string.begin.js',
          },
        },
        endCaptures: {
          '0': {
            name: 'punctuation.definition.string.end.js',
          },
        },
        patterns: [
          {
            include: '#jsx-entities',
          },
        ],
      },
      'server-block': {
        name: 'meta.server-block.js',
        begin: '(#server)\\s*(\\{)',
        beginCaptures: {
          '1': {
            name: 'storage.type.server.js',
          },
          '2': {
            name: 'punctuation.definition.block.js',
          },
        },
        end: '\\}',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.block.js',
          },
        },
        patterns: [
          {
            include: '#statements',
          },
        ],
      },
      'server-member-expression': {
        name: 'meta.server-member-expression.js',
        match: '(#server)(\\.)([_$[:alpha:]][_$[:alnum:]]*)',
        captures: {
          '1': {
            name: 'storage.type.server.js',
          },
          '2': {
            name: 'punctuation.accessor.js',
          },
          '3': {
            name: 'entity.name.function.js',
          },
        },
      },
      'jsx-ref-modifier': {
        name: 'storage.modifier.js',
        match: '\\b(ref)(?=\\s+[_$[:alpha:]])',
        captures: {
          '1': {
            name: 'storage.modifier.js',
          },
        },
      },
      'jsx-tag-attributes-illegal': {
        name: 'invalid.illegal.attribute.js',
        match: '\\S+',
      },
    },
  },

  config: {
    // Note that this file should stay in sync with 'typescript-language-basics/language-configuration.json'
    // onEnterRules cause errors - currently disabled
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['${', '}'],
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      {
        open: '{',
        close: '}',
      },
      {
        open: '[',
        close: ']',
      },
      {
        open: '(',
        close: ')',
      },
      {
        open: "'",
        close: "'",
        notIn: ['string', 'comment'],
      },
      {
        open: '"',
        close: '"',
        notIn: ['string'],
      },
      {
        open: '`',
        close: '`',
        notIn: ['string', 'comment'],
      },
      {
        open: '/**',
        close: ' */',
        notIn: ['string'],
      },
    ],
    surroundingPairs: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ["'", "'"],
      ['"', '"'],
      ['`', '`'],
      ['<', '>'],
    ],
    autoCloseBefore: ';:.,=}])>` \n\t',
    folding: {
      markers: {
        start: '^\\s*//\\s*#?region\\b',
        end: '^\\s*//\\s*#?endregion\\b',
      },
    },
    wordPattern: {
      pattern:
        '(-?\\d*\\.\\d\\w*)|([^\\`\\~\\@\\!\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\\'\\"\\,\\.\\<\\>/\\?\\s]+)',
    },
    indentationRules: {
      decreaseIndentPattern: {
        pattern: '^\\s*[\\}\\]\\)].*$',
      },
      increaseIndentPattern: {
        pattern: '^.*(\\{[^}]*|\\([^)]*|\\[[^\\]]*)$',
      },
      // e.g.  * ...| or */| or *-----*/|
      unIndentedLinePattern: {
        pattern:
          '^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$',
      },
      indentNextLinePattern: {
        pattern: '^((.*=>\\s*)|((.*[^\\w]+|\\s*)(if|while|for)\\s*\\(.*\\)\\s*))$',
      },
    },
    // onEnterRules: [
    //   {
    //     // e.g. /** | */
    //     beforeText: {
    //       pattern: '^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$',
    //     },
    //     afterText: {
    //       pattern: '^\\s*\\*/$',
    //     },
    //     action: {
    //       indent: 'indentOutdent',
    //       appendText: ' * ',
    //     },
    //   },
    //   {
    //     // e.g. /** ...|
    //     beforeText: {
    //       pattern: '^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$',
    //     },
    //     action: {
    //       indent: 'none',
    //       appendText: ' * ',
    //     },
    //   },
    //   {
    //     // e.g.  * ...|
    //     beforeText: {
    //       pattern: '^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$',
    //     },
    //     previousLineText: {
    //       pattern: '(?=^(\\s*(/\\*\\*|\\*)).*)(?=(?!(\\s*\\*/)))',
    //     },
    //     action: {
    //       indent: 'none',
    //       appendText: '* ',
    //     },
    //   },
    //   {
    //     // e.g.  */|
    //     beforeText: {
    //       pattern: '^(\\t|[ ])*[ ]\\*/\\s*$',
    //     },
    //     action: {
    //       indent: 'none',
    //       removeText: 1,
    //     },
    //   },
    //   {
    //     // e.g.  *-----*/|
    //     beforeText: {
    //       pattern: '^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$',
    //     },
    //     action: {
    //       indent: 'none',
    //       removeText: 1,
    //     },
    //   },
    //   {
    //     beforeText: {
    //       pattern: '^\\s*(\\bcase\\s.+:|\\bdefault:)$',
    //     },
    //     afterText: {
    //       pattern: '^(?!\\s*(\\bcase\\b|\\bdefault\\b))',
    //     },
    //     action: {
    //       indent: 'indent',
    //     },
    //   },
    //   {
    //     // Decrease indentation after single line if/else if/else, for, or while
    //     previousLineText: '^\\s*(((else ?)?if|for|while)\\s*\\(.*\\)\\s*|else\\s*)$',
    //     // But make sure line doesn't have braces or is not another if statement
    //     beforeText: '^\\s+([^{i\\s]|i(?!f\\b))',
    //     action: {
    //       indent: 'outdent',
    //     },
    //   },
    //   // Indent when pressing enter from inside ()
    //   {
    //     beforeText: '^.*\\([^\\)]*$',
    //     afterText: '^\\s*\\).*$',
    //     action: {
    //       indent: 'indentOutdent',
    //       appendText: '\t',
    //     },
    //   },
    //   // Indent when pressing enter from inside {}
    //   {
    //     beforeText: '^.*\\{[^\\}]*$',
    //     afterText: '^\\s*\\}.*$',
    //     action: {
    //       indent: 'indentOutdent',
    //       appendText: '\t',
    //     },
    //   },
    //   // Indent when pressing enter from inside []
    //   {
    //     beforeText: '^.*\\[[^\\]]*$',
    //     afterText: '^\\s*\\].*$',
    //     action: {
    //       indent: 'indentOutdent',
    //       appendText: '\t',
    //     },
    //   },
    //   // Add // when pressing enter from inside line comment
    //   {
    //     beforeText: {
    //       pattern: '(?<!\\w:)//.*',
    //     },
    //     afterText: {
    //       pattern: '^(?!\\s*$).+',
    //     },
    //     action: {
    //       indent: 'none',
    //       appendText: '// ',
    //     },
    //   },
    // ],
  },

  cssSyntax: {
    information_for_contributors: [
      'This file has been converted from https://github.com/atom/language-css/blob/master/grammars/css.cson',
      'If you want to provide a fix or improvement, please create a pull request against the original repository.',
      'Once accepted there, we are happy to receive an update request.',
    ],
    version: 'https://github.com/atom/language-css/commit/2bc1e294e2440ad91197263cd9f95dc4b00bab2f',
    name: 'CSS',
    scopeName: 'source.css',
    patterns: [
      {
        include: '#comment-block',
      },
      {
        include: '#escapes',
      },
      {
        include: '#combinators',
      },
      {
        include: '#selector',
      },
      {
        include: '#at-rules',
      },
      {
        include: '#rule-list',
      },
    ],
    repository: {
      'at-rules': {
        patterns: [
          {
            begin: '\\A(?:\\xEF\\xBB\\xBF)?(?i:(?=\\s*@charset\\b))',
            end: ';|(?=$)',
            endCaptures: {
              '0': {
                name: 'punctuation.terminator.rule.css',
              },
            },
            name: 'meta.at-rule.charset.css',
            patterns: [
              {
                captures: {
                  '1': {
                    name: 'invalid.illegal.not-lowercase.charset.css',
                  },
                  '2': {
                    name: 'invalid.illegal.leading-whitespace.charset.css',
                  },
                  '3': {
                    name: 'invalid.illegal.no-whitespace.charset.css',
                  },
                  '4': {
                    name: 'invalid.illegal.whitespace.charset.css',
                  },
                  '5': {
                    name: 'invalid.illegal.not-double-quoted.charset.css',
                  },
                  '6': {
                    name: 'invalid.illegal.unclosed-string.charset.css',
                  },
                  '7': {
                    name: 'invalid.illegal.unexpected-characters.charset.css',
                  },
                },
                match:
                  '(?x)        # Possible errors:\n\\G\n((?!@charset)@\\w+)   # Not lowercase (@charset is case-sensitive)\n|\n\\G(\\s+)             # Preceding whitespace\n|\n(@charset\\S[^;]*)    # No whitespace after @charset\n|\n(?<=@charset)         # Before quoted charset name\n(\\x20{2,}|\\t+)      # More than one space used, or a tab\n|\n(?<=@charset\\x20)    # Beginning of charset name\n([^";]+)              # Not double-quoted\n|\n("[^"]+$)             # Unclosed quote\n|\n(?<=")                # After charset name\n([^;]+)               # Unexpected junk instead of semicolon',
              },
              {
                captures: {
                  '1': {
                    name: 'keyword.control.at-rule.charset.css',
                  },
                  '2': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                match: '((@)charset)(?=\\s)',
              },
              {
                begin: '"',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.begin.css',
                  },
                },
                end: '"|$',
                endCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.end.css',
                  },
                },
                name: 'string.quoted.double.css',
                patterns: [
                  {
                    begin: '(?:\\G|^)(?=(?:[^"])+$)',
                    end: '$',
                    name: 'invalid.illegal.unclosed.string.css',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)((@)import)(?:\\s+|$|(?=[\'"]|/\\*))',
            beginCaptures: {
              '1': {
                name: 'keyword.control.at-rule.import.css',
              },
              '2': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            end: ';',
            endCaptures: {
              '0': {
                name: 'punctuation.terminator.rule.css',
              },
            },
            name: 'meta.at-rule.import.css',
            patterns: [
              {
                begin: '\\G\\s*(?=/\\*)',
                end: '(?<=\\*/)\\s*',
                patterns: [
                  {
                    include: '#comment-block',
                  },
                ],
              },
              {
                include: '#string',
              },
              {
                include: '#url',
              },
              {
                include: '#media-query-list',
              },
            ],
          },
          {
            begin: '(?i)((@)font-face)(?=\\s*|{|/\\*|$)',
            beginCaptures: {
              '1': {
                name: 'keyword.control.at-rule.font-face.css',
              },
              '2': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            end: '(?!\\G)',
            name: 'meta.at-rule.font-face.css',
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#escapes',
              },
              {
                include: '#rule-list',
              },
            ],
          },
          {
            begin: '(?i)(@)page(?=[\\s:{]|/\\*|$)',
            captures: {
              '0': {
                name: 'keyword.control.at-rule.page.css',
              },
              '1': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            end: '(?=\\s*($|[:{;]))',
            name: 'meta.at-rule.page.css',
            patterns: [
              {
                include: '#rule-list',
              },
            ],
          },
          {
            begin: '(?i)(?=@media(\\s|\\(|/\\*|$))',
            end: '(?<=})(?!\\G)',
            patterns: [
              {
                begin: '(?i)\\G(@)media',
                beginCaptures: {
                  '0': {
                    name: 'keyword.control.at-rule.media.css',
                  },
                  '1': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                end: '(?=\\s*[{;])',
                name: 'meta.at-rule.media.header.css',
                patterns: [
                  {
                    include: '#media-query-list',
                  },
                ],
              },
              {
                begin: '{',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.section.media.begin.bracket.curly.css',
                  },
                },
                end: '}',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.media.end.bracket.curly.css',
                  },
                },
                name: 'meta.at-rule.media.body.css',
                patterns: [
                  {
                    include: '$self',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)(?=@counter-style([\\s\'"{;]|/\\*|$))',
            end: '(?<=})(?!\\G)',
            patterns: [
              {
                begin: '(?i)\\G(@)counter-style',
                beginCaptures: {
                  '0': {
                    name: 'keyword.control.at-rule.counter-style.css',
                  },
                  '1': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                end: '(?=\\s*{)',
                name: 'meta.at-rule.counter-style.header.css',
                patterns: [
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                  {
                    captures: {
                      '0': {
                        patterns: [
                          {
                            include: '#escapes',
                          },
                        ],
                      },
                    },
                    match:
                      '(?x)\n(?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter\n(?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier\n  |\\\\(?:[0-9a-fA-F]{1,6}|.)\n)*',
                    name: 'variable.parameter.style-name.css',
                  },
                ],
              },
              {
                begin: '{',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.section.property-list.begin.bracket.curly.css',
                  },
                },
                end: '}',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.property-list.end.bracket.curly.css',
                  },
                },
                name: 'meta.at-rule.counter-style.body.css',
                patterns: [
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                  {
                    include: '#rule-list-innards',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)(?=@document([\\s\'"{;]|/\\*|$))',
            end: '(?<=})(?!\\G)',
            patterns: [
              {
                begin: '(?i)\\G(@)document',
                beginCaptures: {
                  '0': {
                    name: 'keyword.control.at-rule.document.css',
                  },
                  '1': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                end: '(?=\\s*[{;])',
                name: 'meta.at-rule.document.header.css',
                patterns: [
                  {
                    begin: '(?i)(?<![\\w-])(url-prefix|domain|regexp)(\\()',
                    beginCaptures: {
                      '1': {
                        name: 'support.function.document-rule.css',
                      },
                      '2': {
                        name: 'punctuation.section.function.begin.bracket.round.css',
                      },
                    },
                    end: '\\)',
                    endCaptures: {
                      '0': {
                        name: 'punctuation.section.function.end.bracket.round.css',
                      },
                    },
                    name: 'meta.function.document-rule.css',
                    patterns: [
                      {
                        include: '#string',
                      },
                      {
                        include: '#comment-block',
                      },
                      {
                        include: '#escapes',
                      },
                      {
                        match: '[^\'")\\s]+',
                        name: 'variable.parameter.document-rule.css',
                      },
                    ],
                  },
                  {
                    include: '#url',
                  },
                  {
                    include: '#commas',
                  },
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                ],
              },
              {
                begin: '{',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.section.document.begin.bracket.curly.css',
                  },
                },
                end: '}',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.document.end.bracket.curly.css',
                  },
                },
                name: 'meta.at-rule.document.body.css',
                patterns: [
                  {
                    include: '$self',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)(?=@(?:-(?:webkit|moz|o|ms)-)?keyframes([\\s\'"{;]|/\\*|$))',
            end: '(?<=})(?!\\G)',
            patterns: [
              {
                begin: '(?i)\\G(@)(?:-(?:webkit|moz|o|ms)-)?keyframes',
                beginCaptures: {
                  '0': {
                    name: 'keyword.control.at-rule.keyframes.css',
                  },
                  '1': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                end: '(?=\\s*{)',
                name: 'meta.at-rule.keyframes.header.css',
                patterns: [
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                  {
                    captures: {
                      '0': {
                        patterns: [
                          {
                            include: '#escapes',
                          },
                        ],
                      },
                    },
                    match:
                      '(?x)\n(?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter\n(?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier\n  |\\\\(?:[0-9a-fA-F]{1,6}|.)\n)*',
                    name: 'variable.parameter.keyframe-list.css',
                  },
                ],
              },
              {
                begin: '{',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.section.keyframes.begin.bracket.curly.css',
                  },
                },
                end: '}',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.keyframes.end.bracket.curly.css',
                  },
                },
                name: 'meta.at-rule.keyframes.body.css',
                patterns: [
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                  {
                    captures: {
                      '1': {
                        name: 'entity.other.keyframe-offset.css',
                      },
                      '2': {
                        name: 'entity.other.keyframe-offset.percentage.css',
                      },
                    },
                    match:
                      '(?xi)\n(?<![\\w-]) (from|to) (?![\\w-])         # Keywords for 0% | 100%\n|\n([-+]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)%)     # Percentile value',
                  },
                  {
                    include: '#rule-list',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)(?=@supports(\\s|\\(|/\\*|$))',
            end: '(?<=})(?!\\G)|(?=;)',
            patterns: [
              {
                begin: '(?i)\\G(@)supports',
                beginCaptures: {
                  '0': {
                    name: 'keyword.control.at-rule.supports.css',
                  },
                  '1': {
                    name: 'punctuation.definition.keyword.css',
                  },
                },
                end: '(?=\\s*[{;])',
                name: 'meta.at-rule.supports.header.css',
                patterns: [
                  {
                    include: '#feature-query-operators',
                  },
                  {
                    include: '#feature-query',
                  },
                  {
                    include: '#comment-block',
                  },
                  {
                    include: '#escapes',
                  },
                ],
              },
              {
                begin: '{',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.section.supports.begin.bracket.curly.css',
                  },
                },
                end: '}',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.supports.end.bracket.curly.css',
                  },
                },
                name: 'meta.at-rule.supports.body.css',
                patterns: [
                  {
                    include: '$self',
                  },
                ],
              },
            ],
          },
          {
            begin: '(?i)((@)viewport)(?=[\\s\'"{;]|/\\*|$)',
            beginCaptures: {
              '1': {
                name: 'keyword.control.at-rule.viewport.css',
              },
              '2': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            end: '(?=\\s*[@{;])',
            name: 'meta.at-rule.viewport.css',
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#escapes',
              },
            ],
          },
          {
            begin: '(?i)((@)font-feature-values)(?=[\\s\'"{;]|/\\*|$)\\s*',
            beginCaptures: {
              '1': {
                name: 'keyword.control.at-rule.font-feature-values.css',
              },
              '2': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            contentName: 'variable.parameter.font-name.css',
            end: '(?=\\s*[@{;])',
            name: 'meta.at-rule.font-features.css',
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#escapes',
              },
            ],
          },
          {
            include: '#font-features',
          },
          {
            begin: '(?i)((@)namespace)(?=[\\s\'";]|/\\*|$)',
            beginCaptures: {
              '1': {
                name: 'keyword.control.at-rule.namespace.css',
              },
              '2': {
                name: 'punctuation.definition.keyword.css',
              },
            },
            end: ';|(?=[@{])',
            endCaptures: {
              '0': {
                name: 'punctuation.terminator.rule.css',
              },
            },
            name: 'meta.at-rule.namespace.css',
            patterns: [
              {
                include: '#url',
              },
              {
                captures: {
                  '1': {
                    patterns: [
                      {
                        include: '#comment-block',
                      },
                    ],
                  },
                  '2': {
                    name: 'entity.name.function.namespace-prefix.css',
                    patterns: [
                      {
                        include: '#escapes',
                      },
                    ],
                  },
                },
                match:
                  '(?xi)\n(?:\\G|^|(?<=\\s))\n(?=\n  (?<=\\s|^)                             # Starts with whitespace\n  (?:[-a-zA-Z_]|[^\\x00-\\x7F])          # Then a valid identifier character\n  |\n  \\s*                                   # Possible adjoining whitespace\n  /\\*(?:[^*]|\\*[^/])*\\*/              # Injected comment\n)\n(.*?)                                    # Grouped to embed #comment-block\n(\n  (?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter\n  (?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier\n    |\\\\(?:[0-9a-fA-F]{1,6}|.)\n  )*\n)',
              },
              {
                include: '#comment-block',
              },
              {
                include: '#escapes',
              },
              {
                include: '#string',
              },
            ],
          },
        ],
      },
      'color-keywords': {
        patterns: [
          {
            match:
              '(?i)(?<![\\w-])(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)(?![\\w-])',
            name: 'support.constant.color.w3c-standard-color-name.css',
          },
          {
            match:
              '(?xi) (?<![\\w-])\n(aliceblue|antiquewhite|aquamarine|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood\n|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan\n|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange\n|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise\n|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen\n|gainsboro|ghostwhite|gold|goldenrod|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki\n|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow\n|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray\n|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|magenta|mediumaquamarine|mediumblue\n|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise\n|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olivedrab|orangered\n|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum\n|powderblue|rebeccapurple|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell\n|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato\n|transparent|turquoise|violet|wheat|whitesmoke|yellowgreen)\n(?![\\w-])',
            name: 'support.constant.color.w3c-extended-color-name.css',
          },
          {
            match: '(?i)(?<![\\w-])currentColor(?![\\w-])',
            name: 'support.constant.color.current.css',
          },
          {
            match:
              '(?xi) (?<![\\w-])\n(ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow\n|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption\n|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow\n|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText)\n(?![\\w-])',
            name: 'invalid.deprecated.color.system.css',
          },
        ],
      },
      combinators: {
        patterns: [
          {
            match: '/deep/|>>>',
            name: 'invalid.deprecated.combinator.css',
          },
          {
            match: '>>|>|\\+|~',
            name: 'keyword.operator.combinator.css',
          },
        ],
      },
      commas: {
        match: ',',
        name: 'punctuation.separator.list.comma.css',
      },
      'comment-block': {
        begin: '/\\*',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.comment.begin.css',
          },
        },
        end: '\\*/',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.comment.end.css',
          },
        },
        name: 'comment.block.css',
      },
      escapes: {
        patterns: [
          {
            match: '\\\\[0-9a-fA-F]{1,6}',
            name: 'constant.character.escape.codepoint.css',
          },
          {
            begin: '\\\\$\\s*',
            end: '^(?<!\\G)',
            name: 'constant.character.escape.newline.css',
          },
          {
            match: '\\\\.',
            name: 'constant.character.escape.css',
          },
        ],
      },
      'feature-query': {
        begin: '\\(',
        beginCaptures: {
          '0': {
            name: 'punctuation.definition.condition.begin.bracket.round.css',
          },
        },
        end: '\\)',
        endCaptures: {
          '0': {
            name: 'punctuation.definition.condition.end.bracket.round.css',
          },
        },
        name: 'meta.feature-query.css',
        patterns: [
          {
            include: '#feature-query-operators',
          },
          {
            include: '#feature-query',
          },
        ],
      },
      'feature-query-operators': {
        patterns: [
          {
            match: '(?i)(?<=[\\s()]|^|\\*/)(and|not|or)(?=[\\s()]|/\\*|$)',
            name: 'keyword.operator.logical.feature.$1.css',
          },
          {
            include: '#rule-list-innards',
          },
        ],
      },
      'font-features': {
        begin:
          '(?xi)\n((@)(annotation|character-variant|ornaments|styleset|stylistic|swash))\n(?=[\\s@\'"{;]|/\\*|$)',
        beginCaptures: {
          '1': {
            name: 'keyword.control.at-rule.${3:/downcase}.css',
          },
          '2': {
            name: 'punctuation.definition.keyword.css',
          },
        },
        end: '(?<=})',
        name: 'meta.at-rule.${3:/downcase}.css',
        patterns: [
          {
            begin: '{',
            beginCaptures: {
              '0': {
                name: 'punctuation.section.property-list.begin.bracket.curly.css',
              },
            },
            end: '}',
            endCaptures: {
              '0': {
                name: 'punctuation.section.property-list.end.bracket.curly.css',
              },
            },
            name: 'meta.property-list.font-feature.css',
            patterns: [
              {
                captures: {
                  '0': {
                    patterns: [
                      {
                        include: '#escapes',
                      },
                    ],
                  },
                },
                match:
                  '(?x)\n(?: [-a-zA-Z_]    | [^\\x00-\\x7F] )   # First letter\n(?: [-a-zA-Z0-9_] | [^\\x00-\\x7F]     # Remainder of identifier\n  | \\\\(?:[0-9a-fA-F]{1,6}|.)\n)*',
                name: 'variable.font-feature.css',
              },
              {
                include: '#rule-list-innards',
              },
            ],
          },
        ],
      },
      functions: {
        patterns: [
          {
            begin: '(?i)(?<![\\w-])(calc)(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.calc.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.calc.css',
            patterns: [
              {
                match: '[*/]|(?<=\\s|^)[-+](?=\\s|$)',
                name: 'keyword.operator.arithmetic.css',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin: '(?i)(?<![\\w-])(rgba?|hsla?)(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.misc.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.color.css',
            patterns: [
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin:
              '(?xi) (?<![\\w-])\n(\n  (?:-webkit-|-moz-|-o-)?    # Accept prefixed/historical variants\n  (?:repeating-)?            # "Repeating"-type gradient\n  (?:linear|radial|conic)    # Shape\n  -gradient\n)\n(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.gradient.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.gradient.css',
            patterns: [
              {
                match: '(?i)(?<![\\w-])(from|to|at)(?![\\w-])',
                name: 'keyword.operator.gradient.css',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin: '(?i)(?<![\\w-])(-webkit-gradient)(\\()',
            beginCaptures: {
              '1': {
                name: 'invalid.deprecated.gradient.function.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.gradient.invalid.deprecated.gradient.css',
            patterns: [
              {
                begin: '(?i)(?<![\\w-])(from|to|color-stop)(\\()',
                beginCaptures: {
                  '1': {
                    name: 'invalid.deprecated.function.css',
                  },
                  '2': {
                    name: 'punctuation.section.function.begin.bracket.round.css',
                  },
                },
                end: '\\)',
                endCaptures: {
                  '0': {
                    name: 'punctuation.section.function.end.bracket.round.css',
                  },
                },
                patterns: [
                  {
                    include: '#property-values',
                  },
                ],
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin:
              '(?xi) (?<![\\w-])\n(annotation|attr|blur|brightness|character-variant|contrast|counters?\n|cross-fade|drop-shadow|element|fit-content|format|grayscale|hue-rotate\n|image-set|invert|local|minmax|opacity|ornaments|repeat|saturate|sepia\n|styleset|stylistic|swash|symbols)\n(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.misc.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.misc.css',
            patterns: [
              {
                match: '(?i)(?<=[,\\s"]|\\*/|^)\\d+x(?=[\\s,"\')]|/\\*|$)',
                name: 'constant.numeric.other.density.css',
              },
              {
                include: '#property-values',
              },
              {
                match: '[^\'"),\\s]+',
                name: 'variable.parameter.misc.css',
              },
            ],
          },
          {
            begin: '(?i)(?<![\\w-])(circle|ellipse|inset|polygon|rect)(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.shape.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.shape.css',
            patterns: [
              {
                match: '(?i)(?<=\\s|^|\\*/)(at|round)(?=\\s|/\\*|$)',
                name: 'keyword.operator.shape.css',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin: '(?i)(?<![\\w-])(cubic-bezier|steps)(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.timing-function.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.timing-function.css',
            patterns: [
              {
                match: '(?i)(?<![\\w-])(start|end)(?=\\s*\\)|$)',
                name: 'support.constant.step-direction.css',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin:
              '(?xi) (?<![\\w-])\n( (?:translate|scale|rotate)(?:[XYZ]|3D)?\n| matrix(?:3D)?\n| skew[XY]?\n| perspective\n)\n(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.transform.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            patterns: [
              {
                include: '#property-values',
              },
            ],
          },
          {
            include: '#url',
          },
          {
            begin: '(?i)(?<![\\w-])(var)(\\()',
            beginCaptures: {
              '1': {
                name: 'support.function.misc.css',
              },
              '2': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            name: 'meta.function.variable.css',
            patterns: [
              {
                name: 'variable.argument.css',
                match:
                  '(?x)\n--\n(?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter\n(?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier\n  |\\\\(?:[0-9a-fA-F]{1,6}|.)\n)*',
              },
              {
                include: '#property-values',
              },
            ],
          },
        ],
      },
      'functional-pseudo-classes': {
        patterns: [
          {
            begin: '(?i)((:)dir)(\\()',
            beginCaptures: {
              '1': {
                name: 'entity.other.attribute-name.pseudo-class.css',
              },
              '2': {
                name: 'punctuation.definition.entity.css',
              },
              '3': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#escapes',
              },
              {
                match: '(?i)(?<![\\w-])(ltr|rtl)(?![\\w-])',
                name: 'support.constant.text-direction.css',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            begin: '(?i)((:)lang)(\\()',
            beginCaptures: {
              '1': {
                name: 'entity.other.attribute-name.pseudo-class.css',
              },
              '2': {
                name: 'punctuation.definition.entity.css',
              },
              '3': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            patterns: [
              {
                match:
                  '(?<=[(,\\s])[a-zA-Z]+(-[a-zA-Z0-9]*|\\\\(?:[0-9a-fA-F]{1,6}|.))*(?=[),\\s])',
                name: 'support.constant.language-range.css',
              },
              {
                begin: '"',
                beginCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.begin.css',
                  },
                },
                end: '"',
                endCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.end.css',
                  },
                },
                name: 'string.quoted.double.css',
                patterns: [
                  {
                    include: '#escapes',
                  },
                  {
                    match: '(?<=["\\s])[a-zA-Z*]+(-[a-zA-Z0-9*]*)*(?=["\\s])',
                    name: 'support.constant.language-range.css',
                  },
                ],
              },
              {
                begin: "'",
                beginCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.begin.css',
                  },
                },
                end: "'",
                endCaptures: {
                  '0': {
                    name: 'punctuation.definition.string.end.css',
                  },
                },
                name: 'string.quoted.single.css',
                patterns: [
                  {
                    include: '#escapes',
                  },
                  {
                    match: "(?<=['\\s])[a-zA-Z*]+(-[a-zA-Z0-9*]*)*(?=['\\s])",
                    name: 'support.constant.language-range.css',
                  },
                ],
              },
              {
                include: '#commas',
              },
            ],
          },
          {
            begin: '(?i)((:)(?:not|has|matches))(\\()',
            beginCaptures: {
              '1': {
                name: 'entity.other.attribute-name.pseudo-class.css',
              },
              '2': {
                name: 'punctuation.definition.entity.css',
              },
              '3': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            patterns: [
              {
                include: '#selector-innards',
              },
            ],
          },
          {
            begin: '(?i)((:)nth-(?:last-)?(?:child|of-type))(\\()',
            beginCaptures: {
              '1': {
                name: 'entity.other.attribute-name.pseudo-class.css',
              },
              '2': {
                name: 'punctuation.definition.entity.css',
              },
              '3': {
                name: 'punctuation.section.function.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.section.function.end.bracket.round.css',
              },
            },
            patterns: [
              {
                match: '(?i)[+-]?(\\d+n?|n)(\\s*[+-]\\s*\\d+)?',
                name: 'constant.numeric.css',
              },
              {
                match: '(?i)even|odd',
                name: 'support.constant.parity.css',
              },
            ],
          },
        ],
      },
      'media-features': {
        captures: {
          '1': {
            name: 'support.type.property-name.media.css',
          },
          '2': {
            name: 'invalid.deprecated.media.css',
          },
          '3': {
            name: 'support.type.vendored.property-name.media.css',
          },
        },
        match:
          '(?xi)\n(?<=^|\\s|\\(|\\*/)           # Preceded by whitespace, bracket or comment\n(?:\n  # Standardised features\n  (\n    (?:min-|max-)?            # Range features\n    (?: height\n      | width\n      | aspect-ratio\n      | color\n      | color-index\n      | monochrome\n      | resolution\n    )\n    | grid                    # Discrete features\n    | scan\n    | orientation\n    | display-mode\n  )\n  |\n  # Deprecated features\n  (\n    (?:min-|max-)?            # Deprecated in Media Queries 4\n    device-\n    (?: height\n      | width\n      | aspect-ratio\n    )\n  )\n  |\n  # Vendor extensions\n  (\n    (?:\n      # Spec-compliant syntax\n      [-_]\n      (?: webkit              # Webkit/Blink\n        | apple|khtml         # Webkit aliases\n        | epub                # ePub3\n        | moz                 # Gecko\n        | ms                  # Microsoft\n        | o                   # Presto (pre-Opera 15)\n        | xv|ah|rim|atsc|     # Less common vendors\n          hp|tc|wap|ro\n      )\n      |\n      # Non-standard prefixes\n      (?: mso                 # Microsoft Office\n        | prince              # YesLogic\n      )\n    )\n    -\n    [\\w-]+                   # Feature name\n    (?=                       # Terminates correctly\n      \\s*                    # Possible whitespace\n      (?:                     # Possible injected comment\n        /\\*\n        (?:[^*]|\\*[^/])*\n        \\*/\n      )?\n      \\s*\n      [:)]                    # Ends with a colon or closed bracket\n    )\n  )\n)\n(?=\\s|$|[><:=]|\\)|/\\*)     # Terminates cleanly',
      },
      'media-feature-keywords': {
        match:
          '(?xi)\n(?<=^|\\s|:|\\*/)\n(?: portrait                  # Orientation\n  | landscape\n  | progressive               # Scan types\n  | interlace\n  | fullscreen                # Display modes\n  | standalone\n  | minimal-ui\n  | browser\n)\n(?=\\s|\\)|$)',
        name: 'support.constant.property-value.css',
      },
      'media-query': {
        begin: '\\G',
        end: '(?=\\s*[{;])',
        patterns: [
          {
            include: '#comment-block',
          },
          {
            include: '#escapes',
          },
          {
            include: '#media-types',
          },
          {
            match: '(?i)(?<=\\s|^|,|\\*/)(only|not)(?=\\s|{|/\\*|$)',
            name: 'keyword.operator.logical.$1.media.css',
          },
          {
            match: '(?i)(?<=\\s|^|\\*/|\\))and(?=\\s|/\\*|$)',
            name: 'keyword.operator.logical.and.media.css',
          },
          {
            match: ',(?:(?:\\s*,)+|(?=\\s*[;){]))',
            name: 'invalid.illegal.comma.css',
          },
          {
            include: '#commas',
          },
          {
            begin: '\\(',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.parameters.begin.bracket.round.css',
              },
            },
            end: '\\)',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.parameters.end.bracket.round.css',
              },
            },
            patterns: [
              {
                include: '#media-features',
              },
              {
                include: '#media-feature-keywords',
              },
              {
                match: ':',
                name: 'punctuation.separator.key-value.css',
              },
              {
                match: '>=|<=|=|<|>',
                name: 'keyword.operator.comparison.css',
              },
              {
                captures: {
                  '1': {
                    name: 'constant.numeric.css',
                  },
                  '2': {
                    name: 'keyword.operator.arithmetic.css',
                  },
                  '3': {
                    name: 'constant.numeric.css',
                  },
                },
                match: '(\\d+)\\s*(/)\\s*(\\d+)',
                name: 'meta.ratio.css',
              },
              {
                include: '#numeric-values',
              },
              {
                include: '#comment-block',
              },
            ],
          },
        ],
      },
      'media-query-list': {
        begin: '(?=\\s*[^{;])',
        end: '(?=\\s*[{;])',
        patterns: [
          {
            include: '#media-query',
          },
        ],
      },
      'media-types': {
        captures: {
          '1': {
            name: 'support.constant.media.css',
          },
          '2': {
            name: 'invalid.deprecated.constant.media.css',
          },
        },
        match:
          '(?xi)\n(?<=^|\\s|,|\\*/)\n(?:\n  # Valid media types\n  (all|print|screen|speech)\n  |\n  # Deprecated in Media Queries 4: http://dev.w3.org/csswg/mediaqueries/#media-types\n  (aural|braille|embossed|handheld|projection|tty|tv)\n)\n(?=$|[{,\\s;]|/\\*)',
      },
      'numeric-values': {
        patterns: [
          {
            captures: {
              '1': {
                name: 'punctuation.definition.constant.css',
              },
            },
            match: '(#)(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b',
            name: 'constant.other.color.rgb-value.hex.css',
          },
          {
            captures: {
              '1': {
                name: 'keyword.other.unit.percentage.css',
              },
              '2': {
                name: 'keyword.other.unit.${2:/downcase}.css',
              },
            },
            match:
              '(?xi) (?<![\\w-])\n[-+]?                               # Sign indicator\n\n(?:                                 # Numerals\n    [0-9]+ (?:\\.[0-9]+)?           # Integer/float with leading digits\n  | \\.[0-9]+                       # Float without leading digits\n)\n\n(?:                                 # Scientific notation\n  (?<=[0-9])                        # Exponent must follow a digit\n  E                                 # Exponent indicator\n  [-+]?                             # Possible sign indicator\n  [0-9]+                            # Exponent value\n)?\n\n(?:                                 # Possible unit for data-type:\n  (%)                               # - Percentage\n  | ( deg|grad|rad|turn             # - Angle\n    | Hz|kHz                        # - Frequency\n    | ch|cm|em|ex|fr|in|mm|mozmm|   # - Length\n      pc|pt|px|q|rem|vh|vmax|vmin|\n      vw\n    | dpi|dpcm|dppx                 # - Resolution\n    | s|ms                          # - Time\n    )\n  \\b                               # Boundary checking intentionally lax to\n)?                                  # facilitate embedding in CSS-like grammars',
            name: 'constant.numeric.css',
          },
        ],
      },
      'property-keywords': {
        patterns: [
          {
            match:
              '(?xi) (?<![\\w-])\n(above|absolute|active|add|additive|after-edge|alias|all|all-petite-caps|all-scroll|all-small-caps|alpha|alphabetic|alternate|alternate-reverse\n|always|antialiased|auto|auto-pos|available|avoid|avoid-column|avoid-page|avoid-region|backwards|balance|baseline|before-edge|below|bevel\n|bidi-override|blink|block|block-axis|block-start|block-end|bold|bolder|border|border-box|both|bottom|bottom-outside|break-all|break-word|bullets\n|butt|capitalize|caption|cell|center|central|char|circle|clip|clone|close-quote|closest-corner|closest-side|col-resize|collapse|color|color-burn\n|color-dodge|column|column-reverse|common-ligatures|compact|condensed|contain|content|content-box|contents|context-menu|contextual|copy|cover\n|crisp-edges|crispEdges|crosshair|cyclic|darken|dashed|decimal|default|dense|diagonal-fractions|difference|digits|disabled|disc|discretionary-ligatures\n|distribute|distribute-all-lines|distribute-letter|distribute-space|dot|dotted|double|double-circle|downleft|downright|e-resize|each-line|ease|ease-in\n|ease-in-out|ease-out|economy|ellipse|ellipsis|embed|end|evenodd|ew-resize|exact|exclude|exclusion|expanded|extends|extra-condensed|extra-expanded\n|fallback|farthest-corner|farthest-side|fill|fill-available|fill-box|filled|fit-content|fixed|flat|flex|flex-end|flex-start|flip|forwards|freeze\n|from-image|full-width|geometricPrecision|georgian|grab|grabbing|grayscale|grid|groove|hand|hanging|hard-light|help|hidden|hide\n|historical-forms|historical-ligatures|horizontal|horizontal-tb|hue|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space\n|ideographic|inactive|infinite|inherit|initial|inline|inline-axis|inline-block|inline-end|inline-flex|inline-grid|inline-list-item|inline-start\n|inline-table|inset|inside|inter-character|inter-ideograph|inter-word|intersect|invert|isolate|isolate-override|italic|jis04|jis78|jis83\n|jis90|justify|justify-all|kannada|keep-all|landscape|large|larger|left|lighten|lighter|line|line-edge|line-through|linear|linearRGB\n|lining-nums|list-item|local|loose|lowercase|lr|lr-tb|ltr|luminance|luminosity|main-size|mandatory|manipulation|manual|margin-box|match-parent\n|match-source|mathematical|max-content|medium|menu|message-box|middle|min-content|miter|mixed|move|multiply|n-resize|narrower|ne-resize\n|nearest-neighbor|nesw-resize|newspaper|no-change|no-clip|no-close-quote|no-common-ligatures|no-contextual|no-discretionary-ligatures\n|no-drop|no-historical-ligatures|no-open-quote|no-repeat|none|nonzero|normal|not-allowed|nowrap|ns-resize|numbers|numeric|nw-resize|nwse-resize\n|oblique|oldstyle-nums|open|open-quote|optimizeLegibility|optimizeQuality|optimizeSpeed|optional|ordinal|outset|outside|over|overlay|overline|padding\n|padding-box|page|painted|pan-down|pan-left|pan-right|pan-up|pan-x|pan-y|paused|petite-caps|pixelated|plaintext|pointer|portrait|pre|pre-line\n|pre-wrap|preserve-3d|progress|progressive|proportional-nums|proportional-width|proximity|radial|recto|region|relative|remove|repeat|repeat-[xy]\n|reset-size|reverse|revert|ridge|right|rl|rl-tb|round|row|row-resize|row-reverse|row-severse|rtl|ruby|ruby-base|ruby-base-container|ruby-text\n|ruby-text-container|run-in|running|s-resize|saturation|scale-down|screen|scroll|scroll-position|se-resize|semi-condensed|semi-expanded|separate\n|sesame|show|sideways|sideways-left|sideways-lr|sideways-right|sideways-rl|simplified|slashed-zero|slice|small|small-caps|small-caption|smaller\n|smooth|soft-light|solid|space|space-around|space-between|space-evenly|spell-out|square|sRGB|stacked-fractions|start|static|status-bar|swap\n|step-end|step-start|sticky|stretch|strict|stroke|stroke-box|style|sub|subgrid|subpixel-antialiased|subtract|super|sw-resize|symbolic|table\n|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row|table-row-group|tabular-nums|tb|tb-rl\n|text|text-after-edge|text-before-edge|text-bottom|text-top|thick|thin|titling-caps|top|top-outside|touch|traditional|transparent|triangle\n|ultra-condensed|ultra-expanded|under|underline|unicase|unset|upleft|uppercase|upright|use-glyph-orientation|use-script|verso|vertical\n|vertical-ideographic|vertical-lr|vertical-rl|vertical-text|view-box|visible|visibleFill|visiblePainted|visibleStroke|w-resize|wait|wavy\n|weight|whitespace|wider|words|wrap|wrap-reverse|x-large|x-small|xx-large|xx-small|zero|zoom-in|zoom-out)\n(?![\\w-])',
            name: 'support.constant.property-value.css',
          },
          {
            match:
              '(?xi) (?<![\\w-])\n(arabic-indic|armenian|bengali|cambodian|circle|cjk-decimal|cjk-earthly-branch|cjk-heavenly-stem|cjk-ideographic\n|decimal|decimal-leading-zero|devanagari|disc|disclosure-closed|disclosure-open|ethiopic-halehame-am\n|ethiopic-halehame-ti-e[rt]|ethiopic-numeric|georgian|gujarati|gurmukhi|hangul|hangul-consonant|hebrew\n|hiragana|hiragana-iroha|japanese-formal|japanese-informal|kannada|katakana|katakana-iroha|khmer\n|korean-hangul-formal|korean-hanja-formal|korean-hanja-informal|lao|lower-alpha|lower-armenian|lower-greek\n|lower-latin|lower-roman|malayalam|mongolian|myanmar|oriya|persian|simp-chinese-formal|simp-chinese-informal\n|square|tamil|telugu|thai|tibetan|trad-chinese-formal|trad-chinese-informal|upper-alpha|upper-armenian\n|upper-latin|upper-roman|urdu)\n(?![\\w-])',
            name: 'support.constant.property-value.list-style-type.css',
          },
          {
            match:
              '(?<![\\w-])(?i:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[a-zA-Z-]+',
            name: 'support.constant.vendored.property-value.css',
          },
          {
            match:
              '(?<![\\w-])(?i:arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace)(?![\\w-])',
            name: 'support.constant.font-name.css',
          },
        ],
      },
      'property-names': {
        patterns: [
          {
            match:
              '(?xi) (?<![\\w-])\n(?:\n    # Standard CSS\n    additive-symbols|align-content|align-items|align-self|all|animation|animation-delay|animation-direction\n  | animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state\n  | animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode\n  | background-clip|background-color|background-image|background-origin|background-position|background-position-[xy]\n  | background-repeat|background-size|block-size|border|border-block-end|border-block-end-color|border-block-end-style\n  | border-block-end-width|border-block-start|border-block-start-color|border-block-start-style\n  | border-block-start-width|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius\n  | border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset\n  | border-image-repeat|border-image-slice|border-image-source|border-image-width|border-inline-end\n  | border-inline-end-color|border-inline-end-style|border-inline-end-width|border-inline-start\n  | border-inline-start-color|border-inline-start-style|border-inline-start-width|border-left|border-left-color\n  | border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style\n  | border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius\n  | border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-decoration-break\n  | box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|clip-path|color\n  | column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width\n  | column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display\n  | empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float\n  | font|font-display|font-family|font-feature-settings|font-kerning|font-language-override|font-size|font-size-adjust\n  | font-stretch|font-style|font-synthesis|font-variant|font-variant-alternates|font-variant-caps\n  | font-variant-east-asian|font-variant-ligatures|font-variant-numeric|font-variant-position|font-weight\n  | grid|grid-area|grid-auto-columns|grid-auto-flow|grid-auto-rows|grid-column|grid-column-end|grid-column-gap\n  | grid-column-start|grid-gap|grid-row|grid-row-end|grid-row-gap|grid-row-start|grid-template|grid-template-areas\n  | grid-template-columns|grid-template-rows|height|hyphens|image-orientation|image-rendering|image-resolution\n  | ime-mode|inline-size|isolation|justify-content|left|letter-spacing|line-break|line-height|list-style\n  | list-style-image|list-style-position|list-style-type|margin|margin-block-end|margin-block-start|margin-bottom\n  | margin-inline-end|margin-inline-start|margin-left|margin-right|margin-top|mask|mask-clip|mask-composite\n  | mask-image|mask-mode|mask-origin|mask-position|mask-repeat|mask-size|mask-type|max-block-size|max-height\n  | max-inline-size|max-width|max-zoom|min-block-size|min-height|min-inline-size|min-width|min-zoom|mix-blend-mode\n  | negative|object-fit|object-position|offset-block-end|offset-block-start|offset-inline-end|offset-inline-start\n  | opacity|order|orientation|orphans|outline|outline-color|outline-offset|outline-style|outline-width|overflow\n  | overflow-wrap|overflow-[xy]|pad|padding|padding-block-end|padding-block-start|padding-bottom|padding-inline-end\n  | padding-inline-start|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside\n  | perspective|perspective-origin|pointer-events|position|prefix|quotes|range|resize|right|ruby-align|ruby-merge\n  | ruby-position|scroll-behavior|scroll-snap-coordinate|scroll-snap-destination|scroll-snap-type|shape-image-threshold\n  | shape-margin|shape-outside|speak-as|src|suffix|symbols|system|tab-size|table-layout|text-align|text-align-last\n  | text-combine-upright|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-emphasis\n  | text-emphasis-color|text-emphasis-position|text-emphasis-style|text-indent|text-orientation|text-overflow\n  | text-rendering|text-shadow|text-transform|text-underline-position|top|touch-action|transform|transform-box\n  | transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property\n  | transition-timing-function|unicode-bidi|unicode-range|user-zoom|vertical-align|visibility|white-space|widows\n  | width|will-change|word-break|word-spacing|word-wrap|writing-mode|z-index|zoom\n\n  # SVG attributes\n  | alignment-baseline|baseline-shift|clip-rule|color-interpolation|color-interpolation-filters|color-profile\n  | color-rendering|dominant-baseline|enable-background|fill|fill-opacity|fill-rule|flood-color|flood-opacity\n  | glyph-orientation-horizontal|glyph-orientation-vertical|kerning|lighting-color|marker-end|marker-mid\n  | marker-start|shape-rendering|stop-color|stop-opacity|stroke|stroke-dasharray|stroke-dashoffset|stroke-linecap\n  | stroke-linejoin|stroke-miterlimit|stroke-opacity|stroke-width|text-anchor|x|y\n\n  # Not listed on MDN; presumably deprecated\n  | adjust|after|align|align-last|alignment|alignment-adjust|appearance|attachment|azimuth|background-break\n  | balance|baseline|before|bidi|binding|bookmark|bookmark-label|bookmark-level|bookmark-target|border-length\n  | bottom-color|bottom-left-radius|bottom-right-radius|bottom-style|bottom-width|box|box-align|box-direction\n  | box-flex|box-flex-group|box-lines|box-ordinal-group|box-orient|box-pack|break|character|collapse|column\n  | column-break-after|column-break-before|count|counter|crop|cue|cue-after|cue-before|decoration|decoration-break\n  | delay|display-model|display-role|down|drop|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust\n  | drop-initial-before-align|drop-initial-size|drop-initial-value|duration|elevation|emphasis|family|fit|fit-position\n  | flex-group|float-offset|gap|grid-columns|grid-rows|hanging-punctuation|header|hyphenate|hyphenate-after|hyphenate-before\n  | hyphenate-character|hyphenate-lines|hyphenate-resource|icon|image|increment|indent|index|initial-after-adjust\n  | initial-after-align|initial-before-adjust|initial-before-align|initial-size|initial-value|inline-box-align|iteration-count\n  | justify|label|left-color|left-style|left-width|length|level|line|line-stacking|line-stacking-ruby|line-stacking-shift\n  | line-stacking-strategy|lines|list|mark|mark-after|mark-before|marks|marquee|marquee-direction|marquee-play-count|marquee-speed\n  | marquee-style|max|min|model|move-to|name|nav|nav-down|nav-index|nav-left|nav-right|nav-up|new|numeral|offset|ordinal-group\n  | orient|origin|overflow-style|overhang|pack|page|page-policy|pause|pause-after|pause-before|phonemes|pitch|pitch-range\n  | play-count|play-during|play-state|point|presentation|presentation-level|profile|property|punctuation|punctuation-trim\n  | radius|rate|rendering-intent|repeat|replace|reset|resolution|resource|respond-to|rest|rest-after|rest-before|richness\n  | right-color|right-style|right-width|role|rotation|rotation-point|rows|ruby|ruby-overhang|ruby-span|rule|rule-color\n  | rule-style|rule-width|shadow|size|size-adjust|sizing|space|space-collapse|spacing|span|speak|speak-header|speak-numeral\n  | speak-punctuation|speech|speech-rate|speed|stacking|stacking-ruby|stacking-shift|stacking-strategy|stress|stretch\n  | string-set|style|style-image|style-position|style-type|target|target-name|target-new|target-position|text|text-height\n  | text-justify|text-outline|text-replace|text-wrap|timing-function|top-color|top-left-radius|top-right-radius|top-style\n  | top-width|trim|unicode|up|user-select|variant|voice|voice-balance|voice-duration|voice-family|voice-pitch|voice-pitch-range\n  | voice-rate|voice-stress|voice-volume|volume|weight|white|white-space-collapse|word|wrap\n)\n(?![\\w-])',
            name: 'support.type.property-name.css',
          },
          {
            match:
              '(?<![\\w-])(?i:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[a-zA-Z-]+',
            name: 'support.type.vendored.property-name.css',
          },
        ],
      },
      'property-values': {
        patterns: [
          {
            include: '#commas',
          },
          {
            include: '#comment-block',
          },
          {
            include: '#escapes',
          },
          {
            include: '#functions',
          },
          {
            include: '#property-keywords',
          },
          {
            include: '#unicode-range',
          },
          {
            include: '#numeric-values',
          },
          {
            include: '#color-keywords',
          },
          {
            include: '#string',
          },
          {
            match: '!\\s*important(?![\\w-])',
            name: 'keyword.other.important.css',
          },
        ],
      },
      'pseudo-classes': {
        captures: {
          '1': {
            name: 'punctuation.definition.entity.css',
          },
          '2': {
            name: 'invalid.illegal.colon.css',
          },
        },
        match:
          '(?xi)\n(:)(:*)\n(?: active|any-link|checked|default|disabled|empty|enabled|first\n  | (?:first|last|only)-(?:child|of-type)|focus|focus-within|fullscreen|host|hover\n  | in-range|indeterminate|invalid|left|link|optional|out-of-range\n  | read-only|read-write|required|right|root|scope|target|unresolved\n  | valid|visited\n)(?![\\w-]|\\s*[;}])',
        name: 'entity.other.attribute-name.pseudo-class.css',
      },
      'pseudo-elements': {
        captures: {
          '1': {
            name: 'punctuation.definition.entity.css',
          },
          '2': {
            name: 'punctuation.definition.entity.css',
          },
        },
        match:
          '(?xi)\n(?:\n  (::?)                       # Elements using both : and :: notation\n  (?: after\n    | before\n    | first-letter\n    | first-line\n    | (?:-(?:ah|apple|atsc|epub|hp|khtml|moz\n            |ms|o|rim|ro|tc|wap|webkit|xv)\n        | (?:mso|prince))\n      -[a-z-]+\n  )\n  |\n  (::)                        # Double-colon only\n  (?: backdrop\n    | content\n    | grammar-error\n    | marker\n    | placeholder\n    | selection\n    | shadow\n    | spelling-error\n  )\n)\n(?![\\w-]|\\s*[;}])',
        name: 'entity.other.attribute-name.pseudo-element.css',
      },
      'rule-list': {
        begin: '{',
        beginCaptures: {
          '0': {
            name: 'punctuation.section.property-list.begin.bracket.curly.css',
          },
        },
        end: '}',
        endCaptures: {
          '0': {
            name: 'punctuation.section.property-list.end.bracket.curly.css',
          },
        },
        name: 'meta.property-list.css',
        patterns: [
          {
            include: '#rule-list-innards',
          },
        ],
      },
      'rule-list-innards': {
        patterns: [
          {
            include: '#comment-block',
          },
          {
            include: '#escapes',
          },
          {
            include: '#font-features',
          },
          {
            match:
              '(?x) (?<![\\w-])\n--\n(?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter\n(?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier\n  |\\\\(?:[0-9a-fA-F]{1,6}|.)\n)*',
            name: 'variable.css',
          },
          {
            begin: '(?<![-a-zA-Z])(?=[-a-zA-Z])',
            end: '$|(?![-a-zA-Z])',
            name: 'meta.property-name.css',
            patterns: [
              {
                include: '#property-names',
              },
            ],
          },
          {
            begin: '(:)\\s*',
            beginCaptures: {
              '1': {
                name: 'punctuation.separator.key-value.css',
              },
            },
            end: '\\s*(;)|\\s*(?=}|\\))',
            endCaptures: {
              '1': {
                name: 'punctuation.terminator.rule.css',
              },
            },
            contentName: 'meta.property-value.css',
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#property-values',
              },
            ],
          },
          {
            match: ';',
            name: 'punctuation.terminator.rule.css',
          },
        ],
      },
      selector: {
        begin:
          '(?x)\n(?=\n  (?:\\|)?                    # Possible anonymous namespace prefix\n  (?:\n    [-\\[:.*\\#a-zA-Z_]       # Valid selector character\n    |\n    [^\\x00-\\x7F]            # Which can include non-ASCII symbols\n    |\n    \\\\                      # Or an escape sequence\n    (?:[0-9a-fA-F]{1,6}|.)\n  )\n)',
        end: '(?=\\s*[/@{)])',
        name: 'meta.selector.css',
        patterns: [
          {
            include: '#selector-innards',
          },
        ],
      },
      'selector-innards': {
        patterns: [
          {
            include: '#comment-block',
          },
          {
            include: '#commas',
          },
          {
            include: '#escapes',
          },
          {
            include: '#combinators',
          },
          {
            captures: {
              '1': {
                name: 'entity.other.namespace-prefix.css',
              },
              '2': {
                name: 'punctuation.separator.css',
              },
            },
            match:
              "(?x)\n(?:^|(?<=[\\s,(};]))         # Follows whitespace, comma, semicolon, or bracket\n(?!\n  [-\\w*]+\n  \\|\n  (?!\n      [-\\[:.*\\#a-zA-Z_]    # Make sure there's a selector to match\n    | [^\\x00-\\x7F]\n  )\n)\n(\n  (?: [-a-zA-Z_]    | [^\\x00-\\x7F] )   # First letter\n  (?: [-a-zA-Z0-9_] | [^\\x00-\\x7F]     # Remainder of identifier\n    | \\\\(?:[0-9a-fA-F]{1,6}|.)\n  )*\n  |\n  \\*     # Universal namespace\n)?\n(\\|)     # Namespace separator",
          },
          {
            include: '#tag-names',
          },
          {
            match: '\\*',
            name: 'entity.name.tag.wildcard.css',
          },
          {
            captures: {
              '1': {
                name: 'punctuation.definition.entity.css',
              },
              '2': {
                patterns: [
                  {
                    include: '#escapes',
                  },
                ],
              },
            },
            match:
              '(?x) (?<![@\\w-])\n([.\\#])\n# Invalid identifier\n(\n  (?:\n    # Starts with ASCII digits, with possible hyphen preceding it\n    -?[0-9]\n    |\n    # Consists of a hyphen only\n    -                                      # Terminated by either:\n    (?= $                                  # - End-of-line\n      | [\\s,.\\#)\\[:{>+~|]               # - Followed by another selector\n      | /\\*                               # - Followed by a block comment\n    )\n    |\n    # Name contains unescaped ASCII symbol\n    (?:                                    # Check for acceptable preceding characters\n        [-a-zA-Z_0-9]|[^\\x00-\\x7F]       # - Valid selector character\n      | \\\\(?:[0-9a-fA-F]{1,6}|.)         # - Escape sequence\n    )*\n    (?:                                    # Invalid punctuation\n      [!"\'%&(*;<?@^`|\\]}]                 # - NOTE: We exempt `)` from the list of checked\n      |                                    #   symbols to avoid matching `:not(.invalid)`\n      / (?!\\*)                            # - Avoid invalidating the start of a comment\n    )+\n  )\n  # Mark remainder of selector invalid\n  (?: [-a-zA-Z_0-9]|[^\\x00-\\x7F]         # - Otherwise valid identifier characters\n    | \\\\(?:[0-9a-fA-F]{1,6}|.)           # - Escape sequence\n  )*\n)',
            name: 'invalid.illegal.bad-identifier.css',
          },
          {
            captures: {
              '1': {
                name: 'punctuation.definition.entity.css',
              },
              '2': {
                patterns: [
                  {
                    include: '#escapes',
                  },
                ],
              },
            },
            match:
              '(?x)\n(\\.)                                  # Valid class-name\n(\n  (?: [-a-zA-Z_0-9]|[^\\x00-\\x7F]     # Valid identifier characters\n    | \\\\(?:[0-9a-fA-F]{1,6}|.)       # Escape sequence\n  )+\n)                                      # Followed by either:\n(?= $                                  # - End of the line\n  | [\\s,.\\#)\\[:{>+~|]               # - Another selector\n  | /\\*                               # - A block comment\n)',
            name: 'entity.other.attribute-name.class.css',
          },
          {
            captures: {
              '1': {
                name: 'punctuation.definition.entity.css',
              },
              '2': {
                patterns: [
                  {
                    include: '#escapes',
                  },
                ],
              },
            },
            match:
              '(?x)\n(\\#)\n(\n  -?\n  (?![0-9])\n  (?:[-a-zA-Z0-9_]|[^\\x00-\\x7F]|\\\\(?:[0-9a-fA-F]{1,6}|.))+\n)\n(?=$|[\\s,.\\#)\\[:{>+~|]|/\\*)',
            name: 'entity.other.attribute-name.id.css',
          },
          {
            begin: '\\[',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.entity.begin.bracket.square.css',
              },
            },
            end: '\\]',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.entity.end.bracket.square.css',
              },
            },
            name: 'meta.attribute-selector.css',
            patterns: [
              {
                include: '#comment-block',
              },
              {
                include: '#string',
              },
              {
                captures: {
                  '1': {
                    name: 'storage.modifier.ignore-case.css',
                  },
                },
                match: '(?<=["\'\\s]|^|\\*/)\\s*([iI])\\s*(?=[\\s\\]]|/\\*|$)',
              },
              {
                captures: {
                  '1': {
                    name: 'string.unquoted.attribute-value.css',
                    patterns: [
                      {
                        include: '#escapes',
                      },
                    ],
                  },
                },
                match: '(?x)(?<==)\\s*((?!/\\*)(?:[^\\\\"\'\\s\\]]|\\\\.)+)',
              },
              {
                include: '#escapes',
              },
              {
                match: '[~|^$*]?=',
                name: 'keyword.operator.pattern.css',
              },
              {
                match: '\\|',
                name: 'punctuation.separator.css',
              },
              {
                captures: {
                  '1': {
                    name: 'entity.other.namespace-prefix.css',
                    patterns: [
                      {
                        include: '#escapes',
                      },
                    ],
                  },
                },
                match:
                  "(?x)\n# Qualified namespace prefix\n( -?(?!\\d)(?:[\\w-]|[^\\x00-\\x7F]|\\\\(?:[0-9a-fA-F]{1,6}|.))+\n| \\*\n)\n# Lookahead to ensure there's a valid identifier ahead\n(?=\n  \\| (?!\\s|=|$|\\])\n  (?: -?(?!\\d)\n   |   [\\\\\\w-]\n   |   [^\\x00-\\x7F]\n   )\n)",
              },
              {
                captures: {
                  '1': {
                    name: 'entity.other.attribute-name.css',
                    patterns: [
                      {
                        include: '#escapes',
                      },
                    ],
                  },
                },
                match:
                  '(?x)\n(-?(?!\\d)(?>[\\w-]|[^\\x00-\\x7F]|\\\\(?:[0-9a-fA-F]{1,6}|.))+)\n\\s*\n(?=[~|^\\]$*=]|/\\*)',
              },
            ],
          },
          {
            include: '#pseudo-classes',
          },
          {
            include: '#pseudo-elements',
          },
          {
            include: '#functional-pseudo-classes',
          },
          {
            match:
              '(?x) (?<![@\\w-])\n(?=            # Custom element names must:\n  [a-z]        # - start with a lowercase ASCII letter,\n  \\w* -       # - contain at least one dash\n)\n(?:\n  (?![A-Z])    # No uppercase ASCII letters are allowed\n  [\\w-]       # Allow any other word character or dash\n)+\n(?![(\\w-])',
            name: 'entity.name.tag.custom.css',
          },
        ],
      },
      string: {
        patterns: [
          {
            begin: '"',
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.string.begin.css',
              },
            },
            end: '"|(?<!\\\\)(?=$|\\n)',
            endCaptures: {
              '0': {
                name: 'punctuation.definition.string.end.css',
              },
            },
            name: 'string.quoted.double.css',
            patterns: [
              {
                begin: '(?:\\G|^)(?=(?:[^\\\\"]|\\\\.)+$)',
                end: '$',
                name: 'invalid.illegal.unclosed.string.css',
                patterns: [
                  {
                    include: '#escapes',
                  },
                ],
              },
              {
                include: '#escapes',
              },
            ],
          },
          {
            begin: "'",
            beginCaptures: {
              '0': {
                name: 'punctuation.definition.string.begin.css',
              },
            },
            end: "'|(?<!\\\\)(?=$|\\n)",
            endCaptures: {
              '0': {
                name: 'punctuation.definition.string.end.css',
              },
            },
            name: 'string.quoted.single.css',
            patterns: [
              {
                begin: "(?:\\G|^)(?=(?:[^\\\\']|\\\\.)+$)",
                end: '$',
                name: 'invalid.illegal.unclosed.string.css',
                patterns: [
                  {
                    include: '#escapes',
                  },
                ],
              },
              {
                include: '#escapes',
              },
            ],
          },
        ],
      },
      'tag-names': {
        match:
          '(?xi) (?<![\\w:-])\n(?:\n    # HTML\n    a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound\n  | big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command\n  | content|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|element|em|embed|fieldset\n  | figcaption|figure|font|footer|form|frame|frameset|h[1-6]|head|header|hgroup|hr|html|i\n  | iframe|image|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark\n  | marquee|math|menu|menuitem|meta|meter|multicol|nav|nextid|nobr|noembed|noframes|noscript\n  | object|ol|optgroup|option|output|p|param|picture|plaintext|pre|progress|q|rb|rp|rt|rtc\n  | ruby|s|samp|script|section|select|shadow|slot|small|source|spacer|span|strike|strong\n  | style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr\n  | track|tt|u|ul|var|video|wbr|xmp\n\n  # SVG\n  | altGlyph|altGlyphDef|altGlyphItem|animate|animateColor|animateMotion|animateTransform\n  | circle|clipPath|color-profile|cursor|defs|desc|discard|ellipse|feBlend|feColorMatrix\n  | feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap\n  | feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur\n  | feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting\n  | feSpotLight|feTile|feTurbulence|filter|font-face|font-face-format|font-face-name\n  | font-face-src|font-face-uri|foreignObject|g|glyph|glyphRef|hatch|hatchpath|hkern\n  | line|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|metadata\n  | missing-glyph|mpath|path|pattern|polygon|polyline|radialGradient|rect|set|solidcolor\n  | stop|svg|switch|symbol|text|textPath|tref|tspan|use|view|vkern\n\n  # MathML\n  | annotation|annotation-xml|maction|maligngroup|malignmark|math|menclose|merror|mfenced\n  | mfrac|mglyph|mi|mlabeledtr|mlongdiv|mmultiscripts|mn|mo|mover|mpadded|mphantom|mroot\n  | mrow|ms|mscarries|mscarry|msgroup|msline|mspace|msqrt|msrow|mstack|mstyle|msub|msubsup\n  | msup|mtable|mtd|mtext|mtr|munder|munderover|semantics\n)\n(?=[+~>\\s,.\\#|){:\\[]|/\\*|$)',
        name: 'entity.name.tag.css',
      },
      'unicode-range': {
        captures: {
          '0': {
            name: 'constant.other.unicode-range.css',
          },
          '1': {
            name: 'punctuation.separator.dash.unicode-range.css',
          },
        },
        match: '(?<![\\w-])[Uu]\\+[0-9A-Fa-f?]{1,6}(?:(-)[0-9A-Fa-f]{1,6})?(?![\\w-])',
      },
      url: {
        begin: '(?i)(?<![\\w@-])(url)(\\()',
        beginCaptures: {
          '1': {
            name: 'support.function.url.css',
          },
          '2': {
            name: 'punctuation.section.function.begin.bracket.round.css',
          },
        },
        end: '\\)',
        endCaptures: {
          '0': {
            name: 'punctuation.section.function.end.bracket.round.css',
          },
        },
        name: 'meta.function.url.css',
        patterns: [
          {
            match: '[^\'")\\s]+',
            name: 'variable.parameter.url.css',
          },
          {
            include: '#string',
          },
          {
            include: '#comment-block',
          },
          {
            include: '#escapes',
          },
        ],
      },
    },
  },
};
