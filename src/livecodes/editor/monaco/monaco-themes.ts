import type * as Monaco from 'monaco-editor';
import type { MonacoTheme } from '../../models';
import { monacoThemesBaseUrl, vendorsBaseUrl } from '../../vendors';

export const monacoThemes: Array<{ name: MonacoTheme; title: string; url?: string }> = [
  {
    name: 'active4d',
    title: 'Active4D',
    url: monacoThemesBaseUrl + 'Active4D.json',
  },
  {
    name: 'all-hallows-eve',
    title: 'All Hallows Eve',
    url: monacoThemesBaseUrl + 'All Hallows Eve.json',
  },
  {
    name: 'amy',
    title: 'Amy',
    url: monacoThemesBaseUrl + 'Amy.json',
  },
  {
    name: 'birds-of-paradise',
    title: 'Birds of Paradise',
    url: monacoThemesBaseUrl + 'Birds of Paradise.json',
  },
  {
    name: 'blackboard',
    title: 'Blackboard',
    url: monacoThemesBaseUrl + 'Blackboard.json',
  },
  {
    name: 'brilliance-black',
    title: 'Brilliance Black',
    url: monacoThemesBaseUrl + 'Brilliance Black.json',
  },
  {
    name: 'brilliance-dull',
    title: 'Brilliance Dull',
    url: monacoThemesBaseUrl + 'Brilliance Dull.json',
  },
  {
    name: 'catppuccin-latte',
    title: 'Catppuccin Latte',
    url: vendorsBaseUrl + 'catppuccin/monaco/latte.json',
  },
  {
    name: 'catppuccin-frappe',
    title: 'Catppuccin Frappe',
    url: vendorsBaseUrl + 'catppuccin/monaco/frappe.json',
  },
  {
    name: 'catppuccin-macchiato',
    title: 'Catppuccin Macchiato',
    url: vendorsBaseUrl + 'catppuccin/monaco/macchiato.json',
  },
  {
    name: 'catppuccin-mocha',
    title: 'Catppuccin Mocha',
    url: vendorsBaseUrl + 'catppuccin/monaco/mocha.json',
  },
  {
    name: 'chrome-devtools',
    title: 'Chrome DevTools',
    url: monacoThemesBaseUrl + 'Chrome DevTools.json',
  },
  {
    name: 'clouds-midnight',
    title: 'Clouds Midnight',
    url: monacoThemesBaseUrl + 'Clouds Midnight.json',
  },
  {
    name: 'clouds',
    title: 'Clouds',
    url: monacoThemesBaseUrl + 'Clouds.json',
  },
  {
    name: 'cobalt',
    title: 'Cobalt',
    url: monacoThemesBaseUrl + 'Cobalt.json',
  },
  {
    name: 'cobalt2',
    title: 'Cobalt2',
    url: monacoThemesBaseUrl + 'Cobalt2.json',
  },
  {
    name: 'dawn',
    title: 'Dawn',
    url: monacoThemesBaseUrl + 'Dawn.json',
  },
  {
    name: 'dracula',
    title: 'Dracula',
    url: monacoThemesBaseUrl + 'Dracula.json',
  },
  {
    name: 'dreamweaver',
    title: 'Dreamweaver',
    url: monacoThemesBaseUrl + 'Dreamweaver.json',
  },
  {
    name: 'eiffel',
    title: 'Eiffel',
    url: monacoThemesBaseUrl + 'Eiffel.json',
  },
  {
    name: 'espresso-libre',
    title: 'Espresso Libre',
    url: monacoThemesBaseUrl + 'Espresso Libre.json',
  },
  {
    name: 'github',
    title: 'GitHub',
    url: monacoThemesBaseUrl + 'GitHub.json',
  },
  {
    name: 'github-dark',
    title: 'GitHub Dark',
    url: monacoThemesBaseUrl + 'GitHub Dark.json',
  },
  {
    name: 'github-light',
    title: 'GitHub Light',
    url: monacoThemesBaseUrl + 'GitHub Light.json',
  },
  {
    name: 'hc-black',
    title: 'High Contrast (Black)',
  },
  {
    name: 'hc-light',
    title: 'High Contrast (Light)',
  },
  {
    name: 'idle',
    title: 'Idle',
    url: monacoThemesBaseUrl + 'IDLE.json',
  },
  {
    name: 'idlefingers',
    title: 'Idle Fingers',
    url: monacoThemesBaseUrl + 'idleFingers.json',
  },
  {
    name: 'iplastic',
    title: 'iPlastic',
    url: monacoThemesBaseUrl + 'iPlastic.json',
  },
  {
    name: 'katzenmilch',
    title: 'Katzenmilch',
    url: monacoThemesBaseUrl + 'Katzenmilch.json',
  },
  {
    name: 'krtheme',
    title: 'krTheme',
    url: monacoThemesBaseUrl + 'krTheme.json',
  },
  {
    name: 'kuroir',
    title: 'Kuroir Theme',
    url: monacoThemesBaseUrl + 'Kuroir Theme.json',
  },
  {
    name: 'lazy',
    title: 'Lazy',
    url: monacoThemesBaseUrl + 'LAZY.json',
  },
  {
    name: 'magicwb-amiga',
    title: 'MagicWB (Amiga)',
    url: monacoThemesBaseUrl + 'MagicWB (Amiga).json',
  },
  {
    name: 'merbivore-soft',
    title: 'Merbivore Soft',
    url: monacoThemesBaseUrl + 'Merbivore Soft.json',
  },
  {
    name: 'merbivore',
    title: 'Merbivore',
    url: monacoThemesBaseUrl + 'Merbivore.json',
  },
  {
    name: 'monochrome',
    title: 'Monochrome',
  },
  {
    name: 'monochrome-dark',
    title: 'Monochrome Dark',
  },
  {
    name: 'monoindustrial',
    title: 'monoindustrial',
    url: monacoThemesBaseUrl + 'monoindustrial.json',
  },
  {
    name: 'monokai',
    title: 'Monokai',
    url: monacoThemesBaseUrl + 'Monokai.json',
  },
  {
    name: 'monokai-bright',
    title: 'Monokai Bright',
    url: monacoThemesBaseUrl + 'Monokai Bright.json',
  },
  {
    name: 'night-owl',
    title: 'Night Owl',
    url: monacoThemesBaseUrl + 'Night Owl.json',
  },
  {
    name: 'nord',
    title: 'Nord',
    url: monacoThemesBaseUrl + 'Nord.json',
  },
  {
    name: 'oceanic-next',
    title: 'Oceanic Next',
    url: monacoThemesBaseUrl + 'Oceanic Next.json',
  },
  {
    name: 'pastels-on-dark',
    title: 'Pastels on Dark',
    url: monacoThemesBaseUrl + 'Pastels on Dark.json',
  },
  {
    name: 'slush-and-poppies',
    title: 'Slush and Poppies',
    url: monacoThemesBaseUrl + 'Slush and Poppies.json',
  },
  {
    name: 'solarized-dark',
    title: 'Solarized Dark',
    url: monacoThemesBaseUrl + 'Solarized-dark.json',
  },
  {
    name: 'solarized-light',
    title: 'Solarized Light',
    url: monacoThemesBaseUrl + 'Solarized-light.json',
  },
  {
    name: 'spacecadet',
    title: 'SpaceCadet',
    url: monacoThemesBaseUrl + 'SpaceCadet.json',
  },
  {
    name: 'sunburst',
    title: 'Sunburst',
    url: monacoThemesBaseUrl + 'Sunburst.json',
  },
  {
    name: 'textmate-mac-classic',
    title: 'Textmate (Mac Classic)',
    url: monacoThemesBaseUrl + 'Textmate (Mac Classic).json',
  },
  {
    name: 'tomorrow',
    title: 'Tomorrow',
    url: monacoThemesBaseUrl + 'Tomorrow.json',
  },
  {
    name: 'tomorrow-night',
    title: 'Tomorrow Night',
    url: monacoThemesBaseUrl + 'Tomorrow-Night.json',
  },
  {
    name: 'tomorrow-night-blue',
    title: 'Tomorrow Night Blue',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Blue.json',
  },
  {
    name: 'tomorrow-night-bright',
    title: 'Tomorrow Night Bright',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Bright.json',
  },
  {
    name: 'tomorrow-night-eighties',
    title: 'Tomorrow Night Eighties',
    url: monacoThemesBaseUrl + 'Tomorrow-Night-Eighties.json',
  },
  {
    name: 'twilight',
    title: 'Twilight',
    url: monacoThemesBaseUrl + 'Twilight.json',
  },
  {
    name: 'upstream-sunburst',
    title: 'Upstream Sunburst',
    url: monacoThemesBaseUrl + 'Upstream Sunburst.json',
  },
  {
    name: 'vibrant-ink',
    title: 'Vibrant Ink',
    url: monacoThemesBaseUrl + 'Vibrant Ink.json',
  },
  {
    name: 'vs',
    title: 'VS',
  },
  {
    name: 'vs-dark',
    title: 'VS Dark',
  },
  {
    name: 'xcode-default',
    title: 'Xcode Default',
    url: monacoThemesBaseUrl + 'Xcode_default.json',
  },
  {
    name: 'zenburnesque',
    title: 'Zenburnesque',
    url: monacoThemesBaseUrl + 'Zenburnesque.json',
  },
];

