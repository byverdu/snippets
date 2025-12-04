import { expect, test } from 'vitest';

import { getDiffBetweenArrays } from '../getDiffBetweenArrays';

describe('getDiffBetweenArrays', () => {
  test('should return empty array if no params', () => {
    // @ts-expect-error wrong params
    expect(getDiffBetweenArrays()).toEqual([]);
  });
  test.each([
    [null, null, []],
    [9, 8, []],
    [undefined, undefined, []],
    [false, true, []],
    [[1], true, []],
    [[1], [false], [1]],
    [[1], [1], []],
    [[1, true], [false], [1, true]],
    [[1, 'false'], [false], [1, 'false']],
    [[undefined, null], [undefined], [null]],
  ])('getDiffBetweenArrays(%o, %o) -> %o', (arr, diff, expected) => {
    // @ts-expect-error wrong params
    expect(getDiffBetweenArrays(arr, diff)).toEqual(expected);
  });
});
