import type { Config } from '../models';
import { fflateUrl } from '../vendors';

export const importVuePlayground = async (url: string): Promise<Partial<Config>> => {
  const code = url.split('#')[1] || parent.location.hash.split('#')[1];
  if (!code?.trim()) return {};

  const { unzlibSync, strToU8, strFromU8 } = await import(fflateUrl);

  // from https://github.com/vuejs/repl/blob/main/src/utils.ts
  function atou(base64: string) {
    const binary = atob(base64);
    if (binary.startsWith('\x78\xDA')) {
      const buffer = strToU8(binary, true);
      const unzipped = unzlibSync(buffer);
      return strFromU8(unzipped);
    }
    return decodeURIComponent(escape(binary));
  }

  const str = atou(code);
  if (!str) return {};
  try {
    const json = JSON.parse(str);
    const files: any = Object.keys(json)
      .filter((filename) => filename !== 'tsconfig.json' && filename !== 'import-map.json')
      .map((filename) => ({ filename, content: json[filename] }));
    if (!files.length) return {};
    let imports = {};
    try {
      imports = JSON.parse(json['import-map.json'] || '{}').imports;
    } catch {
      // ignore
    }
    return {
      activeEditor: files.find((f: any) => f.filename === 'App.vue')?.filename,
      files: [
        {
          filename: 'index.html',
          language: 'html',
          content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.ts"></script>
  </body>
</html>
`,
        },
        {
          filename: 'main.ts',
          language: 'typescript',
          content: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`,
        },
        ...files,
      ],
      customSettings: { imports },
    };
  } catch {
    return {};
  }
};
