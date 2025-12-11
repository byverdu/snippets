type TimerType = 'setTimeout' | 'setInterval';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = (...args: any[]) => any;

type Props<T extends Args> = {
  callback: T;
  timerType?: TimerType;
  delay?: number;
};

/**
 * Starts a timeout or interval, and returns a function to cancel it before execution.
 *
 * @param params Parameters for the timer.
 * @param params.callback The function to invoke after the delay.
 * @param params.timerType Type of JS timer to use: 'setTimeout' or 'setInterval'.
 * @param params.delay The delay in milliseconds before the callback is invoked or interval between invocations.
 * @param params._args Arguments to pass to the callback function (as an array).
 * @returns A function that, when called, clears the timeout or interval.
 *
 * @example
 * // Example 1: setTimeout usage
 * const cancel = cancelTimer<(a: number, b: number) => number>({
 *   timerType: 'setTimeout',
 *   callback: (a, b) => a + b,
 *   delay: 1000
 * }, 1, 2);
 * // To cancel before execution:
 * // cancel();
 *
 * @example
 * // Example 2: setInterval usage
 * const cancelInterval = cancelTimer({
 *   timerType: 'setInterval',
 *   callback: ([msg]) => console.log(msg),
 *   delay: 500,
 *   _args: ['Repeated message']
 * });
 * // To cancel after 2 seconds:
 * // setTimeout(cancelInterval, 2000);
 *
 */
export function cancelTimer<T extends Args>(
  { timerType = 'setTimeout', callback, delay = 100 } = {} as Props<T>,
  ...args: Parameters<T>
) {
  if (!(callback instanceof Function)) {
    throw new Error('Provide a callback function');
  }

  const execTimer = timerType === 'setInterval' ? setInterval : setTimeout;
  const clearTimer = timerType === 'setInterval' ? clearInterval : clearTimeout;

  const timer = execTimer(() => {
    callback(...args);
  }, delay);

  return () => {
    clearTimer(timer);
  };
}
