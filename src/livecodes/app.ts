import { cacheIsValid, getCache, getCachedCode } from './cache';
import { getCompiler } from './compiler';
import { buildConfig, getConfig, getContentConfig, setConfig } from './config';
import {
  checkRestoreStatus,
  configureEmmet,
  createEditors,
  createIframe,
  eventsManager,
  format,
  getActiveEditor,
  getEditorLanguages,
  getResultPage,
  getVarCompiler,
  getVarEditors,
  getVarFormatter,
  getVarToolspane,
  handleChangeContent,
  handlechangeLanguage,
  handleCustomSettings,
  handleDeploy,
  handleExport,
  handleExternalResources,
  handleFork,
  handleHotKeys,
  handleIframeResize,
  handleImport,
  handleLogin,
  handleLogout,
  handleNew,
  handleOpen,
  handleProcessors,
  handleProjectInfo,
  handleResize,
  handleResultButton,
  handleResultLoading,
  handleRunButton,
  handleSave,
  handleSaveAsTemplate,
  handleSelectEditor,
  handleSettings,
  handleSettingsMenu,
  handleShare,
  handleTitleEdit,
  handleUnload,
  importExternalContent,
  initializeAuth,
  loadConfig,
  loadModuleTypes,
  loadSelectedScreen,
  loadSettings,
  loadStarterTemplate,
  loadUserConfig,
  phpHelper,
  run,
  setActiveEditor,
  setLoading,
  setTheme,
  setVarBaseUrl,
  setVarBootstrap,
  setVarCompiler,
  setVarEditors,
  setVarFormatter,
  setVarToolspane,
  share,
  showLanguageInfo,
  showMode,
  showVersion,
  updateCompiledCode,
  updateConfig,
  updateEditors,
} from './core';
import { configureEmbed } from './embed';
import { getFormatter } from './formatter';
import { createLanguageMenus } from './languages';
import { API, Code, Config } from './models';
import { createToolsPane } from './toolspane';
import * as UI from './UI';

export const app = async (appConfig: Readonly<Config>, baseUrl: string): Promise<API> => {
  async function bootstrap(reload = false) {
    setVarCompiler(await getCompiler(getConfig(), baseUrl));
    setVarFormatter(getFormatter(getConfig(), baseUrl));

    configureEmbed(eventsManager, share);
    await createIframe(UI.getResultElement());

    if (!reload) {
      loadUserConfig();
      createLanguageMenus(
        getConfig(),
        baseUrl,
        eventsManager,
        showLanguageInfo,
        loadStarterTemplate,
      );
      setVarEditors(await createEditors(getConfig()));
      setVarToolspane(createToolsPane(getConfig(), baseUrl, getVarEditors(), eventsManager));

      handleTitleEdit();
      handleResize();
      handleIframeResize();
      handleSelectEditor();
      handlechangeLanguage();
      handleChangeContent();
      handleHotKeys();
      handleRunButton();
      handleResultButton();
      handleProcessors();
      handleSettings();
      handleSettingsMenu();
      handleProjectInfo();
      handleExternalResources();
      handleCustomSettings();
      handleLogin();
      handleLogout();
      handleNew();
      handleSave();
      handleFork();
      handleSaveAsTemplate();
      handleOpen();
      handleImport();
      handleExport();
      handleShare();
      handleDeploy();
      handleResultLoading();
      handleUnload();

      setTheme(getConfig().theme);
    } else {
      await updateEditors(getVarEditors(), getConfig());
    }
    phpHelper({ editor: getVarEditors().script });
    setLoading(true);
    await setActiveEditor(getConfig());
    loadSettings(getConfig());
    configureEmmet(getConfig());
    showMode(getConfig());
    setTimeout(() => getActiveEditor().focus());
    await getVarToolspane()?.load();
    updateCompiledCode();
    loadModuleTypes(getVarEditors(), getConfig());

    getVarCompiler()
      .load(
        [getConfig().markup.language, getConfig().style.language, getConfig().script.language],
        getConfig(),
      )
      .then(async () => {
        await run();
      });
    getVarFormatter().load(getEditorLanguages());
    initializeAuth();
    if (!reload) {
      loadSelectedScreen();
      showVersion();
      checkRestoreStatus();
    }
  }

  setVarBaseUrl(baseUrl);
  setVarBootstrap(bootstrap);
  setConfig(await buildConfig(appConfig, baseUrl));
  await bootstrap();
  importExternalContent();

  return {
    run: async () => {
      await run();
    },
    format: async () => format(),
    getShareUrl: async (shortUrl = false) => (await share(shortUrl)).url,
    getConfig: (contentOnly = false): Config => {
      updateConfig();
      const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
      return JSON.parse(JSON.stringify(config));
    },
    setConfig: async (newConfig: Config): Promise<Config> => {
      const newAppConfig = await buildConfig(newConfig, baseUrl);
      await loadConfig(newAppConfig);
      return newAppConfig;
    },
    getCode: async (): Promise<Code> => {
      updateConfig();
      if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
        await getResultPage({});
      }
      return JSON.parse(JSON.stringify(getCachedCode()));
    },
  };
};
