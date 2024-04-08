export const translate = (
  container: HTMLElement,
  i18n: typeof import('./i18n').default | undefined,
) => {
  if (!container || !i18n) return;
  container.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const prop = el.dataset.i18nProp || 'textContent';
    (el as any)[prop] = i18n.t(key) || (el as any)[prop];
  });
};
