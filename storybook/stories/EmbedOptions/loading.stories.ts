import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/loading',
};

export const Lazy = livecodesStory({ loading: 'lazy' });
export const Click = livecodesStory({ loading: 'click' });
export const Eager = livecodesStory({ loading: 'eager' });
