export const getToolbarElement = () => document.querySelector('#toolbar') as HTMLElement;
export const getProjectTitleElement = () => document.querySelector('#project-title') as HTMLElement;
export const getEditorContainerElement = () =>
  document.querySelector('#editor-container') as HTMLElement;
export const getEditorsElement = () => document.querySelector('#editors') as HTMLElement;
export const getMarkupElement = () => document.querySelector('#markup') as HTMLElement;
export const getStyleElement = () => document.querySelector('#style') as HTMLElement;
export const getScriptElement = () => document.querySelector('#script') as HTMLElement;
export const getOutputElement = () => document.querySelector('#output') as HTMLElement;
export const getResultElement = () => document.querySelector('#result') as HTMLElement;
export const getResultIFrameElement = () =>
  document.querySelector('#result > iframe') as HTMLIFrameElement;
export const getGutterElement = () =>
  document.querySelector('#editor-container .gutter') as HTMLElement;
export const getLogoLink = () => document.querySelector('#logo a') as HTMLAnchorElement;
export const getRunButton = () => document.querySelector('#run-button') as HTMLElement;
export const getCodeRunButton = () => document.querySelector('#code-run-button') as HTMLElement;
export const getResultButton = () => document.querySelector('#result-button') as HTMLElement;
export const getEditorTitles = () =>
  document.querySelectorAll<HTMLElement>('.editor-title:not(.hidden)');
export const getEditorDivs = () => document.querySelectorAll<HTMLElement>('#editors > div');
export const getToolspaneLoader = () => document.querySelector<HTMLElement>('#tools-pane-loading');
export const getModalSaveButton = () =>
  document.querySelector('#modal #prompt-save-btn') as HTMLElement;
export const getModalDoNotSaveButton = () =>
  document.querySelector('#modal #prompt-donot-save-btn') as HTMLElement;
export const getModalCancelButton = () =>
  document.querySelector('#modal #prompt-cancel-btn') as HTMLElement;

export const getModalRestoreButton = () =>
  document.querySelector('#modal #prompt-restore-btn') as HTMLElement;
export const getModalSavePreviousButton = () =>
  document.querySelector('#modal #prompt-save-previous-btn') as HTMLElement;
export const getModalCancelRestoreButton = () =>
  document.querySelector('#modal #prompt-cancel-restore-btn') as HTMLElement;
export const getModalUnsavedName = () =>
  document.querySelector('#modal #unsaved-project-name') as HTMLElement;
export const getModalUnsavedLastModified = () =>
  document.querySelector('#modal #unsaved-project-last-modified') as HTMLElement;
export const getModalDisableRestoreCheckbox = () =>
  document.querySelector('#modal #disable-restore-checkbox') as HTMLInputElement;

export const getLanguageMenuLinks = () =>
  document.querySelectorAll<HTMLElement>('#select-editor .language-item a');

export const getLanguageMenuButtons = () =>
  document.querySelectorAll<HTMLElement>('#select-editor .language-menu-button');

export const getstyleMenu = () =>
  document.querySelector<HTMLElement>('#style-selector .dropdown-menu');

export const getSettingToggles = () =>
  document.querySelectorAll<HTMLInputElement>('#settings-menu input');

export const getCssPresetLinks = () =>
  document.querySelectorAll<HTMLAnchorElement>('#css-preset-menu a');

export const getSettingsMenuScroller = () =>
  document.querySelector<HTMLElement>('#settings-menu-container');
export const getSettingsButton = () => document.querySelector<HTMLElement>('#settings-button');

export const getExportJSONLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-json');

export const getExportResultLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-result');

export const getExportSourceLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-src');

export const getExportGithubGistLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-githubGist');

export const getExportCodepenLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-codepen');

export const getExportJsfiddleLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-jsfiddle');

export const getLoginLink = () => document.querySelector<HTMLAnchorElement>('#login-link');

export const getLogoutLink = () => document.querySelector<HTMLAnchorElement>('#logout-link');

export const getNewLink = () => document.querySelector<HTMLAnchorElement>('#new-link');

export const getOpenLink = () => document.querySelector<HTMLAnchorElement>('#open-link');

export const getSaveLink = () => document.querySelector<HTMLAnchorElement>('#save-link');

export const getForkLink = () => document.querySelector<HTMLAnchorElement>('#fork-link');

export const getSaveAsTemplateLink = () =>
  document.querySelector<HTMLAnchorElement>('#template-link');

export const getExternalResourcesLink = () =>
  document.querySelector<HTMLAnchorElement>('#external-resources-link');

export const getCustomSettingsLink = () =>
  document.querySelector<HTMLAnchorElement>('#custom-settings-link');

export const getShareLink = () => document.querySelector<HTMLAnchorElement>('#share-link');

export const getDeployLink = () => document.querySelector<HTMLAnchorElement>('#deploy-link');

export const getImportLink = () => document.querySelector<HTMLAnchorElement>('#import-link');

