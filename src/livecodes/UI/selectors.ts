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
export const getEditorToolbar = () => document.querySelector('#editor-tools') as HTMLElement;
export const getCopyButton = () => document.querySelector('#editor-tools #copy-btn') as HTMLElement;
export const getUndoButton = () => document.querySelector('#editor-tools #undo-btn') as HTMLElement;
export const getRedoButton = () => document.querySelector('#editor-tools #redo-btn') as HTMLElement;
export const getFormatButton = () =>
  document.querySelector('#editor-tools #format-btn') as HTMLElement;
export const getEditorModeNode = () => document.querySelector<HTMLElement>('#editor-mode');
export const getEditorStatus = () =>
  document.querySelector('#editor-tools #editor-status') as HTMLElement;
export const getExternalResourcesBtn = () =>
  document.querySelector('#editor-tools #external-resources-btn') as HTMLElement;
export const getExternalResourcesMark = () =>
  document.querySelector('#editor-tools #external-resources-mark') as HTMLElement;
export const getResultButton = () => document.querySelector('#result-button') as HTMLElement;
export const getFullscreenButton = () =>
  document.querySelector('#fullscreen-button') as HTMLElement;
export const getEditorTitles = () =>
  document.querySelectorAll<HTMLElement>('.editor-title:not(.hidden)');
export const getEditorDivs = () => document.querySelectorAll<HTMLElement>('#editors > .editor');
export const getToolspaneElement = () =>
  document.querySelector('#output #tools-pane') as HTMLElement;
export const getToolspaneBar = () =>
  document.querySelector('#output #tools-pane-bar') as HTMLElement;
export const getToolspaneButtons = () =>
  document.querySelector('#tools-pane-buttons') as HTMLElement;
export const getToolspaneTitles = () => document.querySelector<HTMLElement>('#tools-pane-titles');
export const getToolspaneLoader = () => document.querySelector<HTMLElement>('#tools-pane-loading');
export const getZoomButtonValue = () =>
  document.querySelector<HTMLElement>('#zoom-button #zoom-value');
export const getModalSaveButton = () =>
  document.querySelector('#modal #prompt-save-btn') as HTMLElement;
export const getModalDoNotSaveButton = () =>
  document.querySelector('#modal #prompt-donot-save-btn') as HTMLElement;
export const getModalCancelButton = () =>
  document.querySelector('#modal #prompt-cancel-btn') as HTMLElement;

export const getModalRecoverButton = () =>
  document.querySelector('#modal #prompt-recover-btn') as HTMLElement;
export const getModalSavePreviousButton = () =>
  document.querySelector('#modal #prompt-save-previous-btn') as HTMLElement;
export const getModalCancelRecoverButton = () =>
  document.querySelector('#modal #prompt-cancel-recover-btn') as HTMLElement;
export const getModalUnsavedName = () =>
  document.querySelector('#modal #unsaved-project-name') as HTMLElement;
export const getModalUnsavedLastModified = () =>
  document.querySelector('#modal #unsaved-project-last-modified') as HTMLElement;
export const getModalDisableRecoverCheckbox = () =>
  document.querySelector('#modal #disable-recover-checkbox') as HTMLInputElement;

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

export const getEmbedLink = () => document.querySelector<HTMLAnchorElement>('#embed-link');

export const getEditorSettingsLink = () =>
  document.querySelector<HTMLAnchorElement>('#editor-settings-link');

export const getDeployLink = () => document.querySelector<HTMLAnchorElement>('#deploy-link');

export const getSyncLink = () => document.querySelector<HTMLAnchorElement>('#sync-link');

export const getImportLink = () => document.querySelector<HTMLAnchorElement>('#import-link');

export const getBackupLink = () => document.querySelector<HTMLAnchorElement>('#backup-link');

export const getBroadcastLink = () => document.querySelector<HTMLAnchorElement>('#broadcast-link');

export const getWelcomeLink = () => document.querySelector<HTMLAnchorElement>('#welcome-link');

export const getAutoupdateToggle = () =>
  document.querySelector('#settings-menu input#autoupdate') as HTMLInputElement;

