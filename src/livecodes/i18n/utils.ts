export const translate = (
  container: HTMLElement,
  i18n: typeof import('./i18n').default | undefined,
) => {
  if (!container || !i18n) return;
  container.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const props = (el.dataset.i18nProp || 'textContent').split(' ');
    props.forEach((prop) => {
      const isObject = typeof i18n.t(key, { returnObjects: true }) === 'object';
      const lookupKey = isObject ? `${key}.${prop}` : key;
      if (prop.startsWith('data-')) {
        prop = prop.slice(5);
        el.dataset[prop] = i18n.t(lookupKey, el.dataset[prop]!);
      } else {
        (el as any)[prop] = i18n.t(lookupKey, (el as any)[prop]);
      }
    });
  });
};
