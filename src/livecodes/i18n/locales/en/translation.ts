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
      lastModified: 'Last modified:',
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
  loading: {
    defaultMessage: 'Loading...',
  },
} as const satisfies I18nTranslationTemplate;

export default translation;
