import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const translation = {
  about: {
    livecodes: {
      para1:
        '<1><0>LiveCodes</0></1> is an <2>open-source</2>, <3>feature-rich</3>, <4>client-side</4> code playground. Currently, <6>80+ languages/<5></5>frameworks</6> are supported. It can be used as a standalone app or can be <7>embedded</7> in any web page. There are many ways to <8>prefill playgrounds</8> with code.',
      para2:
        'A wide range of <0>configuration options</0> makes it very flexible. A powerful <1>SDK</1> (for <2>JS/TS</2>, <3>React</3>, <4>Vue</4> and <5>Svelte</5>) facilitates <6>embedding</6> and <7>communicating</7> with playgrounds. <8>Comprehensive documentations</8> are available with code samples, live demos and screenshots.',
    },
    documentations: {
      heading: 'Documentations',
      home: 'Home',
      license: 'License',
      contact: 'Contact',
      aboutUs: 'About us',
    },
    version: {
      heading: 'Version',
      app: 'App version: {{APP_VERSION}}',
      sdk: 'SDK version: {{SDK_VERSION}}',
      commit: 'Git commit: {{COMMIT_SHA}}',
      appPermanentUrl: 'App Permanent URL',
      sdkPermanentUrl: 'SDK Permanent URL',
    },
  },
  generic: {
    about: {
      gettingStarted: 'Getting Started',
      features: 'Features',
      configuration: 'Configuration',
      sdk: 'SDK',
      blog: 'Blog',
      sponsor: 'Sponsor LiveCodes',
      twitter: '𝕏 / Twitter',
      github: 'GitHub',
    },
    more: 'More...',
    clickForInfo: 'Click for info...',
    error: {
      authentication: 'Authentication error!',
      exceededSize: 'Error: Exceeded size {{size}} MB',
      failedToReadFile: 'Error: Failed to read file',
    },
    loading: 'Loading...',
  },
  welcome: {
    heading: 'Welcome',
    start: {
      heading: 'Start',
      new: 'New...',
      open: 'Open...',
      import: 'Import...',
      noDefaultTemplate: 'No default template',
      loadDefaultTemplate: 'Load default template',
    },
    recent: {
      heading: 'Recent',
    },
    templates: {
      heading: 'Starter Templates',
    },
    recover: {
      heading: 'Recover',
      unsavedChanges: 'Your last project had unsaved changes:',
      unsavedProjectName: '',
      lastModified: 'Last modified: <0></0>',
      recover: 'Recover',
      save: 'Save',
      cancel: 'Cancel',
    },
    about: {
      heading: 'About LiveCodes',
      documentation: 'Documentations',
    },
    showOnStartup: 'Show on startup',
  },
  core: {
    error: {
      noResultContainer: 'Result container not found',
      login: 'Login error!',
      logout: 'Logout error!',
      failedToLoadTemplate: 'Failed loading template',
      failedToCopyCode: 'Failed to copy code',
      failedToLoadTemplates: 'Failed loading starter templates',
      failedToParseSettings: 'Failed parsing settings as JSON',
      couldNotLoadTemplate: 'Could not load template: {{template}}',
      invalidImport: 'Invalid import URL',
      invalidPanelId: 'Invalid panel id',
      unavailableForEmbeds: 'Command unavailable for embeds',
      unavailable: 'Command unavailable',
      invalidToken: 'Invalid token!',
      invalidCommand: 'Invalid command!',
    },
    copy: {
      title: 'Copy',
      hint: 'Copied!',
      copied: 'Code copied to clipboard',
      copiedAsDataURL: 'Code copied as data URL',
    },
    changeLanguage: 'Loading {{lang}}. This may take a while!',
    save: {
      success: 'Project locally saved to device!',
      successWithName: 'Project "{{name}}" saved to device.',
    },
    fork: {
      success: 'Forked as a new project',
    },
    login: {
      successWithName: 'Logged in as: {{name}}',
      success: 'Logged in successfully',
    },
    logout: {
      success: 'Logged out successfully',
    },
    layout: {
      responsive: 'Responsive layout',
      vertical: 'Vertical layout',
      horizontal: 'Horizontal layout',
    },
    broadcast: {
      heading: 'Broadcast',
      successSetToken: 'Broadcast user token set successfully',
    },
    template: {
      delete: 'Delete template "{{item}}"?',
      saved: 'Saved as a new template',
      blank: 'Blank Project',
      javascript: 'JavaScript Starter',
      typescript: 'TypeScript Starter',
      react: 'React Starter',
      vue: 'Vue 3 Starter',
    },
    export: {
      gist: 'Creating a public GitHub gist...',
    },
    result: {
      hint: 'Show result in new window',
    },
    zoom: {
      hint: 'Zoom',
    },
    fullScreen: {
      enter: 'Full Screen',
      exit: 'Exit Full Screen',
    },
    unload: {
      notSaved: 'Changes you made may not be saved.',
    },
    import: {
      loading: 'Loading Project...',
    },
    loadDefaults: {
      template: 'Loading default template',
    },
  },
  broadcast: {
    broadcasting: 'Broadcasting...',
    broadcastBtn: {
      stop: 'Stop broadcast',
      start: 'Broadcast',
    },
    error: {
      serverURLRequired: 'Server URL is required!',
      generic: 'Broadcast failed!',
    },
    connecting: 'Connecting...',
  },
  assets: {
    url: {
      success: 'URL is copied to clipboard.',
      fail: 'Failed to copy URL.',
    },
    link: {
      type: 'Type: {{type}}',
      url: 'URL: {{url}}',
    },
    generic: {
      clickToCopyURL: 'Click to copy URL',
    },
    loadFile: {
      error: {
        unauthenticated: 'Error: Unauthenticated user',
        failedToUpload: 'Error: Failed to upload file',
      },
      uploading: 'Uploading...',
      upload: 'Upload file',
    },
    processAsset: {
      addFile: 'Added file: ',
      urlLabel: 'URL: ',
      deployNotice: 'The asset should be available on this URL soon (~1 min).',
      success: 'File added to assets!',
    },
  },
  backup: {
    inProgress: 'In progress...',
    backupBtn: 'Backup',
    fileInputLabel: 'Restore from file',
    error: {
      atLeastOneStore: 'Please select at least one store to backup',
      incorrectFileType: 'Error: Incorrect file type',
    },
    restore: {
      success: 'Restored Successfully!',
    },
  },
  deploy: {
    error: {
      generic: 'Deployment failed!',
      repoNameRequired: 'Repo name is required',
    },
    deploying: 'Deploying...',
    deploy: 'Deploy',
    searchRepo: 'Search your public repos...',
  },
  editorSettings: {
    default: 'Default',
    enableAI: {
      heading: 'Enable AI Code Assistant',
      note: 'Powered by <1><0></0></1>',
    },
    editor: {
      heading: 'Editor',
      monaco: 'Monaco',
      codemirror: 'CodeMirror',
      codejar: 'CodeJar',
    },
    theme: 'Dark Mode',
    editorTheme: 'Editor Theme',
    fontFamily: 'Font Family',
    fontSize: 'Font Size',
    useTabs: {
      heading: 'Indentation',
      spaces: 'Spaces',
      tabs: 'Tabs',
    },
    tabSize: 'Tab Size',
    lineNumbers: 'Show line numbers',
    wordWrap: 'Word-wrap',
    closeBrackets: 'Auto-close brackets and quotes',
    emmet: 'Enable Emmet *',
    editorMode: {
      heading: 'Editor Mode *',
      vim: 'Vim',
      emacs: 'Emacs',
    },
    semicolons: 'Format: Use Semicolons',
    singleQuote: 'Format: Use Single Quotes',
    trailingComma: 'Format: Use Trailing Commas',
    notAvailableInCodeJar: 'Not available in CodeJar',
  },
  embedUI: {
    theme: {
      heading: 'Theme',
      dark: 'Dark',
      light: 'Light',
    },
    loading: {
      heading: 'Loading',
      lazy: 'Lazy',
      click: 'On-click',
      eager: 'Eager',
    },
    lite: 'Lite Mode',
    readonly: 'Read only',
    mode: {
      heading: 'Display Mode',
      full: 'Full',
      editor: 'Editor',
      codeblock: 'Code Block',
      result: 'Result',
    },
    view: {
      heading: 'Default View',
      split: 'Split',
      editor: 'Editor',
      result: 'Result',
    },
    activeEditor: {
      heading: 'Active Editor',
      markup: '{{markup}}',
      style: '{{style}}',
      script: '{{script}}',
    },
    tools: {
      heading: 'Tools',
      closed: 'Closed',
      open: 'Open',
      full: 'Full',
      none: 'None',
    },
    activeTool: {
      heading: 'Active Tool',
      console: 'Console',
      compiled: 'Compiled',
      tests: 'Tests',
    },
    permanentUrl: 'Permanent URL',
    embedType: {
      heading: 'Embed Type',
      cdn: 'Script (CDN)',
      npm: 'JS (npm)',
      react: 'React',
      vue: 'Vue',
      svelte: 'Svelte',
      iframe: 'Iframe',
      html: 'HTML',
    },
  },
  import: {
    error: {
      failedToLoadURL: 'Error: failed to load URL',
      invalidConfigFile: 'Invalid configuration file',
      invalidFile: 'Error: Invalid file',
    },
    success: 'Import Successful!',
  },
  login: {
    logout: 'Log out',
    loginAs: 'Logged in as {{name}}',
  },
  open: {
    filter: {
      language: 'filter by language',
      tag: 'filter by tag',
    },
    lastModified: 'Last modified: {{modified}}',
    setAsDefault: 'Set as default',
    defaultTemplate: 'Default template ',
    removeDefault: '(unset)',
    delete: {
      all: 'Delete {{projects}} projects?',
      one: 'Delete project: {{project}}?',
    },
  },
  qrcode: {
    clickToDownload: 'Click to download',
  },
  resources: {
    browseOnJsDelivr: 'Browse package files on jsDelivr',
    error: {
      failedToLoadResults: 'Failed to load results!',
      noResultsFound: 'No results found for: ',
    },
    font: {
      select: 'Select font ...',
      add: 'Add',
    },
  },
  share: {
    error: {
      failedToCopy: 'Copy to clipboard failed!',
      failedToGenerateURL: 'Failed to generate short URL!',
    },
    copy: {
      copied: 'URL copied to clipboard',
      clickToCopy: 'Click to copy',
    },
    services: {
      twitter: '𝕏 / Twitter',
      share: 'Share via …',
      facebook: 'Facebook',
      hackerNews: 'Hacker News',
      reddit: 'Reddit',
      linkedIn: 'LinkedIn',
      devTo: 'Dev.to',
      tumblr: 'Tumblr',
      pinterest: 'Pinterest',
      whatsApp: 'WhatsApp',
      telegram: 'Telegram',
      pocket: 'Pocket',
      email: 'Email',
      copyUrl: 'Copy URL',
      qrCode: 'QR code',
    },
    generateURL: 'Generating URL …',
  },
  snippets: {
    text: 'Plain Text',
    copy: {
      copied: 'Snippet is copied to clipboard.',
      clickToCopySnippet: 'Click to copy snippet',
    },
    error: {
      failedToCopy: 'Failed to copy URL.',
      noTitle: 'Please add snippet title.',
    },
    filter: {
      language: 'filter by language',
    },
    action: {
      copy: 'Copy',
      edit: 'Edit',
      delete: 'Delete',
    },
    delete: {
      all: 'Delete {{snippets}} snippets?',
      one: 'Delete snippet: {{snippet}}}?',
    },
    save: {
      success: 'Snippet locally saved to device!',
    },
  },
  snippetes: {
    lastModified: 'Last modified: {{modified}}',
  },
  syncUI: {
    syncInProgress: 'Sync in progress...',
    sync: 'Sync',
    syncStarted: 'Sync started...',
    error: {
      generic: 'Sync failed!',
      repoNameRequired: 'Repo name is required',
    },
    success: 'Sync complete!',
    searchRepos: 'Search your repos...',
  },
  templates: {
    noUserTemplates: {
      heading: 'You have no saved templates.',
      desc: 'You can save a project as a template from <0></0>(App&nbsp;menu&nbsp;&gt;&nbsp;Save&nbsp;as&nbsp;&gt; Template).',
    },
  },
} as const satisfies I18nTranslationTemplate;

export default translation;
