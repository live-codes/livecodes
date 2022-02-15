export default {
  tokens: {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    keywords: [
      'import',
      'export',
      'from',
      'as',
      'fn',
      'await',
      '[await]',
      'if',
      'else',
      'true',
      'false',
      'and',
      'or',
      'not',
      'type',
      'list',
    ],

    typeKeywords: ['Number', 'String', 'Function', 'Array'],

    operators: ['>', '<', ':', '=', '<=', '>=', '!=', '+', '-', '*', '/', '//', '|', '**', '%'],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        [/fn/, { token: 'keyword', next: '@function' }],
        [/->/, { token: 'operators', next: '@chain' }],

        // identifiers and keywords
        [
          /[a-zA-Z_$][\w$]*/i,
          {
            cases: {
              '@typeKeywords': 'keyword',
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],

        // whitespace
        { include: '@whitespace' },

        // delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [
          /@symbols/,
          {
            cases: {
              '@operators': 'operator',
              '@default': '',
            },
          },
        ],

        // @ annotations.
        // As an example, we emit a debugging log message on these tokens.
        // Note: message are supressed during the first load -- change some lines to see them.
        [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation' }],

        // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // single-quote strings
        [/"([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/'/, { token: 'string.quote', bracket: '@open', next: '@stringSingle' }],
      ],

      // eslint-disable-next-line id-blacklist
      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      stringSingle: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/--.*$/, 'comment'],
      ],

      function: [[/[a-zA-Z0-9_]+/, { token: 'variable', next: '@pop' }]],

      chain: [
        [/\*/, 'operators'],
        [/\[?await\]?/, 'keyword'],
        [/[a-zA-Z]+/, { token: 'variable', next: '@pop' }],
      ],
    },
  },
};
