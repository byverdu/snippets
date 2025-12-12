import { expect, test } from 'vitest';

import { chunk } from '@utils';

describe('chunk', () => {
  test('should be defined', () => {
    expect(chunk).instanceOf(Function);
  });

  test.each([
    [null, []],
    [undefined, []],
    [{}, []],
    [true, []],
    [4, []],
  ])('returns empty array for %o', (input, expected) => {
    // @ts-expect-error wrong paramaters
    expect(chunk(input)).toEqual(expected);
  });

  test.each([
    {
      input: { arr: [1, 2, 3, 4, 5], size: 2 },
      expected: [[1, 2], [3, 4], [5]],
    },
    {
      input: { arr: ['a', 'b', 'c', 'd'], size: 3 },
      expected: [['a', 'b', 'c'], ['d']],
    },
    {
      input: { arr: [1, 2, 3, 4, 5], size: 1 },
      expected: [[1], [2], [3], [4], [5]],
    },
    { input: { arr: [1, 2, 3], size: 5 }, expected: [[1, 2, 3]] },
    { input: { arr: [], size: 2 }, expected: [] },
  ])('splits array $input.arr by $input.size', ({ input, expected }) => {
    expect(chunk(input.arr, input.size)).toEqual(expected);
  });
});
