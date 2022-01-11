import { LanguageSpecs } from '../models';
import { blobToBase64, getWorkerDataURL } from '../utils';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';

const cdnBaseUrl = vendorsBaseUrl + 'gnuplot';

export const gnuplot: LanguageSpecs = {
  name: 'gnuplot',
  title: 'Gnuplot',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: cdnBaseUrl + '/gnuplot_api.js',
    factory: () => {
      const workerUrl = getWorkerDataURL(cdnBaseUrl + '/gnuplot.js');
      const gnuplot = new (self as any).Gnuplot(workerUrl);

      return async (code) => {
        if (!code) return '';

        await new Promise((resolveDel) => gnuplot.removeFiles(null, resolveDel));
        const runCode = (code: string, files: Array<{ fileName: string; content: string }>) =>
          new Promise(async (resolve) => {
            await Promise.all(
              files.map(
                (file) =>
                  new Promise((resolvePut) => {
                    gnuplot.putFile(file.fileName, file.content, resolvePut);
                  }),
              ),
            );
            gnuplot.run(code, resolve);
          });

        const getImgUrl = (fileName: string) =>
          new Promise<string>((resolve) => {
            gnuplot.getFile(fileName, function (e: { content?: ArrayBuffer }) {
              if (!e?.content) {
                gnuplot.onError(`Output file "${fileName}" is not found!`);
                resolve('');
                return;
              }
              const ab = new Uint8Array(e.content);
              const blob = new Blob([ab], { type: 'image/svg+xml' });
              blobToBase64(blob).then(resolve);
            });
          });

        const scriptPattern = /<script\s+type="gnuplot\/script"\s*>([\s\S]*?)<\/script>/g;
        const inputFilePattern = /<script\s+type="gnuplot\/file"[^>]*>([\s\S]*?)<\/script>/g;
        const inputFileNamePattern = /<script[^>]+data-file="([\s\S]*?)"/g;
        const inputFileUrlPattern = /<script[^>]+data-url="([\s\S]*?)"/g;
        const imgPattern = /<img[^>]+data-src="([\s\S]*?)"/g;

        const scripts: string[] = [];
        const result = code.replace(new RegExp(scriptPattern), (_match, content) => {
          scripts.push(content);
          return '';
        });
        const inputFiles = await Promise.all(
          [...result.matchAll(new RegExp(inputFilePattern))].map(async (arr) => {
            const fileUrl = [...arr[0].matchAll(new RegExp(inputFileUrlPattern))]?.[0]?.[1];
            const fileName =
              [...arr[0].matchAll(new RegExp(inputFileNamePattern))]?.[0]?.[1] ||
              fileUrl.split('/')[fileUrl.split('/').length - 1] ||
              'data.txt';
            const content = fileUrl ? await fetch(fileUrl).then((res) => res.text()) : arr[1] ?? '';
            return { fileName, content };
          }),
        );

        for (const script of scripts) {
          await runCode(script, inputFiles);
        }

        const imgFileNames = [...result.matchAll(new RegExp(imgPattern))].map((arr) => arr[1]);
        const dataUrls = (await Promise.all(imgFileNames.map(getImgUrl))).reduce(
          (acc, url, index) => ({ ...acc, [imgFileNames[index]]: url }),
          {},
        );

        return `${result}

<script>
(() => {
  const dataUrls = ${JSON.stringify(dataUrls)};
  document.querySelectorAll('[data-src]').forEach(img => {
    img.src = dataUrls[img.dataset.src];
  })
})();
</script>
`;
      };
    },
  },
  extensions: ['gnu', 'gplot', 'plt'],
  editor: 'markup',
  editorLanguage: 'html',
};