export const getDelayValue = () =>
  document.querySelector('#settings-menu #delay-value') as HTMLElement;

export const getDelayRange = () =>
  document.querySelector('#settings-menu input#delay-range') as HTMLInputElement;

export const getAutosaveToggle = () =>
  document.querySelector('#settings-menu input#autosave') as HTMLInputElement;

export const getAutosyncToggle = () =>
  document.querySelector('#settings-menu input#autosync') as HTMLInputElement;

export const getFormatOnsaveToggle = () =>
  document.querySelector('#settings-menu input#formatOnsave') as HTMLInputElement;

export const getProcessorToggles = () =>
  document.querySelectorAll<HTMLInputElement>('#style-selector input');

export const getEmmetToggle = () =>
  document.querySelector('#settings-menu input#emmet') as HTMLInputElement;

export const getThemeToggle = () =>
  document.querySelector('#settings-menu input#theme') as HTMLInputElement;

export const getShowWelcomeToggle = () =>
  document.querySelector('#settings-menu input#welcome') as HTMLInputElement;

export const getRecoverToggle = () =>
  document.querySelector('#settings-menu input#recover-unsaved') as HTMLInputElement;

export const getSpacingToggle = () =>
  document.querySelector('#settings-menu input#show-spacing') as HTMLInputElement;

export const getCSSPresetLinks = () =>
  document.querySelectorAll<HTMLAnchorElement>('#css-preset-menu a');

export const getProjectInfoLink = () =>
  document.querySelector('#settings-menu #info-link') as HTMLInputElement;

export const getAssetsLink = () =>
  document.querySelector('#settings-menu #assets-link') as HTMLInputElement;

export const getSnippetsLink = () =>
  document.querySelector('#settings-menu #snippets-link') as HTMLInputElement;

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

export const getExternalResourcesCssPresetInputs = () =>
  document.querySelectorAll<HTMLInputElement>('#resources-container input[type="radio"]');

export const getLoadResourcesButton = () =>
  document.querySelector<HTMLElement>('#resources-container #resources-load-btn');

export const getCustomSettingsEditor = () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-editor');

export const getLoadCustomSettingsButton = () =>
  document.querySelector<HTMLElement>('#custom-settings-container #custom-settings-load-btn');

export const getTestEditor = () =>
  document.querySelector<HTMLElement>('#test-editor-container #test-editor');

export const getLoadTestsButton = () =>
  document.querySelector<HTMLElement>('#test-editor-container #test-load-btn');

export const getEditTestsButton = () =>
  document.querySelector<HTMLElement>('#test-container #edit-tests-btn');

export const getRunTestsButton = () =>
  document.querySelector<HTMLElement>('#test-container #run-tests-btn');

export const getWatchTestsButton = () =>
  document.querySelector<HTMLElement>('#test-container #watch-tests-btn');

export const getUrlImportForm = (importContainer: HTMLElement) =>
  importContainer.querySelector<HTMLFormElement>('#url-import-form');
export const getUrlImportButton = (importContainer: HTMLElement) =>
  importContainer.querySelector('#url-import-btn') as HTMLButtonElement;
export const getUrlImportInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#code-url') as HTMLInputElement;
export const getCodeImportInput = (importContainer: HTMLElement) =>
  importContainer.querySelector('#local-code-input') as HTMLInputElement;

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
export const getNewRepoAutoSync = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#new-repo-autosync') as HTMLInputElement;

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
export const getExistingRepoAutoSync = (deployContainer: HTMLElement) =>
  deployContainer.querySelector('#existing-repo-autosync') as HTMLInputElement;

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

export const getAddAssetButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-add-asset-button') as HTMLElement;

export const getAssetsDeleteAllButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-delete-all-button') as HTMLElement;

export const getAssetsButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#assets-button') as HTMLElement;

