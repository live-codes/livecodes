import { Action } from '@snackbar/core';

const actionStyle = {
  minWidth: '2em',
  padding: '3px',
};

export const darkTheme = {
  textColor: '#eee',
  actionColor: '#eee',
  backgroundColor: '#2A2A2A',
};
export const lightTheme = {
  textColor: '#343A40',
  actionColor: '#343A40',
  backgroundColor: '#fff',
};
export const infoTheme = {
  ...darkTheme,
  backgroundColor: '#17A2B8',
};
export const successTheme = {
  ...darkTheme,
  backgroundColor: '#28A745',
};
export const warningTheme = {
  ...darkTheme,
  backgroundColor: '#FFC107',
};
export const dangerTheme = {
  ...darkTheme,
  backgroundColor: '#DC3545',
};

export const closeButton: Action = {
  text: '✖',
  style: actionStyle,
  callback(_button, snackbar) {
    snackbar.destroy();
  },
};
export const acceptButton: Action = {
  text: '✓',
  style: actionStyle,
  callback(_button, snackbar) {
    snackbar.destroy();
  },
};
