/**
 * Delays code execution for a set duration.
 *
 * @param {number} duration - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves to true after the specified duration.
 */
export function sleep(duration: number): Promise<void> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, duration);
  });
}
