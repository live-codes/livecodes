import type { Template } from '../../models';

export const blank: Template = {
  name: 'multifile-blank',
  title: window.deps.translateString('templates.multifile.blank', 'Blank Template'),
  thumbnail: 'assets/templates/blank.svg',
  mainFile: 'index.html',
  activeEditor: 'index.html',
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
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>

    <script type="module" src="script.js"></script>
  </body>
</html>
`,
    },
    {
      filename: 'styles.css',
      language: 'css',
      content: '',
    },
    {
      filename: 'script.js',
      language: 'javascript',
      content: '',
    },
  ],
};
