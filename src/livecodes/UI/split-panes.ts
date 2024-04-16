import Split from 'split.js';
import { customEvents } from '../events';

export const createSplitPanes = (layout: 'vertical' | 'horizontal' = 'horizontal') => {
  let destroyed = false;
  let split: Split.Instance;

  const init = () => {
    destroy(false, false);
    setLayout(layout);
    destroyed = false;
    const gutterSize = layout === 'vertical' ? 8 : 10;
    split = Split(['#editors', '#output'], {
      direction: layout,
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
      if (!gutter.querySelector('#handle')) {
        const handle = document.createElement('div');
        handle.id = 'handle';
        gutter.appendChild(handle);
      }
    }
    setAnimation(true);
  };

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

  const show = (pane: 'code' | 'output' | 'toggle', full?: boolean) => {
    if (!split) init();
    const smallScreen = layout === 'horizontal' && window.innerWidth < 800;
    const codeOpen = full || (smallScreen && full !== false) ? [100, 0] : [50, 50];
    const outputOpen = full || (smallScreen && full !== false) ? [0, 100] : [50, 50];
    if (pane === 'code' && (split.getSizes()[0] < 10 || full)) {
      split.setSizes(codeOpen);
    } else if (pane === 'output' && (split.getSizes()[1] < 10 || full)) {
      split.setSizes(outputOpen);
    } else if (pane === 'toggle' && (split.getSizes()[1] < 10 || full)) {
      if (split.getSizes()[0] < 10) {
        // toggle result
        split.setSizes(codeOpen);
      } else {
        split.setSizes(outputOpen);
      }
    }
  };

  const getLayout = () => layout;

  const setLayout = (newLayout: 'vertical' | 'horizontal') => {
    document.documentElement.classList.toggle('layout-vertical', layout === 'vertical');
    if (newLayout === layout) return;
    layout = newLayout;
    destroy();
    init();
  };

  const destroy = (preserveStyles?: boolean | undefined, preserveGutters?: boolean | undefined) => {
    if (!destroyed) {
      split?.destroy(preserveStyles, preserveGutters);
      destroyed = true;
    }
  };

  init();

  return {
    show,
    getLayout,
    setLayout,
    destroy,
  };
};
