import { expect, test, vi } from 'vitest';

import { chunk } from '../chunk';

describe('chunk', () => {
  test('should be defined', () => {
    expect(chunk).instanceOf(Function);
  });

  test('should return empty array', () => {
    expect(chunk(undefined)).toEqual([]);
    expect(chunk([undefined], 0)).toEqual([]);
  });
});
