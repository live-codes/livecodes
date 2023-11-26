/* eslint-disable import/no-unresolved */
// @ts-ignore
// eslint-disable-next-line import/no-internal-modules
import resultTemplateRaw from './sandbox/v8/index.html?raw';
// @ts-ignore
import appHTMLRaw from './app.html?raw';
// @ts-ignore
import settingsMenuHTMLRaw from './settings-menu.html?raw';
// @ts-ignore
import languageInfoRaw from './language-info.html?raw';
// @ts-ignore
import customSettingsScreenRaw from './custom-settings.html?raw';
// @ts-ignore
import testEditorScreenRaw from './test-editor.html?raw';
// @ts-ignore
import importScreenRaw from './import.html?raw';
// @ts-ignore
import deployScreenRaw from './deploy.html?raw';
// @ts-ignore
import syncScreenRaw from './sync.html?raw';
// @ts-ignore
import backupScreenRaw from './backup.html?raw';
// @ts-ignore
import broadcastScreenRaw from './broadcast.html?raw';
// @ts-ignore
import welcomeScreenRaw from './welcome.html?raw';
// @ts-ignore
import aboutScreenRaw from './about.html?raw';
// @ts-ignore
import infoScreenRaw from './project-info.html?raw';
// @ts-ignore
import resourcesScreenRaw from './external-resources.html?raw';
// @ts-ignore
import loginScreenRaw from './login.html?raw';
// @ts-ignore
import savePromptScreenRaw from './save-prompt.html?raw';
// @ts-ignore
import recoverPromptScreenRaw from './recover-prompt.html?raw';
// @ts-ignore
import templatesScreenRaw from './templates.html?raw';
// @ts-ignore
import openScreenRaw from './open.html?raw';
// @ts-ignore
import assetsScreenRaw from './assets.html?raw';
// @ts-ignore
import addAssetScreenRaw from './add-asset.html?raw';
// @ts-ignore
import snippetsScreenRaw from './snippets.html?raw';
// @ts-ignore
import addSnippetScreenRaw from './add-snippet.html?raw';
// @ts-ignore
import shareScreenRaw from './share.html?raw';
// @ts-ignore
import embedScreenRaw from './embed.html?raw';
// @ts-ignore
import editorSettingsScreenRaw from './editor-settings.html?raw';
// @ts-ignore
import resultPopupHTMLRaw from './result-popup.html?raw';

const replaceValues = (str: string) =>
  str
    .replace(/{{APP_VERSION}}/g, process.env.VERSION || '')
    .replace(/{{SDK_VERSION}}/g, process.env.SDK_VERSION || '')
    .replace(/{{COMMIT_SHA}}/g, process.env.GIT_COMMIT || '')
    .replace(/{{REPO_URL}}/g, process.env.REPO_URL || '')
    .replace(/{{DOCS_BASE_URL}}/g, process.env.DOCS_BASE_URL || '');

const resultTemplate = /* @__PURE__ */ replaceValues(resultTemplateRaw);
const appHTML = /* @__PURE__ */ replaceValues(appHTMLRaw);
const settingsMenuHTML = /* @__PURE__ */ replaceValues(settingsMenuHTMLRaw);
const languageInfo = /* @__PURE__ */ replaceValues(languageInfoRaw);
const customSettingsScreen = /* @__PURE__ */ replaceValues(customSettingsScreenRaw);
const testEditorScreen = /* @__PURE__ */ replaceValues(testEditorScreenRaw);
const importScreen = /* @__PURE__ */ replaceValues(importScreenRaw);
const deployScreen = /* @__PURE__ */ replaceValues(deployScreenRaw);
const syncScreen = /* @__PURE__ */ replaceValues(syncScreenRaw);
const backupScreen = /* @__PURE__ */ replaceValues(backupScreenRaw);
const broadcastScreen = /* @__PURE__ */ replaceValues(broadcastScreenRaw);
const welcomeScreen = /* @__PURE__ */ replaceValues(welcomeScreenRaw);
const aboutScreen = /* @__PURE__ */ replaceValues(aboutScreenRaw);
const infoScreen = /* @__PURE__ */ replaceValues(infoScreenRaw);
const resourcesScreen = /* @__PURE__ */ replaceValues(resourcesScreenRaw);
const loginScreen = /* @__PURE__ */ replaceValues(loginScreenRaw);
const savePromptScreen = /* @__PURE__ */ replaceValues(savePromptScreenRaw);
const recoverPromptScreen = /* @__PURE__ */ replaceValues(recoverPromptScreenRaw);
const templatesScreen = /* @__PURE__ */ replaceValues(templatesScreenRaw);
const openScreen = /* @__PURE__ */ replaceValues(openScreenRaw);
const assetsScreen = /* @__PURE__ */ replaceValues(assetsScreenRaw);
const addAssetScreen = /* @__PURE__ */ replaceValues(addAssetScreenRaw);
const snippetsScreen = /* @__PURE__ */ replaceValues(snippetsScreenRaw);
const addSnippetScreen = /* @__PURE__ */ replaceValues(addSnippetScreenRaw);
const shareScreen = /* @__PURE__ */ replaceValues(shareScreenRaw);
const embedScreen = /* @__PURE__ */ replaceValues(embedScreenRaw);
const editorSettingsScreen = /* @__PURE__ */ replaceValues(editorSettingsScreenRaw);
const resultPopupHTML = /* @__PURE__ */ replaceValues(resultPopupHTMLRaw);

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
