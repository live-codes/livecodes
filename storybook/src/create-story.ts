/* eslint-disable import/no-internal-modules */
/* eslint-disable camelcase */
import type { ArgTypes, Story } from '@storybook/html';
import { flatten, unflatten } from 'flat';

import { defaultConfig } from '../../src/livecodes/config/default-config';
import { starterTemplates } from '../../src/livecodes/templates/starter';
import { languages } from '../../src/livecodes/languages';
import type { LiveCodesArgs } from './LiveCodes';

const delimiter = '__';

const getControlInfo = (name: string, defaultObj = defaultConfig) => {
  let group: string | undefined;
  let subcategory: string | undefined;
  let keyName: string | undefined;

  const parts = name.split(delimiter);
  if (parts.length === 2) {
    [group, keyName] = parts;
  } else {
    [group, subcategory, keyName] = parts;
  }

  const getType = (value: unknown) => {
    if (typeof value === 'string') return 'text';
    return typeof value;
  };

  const defaultValue =
    // @ts-ignore
    subcategory != null ? defaultObj?.[subcategory]?.[keyName] : defaultObj?.[keyName];

  return {
    table: {
      category: group,
      ...(subcategory ? { subcategory } : {}),
    },
    name: keyName,
    control: getType(defaultValue),
    required: false,
  };
};

