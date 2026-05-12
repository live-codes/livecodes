export const getToolbarElement = /* @__PURE__ */ () =>
  document.querySelector('#toolbar') as HTMLElement;

export const getProjectTitleElement = /* @__PURE__ */ () =>
  document.querySelector('#project-title') as HTMLElement;

export const getEditorContainerElement = /* @__PURE__ */ () =>
  document.querySelector('#editor-container') as HTMLElement;

export const getEditorsElement = /* @__PURE__ */ () =>
  document.querySelector('#editors') as HTMLElement;

export const getMarkupElement = /* @__PURE__ */ () =>
  document.querySelector('#markup') as HTMLElement;

export const getStyleElement = /* @__PURE__ */ () =>
  document.querySelector('#style') as HTMLElement;

export const getScriptElement = /* @__PURE__ */ () =>
  document.querySelector('#script') as HTMLElement;

export const getOutputElement = /* @__PURE__ */ () =>
  document.querySelector('#output') as HTMLElement;

export const getResultElement = /* @__PURE__ */ () =>
  document.querySelector('#result') as HTMLElement;

export const getResultIFrameElement = /* @__PURE__ */ () =>
  document.querySelector('#result > iframe') as HTMLIFrameElement;
export const getGutterElement = /* @__PURE__ */ () =>
  document.querySelector('#editor-container .gutter') as HTMLElement;

export const getLogoLink = /* @__PURE__ */ () =>
  document.querySelector('a#logo') as HTMLAnchorElement;

export const getRunButton = /* @__PURE__ */ () =>
  document.querySelector('#run-button') as HTMLElement;

export const getLightThemeButton = /* @__PURE__ */ () =>
  document.querySelector('#light-theme-button') as HTMLElement;

export const getDarkThemeButton = /* @__PURE__ */ () =>
  document.querySelector('#dark-theme-button') as HTMLElement;

export const getI18nMenuButton = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-button-i18n') as HTMLElement;

export const getI18nMenuContainer = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-container-i18n') as HTMLElement;

export const getMarkupEditorTitle = /* @__PURE__ */ () =>
  document.querySelector('#markup-selector') as HTMLElement;

export const getStyleEditorTitle = /* @__PURE__ */ () =>
  document.querySelector('#style-selector') as HTMLElement;

export const getScriptEditorTitle = /* @__PURE__ */ () =>
  document.querySelector('#script-selector') as HTMLElement;

export const getEditorToolbar = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools') as HTMLElement;

export const getFocusButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #focus-btn') as HTMLElement;

export const getCopyButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #copy-btn') as HTMLElement;

export const getCopyAsUrlButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #copy-as-url-btn') as HTMLElement;

export const getCodeToImageButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #code-to-img-btn') as HTMLElement;

export const getUndoButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #undo-btn') as HTMLElement;

export const getRedoButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #redo-btn') as HTMLElement;

export const getFormatButton = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #format-btn') as HTMLElement;

export const getEditorModeNode = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#editor-mode');
export const getEditorStatus = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #editor-status') as HTMLElement;

export const getExternalResourcesBtn = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #external-resources-btn') as HTMLElement;

export const getExternalResourcesMark = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #external-resources-mark') as HTMLElement;

export const getProjectInfoBtn = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #project-info-btn') as HTMLElement;

export const getCustomSettingsBtn = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #custom-settings-btn') as HTMLElement;

export const getEditorSettingsBtn = /* @__PURE__ */ () =>
  document.querySelector('#editor-tools #editor-settings-btn') as HTMLElement;

export const getShareButton = /* @__PURE__ */ () =>
  document.querySelector('#share-button') as HTMLElement;

export const getResultButton = /* @__PURE__ */ () =>
  document.querySelector('#result-button') as HTMLElement;

export const getFullscreenButton = /* @__PURE__ */ () =>
  document.querySelector('#fullscreen-button') as HTMLElement;

export const getEditorTitles = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLElement>('.editor-title:not(.hidden)');

export const getEditorDivs = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLElement>('#editors > .editor');

export const getToolspaneElement = /* @__PURE__ */ () =>
  document.querySelector('#output #tools-pane') as HTMLElement;

export const getToolspaneBar = /* @__PURE__ */ () =>
  document.querySelector('#output #tools-pane-bar') as HTMLElement;

export const getToolspaneButtons = /* @__PURE__ */ () =>
  document.querySelector('#tools-pane-buttons') as HTMLElement;

export const getToolspaneTitles = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#tools-pane-titles');

export const getConsoleButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#tools-pane-titles > .console');

export const getCompiledButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#tools-pane-titles > .compiled');

export const getTestsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#tools-pane-titles > .tests');

export const getToolspaneLoader = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#tools-pane-loading');

export const getZoomButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#zoom-button');

export const getZoomButtonValue = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#zoom-button #zoom-value');

