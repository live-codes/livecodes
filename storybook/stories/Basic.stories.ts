import dedent from 'dedent';

import { livecodesStory } from '../src';

export default {
  title: 'Basic',
};

export const Introduction = livecodesStory({
  config: {
    markup: {
      language: 'markdown',
      content: dedent`# Welcome to LiveCodes

                      A client-side code playground that runs in the browser.

                      Supports 80+ languages/frameworks!

                      [App](https://livecodes.io)
                      [About](https://livecodes.io/docs)
                      [Docs](https://livecodes.io/docs/overview)
                      [GitHub](https://github.com/live-codes/livecodes)
                      `,
    },
    style: {
      language: 'css',
      content: dedent`body {
                        color: #494949;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 12px;
                      }

                      a {
                        background-color: #f5f4f4;
                        border: 1px solid grey;
                        border-radius: 3px;
                        color: #383838;
                        display: inline-block;
                        margin: 3px;
                        padding: 2px;
                        text-align: center;
                        text-decoration: none;
                        width: 5em;
                      }

                      a:hover {
                        background-color: #666;
                        color: #fff;
                      }
                      `,
    },
    script: {
      language: 'javascript',
      content: dedent`document.querySelectorAll('a').forEach((link) => {
                        link.target = '_blank';
                      });
                      console.log('Hello from JS!');
                      `,
    },
  },
});

export const Default = livecodesStory({});

export const ReactTemplate = livecodesStory({
  template: 'react',
});

export const NoStyles = livecodesStory({
  attrs: {
    'data-default-styles': 'false',
  },
});
