export type * from '../sdk/models';

export interface ModalOptions {
  size?: 'large' | 'small' | 'full' | 'large-fixed';
  closeButton?: boolean;
  isAsync?: boolean;
  onClose?: () => void;
  scrollToSelector?: string;
  autoFocus?: boolean;
}

export interface Modal {
  show: (container: HTMLElement, options?: ModalOptions) => void;
  close: () => void;
}

export interface Notifications {
  info: (message: string, dismissable?: boolean) => void;
  success: (message: string, dismissable?: boolean) => void;
  warning: (message: string, dismissable?: boolean) => void;
  error: (message: string, dismissable?: boolean) => void;
  confirm: (message: string, confirmCallback: () => void, cancelCallback?: () => void) => void;
}

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