export const getResultPopupButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#result-popup-btn');

export const getModalSaveButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-save-btn') as HTMLElement;

export const getModalDoNotSaveButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-donot-save-btn') as HTMLElement;

export const getModalCancelButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-cancel-btn') as HTMLElement;

export const getModalRecoverButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-recover-btn') as HTMLElement;

export const getModalSavePreviousButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-save-previous-btn') as HTMLElement;

export const getModalCancelRecoverButton = /* @__PURE__ */ () =>
  document.querySelector('#modal #prompt-cancel-recover-btn') as HTMLElement;

export const getModalUnsavedName = /* @__PURE__ */ () =>
  document.querySelector('#modal #unsaved-project-name') as HTMLElement;

export const getModalUnsavedLastModified = /* @__PURE__ */ () =>
  document.querySelector('#modal #unsaved-project-last-modified') as HTMLElement;

export const getModalDisableRecoverCheckbox = /* @__PURE__ */ () =>
  document.querySelector('#modal #disable-recover-checkbox') as HTMLInputElement;

export const getLanguageMenuLinks = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLElement>('#select-editor .language-item a');

export const getLanguageMenuButtons = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLElement>('#select-editor .language-menu-button');

export const getstyleMenu = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#style-selector .dropdown-menu');

export const getSettingToggles = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLInputElement>('#app-menu-settings input');

export const getThemeColorSelector = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-settings #theme-color-selector');

export const getCssPresetLinks = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLAnchorElement>('#css-preset-menu a');

export const getAppMenuProjectScroller = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-container-project');

export const getAppMenuProjectButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-button-project');

export const getAppMenuSettingsScroller = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-container-settings');

export const getAppMenuSettingsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-button-settings');

export const getAppMenuHelpScroller = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-container-help');

export const getAppMenuHelpButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#app-menu-button-help');

export const getExportJSONLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-json');

export const getExportResultLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-result');

export const getExportSourceLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-src');

export const getExportGithubGistLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-githubGist');

export const getExportCodepenLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-codepen');

export const getExportJsfiddleLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-jsfiddle');

export const getLoginLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#login-link');

export const getLogoutLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#logout-link');

export const getNewLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#new-link');

export const getOpenLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#open-link');

export const getSaveLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#save-link');

export const getForkLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#fork-link');

export const getSaveAsTemplateLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#template-link');

export const getExternalResourcesLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#external-resources-link');

export const getCustomSettingsLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#custom-settings-link');

export const getShareLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#share-link');

export const getEmbedLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#embed-link');

export const getEditorSettingsLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#editor-settings-link');

export const getDeployLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#deploy-link');

export const getSyncLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#sync-link');

export const getSyncIndicator = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#sync-indicator');

export const getImportLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#import-link');

export const getBackupLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#backup-link');

export const getBroadcastLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#broadcast-link');

export const getWelcomeLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#welcome-link');

export const getAboutLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#about-link');

export const getCommandMenuLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#command-menu-link');

export const getKeyboardShortcutsMenuLink = /* @__PURE__ */ () =>
  document.querySelector<HTMLAnchorElement>('#keyboard-shortcuts-menu-link');

export const getAutoupdateToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#autoupdate') as HTMLInputElement;

export const getDelayValue = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings #delay-value') as HTMLElement;

export const getDelayRange = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#delay-range') as HTMLInputElement;

export const getAutosaveToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#autosave') as HTMLInputElement;

export const getAutosyncToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#autosync') as HTMLInputElement;

export const getFormatOnsaveToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#formatOnsave') as HTMLInputElement;

export const getProcessorToggles = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLInputElement>('#style-selector input');

export const getEmmetToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#emmet') as HTMLInputElement;

export const getThemeToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#theme') as HTMLInputElement;

export const getLayoutToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#layout') as HTMLInputElement;

export const getShowWelcomeToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#welcome') as HTMLInputElement;

export const getRecoverToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#recover-unsaved') as HTMLInputElement;

export const getThemeColorContainer = /* @__PURE__ */ () =>
  document.querySelector('#theme-color-selector') as HTMLElement;

export const getCustomThemeColorInput = /* @__PURE__ */ () =>
  document.querySelector('#theme-color-custom') as HTMLInputElement;

export const getSpacingToggle = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings input#show-spacing') as HTMLInputElement;

export const getCSSPresetLinks = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLAnchorElement>('#css-preset-menu a');

export const getProjectInfoLink = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-project #info-link') as HTMLInputElement;

export const getAssetsLink = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings #assets-link') as HTMLInputElement;

export const getSnippetsLink = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-settings #snippets-link') as HTMLInputElement;

export const getHelpMenu = /* @__PURE__ */ () =>
  document.querySelector('#app-menu-help') as HTMLElement;

