import type { Props } from './livecodes';

export interface StoryDef {
  [key: string]: { props: Props; storyName?: string };
}
