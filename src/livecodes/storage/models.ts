import { ContentConfig, Language } from '../models';

export interface ProjectStorage {
  getList: () => Promise<SavedProject[]>;
  getAllData: <T = StorageItem>() => Promise<T[]>;
  getItem: <T = StorageItem>(itemId: string) => Promise<T | null>;
  addItem: (config: ContentConfig) => Promise<string>;
  updateItem: (id: string, config: ContentConfig) => Promise<string>;
  deleteItem: (id: string) => Promise<void>;
  bulkInsert: (newProjects: ContentConfig[]) => Promise<void>;
  addGenericItem: (value: any) => Promise<string>;
  updateGenericItem: (id: string, value: any) => Promise<string>;
  clear: () => Promise<void>;
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
