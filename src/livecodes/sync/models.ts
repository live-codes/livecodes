import type { WorkerMessageEvent } from '../models';

export type SyncMethod =
  | 'sync'
  | 'exportToLocalSync'
  | 'exportStoreAsBase64Update'
  | 'restoreFromUpdate'
  | 'restoreFromLocalSync';

export type SyncMessageEvent = WorkerMessageEvent<SyncMethod>;

export interface StoredSyncData {
  lastModified: number;
  data: Uint8Array;
  lastSyncSha: string;
}
