// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const translation = {
  about: {
    blog: {
      text: 'Blog',
      title: 'LiveCodes Blog',
    },
    configuration: 'Configuration',
    credits: {
      heading: 'Credits',
      para1:
        'LiveCodes is made possible by open source projects, web services and contributors. <1>View Credits</1>',
      para2: '© 2024 Hatem Hosny. LiveCodes is licensed under MIT License.',
    },
    documentations: {
      heading: 'Documentations',
    },
    gettingStarted: 'Getting Started',
    github: {
      text: 'GitHub',
      title: 'GitHub',
    },
    heading: 'About LiveCodes',
    livecodes: {
      aboutUs: 'About LiveCodes',
      para1:
        '<1><2>LiveCodes</2></1> is an open-source, feature-rich, client-side code playground. Currently, 90+ languages and frameworks are supported. It can be used as a standalone app or embedded in any web page.',
      para2:
        'A powerful SDK makes it easy to integrate and communicate with playgrounds. Extensive documentation is available with code examples, live demos, and screenshots.',
    },
    sdk: 'LiveCodes SDK',
    sponsor: {
      text: 'Sponsor',
      title: 'Sponsor LiveCodes',
    },
    twitter: {
      text: '𝕏 / Twitter',
      title: '𝕏 / Twitter',
    },
    version: {
      app: 'App version: <1>{{APP_VERSION}}</1>',
      appPermanentUrl: 'App Permanent URL',
      commit: 'Git commit: <1>{{COMMIT_SHA}}</1>',
      heading: 'Version',
      sdk: 'SDK version: <1>{{SDK_VERSION}}</1>',
      sdkPermanentUrl: 'SDK Permanent URL',
    },
  },
  app: {
    changeTheme: {
      hint: 'Change Theme',
    },
    codeToImage: {
      hint: 'Code to Image',
    },
    consoleMessage: {
      appVersion: 'App version: {{APP_VERSION}}',
      commit: 'Git commit: {{COMMIT_SHA}}',
      learnMore: 'Learn more! {{docsUrl}} 🚀',
      sdkVersion: 'SDK version: {{SDK_VERSION}}',
    },
    copy: {
      hint: 'Copy (Ctrl/⌘ + A, Ctrl/⌘ + C)',
    },
    copyAsUrl: {
      hint: 'Copy code as data URL',
    },
    customSettings: {
      hint: 'Custom Settings',
    },
    editorSettings: {
      hint: 'Editor Settings',
    },
    externalResources: {
      hint: 'External Resources',
    },
    focus: {
      hint: 'Toggle Focus mode (Ctrl/⌘ + K, Z)',
    },
    format: {
      hint: 'Format (Alt + Shift + F)',
    },
    fullscreen: {
      hint: 'Full Screen',
    },
    i18nButton: {
      hint: 'UI Language',
    },
    i18nMenu: {
      docs: 'i18n Documentation',
      helpTranslate: 'Help Us Translate',
    },
    logo: {
      title: 'LiveCodes: A Code Playground That Just Works!',
    },
    projectInfo: {
      hint: 'Project Info',
    },
    redo: {
      hint: 'Redo (Ctrl/⌘ + Shift + Z)',
    },
    result: {
      hint: 'Result (Ctrl/⌘ + Alt + R)',
    },
    run: {
      hint: 'Run (Shift + Enter)',
    },
    share: {
      hint: 'Share (Ctrl/⌘ + Alt + S)',
    },
    themeColors: {
      custom: 'Custom',
    },
    undo: {
      hint: 'Undo (Ctrl/⌘ + Z)',
    },
    untitledProject: 'Untitled Project',
  },
  assets: {
    action: {
      delete: 'Delete',
    },
    add: {
      dataURL: {
        desc: 'Add asset as a base64-encoded <1>data url</1>.',
        heading: 'Data URL',
        label: 'Add file',
      },
      githubPages: {
        desc: 'Deploy asset to GitHub Pages. The file is pushed to <1>gh-pages</1> branch of the repo <2>livecodes-assets</2> on your GitHub account. If the repo does not already exist, a public repo will be created.',
        heading: 'GitHub Pages',
        label: 'Upload file',
      },
      heading: 'Add Asset',
    },
    delete: {
      all: 'Delete {{assets}} assets?',
      one: 'Delete asset: {{asset}}?',
    },
    deleteAll: 'Delete All',
    generic: {
      clickToCopyURL: 'Click to copy URL',
    },
    heading: 'Assets',
    link: {
      date: 'Date: {{modified}}',
      type: 'Type: {{type}}',
      url: 'URL: {{url}}',
    },
    loadFile: {
      error: {
        failedToUpload: 'Error: Failed to upload file',
        unauthenticated: 'Error: Unauthenticated user',
      },
      upload: 'Upload file',
      uploading: 'Uploading...',
    },
    noMatch: 'No assets match these filters.',
    noSavedAssets: 'You have no saved assets.',
    processAsset: {
      addFile: 'Added file: ',
      deployNotice: 'The asset should be available on this URL soon (~1 min).',
      success: 'File added to assets!',
      urlLabel: 'URL: ',
    },
    resetFilters: 'Reset',
    search: 'Search',
    sort: {
      date: 'Date',
      fileName: 'File Name',
      heading: 'Sort By:',
    },
    type: {
      archive: 'Archive',
      audio: 'Audio',
      csv: 'CSV',
      font: 'Font',
      html: 'HTML',
      icon: 'Icon',
      image: 'Image',
      json: 'JSON',
      other: 'Other',
      script: 'Script',
      stylesheet: 'Stylesheet',
      text: 'Text',
      video: 'Video',
      xml: 'XML',
    },
    types: {
      all: 'All types',
    },
    url: {
      fail: 'Failed to copy URL.',
      success: 'URL is copied to clipboard.',
    },
  },
  backup: {
    backup: {
      assets: 'Assets',
      button: 'Backup',
      desc: 'Backup LiveCodes data, so that it can be later restored on this or other devices. <1></1> Please visit the <2>documentations</2> for details.',
      heading: 'Backup',
      projects: 'Projects',
      settings: 'User Settings',
      snippets: 'Code Snippets',
      templates: 'User Templates',
    },
    backupBtn: 'Backup',
    error: {
      atLeastOneStore: 'Please select at least one store to backup',
      incorrectFileType: 'Error: Incorrect file type',
    },
    fileInputLabel: 'Restore from file',
    heading: 'Backup / Restore',
    inProgress: 'In progress...',
    restore: {
      desc: 'Restore previously backed-up LiveCodes data. <1></1> If you choose to replace current content, you may want to back it up first. <2></2> Please visit the <3>documentations</3> for details.',
      fromFile: 'Restore from file',
      heading: 'Restore',
      mode: {
        merge: 'Merge with current content',
        replace: 'Replace current content',
      },
      success: 'Restored Successfully!',
    },
  },
  broadcast: {
    broadcastBtn: {
      start: 'Broadcast',
      stop: 'Stop broadcast',
    },
    broadcasting: 'Broadcasting...',
    channelURL: 'Channel URL',
    connecting: 'Connecting...',
    desc: 'Broadcast the result page to other browsers/devices in real time. Please visit the <1>documentations</1> for details.',
    error: {
      generic: 'Broadcast failed!',
      serverURLRequired: 'Server URL is required!',
    },
    heading: 'Broadcast',
    includeSourceCode: 'Include source code',
    serverURL: {
      heading: 'Server URL',
    },
  },
  codeToImage: {
    background: 'Background',
    borderRadius: 'Border Radius',
    code: 'Code',
    copyCode: 'Copy Code',
    copyImage: 'Copy Image',
    default: 'Default',
    direction: 'Direction',
    fileName: 'File Name',
    fontFamily: 'Font Family',
    fontSize: 'Font Size',
    heading: 'Code to Image',
    image: 'Image',
    imageFormat: {
      jpg: 'JPEG',
      label: 'Image Format',
      png: 'PNG',
      svg: 'SVG',
    },
    layout: 'Layout',
    opacity: 'Opacity',
    padding: 'Padding',
    presets: 'Presets',
    preview: 'Preview',
    save: 'Save Image',
    scale: 'Image Scale',
    shadow: 'Shadow',
    shareImage: 'Share Image',
    shareTitle: 'Share',
    shareUrl: 'Share URL',
    theme: 'Theme',
    width: 'Width',
    windowStyle: {
      label: 'Window Style',
      mac: 'macOS',
      none: 'None',
      windows: 'Windows',
    },
  },
  commandMenu: {
    changeTheme: {
      dark: 'Change to Dark Theme',
      light: 'Change to Light Theme',
      title: 'Change Theme',
    },
    changeUILanguage: 'Change UI Language',
    closeModalMenu: 'Close Modal/Menu',
    contribute: 'Contribute',
    copy: 'Copy Code',
    copyAsDataUrl: 'Copy Code as Data URL',
    disableAI: 'Disable AI Code Assistant',
    disableAutoSave: 'Disable Auto Save',
    disableAutoUpdate: 'Disable Auto Update',
    disableEmacs: 'Disable Emacs Mode',
    disableFormatOnSave: 'Disable Format On-Save',
    disableRecoverUnsaved: 'Disable Recover Unsaved',
    disableVim: 'Disable Vim Mode',
    enableAI: 'Enable AI Code Assistant',
    enableAutoSave: 'Enable Auto Save',
    enableAutoUpdate: 'Enable Auto Update',
    enableEmacs: 'Enable Emacs Mode',
    enableFormatOnSave: 'Enable Format On-Save',
    enableRecoverUnsaved: 'Enable Recover Unsaved',
    enableVim: 'Enable Vim Mode',
    focus: {
      editor: 'Focus Editor',
      home: 'Move Focus to Home',
      outOfEditor: 'Move Focus out of Editor',
      toggleTabFocusMode: 'Toggle Tab Focus Mode',
    },
    formatCode: 'Format Code',
    home: 'Home',
    horizontalLayout: 'Horizontal Layout',
    keyboardShortcuts: 'Keyboard Shortcuts',
    login: 'Login',
    logout: 'Logout',
    moveToParent: 'move to parent',
    placeholder: 'Type a command or search...',
    processors: 'Processors',
    responsiveLayout: 'Responsive Layout',
    run: 'Run',
    saveAsFork: 'Save as a Fork (New Project)',
    saveAsTemplate: 'Save as a Template',
    selectLanguage: 'Select Language',
    show: {
      compiled: 'Toggle Compiled Code',
      console: 'Toggle Console',
      focusMode: 'Toggle Focus Mode',
      fullscreen: 'Toggle Full Screen',
      markup: 'Show Markup Editor',
      maximizeCompiled: 'Maximize Compiled Code',
      maximizeConsole: 'Maximize Console',
      maximizeTests: 'Maximize Tests',
      next: 'Show Next Editor',
      previous: 'Show Previous Editor',
      result: 'Toggle Result',
      runTests: 'Run Tests',
      script: 'Show Script Editor',
      style: 'Show Style Editor',
      tests: 'Toggle Tests',
      title: 'Show …',
      zoom: 'Toggle Result Zoom',
    },
    starterTemplates: 'Starter Templates',
    sync: 'Sync (beta) …',
    template: 'Template',
    theme: {
      color: 'Set Theme Color',
      defaultColor: 'Set Default Theme Color',
    },
    title: 'Command Menu',
    toClose: 'to close',
    toNavigate: 'to navigate',
    toSelect: 'to select',
    toggle: 'Toggle: ',
    verticalLayout: 'Vertical Layout',
  },
  core: {
    broadcast: {
      heading: 'Broadcast',
      successSetToken: 'Broadcast user token set successfully',
    },
    changeLanguage: {
      hint: 'Change Language',
      message: 'Loading {{lang}}. This may take a while!',
    },
    copy: {
      copied: 'Code copied to clipboard',
      copiedAsDataURL: 'Code copied as data URL',
      copiedImage: 'Image copied to clipboard.',
      hint: 'Copied!',
      title: 'Copy',
    },
    error: {
      couldNotLoadTemplate: 'Could not load template: {{template}}',
      failedToCopyCode: 'Failed to copy code',
      failedToCopyImage: 'Failed to copy image',
      failedToLoadTemplate: 'Failed loading template',
      failedToLoadTemplates: 'Failed loading starter templates',
      failedToParseSettings: 'Failed parsing settings as JSON',
      failedToSaveImage: 'Failed to save image',
      failedToShareImage: 'Failed to share image',
      invalidCommand: 'Invalid command!',
      invalidImport: 'Invalid import URL',
      invalidPanelId: 'Invalid panel id',
      invalidToken: 'Invalid token!',
      login: 'Login error!',
      logout: 'Logout error!',
      noResultContainer: 'Result container not found',
      unavailable: 'Command unavailable',
      unavailableForEmbeds: 'Command unavailable for embeds',
    },
    export: {
      gist: 'Creating a public GitHub gist...',
    },
    fork: {
      success: 'Forked as a new project',
    },
    fullScreen: {
      enter: 'Full Screen',
      exit: 'Exit Full Screen',
    },
    generating: 'Generating...',
    import: {
      loading: 'Loading Project...',
    },
    layout: {
      horizontal: 'Horizontal layout',
      responsive: 'Responsive layout',
      vertical: 'Vertical layout',
    },
    loadDefaults: {
      template: 'Loading default template',
    },
    login: {
      success: 'Logged in successfully',
      successWithName: 'Logged in as: {{name}}',
    },
    logout: {
      success: 'Logged out successfully',
    },
    result: {
      hint: 'Show result in new window',
    },
    save: {
      success: 'Project locally saved to device!',
      successWithName: 'Project "{{name}}" saved to device.',
    },
    template: {
      blank: 'Blank Project',
      delete: 'Delete template "{{item}}"?',
      javascript: 'JavaScript Starter',
      react: 'React Starter',
      saved: 'Saved as a new template',
      typescript: 'TypeScript Starter',
      vue: 'Vue 3 Starter',
    },
    unload: {
      notSaved: 'Changes you made may not be saved.',
    },
    zoom: {
      hint: 'Zoom',
    },
  },
  customSettings: {
    JSON: 'Custom Settings JSON',
    desc: '<1></1> For further details, please refer to the <2> documentation </2>',
    heading: 'Custom Settings',
    load: 'Load',
  },
  deploy: {
    create: {
      desc: 'A new <1>public</1> repo will be created. The result page will be pushed to <2>gh-pages</2> branch.',
      heading: 'Create New Repo',
      repoName: 'Repo Name <1></1>',
    },
    error: {
      generic: 'Deployment failed!',
      repoNameExists: 'Repo name already exists',
      repoNameRequired: 'Repo name is required',
    },
    existing: {
      desc: 'A new commit will be added to <1>gh-pages</1> branch.',
      heading: 'Existing Repo',
      repoName: 'Repo Name',
    },
    generic: {
      commitMessage: 'Commit Message',
      commitSourceCodePublic: 'Commit source code (public)',
      deployBtn: 'Deploy',
      deploying: 'Deploying...',
    },
    heading: 'Deploy to GitHub Pages',
    searchRepo: 'Search your public repos...',
  },
  editorSettings: {
    closeBrackets: 'Auto-close brackets and quotes',
    codeJarDesc: '<1></1> * The marked features are not available in CodeJar.',
    default: 'Default',
    desc: '<1></1> Please check the <2>documentations</2> for details.',
    editor: {
      codejar: 'CodeJar',
      codemirror: 'CodeMirror',
      heading: 'Editor',
      monaco: 'Monaco',
    },
    editorMode: {
      emacs: 'Emacs',
      heading: 'Editor Mode *',
      vim: 'Vim',
    },
    editorTheme: 'Editor Theme',
    emmet: 'Enable Emmet *',
    enableAI: {
      heading: 'Enable AI Code Assistant',
      note: 'Powered by <1><2></2></1>',
    },
    foldRegions: 'Fold (collapse) regions *',
    fontFamily: 'Font Family',
    fontSize: 'Font Size',
    format: 'Format',
    heading: 'Editor Settings',
    lineNumbers: 'Show line numbers',
    lineNumbersRelative: 'Relative line numbers *',
    notAvailableInCodeJar: 'Not available in CodeJar',
    preview: 'Preview',
    semicolons: 'Format: Use Semicolons',
    singleQuote: 'Format: Use Single Quotes',
    tabSize: 'Tab Size',
    theme: 'Dark Mode',
    trailingComma: 'Format: Use Trailing Commas',
    useTabs: {
      heading: 'Indentation',
      spaces: 'Spaces',
      tabs: 'Tabs',
    },
    wordWrap: 'Word-wrap',
  },
  embed: {
    activeEditor: {
      heading: 'Active Editor',
      markup: '{{markup}}',
      script: '{{script}}',
      style: '{{style}}',
    },
    activeTool: {
      compiled: 'Compiled',
      console: 'Console',
      heading: 'Active Tool',
      tests: 'Tests',
    },
    code: {
      copy: 'Copy Code',
      heading: 'Code',
    },
    codeEditor: {
      codeJar: 'CodeJar',
      codeMirror: 'CodeMirror',
      default: 'Default',
      heading: 'Code Editor',
      monaco: 'Monaco',
    },
    desc: 'Please check the <1>documentations</1> for advanced configurations.',
    embedType: {
      cdn: 'Script (CDN)',
      heading: 'Embed Type',
      html: 'HTML',
      iframe: 'Iframe',
      npm: 'JS (npm)',
      react: 'React',
      svelte: 'Svelte',
      vue: 'Vue',
    },
    heading: 'Embed Project',
    layout: {
      heading: 'Layout',
      horizontal: 'Horizontal',
      responsive: 'Responsive',
      vertical: 'Vertical',
    },
    lite: 'Lite Mode',
    loading: {
      click: 'On-click',
      eager: 'Eager',
      heading: 'Loading',
      lazy: 'Lazy',
    },
    mode: {
      codeblock: 'Code Block',
      editor: 'Editor',
      full: 'Full',
      heading: 'Display Mode',
      result: 'Result',
      simple: 'Simple',
    },
    permanentUrl: 'Permanent URL',
    preview: 'Preview',
    previewLoading: 'Loading Preview...',
    readonly: 'Read only',
    theme: {
      dark: 'Dark',
      heading: 'Theme',
      light: 'Light',
    },
    tools: {
      closed: 'Closed',
      full: 'Full',
      heading: 'Tools',
      none: 'None',
      open: 'Open',
    },
    view: {
      editor: 'Editor',
      heading: 'Default View',
      result: 'Result',
      split: 'Split',
    },
  },
  generic: {
    about: {
      blog: 'Blog',
      configuration: 'Configuration',
      gettingStarted: 'Getting Started',
      github: 'GitHub',
      sdk: 'LiveCodes SDK',
      sponsor: 'Sponsor',
      twitter: '𝕏 / Twitter',
    },
    clickForInfo: 'Click for info...',
    close: 'Close',
    custom: 'Custom',
    embed: {
      logoHint: 'Edit on LiveCodes 🡕',
    },
    error: {
      authentication: 'Authentication error!',
      exceededSize: 'Error: Exceeded size {{size}} MB',
      failedToReadFile: 'Error: Failed to read file',
    },
    loading: 'Loading...',
    more: 'More...',
    optional: 'Optional',
    required: 'Required',
    tagline: 'A Code Playground That Just Works!',
  },
  import: {
    bulk: {
      desc: 'Bulk import multiple projects to your saved projects. Projects can be exported from the <1>Saved Projects</1> screen.',
      fromFile: 'Bulk import from local file',
      fromURL: 'Bulk import from URL',
      heading: 'Bulk Import',
      started: 'Bulk import started...',
    },
    code: {
      desc: 'Supported Sources: <1> <2>GitHub gist</2> <3>GitHub file</3> <4>Directory in a GitHub repo</4> <5>Gitlab snippet</5> <6>Gitlab file</6> <7>Directory in a Gitlab repo</7> <8>JS Bin</8> <9>Raw code</9> <10>Code in web page DOM</10> <11>Code in zip file</11> <12>Official playgrounds<13></13>(TypeScript and Vue)</12> </1> Please visit the <14>documentations</14> for details.',
      fromFile: 'Import local files',
      fromURL: 'Import from URL',
      heading: 'Import Code',
    },
    error: {
      failedToLoadURL: 'Error: failed to load URL',
      invalidConfigFile: 'Invalid configuration file',
      invalidFile: 'Error: Invalid file',
    },
    generic: {
      file: 'Local file',
      url: 'URL',
    },
    heading: 'Import',
    json: {
      desc: 'Import a single project JSON to editor. A project can be exported from app&nbsp;menu&nbsp;→ Export&nbsp;→ Export&nbsp;Project&nbsp;(JSON).',
      fromFile: 'Import project from local file',
      fromURL: 'Import project from URL',
      heading: 'Import Project JSON',
    },
    success: 'Import Successful!',
  },
  keyboardShortcuts: {
    command: 'Command',
    editorShortcuts:
      'For the list of code editor keyboard shortcuts, see <1> VS Code shortcuts</1>',
    heading: 'Keyboard Shortcuts',
    key: 'Key',
  },
  login: {
    accessAllowed: 'Allow access to:',
    desc: '<1>By logging in, you agree that <2>cookies</2> may be stored on your device.</1> <3> <4>Why are these permissions required?</4> </3> <5> <6>How to change/revoke permissions?</6> </5>',
    gist: 'Gists',
    heading: 'Login with GitHub',
    loginAs: 'Logged in as {{name}}',
    loginBtn: 'Login',
    logout: 'Log out',
    privateRepo: 'Private Repos',
    publicRepo: 'Repos',
  },
  menu: {
    about: 'About ...',
    appHelp: {
      heading: 'Help',
      hint: 'Help',
    },
    appProject: {
      heading: 'Project',
      hint: 'Project',
    },
    appSettings: {
      heading: 'Settings',
      hint: 'App Settings',
    },
    assets: 'Assets …',
    autoSave: 'Auto Save',
    autoUpdate: 'Auto Update',
    backup: 'Backup / Restore …',
    blog: 'LiveCodes Blog',
    broadcast: 'Broadcast …',
    commandMenu: 'Command Menu',
    config: 'Configuration',
    customSettings: 'Custom Settings …',
    delay: {
      heading: 'Delay: <1>1.5</1>s',
      hint: 'Delay before auto-update',
    },
    deploy: 'Deploy …',
    docs: 'Documentation',
    editorSettings: 'Editor Settings …',
    embed: 'Embed …',
    export: {
      codepen: 'Edit in CodePen',
      gist: 'Export to GitHub Gist',
      heading: 'Export',
      jsfiddle: 'Edit in JSFiddle',
      json: 'Export Project (JSON)',
      result: 'Export Result (HTML)',
      src: 'Export Source (ZIP)',
    },
    features: 'Features',
    formatOnsave: 'Format On-save',
    getstart: 'Getting Started',
    import: 'Import …',
    keyboardShortcuts: 'Keyboard Shortcuts',
    layout: 'Vertical Layout',
    license: 'License',
    login: 'Login',
    logout: 'Log out',
    new: 'New …',
    open: 'Open …',
    project: 'Project Info …',
    recoverUnsaved: 'Recover Unsaved',
    report: 'Report an issue',
    resources: 'External Resources …',
    save: 'Save',
    saveAs: {
      fork: 'Fork (New Project)',
      heading: 'Save as …',
      template: 'Template',
    },
    sdk: 'SDK',
    share: 'Share …',
    showSpacing: {
      heading: 'Show Spacing',
      hint: 'Press Alt/Option and move your cursor over result page',
    },
    showWelcome: {
      title: 'Show Welcome screen on startup',
    },
    snippets: 'Code Snippets …',
    source: 'Source code on GitHub',
    sync: 'Sync (beta) … <1> ⏳</1>',
    theme: 'Dark Theme',
    themeColor: 'Color',
    welcome: {
      heading: 'Welcome …',
    },
  },
  open: {
    action: {
      delete: 'Delete',
    },
    defaultTemplate: 'Default template ',
    delete: {
      all: 'Delete {{projects}} projects?',
      deleting: 'Deleting projects...',
      one: 'Delete project: {{project}}?',
    },
    deleteAll: 'Delete All',
    exportAll: 'Export All',
    filter: {
      language: 'filter by language',
      tag: 'filter by tag',
    },
    heading: 'Saved Projects',
    import: 'Import',
    lastModified: 'Last modified: {{modified}}',
    noData: {
      desc: 'You can save a project from (settings&nbsp;menu&nbsp;&gt;&nbsp;Save) or by the keyboard shortcut (Ctrl/⌘&nbsp;+&nbsp;S).',
      heading: 'You have no saved projects.',
    },
    noMatch: 'No projects match these filters.',
    placeholder: {
      allLanguages: 'All languages',
      filterByTags: 'Filter by tags',
      search: 'Search',
    },
    removeDefault: '(unset)',
    reset: 'Reset',
    setAsDefault: 'Set as default',
    sort: {
      heading: 'Sort By:',
      lastModified: 'Last Modified',
      title: 'Title',
    },
  },
  project: {
    desc: 'Description',
    head: 'Add to &lt;head&gt;',
    heading: 'Project Info',
    htmlAttr: 'Attributes for &lt;html&gt;',
    tags: 'Tags',
    title: 'Project Title',
  },
  recoverPrompt: {
    desc: 'Your last project has unsaved changes!',
    heading: 'Recover unsaved project?',
    meta: 'Title: <1></1> <2></2> Last modified: <3></3>',
    notShowAgain: 'Do not show this again.',
    prompt: {
      discard: 'Discard unsaved project',
      heading: '<1></1>Do you want to recover it now?',
      recover: 'Recover project to editor',
      save: 'Save to device and continue',
    },
  },
  resources: {
    browseOnJsDelivr: 'Browse package files on jsDelivr',
    cssPresets: {
      heading: 'CSS Presets',
      none: 'None',
      normalizeCss: 'Normalize.css',
      resetCss: 'Reset CSS',
    },
    error: {
      failedToLoadResults: 'Failed to load results!',
      noResultsFound: 'No results found for: ',
    },
    fonts: {
      add: 'Add',
      heading: 'Fonts <1>(powered by Google Fonts)</1>',
      select: 'Select font ...',
    },
    heading: 'External Resources',
    scripts: 'External Scripts',
    search: {
      heading: 'Search Packages <1>(powered by jsDelivr)</1>',
      placeholder: 'e.g. jquery, lodash@4, bootstrap@5.2.3, ...',
    },
    stylesheets: 'External Stylesheets',
    urlDesc: 'Add stylesheet/script URLs. Each URL should be in a separate line.',
  },
  resultMode: {
    linkText: 'Edit on LiveCodes',
  },
  savePrompt: {
    heading: 'Unsaved changes',
    prompt: {
      cancel: 'Cancel',
      discard: 'Do not save',
      heading: 'The changes you made may not be saved. <1></1> Do you want to save now?',
      save: 'Save',
    },
  },
  share: {
    characters: '{{urlLength}} characters',
    copy: {
      clickToCopy: 'Click to copy',
      copied: 'URL copied to clipboard',
    },
    encodedURL: 'Get encoded URL',
    error: {
      failedToCopy: 'Copy to clipboard failed!',
      failedToGenerateURL: 'Failed to generate short URL!',
    },
    expireInOneYear: 'Expires in 1 year',
    generateURL: 'Generating URL …',
    heading: 'Share',
    permanentURL: 'Permanent URL',
    qrcode: {
      clickToDownload: 'Click to download',
      generating: 'Generating...',
    },
    services: {
      devTo: 'Dev.to',
      email: 'Email',
      facebook: 'Facebook',
      hackerNews: 'Hacker News',
      linkedIn: 'LinkedIn',
      pinterest: 'Pinterest',
      pocket: 'Pocket',
      qrCode: 'QR code',
      reddit: 'Reddit',
      share: 'Share via …',
      telegram: 'Telegram',
      tumblr: 'Tumblr',
      twitter: '𝕏 / Twitter',
      whatsApp: 'WhatsApp',
    },
    shortURL: 'Get short URL',
  },
  snippets: {
    action: {
      copy: 'Copy',
      delete: 'Delete',
      edit: 'Edit',
    },
    add: {
      code: 'Code',
      desc: 'Description',
      heading: 'Add Snippet',
      language: 'Language',
      save: 'Save',
      snippets: 'Snippets',
      title: 'Title',
    },
    copy: {
      clickToCopySnippet: 'Click to copy snippet',
      copied: 'Snippet is copied to clipboard.',
    },
    delete: {
      all: 'Delete {{snippets}} snippets?',
      one: 'Delete snippet: {{snippet}}?',
    },
    deleteAll: 'Delete All',
    error: {
      failedToCopy: 'Failed to copy URL.',
      noTitle: 'Please add snippet title.',
    },
    filter: {
      language: 'filter by language',
    },
    heading: 'Code Snippets',
    lastModified: 'Last modified: {{modified}}',
    noMatch: 'No snippets match these filters.',
    noSavedSnippets: 'You have no saved snippets.',
    placeholder: {
      allLanguages: 'All languages',
      search: 'Search',
    },
    reset: 'Reset',
    save: {
      success: 'Snippet locally saved to device!',
    },
    sort: {
      date: 'Date',
      heading: 'Sort By:',
      title: 'Title',
    },
    text: 'Plain Text',
  },
  splash: {
    loading: 'Loading LiveCodes…',
  },
  sync: {
    autoSync: 'Auto sync',
    create: {
      desc: 'A new <1>private</1> repo will be created. Your LiveCodes local data will be synchronized with <2>main</2> branch.',
      heading: 'Create New Repo',
      repoName: 'Repo Name',
    },
    error: {
      generic: 'Sync failed!',
      repoNameRequired: 'Repo name is required',
    },
    existing: {
      desc: 'Your LiveCodes local data will be synchronized with <1>main</1> branch.',
      heading: 'Existing Repo',
      repoName: 'Repo Name',
    },
    heading: 'Sync to GitHub Repo',
    searchRepos: 'Search your repos...',
    success: 'Sync complete!',
    syncBtn: 'Sync',
    syncInProgress: 'Sync in progress...',
    syncStarted: 'Sync started...',
  },
  templates: {
    heading: 'New Project',
    noUserTemplates: {
      desc: 'You can save a project as a template from <1></1>(App&nbsp;menu&nbsp;&gt;&nbsp;Save&nbsp;as&nbsp;&gt; Template).',
      heading: 'You have no saved templates.',
    },
    starter: {
      angular: 'Angular Starter',
      assemblyscript: 'AssemblyScript Starter',
      astro: 'Astro Starter',
      backbone: 'Backbone Starter',
      blank: 'Blank Project',
      blockly: 'Blockly Starter',
      bootstrap: 'Bootstrap Starter',
      civet: 'Civet Starter',
      clio: 'Clio Starter',
      clojurescript: 'ClojureScript Starter',
      coffeescript: 'CoffeeScript Starter',
      commonlisp: 'Common Lisp Starter',
      cpp: 'C++ Starter',
      daisyui: 'daisyUI Starter',
      diagrams: 'Diagrams Starter',
      fennel: 'Fennel Starter',
      gleam: 'Gleam Starter',
      go: 'Go Starter',
      heading: 'Starter Templates',
      imba: 'Imba Starter',
      javascript: 'JavaScript Starter',
      jest: 'Jest Starter',
      'jest-react': 'Jest/React Starter',
      jquery: 'jQuery Starter',
      julia: 'Julia Starter',
      knockout: 'Knockout Starter',
      lit: 'Lit Starter',
      livescript: 'LiveScript Starter',
      loading: 'Loading starter templates...',
      lua: 'Lua Starter',
      'lua-wasm': 'Lua (Wasm) Starter',
      malina: 'Malina.js Starter',
      markdown: 'Markdown Starter',
      mdx: 'MDX Starter',
      ocaml: 'Ocaml Starter',
      perl: 'Perl Starter',
      php: 'PHP Starter',
      'php-wasm': 'PHP (Wasm) Starter',
      postgresql: 'PostgreSQL Starter',
      preact: 'Preact Starter',
      prolog: 'Prolog Starter',
      python: 'Python Starter',
      r: 'R Starter',
      react: 'React Starter',
      'react-native': 'React Native Starter',
      reason: 'Reason Starter',
      rescript: 'ReScript Starter',
      riot: 'Riot.js Starter',
      ruby: 'Ruby Starter',
      'ruby-wasm': 'Ruby (Wasm) Starter',
      scheme: 'Scheme Starter',
      shadcnui: 'shadcn/ui Starter',
      solid: 'Solid Starter',
      sql: 'SQL Starter',
      stencil: 'Stencil Starter',
      svelte: 'Svelte Starter',
      tailwindcss: 'Tailwind CSS Starter',
      tcl: 'Tcl Starter',
      teal: 'Teal Starter',
      typescript: 'TypeScript Starter',
      vue: 'Vue SFC Starter',
      vue2: 'Vue 2 Starter',
      wat: 'WebAssembly Text Starter',
      java: 'Java Starter',
    },
    user: {
      heading: 'My Templates',
      loading: 'Loading user templates...',
    },
  },
  testEditor: {
    heading: 'Edit Tests',
    load: 'Load',
    tests: 'Tests',
  },
  testSettings: {
    desc: '<1></1> For further details, please refer to the <2>documentation</2>',
  },
  toolspane: {
    close: 'Close',
    compiled: {
      title: 'Compiled',
    },
    console: {
      clear: 'Clear console',
      title: 'Console',
    },
    test: {
      edit: 'Edit',
      error: '<1><2>Test error!</2></1>',
      loading: '<1>Loading tests...</1>',
      noTest: '<1>This project has no tests!</1>',
      reset: 'Reset',
      run: {
        desc: 'Ctrl/⌘ + Alt + T',
        heading: 'Run',
      },
      summary: {
        desc: 'Tests: {{failed}}\n       {{passed}}\n       {{skipped}}\n       {{total}}<1></1>\nTime: {{duration}}s',
        failed: '{{failedNum}} failed',
        passed: '{{passedNum}} passed',
        skipped: '{{skippedNum}} skipped',
        total: '{{totalNum}} total',
      },
      title: 'Tests',
      watch: {
        desc: 'Run tests when code changes',
        heading: 'Watch',
      },
    },
  },
  welcome: {
    about: {
      documentation: 'Documentation',
      heading: 'About LiveCodes',
    },
    heading: 'Welcome',
    recent: {
      heading: 'Recent',
    },
    recover: {
      cancel: 'Cancel',
      heading: 'Recover',
      lastModified: 'Last modified:',
      recover: 'Recover',
      save: 'Save',
      unsavedChanges: 'Your last project had unsaved changes:',
    },
    showOnStartup: 'Show on startup',
    start: {
      heading: 'Start',
      import: 'Import...',
      loadDefaultTemplate: 'Load default template',
      new: 'New...',
      noDefaultTemplate: 'No default template',
      open: 'Open...',
    },
    templates: {
      heading: 'Starter Templates',
    },
  },
} as const satisfies I18nTranslationTemplate;

export default translation;
