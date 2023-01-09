import { livecodesStory } from '../../src';

export default {
  title: 'Embed Options/View',
};

export const Split = livecodesStory({ view: 'split' });
export const Editor = livecodesStory({ view: 'editor' });
export const Result = livecodesStory({ view: 'result' });
