import { ContentConfig, Language } from '../models';

export interface Storage<T> {
  getList: () => Promise<string[]>;
  getAllData: () => Promise<T[]>;
  getItem: (itemId: string) => Promise<T | null>;
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
export interface RestoreItem {
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
export interface SimpleStorage<T> {
  getValue: () => T | null;
  setValue: (value: T | null) => void;
  clear: () => void;
}

export type StorageKey = 'projects' | 'templates' | 'assets' | 'user-config';

export type Stores = {
  [key in StorageKey]: Storage<any> | ProjectStorage | SimpleStorage<any> | undefined;
};

export type StorageData = { [key in StorageKey]: any | undefined };
