// read starter templates and generate {name: title} JSON
// for use in server functions to get project info
// in functions/utils.ts and server/php/inc/utils.php

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const templatesModule = '../build/livecodes/templates.js';
const jsOutputFile = '../functions/vendors/templates.js';
const jsonOutputFile = '../server/php/inc/starter-templates.json';

const getDirname = (/** @type {string} */ metaUrl) => path.dirname(fileURLToPath(metaUrl));
export const dirname = getDirname(import.meta.url);

export const createTemplatesJson = () => {
  globalThis.window = {
    ...globalThis.window,
    deps: { translateString: (_i18nKey, title) => title },
  };

  // avoid node's ES module import warning
  const moduleContent = fs.readFileSync(path.resolve(dirname, templatesModule), 'utf8');
  const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(moduleContent).toString('base64');

  import(moduleUrl)
    .then((mod) => {
      const templates = mod.starterTemplates.reduce(
        (acc, template) => ({
          ...acc,
          [template.name]: template.title,
        }),
        {},
      );
      const json = JSON.stringify(templates, null, 2);

      fs.writeFileSync(path.resolve(dirname, jsonOutputFile), json);
      fs.writeFileSync(
        path.resolve(dirname, jsOutputFile),
        `export const starterTemplates = ` + json,
      );
    })
    .catch(() => {
      console.warn(`Failed to load ${templatesModule}`);
    });
};

if (import.meta.main) {
  createTemplatesJson();
}
