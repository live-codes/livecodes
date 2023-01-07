/* eslint-disable camelcase */
import { flatten } from 'flat';
// eslint-disable-next-line import/no-internal-modules
import { defaultConfig } from '../../src/livecodes/config/default-config';

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

const argTypes = {
  appUrl: {
    control: 'text',
    defaultValue: 'http://127.0.0.1:8080/',
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
  template: {
    control: 'text',
    required: false,
    table: {
      category: 'Embed Options',
    },
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
  config__mode: getControlInfo('config__mode'),
  config__theme: getControlInfo('config__theme'),
  config__recoverUnsaved: getControlInfo('config__recoverUnsaved'),
  config__showSpacing: getControlInfo('config__showSpacing'),
  config__readonly: getControlInfo('config__readonly'),
  config__allowLangChange: getControlInfo('config__allowLangChange'),
  config__activeEditor: {
    ...getControlInfo('config__activeEditor'),
    control: { type: 'inline-radio', options: ['markup', 'style', 'script'] },
  },
  config__languages: {
    ...getControlInfo('config__languages'),
    control: { type: 'object' },
  },
  config__markup__language: {
    ...getControlInfo('config__markup__language'),
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
    control: 'text',
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
  },
  config__tests__content: {
    ...getControlInfo('config__tests__content'),
  },
  config__tools__enabled: {
    ...getControlInfo('config__tools__enabled'),
  },
  config__tools__active: {
    ...getControlInfo('config__tools__active'),
    control: { type: 'inline-radio', options: ['console', 'compiled', 'tests'] },
  },
  config__tools__status: {
    ...getControlInfo('config__tools__status'),
    control: { type: 'inline-radio', options: ['full', 'closed', 'open', 'none'] },
  },
  config__zoom: {
    ...getControlInfo('config__zoom'),
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
    control: { type: 'inline-radio', options: ['monaco', 'codemirror', 'codejar'] },
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
    control: { type: 'inline-radio', options: ['vim', 'emacs'] },
  },
  config__version: getControlInfo('config__version'),

  attrs: {
    description: 'Attributes to add to container element',
    type: 'object',
    required: false,
    table: {
      category: 'Container Element',
    },
  },
};

export const createStory = (createComponent: any) => (args: any) => {
  const template = createComponent;
  const story = template.bind({});
  story.argTypes = argTypes;
  const { attrs, ...options } = args;
  story.args = { ...flatten(options, { delimiter }), attrs };
  return story;
};