const argTypes: Partial<ArgTypes<LiveCodesArgs>> = {
  appUrl: {
    control: 'text',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  import: {
    control: 'text',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  lite: {
    control: 'boolean',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  loading: {
    control: 'inline-radio',
    options: ['lazy', 'click', 'eager'],
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  params: {
    control: 'object',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  template: {
    control: 'select',
    required: false,
    table: {
      category: 'Embed Options',
    },
    options: starterTemplates.map((template) => template.name),
  },
  view: {
    control: 'inline-radio',
    options: ['split', 'editor', 'result'],
    required: false,
    table: {
      category: 'Embed Options',
    },
  },

  config: {
    table: { disable: true },
  },
  config__title: getControlInfo('config__title'),
  config__description: getControlInfo('config__description'),
  config__tags: getControlInfo('config__tags'),
  config__autoupdate: getControlInfo('config__autoupdate'),
  config__autosave: getControlInfo('config__autosave'),
  config__delay: getControlInfo('config__delay'),
  config__formatOnsave: getControlInfo('config__formatOnsave'),
  config__mode: {
    ...getControlInfo('config__mode'),
    control: 'inline-radio',
    options: ['full', 'editor', 'codeblock', 'result'],
  },
  config__theme: {
    ...getControlInfo('config__theme'),
    control: 'inline-radio',
    options: ['light', 'dark'],
  },
  config__recoverUnsaved: getControlInfo('config__recoverUnsaved'),
  config__showSpacing: getControlInfo('config__showSpacing'),
  config__readonly: getControlInfo('config__readonly'),
  config__allowLangChange: getControlInfo('config__allowLangChange'),
  config__activeEditor: {
    ...getControlInfo('config__activeEditor'),
    control: 'inline-radio',
    options: ['markup', 'style', 'script'],
  },
  config__languages: {
    ...getControlInfo('config__languages'),
    control: 'object',
  },
  config__markup__language: {
    ...getControlInfo('config__markup__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'markup').map((lang) => lang.name),
  },
  config__markup__content: {
    ...getControlInfo('config__markup__content'),
  },
  config__markup__contentUrl: {
    ...getControlInfo('config__markup__contentUrl'),
    control: 'text',
  },
  config__markup__selector: {
    ...getControlInfo('config__markup__selector'),
    control: 'text',
  },
  config__markup__position: {
    ...getControlInfo('config__markup__position'),
    control: 'object',
  },
  config__style__language: {
    ...getControlInfo('config__style__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'style').map((lang) => lang.name),
  },
  config__style__content: {
    ...getControlInfo('config__style__content'),
  },
  config__style__contentUrl: {
    ...getControlInfo('config__style__contentUrl'),
    control: 'text',
  },
  config__style__selector: {
    ...getControlInfo('config__style__selector'),
    control: 'text',
  },
  config__style__position: {
    ...getControlInfo('config__style__position'),
    control: 'object',
  },
  config__script__language: {
    ...getControlInfo('config__script__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__script__content: {
    ...getControlInfo('config__script__content'),
  },
  config__script__contentUrl: {
    ...getControlInfo('config__script__contentUrl'),
    control: 'text',
  },
  config__script__selector: {
    ...getControlInfo('config__script__selector'),
    control: 'text',
  },
  config__script__position: {
    ...getControlInfo('config__script__position'),
    control: 'object',
  },
  config__stylesheets: {
    ...getControlInfo('config__stylesheets'),
    control: 'object',
  },
  config__scripts: {
    ...getControlInfo('config__scripts'),
    control: 'object',
  },
  config__cssPreset: {
    ...getControlInfo('config__cssPreset'),
    control: 'inline-radio',
    options: ['normalize.css', 'reset-css'],
  },
  config__imports: {
    ...getControlInfo('config__imports'),
    control: 'object',
  },
  config__types: {
    ...getControlInfo('config__types'),
    control: 'object',
  },
  config__tests__language: {
    ...getControlInfo('config__tests__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__tests__content: {
    ...getControlInfo('config__tests__content'),
  },
  config__tools__enabled: {
    ...getControlInfo('config__tools__enabled'),
  },
  config__tools__active: {
    ...getControlInfo('config__tools__active'),
    control: 'inline-radio',
    options: ['console', 'compiled', 'tests'],
  },
  config__tools__status: {
    ...getControlInfo('config__tools__status'),
    control: 'inline-radio',
    options: ['full', 'closed', 'open', 'none'],
  },
  config__zoom: {
    ...getControlInfo('config__zoom'),
    control: 'inline-radio',
    options: [1, 0.5, 0.25],
  },
  config__processors: {
    ...getControlInfo('config__processors'),
    control: 'object',
  },
  config__customSettings: {
    ...getControlInfo('config__customSettings'),
    control: 'object',
  },
  config__editor: {
    ...getControlInfo('config__editor'),
    control: 'inline-radio',
    options: ['monaco', 'codemirror', 'codejar'],
  },
  config__fontFamily: {
    ...getControlInfo('config__fontFamily'),
    control: 'text',
  },
  config__fontSize: {
    ...getControlInfo('config__fontSize'),
    control: 'number',
  },
  config__useTabs: getControlInfo('config__useTabs'),
  config__tabSize: getControlInfo('config__tabSize'),
  config__lineNumbers: getControlInfo('config__lineNumbers'),
  config__wordWrap: getControlInfo('config__wordWrap'),
  config__closeBrackets: getControlInfo('config__closeBrackets'),
  config__semicolons: getControlInfo('config__semicolons'),
  config__singleQuote: getControlInfo('config__singleQuote'),
  config__trailingComma: getControlInfo('config__trailingComma'),
  config__emmet: getControlInfo('config__emmet'),
  config__editorMode: {
    ...getControlInfo('config__editorMode'),
    control: 'inline-radio',
    options: ['vim', 'emacs'],
  },
  config__version: getControlInfo('config__version'),

  attrs: {
    description: 'Attributes to add to container element',
    control: 'object',
    required: false,
    table: {
      category: 'Container Element',
    },
  },
};

const appUrl =
  location.hostname.startsWith('localhost') || location.hostname.startsWith('127.0.0.1')
    ? 'http://127.0.0.1:8080'
    : location.origin;

export const createStory =
  (createComponent: (args: LiveCodesArgs) => HTMLElement) => (args: LiveCodesArgs) => {
    const template = (args: LiveCodesArgs) => createComponent(unflatten(args, { delimiter }));
    const story: Story<LiveCodesArgs> = template.bind({});

    story.argTypes = argTypes;

    const { attrs, params, ...options } = args;
    story.args = {
      appUrl,
      ...flatten(options, { delimiter }),
      ...(params ? { params } : {}),
      ...(attrs ? { attrs } : {}),
    };

    const attrsToStr = () => {
      let str = '';
      if (!attrs || Object.keys(attrs).length === 0) return str;
      Object.entries(attrs).forEach(([key, value]) => {
        str += ` ${key}="${value}"`;
      });
      return str;
    };

    const code = `
<div id="container"${attrsToStr()}></div>
<script type="module">
import { createPlayground } from 'https://unpkg.com/livecodes';
const options = ${JSON.stringify(options, null, 2)};
createPlayground('#container', options);
</script>

`.trimStart();

    story.parameters = {
      docs: {
        source: {
          code,
          language: 'html',
          type: 'auto',
          format: true,
        },
      },
    };
    return story;
  };
