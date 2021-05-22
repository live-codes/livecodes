export const createEventsManager = () => {
  const events: Array<{
    element: HTMLElement | Document | Window | FileReader;
    eventType: string;
    fn: (event: Event | KeyboardEvent) => void;
  }> = [];

  const addEventListener = (
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: Event | KeyboardEvent | MouseEvent | MessageEvent) => void,
    _options?: any,
  ) => {
    if (!element) return;
    element.addEventListener(eventType, fn, false);
    events.push({
      element,
      eventType,
      fn,
    });
  };

  const removeEventListeners = () => {
    events.forEach((event) => {
      event.element.removeEventListener(event.eventType, event.fn);
      events.splice(events.indexOf(event));
    });
  };

  return {
    addEventListener,
    removeEventListeners,
  };
};