const liveCodesDark: Monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // Base text
    { token: '', foreground: 'dde6f0', background: '181c20' },

    // Comments — muted brand tone, italic per .token.comment style
    { token: 'comment', foreground: '556070', fontStyle: 'italic' },
    { token: 'comment.doc', foreground: '6a7a8c', fontStyle: 'italic' },

    // Keywords / control — brand cyan family
    { token: 'keyword', foreground: '00c8ff' },
    { token: 'keyword.control', foreground: '00c8ff' },
    { token: 'keyword.operator', foreground: '7fd9ff' },
    { token: 'operator', foreground: '9cc0d4' },
    { token: 'storage', foreground: '00c8ff' },
    { token: 'storage.type', foreground: '00c8ff' },
    { token: 'modifier', foreground: '00c8ff' },

    // Strings — teal
    { token: 'string', foreground: '00e5c8' },
    { token: 'string.escape', foreground: '5ff0db' },
    { token: 'string.regexp', foreground: '4ee8d4' },

    // Numbers / constants — warm amber for contrast
    { token: 'number', foreground: 'ffb86c' },
    { token: 'constant', foreground: 'ffb86c' },
    { token: 'constant.numeric', foreground: 'ffb86c' },
    { token: 'constant.language', foreground: 'ff8c66' }, // true/false/null
    { token: 'constant.character', foreground: 'ffb86c' },

    // Variables
    { token: 'variable', foreground: 'dde6f0' },
    { token: 'variable.predefined', foreground: '7cc4ff' },
    { token: 'variable.parameter', foreground: 'c9b8ff' },

    // Functions
    { token: 'function', foreground: '69d6ff' },
    { token: 'entity.name.function', foreground: '69d6ff' },
    { token: 'support.function', foreground: '69d6ff' },

    // Types / classes
    { token: 'type', foreground: '5fe0c8' },
    { token: 'type.identifier', foreground: '5fe0c8' },
    { token: 'entity.name.type', foreground: '5fe0c8' },
    { token: 'entity.name.class', foreground: '5fe0c8' },
    { token: 'support.type', foreground: '5fe0c8' },
    { token: 'support.class', foreground: '5fe0c8' },
    { token: 'namespace', foreground: '5fe0c8' },

    // Tags (HTML/XML/JSX)
    { token: 'tag', foreground: '00c8ff' },
    { token: 'tag.id.jade', foreground: '00c8ff' },
    { token: 'tag.class.jade', foreground: '00c8ff' },
    { token: 'metatag', foreground: '7fd9ff' },
    { token: 'metatag.content.html', foreground: '00e5c8' },

    // Attributes
    { token: 'attribute.name', foreground: 'c9b8ff' },
    { token: 'attribute.value', foreground: '00e5c8' },
    { token: 'attribute.value.html', foreground: '00e5c8' },

    // CSS
    { token: 'attribute.name.css', foreground: '69d6ff' },
    { token: 'attribute.value.css', foreground: '00e5c8' },
    { token: 'attribute.value.unit.css', foreground: 'ffb86c' },
    { token: 'attribute.value.number.css', foreground: 'ffb86c' },
    { token: 'attribute.value.hex.css', foreground: 'ffb86c' },
    { token: 'keyword.css', foreground: '00c8ff' },
    { token: 'tag.css', foreground: '5fe0c8' },

    // JSON
    { token: 'string.key.json', foreground: '69d6ff' },
    { token: 'string.value.json', foreground: '00e5c8' },

    // Markdown
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
    { token: 'keyword.md', foreground: '00c8ff' },
    { token: 'string.link.md', foreground: '00e5c8' },

    // Invalid / errors — brand live red
    { token: 'invalid', foreground: 'ff4d4d' },
    { token: 'invalid.deprecated', foreground: 'ff4d4d', fontStyle: 'strikethrough' },

    // Delimiters / punctuation
    { token: 'delimiter', foreground: '9cc0d4' },
    { token: 'delimiter.bracket', foreground: 'b5c7d9' },
    { token: 'delimiter.html', foreground: '556070' },

    // Regex group tokens
    { token: 'regexp', foreground: '4ee8d4' },
  ],
  colors: {
    // ── Editor base ──
    'editor.background': '#181c20', // --toolbar-bg-color (#16191d) -> hsl -> l + 1 -> hex
    'editor.foreground': '#dde6f0', // --brand-text
    'editorCursor.foreground': '#00c8ff', // --brand-cyan
    'editor.lineHighlightBackground': '#16191d', // --toolbar-bg-color
    'editor.lineHighlightBorder': '#1f2329', // --toolbar-bg-color -> hsl -> l + 4 -> hex
    'editorLineNumber.foreground': '#2e3a4a', // --brand-dim
    'editorLineNumber.activeForeground': '#00c8ff',
    'editorIndentGuide.background': '#1a2738',
    'editorIndentGuide.activeBackground': '#2e3a4a',
    'editorWhitespace.foreground': '#243142',
    'editorRuler.foreground': '#1a2738',

    // ── Selection ──
    'editor.selectionBackground': '#00c8ff33',
    'editor.selectionHighlightBackground': '#00c8ff1f',
    'editor.inactiveSelectionBackground': '#00c8ff14',
    'editor.wordHighlightBackground': '#00e5c826',
    'editor.wordHighlightStrongBackground': '#00e5c840',
    'editor.findMatchBackground': '#00c8ff66',
    'editor.findMatchHighlightBackground': '#00c8ff33',
    'editor.findRangeHighlightBackground': '#00c8ff1a',
    'editor.rangeHighlightBackground': '#16191d',

    // ── Brackets ──
    'editorBracketMatch.background': '#00c8ff26',
    'editorBracketMatch.border': '#00c8ff80',
    'editorBracketHighlight.foreground1': '#00c8ff',
    'editorBracketHighlight.foreground2': '#00e5c8',
    'editorBracketHighlight.foreground3': '#ee82ee',
    'editorBracketHighlight.foreground4': '#ffb86c',
    'editorBracketHighlight.foreground5': '#69d6ff',
    'editorBracketHighlight.foreground6': '#ff8c66',
    'editorBracketHighlight.unexpectedBracket.foreground': '#ff4d4d',

    // ── Gutter ──
    'editorGutter.background': '#181c20',
    'editorGutter.modifiedBackground': '#00c8ff',
    'editorGutter.addedBackground': '#00e5c8',
    'editorGutter.deletedBackground': '#ff4d4d',

    // ── Errors / Warnings ──
    'editorError.foreground': '#ff4d4d',
    'editorWarning.foreground': '#ffb86c',
    'editorInfo.foreground': '#00c8ff',
    'editorHint.foreground': '#00e5c8',
    'editorError.background': '#ff4d4d14',
    'editorWarning.background': '#ffb86c14',

    // ── Overview ruler (minimap area markers) ──
    'editorOverviewRuler.border': '#181c20',
    'editorOverviewRuler.findMatchForeground': '#00c8ff99',
    'editorOverviewRuler.rangeHighlightForeground': '#00c8ff66',
    'editorOverviewRuler.selectionHighlightForeground': '#00c8ff44',
    'editorOverviewRuler.wordHighlightForeground': '#00e5c866',
    'editorOverviewRuler.wordHighlightStrongForeground': '#00e5c899',
    'editorOverviewRuler.errorForeground': '#ff4d4d',
    'editorOverviewRuler.warningForeground': '#ffb86c',
    'editorOverviewRuler.infoForeground': '#00c8ff',
    'editorOverviewRuler.modifiedForeground': '#00c8ff',
    'editorOverviewRuler.addedForeground': '#00e5c8',
    'editorOverviewRuler.deletedForeground': '#ff4d4d',

    // ── Minimap ──
    'minimap.background': '#181c20',
    'minimap.selectionHighlight': '#00c8ff66',
    'minimap.findMatchHighlight': '#00c8ff99',
    'minimap.errorHighlight': '#ff4d4d',
    'minimap.warningHighlight': '#ffb86c',
    'minimapGutter.addedBackground': '#00e5c8',
    'minimapGutter.modifiedBackground': '#00c8ff',
    'minimapGutter.deletedBackground': '#ff4d4d',
    'minimapSlider.background': '#00c8ff14',
    'minimapSlider.hoverBackground': '#00c8ff26',
    'minimapSlider.activeBackground': '#00c8ff40',

    // ── Scrollbar (matches --scrollbar-* tokens) ──
    'scrollbar.shadow': '#00000066',
    'scrollbarSlider.background': '#1e2a3a99', // ~ --darker-bg-color
    'scrollbarSlider.hoverBackground': '#2a3a4ecc', // ~ --darker-bg-active
    'scrollbarSlider.activeBackground': '#2a3a4e',

    // ── Widgets (autocomplete, hover, find) ──
    'editorWidget.background': '#16191d',
    'editorWidget.foreground': '#dde6f0',
    'editorWidget.border': '#1f3147', // ~ --brand-border-hi tone
    'editorWidget.resizeBorder': '#00c8ff',

    // ── Autocomplete / suggestion widget ──
    'editorSuggestWidget.background': '#181c20',
    'editorSuggestWidget.foreground': '#dde6f0',
    'editorSuggestWidget.border': '#1f3147',
    'editorSuggestWidget.selectedBackground': '#00c8ff26',
    'editorSuggestWidget.selectedForeground': '#ffffff',
    'editorSuggestWidget.highlightForeground': '#00c8ff',
    'editorSuggestWidget.focusHighlightForeground': '#5ff0db',
    'editorSuggestWidgetStatus.foreground': '#556070',

    // ── Hover widget ──
    'editorHoverWidget.background': '#16191d',
    'editorHoverWidget.foreground': '#dde6f0',
    'editorHoverWidget.border': '#1f3147',
    'editorHoverWidget.highlightForeground': '#00c8ff',
    'editorHoverWidget.statusBarBackground': '#181c20',

    // ── Parameter hints ──
    'editorHoverWidget.foreground.parameterHints': '#dde6f0',
    'editorCodeLens.foreground': '#556070',
    'editorLightBulb.foreground': '#ffb86c',
    'editorLightBulbAutoFix.foreground': '#00e5c8',

    // ── Find widget ──
    'editor.findMatchBorder': '#00c8ff',

    // ── Inlay hints ──
    'editorInlayHint.background': '#1a273899',
    'editorInlayHint.foreground': '#7a8a9c',
    'editorInlayHint.typeBackground': '#1a273899',
    'editorInlayHint.typeForeground': '#5fe0c8',
    'editorInlayHint.parameterBackground': '#1a273899',
    'editorInlayHint.parameterForeground': '#c9b8ff',

    // ── Ghost text (Copilot/Codeium inline suggestion) ──
    'editorGhostText.foreground': '#556070',
    'editorGhostText.background': '#00000000',

    // ── Sticky scroll ──
    'editorStickyScroll.background': '#16191d',
    'editorStickyScrollHover.background': '#0a1320',

    // ── Links ──
    'editorLink.activeForeground': '#00c8ff',

    // ── Diff editor ──
    'diffEditor.insertedTextBackground': '#00e5c81f',
    'diffEditor.removedTextBackground': '#ff4d4d1f',
    'diffEditor.insertedLineBackground': '#00e5c814',
    'diffEditor.removedLineBackground': '#ff4d4d14',
    'diffEditor.border': '#1f3147',
    'diffEditorGutter.insertedLineBackground': '#00e5c826',
    'diffEditorGutter.removedLineBackground': '#ff4d4d26',

    // ── Peek view (find references etc.) ──
    'peekView.border': '#00c8ff',
    'peekViewEditor.background': '#0a1320',
    'peekViewEditor.matchHighlightBackground': '#00c8ff44',
    'peekViewResult.background': '#181c20',
    'peekViewResult.foreground': '#dde6f0',
    'peekViewResult.selectionBackground': '#00c8ff26',
    'peekViewResult.selectionForeground': '#ffffff',
    'peekViewResult.matchHighlightBackground': '#00c8ff44',
    'peekViewResult.lineForeground': '#dde6f0',
    'peekViewResult.fileForeground': '#dde6f0',
    'peekViewTitle.background': '#16191d',
    'peekViewTitleLabel.foreground': '#dde6f0',
    'peekViewTitleDescription.foreground': '#556070',

    // ── Input controls (find/replace boxes) ──
    'input.background': '#1e2a3a', // ~ --input-bg-color
    'input.foreground': '#dde6f0',
    'input.border': '#2a3a4e', // ~ --input-border-color
    'input.placeholderForeground': '#556070',
    'inputOption.activeBackground': '#00c8ff33',
    'inputOption.activeBorder': '#00c8ff',
    'inputOption.activeForeground': '#ffffff',
    'inputValidation.errorBackground': '#3a1414',
    'inputValidation.errorBorder': '#ff4d4d',
    'inputValidation.warningBackground': '#3a2c14',
    'inputValidation.warningBorder': '#ffb86c',
    'inputValidation.infoBackground': '#0d2638',
    'inputValidation.infoBorder': '#00c8ff',

    // ── Dropdown ──
    'dropdown.background': '#16191d',
    'dropdown.foreground': '#dde6f0',
    'dropdown.border': '#1f3147',
    'dropdown.listBackground': '#181c20',

    // ── List (in pickers) ──
    'list.hoverBackground': '#00c8ff14',
    'list.hoverForeground': '#dde6f0',
    'list.focusBackground': '#00c8ff26',
    'list.focusForeground': '#ffffff',
    'list.activeSelectionBackground': '#00c8ff26',
    'list.activeSelectionForeground': '#ffffff',
    'list.inactiveSelectionBackground': '#00c8ff14',
    'list.highlightForeground': '#00c8ff',

    // ── Misc ──
    'editorMarkerNavigation.background': '#181c20',
    'editorMarkerNavigationError.background': '#ff4d4d',
    'editorMarkerNavigationWarning.background': '#ffb86c',
    'editorMarkerNavigationInfo.background': '#00c8ff',
    'editorUnnecessaryCode.opacity': '#000000aa',
    'editorUnnecessaryCode.border': '#00000000',
    'editorGutter.foldingControlForeground': '#556070',
    focusBorder: '#00c8ff',
    'widget.shadow': '#00000066',
    'selection.background': '#00c8ff44',
    'icon.foreground': '#9cc0d4',
    'textLink.foreground': '#00c8ff',
    'textLink.activeForeground': '#5ff0db',
  },
};

