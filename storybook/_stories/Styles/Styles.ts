import type { StoryDef } from '../../common';

const storyDef: StoryDef = {
  Height: { props: { height: '85vh' }, storyName: 'height' },
  Class: { props: { class: 'custom-class' }, storyName: 'class' },
  Style: { props: { style: { opacity: '0.5' } }, storyName: 'style' },
};

export default storyDef;
