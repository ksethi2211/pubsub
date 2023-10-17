const createHandlerStack = <MessageType>() => {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set();

  return {
    subscribe: (
      cb: (msg: MessageType) => undefined | unknown
    ): (() => void) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    publish: (msg: MessageType): unknown => {
      let data: unknown;
      for (const subscriber of Array.from(subscribers)) {
        data = subscriber(msg);

        // break after one subscriber has processed
        if (data !== undefined) break;
      }

      return data;
    },
  };
};

export default createHandlerStack;
