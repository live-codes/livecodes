import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/Lite',
};

export const Lite = livecodesStory({ lite: true });
export const Normal = livecodesStory({ lite: false });
