export const removeCDNPrefix = (url: string) => {
  if (!url.startsWith('https://')) return url;

  const prefixes = [
    'https://esm.sh/',
    'https://cdn.skypack.dev/',
    'https://cdn.jsdelivr.net/npm/',
    'https://fastly.jsdelivr.net/npm/',
    'https://gcore.jsdelivr.net/npm/',
    'https://testingcf.jsdelivr.net/npm/',
    'https://jsdelivr.b-cdn.net/npm/',
    'https://esm.run/',
    'https://esbuild.vercel.app/',
    'https://bundle.run/',
    'https://unpkg.com/',
    'https://npmcdn.com/',
    'https://deno.bundlejs.com/?file&q=',
    'https://jspm.dev/',
  ];

  for (const prefix of prefixes) {
    if (url.startsWith(prefix)) {
      return url.replace(prefix, '');
    }
  }
  return url;
};

export const removeSpecifier = (type: string) =>
  type.includes(':') && !type.startsWith('data:') && !type.startsWith('http')
    ? type.split(':')[1]
    : type;
