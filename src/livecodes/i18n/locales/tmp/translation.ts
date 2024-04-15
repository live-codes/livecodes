import { type I18nTranslationTemplate } from '../models';

const translation = {
  livecodesAboutPara1:
    '<1><0>LiveCodes</0></1> is an <2>open-source</2>, <3>feature-rich</3>, <4>client-side</4> code playground. Currently, <6>80+ languages/<5></5>frameworks</6> are supported. It can be used as a standalone app or can be <7>embedded</7> in any web page. There are many ways to <8>prefill playgrounds</8> with code.',
  livecodesAboutPara2:
    'A wide range of <0>configuration options</0> makes it very flexible. A powerful <1>SDK</1> (for <2>JS/TS</2>, <3>React</3>, <4>Vue</4> and <5>Svelte</5>) facilitates <6>embedding</6> and <7>communicating</7> with playgrounds. <8>Comprehensive documentations</8> are available with code samples, live demos and screenshots.',
  appVersion: 'App version: {{APP_VERSION}}',
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
      gettingStarted: 'Getting Started',
      features: 'Features',
      configuration: 'Configuration',
      sdk: 'SDK',
      blog: 'Blog',
      sponsor: 'Sponsor LiveCodes',
      twitter: '𝕏 / Twitter',
      github: 'GitHub',
    },
    showOnStartup: 'Show on startup',
  },
  generic: {
    clickForInfo: 'Click for info...',
    more: 'More...',
  },
} as const satisfies I18nTranslationTemplate;

export default translation;
