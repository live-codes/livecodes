export const createEventsManager = () => {
  const events: Array<{
    element: HTMLElement | Document | Window | FileReader;
    eventType: string;
    fn: (event: Event) => void;
  }> = [];

  const addEventListener = <T extends Event>(
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: T) => any,
    options?: any,
  ) => {
    if (!element) return;
    element.addEventListener(eventType, fn as any, options || false);
    events.push({
      element,
      eventType,
      fn: fn as any,
    });
  };

  const removeEventListener = <T extends Event>(
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: T) => void,
  ) => {
    if (!element) return;
    element.removeEventListener(eventType, fn as any);
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
