import { fakeSimpleStorage } from './fake-storage';
import { SimpleStorage } from './models';

/**
 * Creates a simple synchronous key/value data store using localstorage
 */
export const createSimpleStorage = <T>(name: string, isEmbed: boolean): SimpleStorage<T> => {
  // do not allow access to storage in embeds
  if (isEmbed) return fakeSimpleStorage;

  const setValue = (value: T | null) => {
    window.localStorage.setItem(name, JSON.stringify(value));
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
  const clear = () => setValue(null);

  return {
    getValue,
    setValue,
    clear,
  };
};
