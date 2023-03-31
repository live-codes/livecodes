export const createEventsManager = () => {
  const events: Array<{
    element: HTMLElement | Document | Window | FileReader;
    eventType: string;
    fn: (event: Event | KeyboardEvent) => void;
  }> = [];

  const addEventListener = (
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: Event | KeyboardEvent | MouseEvent | MessageEvent | CustomEvent) => void,
    options?: any,
  ) => {
    if (!element) return;
    element.addEventListener(eventType, fn, options || false);
    events.push({
      element,
      eventType,
      fn,
    });
  };

  const removeEventListener = (
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: Event | KeyboardEvent | MouseEvent | MessageEvent) => void,
  ) => {
    if (!element) return;
    element.removeEventListener(eventType, fn);
    const event = events.find(
      (ev) => ev.element === element && ev.eventType === eventType && ev.fn === fn,
    );
    if (!event) return;
    events.splice(events.indexOf(event));
  };

  const removeEventListeners = () => {
    events.forEach((event) => {
      event.element.removeEventListener(event.eventType, event.fn);
      events.splice(events.indexOf(event));
    });
  };

  return {
    addEventListener,
    removeEventListener,
    removeEventListeners,
  };
};
