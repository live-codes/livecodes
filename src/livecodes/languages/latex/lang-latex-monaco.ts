const brackets = [
  ['{', '}'],
  ['[', ']'],
  ['(', ')'],
];

const monarchBrackets = brackets.map(([open, close]) => ({ open, close, token: '@brackets' }));

const autoClosingPairs = [
  { open: '{', close: '}' },
  { open: '[', close: ']' },
  { open: '(', close: ')' },
  { open: '$', close: '$' },
];

export const registerLatexMonaco = (monaco: any) => {
  monaco.languages.register({
    id: 'latex',
    extensions: ['.tex', '.ltx'],
    aliases: ['LaTeX', 'latex', 'tex'],
  });

  monaco.languages.setLanguageConfiguration('latex', {
    comments: { lineComment: '%' },
    brackets,
    autoClosingPairs,
    surroundingPairs: autoClosingPairs,
    folding: {
      markers: {
        start: /\\begin\{/,
        end: /\\end\{/,
      },
    },
  });

  monaco.languages.setMonarchTokensProvider('latex', {
    tokenPostfix: '.latex',
    brackets: monarchBrackets,
    tokenizer: {
      root: [
        [/%.*$/, 'comment'],
        [/\$\$?/, { token: 'string', next: '@math' }],
        [/\\\[/, { token: 'string', next: '@displayMath' }],
        [/\\\(/, { token: 'string', next: '@inlineMath' }],
        [/\\(?:[a-zA-Z@]+|.)/, 'keyword'],
        [/[{}[\]]/, '@brackets'],
        [/[&~_^]/, 'operator'],
        [/\d+(?:\.\d+)?/, 'number'],
      ],
      math: [
        [/%.*$/, 'comment'],
        [/\$\$?/, { token: 'string', next: '@pop' }],
        [/\\(?:[a-zA-Z@]+|.)/, 'keyword'],
        [/[{}[\]]/, '@brackets'],
        [/[&~_^]/, 'operator'],
        [/\d+(?:\.\d+)?/, 'number'],
      ],
      displayMath: [
        [/%.*$/, 'comment'],
        [/\\\]/, { token: 'string', next: '@pop' }],
        [/\\(?:[a-zA-Z@]+|.)/, 'keyword'],
        [/[{}[\]]/, '@brackets'],
        [/[&~_^]/, 'operator'],
        [/\d+(?:\.\d+)?/, 'number'],
      ],
      inlineMath: [
        [/%.*$/, 'comment'],
        [/\\\)/, { token: 'string', next: '@pop' }],
        [/\\(?:[a-zA-Z@]+|.)/, 'keyword'],
        [/[{}[\]]/, '@brackets'],
        [/[&~_^]/, 'operator'],
        [/\d+(?:\.\d+)?/, 'number'],
      ],
    },
  });
};
