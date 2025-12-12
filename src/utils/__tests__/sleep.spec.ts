import { test, expect, vi } from 'vitest';

import { sleep } from '@utils';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'setTimeout');
    vi.spyOn(globalThis, 'clearTimeout');
  });
  beforeEach(() => {
    vi.runAllTimers();
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('should be defined', () => {
    expect(sleep).toBeInstanceOf(Function);
  });

  test('should return a promise', () => {
    expect(sleep()).toBeInstanceOf(Promise);
  });

  test('should call setTimeout and clearTimeout', () => {
    sleep();

    expect(globalThis.setTimeout).toBeCalledTimes(1);
    expect(globalThis.setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      100,
    );

    vi.advanceTimersByTime(100);

    expect(globalThis.clearTimeout).toBeCalledTimes(1);
  });

  test('should accept a duration parameter', () => {
    sleep(500);

    expect(globalThis.setTimeout).toBeCalledTimes(1);
    expect(globalThis.setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      500,
    );

    vi.advanceTimersByTime(500);

    expect(globalThis.clearTimeout).toBeCalledTimes(1);
  });
});
