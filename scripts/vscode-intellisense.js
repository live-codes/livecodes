const fs = require('fs');
const path = require('path');

const customDataSchema = {
  version: 1.1,
  globalAttributes: [
    {
      "name": "data-i18n",
      "description": "The key of the translation for current element.",
    },
    {
      "name": "data-i18n-prop",
      "description": "Attributes of the element that should be translated, separated by space.",
      "valueSet": "i18nProps"
    },
  ],
  valueSets: []
}

const generateHTMLIntellisense = async () => {

  const generateI18nPropsValueSet = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('src/livecodes/i18n/locales/models.ts', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const i18nProps = 
            data
            .match(/type I18nAttributes = RequireAtLeastOne<{([\s\S]*?)}/)[1]
            .split('\n')
            .map((line) => line.trim().replace(/['|;?]/g, '').split(':')[0])
            .filter((line) => line !== '');
          customDataSchema.valueSets.push({
            name: customDataSchema.globalAttributes[1].valueSet,
            values: i18nProps.map((value) => ({ name: value }))
          });
          resolve();
        }
      });
    });
  }

  await generateI18nPropsValueSet();

  const schemaPath = path.resolve(__dirname, '../.vscode/html.html-data.json');
  fs.writeFileSync(schemaPath, JSON.stringify(customDataSchema, null, 2));
  console.log(`HTML Intellisense schema generated at ${schemaPath}`);
}

module.exports = { generateHTMLIntellisense };

if (require.main === module) {
  generateHTMLIntellisense();
}
