import { encode } from 'js-base64';
import type { Config, Language, Processor, WorkerMessageEvent } from '../models';

export const debounce = /* @__PURE__ */ (
  fn: (...x: any[]) => any,
  delay: number | (() => number),
) => {
  let timeout: any;

  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === 'function' ? delay() : delay);
  };
};

export const decodeHTML = /* @__PURE__ */ (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const encodeHTML = /* @__PURE__ */ (html: string) =>
  html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&#34;');

export const escapeScript = /* @__PURE__ */ (code: string) =>
  code.replace(/<\/script>/g, '<\\/script>');

export const escapeCode = /* @__PURE__ */ (code: string, slash = true) =>
  code
    .replace(/\\/g, slash ? '\\\\' : '\\')
    .replace(/`/g, '\\`')
    .replace(/<\/script>/g, '<\\/script>');

// eslint-disable-next-line @typescript-eslint/ban-types
export const pipe = /* @__PURE__ */ (...fns: Function[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any) =>
        g(f(...args)),
  );

// replace non-alphanumeric with underscore
export const safeName = /* @__PURE__ */ (name: string, symbol = '_') =>
  name.replace(/[\W]+/g, symbol);

// from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
export const isMobile = /* @__PURE__ */ () => {
  let mobile = false;
  const userAgent = navigator.userAgent.toLowerCase();
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    ) {
      mobile = true;
    }
  })(userAgent || navigator.vendor || (window as any).opera);

  return mobile;
};

export const isRelativeUrl = /* @__PURE__ */ (url?: string) =>
  !url?.startsWith('http') && !url?.startsWith('data:');

export const getAbsoluteUrl = (url: string, baseUrl = document.baseURI) =>
  isRelativeUrl(url) ? new URL(url, baseUrl).href : url;

export const cloneObject = /* @__PURE__ */ <T>(x: Record<string, any>): T =>
  (
    globalThis.structuredClone ||
    ((obj: Record<string, unknown>) =>
      JSON.parse(JSON.stringify(obj, (_k, v) => (v === undefined ? null : v))))
  )(x) as T;

export const objectMap = /* @__PURE__ */ (
  obj: Record<string, any>,
  fn: (value: any, key: string, index: number) => any,
) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const objectFilter = /* @__PURE__ */ (
  obj: Record<string, any>,
  predicate: (value: any, key: string, index: number) => any,
) => Object.fromEntries(Object.entries(obj).filter(([k, v], i) => predicate(v, k, i)));

export const copyToClipboard = /* @__PURE__ */ (text: string) => {
  if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
  return false;
};

export const stringToValidJson = /* @__PURE__ */ (str: string) =>
  str
    .replace(/'[^'"]*'(?=(?:[^"]*"[^"]*")*[^"]*$)/g, function replaceSingleQuotes(matchedStr) {
      return '"' + matchedStr.substring(1, matchedStr.length - 1) + '"';
    })
    .replace(
      /(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)(?!(\w*)(?:"))/gm,
      function quoteNonQuoted(matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1).trimEnd() + '":';
      },
    )
    .replace(/,\s*([\]}])/g, '$1'); // remove trailing comma

export const stringify = /* @__PURE__ */ (obj: any, pretty = false) => {
  try {
    return JSON.stringify(obj, undefined, pretty ? 2 : undefined);
  } catch {
    return '';
  }
};

export const getRandomString = /* @__PURE__ */ () =>
  String(Math.random()) + '-' + Date.now().toFixed();

export const downloadFile = (filename: string, extension: string, content: string) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = content;
  a.download = safeName(filename) + '.' + extension;
  a.click();
  a.remove();
};

export const loadScript = /* @__PURE__ */ (url: string, name?: string) =>
  new Promise((resolve, reject) => {
    if (name && (globalThis as any)[name]) {
      return resolve((globalThis as any)[name]);
    }

    // if running in web worker
    if (typeof (globalThis as any).importScripts === 'function') {
      (globalThis as any).importScripts(url);
      if (name && (globalThis as any)[name]) {
        return resolve((globalThis as any)[name]);
      }
      return resolve(globalThis);
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    const removeEventListeners = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
    const onLoad = () => {
      removeEventListeners();
      if (!name) {
        return resolve('loaded: ' + url);
      }
      const i = setInterval(() => {
        if ((window as any)[name]) {
          clearInterval(i);
          return resolve((window as any)[name]);
        }
      }, 5);
    };
    const onError = () => {
      removeEventListeners();
      reject('failed to load: ' + url);
    };
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    document.head.appendChild(script);
  });

export const loadStylesheet = (url: string, id?: string, insertBefore?: string) => {
  if (id && document.getElementById(id)) return;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = url;
  stylesheet.id = id || 'styles-' + getRandomString();
  document.head.insertBefore(
    stylesheet,
    insertBefore ? document.querySelector(insertBefore) : null,
  );
};

export const typedArrayToBuffer = /* @__PURE__ */ (array: Uint8Array): ArrayBuffer =>
  array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);

export const getDate = /* @__PURE__ */ () => {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
};

export const handleFetchError = /* @__PURE__ */ (res: Response) =>
  res.ok ? res : Promise.reject();
export const fetchWithHandler = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(handleFetchError);

export const blobToBase64 = /* @__PURE__ */ (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (typeof reader.result === 'string' ? resolve(reader.result) : reject());
    reader.onerror = (error) => reject(error);
  });

export const Uint8ArrayToBase64 = /* @__PURE__ */ (u8: Uint8Array) => {
  const CHUNK_SZ = 0x8000;
  const c = [];
  for (let i = 0; i < u8.length; i += CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, (u8 as any).subarray(i, i + CHUNK_SZ)));
  }
  return btoa(c.join(''));
};

