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

export const getExportCodepenLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-codepen');

export const getExportJsfiddleLink = () =>
  document.querySelector<HTMLAnchorElement>('#export-menu #export-jsfiddle');

export const getNewLink = () => document.querySelector<HTMLAnchorElement>('#new-link');

export const getOpenLink = () => document.querySelector<HTMLAnchorElement>('#open-link');

export const getSaveLink = () => document.querySelector<HTMLAnchorElement>('#save-link');

export const getForkLink = () => document.querySelector<HTMLAnchorElement>('#fork-link');

export const getSaveAsTemplateLink = () =>
  document.querySelector<HTMLAnchorElement>('#template-link');

export const getExternalResourcesLink = () =>
  document.querySelector<HTMLAnchorElement>('#external-resources-link');

export const getShareLink = () => document.querySelector<HTMLAnchorElement>('#share-link');

export const getImportLink = () => document.querySelector<HTMLAnchorElement>('#import-link');

export const getExternalResourcesTextareas = () =>
  document.querySelectorAll<HTMLTextAreaElement>('#resources-container textarea');

export const getLoadResourcesButton = () =>
  document.querySelector<HTMLElement>('#resources-container #resources-load-btn');