export const getInfoTitleInput = /* @__PURE__ */ () =>
  document.querySelector('#info-container input#title-input') as HTMLInputElement;

export const getInfoHead = /* @__PURE__ */ () =>
  document.querySelector('#info-container #head-textarea') as HTMLTextAreaElement;

export const getInfoHtmlAttrs = /* @__PURE__ */ () =>
  document.querySelector('#info-container #html-attrs-textarea') as HTMLTextAreaElement;

export const getInfoDescription = /* @__PURE__ */ () =>
  document.querySelector('#info-container #description-textarea') as HTMLTextAreaElement;

export const getInfoTagsInput = /* @__PURE__ */ () =>
  document.querySelector('#info-container input#tags-input') as HTMLInputElement;

export const getExternalResourcesTextareas = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLTextAreaElement>('#resources-container textarea');

export const getExternalResourcesCssPresetInputs = /* @__PURE__ */ () =>
  document.querySelectorAll<HTMLInputElement>('#resources-container input[type="radio"]');

export const getCustomSettingsEditor = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-editor');

export const getLoadCustomSettingsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-load-btn');

export const getTestEditor = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#test-editor-container #test-editor');

export const getLoadTestsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#test-editor-container #test-load-btn');

export const getEditTestsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#test-container #edit-tests-btn');

export const getRunTestsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#test-container #run-tests-btn');

export const getWatchTestsButton = /* @__PURE__ */ () =>
  document.querySelector<HTMLElement>('#test-container #watch-tests-btn');

export const getUrlImportForm = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector<HTMLFormElement>('#url-import-form');

export const getUrlImportButton = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#url-import-btn') as HTMLButtonElement;

export const getUrlImportInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#code-url') as HTMLInputElement;

export const getCodeImportInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#local-code-input') as HTMLInputElement;

export const getImportJsonUrlForm = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url-import-form') as HTMLInputElement;

export const getImportJsonUrlButton = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url-import-btn') as HTMLInputElement;

export const getImportJsonUrlInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#json-url') as HTMLInputElement;

export const getBulkImportJsonUrlForm = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url-import-form') as HTMLInputElement;

export const getBulkImportJsonUrlButton = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url-import-btn') as HTMLInputElement;

export const getBulkImportJsonUrlInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-json-url') as HTMLInputElement;

export const getLinkToSavedProjects = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#link-to-saved-projects') as HTMLAnchorElement;

export const getImportFileInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#file-input') as HTMLInputElement;

export const getImportFileInputLabel = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('.file-input-label') as HTMLInputElement;

export const getBulkImportFileInput = /* @__PURE__ */ (importContainer: HTMLElement) =>
  importContainer.querySelector('#bulk-file-input') as HTMLInputElement;

export const getNewRepoForm = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector<HTMLFormElement>('#new-repo-form');

export const getNewRepoButton = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-btn') as HTMLButtonElement;

export const getNewRepoNameInput = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-name') as HTMLInputElement;

export const getNewRepoNameError = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-name-error') as HTMLElement;

export const getNewRepoMessageInput = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-message') as HTMLInputElement;

export const getNewRepoCommitSource = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-source') as HTMLInputElement;

export const getNewRepoAutoSync = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-autosync') as HTMLInputElement;

export const getExistingRepoForm = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector<HTMLFormElement>('#existing-repo-form');

export const getExistingRepoButton = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-btn') as HTMLButtonElement;

export const getExistingRepoNameInput = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-name') as HTMLInputElement;

export const getExistingRepoMessageInput = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-message') as HTMLInputElement;

export const getExistingRepoCommitSource = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-source') as HTMLInputElement;

