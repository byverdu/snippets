import { expect, test, vi } from 'vitest';

import { cancelTimer } from '@utils';

describe('cancelTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('should be defined', () => {
    expect(cancelTimer).toBeInstanceOf(Function);
  });

  test('should throw an Error if callback is not defined', () => {
    expect(() => cancelTimer()).toThrowError('Provide a callback function');
  });

  test('should return a function', () => {
    expect(
      cancelTimer({ callback: (...args) => vi.fn(...args) }),
    ).toBeInstanceOf(Function);
  });

  test('should be able to use setTimeout', () => {
    const mockTimer = vi.spyOn(globalThis, 'setTimeout');
    const mockClearTimer = vi.spyOn(globalThis, 'clearTimeout');
    const mockCallback = vi.fn();
    const cancel = cancelTimer(
      {
        timerType: 'setTimeout',
        delay: 100,
        callback: mockCallback,
      },
      true,
      false,
    );
    expect(mockTimer).toHaveBeenCalled();
    expect(mockTimer).toHaveBeenCalledTimes(1);

    // Advance timers to trigger the setTimeout callback
    vi.advanceTimersByTime(100);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(true, false);

    cancel();

    expect(mockClearTimer).toHaveBeenCalledTimes(1);
  });

  test('should be able to use setInterval', () => {
    const mockTimer = vi.spyOn(globalThis, 'setInterval');
    const mockClearTimer = vi.spyOn(globalThis, 'clearInterval');
    const mockCallback = vi.fn();
    const cancel = cancelTimer(
      {
        timerType: 'setInterval',
        delay: 100,
        callback: mockCallback,
      },
      true,
      false,
    );

    expect(mockTimer).toHaveBeenCalledTimes(1);

    // Advance timers to trigger the setTimeout callback
    vi.advanceTimersByTime(100);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(true, false);

    cancel();

    expect(mockClearTimer).toHaveBeenCalledTimes(1);
  });

  test('should be able to cancel the timer before it calls the callback function', () => {
    const mockTimer = vi.spyOn(globalThis, 'setInterval');
    const mockClearTimer = vi.spyOn(globalThis, 'clearInterval');
    const mockCallback = vi.fn();
    const cancel = cancelTimer(
      {
        timerType: 'setInterval',
        delay: 100,
        callback: mockCallback,
      },
      true,
      false,
    );

    expect(mockTimer).toHaveBeenCalledTimes(1);

    cancel();

    // Advance timers to trigger the setTimeout callback
    vi.advanceTimersByTime(100);

    expect(mockCallback).not.toHaveBeenCalled();
    expect(mockCallback).not.toHaveBeenCalledWith(true, false);
    expect(mockClearTimer).toHaveBeenCalledTimes(1);
  });
});
