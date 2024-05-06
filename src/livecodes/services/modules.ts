import type { CDN } from '../models';

declare const globalThis: { appCDN: CDN };

const moduleCDNs: CDN[] = [
  'esm.sh',
  'skypack',
  'esm.run',
  'jsdelivr.esm',
  'fastly.jsdelivr.esm',
  'gcore.jsdelivr.esm',
  'testingcf.jsdelivr.esm',
  'jsdelivr.b-cdn.esm',
  'jspm',
];
const npmCDNs: CDN[] = [
  'jsdelivr',
  'fastly.jsdelivr',
  'unpkg',
  'gcore.jsdelivr',
  'testingcf.jsdelivr',
  'jsdelivr.b-cdn',
  'npmcdn',
];
const ghCDNs: CDN[] = [
  'jsdelivr.gh',
  'fastly.jsdelivr.gh',
  'statically',
  'gcore.jsdelivr.gh',
  'testingcf.jsdelivr.gh',
  'jsdelivr.b-cdn.gh',
];

export const modulesService = {
  getModuleUrl: (
    moduleName: string,
    { isModule = true, defaultCDN = 'esm.sh' }: { isModule?: boolean; defaultCDN?: CDN } = {},
  ) => {
    moduleName = moduleName.replace(/#nobundle/g, '');

    const moduleUrl = getCdnUrl(moduleName, isModule, defaultCDN);
    if (moduleUrl) {
      return moduleUrl;
    }

    return isModule ? 'https://esm.sh/' + moduleName : 'https://cdn.jsdelivr.net/npm/' + moduleName;
  },

  getUrl: (path: string, cdn?: CDN) =>
    path.startsWith('http') || path.startsWith('data:')
      ? path
      : getCdnUrl(path, false, cdn || getAppCDN()) || path,

  cdnLists: { npm: npmCDNs, module: moduleCDNs, gh: ghCDNs },

  checkCDNs: async (testModule: string, preferredCDN?: CDN) => {
    const cdns: CDN[] = [preferredCDN, ...modulesService.cdnLists.npm].filter(Boolean) as CDN[];
    for (const cdn of cdns) {
      try {
        const res = await fetch(modulesService.getUrl(testModule, cdn), {
          method: 'HEAD',
        });
        if (res.ok) return cdn;
      } catch {
        // continue;
      }
    }
    // fall back to first
    return modulesService.cdnLists.npm[0];
  },
};

export const getAppCDN = (): CDN => {
  if (globalThis.appCDN) return globalThis.appCDN;
  try {
    const url = new URL(location.href);
    return (url.searchParams.get('appCDN') as CDN) || modulesService.cdnLists.npm[0];
  } catch {
    return modulesService.cdnLists.npm[0] as CDN;
  }
};

const getCdnUrl = (modName: string, isModule: boolean, defaultCDN?: CDN) => {
  const post = isModule && modName.startsWith('unpkg:') ? '?module' : '';
  if (modName.startsWith('gh:')) {
    modName = modName.replace('gh', ghCDNs[0]);
  } else if (!modName.includes(':')) {
    const prefix = defaultCDN || (isModule ? moduleCDNs[0] : npmCDNs[0]);
    modName = prefix + ':' + modName;
  }
  for (const i of TEMPLATES) {
    const [pattern, template] = i;
    if (pattern.test(modName)) {
      return modName.replace(pattern, template) + post;
    }
  }
  return null;
};

// based on https://github.com/neoascetic/rawgithack/blob/master/web/rawgithack.js
const TEMPLATES: Array<[RegExp, string]> = [
  [/^(esm\.sh:)(.+)/i, 'https://esm.sh/$2'],

  [/^(npm:)(.+)/i, 'https://esm.sh/$2'],

  [/^(node:)(.+)/i, 'https://esm.sh/$2'],

  [/^(jsr:)(.+)/i, 'https://esm.sh/jsr/$2'],

  [/^(skypack:)(.+)/i, 'https://cdn.skypack.dev/$2'],

  [/^(jsdelivr:)(.+)/i, 'https://cdn.jsdelivr.net/npm/$2'],

  [/^(fastly\.jsdelivr:)(.+)/i, 'https://fastly.jsdelivr.net/npm/$2'],

  [/^(gcore\.jsdelivr:)(.+)/i, 'https://gcore.jsdelivr.net/npm/$2'],

  [/^(testingcf\.jsdelivr:)(.+)/i, 'https://testingcf.jsdelivr.net/npm/$2'],

  [/^(jsdelivr\.b-cdn:)(.+)/i, 'https://jsdelivr.b-cdn.net/npm/$2'],

  [/^(jsdelivr\.gh:)(.+)/i, 'https://cdn.jsdelivr.net/gh/$2'],

  [/^(fastly\.jsdelivr\.gh:)(.+)/i, 'https://fastly.jsdelivr.net/gh/$2'],

  [/^(gcore\.jsdelivr\.gh:)(.+)/i, 'https://gcore.jsdelivr.net/gh/$2'],

  [/^(testingcf\.jsdelivr\.gh:)(.+)/i, 'https://testingcf.jsdelivr.net/gh/$2'],

  [/^(jsdelivr\.b-cdn\.gh:)(.+)/i, 'https://jsdelivr.b-cdn.net/gh/$2'],

  [/^(statically:)(.+)/i, 'https://cdn.statically.io/gh/$2'],

  [/^(esm\.run:)(.+)/i, 'https://esm.run/$2'],

  [/^(jsdelivr\.esm:)(.+)/i, 'https://cdn.jsdelivr.net/npm/$2/+esm'],

  [/^(fastly\.jsdelivr\.esm:)(.+)/i, 'https://fastly.jsdelivr.net/npm/$2/+esm'],

  [/^(gcore\.jsdelivr\.esm:)(.+)/i, 'https://gcore.jsdelivr.net/npm/$2/+esm'],

  [/^(testingcf\.jsdelivr\.esm:)(.+)/i, 'https://testingcf.jsdelivr.net/npm/$2/+esm'],

  [/^(jsdelivr\.b-cdn\.esm:)(.+)/i, 'https://jsdelivr.b-cdn.net/npm/$2/+esm'],

  [/^(jspm:)(.+)/i, 'https://jspm.dev/$2'],

  [/^(esbuild:)(.+)/i, 'https://esbuild.vercel.app/$2'],

  [/^(bundle\.run:)(.+)/i, 'https://bundle.run/$2'],

  [/^(unpkg:)(.+)/i, 'https://unpkg.com/$2'],

  [/^(npmcdn:)(.+)/i, 'https://npmcdn.com/$2'],

  [/^(bundlejs:)(.+)/i, 'https://deno.bundlejs.com/?file&q=$2'],

  [/^(bundle:)(.+)/i, 'https://deno.bundlejs.com/?file&q=$2'],

  [/^(deno:)(.+)/i, 'https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts'],

  [/^(https:\/\/deno\.land\/.+)/i, 'https://deno.bundlejs.com/?file&q=$1'],

  [
    /^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,
    'https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4',
  ],

  [/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, 'https://gist.githack.com/$2'],

  [
    /^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,
    'https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3',
  ],
  [
    /^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,
    'https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3',
  ],

  // snippet file URL from web interface, with revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    'https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4',
  ],
  // snippet file URL from web interface, no revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    'https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3',
  ],
  // snippet file URLs from REST API
  [
    /^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    'https://bb.githack.com/!api/2.0/snippets/$2/files/$3',
  ],
  [
    /^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    'https://bb.githack.com/!api/2.0/snippets/$2/files/$3',
  ],

  [/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, 'https://gist.githack.com/$2'],
  [
    /^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,
    'https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3',
  ],
];