export const getExistingRepoAutoSync = /* @__PURE__ */ (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-autosync') as HTMLInputElement;

export const getStarterTemplatesTab = /* @__PURE__ */ (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector<HTMLElement>(
    '#templates-tabs [data-target="templates-starter"]',
  );

export const getStarterTemplatesList = /* @__PURE__ */ (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector<HTMLElement>('#starter-templates-list');

export const getUserTemplatesScreen = /* @__PURE__ */ (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector('#templates-user .modal-screen') as HTMLElement;

export const getTemplatesSearchInput = /* @__PURE__ */ (templatesContainer: HTMLElement) =>
  templatesContainer.querySelector('#templates-search-input') as HTMLInputElement;

export const getBulkImportButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#bulk-import-button') as HTMLElement;

export const getExportAllButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#export-all-button') as HTMLElement;

export const getDeleteAllButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#delete-all-button') as HTMLElement;

export const getAddAssetButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-add-asset-button') as HTMLElement;

export const getAssetsDeleteAllButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-delete-all-button') as HTMLElement;

export const getAssetsButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-button') as HTMLElement;

export const getAssetDataUrlFileInput = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-data-url-file-input') as HTMLInputElement;

export const getAssetDataUrlOutput = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#data-url-output') as HTMLElement;

export const getAssetGHPagesFileInput = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input') as HTMLInputElement;

export const getAssetGHPagesFileInputLabel = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input-label') as HTMLElement;

export const getAssetGHPagesFileInputButton = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input-button') as HTMLElement;

export const getAssetGHPagesOutput = /* @__PURE__ */ (listContainer: HTMLElement) =>
  listContainer.querySelector('#gh-pages-output') as HTMLElement;

export const getSyncStatus = /* @__PURE__ */ (syncContainer: HTMLElement | undefined) =>
  (syncContainer || document).querySelector<HTMLElement>('#sync-status');

export const getStartSyncBtns = /* @__PURE__ */ (syncContainer: HTMLElement | undefined) =>
  (syncContainer || document).querySelectorAll<HTMLButtonElement>('.start-sync-btn');

export const getBackupForm = /* @__PURE__ */ (backupContainer: HTMLElement) =>
  backupContainer.querySelector('#backup-form') as HTMLFormElement;

export const getBackupBtn = /* @__PURE__ */ (backupContainer: HTMLElement) =>
  backupContainer.querySelector('#backup-btn') as HTMLButtonElement;

export const getBackupCheckedInputs = /* @__PURE__ */ (backupContainer: HTMLElement) =>
  backupContainer.querySelectorAll<HTMLInputElement>('#backup input[type="checkbox"]:checked');

export const getAddSnippetButton = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-add-snippet-button') as HTMLElement;

export const getSnippetsDeleteAllButton = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-delete-all-button') as HTMLElement;

export const getSnippetLanguageSelect = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#language-select') as HTMLSelectElement;

export const getAddSnippetEditor = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-editor') as HTMLElement;

export const getSnippetTitleInput = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-title-input') as HTMLInputElement;

export const getSnippetDescriptionArea = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-description-textarea') as HTMLTextAreaElement;

export const getSaveSnippetBtn = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-save-btn') as HTMLButtonElement;

export const getSnippetsBtn = /* @__PURE__ */ (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-button') as HTMLButtonElement;

export const getBroadcastStatusLabel = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-status') as HTMLElement;

export const getBroadcastForm = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-form') as HTMLFormElement;

export const getBroadcastServerUrlInput = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-server-url') as HTMLInputElement;

export const getBroadcastSourceCheckbox = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-source') as HTMLInputElement;

export const getBroadcastBtn = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-btn') as HTMLButtonElement;

export const getBroadcastChannelUrlSection = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-channel-url-section') as HTMLElement;

export const getBroadcastChannelUrl = /* @__PURE__ */ (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-channel-url') as HTMLAnchorElement;

export const getBroadcastStatusBtn = /* @__PURE__ */ () =>
  document.querySelector('#broadcast-status-btn') as HTMLElement | null;

export const getQrCodeContainer = /* @__PURE__ */ () =>
  document.querySelector('#qrcode-container') as HTMLElement;

export const getEditorSettingsFormatLink = /* @__PURE__ */ (editorSettingsContainer: HTMLElement) =>
  editorSettingsContainer.querySelector('#editor-settings-format-link') as HTMLAnchorElement;

export const getWelcomeLinkNew = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-new') as HTMLAnchorElement;

export const getWelcomeLinkOpen = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-open') as HTMLAnchorElement;

export const getWelcomeLinkImport = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-import') as HTMLAnchorElement;

export const getWelcomeLinkDefaultTemplateLi = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('.default-template-li') as HTMLAnchorElement;

export const getWelcomeLinkNoDefaultTemplate = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#no-default-template') as HTMLAnchorElement;

export const getWelcomeLinkLoadDefault = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-load-default') as HTMLAnchorElement;

export const getWelcomeLinkRecentOpen = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-recent-open') as HTMLAnchorElement;

export const getWelcomeLinkTemplates = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-templates') as HTMLAnchorElement;

export const getModalShowWelcomeCheckbox = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-show-checkbox') as HTMLInputElement;

export const getModalWelcomeRecover = /* @__PURE__ */ (
  welcomeContainer = /* @__PURE__ */ document,
) => welcomeContainer.querySelector('#modal #welcome-recover') as HTMLElement;

export const getModalWelcomeScreen = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-screen-container') as HTMLElement;

export const getModalWelcomeRecent = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-recent') as HTMLElement;

export const getModalWelcomeRecentList = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-recent-list') as HTMLElement;

export const getModalWelcomeTemplateList = /* @__PURE__ */ (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-template-list') as HTMLElement;

export const getNinjaKeys = /* @__PURE__ */ () => document.querySelector('ninja-keys') as any;

export const getResultModeDrawer = /* @__PURE__ */ () =>
  document.querySelector('#result-mode-drawer') as HTMLElement;
