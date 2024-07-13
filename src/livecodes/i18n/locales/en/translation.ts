// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const translation = {
  about: {
    documentations: {
      aboutUs: 'About us',
      contact: 'Contact',
      heading: 'Documentations',
      home: 'Home',
      license: 'License',
    },
    livecodes: {
      para1:
        '<1><2>LiveCodes</2></1> is an <3>open-source</3>, <4>feature-rich</4>, <5>client-side</5> code playground. Currently, <6>80+ languages/<7></7>frameworks</6> are supported. It can be used as a standalone app or can be <8>embedded</8> in any web page. There are many ways to <9>prefill playgrounds</9> with code. ',
      para2:
        'A wide range of <1>configuration options</1> makes it very flexible. A powerful <2>SDK</2> (for <3>JS/TS</3>, <4>React</4>, <5>Vue</5> and <6>Svelte</6>) facilitates <7>embedding</7> and <8>communicating</8> with playgrounds. <9>Comprehensive documentations</9> are available with code samples, live demos and screenshots. ',
    },
    version: {
      app: 'App version: {{APP_VERSION}}',
      appPermanentUrl: 'App Permanent URL',
      commit: 'Git commit: {{COMMIT_SHA}}',
      heading: 'Version',
      sdk: 'SDK version: {{SDK_VERSION}}',
      sdkPermanentUrl: 'SDK Permanent URL',
    },
  },
  app: {
    copy: {
      hint: 'Copy (Ctrl/Cmd + A, Ctrl/Cmd + C)',
    },
    copyAsUrl: {
      hint: 'Copy code as data URL',
    },
    customSettings: {
      hint: 'Custom Settings',
    },
    editorMode: {
      hint: 'Editor Mode',
    },
    editorSettings: {
      hint: 'Editor Settings',
    },
    externalResources: {
      hint: 'External Resources',
    },
    focus: {
      hint: 'Toggle Focus mode',
    },
    format: {
      hint: 'Format (Alt + Shift + F)',
    },
    fullscreen: {
      hint: 'Full Screen',
    },
    logo: {
      title: 'LiveCodes: Code playground that runs in the browser!',
    },
    projectInfo: {
      hint: 'Project Info',
    },
    redo: {
      hint: 'Redo (Ctrl/Cmd + Shift + Z)',
    },
    result: {
      hint: 'Toggle Result',
    },
    run: {
      hint: 'Run (Shift + Enter)',
    },
    share: {
      hint: 'Share',
    },
    undo: {
      hint: 'Undo (Ctrl/Cmd + Z)',
    },
    untitledProject: 'Untitled Project',
  },
  assets: {
    add: {
      dataURL: {
        desc: 'Add asset as a base64-encoded <1>data url</1>. ',
        heading: 'Data URL',
        label: 'Add file',
      },
      githubPages: {
        desc: 'Deploy asset to GitHub Pages. The file is pushed to <1>gh-pages</1> branch of the repo <2>livecodes-assets</2> on your GitHub account. If the repo does not already exist, a public repo will be created. ',
        heading: 'GitHub Pages',
        label: 'Upload file',
      },
      heading: 'Add Asset',
    },
    deleteAll: 'Delete All',
    generic: {
      clickToCopyURL: 'Click to copy URL',
    },
    heading: 'Assets',
    link: {
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
      desc: 'Backup LiveCodes data, so that it can be later restored on this or other devices. <1></1> Please visit the <2>documentations</2> for details. ',
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
      desc: 'Restore previously backed-up LiveCodes data. <1></1> If you choose to replace current content, you may want to back it up first. <2></2> Please visit the <3>documentations</3> for details. ',
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
    desc: 'Broadcast the result page to other browsers/devices in real time. Please visit the <1>documentations</1> for details. ',
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
  core: {
    broadcast: {
      heading: 'Broadcast',
      successSetToken: 'Broadcast user token set successfully',
    },
    changeLanguage: 'Loading {{lang}}. This may take a while!',
    copy: {
      copied: 'Code copied to clipboard',
      copiedAsDataURL: 'Code copied as data URL',
      hint: 'Copied!',
      title: 'Copy',
    },
    error: {
      couldNotLoadTemplate: 'Could not load template: {{template}}',
      failedToCopyCode: 'Failed to copy code',
      failedToLoadTemplate: 'Failed loading template',
      failedToLoadTemplates: 'Failed loading starter templates',
      failedToParseSettings: 'Failed parsing settings as JSON',
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
    heading: 'Custom Settings',
    load: 'Load',
  },
  deploy: {
    create: {
      desc: 'A new <1>public</1> repo will be created. The result page will be pushed to <2>gh-pages</2> branch. ',
      heading: 'Create New Repo',
      repoName: 'Repo Name <1></1>',
    },
    error: {
      generic: 'Deployment failed!',
      repoNameRequired: 'Repo name is required',
    },
    existing: {
      desc: 'A new commit will be added to <1>gh-pages</1> branch. ',
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
    codeJarDesc: '* The marked features are not available in CodeJar.',
    default: 'Default',
    desc: 'Please check the <1>documentations</1> for details. ',
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
    fontFamily: 'Font Family',
    fontSize: 'Font Size',
    format: 'Format',
    heading: 'Editor Settings',
    lineNumbers: 'Show line numbers',
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
    desc: 'Please check the <1>documentations</1> for advanced configurations. ',
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
    Loading: 'Loading...',
    about: {
      blog: 'Blog',
      configuration: 'Configuration',
      features: 'Features',
      gettingStarted: 'Getting Started',
      github: 'GitHub',
      sdk: 'SDK',
      sponsor: 'Sponsor LiveCodes',
      twitter: '𝕏 / Twitter',
    },
    clickForInfo: 'Click for info...',
    error: {
      authentication: 'Authentication error!',
      exceededSize: 'Error: Exceeded size {{size}} MB',
      failedToReadFile: 'Error: Failed to read file',
    },
    loading: 'Loading...',
    more: 'More...',
    optional: 'Optional',
    required: 'Required',
  },
  import: {
    bulk: {
      desc: 'Bulk import multiple projects to your saved projects. Projects can be exported from the <1>Saved Projects</1> screen. ',
      fromFile: 'Bulk import from local file',
      fromURL: 'Bulk import from URL',
      heading: 'Bulk Import',
    },
    code: {
      desc: 'Supported Sources: <1> <2>GitHub gist</2> <3>GitHub file</3> <4>Directory in a GitHub repo</4> <5>Gitlab snippet</5> <6>Gitlab file</6> <7>Directory in a Gitlab repo</7> <8>JS Bin</8> <9>Raw code</9> <10>Code in web page DOM</10> <11>Code in zip file</11> <12>Official playgrounds<13></13>(TypeScript, Vue and Svelte)</12> </1> Please visit the <14>documentations</14> for details. ',
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
      desc: 'Import a single project JSON to editor. A project can be exported from app&nbsp;menu&nbsp;→ Export&nbsp;→ Export&nbsp;Project&nbsp;(JSON). ',
      fromFile: 'Import project from local file',
      fromURL: 'Import project from URL',
      heading: 'Import Project JSON',
    },
    success: 'Import Successful!',
  },
  login: {
    accessAllowed: 'Allow access to:',
    desc: '<1>By logging in, you agree that <2>cookies</2> may be stored on your device.</1> <3> <4>Why are these permissions required?</4> </3> <5> <6>How to change/revoke permissions?</6> </5> ',
    gist: 'Gists',
    heading: 'Login with GitHub',
    loginAs: 'Logged in as {{name}}',
    loginBtn: 'Login',
    logout: 'Log out',
    privateRepo: 'Private Repos',
    publicRepo: 'Repos',
  },
  menu: {
    about: 'About',
    assets: 'Assets …',
    autoSave: 'Auto Save',
    autoUpdate: 'Auto Update',
    backup: 'Backup / Restore …',
    broadcast: 'Broadcast …',
    customSettings: 'Custom Settings …',
    delay: {
      heading: 'Delay: <1>1.5</1>s',
      hint: 'Delay before auto-update',
    },
    deploy: 'Deploy …',
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
    formatOnsave: 'Format On-save',
    import: 'Import …',
    layout: 'Vertical Layout',
    login: 'Login …',
    logout: 'Log out',
    new: 'New …',
    open: 'Open …',
    project: 'Project Info …',
    recoverUnsaved: 'Recover Unsaved',
    resources: 'External Resources …',
    save: 'Save',
    saveAs: {
      fork: 'Fork (New Project)',
      heading: 'Save as',
      template: 'Template',
    },
    share: 'Share …',
    showSpacing: {
      heading: 'Show Spacing',
      hint: 'Press Alt/Option and move your cursor over result page',
    },
    snippets: 'Code Snippets …',
    sync: 'Sync (beta) … <1> ⏳</1>',
    theme: 'Dark Theme',
    welcome: {
      heading: 'Welcome …',
      hint: 'Show Welcome screen on startup',
    },
  },
  open: {
    defaultTemplate: 'Default template ',
    delete: {
      all: 'Delete {{projects}} projects?',
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
      desc: 'You can save a project from (settings&nbsp;menu&nbsp;&gt;&nbsp;Save) or by the keyboard shortcut (Ctrl/Cmd&nbsp;+&nbsp;S). ',
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
    head: 'Add to <head>',
    heading: 'Project Info',
    htmlAttr: 'Attributes for <html>',
    tags: 'Tags',
    title: 'Project Title',
  },
  recoverPrompt: {
    desc: 'Your last project has unsaved changes!',
    heading: 'Recover unsaved project?',
    meta: 'Title: <1></1> <2></2> Last modified: <3></3> ',
    notShowAgain: 'Do not show this again.',
    prompt: {
      discard: 'Discard unsaved project',
      heading: '<1></1>Do you want to recover it now? ',
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
    urlDesc: "Add stylesheet/script URLs and click 'Load'. Each URL should be in a separate line.",
  },
  savePrompt: {
    heading: 'Unsaved changes',
    prompt: {
      cancel: 'Cancel',
      discard: 'Do not save',
      heading: 'The changes you made may not be saved. <1></1> Do you want to save now? ',
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
      copyUrl: 'Copy URL',
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
      one: 'Delete snippet: {{snippet}}}?',
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
      desc: 'A new <1>private</1> repo will be created. Your LiveCodes local data will be synchronized with <2>main</2> branch. ',
      heading: 'Create New Repo',
      repoName: 'Repo Name',
    },
    error: {
      generic: 'Sync failed!',
      repoNameRequired: 'Repo name is required',
    },
    existing: {
      desc: 'Your LiveCodes local data will be synchronized with <1>main</1> branch. ',
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
      heading: 'Starter Templates',
      loading: 'Loading starter templates...',
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
  welcome: {
    about: {
      documentation: 'Documentations',
      heading: 'About LiveCodes',
    },
    heading: 'Welcome',
    recent: {
      heading: 'Recent',
    },
    recover: {
      cancel: 'Cancel',
      heading: 'Recover',
      lastModified: 'Last modified: <1></1> ',
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
