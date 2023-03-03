import { createPub } from '../events';
import type { SimpleStorage, StoreName } from './models';
import { fakeSimpleStorage } from './fake-storage';

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
    window.localStorage.setItem(name, JSON.stringify(value));
    notifyPub();
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
