export default {
  config: {
    comments: {
      lineComment: '%',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
  },
  tokens: {
    defaultToken: '',
    tokenPostfix: '.prolog',

    // Common regular expressions
    atom: /[a-z][a-zA-Z0-9_]*/,
    variable: /[A-Z_][a-zA-Z0-9_]*/,

    builtins: [
      'write',
      'writeln',
      'nl',
      'read',
      'get',
      'put',
      'assert',
      'retract',
      'consult',
      'fail',
      'true',
      'is',
      'mod',
      'rem',
      'not',
      'repeat',
      '!',
      'member',
      'append',
      'length',
      'findall',
      'bagof',
      'setof',
    ],

    tokenizer: {
      root: [
        // --- FIXED COMMENT LOGIC ---
        // Match % followed by anything that is NOT a newline
        [/%[^\n\r]*/, 'comment'],

        // Block comments
        [/\/\*/, 'comment', '@commentBlock'],

        // Strings (Double quotes)
        [/"/, 'string', '@stringDouble'],

        // Quoted Atoms (Single quotes)
        [/'/, 'string.atom', '@stringSingle'],

        // Cut operator
        [/!/, 'keyword.cut'],

        // Comparison and Math Operators
        [/:-|-->/, 'keyword.operator'],
        [/[=><\\+\-\*\/]+/, 'operator'],

        // Variables
        [/@variable/, 'variable'],

        // Built-in predicates vs Normal Atoms
        [
          /@atom/,
          {
            cases: {
              '@builtins': 'predefined',
              '@default': 'type.identifier',
            },
          },
        ],

        // Numbers
        [/\d+(\.\d+)?/, 'number'],

        // Brackets and punctuation
        [/[[]\{\}\(\)\.,|]/, 'delimiter'],

        // Whitespace
        [/\s+/, 'white'],
      ],

      commentBlock: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment'],
      ],

      stringDouble: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop'],
      ],

      stringSingle: [
        [/[^\\']+/, 'string.atom'],
        [/\\./, 'string.escape'],
        [/'/, 'string.atom', '@pop'],
      ],
    },
  },
};
