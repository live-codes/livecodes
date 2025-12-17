/* eslint-disable id-blacklist */
/* eslint-disable no-template-curly-in-string */
export default {
  config: {
    comments: {
      lineComment: '%',
      blockComment: ['%{', '}%'],
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
      { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
    ],
  },
  tokens: {
    // Set default token
    defaultToken: '',

    // Keywords based on MiniZinc specification
    keywords: [
      'ann',
      'annotation',
      'any',
      'array',
      'bool',
      'case',
      'constraint',
      'diff',
      'div',
      'else',
      'elseif',
      'endif',
      'enum',
      'false',
      'float',
      'function',
      'if',
      'in',
      'include',
      'int',
      'intersect',
      'let',
      'list',
      'maximize',
      'minimize',
      'mod',
      'not',
      'of',
      'op',
      'opt',
      'output',
      'par',
      'predicate',
      'record',
      'satisfy',
      'set',
      'solve',
      'string',
      'subset',
      'superset',
      'symdiff',
      'test',
      'then',
      'true',
      'tuple',
      'type',
      'union',
      'var',
      'where',
      'xor',
    ],

    // Standard built-in functions (subset)
    builtins: [
      'abs',
      'acos',
      'acosh',
      'all_different',
      'alldifferent',
      'asin',
      'asinh',
      'assert',
      'atan',
      'atanh',
      'bool2int',
      'card',
      'ceil',
      'concat',
      'cos',
      'cosh',
      'count',
      'cumulative',
      'dom',
      'dom_array',
      'dom_bounds_array',
      'dom_size',
      'exp',
      'fix',
      'floor',
      'forall',
      'index_set',
      'index_set_1of2',
      'index_set_2of2',
      'int2float',
      'is_fixed',
      'join',
      'lb',
      'lb_array',
      'length',
      'ln',
      'log',
      'log10',
      'log2',
      'max',
      'min',
      'pow',
      'product',
      'round',
      'set2array',
      'show',
      'show_float',
      'show_int',
      'sin',
      'sinh',
      'sqrt',
      'sum',
      'tan',
      'tanh',
      'trace',
      'ub',
      'ub_array',
    ],

    operators: [
      '=',
      '!=',
      '<',
      '<=',
      '>',
      '>=',
      '+',
      '-',
      '*',
      '/',
      '->',
      '<-',
      '<->',
      '\\/',
      '/\\',
      '..',
      '::',
    ],

    // Regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // Identifiers and keywords
        [
          /[a-z_][\w_]*/,
          {
            cases: { '@keywords': 'keyword', '@builtins': 'predefined', '@default': 'identifier' },
          },
        ],
        [/[A-Z][\w_]*/, 'type.identifier'],

        // Whitespace
        { include: '@whitespace' },

        // Delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],

        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // Strings
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/%(?!\{).*/, 'comment'], // Single line comment starting with %
        [/%\{/, 'comment', '@comment'], // Block comment start %{
      ],

      comment: [
        [/[^%\}]+/, 'comment'],
        [/%\{/, 'comment', '@push'], // Nested comment
        [/\}%/, 'comment', '@pop'], // Block comment end }%
        [/[%\}]/, 'comment'],
      ],
    },
  },
  completions: {
    provideCompletionItems(
      model: { getWordUntilPosition: (arg0: any) => any },
      position: { lineNumber: any },
    ) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Helper to create completion items
      const createItem = (label: string, kind: any, insertText: string, detail?: string) => ({
        label,
        kind,
        insertText,
        detail: detail || 'MiniZinc Keyword',
        range,
      });

      const keywords = [
        'var',
        'int',
        'float',
        'bool',
        'set',
        'array',
        'of',
        'constraint',
        'solve',
        'satisfy',
        'minimize',
        'maximize',
        'output',
        'include',
        'predicate',
        'function',
        'test',
      ];

      const snippets = [
        {
          label: 'constraint',
          insertText: 'constraint ${1:expression};',
          detail: 'Constraint declaration',
        },
        {
          label: 'solve satisfy',
          insertText: 'solve satisfy;',
          detail: 'Solve goal',
        },
        {
          label: 'solve minimize',
          insertText: 'solve minimize ${1:variable};',
          detail: 'Optimization goal',
        },
        {
          label: 'array',
          insertText: 'array[${1:1..n}] of var ${2:int}: ${3:x};',
          detail: 'Array declaration',
        },
        {
          label: 'output',
          insertText: 'output ["${1:text} = ", show(${2:var}), "\\n"];',
          detail: 'Output statement',
        },
      ];

      const suggestions = [
        ...keywords.map((k) =>
          createItem(k, (window as any).monaco.languages.CompletionItemKind.Keyword, k),
        ),
        ...snippets.map((s) => ({
          label: s.label,
          kind: (window as any).monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules: (window as any).monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
          documentation: s.detail,
          range,
        })),
      ];

      return { suggestions };
    },
  },
};
