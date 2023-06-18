// @ts-ignore
// eslint-disable-next-line import/no-internal-modules
import resultTemplateRaw from './sandbox/v6/result.html';
// @ts-ignore
import appHTMLRaw from './app.html';
// @ts-ignore
import settingsMenuHTMLRaw from './settings-menu.html';
// @ts-ignore
import languageInfoRaw from './language-info.html';
// @ts-ignore
import customSettingsScreenRaw from './custom-settings.html';
// @ts-ignore
import testEditorScreenRaw from './test-editor.html';
// @ts-ignore
import importScreenRaw from './import.html';
// @ts-ignore
import deployScreenRaw from './deploy.html';
// @ts-ignore
import syncScreenRaw from './sync.html';
// @ts-ignore
import backupScreenRaw from './backup.html';
// @ts-ignore
import broadcastScreenRaw from './broadcast.html';
// @ts-ignore
import welcomeScreenRaw from './welcome.html';
// @ts-ignore
import aboutScreenRaw from './about.html';
// @ts-ignore
import infoScreenRaw from './project-info.html';
// @ts-ignore
import resourcesScreenRaw from './external-resources.html';
// @ts-ignore
import loginScreenRaw from './login.html';
// @ts-ignore
import savePromptScreenRaw from './save-prompt.html';
// @ts-ignore
import recoverPromptScreenRaw from './recover-prompt.html';
// @ts-ignore
import templatesScreenRaw from './templates.html';
// @ts-ignore
import openScreenRaw from './open.html';
// @ts-ignore
import assetsScreenRaw from './assets.html';
// @ts-ignore
import addAssetScreenRaw from './add-asset.html';
// @ts-ignore
import snippetsScreenRaw from './snippets.html';
// @ts-ignore
import addSnippetScreenRaw from './add-snippet.html';
// @ts-ignore
import shareScreenRaw from './share.html';
// @ts-ignore
import embedScreenRaw from './embed.html';
// @ts-ignore
import editorSettingsScreenRaw from './editor-settings.html';
// @ts-ignore
import resultPopupHTMLRaw from './result-popup.html';

const replaceValues = (str: string) =>
  str
    .replace(/{{APP_VERSION}}/g, process.env.VERSION || '')
    .replace(/{{SDK_VERSION}}/g, process.env.SDK_VERSION || '')
    .replace(/{{COMMIT_SHA}}/g, process.env.GIT_COMMIT || '')
    .replace(/{{REPO_URL}}/g, process.env.REPO_URL || '')
    .replace(/{{DOCS_BASE_URL}}/g, process.env.DOCS_BASE_URL || '');

const resultTemplate = replaceValues(resultTemplateRaw);
const appHTML = replaceValues(appHTMLRaw);
const settingsMenuHTML = replaceValues(settingsMenuHTMLRaw);
const languageInfo = replaceValues(languageInfoRaw);
const customSettingsScreen = replaceValues(customSettingsScreenRaw);
const testEditorScreen = replaceValues(testEditorScreenRaw);
const importScreen = replaceValues(importScreenRaw);
const deployScreen = replaceValues(deployScreenRaw);
const syncScreen = replaceValues(syncScreenRaw);
const backupScreen = replaceValues(backupScreenRaw);
const broadcastScreen = replaceValues(broadcastScreenRaw);
const welcomeScreen = replaceValues(welcomeScreenRaw);
const aboutScreen = replaceValues(aboutScreenRaw);
const infoScreen = replaceValues(infoScreenRaw);
const resourcesScreen = replaceValues(resourcesScreenRaw);
const loginScreen = replaceValues(loginScreenRaw);
const savePromptScreen = replaceValues(savePromptScreenRaw);
const recoverPromptScreen = replaceValues(recoverPromptScreenRaw);
const templatesScreen = replaceValues(templatesScreenRaw);
const openScreen = replaceValues(openScreenRaw);
const assetsScreen = replaceValues(assetsScreenRaw);
const addAssetScreen = replaceValues(addAssetScreenRaw);
const snippetsScreen = replaceValues(snippetsScreenRaw);
const addSnippetScreen = replaceValues(addSnippetScreenRaw);
const shareScreen = replaceValues(shareScreenRaw);
const embedScreen = replaceValues(embedScreenRaw);
const editorSettingsScreen = replaceValues(editorSettingsScreenRaw);
const resultPopupHTML = replaceValues(resultPopupHTMLRaw);

export {
  resultTemplate,
  appHTML,
  settingsMenuHTML,
  languageInfo,
  customSettingsScreen,
  testEditorScreen,
  importScreen,
  deployScreen,
  syncScreen,
  backupScreen,
  broadcastScreen,
  welcomeScreen,
  aboutScreen,
  infoScreen,
  resourcesScreen,
  loginScreen,
  savePromptScreen,
  recoverPromptScreen,
  templatesScreen,
  openScreen,
  assetsScreen,
  addAssetScreen,
  snippetsScreen,
  addSnippetScreen,
  shareScreen,
  embedScreen,
  editorSettingsScreen,
  resultPopupHTML,
};
