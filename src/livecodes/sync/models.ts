export interface SyncMessageEvent extends MessageEvent {
  data: {
    messageId: string;
    method:
      | 'sync'
      | 'exportToLocalSync'
      | 'exportStoreAsBase64Update'
      | 'restoreFromUpdate'
      | 'restoreFromLocalSync';
    args?: any;
    data?: unknown;
  };
}

export interface StoredSyncData {
  lastModified: number;
  data: Uint8Array;
  lastSyncSha: string;
}
