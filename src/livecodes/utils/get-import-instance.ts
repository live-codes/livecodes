function createInstance(url: string) {
  return import(url);
}

let instancePromise: any = null;

export function getImportInstance(url: string) {
  if (!instancePromise) {
    instancePromise = createInstance(url).catch(() => {
      //
    });
  }
  return instancePromise;
}