const liveCodesLight: Monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    // Base text
    { token: '', foreground: '1c2733', background: 'ffffff' },

    // Comments
    { token: 'comment', foreground: '8693a3', fontStyle: 'italic' },
    { token: 'comment.doc', foreground: '7a8696', fontStyle: 'italic' },

    // Keywords — darker cyan/blue for light bg
    { token: 'keyword', foreground: '0073a8' },
    { token: 'keyword.control', foreground: '0073a8' },
    { token: 'keyword.operator', foreground: '0288c4' },
    { token: 'operator', foreground: '4a5d6e' },
    { token: 'storage', foreground: '0073a8' },
    { token: 'storage.type', foreground: '0073a8' },
    { token: 'modifier', foreground: '0073a8' },

    // Strings — darker teal
    { token: 'string', foreground: '008573' },
    { token: 'string.escape', foreground: '00a890' },
    { token: 'string.regexp', foreground: '00997f' },

    // Numbers / constants
    { token: 'number', foreground: 'c25e00' },
    { token: 'constant', foreground: 'c25e00' },
    { token: 'constant.numeric', foreground: 'c25e00' },
    { token: 'constant.language', foreground: 'cc4422' },
    { token: 'constant.character', foreground: 'c25e00' },

    // Variables
    { token: 'variable', foreground: '1c2733' },
    { token: 'variable.predefined', foreground: '1565a0' },
    { token: 'variable.parameter', foreground: '6b4fc4' },

    // Functions
    { token: 'function', foreground: '0a7bbf' },
    { token: 'entity.name.function', foreground: '0a7bbf' },
    { token: 'support.function', foreground: '0a7bbf' },

    // Types / classes
    { token: 'type', foreground: '00897b' },
    { token: 'type.identifier', foreground: '00897b' },
    { token: 'entity.name.type', foreground: '00897b' },
    { token: 'entity.name.class', foreground: '00897b' },
    { token: 'support.type', foreground: '00897b' },
    { token: 'support.class', foreground: '00897b' },
    { token: 'namespace', foreground: '00897b' },

    // Tags
    { token: 'tag', foreground: '0073a8' },
    { token: 'tag.id.jade', foreground: '0073a8' },
    { token: 'tag.class.jade', foreground: '0073a8' },
    { token: 'metatag', foreground: '0288c4' },
    { token: 'metatag.content.html', foreground: '008573' },

    // Attributes
    { token: 'attribute.name', foreground: '6b4fc4' },
    { token: 'attribute.value', foreground: '008573' },
    { token: 'attribute.value.html', foreground: '008573' },

    // CSS
    { token: 'attribute.name.css', foreground: '0a7bbf' },
    { token: 'attribute.value.css', foreground: '008573' },
    { token: 'attribute.value.unit.css', foreground: 'c25e00' },
    { token: 'attribute.value.number.css', foreground: 'c25e00' },
    { token: 'attribute.value.hex.css', foreground: 'c25e00' },
    { token: 'keyword.css', foreground: '0073a8' },
    { token: 'tag.css', foreground: '00897b' },

    // JSON
    { token: 'string.key.json', foreground: '0a7bbf' },
    { token: 'string.value.json', foreground: '008573' },

    // Markdown
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
    { token: 'keyword.md', foreground: '0073a8' },
    { token: 'string.link.md', foreground: '008573' },

    // Invalid
    { token: 'invalid', foreground: 'd11414' },
    { token: 'invalid.deprecated', foreground: 'd11414', fontStyle: 'strikethrough' },

    // Delimiters
    { token: 'delimiter', foreground: '4a5d6e' },
    { token: 'delimiter.bracket', foreground: '3a4d5e' },
    { token: 'delimiter.html', foreground: '8693a3' },

    { token: 'regexp', foreground: '00997f' },
  ],
  colors: {
    // ── Editor base ──
    'editor.background': '#ffffff',
    'editor.foreground': '#1c2733',
    'editorCursor.foreground': '#0073a8',
    'editor.lineHighlightBackground': '#f2f7fb',
    'editor.lineHighlightBorder': '#00000000',
    'editorLineNumber.foreground': '#b0bccb',
    'editorLineNumber.activeForeground': '#0073a8',
    'editorIndentGuide.background': '#e8eef4',
    'editorIndentGuide.activeBackground': '#c8d4e0',
    'editorWhitespace.foreground': '#dde4ec',
    'editorRuler.foreground': '#e8eef4',

    // ── Selection ──
    'editor.selectionBackground': '#0073a833',
    'editor.selectionHighlightBackground': '#0073a81f',
    'editor.inactiveSelectionBackground': '#0073a814',
    'editor.wordHighlightBackground': '#00857326',
    'editor.wordHighlightStrongBackground': '#00857340',
    'editor.findMatchBackground': '#0073a866',
    'editor.findMatchHighlightBackground': '#0073a833',
    'editor.findRangeHighlightBackground': '#0073a81a',
    'editor.rangeHighlightBackground': '#f2f7fb',

    // ── Brackets ──
    'editorBracketMatch.background': '#0073a826',
    'editorBracketMatch.border': '#0073a880',
    'editorBracketHighlight.foreground1': '#0073a8',
    'editorBracketHighlight.foreground2': '#008573',
    'editorBracketHighlight.foreground3': '#9d159d',
    'editorBracketHighlight.foreground4': '#c25e00',
    'editorBracketHighlight.foreground5': '#0a7bbf',
    'editorBracketHighlight.foreground6': '#cc4422',
    'editorBracketHighlight.unexpectedBracket.foreground': '#d11414',

    // ── Gutter ──
    'editorGutter.background': '#ffffff',
    'editorGutter.modifiedBackground': '#0073a8',
    'editorGutter.addedBackground': '#008573',
    'editorGutter.deletedBackground': '#d11414',

    // ── Errors / Warnings ──
    'editorError.foreground': '#d11414',
    'editorWarning.foreground': '#c25e00',
    'editorInfo.foreground': '#0073a8',
    'editorHint.foreground': '#008573',
    'editorError.background': '#d1141410',
    'editorWarning.background': '#c25e0010',

    // ── Overview ruler ──
    'editorOverviewRuler.border': '#e8eef4',
    'editorOverviewRuler.findMatchForeground': '#0073a899',
    'editorOverviewRuler.rangeHighlightForeground': '#0073a866',
    'editorOverviewRuler.selectionHighlightForeground': '#0073a844',
    'editorOverviewRuler.wordHighlightForeground': '#00857366',
    'editorOverviewRuler.wordHighlightStrongForeground': '#00857399',
    'editorOverviewRuler.errorForeground': '#d11414',
    'editorOverviewRuler.warningForeground': '#c25e00',
    'editorOverviewRuler.infoForeground': '#0073a8',
    'editorOverviewRuler.modifiedForeground': '#0073a8',
    'editorOverviewRuler.addedForeground': '#008573',
    'editorOverviewRuler.deletedForeground': '#d11414',

    // ── Minimap ──
    'minimap.background': '#fbfcfe',
    'minimap.selectionHighlight': '#0073a866',
    'minimap.findMatchHighlight': '#0073a899',
    'minimap.errorHighlight': '#d11414',
    'minimap.warningHighlight': '#c25e00',
    'minimapGutter.addedBackground': '#008573',
    'minimapGutter.modifiedBackground': '#0073a8',
    'minimapGutter.deletedBackground': '#d11414',
    'minimapSlider.background': '#0073a814',
    'minimapSlider.hoverBackground': '#0073a826',
    'minimapSlider.activeBackground': '#0073a840',

    // ── Scrollbar ──
    'scrollbar.shadow': '#00000022',
    'scrollbarSlider.background': '#c8d4e099',
    'scrollbarSlider.hoverBackground': '#b0bccbcc',
    'scrollbarSlider.activeBackground': '#9cabbd',

    // ── Widgets ──
    'editorWidget.background': '#ffffff',
    'editorWidget.foreground': '#1c2733',
    'editorWidget.border': '#d6e0ea',
    'editorWidget.resizeBorder': '#0073a8',

    // ── Autocomplete / suggestion widget ──
    'editorSuggestWidget.background': '#ffffff',
    'editorSuggestWidget.foreground': '#1c2733',
    'editorSuggestWidget.border': '#d6e0ea',
    'editorSuggestWidget.selectedBackground': '#0073a81f',
    'editorSuggestWidget.selectedForeground': '#0a2433',
    'editorSuggestWidget.highlightForeground': '#0073a8',
    'editorSuggestWidget.focusHighlightForeground': '#00a890',
    'editorSuggestWidgetStatus.foreground': '#8693a3',

    // ── Hover widget ──
    'editorHoverWidget.background': '#ffffff',
    'editorHoverWidget.foreground': '#1c2733',
    'editorHoverWidget.border': '#d6e0ea',
    'editorHoverWidget.highlightForeground': '#0073a8',
    'editorHoverWidget.statusBarBackground': '#f2f7fb',

    // ── Code lens / lightbulb ──
    'editorCodeLens.foreground': '#8693a3',
    'editorLightBulb.foreground': '#c25e00',
    'editorLightBulbAutoFix.foreground': '#008573',

    'editor.findMatchBorder': '#0073a8',

    // ── Inlay hints ──
    'editorInlayHint.background': '#eef3f899',
    'editorInlayHint.foreground': '#5a6b7a',
    'editorInlayHint.typeBackground': '#eef3f899',
    'editorInlayHint.typeForeground': '#00897b',
    'editorInlayHint.parameterBackground': '#eef3f899',
    'editorInlayHint.parameterForeground': '#6b4fc4',

    // ── Ghost text ──
    'editorGhostText.foreground': '#9cabbd',
    'editorGhostText.background': '#00000000',

    // ── Sticky scroll ──
    'editorStickyScroll.background': '#fbfcfe',
    'editorStickyScrollHover.background': '#f2f7fb',

    'editorLink.activeForeground': '#0073a8',

    // ── Diff editor ──
    'diffEditor.insertedTextBackground': '#0085731f',
    'diffEditor.removedTextBackground': '#d114141f',
    'diffEditor.insertedLineBackground': '#00857314',
    'diffEditor.removedLineBackground': '#d1141414',
    'diffEditor.border': '#d6e0ea',
    'diffEditorGutter.insertedLineBackground': '#00857326',
    'diffEditorGutter.removedLineBackground': '#d1141426',

    // ── Peek view ──
    'peekView.border': '#0073a8',
    'peekViewEditor.background': '#fbfcfe',
    'peekViewEditor.matchHighlightBackground': '#0073a844',
    'peekViewResult.background': '#ffffff',
    'peekViewResult.foreground': '#1c2733',
    'peekViewResult.selectionBackground': '#0073a81f',
    'peekViewResult.selectionForeground': '#0a2433',
    'peekViewResult.matchHighlightBackground': '#0073a844',
    'peekViewResult.lineForeground': '#1c2733',
    'peekViewResult.fileForeground': '#1c2733',
    'peekViewTitle.background': '#f2f7fb',
    'peekViewTitleLabel.foreground': '#1c2733',
    'peekViewTitleDescription.foreground': '#8693a3',

    // ── Input controls ──
    'input.background': '#f2f7fb',
    'input.foreground': '#1c2733',
    'input.border': '#d6e0ea',
    'input.placeholderForeground': '#8693a3',
    'inputOption.activeBackground': '#0073a833',
    'inputOption.activeBorder': '#0073a8',
    'inputOption.activeForeground': '#0a2433',
    'inputValidation.errorBackground': '#fbeaea',
    'inputValidation.errorBorder': '#d11414',
    'inputValidation.warningBackground': '#fdf3e6',
    'inputValidation.warningBorder': '#c25e00',
    'inputValidation.infoBackground': '#e6f3fa',
    'inputValidation.infoBorder': '#0073a8',

    // ── Dropdown ──
    'dropdown.background': '#ffffff',
    'dropdown.foreground': '#1c2733',
    'dropdown.border': '#d6e0ea',
    'dropdown.listBackground': '#ffffff',

    // ── List ──
    'list.hoverBackground': '#0073a814',
    'list.hoverForeground': '#1c2733',
    'list.focusBackground': '#0073a81f',
    'list.focusForeground': '#0a2433',
    'list.activeSelectionBackground': '#0073a81f',
    'list.activeSelectionForeground': '#0a2433',
    'list.inactiveSelectionBackground': '#0073a80f',
    'list.highlightForeground': '#0073a8',

    // ── Misc ──
    'editorMarkerNavigation.background': '#ffffff',
    'editorMarkerNavigationError.background': '#d11414',
    'editorMarkerNavigationWarning.background': '#c25e00',
    'editorMarkerNavigationInfo.background': '#0073a8',
    'editorUnnecessaryCode.opacity': '#00000077',
    'editorUnnecessaryCode.border': '#00000000',
    'editorGutter.foldingControlForeground': '#8693a3',
    focusBorder: '#0073a8',
    'widget.shadow': '#00000022',
    'selection.background': '#0073a844',
    'icon.foreground': '#4a5d6e',
    'textLink.foreground': '#0073a8',
    'textLink.activeForeground': '#00a890',
  },
};

