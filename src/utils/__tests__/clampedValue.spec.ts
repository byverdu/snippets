import { expect, test, vi } from 'vitest';

import { clampedValue } from '@utils';

describe('clampedValue', () => {
  test('should be defined', () => {
    expect(clampedValue).instanceOf(Function);
  });

  test.each([
    [undefined, 0],
    [{ value: '' }, 0],
    [{ value: null }, 0],
    [{ value: undefined }, 0],
    [{ value: {} }, 0],
    [{ value: [] }, 0],
  ])('clampedValue(%o) -> %d', (value, expected) => {
    // @ts-expect-error wrong paramaters
    expect(clampedValue(value)).toEqual(expected);
  });

  test('should return minValue if value is smaller', () => {
    expect(clampedValue({ value: -2 })).to.eq(0);
  });

  test('should return maxValue if value is bigger', () => {
    expect(clampedValue({ value: 200 })).to.eq(100);
  });

  test('should return the value if value is within min and max', () => {
    expect(clampedValue({ value: 50 })).to.eq(50);
  });

  test('should accept a new minValue', () => {
    expect(clampedValue({ value: 50, minValue: 55 })).to.eq(55);
  });

  test('should accept a new maxValue', () => {
    expect(clampedValue({ value: 50, maxValue: 55 })).to.eq(50);
  });

  test('should call Math.min and Math.max', () => {
    const min = vi.spyOn(Math, 'min');
    const max = vi.spyOn(Math, 'max');
    const result = clampedValue({ value: 50 });

    expect(result).to.eq(50);

    // Math.min assertion
    expect(min).toHaveBeenCalledTimes(1);
    expect(min).toHaveBeenCalledWith(50, 100);

    // Math.max assertion
    expect(max).toHaveBeenCalledTimes(1);
    expect(max).toHaveBeenCalledWith(50, 0);
  });
});
