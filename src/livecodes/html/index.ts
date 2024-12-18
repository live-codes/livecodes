/* eslint-disable import/no-unresolved */

// eslint-disable-next-line import/no-internal-modules
import { predefinedValues } from '../utils/utils';

// @ts-ignore
// eslint-disable-next-line import/no-internal-modules
import resultTemplateRaw from './sandbox/v8/index.html?raw';
// @ts-ignore
import appHTMLRaw from './app.html?raw';
// @ts-ignore
import menuProjectHTMLRaw from './app-menu-project.html?raw';
// @ts-ignore
import menuSettingsHTMLRaw from './app-menu-settings.html?raw';
// @ts-ignore
import menuHelpHTMLRaw from './app-menu-help.html?raw';
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
import codeToImageScreenRaw from './code-to-image.html?raw';
// @ts-ignore
import resultPopupHTMLRaw from './result-popup.html?raw';

const replaceValues = (str: string) =>
  Object.entries(predefinedValues).reduce(
    (str, [key, value]) => str.replace(new RegExp(`{{${key}}}`, 'g'), value),
    str,
  );

const resultTemplate = /* @__PURE__ */ replaceValues(resultTemplateRaw);
const appHTML = /* @__PURE__ */ replaceValues(appHTMLRaw);
const menuProjectHTML = /* @__PURE__ */ replaceValues(menuProjectHTMLRaw);
const menuSettingsHTML = /* @__PURE__ */ replaceValues(menuSettingsHTMLRaw);
const menuHelpHTML = /* @__PURE__ */ replaceValues(menuHelpHTMLRaw);
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
const codeToImageScreen = /* @__PURE__ */ replaceValues(codeToImageScreenRaw);
const resultPopupHTML = /* @__PURE__ */ replaceValues(resultPopupHTMLRaw);

export {
  resultTemplate,
  appHTML,
  menuProjectHTML,
  menuSettingsHTML,
  menuHelpHTML,
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
  codeToImageScreen,
  resultPopupHTML,
};