export const getAssetDataUrlFileInput = (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-data-url-file-input') as HTMLInputElement;

export const getAssetDataUrlOutput = (listContainer: HTMLElement) =>
  listContainer.querySelector('#data-url-output') as HTMLElement;

export const getAssetGHPagesFileInput = (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input') as HTMLInputElement;

export const getAssetGHPagesFileInputLabel = (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input-label') as HTMLElement;

export const getAssetGHPagesFileInputButton = (listContainer: HTMLElement) =>
  listContainer.querySelector('#asset-gh-pages-file-input-button') as HTMLElement;

export const getAssetGHPagesOutput = (listContainer: HTMLElement) =>
  listContainer.querySelector('#gh-pages-output') as HTMLElement;

export const getSyncStatus = (syncContainer: HTMLElement | undefined) =>
  (syncContainer || document).querySelector<HTMLElement>('#sync-status');

export const getStartSyncBtns = (syncContainer: HTMLElement | undefined) =>
  (syncContainer || document).querySelectorAll<HTMLButtonElement>('.start-sync-btn');

export const getBackupForm = (backupContainer: HTMLElement) =>
  backupContainer.querySelector('#backup-form') as HTMLFormElement;

export const getBackupBtn = (backupContainer: HTMLElement) =>
  backupContainer.querySelector('#backup-btn') as HTMLButtonElement;

export const getBackupCheckedInputs = (backupContainer: HTMLElement) =>
  backupContainer.querySelectorAll<HTMLInputElement>('#backup input[type="checkbox"]:checked');

export const getAddSnippetButton = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-add-snippet-button') as HTMLElement;

export const getSnippetsDeleteAllButton = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-delete-all-button') as HTMLElement;

export const getSnippetLanguageSelect = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#language-select') as HTMLSelectElement;

export const getAddSnippetEditor = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-editor') as HTMLElement;

export const getSnippetTitleInput = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-title-input') as HTMLInputElement;

export const getSnippetDescriptionArea = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-description-textarea') as HTMLTextAreaElement;

export const getSaveSnippetBtn = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#add-snippet-save-btn') as HTMLButtonElement;

export const getSnippetsBtn = (snippetsContainer: HTMLElement) =>
  snippetsContainer.querySelector('#snippets-button') as HTMLButtonElement;

export const getBroadcastStatusLabel = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-status') as HTMLElement;

export const getBroadcastForm = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-form') as HTMLFormElement;

export const getBroadcastServerUrlInput = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-server-url') as HTMLInputElement;

export const getBroadcastSourceCheckbox = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-source') as HTMLInputElement;

export const getBroadcastBtn = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-btn') as HTMLButtonElement;

export const getBroadcastChannelUrlSection = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-channel-url-section') as HTMLElement;

export const getBroadcastChannelUrl = (broadcastContainer: HTMLElement) =>
  broadcastContainer.querySelector('#broadcast-channel-url') as HTMLAnchorElement;

export const getBroadcastStatusBtn = () =>
  document.querySelector('#broadcast-status-btn') as HTMLElement | null;

export const getQrCodeContainer = () => document.querySelector('#qrcode-container') as HTMLElement;

export const getEditorSettingsFormatLink = (editorSettingsContainer: HTMLElement) =>
  editorSettingsContainer.querySelector('#editor-settings-format-link') as HTMLAnchorElement;

export const getWelcomeLinkNew = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-new') as HTMLAnchorElement;

export const getWelcomeLinkOpen = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-open') as HTMLAnchorElement;

export const getWelcomeLinkImport = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-import') as HTMLAnchorElement;

export const getWelcomeLinkDefaultTemplateLi = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('.default-template-li') as HTMLAnchorElement;

export const getWelcomeLinkNoDefaultTemplate = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#no-default-template') as HTMLAnchorElement;

export const getWelcomeLinkLoadDefault = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-load-default') as HTMLAnchorElement;

export const getWelcomeLinkRecentOpen = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#welcome-link-recent-open') as HTMLAnchorElement;

export const getModalShowWelcomeCheckbox = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #show-welcome-checkbox') as HTMLInputElement;

export const getModalWelcomeRecover = (welcomeContainer = document) =>
  welcomeContainer.querySelector('#modal #welcome-recover') as HTMLElement;

export const getModalWelcomeRecent = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-recent') as HTMLElement;

export const getModalWelcomeRecentList = (welcomeContainer: HTMLElement) =>
  welcomeContainer.querySelector('#modal #welcome-recent-list') as HTMLElement;
