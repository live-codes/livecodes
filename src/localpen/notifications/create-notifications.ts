import { createSnackbar, Action } from '@snackbar/core';
import {
  infoTheme,
  successTheme,
  warningTheme,
  dangerTheme,
  closeButton,
  acceptButton,
} from './snackbar';

export const createNotifications = () => {
  const timeout = 2000;

  const info = (message: string) => {
    createSnackbar(message, {
      theme: infoTheme,
      actions: [closeButton],
      timeout,
    });
  };

  const success = (message: string) => {
    createSnackbar(message, {
      theme: successTheme,
      actions: [closeButton],
      timeout,
    });
  };

  const warning = (message: string) => {
    createSnackbar(message, {
      theme: warningTheme,
      actions: [closeButton],
      timeout,
    });
  };

  const error = (message: string) => {
    createSnackbar(message, {
      theme: dangerTheme,
      actions: [closeButton],
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
      theme: infoTheme,
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
