import LZString from 'lz-string';

export const debounce = (fn: (...x: any[]) => any, delay: number) => {
  let timeout: any;

  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), delay);
  };
};

export const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const encodeHTML = (html: string) =>
  html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&#34;');

// eslint-disable-next-line @typescript-eslint/ban-types
export const pipe = (...fns: Function[]) => fns.reduce((f, g) => (...args: any) => g(f(...args)));

// replace non-alphanumeric with underscore
export const safeName = (name: string) => name.replace(/[\W]+/g, '_');

// modified from https://github.com/alexindigo/precise-typeof/blob/master/index.js
export const typeOf = (obj: any) => {
  function isElement(o: any) {
    return typeof HTMLElement === 'object'
      ? o instanceof HTMLElement
      : o &&
          typeof o === 'object' &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === 'string';
  }
  function isNode(o: any) {
    return typeof Node === 'object'
      ? o instanceof Node
      : o &&
          typeof o === 'object' &&
          typeof o.nodeType === 'number' &&
          typeof o.nodeName === 'string';
  }
  function isDocument(o: any) {
    return Object.prototype.toString.call(o) === '[object HTMLDocument]';
  }
  function isWindow(o: any) {
    return Object.prototype.toString.call(o) === '[object Window]';
  }

  const stamp: string = Object.prototype.toString.call(obj);

  if (obj === undefined) return 'undefined';
  if (obj === null) return 'null';

  if (isWindow(obj)) return 'window';
  if (isDocument(obj)) return 'document';
  if (isElement(obj)) return 'element';
  if (isNode(obj)) return 'node';

  if (
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  ) {
    return 'buffer';
  }

  if (typeof window === 'object' && obj === window) return 'window';
  if (typeof global === 'object' && obj === global) return 'global';

  if (typeof obj === 'number' && isNaN(obj)) return 'nan';
  if (typeof obj === 'object' && stamp === '[object Number]' && isNaN(obj)) return 'nan';

  if (typeof obj === 'object' && stamp.substr(-6) === 'Event]') return 'event';
  if (stamp.substr(0, 12) === '[object HTML') return 'element';
  if (stamp.substr(0, 12) === '[object Node') return 'node';

  // last resort
  const type = stamp.match(/\[object\s*([^\]]+)\]/);
  if (type) return type[1].toLowerCase();

  return 'object';
};

export const compress = LZString.compressToBase64;
export const decompress = LZString.decompressFromBase64;

// from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
export const isMobile = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  return check;
};

export const isRelativeUrl = (url: string) => !url.startsWith('http') && !url.startsWith('/');
