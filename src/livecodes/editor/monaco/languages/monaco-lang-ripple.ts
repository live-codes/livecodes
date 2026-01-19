/* eslint-disable id-blacklist */
/* eslint-disable no-template-curly-in-string */
import type * as Monaco from 'monaco-editor';
import type { IRange, languages } from 'monaco-editor';

const monaco = (window as any).monaco;

const config: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    // ['<', '>'] // enabling this caused lots of errors with arrorw functions
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '`', close: '`' },
    { open: '<', close: '>' },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '`', close: '`' },
    { open: '<', close: '>' },
  ],
  folding: {
    markers: {
      start: /^\s*\/\/\s*#?region\b/,
      end: /^\s*\/\/\s*#?endregion\b/,
    },
  },
};

const tokens: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.ripple',

  keywords: [
    'break',
    'case',
    'catch',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'from',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'let',
    'new',
    'of',
    'return',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
    'async',
    'await',
    'class',
    'enum',
    'implements',
    'interface',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'component',
    'index',
    'key',
  ],

  rippleBuiltins: [
    'track',
    'untrack',
    'effect',
    'mount',
    'flushSync',
    'tick',
    'on',
    'trackSplit',
    'Context',
    'Portal',
    'TrackedArray',
    'TrackedObject',
    'TrackedSet',
    'TrackedMap',
    'TrackedDate',
    'html',
    'ref',
  ],

  typeKeywords: [
    'any',
    'boolean',
    'number',
    'object',
    'string',
    'undefined',
    'never',
    'unknown',
    'void',
    'null',
    'Component',
    'Tracked',
    'PropsWithChildren',
  ],

  constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],

  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,

  tokenizer: {
    root: [{ include: '@whitespaceAndComments' }, { include: '@jsx' }, { include: '@expressions' }],

    whitespaceAndComments: [
      [/[ \t\r\n]+/, ''],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],

    expressions: [
      // Arrow function - must come before other operators
      [/=>/, 'keyword'],

      // Reactive @ prefix
      [/@[a-zA-Z_$][\w$]*/, 'variable'],
      [/@(?=\()/, 'variable'],

      // Tracked collection syntax #[] and #{}
      [/#\[/, 'keyword'],
      [/#\{/, 'keyword'],

      // Component keyword
      [/\b(component)\b/, 'keyword'],

      // Identifiers
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@rippleBuiltins': 'type',
            '@constants': 'keyword',
            '@default': 'identifier',
          },
        },
      ],

      // Type identifiers (PascalCase)
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'type',
            '@default': 'type.identifier',
          },
        },
      ],

      // Delimiters and brackets
      [/[{}()\[\]]/, '@brackets'],

      // Operators
      [/<=|>=|===|!==|==|!=|&&|\|\||\?\?/, 'operator'],
      [/\+\+|--|\*\*/, 'operator'],
      [/<<|>>>|>>/, 'operator'],
      [/[<>]/, 'operator'],
      [/[+\-*\/%&|^~!?:=]/, 'operator'],

      // Numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/0[oO][0-7]+/, 'number.octal'],
      [/0[bB][01]+/, 'number.binary'],
      [/@digits/, 'number'],

      // Delimiter
      [/[;,.]/, 'delimiter'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],
      [/`/, 'string', '@string_backtick'],
    ],

    jsx: [
      // JSX style tag - switch to CSS mode
      [/<style>/, { token: 'tag', next: '@styleBlock', nextEmbedded: 'text/css' }],

      // TSX React blocks
      [/<tsx:react>/, 'tag'],
      [/<\/tsx:react>/, 'tag'],

      // Children component
      [/<children\s*\/>/, 'tag'],

      // Dynamic component tags <@Component />
      [/<\/@[a-zA-Z_$][\w$]*>/, 'tag'],
      [/<@[a-zA-Z_$][\w$]*/, { token: 'tag', next: '@jsxStartTag' }],

      // Closing tags
      [/<\/[a-zA-Z_$][\w$.-]*\s*>/, 'tag'],

      // Opening tags - be careful not to match comparison operators
      [/<[a-zA-Z_$][\w$.-]*/, { token: 'tag', next: '@jsxStartTag' }],
    ],

    jsxStartTag: [
      [/\s+/, ''],
      // Special attributes
      [/\{ref\b/, { token: 'keyword', next: '@jsxAttributeExpression' }],
      [/\{html\b/, { token: 'keyword', next: '@jsxAttributeExpression' }],
      // Expression attribute value
      [
        /(\w+)(\s*)(=)(\s*)(\{)/,
        [
          'attribute.name',
          '',
          'delimiter',
          '',
          { token: 'delimiter.bracket', next: '@jsxAttributeExpression' },
        ],
      ],
      // Simple attribute with string value
      [/(\w+)(\s*)(=)(\s*)("[^"]*"|'[^']*')/, ['attribute.name', '', 'delimiter', '', 'string']],
      // Boolean attribute
      [/[a-zA-Z_$][\w$]*/, 'attribute.name'],
      // Self-closing tag
      [/\/>/, { token: 'tag', next: '@pop' }],
      // End of opening tag
      [/>/, { token: 'tag', next: '@pop' }],
    ],

    jsxAttributeExpression: [
      [/\{/, { token: 'delimiter.bracket', next: '@jsxAttributeExpression' }],
      [/\}/, { token: 'delimiter.bracket', next: '@pop' }],
      { include: '@whitespaceAndComments' },
      { include: '@jsxExpressionContent' },
    ],

    jsxExpressionContent: [
      // Arrow function
      [/=>/, 'keyword'],

      // Reactive @ prefix
      [/@[a-zA-Z_$][\w$]*/, 'variable'],
      [/@(?=\()/, 'variable'],

      // Identifiers
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@rippleBuiltins': 'type',
            '@constants': 'keyword',
            '@default': 'identifier',
          },
        },
      ],

      // Type identifiers
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'type',
            '@default': 'type.identifier',
          },
        },
      ],

      // Brackets (not braces - those are handled by the parent state)
      [/[(\[\]]/, '@brackets'],
      [/\)/, '@brackets'],

      // Operators - but NOT > or < alone as they could be confused
      [/<=|>=|===|!==|==|!=|&&|\|\||\?\?/, 'operator'],
      [/\+\+|--|\*\*/, 'operator'],
      [/<<|>>>|>>/, 'operator'],
      [/[+\-*\/%&|^~!?:=<>]/, 'operator'],

      // Numbers
      [/\d+/, 'number'],

      // Delimiter
      [/[;,.]/, 'delimiter'],

      // Strings
      [/"[^"]*"/, 'string'],
      [/'[^']*'/, 'string'],
      [/`/, 'string', '@string_backtick_in_jsx'],
    ],

    string_backtick_in_jsx: [
      [/\$\{/, { token: 'delimiter.bracket', next: '@templateExpressionInJsx' }],
      [/[^\\`$]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/`/, 'string', '@pop'],
    ],

    templateExpressionInJsx: [
      [/\{/, { token: 'delimiter.bracket', next: '@templateExpressionInJsx' }],
      [/\}/, { token: 'delimiter.bracket', next: '@pop' }],
      { include: '@whitespaceAndComments' },
      { include: '@jsxExpressionContent' },
    ],

    styleBlock: [
      [/<\/style>/, { token: 'tag', next: '@pop', nextEmbedded: '@pop' }],
      [/[^<]+/, ''],
      [/./, ''],
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment'],
    ],

    string_double: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop'],
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/'/, 'string', '@pop'],
    ],

    string_backtick: [
      [/\$\{/, { token: 'delimiter.bracket', next: '@templateExpression' }],
      [/[^\\`$]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/`/, 'string', '@pop'],
    ],

    templateExpression: [
      [/\{/, { token: 'delimiter.bracket', next: '@templateExpression' }],
      [/\}/, { token: 'delimiter.bracket', next: '@pop' }],
      { include: '@whitespaceAndComments' },
      { include: '@expressions' },
    ],
  },
};

// Completion items
function createCompletionItems(monaco: typeof Monaco, range: IRange) {
  return [
    // Component definition
    {
      label: 'component',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'component ${1:ComponentName}(${2:props}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define a new Ripple component',
      range: range,
    },
    {
      label: 'export component',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'export component ${1:ComponentName}(${2:props}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define and export a new Ripple component',
      range: range,
    },
    // Reactivity
    {
      label: 'track',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'track(${1:initialValue})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a tracked reactive value. Use @ to read/write.',
      range: range,
    },
    {
      label: 'track (derived)',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'track(() => ${1:expression})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a derived reactive value that updates when dependencies change.',
      range: range,
    },
    {
      label: 'effect',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'effect(() => {\n\t$0\n});',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a reactive side effect that runs when dependencies change.',
      range: range,
    },
    {
      label: 'untrack',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'untrack(() => ${1:expression})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Prevent reactivity tracking for an expression.',
      range: range,
    },
    {
      label: 'trackSplit',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "const [${1:children}, ${2:rest}] = trackSplit(props, ['${3:children}']);",
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Split props into tracked variables while preserving reactivity.',
      range: range,
    },
    {
      label: 'tick',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'tick().then(() => {\n\t$0\n});',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Wait for all pending reactive updates to be applied to the DOM.',
      range: range,
    },
    // Collections
    {
      label: 'TrackedArray',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new TrackedArray(${1:items})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a fully reactive array. All elements are reactive.',
      range: range,
    },
    {
      label: '#[] TrackedArray',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '#[${1:items}]',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a TrackedArray using shorthand syntax.',
      range: range,
    },
    {
      label: 'TrackedObject',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new TrackedObject({${1:properties}})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a fully reactive object with shallow reactivity.',
      range: range,
    },
    {
      label: '#{} TrackedObject',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '#{${1:properties}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a TrackedObject using shorthand syntax.',
      range: range,
    },
    {
      label: 'TrackedSet',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new TrackedSet([${1:items}])',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a reactive Set.',
      range: range,
    },
    {
      label: 'TrackedMap',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new TrackedMap([[${1:key}, ${2:value}]])',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a reactive Map.',
      range: range,
    },
    {
      label: 'TrackedDate',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new TrackedDate(${1:year}, ${2:month}, ${3:day})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a reactive Date.',
      range: range,
    },
    // Context
    {
      label: 'Context',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: 'new Context(${1:defaultValue})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Create a Context for sharing values through the component tree.',
      range: range,
    },
    // Control flow
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if (${1:condition}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Conditional rendering in Ripple template.',
      range: range,
    },
    {
      label: 'if-else',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Conditional rendering with else branch.',
      range: range,
    },
    {
      label: 'for-of',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'for (const ${1:item} of ${2:items}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Loop over items in Ripple template.',
      range: range,
    },
    {
      label: 'for-of (with index)',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'for (const ${1:item} of ${2:items}; index ${3:i}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Loop with index variable.',
      range: range,
    },
    {
      label: 'for-of (with key)',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'for (const ${1:item} of ${2:items}; index ${3:i}; key ${4:item.id}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Loop with index and key for stable identity.',
      range: range,
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText:
        'switch (${1:expression}) {\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\t\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Switch statement for conditional rendering.',
      range: range,
    },
    {
      label: 'try-catch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'try {\n\t$1\n} catch (${2:e}) {\n\t$0\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Error boundary using try-catch.',
      range: range,
    },
    // Events
    {
      label: 'onClick',
      kind: monaco.languages.CompletionItemKind.Property,
      insertText: 'onClick={() => ${1:handler}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Click event handler.',
      range: range,
    },
    {
      label: 'onInput',
      kind: monaco.languages.CompletionItemKind.Property,
      insertText: 'onInput={(e) => ${1:handler}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Input event handler.',
      range: range,
    },
    {
      label: 'onChange',
      kind: monaco.languages.CompletionItemKind.Property,
      insertText: 'onChange={(e) => ${1:handler}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Change event handler.',
      range: range,
    },
    // Refs
    {
      label: '{ref}',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '{ref ${1:refCallback}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'DOM reference callback. Return cleanup function for unmount.',
      range: range,
    },
    {
      label: '{html}',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '{html ${1:htmlString}}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Render raw HTML (use with trusted content only).',
      range: range,
    },
    // Portal
    {
      label: 'Portal',
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: '<Portal target={${1:document.body}}>\n\t$0\n</Portal>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Render content outside normal component hierarchy.',
      range: range,
    },
    // React compat
    {
      label: 'tsx:react',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<tsx:react>\n\t$0\n</tsx:react>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Embed React JSX inside Ripple component.',
      range: range,
    },
    // Imports
    {
      label: 'import from ripple',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "import { ${1:track, effect} } from 'ripple';",
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Import from Ripple.',
      range: range,
    },
    {
      label: 'import type',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "import type { ${1:Component, Tracked} } from 'ripple';",
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Import types from Ripple.',
      range: range,
    },
    // on
    {
      label: 'on',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "on(${1:window}, '${2:event}', (e) => {\n\t$0\n})",
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Attach event listener with optimized delegation.',
      range: range,
    },
    // Children
    {
      label: '<children />',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<children />',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Render children passed to this component.',
      range: range,
    },
    // Style
    {
      label: '<style>',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<style>\n\t${1:.class} {\n\t\t$0\n\t}\n</style>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Scoped CSS styles for this component.',
      range: range,
    },
  ];
}
// Completion Item Provider
const completions: languages.CompletionItemProvider = {
  provideCompletionItems: function (model, position) {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: createCompletionItems(monaco, range),
    };
  },
};

const hover: languages.HoverProvider = {
  provideHover: function (model, position) {
    const lineContent = model.getLineContent(position.lineNumber);
    const col = position.column - 1;

    // Check for @ symbol
    if (lineContent[col] === '@' || (col > 0 && lineContent[col - 1] === '@')) {
      return {
        contents: [
          { value: '**Ripple Reactive Access (`@`)**' },
          {
            value:
              'The `@` operator reads or writes a `Tracked<V>` value.\n\n```ripple\nlet count = track(0);\nconsole.log(@count); // Read\n@count++;            // Write\n```\n\nUse inside templates and effects for automatic reactivity.',
          },
        ],
      };
    }

    // Check for # symbol (tracked collections)
    if (lineContent[col] === '#' || (col > 0 && lineContent[col - 1] === '#')) {
      return {
        contents: [
          { value: '**Ripple Tracked Collections (`#`)**' },
          {
            value:
              '`#[]` creates a `TrackedArray` - fully reactive array\n\n`#{}` creates a `TrackedObject` - shallow reactive object\n\n```ripple\nlet items = #[1, 2, 3];\nlet config = #{ theme: "dark" };\n```\n\nNo need for `@` when accessing elements.',
          },
        ],
      };
    }

    // Check for component keyword
    const wordAtPos = model.getWordAtPosition(position);
    if (wordAtPos) {
      const word = wordAtPos.word;

      if (word === 'component') {
        return {
          contents: [
            { value: '**Ripple Component**' },
            {
              value:
                'Define a component using the `component` keyword.\n\n```ripple\ncomponent Button(props: { text: string }) {\n  <button>{props.text}</button>\n}\n```\n\nComponents use statement-based templates, not return statements.',
            },
          ],
        };
      }

      if (word === 'track') {
        return {
          contents: [
            { value: '**track(initialValue)**' },
            {
              value:
                'Create a reactive `Tracked<V>` value.\n\n```ripple\nlet count = track(0);        // Simple value\nlet double = track(() => @count * 2); // Derived\n```\n\nAccess with `@count`, not `count`.',
            },
          ],
        };
      }

      if (word === 'effect') {
        return {
          contents: [
            { value: '**effect(callback)**' },
            {
              value:
                'Create a reactive side effect.\n\n```ripple\neffect(() => {\n  console.log("Count:", @count);\n});\n```\n\nRe-runs when any accessed `@` value changes.',
            },
          ],
        };
      }

      if (word === 'untrack') {
        return {
          contents: [
            { value: '**untrack(callback)**' },
            {
              value:
                "Prevent dependency tracking.\n\n```ripple\neffect(() => {\n  // Won't re-run when @count changes\n  console.log(untrack(() => @count));\n});\n```",
            },
          ],
        };
      }
    }

    return null;
  },
};

const definitions: languages.DefinitionProvider = {
  provideDefinition(model, position) {
    const definitions: Monaco.languages.Location[] = [];
    const wordAtPosition = model.getWordAtPosition(position);

    if (!wordAtPosition) return null;

    const word = wordAtPosition.word;
    const lineContent = model.getLineContent(position.lineNumber);

    // Check if we're clicking on a @ prefixed variable (e.g., @count)
    const charBefore = lineContent[wordAtPosition.startColumn - 2];
    const isReactiveAccess = charBefore === '@';
    const searchWord = isReactiveAccess ? word : word;

    // Search through all Ripple models for definitions
    const rippleModels = monaco.editor
      .getModels()
      .filter((m: Monaco.editor.ITextModel) => m.getLanguageId() === 'ripple');

    for (const targetModel of rippleModels) {
      const text = targetModel.getValue();
      const lines = text.split('\n');

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];

        // Match: let identifier = track(...)
        const trackMatch = line.match(new RegExp(`\\blet\\s+(${searchWord})\\s*=\\s*track\\s*\\(`));
        if (trackMatch) {
          const startCol = line.indexOf(trackMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: let identifier = #[...] or #{ ... }
        const trackedCollectionMatch = line.match(
          new RegExp(`\\blet\\s+(${searchWord})\\s*=\\s*#[\\[\\{]`),
        );
        if (trackedCollectionMatch) {
          const startCol = line.indexOf(trackedCollectionMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: const/let/var identifier = (non-track assignments)
        const variableMatch = line.match(
          new RegExp(`\\b(const|let|var)\\s+(${searchWord})\\s*=(?!\\s*track)`),
        );
        if (variableMatch) {
          const startCol = line.indexOf(variableMatch[2], line.indexOf(variableMatch[1])) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: component ComponentName(...)
        const componentMatch = line.match(new RegExp(`\\bcomponent\\s+(${searchWord})\\s*\\(`));
        if (componentMatch) {
          const startCol = line.indexOf(componentMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: function functionName(...)
        const functionMatch = line.match(new RegExp(`\\bfunction\\s+(${searchWord})\\s*\\(`));
        if (functionMatch) {
          const startCol = line.indexOf(functionMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: const ComponentName = (for arrow function components)
        const arrowComponentMatch = line.match(
          new RegExp(`\\bconst\\s+(${searchWord})\\s*=\\s*\\(`),
        );
        if (arrowComponentMatch) {
          const startCol = line.indexOf(arrowComponentMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: interface InterfaceName or type TypeName
        const typeMatch = line.match(new RegExp(`\\b(interface|type)\\s+(${searchWord})\\b`));
        if (typeMatch) {
          const startCol = line.indexOf(typeMatch[2], line.indexOf(typeMatch[1])) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: class ClassName
        const classMatch = line.match(new RegExp(`\\bclass\\s+(${searchWord})\\b`));
        if (classMatch) {
          const startCol = line.indexOf(classMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: for loop variables (for const item of items; index i; key k)
        const forLoopMatch = line.match(
          new RegExp(`\\bfor\\s*\\(\\s*const\\s+(${searchWord})\\s+of\\b`),
        );
        if (forLoopMatch) {
          const startCol = line.indexOf(forLoopMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: index variable in for loop
        const indexMatch = line.match(new RegExp(`\\bindex\\s+(${searchWord})\\b`));
        if (indexMatch) {
          const startCol = line.indexOf(indexMatch[1], line.indexOf('index')) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: function/component parameters
        const paramMatch = line.match(new RegExp(`\\(.*\\b(${searchWord})\\s*[,:)]`));
        if (
          paramMatch &&
          (line.includes('component') || line.includes('function') || line.includes('=>'))
        ) {
          const startCol = line.indexOf(paramMatch[1], line.indexOf('(')) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }
      }
    }

    // Remove duplicates based on uri and range
    const uniqueDefinitions = definitions.filter(
      (def, index, self) =>
        index ===
        self.findIndex(
          (d) =>
            d.uri.toString() === def.uri.toString() &&
            d.range.startLineNumber === def.range.startLineNumber &&
            d.range.startColumn === def.range.startColumn,
        ),
    );

    return uniqueDefinitions.length > 0 ? uniqueDefinitions : null;
  },
};

export default {
  config,
  tokens,
  completions,
  hover,
  definitions,
};
