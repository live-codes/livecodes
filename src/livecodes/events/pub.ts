export const createPub = <T>() => {
  type Subscriber = (data: T) => void;
  const subscribers: Subscriber[] = [];

  const subscribe = (fn: Subscriber) => {
    subscribers.push(fn);
    return {
      unsubscribe: () => {
        subscribers.splice(subscribers.indexOf(fn), 1);
      },
    };
  };

  const notify = (data: T) => {
    subscribers.forEach((fn: Subscriber) => {
      fn(data);
    });
  };

  const unsubscribeAll = () => {
    subscribers.length = 0;
  };

  const hasSubscribers = () => subscribers.length > 0;

  return {
    subscribe,
    notify,
    hasSubscribers,
    unsubscribeAll,
  };
};
