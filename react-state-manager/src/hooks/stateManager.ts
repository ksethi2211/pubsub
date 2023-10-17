import { useEffect, useState } from 'react';

const createSubscribable = <MessageType>() => {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe: (cb: (msg: MessageType) => void): (() => void) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    publish: (msg: MessageType) => subscribers.forEach((cb) => cb(msg)),
  };
};

type CreateStateHook = <DataType>(
  initialValue: DataType
) => () => [DataType, (value: DataType) => void];
const createStateHook: CreateStateHook = <DataType>(initialValue: DataType) => {
  const subscription = createSubscribable<DataType>();

  return () => {
    const [value, setValue] = useState<DataType>(initialValue);

    useEffect(() => subscription.subscribe(setValue), []);

    return [
      value,
      (v: DataType) => {
        setValue(v);
        subscription.publish(v);
      },
    ];
  };
};

export default createStateHook;
