import Split from 'split.js';
import { customEvents } from '../events';

export const createSplitPanes = () => {
  const gutterSize = 10;
  let destroyed = false;
  const split = Split(['#editors', '#output'], {
    minSize: [0, 0],
    gutterSize,
    elementStyle: (_dimension, size, gutterSize) => {
      window.dispatchEvent(new Event(customEvents.resizeEditor));
      return {
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
      };
    },
    gutterStyle: (_dimension, gutterSize) => ({
      'flex-basis': `${gutterSize}px`,
    }),
    onDragStart() {
      setAnimation(false);
    },
    onDragEnd() {
      setAnimation(true);
    },
  });

  const gutter = document.querySelector('.gutter');
  if (gutter) {
    const handle = document.createElement('div');
    handle.id = 'handle';
    gutter.appendChild(handle);
  }

  const setAnimation = (animate: boolean) => {
    const editorsElement: HTMLElement | null = document.querySelector('#editors');
    const outputElement: HTMLElement | null = document.querySelector('#output');
    if (!outputElement || !editorsElement) return;

    if (animate) {
      editorsElement.style.transition = 'flex-basis 0.5s';
      outputElement.style.transition = 'flex-basis 0.5s';
    } else {
      editorsElement.style.transition = 'none';
      outputElement.style.transition = 'none';
    }
  };

  const show = (pane: 'code' | 'output', full?: boolean) => {
    const smallScreen = window.innerWidth < 800;
    const codeOpen = full || (smallScreen && full !== false) ? [100, 0] : [50, 50];
    const outputOpen = full || (smallScreen && full !== false) ? [0, 100] : [50, 50];
    if (pane === 'code' && (split.getSizes()[0] < 10 || full)) {
      split.setSizes(codeOpen);
    } else if (pane === 'output' && (split.getSizes()[1] < 10 || full)) {
      if (split.getSizes()[0] < 10) {
        // toggle result
        split.setSizes(codeOpen);
      } else {
        split.setSizes(outputOpen);
      }
    }
  };

  const destroy = (preserveStyles?: boolean | undefined, preserveGutters?: boolean | undefined) => {
    if (!destroyed) {
      split.destroy(preserveStyles, preserveGutters);
      destroyed = true;
    }
  };

  setAnimation(true);

  return {
    show,
    destroy,
  };
};
