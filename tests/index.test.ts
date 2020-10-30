import { foo } from '../src/index';

describe('foo', () => {
  test('when passed 1 returns 2', () => {
    expect(foo(1)).toEqual(2);
  });
});
