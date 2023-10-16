import Subscribable from '.';

describe('Functional PubSub', () => {
  const testArray: string[] = [];
  // addToTestArray adds to testArray
  const addToTestArray = (el: string) => testArray.push(el);

  const testMap: Record<string, boolean> = {};
  // addToTestMap adds to testMap
  const addToTestMap = (el: string) => (testMap[el] = true);

  afterEach(() => {
    // empty array
    testArray.splice(0, testArray.length);
    // empty map
    Object.keys(testMap).forEach((el) => delete testMap[el]);
  });

  it('should test basic pubsub method', () => {
    const sub = new Subscribable<string>();

    sub.subscribe(addToTestArray);

    sub.publish('hello');
    sub.publish('world');

    expect(testArray).toContain('hello');
    expect(testArray).toContain('world');
  });

  it('should not listen after unsubscribing', () => {
    const sub = new Subscribable<string>();

    const testArrayUnsubscribe = sub.subscribe(addToTestArray);

    sub.publish('hello');
    testArrayUnsubscribe();
    sub.publish('world');

    expect(testArray).toContain('hello');
    expect(testArray).not.toContain('world');
  });

  it('should serve multiple subscribed methods', () => {
    const sub = new Subscribable<string>();

    sub.subscribe(addToTestArray);
    sub.subscribe(addToTestMap);

    sub.publish('hello');
    sub.publish('world');

    expect(testArray).toContain('hello');
    expect(testArray).toContain('world');
    expect(testMap.hello).toBeTruthy();
    expect(testMap.world).toBeTruthy();
  });
});
