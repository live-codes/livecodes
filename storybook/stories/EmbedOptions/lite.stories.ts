import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/lite',
};

export const Lite = livecodesStory({ lite: true });
export const Normal = livecodesStory({ lite: false });
