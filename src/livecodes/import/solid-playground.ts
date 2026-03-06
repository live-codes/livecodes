import type { Config } from '../models';

interface PlaygroundFile {
  name: string;
  content: string;
}

export const importSolidPlayground = async (url: string): Promise<Partial<Config>> => {
  const id = url.split('/').pop();
  if (!id?.trim()) return {};
  const data = await fetch(`https://api.solidjs.com/repl/${id}`).then((res) => res.json());
  const files: Config['files'] = data.files
    ?.filter((file: PlaygroundFile) => file.name !== 'import_map.json')
    .map((file: PlaygroundFile) => ({
      filename: file.name,
      content: file.content,
    }));
  if (!files?.length) return {};
  let imports = {};
  try {
    imports = JSON.parse(
      data.files.find((file: PlaygroundFile) => file.name === 'import_map.json')?.content || '{}',
    );
  } catch {
    // ignore
  }
  return {
    activeEditor: files.find((f) => f.filename === 'main.tsx')?.filename,
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
    <script type="module" src="main.tsx"></script>
  </body>
</html>
`,
      },
      ...files,
    ],
    customSettings: {
      fileLanguages: {
        jsx: 'solid',
        tsx: 'solid.tsx',
      },
      imports,
    },
  };
};
