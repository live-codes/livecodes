// eslint-disable-next-line import/no-internal-modules
import { cloneObject } from '../utils/utils';
import { createProjectStorage } from './project-storage';
import { createSimpleStorage } from './simple-storage';
import { createStorage } from './storage';
import type { Storage, ProjectStorage, SimpleStorage, Stores } from './models';

export const createStores = (): Stores =>
  cloneObject({
    projects: null,
    templates: null,
    assets: null,
    snippets: null,
    recover: null,
    userConfig: null,
    userData: null,
    appData: null,
    sync: null,
  });

export const initializeStores = async (stores: Stores, isEmbed: boolean) => {
  if (isEmbed) return;
  stores.projects = await createProjectStorage('__livecodes_data__', isEmbed);
  stores.templates = await createProjectStorage('__livecodes_templates__', isEmbed);
  stores.assets = await createStorage('__livecodes_assets__', isEmbed);
  stores.snippets = await createStorage('__livecodes_snippets__', isEmbed);
  stores.recover = createSimpleStorage('__livecodes_project_recover__', isEmbed);
  stores.userConfig = createSimpleStorage('__livecodes_user_config__', isEmbed);
  stores.userData = await createStorage('__livecodes_user_data__', isEmbed);
  stores.appData = createSimpleStorage('__livecodes_app_data__', isEmbed);
  stores.sync = await createStorage('__livecodes_sync_data__', isEmbed);
};

export const initializeSimpleStores = async (stores: Stores, isEmbed: boolean) => {
  if (isEmbed) return;
  stores.recover = createSimpleStorage('__livecodes_project_recover__', isEmbed);
  stores.userConfig = createSimpleStorage('__livecodes_user_config__', isEmbed);
  stores.appData = createSimpleStorage('__livecodes_app_data__', isEmbed);
};

export const getStoreKey = (
  store: SimpleStorage<any> | Storage<any> | ProjectStorage,
  stores: Stores,
) => {
  for (const key of Object.keys(stores)) {
    if (stores[key as keyof Stores] === store) {
      return key;
    }
  }
  return null;
};
