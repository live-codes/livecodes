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
