// eslint-disable-next-line import/no-internal-modules
export * from '../sdk/models';

export interface INinjaAction {
  title: string;
  keywords?: string;
  content?: string;
  id?: string;
  hotkey?: string;
  icon?: string;
  mdIcon?: string;
  parent?: string;
  children?: string[] | Array<Omit<INinjaAction, 'parent'>>;
  section?: string;
  href?: string;
  attributes?: Record<string, string>;
  handler?: (
    action: INinjaAction,
    event: KeyboardEvent | CustomEvent<INinjaAction> | undefined,
    searchQuery: string,
  ) => void | { keepOpen: boolean } | Promise<void>;
  matcher?: (
    action: INinjaAction,
    searchOptions: { searchString: string; searchRegex: RegExp },
  ) => boolean;
  keepOpen?: boolean;
}
