import { createSnackbar, type Action } from '@snackbar/core';
import { getConfig } from '../config';
import type { Notifications } from '../models';
import {
  infoTheme,
  successTheme,
  warningTheme,
  dangerTheme,
  closeButton,
  acceptButton,
  lightTheme,
  darkTheme,
} from './snackbar';

export const createNotifications = (): Notifications => {
  const timeout = 2000;

  const info = (message: string, dismissable = true) => {
    createSnackbar(message, {
      theme: infoTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const success = (message: string, dismissable = true) => {
    createSnackbar('✓ ' + message, {
      theme: successTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const warning = (message: string, dismissable = true) => {
    createSnackbar(message, {
      theme: warningTheme,
      actions: dismissable ? [closeButton] : [],
      timeout,
    });
  };

  const error = (message: string, dismissable = true) => {
    createSnackbar('✖ ' + message, {
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
    createSnackbar(message, {
      theme: getConfig().theme === 'dark' ? darkTheme : lightTheme,
      actions: [confirmAction, cancelAction],
    });
  };

  return {
    info,
    success,
    warning,
    error,
    confirm,
  };
};
