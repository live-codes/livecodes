import { keymap } from '@codemirror/view';
import {
  abbreviationTracker,
  expandAbbreviation,
  enterAbbreviationMode,
  balanceOutward,
  toggleComment,
  evaluateMath,
  goToNextEditPoint,
  goToPreviousEditPoint,
  goToTagPair,
  incrementNumber1,
  decrementNumber1,
  removeTag,
  selectNextItem,
  selectPreviousItem,
  splitJoinTag,
  wrapWithAbbreviation,
} from '@emmetio/codemirror6-plugin';

export const emmet = [
  abbreviationTracker(),
  wrapWithAbbreviation(),
  keymap.of([
    {
      key: 'Cmd-e',
      run: expandAbbreviation,
    },
    {
      key: 'Cmd-Shift-e',
      run: enterAbbreviationMode,
    },
    {
      key: 'Cmd-Shift-d',
      run: balanceOutward,
    },
    {
      key: 'Ctrl-/',
      run: toggleComment,
    },
    {
      key: 'Ctrl-y',
      run: evaluateMath,
    },
    {
      key: 'Ctrl-Alt-ArrowLeft',
      run: goToPreviousEditPoint,
    },
    {
      key: 'Ctrl-Alt-ArrowRight',
      run: goToNextEditPoint,
    },
    {
      key: 'Ctrl-g',
      run: goToTagPair,
    },
    {
      key: 'Ctrl-Alt-ArrowUp',
      run: incrementNumber1,
    },
    {
      key: 'Ctrl-Alt-ArrowDown',
      run: decrementNumber1,
    },
    {
      key: "Ctrl-'",
      run: removeTag,
    },
    {
      key: "Ctrl-Shift-'",
      run: splitJoinTag,
    },
    {
      key: 'Ctrl-.',
      run: selectNextItem,
    },
    {
      key: 'Ctrl-,',
      run: selectPreviousItem,
    },
  ]),
];
