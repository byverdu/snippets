type TimerType = 'setTimeout' | 'setInterval';

/**
 * Cancels a timeout or interval before it executes.
 *
 * @param {(args: Array<unknown>) => void} callback - The function to invoke after the delay.
 * @param {"setTimeout" | "setInterval"} timerType - What JS timer to use
 * @param {number} delay - The delay in milliseconds before the callback is invoked.
 * @param {...Array<unknown>} args - Arguments to pass to the callback function.
 * @returns {() => void} A function that, when called, clears the timeout.
 */

export function cancelTimer(
  timerType: TimerType,
  callback: (args: Array<unknown>) => void,
  delay: number,
  ...args: Array<unknown>
) {
  const execTimer = timerType === 'setInterval' ? setInterval : setTimeout;
  const clearTimer = timerType === 'setInterval' ? clearInterval : clearTimeout;

  const timer = execTimer(() => {
    callback(args);
  }, delay);

  return () => {
    clearTimer(timer);
  };
}
