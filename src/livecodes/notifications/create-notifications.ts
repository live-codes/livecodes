import {
  createSnackbar,
  destroyAllSnackbars,
  type Action,
  type Message,
  type SnackOptions,
} from '@snackbar/core';
import { getConfig } from '../config';
import type { Notifications } from '../models';
import {
  acceptButton,
  closeButton,
  dangerTheme,
  darkTheme,
  infoTheme,
  lightTheme,
  successTheme,
  warningTheme,
} from './snackbar';

export const hasOpenNotifications = () => document.querySelectorAll('.snackbar').length > 0;

export const createNotifications = (): Notifications => {
  const timeout = 2000;

  const getPosition = () =>
    document.querySelector<HTMLDialogElement>('dialog#modal')?.open ? 'left' : 'center';

  const createBar = (message: Message, options?: SnackOptions) => {
    const position = getPosition();
    const bar = createSnackbar(message, {
      position,
      ...options,
    });
    return bar;
  };

  const info = (message: string, dismissable = true) => {
    createBar(message, {
      theme: infoTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };
  const success = (message: string, dismissable = true) => {
    createBar('✓ ' + message, {
      theme: successTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const warning = (message: string, dismissable = true) => {
    createBar(message, {
      position: getPosition(),
      theme: warningTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const error = (message: string, dismissable = true) => {
    createBar('✖ ' + message, {
      position: getPosition(),
      theme: dangerTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const confirm = (message: string, confirmCallback: () => void, cancelCallback?: () => void) => {
    const confirmAction: Action = {
      ...acceptButton,
      callback(_button, snackbar) {
        confirmCallback();
        snackbar.destroy();
      },
    };
    const cancelAction: Action = {
      ...closeButton,
      callback(_button, snackbar) {
        cancelCallback?.();
        snackbar.destroy();
      },
    };
    createBar(message, {
      theme: getConfig().theme === 'dark' ? darkTheme : lightTheme,
      actions: [confirmAction, cancelAction],
    });
    document.querySelector<HTMLButtonElement>('.snackbar--button')?.focus();
  };

  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && hasOpenNotifications()) {
      event.preventDefault();
      destroyAllSnackbars();
    }
  });

  return {
    info,
    success,
    warning,
    error,
    confirm,
  };
};
