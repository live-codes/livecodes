import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/appUrl',
};

export const AppUrl = livecodesStory({ appUrl: 'https://dev.livecodes.io' });
export const Default = livecodesStory({});
