/**
 * Delays code execution for a set duration.
 *
 * @param duration - The delay duration in milliseconds.
 * @return promise that resolves to true after the specified duration.
 *
 * @example
 * sleep(500); // .5 secs
 * sleep(1500); // 1.5 sec
 */
export function sleep(duration = 100): Promise<void> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, duration);
  });
}
