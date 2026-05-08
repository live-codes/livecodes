import { createPub } from '../events';
import { fakeSimpleStorage } from './fake-storage';
import type { SimpleStorage, StoreName } from './models';

/**
 * Creates a simple synchronous key/value data store using localstorage
 */
export const createSimpleStorage = <T>(name: StoreName, isEmbed: boolean): SimpleStorage<T> => {
  // do not allow access to storage in embeds
  if (isEmbed) return fakeSimpleStorage;

  const pub = createPub<T | null>();

  const subscribe = (fn: (data: T | null) => void) => pub.subscribe(fn);

  const unsubscribeAll = () => {
    pub.unsubscribeAll();
  };

  const notifyPub = () => {
    pub.notify(getValue());
  };

  const setValue = (value: T | null) => {
    try {
      window.localStorage.setItem(name, JSON.stringify(value));
      notifyPub();
    } catch {
      // exceeded quota
    }
  };

  const getValue = (): T | null => {
    const value = window.localStorage.getItem(name);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const clear = () => {
    setValue(null);
    notifyPub();
  };

  return {
    getValue,
    setValue,
    clear,
    subscribe,
    unsubscribeAll,
  };
};
