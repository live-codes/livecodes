/* eslint-disable import/no-internal-modules */
import type { Config } from '../models';
import { corsService } from '../services/cors';

// https://github.com/sveltejs/svelte.dev/blob/main/apps/svelte.dev/src/routes/(authed)/playground/%5Bid%5D/gzip.js
async function decode_and_decompress_text(input: string) {
  const decoded = atob(input.replaceAll('-', '+').replaceAll('_', '/'));
  // putting it directly into the blob gives a corrupted file
  const u8 = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    u8[i] = decoded.charCodeAt(i);
  }
  const stream = new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

export const importSveltePlayground = async (url: string): Promise<Partial<Config>> => {
  const code = url.split('#')[1] || parent.location.hash.split('#')[1];
  let files = [];
  try {
    if (code) {
      const data = JSON.parse(await decode_and_decompress_text(code));
      files = data.files
        .filter((f: any) => f.type === 'file')
        .map((f: any) => ({
          filename: f.name,
          content: f.contents,
        }));
    } else {
      const id = url.split('?')[0].split('/').pop();
      const dataUrl = `https://svelte.dev/playground/${id}/__data.json?x-sveltekit-invalidated=001`;
      const res = await corsService.fetch(dataUrl);
      if (!res.ok) return {};
      const json = await res.json();
      const data = json.nodes.find((n: any) => n.data).data;
      files = data
        .filter((e: any) => e && typeof e === 'object' && e.name && e.type && e.source)
        .map((e: any) => ({
          filename: data[e.name] + '.' + data[e.type],
          content: data[e.source],
        }));
    }
  } catch {
    //
  }

  if (!files?.length) return {};
  return {
    activeEditor: files.find((f: any) => f.filename === 'App.svelte')?.filename,
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
        content: `import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: document.getElementById("app"),
});

export default app;
`,
      },
      ...files,
    ],
  };
};
