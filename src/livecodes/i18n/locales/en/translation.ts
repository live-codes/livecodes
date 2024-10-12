// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const translation = {
  broadcast: {
    broadcasting: 'Broadcasting...',
  },
  core: {
    broadcast: {
      heading: 'Broadcast',
      successSetToken: 'Broadcast user token set successfully',
    },
    changeLanguage: {
      message: 'Loading {{lang}}. This may take a while!',
    },
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
  generic: {
    close: 'Close',
    error: {
      authentication: 'Authentication error!',
    },
  },
  splash: {
    loading: 'Loading LiveCodes…',
  },
} as const satisfies I18nTranslationTemplate;

export default translation;
