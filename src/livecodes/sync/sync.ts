/* eslint-disable import/no-internal-modules */
import { createStores, initializeSimpleStores, type Stores } from '../storage';
import { getAppCDN } from '../services/modules';
import { callWorker } from '../utils/utils';
import type { WorkerMessageEvent } from '../models';
import type { SyncMessageEvent } from './models';
import type {
  workerSync,
  workerExportToLocalSync,
  workerExportStoreAsBase64Update,
  workerRestoreFromUpdate,
  workerRestoreFromLocalSync,
} from './sync.worker';

type SyncMethod = SyncMessageEvent['data']['method'];

let worker: Worker;

export const init = (baseUrl: string) => {
  worker = worker || new Worker(baseUrl + '{{hash:sync.worker.js}}' + '?appCDN=' + getAppCDN());
  let stores: Stores;

  worker.addEventListener('message', async (event: WorkerMessageEvent<'getValue' | 'setValue'>) => {
    const message = event.data;
    const method = message.method;
    const args = (message.args as { storeKey: keyof Stores; value?: any }) || {};
    if (method !== 'getValue' && method !== 'setValue') return;

    if (!stores) {
      stores = createStores();
      await initializeSimpleStores(stores, false);
    }

    let data;
    const { storeKey, value } = args;
    const storage = stores[storeKey];
    if (!storage || !storeKey) return;

    if (method === 'getValue' && 'getValue' in storage) {
      data = storage.getValue();
    }

    if (method === 'setValue' && 'setValue' in storage && value != null) {
      storage.setValue(value);
    }

    worker.postMessage({ ...message, data });
  });
};

export const sync: workerSync = async (...args) =>
  callWorker<SyncMethod, Awaited<ReturnType<workerSync>>>(worker, {
    method: 'sync',
    args,
  });

export const exportToLocalSync: workerExportToLocalSync = async (...args) =>
  callWorker<SyncMethod, Awaited<ReturnType<workerExportToLocalSync>>>(worker, {
    method: 'exportToLocalSync',
    args,
  });

export const exportStoreAsBase64Update: workerExportStoreAsBase64Update = async (...args) =>
  callWorker<SyncMethod, Awaited<ReturnType<workerExportStoreAsBase64Update>>>(worker, {
    method: 'exportStoreAsBase64Update',
    args,
  });

export const restoreFromUpdate: workerRestoreFromUpdate = async (...args) =>
  callWorker<SyncMethod, Awaited<ReturnType<workerRestoreFromUpdate>>>(worker, {
    method: 'restoreFromUpdate',
    args,
  });

export const restoreFromLocalSync: workerRestoreFromLocalSync = async (...args) =>
  callWorker<SyncMethod, Awaited<ReturnType<workerRestoreFromLocalSync>>>(worker, {
    method: 'restoreFromLocalSync',
    args,
  });
