import createHandlerStack from '../handler';

const SHOULD_DEBUG = true;
const debug = (cb: (input: unknown) => unknown) => {
  return (input: unknown) => {
    const result = cb(input);
    if (result && SHOULD_DEBUG) {
      console.log(result);
    }

    return result;
  };
};

const stringParser = (input: unknown) => {
  if (typeof input === 'string') {
    return `Hello ${input}`;
  }
};

const numberParser = (input: unknown) => {
  if (typeof input === 'number') {
    return input + 1;
  }
};

const unknownParser = (_input: unknown) => {
  return 'Not handled type found';
};

const parserSubscription = createHandlerStack<unknown>();

parserSubscription.subscribe(debug(stringParser));
parserSubscription.subscribe(debug(numberParser));
parserSubscription.subscribe(debug(unknownParser));

parserSubscription.publish(12);
parserSubscription.publish('Kunal Sethi');
parserSubscription.publish(true);
parserSubscription.publish(15);
parserSubscription.publish('World');
