const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');

const outDir = path.resolve('src/livecodes/i18n/locales/tmp');
const baseDir = path.resolve('src/livecodes/html');

/**
 * Generate .ts and .lokalise.json files from HTML files.
 * 
 * If no files are provided, it will process all HTML files in the base directory.
 */
const generateTranslation = async () => {
  const writeTranslation = (namespace) => {
    // Use JSON.stringify to format the JSON object
    // However we need to convert it to a valid TypeScript object
    // so we need to remove the quotes from the keys and use single quotes in string
    const name = namespace === 'translation' ? 'translation' : 'languageInfo';
    const definition = JSON.stringify(trans[namespace], null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      // .replace(/"(.*)\/\* COMMENTS \*\/(.*)"(,?)/g, "'$1'$3 // $2")
      .replace(/"/g, "'");
    const translationContent =
      `import { type I18nTranslationTemplate } from '../models';\n\nconst ${name} = ` +
      definition +
      ` as const satisfies I18nTranslationTemplate;\n\nexport default ${name};`;
    fs.writeFileSync(path.resolve(outDir, namespace + '.ts'), translationContent);

    // Save structured JSON for lokalise
    fs.writeFileSync(path.resolve(outDir, namespace + '.lokalise.json'), JSON.stringify(structuredJSON[namespace], null, 2));

    console.log(`Generated namespace ${namespace} in ${outDir}.`);
  };

  // From src/livecodes/i18n/utils.ts
  const abstractifyHTML = (html) => {
    const doc = new jsdom.JSDOM(html).window.document;
    const elements = [];

    let counter = 0;

    const replaceElement = (node) => {
      if (node.nodeType !== doc.ELEMENT_NODE) return;

      node.childNodes.forEach((child) => {
        replaceElement(child);
      });

      const name = node.tagName.toLowerCase();
      if (name === 'body') return;

      const attributes =
        node.attributes.length === 0
          ? undefined
          : Array.from(node.attributes).reduce((acc, attr) => {
              acc[attr.name] = attr.value;
              return acc;
            }, {});

      elements.push({ name, attributes });

      const newElement = doc.createElement(`tag-${counter}`);
      while (node.firstChild) {
        newElement.appendChild(node.firstChild);
      }

      // node.parentNode is always defined because we're traversing from the body
      node.parentNode.replaceChild(newElement, node);

      counter++;
    };

    replaceElement(doc.body);
    return {
      html: doc.body.innerHTML.replace(/tag-/g, '').replace(/\s+/g, ' ').trim(),
      elements: elements,
    };
  };

  const files = process.argv.slice(2);
  const trans = {
    translation: {},
    "language-info": {},
  };
  const structuredJSON = {
    translation: {},
    "language-info": {},
  }

  const getValueAndContext = (element, prop) => {
    if (prop === 'innerHTML') {
      const { html, elements } = abstractifyHTML(element.innerHTML);
      // return (
      //   html +
      //   '/* COMMENTS */' +
      //   elements.map(
      //     (el) =>
      //       `<${el.name} ${
      //         el.attributes
      //           ? Object.keys(el.attributes)
      //               .map((attr) => `${attr}="${el.attributes[attr]}"`)
      //               .join(' ')
      //           : ''
      //       } />`,
      //   )
      // );
      return {
        value: html,
        desc: elements.map(
          (el, index) =>
            `### <${index}> ###\n<${el.name} ${
              el.attributes
                ? Object.keys(el.attributes)
                    .map((attr) => `${attr}="${el.attributes[attr]}"`)
                    .join(' ')
                : ''
            } />\n\n`,
        ).join(''),
      };
    }
    return {
      value: element[prop].trim(),
      desc: ''
    };
  };

  if (files.some((file) => !file.endsWith('.html'))) {
    console.error('Only HTML files are allowed.');
    process.exit(1);
  }

  if (!files.length) {
    files.push(...fs.readdirSync(baseDir).filter((file) => file.endsWith('.html')));
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  await Promise.all(
    files.map(async (file) => {
      try {
        console.log(`Processing ${file}...`);

        const data = await fs.promises.readFile(path.resolve(baseDir, file), 'utf8');
        const html = new jsdom.JSDOM(data).window.document;

        html.querySelectorAll('[data-i18n]').forEach((element) => {
          const key = element.getAttribute('data-i18n').split(':').pop(); // This is for namespace
          const props = (element.getAttribute('data-i18n-prop') ?? 'textContent').split(' ');
          const namespace = file === 'language-info.html' ? 'language-info' : 'translation';

          const {value, desc} =
            props.length == 1
              ? getValueAndContext(element, props[0])
              : props.reduce((acc, prop) => {
                  const vd = getValueAndContext(element, prop);
                  acc.value[prop] = vd.value;
                  acc.desc[prop] = vd.desc;
                  return acc;
                }, {value: {}, desc: {}});

          const parts = key.split('.');
          let current = trans[namespace];
          parts.forEach((part, index) => {
            if (!current[part]) {
              current[part] = index === parts.length - 1 ? value : {};
            } else {
              if (index === parts.length - 1) {
                console.error(`Duplicate key: ${key}`);
              }
            }
            current = current[part];
          });

          if (props.length == 1) {
            structuredJSON[namespace][key] = {
              translation: value,
              notes: desc,
            };
          } else {
            props.forEach((prop) => {
              structuredJSON[namespace][key + `#${prop}`] = {
                translation: value[prop],
                notes: desc[prop],
              };
            });
          }
        });
      } catch (err) {
        console.error(err);
      }
    }),
  );

  writeTranslation('translation');

  if (Object.keys(trans["language-info"]).length > 0) {
    writeTranslation('language-info');
  }
};

module.exports = { generateTranslation };

if (require.main === module) {
  generateTranslation();
}
