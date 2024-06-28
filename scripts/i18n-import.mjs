import { LokaliseApi } from '@lokalise/node-api';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { sortedJSONify, prettierConfig } from './i18n-export.js';
import prettier from 'prettier';
import { exit } from 'process';

const outDir = path.resolve('src/livecodes/i18n/locales');
const api = new LokaliseApi({ apiKey: process.env.LOKALISE_API_TOKEN });
const projectID = process.env.LOKALISE_PROJECT_ID;

/**
 * Expand the flattened translation object (KV pairs) to a nested object.
 * @param {string} source Path to the source file.
 * @returns object
 */
const generateTranslationObject = (source) => {
  const translations = JSON.parse(fs.readFileSync(source, 'utf-8'));
  const translationObject = {};
  for (const key in translations) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let currentObject = translationObject;
    keys.forEach((k) => {
      if (!currentObject[k]) {
        currentObject[k] = {};
      }
      currentObject = currentObject[k];
    });
    currentObject[lastKey] = translations[key].replace("tag-", "");
  }
  return translationObject;
};

const importFromLokalise = async () => {
  const branchName = process.argv[2];

  if (!branchName) {
    console.error('Branch name is required');
    exit(1);
  }

  console.log('Fetching translations from Lokalise...');

  // Make a tmp directory to store the downloaded files
  const tmpDir = path.resolve(process.env.LOKALISE_TEMP);

  const response = await api.files().download(`${projectID}:${branchName}`, {
    format: 'json',
    original_filenames: true,
  });
  console.log(`Downloading zip file from ${response.bundle_url}`);

  const zipPath = path.join(tmpDir, 'locales.zip');
  const zipFile = await fetch(response.bundle_url);
  fs.writeFileSync(zipPath, Buffer.from(await zipFile.arrayBuffer()));

  console.log(`Extracting zip file to ${tmpDir}...`);
  execSync(`unzip -o ${zipPath} -d ${tmpDir}`);
  fs.unlinkSync(zipPath);

  fs.readdir(tmpDir, (err, languages) => {
    if (err) {
      console.error(err);
      exit(1);
    }

    console.log(
      `Extracted languages to tmp directory, ${languages.length} languages (including English) found.`,
    );

    languages.forEach((language) => {
      const languagePath = path.join(tmpDir, language);
      if (!fs.statSync(languagePath).isDirectory() || language === 'en') {
        return;
      }

      fs.readdir(languagePath, (err, files) => {
        if (err) {
          console.error(err);
          exit(1);
        }

        language = language.replace('_', '-');
        const outLanguagePath = path.join(outDir, language);
        console.log(`Importing language ${language}...`);

        fs.mkdirSync(outLanguagePath, { recursive: true });

        files.forEach(async (file) => {
          const source = path.join(languagePath, file);
          const target = path.join(outLanguagePath, file.replace('.lokalise.json', '.ts'));

          const namespace = file.split('.')[0];
          const name = namespace === 'translation' ? 'translation' : 'languageInfo';
          const type = namespace === 'translation' ? 'I18nTranslation' : 'I18nLangInfoTranslation';

          const translationObject = generateTranslationObject(source);
          const code = `import type { ${type} } from '../models';

            const ${name}: ${type} = ${sortedJSONify(translationObject)};
            
            export default ${name};
          `;

          const translationContent = await prettier.format(code, {
            parser: 'typescript',
            ...prettierConfig,
          });

          fs.writeFileSync(target, translationContent);
        });
      });
    });
  });
};

importFromLokalise();