export const getAutoupdateToggle = () =>
  document.querySelector('#settings-menu input#autoupdate') as HTMLInputElement;

export const getAutosaveToggle = () =>
  document.querySelector('#settings-menu input#autosave') as HTMLInputElement;

export const getFormatOnsaveToggle = () =>
  document.querySelector('#settings-menu input#formatOnsave') as HTMLInputElement;

export const getProcessorToggles = () =>
  document.querySelectorAll<HTMLInputElement>('#style-selector input');

export const getEmmetToggle = () =>
  document.querySelector('#settings-menu input#emmet') as HTMLInputElement;

export const getThemeToggle = () =>
  document.querySelector('#settings-menu input#theme') as HTMLInputElement;

export const getRestoreToggle = () =>
  document.querySelector('#settings-menu input#enable-restore') as HTMLInputElement;

export const getCSSPresetLinks = () =>
  document.querySelectorAll<HTMLAnchorElement>('#css-preset-menu a');

export const getProjectInfoLink = () =>
  document.querySelector('#settings-menu #info-link') as HTMLInputElement;

export const getAssetsLink = () =>
  document.querySelector('#settings-menu #assets-link') as HTMLInputElement;

export const getInfoTitleInput = () =>
  document.querySelector('#info-container input#title-input') as HTMLInputElement;

export const getInfoDescription = () =>
  document.querySelector('#info-container #description-textarea') as HTMLTextAreaElement;

export const getInfoTagsInput = () =>
  document.querySelector('#info-container input#tags-input') as HTMLInputElement;

export const getSaveInfoButton = () =>
  document.querySelector<HTMLElement>('#info-container #info-save-btn');

export const getExternalResourcesTextareas = () =>
  document.querySelectorAll<HTMLTextAreaElement>('#resources-container textarea');

export const getLoadResourcesButton = () =>
  document.querySelector<HTMLElement>('#resources-container #resources-load-btn');

export const getCustomSettingsEditor = () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-editor');

export const getLoadCustomSettingsButton = () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-load-btn');

export const getUrlImportForm = (importContainer: HTMLElement) =>
  importContainer.querySelector<HTMLFormElement>('#url-import-form');
export const getUrlImportButton = (importContainer: HTMLElement) =>
  importContainer.querySelector('#url-import-btn') as HTMLButtonElement;
export const getUrlImportInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#code-url') as HTMLInputElement;

export const getImportJsonUrlForm = (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url-import-form') as HTMLInputElement;
export const getImportJsonUrlButton = (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url-import-btn') as HTMLInputElement;
export const getImportJsonUrlInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url') as HTMLInputElement;

export const getBulkImportJsonUrlForm = (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url-import-form') as HTMLInputElement;
export const getBulkImportJsonUrlButton = (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url-import-btn') as HTMLInputElement;
export const getBulkImportJsonUrlInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url') as HTMLInputElement;
export const getLinkToSavedProjects = (importContainer: HTMLElement) =>
  importContainer.querySelector('#link-to-saved-projects') as HTMLAnchorElement;

export const getImportFileInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#file-input') as HTMLInputElement;

export const getBulkImportFileInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-file-input') as HTMLInputElement;

export const getNewRepoForm = (deployContainer: HTMLElement) =>
  deployContainer.querySelector<HTMLFormElement>('#new-repo-form');
export const getNewRepoButton = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-btn') as HTMLButtonElement;
export const getNewRepoNameInput = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-name') as HTMLInputElement;
export const getNewRepoNameError = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-name-error') as HTMLElement;
export const getNewRepoMessageInput = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-message') as HTMLInputElement;
export const getNewRepoCommitSource = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-source') as HTMLInputElement;

export const getExistingRepoForm = (deployContainer: HTMLElement) =>
  deployContainer.querySelector<HTMLFormElement>('#existing-repo-form');
export const getExistingRepoButton = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-btn') as HTMLButtonElement;
export const getExistingRepoNameInput = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-name') as HTMLInputElement;
export const getExistingRepoMessageInput = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-message') as HTMLInputElement;
export const getExistingRepoCommitSource = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-source') as HTMLInputElement;

export const getStarterTemplatesTab = (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector<HTMLElement>(
    '#templates-tabs [data-target="templates-starter"]',
  );
export const getStarterTemplatesList = (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector<HTMLElement>('#starter-templates-list');
export const getUserTemplatesScreen = (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector('#templates-user .modal-screen') as HTMLElement;

export const getBulkImportButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#bulk-import-button') as HTMLElement;

export const getExportAllButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#export-all-button') as HTMLElement;

export const getDeleteAllButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#delete-all-button') as HTMLElement;

export const getAssetsBulkImportButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-bulk-import-button') as HTMLElement;

export const getAssetsExportAllButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-export-all-button') as HTMLElement;

export const getAssetsDeleteAllButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-delete-all-button') as HTMLElement;