export const customThemes: Array<{ name: MonacoTheme; theme: Monaco.editor.IStandaloneThemeData }> =
  [
    { name: 'livecodes-dark', theme: liveCodesDark },
    { name: 'livecodes-light', theme: liveCodesLight },
    {
      name: 'custom-vs-light',
      theme: {
        base: 'vs',
        inherit: true,
        rules: [{ token: 'comment', fontStyle: 'italic' }],
        colors: {},
      },
    },
    {
      name: 'custom-vs-dark',
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [{ token: 'comment', fontStyle: 'italic' }],
        colors: {},
      },
    },
    {
      name: 'monochrome',
      theme: {
        base: 'vs',
        inherit: false,
        rules: [],
        colors: {
          'editor.foreground': '#24292e',
          'editorBracketHighlight.foreground1': '#24292e',
          'editorBracketHighlight.foreground2': '#24292e',
          'editorBracketHighlight.foreground3': '#24292e',
          'editorBracketHighlight.foreground4': '#24292e',
          'editorBracketHighlight.unexpectedBracket.foreground': '#24292e',
        },
      },
    },
    {
      name: 'monochrome-dark',
      theme: {
        base: 'vs-dark',
        inherit: false,
        rules: [],
        colors: {
          'editor.foreground': '#e2e2e3',
          'editor.background': '#24292e',
          'editorBracketHighlight.foreground1': '#e2e2e3',
          'editorBracketHighlight.foreground2': '#e2e2e3',
          'editorBracketHighlight.foreground3': '#e2e2e3',
          'editorBracketHighlight.foreground4': '#e2e2e3',
          'editorBracketHighlight.unexpectedBracket.foreground': '#e2e2e3',
        },
      },
    },
  ];