export const base64ToUint8Array = /* @__PURE__ */ (str: string) =>
  new Uint8Array(
    atob(str)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );

export const typedArraysAreEqual = /* @__PURE__ */ (a: Uint8Array, b: Uint8Array) => {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const toDataUrl = (content: string, type = 'text/javascript') =>
  `data:${type};charset=UTF-8;base64,` + encode(content);

export const getWorkerDataURL = (url: string) => toDataUrl(`importScripts("${url}");`);

export const createWorkerFromContent = (content: string) => {
  try {
    return new Worker(toDataUrl(content));
  } catch (e) {
    return new Worker(URL.createObjectURL(new Blob([content], { type: 'application/javascript' })));
  }
};

export const removeComments = /* @__PURE__ */ (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

export const removeStrings = /* @__PURE__ */ (src: string) =>
  src
    .replace(/'[^\n']*'/gm, "''")
    .replace(/"[^\n"]*"/gm, '""')
    .replace(/`[^`]*`/gm, '``');

export const removeCommentsAndStrings = (src: string) => removeStrings(removeComments(src));

export const getLanguageCustomSettings = /* @__PURE__ */ (
  language: Language | Processor,
  config: Config,
) => ({
  ...(config.customSettings as any)[language],
});

export const getValidUrl = /* @__PURE__ */ (url?: string) => {
  if (!url) return null;
  let validUrl = null;
  if (url.startsWith('http') || url.startsWith('data:')) {
    try {
      validUrl = new URL(url).href;
    } catch {
      try {
        validUrl = new URL(decodeURIComponent(url)).href;
      } catch {
        //
      }
    }
  }
  return validUrl;
};

export const runOrContinue =
  /* @__PURE__ */


    <T>(fn: (x: T) => Promise<T>, catchFn?: (err: unknown) => void) =>
    async (x: T): Promise<T> => {
      try {
        const result = await fn(x);
        return result;
      } catch (error) {
        if (typeof catchFn === 'function') {
          catchFn(error);
        }
        return x;
      }
    };

export const getFileExtension = /* @__PURE__ */ (file: string) =>
  file.split('.')[file.split('.').length - 1];

export const isInIframe = /* @__PURE__ */ () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export const indentCode = /* @__PURE__ */ (code: string, spaces: number, skipFirstLine = true) =>
  (skipFirstLine ? '' : ' '.repeat(spaces)) + code.split('\n').join('\n' + ' '.repeat(spaces));

export const hideOnClickOutside = /* @__PURE__ */ (element: HTMLElement) => {
  const hideElement = () => {
    element.style.display = 'none';
    removeListeners();
    (window as any).watchingEscape = false;
  };

  const outsideClickListener = (event: MouseEvent) => {
    if (!element.contains(event.target as Node) && isVisible(element)) {
      hideElement();
    }
  };

  const escapeListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideElement();
      event.preventDefault();
    }
  };

  const isVisible = (elem: HTMLElement) =>
    !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  const removeListeners = () => {
    document.removeEventListener('click', outsideClickListener);
    document.removeEventListener('keydown', escapeListener);
  };

  document.addEventListener('click', outsideClickListener);
  document.addEventListener('keydown', escapeListener);
  (window as any).watchingEscape = true;

  return {
    clear: () => removeListeners(),
  };
};

export const callWorker = async <T = string, K = unknown>(
  worker: Worker,
  message: { method: T; args?: any },
) =>
  new Promise<K>((resolve) => {
    const messageId = getRandomString();

    const handler = (event: WorkerMessageEvent<T, K>) => {
      const received = event.data;

      if (received.method === message.method && received.messageId === messageId) {
        worker.removeEventListener('message', handler);
        resolve(received.data as K);
      }
    };
    worker.addEventListener('message', handler);

    worker.postMessage({
      ...message,
      messageId,
    });
  });

export const toCamelCase = /* @__PURE__ */ (str: string) =>
  str
    .replace(/[-_.]+/g, ' ')
    .trim()
    .replace(/^([A-Z])|\s+(\w)/g, function (_match, p1, p2) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });

export const removeDuplicates = /* @__PURE__ */ (arr: any[] | undefined) =>
  Array.from(new Set(arr));

export const replaceAsync = /* @__PURE__ */ async (
  str: string,
  regexp: RegExp,
  asyncFn: (...args: any) => Promise<string>,
) => {
  const replacements = await Promise.all(
    Array.from(str.matchAll(regexp), (match) => asyncFn(...match)),
  );
  let i = 0;
  return str.replace(regexp, () => replacements[i++]);
};

export const addAttrs = (el: HTMLElement, attributes: Record<string, string> | string) => {
  if (typeof attributes === 'object') {
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    return;
  }
  const attrs = attributes.match(/[^\s="']+\s*=\s*(('[^']*')|("[^"]*"))/g) || [];
  for (const attr of attrs) {
    const [key, ...rest] = attr.split('=');
    const value = rest.join('=');
    el.setAttribute(key, value.slice(1, -1));
  }
};

/**
 * Bypasses the AMD module definition system by temporarily disabling it while executing the given function.
 *
 * @param fn - The function to execute.
 * @return The result of executing the function.
 */
export const bypassAMD = /* @__PURE__ */ async <T = any>(fn: () => Promise<T>): Promise<T> => {
  const define = (globalThis as any).define;
  (globalThis as any).define = undefined;
  const result = await fn();
  (globalThis as any).define = define;
  return result;
};
