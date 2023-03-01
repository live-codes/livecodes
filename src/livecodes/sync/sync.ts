/* eslint-disable import/no-internal-modules */
import { getRandomString } from '../utils/utils';
import type { SyncMessageEvent } from './models';
import type {
  workerSync,
  workerExportToLocalSync,
  workerExportStoreAsBase64Update,
  workerRestoreFromUpdate,
  workerRestoreFromLocalSync,
} from './sync.worker';

let worker: Worker;

export const init = (baseUrl: string) => {
  worker = worker || new Worker(baseUrl + '{{hash:sync.worker.js}}');
};

const callWorker = async (message: { method: SyncMessageEvent['data']['method']; args: any }) =>
  new Promise((resolve) => {
    const messageId = getRandomString();

    const handler = (event: SyncMessageEvent) => {
      const received = event.data;

      if (received.method === message.method && received.messageId === messageId) {
        worker.removeEventListener('message', handler);
        resolve(received.data);
      }
    };
    worker.addEventListener('message', handler);

    worker.postMessage({
      ...message,
      messageId,
    });
  });

export const sync: workerSync = async (...args) =>
  callWorker({
    method: 'sync',
    args,
  }) as any;

export const exportToLocalSync: workerExportToLocalSync = async (...args) =>
  callWorker({
    method: 'sync',
    args,
  }) as any;

export const exportStoreAsBase64Update: workerExportStoreAsBase64Update = async (...args) =>
  callWorker({
    method: 'sync',
    args,
  }) as any;

export const restoreFromUpdate: workerRestoreFromUpdate = async (...args) =>
  callWorker({
    method: 'sync',
    args,
  }) as any;

export const restoreFromLocalSync: workerRestoreFromLocalSync = async (...args) =>
  callWorker({
    method: 'sync',
    args,
  }) as any;
