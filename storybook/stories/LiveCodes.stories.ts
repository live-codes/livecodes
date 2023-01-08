import { livecodesStory } from '../src';

export default {
  title: 'Example/LiveCodes',
};

export const Default = livecodesStory({});

export const ReactTemplate = livecodesStory({
  template: 'react',
});

export const NoStyles = livecodesStory({
  attrs: {
    'data-default-styles': 'false',
  },
});
