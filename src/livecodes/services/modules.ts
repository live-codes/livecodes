import type { CDN } from '../models';

export const modulesService = {
  getModuleUrl: (
    moduleName: string,
    { isModule = true, defaultCDN = 'jspm' }: { isModule?: boolean; defaultCDN?: CDN } = {},
  ) => {
    const getCdnUrl = (modName: string) => {
      const post = isModule && modName.startsWith('unpkg:') ? '?module' : '';
      for (const i of TEMPLATES) {
        const [pattern, template] = i;
        if (pattern.test(modName)) {
          return modName.replace(pattern, template) + post;
        }
      }
      return null;
    };

    moduleName = moduleName.replace(/#nobundle/g, '');

    const moduleUrl = getCdnUrl(moduleName) || getCdnUrl(defaultCDN + ':' + moduleName);
    if (moduleUrl) {
      return moduleUrl;
    }

    return isModule
      ? 'https://jspm.dev/' + moduleName
      : 'https://cdn.jsdelivr.net/npm/' + moduleName;
  },
};

// based on https://github.com/neoascetic/rawgithack/blob/master/web/rawgithack.js
const TEMPLATES: Array<[RegExp, string]> = [
  [/^(jspm:)(.+)/i, 'https://jspm.dev/$2'],

  [/^(npm:)(.+)/i, 'https://jspm.dev/$2'],

  [/^(node:)(.+)/i, 'https://jspm.dev/$2'],

  [/^(skypack:)(.+)/i, 'https://cdn.skypack.dev/$2'],

  [/^(jsdelivr:)(.+)/i, 'https://cdn.jsdelivr.net/npm/$2'],

  [/^(jsdelivr.gh:)(.+)/i, 'https://cdn.jsdelivr.net/gh/$2'],

  [/^(esm.run:)(.+)/i, 'https://esm.run/$2'],

  [/^(esm.sh:)(.+)/i, 'https://esm.sh/$2'],

  [/^(esbuild:)(.+)/i, 'https://esbuild.vercel.app/$2'],

  [/^(bundle.run:)(.+)/i, 'https://bundle.run/$2'],

  [/^(unpkg:)(.+)/i, 'https://unpkg.com/$2'],

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
