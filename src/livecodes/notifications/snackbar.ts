import type { Action } from '@snackbar/core';

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
  textColor: '#055160',
  actionColor: '#055160',
  backgroundColor: '#CFF4FC',
};
export const successTheme = {
  textColor: '#0F5132',
  actionColor: '#0F5132',
  backgroundColor: '#D1E7DD',
};
export const warningTheme = {
  textColor: '#664D16',
  actionColor: '#664D16',
  backgroundColor: '#FFF3CD',
};
export const dangerTheme = {
  textColor: '#842040',
  actionColor: '#842040',
  backgroundColor: '#F8D7DA',
};
export const closeButton: Action = {
  text: '<span title="Dismiss">✖</span>',
  style: actionStyle,
  callback(_button, snackbar) {
    snackbar.destroy();
  },
};
export const acceptButton: Action = {
  text: '<span title="Confirm">✓</span>',
  style: actionStyle,
  callback(_button, snackbar) {
    snackbar.destroy();
  },
};
