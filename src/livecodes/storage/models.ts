import type {
  AppData,
  Asset,
  ContentConfig,
  Language,
  Snippet,
  Subscribable,
  UserConfig,
  UserData,
} from '../models';
import type { StoredSyncData } from '../sync';

export interface Storage<T> extends Subscribable<T[]> {
  getList: () => Promise<string[]>;
  getAllData: () => Promise<T[]>;
  getItem: (id: string) => Promise<T | null>;
  addItem: (item: T) => Promise<string>;
  updateItem: (id: string, item: T) => Promise<string>;
  deleteItem: (id: string) => Promise<void>;
  bulkInsert: (data: T[]) => Promise<void>;
  restore: (data: T[]) => Promise<void>;
  clear: () => Promise<void>;
}

export interface ProjectStorage
  extends Omit<Storage<StorageItem>, 'getList' | 'addItem' | 'updateItem' | 'bulkInsert'> {
  getList: () => Promise<SavedProject[]>;
  addItem: (config: ContentConfig) => Promise<string>;
  updateItem: (id: string, config: ContentConfig) => Promise<string>;
  deleteItem: (id: string) => Promise<void>;
  bulkInsert: (newProjects: ContentConfig[]) => Promise<void>;
}

export interface StorageItem {
  id: string;
  config: ContentConfig;
  lastModified: number;
}
export interface RecoverItem {
  config: ContentConfig;
  lastModified: number;
}
export interface SavedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  languages: Language[];
  lastModified: number;
}
export interface SimpleStorage<T> extends Subscribable<T | null> {
  getValue: () => T | null;
  setValue: (value: T | null) => void;
  clear: () => void;
}

export interface Stores {
  projects: ProjectStorage | undefined;
  templates: ProjectStorage | undefined;
  assets: Storage<Asset> | undefined;
  snippets: Storage<Snippet> | undefined;
  recover: SimpleStorage<RecoverItem> | undefined;
  userConfig: SimpleStorage<UserConfig> | undefined;
  userData: Storage<Partial<UserData>> | undefined;
  appData: SimpleStorage<AppData> | undefined;
  sync: Storage<StoredSyncData> | undefined;
}

export type StorageData = { [key in keyof Stores]: any | undefined };

export type StoreName =
  | '__livecodes_data__'
  | '__livecodes_templates__'
  | '__livecodes_assets__'
  | '__livecodes_snippets__'
  | '__livecodes_project_recover__'
  | '__livecodes_user_config__'
  | '__livecodes_user_data__'
  | '__livecodes_app_data__'
  | '__livecodes_sync_data__'
  | '__livecodes_key__';
