import type { StoryDef } from '../../common';

const storyDef: StoryDef = {
  Lazy: { props: { loading: 'lazy' } },
  Click: { props: { loading: 'click' } },
  Eager: { props: { loading: 'eager' } },
};

export default storyDef;
