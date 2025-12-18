/* eslint-disable id-blacklist */
/* eslint-disable no-template-curly-in-string */
import type { languages } from 'monaco-editor';

const config: languages.LanguageConfiguration = {
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
    { open: '"', close: '"', notIn: ['string'] },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  folding: {
    markers: {
      start: new RegExp('^\\s*%.*region\\b'),
      end: new RegExp('^\\s*%.*endregion\\b'),
    },
  },
};

const tokens: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.mzn',

  keywords: [
    'ann',
    'annotation',
    'any',
    'array',
    'bool',
    'constraint',
    'default',
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

  // Standard library functions (kept from original, as grammar doesn't enumerate stdlib)
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
    '==',
    '!=',
    '<',
    '<=',
    '>',
    '>=',
    '+',
    '-',
    '*',
    '/',
    '++',
    '->',
    '<-',
    '<->',
    '\\/',
    '/\\',
    '..',
    '::',
    // Unicode operators from grammar
    '⟷',
    '⇔',
    '→',
    '⇒',
    '←',
    '⇐',
    '∨',
    '∧',
    '⊻',
    '≠',
    '≤',
    '≥',
    '∈',
    '⊆',
    '⊇',
    '∪',
    '∩',
    '∖',
    '¬',
  ],

  // Special constants
  constants: ['infinity', '∞', '∅'],

  // Regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // Escape sequences in strings
  escapes: /\\(?:[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|["\\nrt])/,

  tokenizer: {
    root: [
      // Identifiers and keywords
      [
        /[a-z_][\w_]*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@builtins': 'predefined',
            '@constants': 'constant',
            '@default': 'identifier',
          },
        },
      ],
      // Quoted identifiers (e.g. 'My Variable')
      [/'[^']*'/, 'identifier.quote'],

      // Type identifiers (Capitalized)
      [/[A-Z][\w_]*/, 'type.identifier'],

      // Anonymous variable
      [/_/, 'keyword'],

      // Annotations (:: identifier)
      [/::\s*[a-zA-Z_]\w*/, 'annotation'],

      // Whitespace
      { include: '@whitespace' },

      // Delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],

      // Unicode operators and standard symbols
      [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],
      [/[\u2190-\u22FF]/, { cases: { '@operators': 'operator', '@default': '' } }], // Catch-all for math symbols if not explicitly listed

      // Numbers
      [/0x[0-9a-fA-F]+/, 'number.hex'],
      [/0o[0-7]+/, 'number.octal'],
      [/0b[0-1]+/, 'number.binary'],
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/\d+([eE][\-+]?\d+)?/, 'number'],

      // Strings
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      // String Interpolation: \( expression )
      [/\\\(/, { token: 'string.escape', bracket: '@open', next: '@interpolation' }],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    interpolation: [
      // When inside \( ... ), we switch back to root tokenization until we hit the closing )
      [/\)/, { token: 'string.escape', bracket: '@close', next: '@pop' }],
      { include: '@root' },
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/%(?!\{).*/, 'comment'], // Single line comment
      [/\/\*/, 'comment', '@comment'], // Block comment start /*
    ],

    comment: [
      [/[^*/]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // Nested comment
      [/\*\//, 'comment', '@pop'], // Block comment end */
      [/[*/]/, 'comment'],
    ],
  },
};

// Completion Item Provider
const completions: languages.CompletionItemProvider = {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    // Helper to create completion items
    const createItem = (
      label: string,
      kind: languages.CompletionItemKind,
      insertText: string,
      detail?: string,
    ) => ({
      label,
      kind,
      insertText,
      detail: detail || 'MiniZinc Keyword',
      range,
    });

    // Keywords from the language definition
    const keywords = tokens.keywords as string[];
    const builtins = tokens.builtins as string[];

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
        label: 'solve maximize',
        insertText: 'solve maximize ${1:variable};',
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
      {
        label: 'if-then-else',
        insertText: 'if ${1:condition} then\n\t${2:expression}\nelse\n\t${3:expression}\nendif',
        detail: 'If-Then-Else',
      },
      {
        label: 'let',
        insertText: 'let {\n\t${1:local_var}\n} in (\n\t${2:expression}\n)',
        detail: 'Let expression',
      },
      {
        label: 'predicate',
        insertText: 'predicate ${1:name}(${2:params}) = \n\t${3:body};',
        detail: 'Predicate definition',
      },
    ];

    const suggestions = [
      ...keywords.map((k) => createItem(k, 17 /* Keyword */, k)),
      ...builtins.map((b) => createItem(b, 18 /* Function */, b, 'Built-in Function')),
      ...snippets.map((s) => ({
        label: s.label,
        kind: 27 /* Snippet */,
        insertText: s.insertText,
        insertTextRules: 4 /* InsertAsSnippet */,
        documentation: s.detail,
        range,
      })),
    ];

    return { suggestions };
  },
};

export default {
  config,
  tokens,
  completions,
};
